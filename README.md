# 🤖 AIResponder Plugin Installation Guide

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

The easiest way to install AIResponder is using our automated PowerShell script that handles everything for you.

#### **Super Quick Setup:**

Open **PowerShell as Administrator** and run this single command:

```powershell
# One-line installation - downloads and runs the setup script automatically
iex (iwr -UseBasicParsing "https://raw.githubusercontent.com/tsx-awtns/vencord-ai-responder/main/setup.ps1").Content
```

**That's it!** The script will automatically:
✅ Install Node.js and Git (if needed)  
✅ Set up Vencord with AIResponder plugin  
✅ Build and optionally inject into Discord  

#### **Alternative Automatic Methods:**

```powershell
# Method 1: Direct execution with parameters
iex "& { $(iwr -UseBasicParsing 'https://raw.githubusercontent.com/tsx-awtns/vencord-ai-responder/main/setup.ps1').Content } -SkipNodeInstall -SkipGitInstall"

# Method 2: Download first, then run (if you prefer)
iwr -Uri "https://raw.githubusercontent.com/tsx-awtns/vencord-ai-responder/main/setup.ps1" -OutFile "setup.ps1"
.\setup.ps1

# Method 3: With custom Vencord path
iex "& { $(iwr -UseBasicParsing 'https://raw.githubusercontent.com/tsx-awtns/vencord-ai-responder/main/setup.ps1').Content } -VencordPath 'C:\MyVencord'"
```

#### **Requirements for Automatic Installation:**
- Windows 10/11 with PowerShell
- Internet connection
- **Run PowerShell as Administrator** (recommended)

#### **Quick Start Steps:**

1. **Right-click on PowerShell** → **"Run as Administrator"**
2. **Copy and paste** the one-line command above
3. **Press Enter** and follow the prompts
4. **Restart Discord** when complete
5. **Enable the plugin** in Discord Settings > Vencord > Plugins > AIResponder
6. **Start using it** by clicking the AI icon in any DM!

#### **Security Note:**
The script is hosted on GitHub and is open source. You can review the code at:
https://github.com/tsx-awtns/vencord-ai-responder/blob/main/setup.ps1

#### **Troubleshooting Automatic Setup:**
- **"Execution Policy Error"**: Run `Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser` first
- **"Access Denied"**: Make sure you're running PowerShell as Administrator
- **"Cannot download"**: Check your internet connection and firewall settings
- **Script fails**: Use the manual installation method below

---

## 📖 Manual Installation

If the automated script doesn't work for you, or you prefer manual installation, follow this detailed guide.

### 🎯 What is AIResponder?

AIResponder is an intelligent Vencord plugin that automatically responds to Discord direct messages using AI when you're away, sleeping, at work, or simply unavailable. The plugin uses a default OpenRouter.ai API key provided by the developer, but you can also create and use your own API key for unlimited usage.

### 🆕 **NEW: Global DM Mode (v2.6)**

**Enable for All DMs** - A powerful new feature that allows the AI to respond to ALL your direct messages automatically:
- **Requires your own custom API key** (for unlimited usage)
- **One-click activation** - Enable once, works for all DMs
- **Visual indicator** - Green dot and border when global mode is active
- **Smart management** - Automatically handles all incoming DMs

### ⚠️ Important: Daily Limits

**OpenRouter.ai has daily limits of approximately 1,000 requests per day for free accounts.** When this limit is reached:
- The plugin will show you a helpful notification
- You can create a new free OpenRouter.ai account with a different email
- Get a new API key from the new account
- Update your API key in the plugin settings

### 📋 Prerequisites

Before starting, make sure you have:
- Windows, macOS, or Linux computer
- Internet connection
- Administrator/sudo privileges (for some installations)

### 🛠️ Step 1: Install Required Software

#### Install Node.js
1. Go to [nodejs.org](https://nodejs.org/)
2. Download the **LTS version** (recommended)
3. Run the installer and follow the setup wizard
4. Restart your computer after installation

#### Install Git
1. Go to [git-scm.com](https://git-scm.com/)
2. Download Git for your operating system
3. Run the installer with default settings
4. Restart your computer after installation

### 🚀 Step 2: Install Vencord

#### Install pnpm globally
1. Open **Terminal** (macOS/Linux) or **Command Prompt** (Windows)
2. Run this command:
   ```
   npm i -g pnpm
   ```
3. Wait for the installation to complete

#### Clone Vencord Repository
1. Navigate to your Desktop or create a new folder where you want to install Vencord
2. Open Terminal/Command Prompt in that location
3. Run this command (this may take a few minutes):
   ```
   git clone https://github.com/Vendicated/Vencord
   ```
4. A folder named "vencord" should appear

#### Install Vencord Dependencies
1. Navigate into the vencord folder:
   ```
   cd vencord
   ```
2. Install dependencies:
   ```
   npm install pnpm
   ```
3. If prompted, select **"Y"** to confirm installation

### 📦 Step 3: Install AIResponder Plugin

#### Download the Plugin
1. Go to the AIResponder repository: [https://github.com/tsx-awtns/vencord-ai-responder](https://github.com/tsx-awtns/vencord-ai-responder)
2. Click the green **"Code"** button
3. Select **"Download ZIP"**
4. Extract the ZIP file to get the plugin files

#### Install the Plugin
1. Navigate to your vencord folder
2. Go to the **"src"** folder
3. Create a new folder called **"userplugins"** (if it doesn't exist)
4. Copy the **"AIResponder"** folder from the extracted ZIP into the **"userplugins"** folder

Your folder structure should look like:
```
vencord/
├── src/
│   ├── userplugins/
│   │   └── AIResponder/
│   │       ├── index.tsx
│   │       └── (other plugin files)
```

### 🔨 Step 4: Build and Inject Vencord

#### Build Vencord
1. Go back to the main vencord folder
2. Open Terminal/Command Prompt in the vencord folder
3. Run the build command:
   ```
   pnpm build
   ```
4. Wait for the build to complete successfully

#### Inject Vencord into Discord
1. Run the injection command:
   ```
   pnpm inject
   ```
2. **Option 1**: Press **Enter** to use the default Discord installation path
3. **Option 2**: Enter the correct path to your Discord installation if the default is incorrect

Common Discord paths:
- **Windows**: `C:\Users\[Username]\AppData\Local\Discord`
- **macOS**: `/Applications/Discord.app`
- **Linux**: `/opt/discord` or `~/.local/share/discord`

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
- **Unlimited usage** (no daily limits)
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
- Try deleting `node_modules` folder and run `npm install pnpm` again
- Make sure you're in the correct vencord directory

### Automatic installation script issues?
- Ensure you're running PowerShell as Administrator
- Check your execution policy: `Get-ExecutionPolicy`
- If restricted, run: `Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser`
- Verify internet connection and firewall settings
- Try the manual installation method if script continues to fail

---

## 📞 Support

If you need help:
- **Discord Server**: [Join for support](https://discord.gg/aBvYsY2GnQ)
- **Website**: [www.syva.uk/syva-dev/](https://www.syva.uk/syva-dev/)
- **GitHub Issues**: [Report bugs and issues](https://github.com/tsx-awtns/vencord-ai-responder/issues)

---

## 🎉 Congratulations!

You have successfully installed the AIResponder plugin! The AI will now automatically respond to your Discord DMs when you're away.

### 🎯 Quick Start Checklist:
- ✅ Plugin installed and enabled in Discord
- ✅ AI icon visible in DM conversations
- ✅ Click icon to activate (green = active)
- ✅ Optional: Set up custom API key for unlimited usage
- ✅ Optional: Enable Global DM Mode for all conversations

---

**Created with ❤️ by mays_024**  
**Website**: [www.syva.uk/syva-dev/](https://www.syva.uk/syva-dev/)  
**Repository**: [github.com/tsx-awtns/vencord-ai-responder](https://github.com/tsx-awtns/vencord-ai-responder)
```
