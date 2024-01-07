resource "aws_apigatewayv2_api" "hello-world" {
  name          = "hello-world-2"
  protocol_type = "HTTP"
}

resource "aws_apigatewayv2_stage" "default" {
  api_id = aws_apigatewayv2_api.hello-world.id

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
  name = "/aws/api-gw/${aws_apigatewayv2_api.hello-world.name}"

  retention_in_days = 30
}

resource "aws_apigatewayv2_integration" "lambda_handler" {
  api_id = aws_apigatewayv2_api.hello-world.id

  integration_type = "AWS_PROXY"
  integration_uri  = aws_lambda_function.handler.invoke_arn
}

resource "aws_apigatewayv2_route" "post_handler" {
  api_id    = aws_apigatewayv2_api.hello-world.id
  route_key = "POST /handler"

  target = "integrations/${aws_apigatewayv2_integration.lambda_handler.id}"
}

resource "aws_lambda_permission" "api_gw" {
  statement_id  = "AllowExecutionFromAPIGateway"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.handler.function_name
  principal     = "apigateway.amazonaws.com"

  source_arn = "${aws_apigatewayv2_api.hello-world.execution_arn}/*/*"
}