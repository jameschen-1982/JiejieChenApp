### API Gateway Common ###

resource "aws_apigatewayv2_api" "jiejiechen_main_gw" {
  name          = "jiejiechen-main"
  protocol_type = "HTTP"
}

resource "aws_apigatewayv2_stage" "default" {
  api_id = aws_apigatewayv2_api.jiejiechen_main_gw.id

  name        = "$default"
  auto_deploy = true

  access_log_settings {
    destination_arn = aws_cloudwatch_log_group.main_api_gw.arn

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

resource "aws_cloudwatch_log_group" "main_api_gw" {
  name = "/aws/api-gw/${aws_apigatewayv2_api.jiejiechen_main_gw.name}"

  retention_in_days = 30
}

### JiejieChen Api ###
resource "aws_apigatewayv2_integration" "jiejiechen_api_lambda" {
  api_id = aws_apigatewayv2_api.jiejiechen_main_gw.id

  integration_type = "AWS_PROXY"
  integration_uri  = aws_lambda_function.html2docx.invoke_arn
}

resource "aws_apigatewayv2_route" "get_handler" {
  api_id    = aws_apigatewayv2_api.jiejiechen_main_gw.id
  route_key = "POST /api/download-cv"

  target = "integrations/${aws_apigatewayv2_integration.jiejiechen_api_lambda.id}"
}

resource "aws_lambda_permission" "jiejiechen_api_lambda" {
  statement_id  = "AllowExecutionFromAPIGateway_Api"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.html2docx.function_name
  principal     = "apigateway.amazonaws.com"

  source_arn = "${aws_apigatewayv2_api.jiejiechen_main_gw.execution_arn}/*/*"
}

## Custom Domain for Main ##

resource "aws_apigatewayv2_domain_name" "jiejiechen_main" {
  domain_name = var.main_domain_name

  domain_name_configuration {
    certificate_arn = var.api_domain_certificate_arn
    endpoint_type   = "REGIONAL"
    security_policy = "TLS_1_2"
  }
}

resource "aws_apigatewayv2_api_mapping" "jiejiechen_main" {
  api_id      = aws_apigatewayv2_api.jiejiechen_main_gw.id
  domain_name = aws_apigatewayv2_domain_name.jiejiechen_main.id
  stage       = aws_apigatewayv2_stage.default.id
}

## JiejieChenApp Angular ###
resource "aws_apigatewayv2_integration" "jiejiechen_angular_lambda" {
  api_id           = aws_apigatewayv2_api.jiejiechen_main_gw.id
  integration_type = "AWS_PROXY"
  integration_uri  = aws_lambda_function.jiejiechen_angular.invoke_arn
}

resource "aws_apigatewayv2_route" "jiejiechen_angular_root" {
  api_id    = aws_apigatewayv2_api.jiejiechen_main_gw.id
  route_key = "ANY /background"

  target = "integrations/${aws_apigatewayv2_integration.jiejiechen_angular_lambda.id}"
}


resource "aws_apigatewayv2_route" "jiejiechen_angular_other" {
  api_id    = aws_apigatewayv2_api.jiejiechen_main_gw.id
  route_key = "ANY /background/{proxy+}"

  target = "integrations/${aws_apigatewayv2_integration.jiejiechen_angular_lambda.id}"
}


resource "aws_lambda_permission" "jiejiechen_angular_lambda" {
  statement_id  = "AllowExecutionFromAPIGateway_Angular"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.jiejiechen_angular.function_name
  principal     = "apigateway.amazonaws.com"

  source_arn = "${aws_apigatewayv2_api.jiejiechen_main_gw.execution_arn}/*/*"
}

## JiejieChenApp React ###
# resource "aws_apigatewayv2_integration" "jiejiechen_react_lambda" {
#   api_id           = aws_apigatewayv2_api.jiejiechen_main_gw.id
#   integration_type = "AWS_PROXY"
#   integration_uri  = aws_lambda_function.jiejiechen_react.invoke_arn
# }
# 
# resource "aws_apigatewayv2_route" "jiejiechen_react" {
#   api_id    = aws_apigatewayv2_api.jiejiechen_main_gw.id
#   route_key = "ANY /{proxy+}"
# 
#   target = "integrations/${aws_apigatewayv2_integration.jiejiechen_react_lambda.id}"
# }
# 
# resource "aws_lambda_permission" "jiejiechen_react_lambda" {
#   statement_id  = "AllowExecutionFromAPIGateway_React"
#   action        = "lambda:InvokeFunction"
#   function_name = aws_lambda_function.jiejiechen_angular.function_name
#   principal     = "apigateway.amazonaws.com"
# 
#   source_arn = "${aws_apigatewayv2_api.jiejiechen_main_gw.execution_arn}/*/*"
# }