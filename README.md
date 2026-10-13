# avarthusdevcloud.cloud

Portfolio site for an Azure Cloud & IAM Engineer. Built with Next.js, TypeScript, Tailwind CSS, and MDX.

## Project Structure

```
avaclouddev-site/
├── app/                          # Next.js App Router pages
│   ├── layout.tsx                # Root layout with theme, fonts, SEO
│   ├── page.tsx                  # Home page
│   ├── labs/                     # Labs index + [slug] detail
│   ├── case-study/cloudtodo/     # Flagship case study
│   ├── skills/                   # Skills & certifications
│   ├── work-with-me/             # Services page
│   ├── about/                    # About page
│   ├── contact/                  # Contact page
│   ├── how-this-site-works/      # Meta-lab page
│   ├── sitemap.ts                # Auto-generated sitemap
│   └── robots.ts                 # Robots.txt
├── components/
│   ├── layout/                   # Header, Footer
│   ├── home/                     # Hero, SkillsGrid, FeaturedLabs, HowIWork
│   ├── lab/                      # LabCard, LabFilters, VideoPlayer, MermaidDiagram, CodeBlock
│   └── ui/                       # Badge, Button, Card, etc.
├── content/labs/                 # MDX lab files
├── lib/                          # Utilities, MDX helpers, skills data
├── remotion/                     # Remotion video project
├── infra/                        # Terraform configuration
└── .github/workflows/            # CI/CD pipelines
```

## Local Development

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build
```

## Adding a New Lab

1. Create a new MDX file in `content/labs/`:
   ```
   content/labs/my-new-lab.mdx
   ```

2. Add frontmatter with this schema:
   ```yaml
   ---
   title: "My New Lab"
   slug: "my-new-lab"
   summary: "One-line description"
   problem: "One-sentence business problem"
   tags:
     - aks
     - terraform
   azureServices:
     - Azure Kubernetes Service
   tools:
     - Terraform
   difficulty: Intermediate
   durationMinutes: 30
   videoUrl: "https://www.youtube.com/watch?v=..."
   repoUrl: "https://github.com/Tusartus/..."
   monthlyCost: "~€10/month"
   status: published
   publishedAt: "2024-06-01"
   featured: false
   chapters:
     - time: "0:00"
       title: "Introduction"
   ---
   ```

3. Write the MDX body with Mermaid diagrams, code blocks, and all template sections.

4. The lab will automatically appear on the Labs page and in the sitemap.

## Rendering Remotion Videos

```bash
# Preview in browser
cd remotion && npm install && npm run preview

# Render to MP4
cd remotion && npm run render
```

Video data files live in `remotion/src/data/`. Create a new JSON file per lab.

## Deployment

### Infrastructure (Terraform)

```bash
cd infra
cp terraform.tfvars.example terraform.tfvars
# Edit terraform.tfvars with your values
terraform init
terraform plan -out=tfplan
terraform apply tfplan
```

### GitHub Actions

The CI/CD pipeline uses OIDC federated credentials. Set up:

1. Create an Entra ID app registration
2. Add a federated credential for your GitHub repo
3. Set these GitHub repository secrets:
   - `AZURE_CLIENT_ID`
   - `AZURE_TENANT_ID`
   - `AZURE_SUBSCRIPTION_ID`
   - `SWA_DEPLOYMENT_TOKEN`

Push to `main` triggers automatic deployment. PRs get preview environments.

## Design System

- **Background:** #0a0f1e (deep navy)
- **Surface:** #111827 (card backgrounds)
- **Accent:** #00d4ff (electric cyan)
- **Font stack:** DM Sans (body), Plus Jakarta Sans (headings), JetBrains Mono (code)
- **Dark mode** by default with light mode toggle

## License

MIT
