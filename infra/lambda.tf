### Lambda Common ###

resource "aws_iam_role" "handler_lambda_exec" {
  name = "handler-lambda"

  assume_role_policy = <<POLICY
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "Service": "lambda.amazonaws.com"
      },
      "Action": "sts:AssumeRole"
    }
  ]
}
POLICY
}

resource "aws_iam_role_policy_attachment" "handler_lambda_policy" {
  role       = aws_iam_role.handler_lambda_exec.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole"
}

### JiejieChen Angular ###
resource "aws_s3_object" "jiejiechen_angular_artifact" {
  bucket = aws_s3_bucket.lambda_bucket.id
  key    = "jiejiechen-angular.zip"
  source = "${path.module}/../package/jiejiechen-angular.zip"
}

resource "aws_lambda_function" "jiejiechen_angular" {
  function_name = "jiejiechenapp-angular"
  s3_bucket = aws_s3_bucket.lambda_bucket.id
  s3_key    = aws_s3_object.jiejiechen_angular_artifact.key
  runtime     = "nodejs20.x"
  handler     = "lambda.handler"
  role         = aws_iam_role.handler_lambda_exec.arn
  timeout      = 30 # seconds
  memory_size  = 512
}

resource "aws_cloudwatch_log_group" "jiejiechen_angular" {
  name = "/aws/lambda/${aws_lambda_function.jiejiechen_angular.function_name}"
}

### JiejieChen CMS ###
resource "aws_lambda_function" "jiejiechen_cms" {
  function_name = "jiejiechenapp-cms"

  role         = aws_iam_role.handler_lambda_exec.arn
  timeout      = 90 # seconds
  image_uri    = "${aws_ecr_repository.jiejiechen-cms.repository_url}:latest"
  package_type = "Image"
  memory_size  = 512

  environment {
    variables = {
      "DATABASE_HOST"        = var.cms_database_host
      "DATABASE_SECRET_NAME" = var.cms_database_secret_name
      "REGION"               = var.website-bucket-region
    }
  }

#   vpc_config {
#     ipv6_allowed_for_dual_stack = false
#     security_group_ids          = [
#       "sg-a18564c4"
#     ]
#     subnet_ids = [
#       "subnet-040ced61",
#       "subnet-abdcd1df",
#       "subnet-e6346fa0"
#     ]
#   }
}

resource "aws_cloudwatch_log_group" "jiejiechen_cms" {
  name = "/aws/lambda/${aws_lambda_function.jiejiechen_cms.function_name}"
}
