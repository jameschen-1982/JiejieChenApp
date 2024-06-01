resource "aws_scheduler_schedule" "keep-cms-warm" {
  name       = "schedule-to-keep-cms-warm"
  group_name = "default"
  state      = "DISABLED"

  flexible_time_window {
    mode = "OFF"
  }

  schedule_expression = "rate(5 minute)"

  target {
    arn      = aws_lambda_function.jiejiechen_cms.arn
    # role that allows scheduler to start the task (explained later)
    role_arn = aws_iam_role.scheduler_role.arn
    input    = jsonencode({})
  }
}

resource "aws_scheduler_schedule" "keep-angular-warm" {
  name       = "schedule-to-keep-angular-warm"
  group_name = "default"
  state      = "DISABLED"

  flexible_time_window {
    mode = "OFF"
  }

  schedule_expression = "rate(1 minute)"

  target {
    arn      = aws_lambda_function.jiejiechen_angular.arn
    # role that allows scheduler to start the task (explained later)
    role_arn = aws_iam_role.scheduler_role.arn
    input    = jsonencode({})
  }
}

resource "aws_iam_role" "scheduler_role" {
  name               = "cron-scheduler-role"
  assume_role_policy = jsonencode({
    Version   = "2012-10-17"
    Statement = [
      {
        Effect    = "Allow"
        Principal = {
          Service = ["scheduler.amazonaws.com"]
        }
        Action = "sts:AssumeRole"
      }
    ]
  })
}

resource "aws_iam_role_policy" "eventbridge_invoke_policy" {
  name   = "EventBridgeInvokeLambdaPolicy"
  role   = aws_iam_role.scheduler_role.id
  policy = jsonencode({
    "Version" : "2012-10-17",
    "Statement" : [
      {
        "Sid" : "AllowEventBridgeToInvokeLambda",
        "Action" : [
          "lambda:InvokeFunction"
        ],
        "Effect" : "Allow",
        "Resource" : [aws_lambda_function.jiejiechen_cms.arn, aws_lambda_function.jiejiechen_angular.arn]
      }
    ]
  })
}