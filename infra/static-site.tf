# Opt-in: provision a private origin for the EXISTING CloudFront distribution.
# Distribution E1DQTNP78PXVF5 is currently managed outside this Terraform repo.
# Attach the origin, function and behaviors to it separately after a reviewed backup.
resource "aws_s3_bucket" "static_site" {
  count  = var.enable_static_site ? 1 : 0
  bucket = "${local.stack_prefix}-static-site"
}

resource "aws_s3_bucket_public_access_block" "static_site" {
  count                   = var.enable_static_site ? 1 : 0
  bucket                  = aws_s3_bucket.static_site[0].id
  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}

resource "aws_cloudfront_origin_access_control" "static_site" {
  count                             = var.enable_static_site ? 1 : 0
  name                              = "${local.stack_prefix}-static-site"
  description                       = "Private static site bucket"
  origin_access_control_origin_type = "s3"
  signing_behavior                  = "always"
  signing_protocol                  = "sigv4"
}

# Next static export writes /blog/slug.html; map friendly URL paths to those objects.
resource "aws_cloudfront_function" "static_paths" {
  count   = var.enable_static_site ? 1 : 0
  name    = "${local.stack_prefix}-static-paths"
  runtime = "cloudfront-js-1.0"
  publish = true
  code    = file("${path.module}/static-paths.js")
}

data "aws_iam_policy_document" "static_site_read" {
  count = var.enable_static_site ? 1 : 0
  statement {
    actions   = ["s3:GetObject"]
    resources = ["${aws_s3_bucket.static_site[0].arn}/*"]
    principals {
      type        = "Service"
      identifiers = ["cloudfront.amazonaws.com"]
    }
    condition {
      test     = "StringEquals"
      variable = "AWS:SourceArn"
      values = concat(
        ["arn:aws:cloudfront::${local.account_id}:distribution/${var.static_site_distribution_id}"],
        var.static_site_preview_distribution_id == "" ? [] : ["arn:aws:cloudfront::${local.account_id}:distribution/${var.static_site_preview_distribution_id}"]
      )
    }
  }
}

resource "aws_s3_bucket_policy" "static_site" {
  count  = var.enable_static_site ? 1 : 0
  bucket = aws_s3_bucket.static_site[0].id
  policy = data.aws_iam_policy_document.static_site_read[0].json

  lifecycle {
    precondition {
      condition     = length(var.static_site_distribution_id) > 0
      error_message = "Provide the ID of the existing CloudFront distribution before enabling the static site."
    }
  }
}

output "static_site_bucket" {
  value = var.enable_static_site ? aws_s3_bucket.static_site[0].id : null
}

output "static_site_distribution_id" {
  value = var.enable_static_site ? var.static_site_distribution_id : null
}

output "static_site_origin_access_control_id" {
  value = var.enable_static_site ? aws_cloudfront_origin_access_control.static_site[0].id : null
}

output "static_site_rewrite_function_arn" {
  value = var.enable_static_site ? aws_cloudfront_function.static_paths[0].arn : null
}
