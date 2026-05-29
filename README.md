# CI/CD Pipeline with Terraform and EKS

**Author:** shanmhill@gmail.com  

---

## Project Overview

### Goals and motivation

In this project, I'm building a CI/CD pipeline using Terraform for infrastructure, Docker for containerization, Amazon EKS for Kubernetes orchestration, and GitHub Actions for automated deployments with OIDC authentication so I can learn how all of these things work together in a production environment.

## Setting Up the Development Environment

### Tools and purpose

In this step, I'm setting up AWS CLI, Docker Desktop, and kubectl so that I can interact with AWS from the command line and use Docker and Kubernetes.

![Image](https://learn.nextwork.org/soothed_turquoise_calm_dewberry/uploads/2c7719bf-ce2c-4222-b6b2-ef50d5e15ae1_biy01hzl)

### AWS CLI configuration

I configured my default region to us-east-1.

## Containerizing the Node.js Application

### Application and Dockerfile

In this step, I'm creating a simple application so that I can use it in the pipeline.

![Image](https://learn.nextwork.org/soothed_turquoise_calm_dewberry/uploads/2c7719bf-ce2c-4222-b6b2-ef50d5e15ae1_hcrmyakz)

### Health check endpoint design

The /health endpoint is used by Docker to check whether the connection is healthy.

## Provisioning AWS Infrastructure with Terraform

### Infrastructure as Code approach

In this step, I'm setting up my Terraform configuration so that I can provision AWS infrastructure.

![Image](https://learn.nextwork.org/soothed_turquoise_calm_dewberry/uploads/2c7719bf-ce2c-4222-b6b2-ef50d5e15ae1_0x1cog0x)

### Resources created in AWS

Terraform created an EKS cluster in the us-east-1 region including one node.

## Deploying to Kubernetes with Manifests

### Kubernetes deployment strategy

In this step, I'm creating a deployment manifest so that Kubernetes knows how to run my application.

![Image](https://learn.nextwork.org/soothed_turquoise_calm_dewberry/uploads/2c7719bf-ce2c-4222-b6b2-ef50d5e15ae1_dlgprno7)

### Understanding pod readiness

The pods are not ready because it is referencing a placeholder that does not exist in any registry. The CI/CD pipeline will replace the placeholder with the real ECR image URL on every push.

## Automating Deployments with GitHub Actions CI/CD

### Pipeline design and goals

In this step, I'm creating a GitHub Actions workflow so that I can deploy my app.

### OIDC vs static credentials

OIDC works by having GitHub prove the runner's identity to AWS using a short-lived token. AWS verifies the token came from your specific repository and branch, then issues temporary credentials that expire after the job finishes which differs from static keys because if AWS keys leak an attacker can gain lasting access to your account.

## Monitoring with CloudWatch Container Insights

### Observability setup

In this step, I'm setting up CloudWatch Container Insights so that I can check if my application is healthy after each deployment.

### IAM policy for CloudWatch

I attached the CloudWatchAgentServerPolicy because it grants the CloudWatch agent permission to send metrics, logs, and traces to CloudWatch.

![Image](https://learn.nextwork.org/soothed_turquoise_calm_dewberry/uploads/2c7719bf-ce2c-4222-b6b2-ef50d5e15ae1_3elpk9pq)

## Advanced Monitoring with Prometheus and Grafana

![Image](https://learn.nextwork.org/soothed_turquoise_calm_dewberry/uploads/2c7719bf-ce2c-4222-b6b2-ef50d5e15ae1_hgev6tbd)

### PromQL query and rate() function

In this project extension, I used the query:
rate(container_cpu_usage_seconds_total{pod=~"cicd-demo-app.*", container!=""}[5m])

The rate() function calculates the cumulative per-second CPU usage rate of each container.

## Reflections and Key Takeaways

### Tools and concepts learned

The key tools I used include...
EKS cluster (cicd-demo-cluster) with managed node group.
VPC, subnets, NAT gateway, and networking resources.
ECR repository (cicd-demo-app).
IAM OIDC provider, GitHub Actions IAM role, and EKS deploy policy.
CloudWatch Observability add-on and its IAM role.
Local project files, Docker images, and GitHub repository. 

Key concepts I learned include utilizing a CI/CD pipline, Kubernetes, Docker, and Terraform in conjunction together.

---

*Built with [NextWork](https://learn.nextwork.org) - [View this project](https://learn.nextwork.org/projects/2c7719bf-ce2c-4222-b6b2-ef50d5e15ae1)*
