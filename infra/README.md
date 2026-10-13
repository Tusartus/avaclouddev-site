# Infrastructure

Terraform configuration for the avarthusdevcloud.cloud Azure Static Web App.

## Prerequisites

- Terraform >= 1.5.0
- Azure CLI authenticated (`az login`)
- Azure subscription with contributor access

## Setup

1. Create the remote state storage:
   ```bash
   az group create -n rg-terraform-state -l westeurope
   az storage account create -n stavarthustfstate -g rg-terraform-state -l westeurope --sku Standard_LRS
   az storage container create -n tfstate --account-name stavarthustfstate
   ```

2. Copy the example variables:
   ```bash
   cp terraform.tfvars.example terraform.tfvars
   ```

3. Initialize and apply:
   ```bash
   terraform init
   terraform plan -out=tfplan
   terraform apply tfplan
   ```

## Custom Domain

After applying, add a TXT record to your DNS:
- Host: `@`
- Value: The validation token from `terraform output`

Then add a CNAME/ALIAS record pointing to the Static Web App URL.
