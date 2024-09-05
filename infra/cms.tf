### API Gateway Common ###

resource "aws_apigatewayv2_api" "jiejiechen_cms_gw" {
  name          = "jiejiechen-cms"
  protocol_type = "HTTP"
}

resource "aws_apigatewayv2_stage" "cms_default" {
  api_id = aws_apigatewayv2_api.jiejiechen_cms_gw.id

  name        = "$default"
  auto_deploy = true

  access_log_settings {
    destination_arn = aws_cloudwatch_log_group.jiejiechen_cms_gw.arn

    format = jsonencode({
      requestId               = "$context.requestId"
      sourceIp                = "$context.identity.sourceIp"
      requestTime             = "$context.requestTime"
      protocol                = "$context.protocol"
      httpMethod              = "$context.httpMethod"
      resourcePath            = "$context.resourcePath"
      routeKey                = "$context.routeKey"
      status                  = "$context.status"
      responseLength          = "$context.responseLength"
      integrationErrorMessage = "$context.integrationErrorMessage"
      }
    )
  }
}

resource "aws_cloudwatch_log_group" "jiejiechen_cms_gw" {
  name = "/aws/api-gw/${aws_apigatewayv2_api.jiejiechen_cms_gw.name}"

  retention_in_days = 30
}

## Custom Domain for CMS ##

resource "aws_apigatewayv2_domain_name" "jiejiechen_cms" {
  domain_name = var.cms_domain_name

  domain_name_configuration {
    certificate_arn = var.api_domain_certificate_arn
    endpoint_type   = "REGIONAL"
    security_policy = "TLS_1_2"
  }
}

resource "aws_apigatewayv2_api_mapping" "jiejiechen_cms" {
  api_id      = aws_apigatewayv2_api.jiejiechen_cms_gw.id
  domain_name = aws_apigatewayv2_domain_name.jiejiechen_cms.id
  stage       = aws_apigatewayv2_stage.cms_default.id
}

## JiejieChenApp Angular ###

resource "aws_apigatewayv2_integration" "jiejiechen_cms_lambda" {
  api_id           = aws_apigatewayv2_api.jiejiechen_cms_gw.id
  integration_type = "AWS_PROXY"
  integration_uri  = aws_lambda_function.jiejiechen_cms.invoke_arn
}

resource "aws_apigatewayv2_route" "jiejiechen_cms" {
  api_id    = aws_apigatewayv2_api.jiejiechen_cms_gw.id
  route_key = "ANY /{proxy+}"

  target = "integrations/${aws_apigatewayv2_integration.jiejiechen_cms_lambda.id}"
}


resource "aws_lambda_permission" "jiejiechen_cms_lambda" {
  statement_id  = "AllowExecutionFromAPIGateway_Cms"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.jiejiechen_cms.function_name
  principal     = "apigateway.amazonaws.com"

  source_arn = "${aws_apigatewayv2_api.jiejiechen_cms_gw.execution_arn}/*/*"
}


### JiejieChen CMS ###
resource "aws_lambda_function" "jiejiechen_cms" {
  function_name = "${local.stack_prefix}-cms"

  role         = aws_iam_role.cms_lambda_role.arn
  timeout      = 90
  image_uri    = "${aws_ecr_repository.jiejiechen-cms.repository_url}:latest"
  package_type = "Image"
  memory_size  = 1024

  environment {
    variables = {
      "DATABASE_HOST"        = var.cms_database_host
      "DATABASE_SECRET_NAME" = var.cms_database_secret_name
      "REGION"               = "ap-southeast-2"
    }
  }
}

resource "aws_cloudwatch_log_group" "jiejiechen_cms" {
  name = "/aws/lambda/${aws_lambda_function.jiejiechen_cms.function_name}"
}

resource "aws_s3_bucket" "strapi_assets" {
  bucket        = "${local.stack_prefix}-strapi-assets"
}

resource "aws_iam_role" "cms_lambda_role" {
  name = "cms-lambda-role"

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


data "aws_iam_policy_document" "cms_lambda_policy_doc" {
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
    sid    = "AccessStrapiAssets"
    effect = "Allow"

    resources = [
      aws_s3_bucket.strapi_assets.arn,
      "${aws_s3_bucket.strapi_assets.arn}/*"
    ]

    actions = [
      "s3:*"
    ]
  }
  
  statement {
    sid = "AccessSecretManager"
    effect = "Allow"
    
    actions = [
      "secretsmanager:DescribeSecret",
      "secretsmanager:GetSecretValue",
      "secretsmanager:ListSecretVersionIds",
      "secretsmanager:ListSecrets"
    ]
    
    resources = [
      "*"
    ]
  }
}

resource "aws_iam_role_policy" "cms_lambda_policy" {
  name   = "${local.stack_prefix}-cms-lambda-policy"
  policy = data.aws_iam_policy_document.cms_lambda_policy_doc.json
  role   = aws_iam_role.cms_lambda_role.name
}