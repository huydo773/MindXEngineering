# Documentation for Local Development and Deployment Process

## Project Overview
-Create a Node.js / TypeScript API, containerize it, and push it to Azure Container Registry (ACR)

-Deploy the API to Azure Web App (optional) and AKS

-Configure Ingress Controller for public access

-Create a React frontend connected to the API

-Add authentication (OpenID)

-Deploy HTTPS with a custom domain using cert-manager

## Prerequisites
-Azure Subscription with contributor or owner permissions

-Docker installed

-Node.js + npm

-kubectl installed and configured

-Git repository access

-DNS access for creating A/CNAME records (for HTTPS)

## Tech Stack
- **Frontend:** CSS, React
- **Backend:** Node.js / Express (or your backend framework)  
- **Containerization:** Docker  
- **Deployment:** Azure Kubernetes Service (AKS), Azure Container Registry (ACR), Cert-Manager (Let's Encrypt DNS-01 via Cloudflare)

### Quick checks:
```bash
az account show
kubectl cluster-info
```
    
## Troubleshooting
-CORS Issues: Ensure backend Access-Control-Allow-Origin header matches frontend URL

-Port Conflicts: Check if local ports 3000 or 8080 are free

-Container Issues: Use docker logs <container-id> to debug
-OpenID / Authentication Issues: Verify client_id and redirect_uri match OpenID provider config.
-HTTPS / TLS Issues :Verify DNS A record points to Ingress external IP.

