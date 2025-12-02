#!/bin/bash
# Devcontainer setup script for Vibe Coding Photo Booth
# This script is run after the container is created

set -e

echo "=== Setting up Vibe Coding Photo Booth Development Environment ==="

# Install Claude Code globally
echo "Installing Claude Code..."
npm install -g @anthropic-ai/claude-code

# Install project dependencies
echo "Installing project dependencies..."
cd /workspaces/2025-a4d-ai-photo-booth
npm install

# Install Playwright dependencies for Firefox
echo "Installing Playwright system dependencies for Firefox..."
npx playwright install-deps firefox

# Install Firefox browser for Playwright
echo "Installing Firefox browser for Playwright..."
npx playwright install firefox

# Install Playwright MCP server globally for convenience
echo "Installing Playwright MCP server..."
npm install -g @playwright/mcp

# Configure Playwright MCP server in Claude Code
echo "Configuring Playwright MCP server in Claude Code..."
claude mcp add playwright -- npx @playwright/mcp --browser firefox --headless

echo "=== Setup Complete ==="
echo ""
echo "Available commands:"
echo "  npm run dev      - Start the Next.js development server"
echo "  npm run capture  - Capture screenshots of an app"
echo "  npm run collage  - Generate a collage from screenshots"
echo ""
echo "Playwright MCP server can be started with:"
echo "  npx @playwright/mcp --browser firefox --headless"
