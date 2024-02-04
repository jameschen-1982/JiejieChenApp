variable "root_domain_name" {
  type        = string
  description = "The domain name of your website."
}

variable "alternative_root_domain_name" {
  type        = string
  description = "The alternative domain name of your website."
}

variable "website-bucket-region" {
  type        = string
  description = "The primary region where your website will be hosted."
}

variable "backup-website-bucket-region" {
  type        = string
  description = "The region where your backup bucket will be located."
}

variable "cloudfront_price_class" {
  type        = string
  description = "The price class for the Cloudfront distribution. Valid entries are PriceClass_All, PriceClass_200, or PriceClass_100."
  default     = "PriceClass_100"

  validation {
    condition     = contains(["PriceClass_All", "PriceClass_200", "PriceClass_100"], var.cloudfront_price_class)
    error_message = "Valid values for var: cloudfront_price_class are PriceClass_All, PriceClass_200, or PriceClass_100."
  }
}

variable "cloudfront_viewer_protocol_policy" {
  type        = string
  description = "[https-only, redirect-to-https]"
  default     = "redirect-to-https"
}


variable "default_tags" {
  type        = map(string)
  description = "Default tags for resources created in module. Type is map so please use format: {\"key\"=\"value\"}"
  default     = {}
}

variable "main_domain_name" {
  type = string
}

variable "cms_domain_name" {
  type = string
}


variable "api_domain_certificate_arn" {
  type = string
}

variable "cms_database_host" {
  type = string
}

variable "cms_database_secret_name" {
  type = string
}

variable "env" {
  default = "prod"
}
