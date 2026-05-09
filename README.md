# Prasann's Page - DevOps Deployment Guide

This project is a minimalist, high-performance landing page built for Prasann. It is designed to be easily containerized and deployed using modern CI/CD tools like Jenkins.

## 🚀 Docker Configuration

The project uses a **multi-stage Docker build** to ensure the production image is lightweight and secure.

### Dockerfile Breakdown

The `Dockerfile` in the root directory performs the following steps:

1.  **Build Stage**:
    -   Uses `node:20-alpine` as the base.
    -   Installs dependencies and runs `npm run build` to generate static assets in the `dist/` folder.
2.  **Serve Stage**:
    -   Uses `nginx:alpine` to serve the static content.
    -   Copies only the `dist/` folder from the build stage, keeping the final image size small.
    -   Exposes port `80`.

### Building and Running Locally

To build and run the image manually:

```bash
# Build the image
docker build -t prasann-page:latest .

# Run the container
docker run -d -p 8080:80 prasann-page:latest
```
Visit `http://localhost:8080` to see the page.

---

## 🛠 Jenkins Freestyle Job Setup

Follow these steps to deploy this page using a Jenkins Freestyle Job:

### 1. Creation & Source Control
-   Create a new **Freestyle project** named `Prasann-Page-Deploy`.
-   Under **Source Code Management**, select **Git**.
-   Enter your repository URL and set the branch (e.g., `*/main`).

### 2. Build Environment
-   (Optional) Check **Delete workspace before build starts** to ensure a clean slate.

### 3. Build Steps
Add an **Execute shell** build step with the following commands:

```bash
# Define variables
IMAGE_NAME="prasann-page"
CONTAINER_NAME="prasann-web-container"

# Stop and remove existing container if it exists
docker ps -q -f name=$CONTAINER_NAME | xargs -r docker stop
docker ps -a -q -f name=$CONTAINER_NAME | xargs -r docker rm

# Build the new image
docker build -t $IMAGE_NAME:$BUILD_NUMBER .

# Run the new container
docker run -d --name $CONTAINER_NAME -p 80:80 $IMAGE_NAME:$BUILD_NUMBER

# Clean up dangling images (optional)
docker image prune -f
```

### 4. Post-build Actions
-   Set up notifications (Email/Slack) to alert you of build status.

---

## 🏗 Project Stack
-   **Frontend**: React 19, Vite, Tailwind CSS
-   **Animations**: Framer Motion
-   **Icons**: Lucide React
-   **Server**: Nginx (Production) / Node (Dev)
