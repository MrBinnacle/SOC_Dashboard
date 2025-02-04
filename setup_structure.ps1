# Universal Project Setup Script for SOC_Dashboard
# Ensures a structured, secure, and best-practices-aligned repository setup.

# Define Project Directory
$repoPath = "C:\Users\mlpgr\Projects\SOC_Dashboard"

# Step 1: Verify Essential Tools Are Installed
if (-Not (Get-Command git -ErrorAction SilentlyContinue)) {
    Write-Host "ERROR: Git is not installed. Please install Git before running this script." -ForegroundColor Red
    exit
}
if (-Not (Get-Command python -ErrorAction SilentlyContinue)) {
    Write-Host "ERROR: Python is not installed. Please install Python before running this script." -ForegroundColor Red
    exit
}
if (-Not (Get-Command node -ErrorAction SilentlyContinue)) {
    Write-Host "ERROR: Node.js is not installed. Please install Node.js before running this script." -ForegroundColor Red
    exit
}

# Step 2: Create Folder Structure
Write-Host "Creating project folder structure..."
$folders = @(
    "$repoPath\backend\app\routes",
    "$repoPath\backend\app\services",
    "$repoPath\backend\app\database",
    "$repoPath\backend\tests",
    "$repoPath\frontend\src\components",
    "$repoPath\frontend\public",
    "$repoPath\tests\backend",
    "$repoPath\tests\frontend",
    "$repoPath\data_simulation",
    "$repoPath\devops\.github\workflows",
    "$repoPath\docs"
)
foreach ($folder in $folders) {
    if (-Not (Test-Path $folder)) {
        New-Item -Path $folder -ItemType Directory | Out-Null
    }
}

# Step 3: Create Core Files
Write-Host "Generating essential project files..."
$files = @{
    "$repoPath\.gitignore"             = @"
# Node.js
node_modules/
dist/
build/

# Python
venv/
__pycache__/
*.pyc

# Docker
*.dockerignore

# VSCode
.vscode/
.idea/
"@
    
    "$repoPath\README.md"               = "# SOC Dashboard - Security Operations Monitoring"
    
    "$repoPath\backend\requirements.txt" = @"
fastapi
uvicorn
pydantic
sqlalchemy
pytest
"@

    "$repoPath\frontend\package.json"    = @"
{
  "name": "soc-dashboard",
  "version": "1.0.0",
  "dependencies": {
    "react": "^18.0.0",
    "axios": "^0.21.1"
  }
}
"@

    "$repoPath\docker-compose.yml"      = @"
version: '3'

services:
  backend:
    build: ./backend
    ports:
      - "8000:8000"
    depends_on:
      - postgres
      - mongodb

  frontend:
    build: ./frontend
    ports:
      - "3000:3000"

  postgres:
    image: postgres:13
    environment:
      POSTGRES_USER: user
      POSTGRES_PASSWORD: password
      POSTGRES_DB: soc_dashboard
    ports:
      - "5432:5432"

  mongodb:
    image: mongo:4.4
    ports:
      - "27017:27017"
"@
}

foreach ($file in $files.Keys) {
    if (-Not (Test-Path $file)) {
        Set-Content -Path $file -Value $files[$file]
    }
}

# Step 4: Check Git Setup
cd $repoPath

# Verify if 'origin' remote exists
$gitRemote = git remote -v 2>&1
if ($gitRemote -match "fatal: not a git repository") {
    Write-Host "ERROR: This directory is not a Git repository. Run 'git init' first." -ForegroundColor Red
    exit
}

# Check if the 'main' branch exists
$gitBranch = git branch --show-current
if ($gitBranch -ne "main") {
    Write-Host "WARNING: Your current branch is '$gitBranch', not 'main'. Ensure you're on the correct branch before pushing." -ForegroundColor Yellow
}

# Step 5: Add, Commit, and Push to GitHub
Write-Host "Staging new structure in Git..."
git add .
git commit -m "Initial project folder structure setup"

# Check if the 'main' branch exists remotely before pushing
$branchCheck = git ls-remote --heads origin main
if ($branchCheck) {
    git push origin main
} else {
    Write-Host "ERROR: Remote branch 'main' does not exist. Create it manually or verify your GitHub setup." -ForegroundColor Red
    exit
}

# Step 6: Open VS Code
Write-Host "Launching VS Code..."
code $repoPath

Write-Host "Folder structure setup complete!"
