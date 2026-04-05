# JAZARI — Build Once. Expand Forever.

**One flexible, self-hosted platform. Unlimited plugins. Zero code changes.**

JAZARI is a powerful plugin-based system built with Python + Flask.  
Start with a clean, production-ready core and instantly add new features by uploading plugins — no coding, no restarts, no hassle.

Whether you need AI agents, document automation, custom dashboards, real-time tools, or anything else — just download a plugin from our website and upload it inside the app. Everything is handled automatically.

**Shipped as a single Docker image** → runs locally or on any server in minutes.

---

## ✨ Features

- **Plugin-first architecture** — extend functionality in seconds
- **Self-hosted & private** — your data never leaves your machine
- **Docker-powered** — consistent experience everywhere
- **Persistent storage** — plugins, database, and uploads survive updates
- **Built-in Plugin Manager** — one-click upload & install
- **Modern tech stack** — Flask, SQLAlchemy, SocketIO, AI-ready (Ollama, OpenAI, LangChain, etc.)
- **Lightweight & fast** — runs on modest hardware

---

## 🚀 Quick Start (Recommended)

### 1. Install Docker Desktop
Download and install from [docker.com](https://www.docker.com/products/docker-desktop/).

### 2. Download JAZARI
Go to our [official website](https://jazari.netlify.app/) and download:
- `jazari-v1.0.tar.gz` (the main application)
- Any plugins you want to try

### 3. Setup Your Folder
1. Create a new folder on your computer (e.g. `Jazari`)
2. Place the downloaded `jazari-v1.0.tar.gz` inside it

### 4. Create `docker-compose.yml`
In the same folder, create a file named `docker-compose.yml` and paste this:

```yaml
version: '3.8'

services:
  jazari:
    image: jazari:latest
    container_name: jazari-app
    ports:
      - "5000:5000"
    volumes:
      - ./instance:/app/instance
      - ./plugins:/app/core/plugins
    restart: unless-stopped
    environment:
      - FLASK_ENV=production
```

# Load the Docker image
docker load -i jazari-v1.0.tar.gz

# Start JAZARI
docker compose up -d

Open your browser and go to http://localhost:5000
Done! 🎉 Your JAZARI instance is now running.


# How to Install Plugins
   Go to our website → Plugins section
   Download any plugin (it comes as a .zip file)
   Open JAZARI in your browser
   Go to Settings → Plugin Manager
   Click "Upload Plugin"
   Select the downloaded .zip file
   Click Install

That’s it.
The plugin is automatically detected, installed, and activated. No restarts needed.

# Updating JAZARI
   Download the new jazari-vX.X.tar.gz from our website
   Place it in your Jazari folder
   Run the update commands above

All your plugins, data, and settings will remain safe.

# Troubleshooting
   Port 5000 already in use → Change 5000:5000 to 8080:5000 in docker-compose.yml and use http://localhost:8080
   Docker command not found → Make sure Docker Desktop is running
   Plugin upload fails → Check that the plugins folder exists and has write permission
   App not starting → Run docker compose logs and send us the output
