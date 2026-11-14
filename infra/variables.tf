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

variable "enable_static_site" {
  description = "Provision a private S3 origin for the existing CloudFront distribution. Keep false until the content snapshot is ready."
  type        = bool
  default     = false
}

variable "static_site_distribution_id" {
  description = "ID of the EXISTING distribution for the main domain (currently E1DQTNP78PXVF5). Never create a second distribution with the same alias."
  type        = string
  default     = ""
}

variable "static_site_preview_distribution_id" {
  description = "Optional temporary CloudFront preview distribution allowed to read the static bucket."
  type        = string
  default     = ""
}
