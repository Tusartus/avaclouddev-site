variable "resource_group_name" {
  description = "Name of the resource group"
  type        = string
  default     = "rg-avarthusdevcloud"
}

variable "location" {
  description = "Azure region"
  type        = string
  default     = "westeurope"
}

variable "static_web_app_name" {
  description = "Name of the Azure Static Web App"
  type        = string
  default     = "swa-avarthusdevcloud"
}

variable "custom_domain" {
  description = "Custom domain for the site"
  type        = string
  default     = "avarthusdevcloud.cloud"
}

variable "tags" {
  description = "Tags to apply to all resources"
  type        = map(string)
  default = {
    project     = "avarthusdevcloud"
    environment = "production"
    managed_by  = "terraform"
  }
}
