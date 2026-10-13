terraform {
  backend "azurerm" {
    resource_group_name  = "rg-terraform-state"
    storage_account_name = "stavarthustfstate"
    container_name       = "tfstate"
    key                  = "avarthusdevcloud.terraform.tfstate"
  }
}
