# Interview Coder

AI-powered interview preparation tool with invisibility features.

## Invisibility Compatibility

The application is invisible to:

- Zoom versions below 6.1.6 (inclusive)
- All browser-based screen recording software
- All versions of Discord
- Mac OS _screenshot_ functionality (Command + Shift + 3/4)

Note: The application is **NOT** invisible to:

- Zoom versions 6.1.6 and above
  - https://zoom.en.uptodown.com/mac/versions (link to downgrade Zoom if needed)
- Mac OS native screen _recording_ (Command + Shift + 5)

## Running the Application

### Quick Start

1. Clone the repository:

```bash
git clone https://github.com/spicylemonade/int_coder.git
cd int_coder
```

2. Install dependencies:

```bash
npm install
```

3. Run the appropriate script for your platform:

**For Windows:**
```bash
stealth-run.bat
```

**For macOS/Linux:**
```bash
# Make the script executable first
chmod +x stealth-run.sh
./stealth-run.sh
```

**IMPORTANT**: The application window will be invisible by default! Use Ctrl+B (or Cmd+B on Mac) to toggle visibility.

## Global Commands

- Toggle Window Visibility: [Control or Cmd + B]
- Move Window: [Control or Cmd + Arrow keys]
- Take Screenshot: [Control or Cmd + H]
- Delete Last Screenshot: [Control or Cmd + L]
- Process Screenshots: [Control or Cmd + Enter]
- Start New Problem: [Control or Cmd + R]
- Quit: [Control or Cmd + Q]
- Decrease Opacity: [Control or Cmd + []
- Increase Opacity: [Control or Cmd + ]]
- Zoom Out: [Control or Cmd + -]
- Reset Zoom: [Control or Cmd + 0]
- Zoom In: [Control or Cmd + =]

## How It Works

1. **Initial Setup**
   - Launch the invisible window
   - Enter your API key in the settings (OpenAI, Gemini, or Anthropic)
   - Choose your preferred model for extraction, solution generation, and debugging

2. **Capturing Problem**
   - Use global shortcut [Control or Cmd + H] to take screenshots of code problems
   - Screenshots are automatically added to the queue (up to 2)
   - If needed, remove the last screenshot with [Control or Cmd + L]

3. **Processing**
   - Press [Control or Cmd + Enter] to analyze the screenshots
   - AI extracts problem requirements from the screenshots
   - The model generates an optimal solution with an "Ideal Solution?" preview
   - Followed by a detailed solution with explanations

4. **Solution & Debugging**
   - View the generated solutions with detailed explanations
   - Use debugging feature by taking more screenshots of error messages or code
   - Get structured analysis with identified issues, corrections, and optimizations
   - Toggle between solutions and queue views as needed

5. **Window Management**
   - Move window using [Control or Cmd + Arrow keys]
   - Toggle visibility with [Control or Cmd + B]
   - Adjust opacity with [Control or Cmd + [] and [Control or Cmd + ]]
   - Window remains invisible to specified screen sharing applications
   - Start a new problem using [Control or Cmd + R]

## Features

- **Gemini 2.5 API Integration**: Uses latest Gemini 2.5 Pro and Flash models
- **Ideal Solution Generation**: Get quick code solutions during problem extraction
- **99% Invisibility**: Undetectable window that bypasses most screen capture methods
- **Smart Screenshot Capture**: Capture both question text and code separately
- **AI-Powered Analysis**: Automatically extracts and analyzes coding problems
- **Real-time Debugging**: Debug your code with AI assistance
- **Advanced Window Management**: Freely move, resize, change opacity, and zoom
- **Privacy-Focused**: Your API key and data never leave your computer

## License

This project is licensed under the GNU Affero General Public License v3.0 (AGPL-3.0).
