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
