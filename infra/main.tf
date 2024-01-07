provider "aws" {
  region = var.website-bucket-region
  default_tags {
    tags = var.default_tags
  }
}

provider "aws" {
  alias  = "backup-website-region"
  region = var.backup-website-bucket-region
  default_tags {
    tags = var.default_tags
  }
}

provider "aws" {
  alias  = "cloudfront-certificate"
  region = "us-east-1"
  default_tags {
    tags = var.default_tags
  }
}

terraform {
  backend "s3" {
    bucket = "c2j"
    key    = "terraform-states/www.jiejiechen.com-prod/terraform.tfstate"
    region = "ap-southeast-2"
  }
}