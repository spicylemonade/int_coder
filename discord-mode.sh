#!/bin/bash
# Discord Mode Launcher
# This script runs the app in Discord mode with completely invisible overlay

echo "🎮 Starting Interview Coder in Discord Mode..."
echo "📝 Make sure you have set up your .env file with Discord credentials"
echo ""

# Check if .env file exists
if [ ! -f ".env" ]; then
    echo "❌ Error: .env file not found!"
    echo "📝 Please copy .env.example to .env and add your Discord bot token and channel ID"
    echo ""
    echo "Steps:"
    echo "  1. cp .env.example .env"
    echo "  2. Edit .env and add your Discord bot token and channel ID"
    echo "  3. Run this script again"
    exit 1
fi

# Check if Discord credentials are set
if ! grep -q "DISCORD_BOT_TOKEN=your_discord_bot_token_here" .env 2>/dev/null; then
    echo "✅ Discord credentials detected in .env"
else
    echo "❌ Error: Please update .env with your actual Discord bot token!"
    echo "📝 Edit .env and replace 'your_discord_bot_token_here' with your actual token"
    exit 1
fi

echo "🚀 Launching in Discord mode..."
echo ""
echo "📸 To use:"
echo "  - Take screenshot: Cmd+Shift+S (or Ctrl+Shift+S on Linux)"
echo "  - Process: Ctrl+Enter"
echo "  - Solutions will appear in your Discord channel!"
echo ""
echo "🔒 The overlay is completely invisible - no UI will show on screen"
echo ""

npm run dev:discord
