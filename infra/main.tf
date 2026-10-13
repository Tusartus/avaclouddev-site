terraform {
  required_version = ">= 1.5.0"

  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "~> 3.80"
    }
  }
}

provider "azurerm" {
  features {}
}

resource "azurerm_resource_group" "main" {
  name     = var.resource_group_name
  location = var.location

  tags = var.tags
}

resource "azurerm_static_web_app" "portfolio" {
  name                = var.static_web_app_name
  resource_group_name = azurerm_resource_group.main.name
  location            = azurerm_resource_group.main.location
  sku_tier            = "Free"
  sku_size            = "Free"

  tags = var.tags
}

resource "azurerm_static_web_app_custom_domain" "apex" {
  static_web_app_id = azurerm_static_web_app.portfolio.id
  domain_name       = var.custom_domain
  validation_type   = "dns-txt-token"
}
