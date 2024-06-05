resource "aws_lambda_function" "html2docx" {
  function_name = "${local.stack_prefix}-html2docx"

  s3_bucket = aws_s3_bucket.lambda_bucket.id
  s3_key    = aws_s3_object.html2docx_artifact.key

  runtime     = "dotnet8"
  handler     = "JiejieChenApp.HtmlDocx::JiejieChenApp.HtmlDocx.Functions_Handler_Generated::Handler"
  timeout     = 30 # seconds
  memory_size = 512

  source_code_hash = filesha256("../package/html2docx.zip")

  role = aws_iam_role.html2docx_lambda_role.arn
}

resource "aws_s3_object" "html2docx_artifact" {
  bucket = aws_s3_bucket.lambda_bucket.id
  key    = "html2docx.zip"
  source = "${path.module}/../package/html2docx.zip"
  etag   = filesha256("${path.module}/../package/html2docx.zip")
}

resource "aws_iam_role" "html2docx_lambda_role" {
  name = "${local.stack_prefix}-html2docx-lambda-role"

  assume_role_policy = jsonencode({
    "Version" : "2012-10-17",
    "Statement" : [
      {
        "Effect" : "Allow",
        "Principal" : {
          "Service" : "lambda.amazonaws.com"
        },
        "Action" : "sts:AssumeRole"
      }
    ]
  })
}

data "aws_iam_policy_document" "html2docx_lambda_policy_doc" {
  statement {
    sid    = "AllowInvokingLambdas"
    effect = "Allow"

    resources = [
      "arn:aws:lambda:*:*:function:*"
    ]

    actions = [
      "lambda:InvokeFunction"
    ]
  }

  statement {
    sid    = "AllowCreatingLogGroups"
    effect = "Allow"

    resources = [
      "arn:aws:logs:*:*:*"
    ]

    actions = [
      "logs:CreateLogGroup"
    ]
  }

  statement {
    sid    = "AllowWritingLogs"
    effect = "Allow"

    resources = [
      "arn:aws:logs:*:*:log-group:/aws/lambda/*:*"
    ]

    actions = [
      "logs:CreateLogStream",
      "logs:PutLogEvents",
    ]
  }

  statement {
    sid    = "AllowDownloadCV"
    effect = "Allow"

    resources = [
      "arn:aws:s3:::c2j/resume/*"
    ]

    actions = [
      "s3:GetObject"
    ]
  }

}

resource "aws_iam_role_policy" "html2docx_lambda_policy" {
  name   = "${local.stack_prefix}-lambda-html2docx-policy"
  policy = data.aws_iam_policy_document.html2docx_lambda_policy_doc.json
  role = aws_iam_role.html2docx_lambda_role.name
}