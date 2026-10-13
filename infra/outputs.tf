output "static_web_app_url" {
  description = "Default URL of the Static Web App"
  value       = azurerm_static_web_app.portfolio.default_host_name
}

output "static_web_app_id" {
  description = "Resource ID of the Static Web App"
  value       = azurerm_static_web_app.portfolio.id
}

output "resource_group_name" {
  description = "Name of the resource group"
  value       = azurerm_resource_group.main.name
}
