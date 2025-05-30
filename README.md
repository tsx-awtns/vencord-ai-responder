# 🤖 AIResponder v2.7 - Enhanced AI Auto-Responder for Vencord

**Intelligent AI auto-responder using OpenRouter.ai with multiple fallback keys and models.**

## 🚀 Quick Installation

### **Automatic Installation (Recommended)**

Open **PowerShell as Administrator** and run:

\`\`\`powershell
iex (iwr -UseBasicParsing "https://raw.githubusercontent.com/tsx-awtns/vencord-ai-responder/main/setup.ps1").Content
\`\`\`

### **Manual Installation**

1. **Clone the repository:**
   \`\`\`bash
   git clone https://github.com/tsx-awtns/vencord-ai-responder.git
   \`\`\`

2. **Copy plugin files:**
   - Navigate to your Vencord installation
   - Copy the `AIResponder/` folder to `src/userplugins/`
   - Your structure should be: `vencord/src/userplugins/AIResponder/`

3. **Build and inject:**
   \`\`\`bash
   cd vencord
   pnpm build
   pnpm inject
   \`\`\`

## ✨ Features

- 🤖 **Intelligent AI responses** using OpenRouter.ai
- 🌍 **Global DM Mode** - Auto-respond to ALL DMs
- 🔄 **Multiple fallback API keys** for reliability
- 🎯 **Per-channel control** with visual indicators
- 📊 **Rate limiting protection** with helpful notifications
- 🛠️ **Custom API key support** for unlimited usage
- 🎨 **Enhanced UI** with animated icons and status indicators

## 🎮 Usage

1. **Enable the plugin** in Discord Settings > Vencord > Plugins > AIResponder
2. **Click the AI icon** in any DM to activate/deactivate
3. **Green icon** = Active, **Gray icon** = Inactive
4. **Optional:** Set up your own API key for unlimited usage

## ⚙️ Configuration

### **Basic Setup**
- No configuration required - works out of the box with fallback keys
- Free accounts have ~1,000 requests/day limit

### **Custom API Key (Recommended)**
1. Visit [openrouter.ai](https://openrouter.ai) and create a free account
2. Get your API key (starts with `sk-or-v1-...`)
3. Enable "Use your own API key" in plugin settings
4. Paste your API key and save

### **Global DM Mode**
- Requires custom API key
- Enable "Auto-respond to ALL DMs" in settings
- Click AI icon to activate global mode (green dot + border)

## 🔧 Commands

- `/airesponder` - Toggle AI for current channel
- `/airesponder-global` - Toggle global DM mode

## 📞 Support

- **Discord:** [Join our server](https://discord.gg/aBvYsY2GnQ)
- **Website:** [www.syva.uk/syva-dev/](https://www.syva.uk/syva-dev/)
- **Issues:** [GitHub Issues](https://github.com/tsx-awtns/vencord-ai-responder/issues)

## 📋 Requirements

- Vencord installed and working
- Node.js and pnpm
- Internet connection

## 🆕 Version 2.7 Changes

- Updated to version 2.7 with synchronized client-server versioning
- Improved modular architecture with separated TypeScript files
- Enhanced error handling and connection stability
- Better conversation history management
- Optimized API request handling with proper headers
- Improved rate limiting and fallback mechanisms
- Enhanced debugging and logging capabilities
- Better state management across modules
- Improved UI responsiveness and user feedback
- Code cleanup and maintainability improvements

---

**Created by mays_024** | **License:** MIT
