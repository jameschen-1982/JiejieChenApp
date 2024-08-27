# resource "aws_s3_object" "jiejiechen_react_artifact" {
#   bucket = aws_s3_bucket.lambda_bucket.id
#   key    = "jiejiechen-react.zip"
#   source = "${path.module}/../package/jiejiechen-react.zip"
#   etag   = filesha256("${path.module}/../package/jiejiechen-react.zip")
# }
# 
resource "aws_lambda_function" "jiejiechen_react" {
  function_name = "${local.stack_prefix}-react"

  role         = aws_iam_role.handler_lambda_exec.arn
  timeout      = 90
  image_uri    = "${aws_ecr_repository.jiejiechen_react.repository_url}:latest"
  package_type = "Image"
  memory_size  = 128
}
# 
# resource "aws_cloudwatch_log_group" "jiejiechen_react" {
#   name = "/aws/lambda/${aws_lambda_function.jiejiechen_react.function_name}"
# }
