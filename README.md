# 🤖 AIResponder Plugin Installation Guide v2.7

--------------------------------------
# NOTICE: OpenRouter.ai enforces a daily limit (~1,000 requests/day) for free accounts.
⚠️ The previous information in the README and related .md files incorrectly stated that usage was "unlimited" — this is not true.
We apologize for the confusion. Please check the updated documentation for accurate details.
--------------------------------------

## 📋 Table of Contents
- [🚀 Automatic Installation (Recommended)](#-automatic-installation-recommended)
- [📖 Manual Installation](#-manual-installation)
- [⚙️ Configuration & Usage](#️-configuration--usage)
- [🔧 Troubleshooting](#-troubleshooting)
- [📞 Support](#-support)

---

## 🚀 Automatic Installation (Recommended)

### **NEW: One-Command Installation! ⚡**

The easiest way to install AIResponder v2.7 is using our automated installation scripts that handle everything for you.

---

### 🪟 **Windows (PowerShell)**

#### **Super Quick Setup:**

Open **PowerShell as Administrator** and run this single command:

````powershell
# One-line installation - downloads and runs the setup script automatically
iex (iwr -UseBasicParsing "https://raw.githubusercontent.com/tsx-awtns/vencord-ai-responder/main/setup.ps1").Content
````

**That's it!** The script will automatically:  
✅ Install Node.js and Git (if needed)  
✅ Set up Vencord with AIResponder v2.7 plugin  
✅ Build and optionally inject into Discord  

#### **Alternative Automatic Methods:**

````powershell
# Method 1: Direct execution with parameters
iex "& { $(iwr -UseBasicParsing 'https://raw.githubusercontent.com/tsx-awtns/vencord-ai-responder/main/setup.ps1').Content } -SkipNodeInstall -SkipGitInstall"

# Method 2: Download first, then run (if you prefer)
iwr -Uri "https://raw.githubusercontent.com/tsx-awtns/vencord-ai-responder/main/setup.ps1" -OutFile "setup.ps1"
.\setup.ps1

# Method 3: With custom Vencord path
iex "& { $(iwr -UseBasicParsing 'https://raw.githubusercontent.com/tsx-awtns/vencord-ai-responder/main/setup.ps1').Content } -VencordPath 'C:\MyVencord'"
````

#### **Requirements for Windows Installation:**
- Windows 10/11 with PowerShell
- Internet connection
- **Run PowerShell as Administrator** (recommended)

---

### 🐧 **Linux / macOS (Bash)**

#### **Super Quick Setup:**

Open your terminal and run this command:

````bash
# One-line installation - downloads and runs the setup script automatically
bash <(curl -fsSL https://raw.githubusercontent.com/tsx-awtns/vencord-ai-responder/main/setup.sh)
````

**That's it!** The script will automatically:  
✅ Install Node.js, Git, and pnpm (if needed)  
✅ Set up Vencord with AIResponder v2.7 plugin  
✅ Build and optionally inject into Discord  

#### **Alternative Linux Methods:**

```bash
# Download manually and run
curl -O https://raw.githubusercontent.com/tsx-awtns/vencord-ai-responder/main/setup.sh
chmod +x setup.sh
./setup.sh
```

#### **Requirements for Linux/macOS Installation:**
- curl and bash installed
- Internet connection
- Node.js ≥ v20, Git, and pnpm (auto-installed if missing)

---

### 🔐 Security Note:
The scripts are hosted on GitHub and are fully open source. You can review the code at:  
- [setup.ps1 (Windows)](https://github.com/tsx-awtns/vencord-ai-responder/blob/main/setup.ps1)  
- [setup.sh (Linux/macOS)](https://github.com/tsx-awtns/vencord-ai-responder/blob/main/setup.sh)

---

📖 Manual Installation Guide (AIResponder v2.7)

This guide explains how to manually install the AIResponder plugin for Vencord on Windows, macOS, and Linux.

---

🎯 What is AIResponder?

AIResponder v2.7 is an intelligent Vencord plugin that automatically responds to Discord direct messages using AI. It uses OpenRouter.ai and allows custom API keys for unlimited usage.

🆕 NEW: Global DM Mode
- Respond to all incoming DMs
- Requires your own API key
- One-click activation
- Visual indicator (green border)
- Smart management for all DMs

⚠️ Daily Limits
- Free OpenRouter accounts have ~1,000 daily requests
- Plugin shows a notification if limit is reached
- You can create a new account with a different email to bypass the limit

---

📋 Prerequisites (All Platforms)
- Node.js (LTS version)
- Git
- pnpm
- Internet connection
- Admin/sudo privileges

---

🪟 WINDOWS INSTALLATION

1. Install Node.js:
   - Download from https://nodejs.org (LTS version)
   - Install and restart your PC

2. Install Git:
   - Download from https://git-scm.com and install with default settings

3. Install pnpm:
   Open Command Prompt:
   ```
   npm i -g pnpm
   ```

4. Clone Vencord:
   ```
   git clone https://github.com/Vendicated/Vencord
   cd Vencord
   pnpm install
   ```

5. Download AIResponder Plugin:
   - From: https://github.com/tsx-awtns/vencord-ai-responder
   - Download ZIP, extract, and copy "AIResponder" folder into:
     ```
     vencord/src/userplugins/
     ```

6. Build and Inject:
   ```
   pnpm build
   pnpm inject
   ```

   Use default Discord path: 
   `C:\Users\YourName\AppData\Local\Discord`

---

🐧 LINUX & 🍏 MACOS INSTALLATION

1. Install Node.js:
   - Linux (Debian/Ubuntu):
     ```
     sudo apt install nodejs npm
     ```
   - macOS (with Homebrew):
     ```
     brew install node
     ```

2. Install Git:
   - Linux:
     ```
     sudo apt install git
     ```
   - macOS:
     ```
     brew install git
     ```

3. Install pnpm:
   ```
   npm i -g pnpm
   ```

4. Clone Vencord:
   ```
   git clone https://github.com/Vendicated/Vencord
   cd Vencord
   pnpm install
   ```

5. Download AIResponder Plugin:
   - From: https://github.com/tsx-awtns/vencord-ai-responder
   - Download ZIP, extract, and copy "AIResponder" folder into:
     ```
     vencord/src/userplugins/
     ```

6. Build and Inject:
   ```
   pnpm build
   pnpm inject
   ```

   Use path:
   - macOS: `/Applications/Discord.app`
   - Linux: `/opt/discord` or `~/.local/share/discord`

---

## ⚙️ Configuration & Usage

### ✅ Step 1: Activate the Plugin

1. **Restart Discord** completely
2. Open Discord Settings (gear icon)
3. Scroll down to find **"Vencord"** section
4. Click on **"Plugins"**
5. Find **"AIResponder"** in the plugin list
6. **Enable** the AIResponder plugin
7. Configure settings if needed (optional)

### 🎮 Step 2: Using the Plugin

#### Standard Mode (Per-Channel)
1. Open any **Direct Message** conversation
2. Look for the **AI bot icon** next to the message input field
3. **Click the icon** to activate/deactivate the AI responder
4. When active, the icon will glow **green**
5. When inactive, the icon will be **gray**

#### 🌐 **NEW: Global DM Mode**
1. **First**: Set up your own API key (see Step 3)
2. **Enable** "Enable for ALL DMs automatically" in plugin settings
3. **Click the AI icon** in any DM to activate Global DM Mode
4. **Visual indicators**: Green dot + green border around the icon
5. **AI now responds to ALL DMs automatically!**

#### Alternative: Use Slash Command
Type `/airesponder` in any chat to toggle the AI responder on/off.

### ⚙️ Step 3: Set Up Your Own API Key (Recommended)

#### Why use your own API key?
- **Faster responses** (priority processing)
- **Better reliability** (dedicated quota)
- **No interruptions** when default key reaches daily limit
- **🆕 Enables Global DM Mode** for all DMs

#### How to get your own API key:
1. Go to [openrouter.ai](https://openrouter.ai)
2. **Sign up** for a free account
3. Go to **"API Keys"** section
4. **Create a new API key**
5. **Copy** the API key (starts with `sk-or-v1-...`)

#### Configure your API key:
1. In Discord, go to **Settings > Vencord > Plugins > AIResponder**
2. Enable **"Use your own OpenRouter.ai API key"**
3. **Paste your API key** in the text field
4. **🆕 Enable "Enable for ALL DMs automatically"** (new feature!)
5. **Save** the settings

### 🌐 Step 4: Using Global DM Mode (NEW!)

#### What is Global DM Mode?
- **One activation = All DMs covered**
- AI responds to **every DM** automatically
- **Requires custom API key** for unlimited usage
- **Visual indicators** show when active

#### How to activate:
1. **Ensure you have a custom API key set up**
2. **Enable "Enable for ALL DMs automatically"** in settings
3. **Click the AI icon** in any DM conversation
4. **Look for**: Green dot + green border = Global Mode active
5. **Done!** AI now responds to all DMs automatically

#### How to deactivate:
- **Click the AI icon again** to turn off Global DM Mode
- **Or disable** "Enable for ALL DMs automatically" in settings

### 🚨 Daily Limit Reached?

If you see a notification that the daily limit has been reached:

#### For Default API Key Users:
1. **Create your own free account** at [openrouter.ai](https://openrouter.ai)
2. **Get your own API key** (unlimited daily usage)
3. **Enable "Use your own API key"** in plugin settings
4. **Paste your new API key** and save
5. **🆕 Enable Global DM Mode** for automatic responses to all DMs

#### For Custom API Key Users:
1. **Create a new OpenRouter.ai account** with a different email
2. **Get a new API key** from the new account
3. **Update your API key** in plugin settings
4. **Alternative**: Wait 24 hours for your current key's limit to reset

---

## 🔧 Troubleshooting

### Plugin not showing up?
- Make sure you placed the AIResponder folder in `src/userplugins/`
- Ensure you copied from the **AIResponder** subfolder in the downloaded ZIP
- Run `pnpm build` again
- Restart Discord completely

### AI not responding?
- Check if the AI icon is **green** (active)
- Make sure you're in a **Direct Message** (not a server)
- Check your internet connection
- **Check for daily limit notifications**

### Global DM Mode not working?
- **Ensure you have a custom API key** set up
- **Check that "Enable for ALL DMs automatically" is enabled**
- **Look for green dot + border** on the AI icon
- **Try clicking the icon again** to toggle

### Daily limit reached?
- **Follow the steps above** to create a new account or use your own API key
- The plugin will show helpful notifications with instructions

### Build errors?
- Make sure Node.js and Git are properly installed
- Try deleting `node_modules` folder and run `pnpm install` again
- Make sure you're in the correct vencord directory

### Automatic installation script issues?
- Ensure you're running PowerShell as Administrator
- Check your execution policy: `Get-ExecutionPolicy`
- If restricted, run: `Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser`
- Verify internet connection and firewall settings
- Try the manual installation method if script continues to fail

### Repository structure issues?
- The plugin files are now located in the **AIResponder/** subfolder
- Make sure to copy from `downloaded-zip/AIResponder/` to `vencord/src/userplugins/AIResponder/`
- The automatic script handles this structure change automatically

---

## 📞 Support

If you need help:
- **Discord Server**: [Join for support](https://discord.gg/aBvYsY2GnQ)
- **Website**: [www.syva.uk/syva-dev/](https://www.syva.uk/syva-dev/)
- **GitHub Issues**: [Report bugs and issues](https://github.com/tsx-awtns/vencord-ai-responder/issues)

---

## 🎉 Congratulations!

You have successfully installed the AIResponder v2.7 plugin! The AI will now automatically respond to your Discord DMs when you're away.

### 🎯 Quick Start Checklist:
- ✅ Plugin installed and enabled in Discord
- ✅ AI icon visible in DM conversations
- ✅ Click icon to activate (green = active)
- ✅ Optional: Set up custom API key for unlimited usage
- ✅ Optional: Enable Global DM Mode for all conversations

### 🆕 Version 2.7 Features:
- ✅ Synchronized client-server versioning
- ✅ Improved modular architecture with separated TypeScript files
- ✅ Enhanced error handling and connection stability
- ✅ Better conversation history management
- ✅ Optimized API request handling with proper headers
- ✅ Improved rate limiting and fallback mechanisms
- ✅ Enhanced debugging and logging capabilities
- ✅ Better state management across modules
- ✅ Improved UI responsiveness and user feedback
- ✅ Code cleanup and maintainability improvements

---

**Created with ❤️ by mays_024**  
**Website**: [www.syva.uk/syva-dev/](https://www.syva.uk/syva-dev/)  
**Repository**: [github.com/tsx-awtns/vencord-ai-responder](https://github.com/tsx-awtns/vencord-ai-responder)
