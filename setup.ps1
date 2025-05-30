# AIResponder Plugin Automated Setup Script
# Version: 2.6
# Author: mays_024
# Website: https://www.syva.uk/syva-dev/

param(
    [switch]$SkipNodeInstall,
    [switch]$SkipGitInstall,
    [string]$VencordPath = "",
    [switch]$Help
)

# Color functions for better output
function Write-Success { param($Message) Write-Host $Message -ForegroundColor Green }
function Write-Warning { param($Message) Write-Host $Message -ForegroundColor Yellow }
function Write-Error { param($Message) Write-Host $Message -ForegroundColor Red }
function Write-Info { param($Message) Write-Host $Message -ForegroundColor Cyan }
function Write-Step { param($Message) Write-Host "`n=== $Message ===" -ForegroundColor Magenta }

# Help function
function Show-Help {
    Write-Host @"
AIResponder Plugin Automated Setup Script

USAGE:
    .\setup.ps1 [OPTIONS]

OPTIONS:
    -SkipNodeInstall    Skip Node.js installation check
    -SkipGitInstall     Skip Git installation check  
    -VencordPath        Specify custom Vencord installation path
    -Help               Show this help message

EXAMPLES:
    .\setup.ps1                                    # Full automated setup
    .\setup.ps1 -SkipNodeInstall -SkipGitInstall   # Skip dependency checks
    .\setup.ps1 -VencordPath "C:\MyVencord"        # Use custom Vencord path

REQUIREMENTS:
    - Windows PowerShell 5.1 or PowerShell Core 7+
    - Internet connection
    - Administrator privileges (recommended)

"@ -ForegroundColor White
}

if ($Help) {
    Show-Help
    exit 0
}

# Check if running as administrator
function Test-Administrator {
    $currentUser = [Security.Principal.WindowsIdentity]::GetCurrent()
    $principal = New-Object Security.Principal.WindowsPrincipal($currentUser)
    return $principal.IsInRole([Security.Principal.WindowsBuiltInRole]::Administrator)
}

# Check if command exists
function Test-Command {
    param($Command)
    try {
        Get-Command $Command -ErrorAction Stop | Out-Null
        return $true
    }
    catch {
        return $false
    }
}

# Download and install Node.js
function Install-NodeJS {
    Write-Step "Installing Node.js"
    
    if (Test-Command "node") {
        $nodeVersion = node --version
        Write-Success "Node.js is already installed: $nodeVersion"
        return
    }
    
    Write-Info "Downloading Node.js LTS..."
    $nodeUrl = "https://nodejs.org/dist/v20.10.0/node-v20.10.0-x64.msi"
    $nodeInstaller = "$env:TEMP\nodejs-installer.msi"
    
    try {
        Invoke-WebRequest -Uri $nodeUrl -OutFile $nodeInstaller -UseBasicParsing
        Write-Info "Installing Node.js..."
        Start-Process -FilePath "msiexec.exe" -ArgumentList "/i", $nodeInstaller, "/quiet", "/norestart" -Wait
        
        # Refresh environment variables
        $env:Path = [System.Environment]::GetEnvironmentVariable("Path", "Machine") + ";" + [System.Environment]::GetEnvironmentVariable("Path", "User")
        
        if (Test-Command "node") {
            Write-Success "Node.js installed successfully!"
        } else {
            Write-Warning "Node.js installation completed, but 'node' command not found. You may need to restart your terminal."
        }
        
        Remove-Item $nodeInstaller -Force -ErrorAction SilentlyContinue
    }
    catch {
        Write-Error "Failed to install Node.js: $($_.Exception.Message)"
        Write-Info "Please install Node.js manually from https://nodejs.org/"
        exit 1
    }
}

# Download and install Git
function Install-Git {
    Write-Step "Installing Git"
    
    if (Test-Command "git") {
        $gitVersion = git --version
        Write-Success "Git is already installed: $gitVersion"
        return
    }
    
    Write-Info "Downloading Git..."
    $gitUrl = "https://github.com/git-for-windows/git/releases/download/v2.42.0.windows.2/Git-2.42.0.2-64-bit.exe"
    $gitInstaller = "$env:TEMP\git-installer.exe"
    
    try {
        Invoke-WebRequest -Uri $gitUrl -OutFile $gitInstaller -UseBasicParsing
        Write-Info "Installing Git..."
        Start-Process -FilePath $gitInstaller -ArgumentList "/VERYSILENT", "/NORESTART" -Wait
        
        # Refresh environment variables
        $env:Path = [System.Environment]::GetEnvironmentVariable("Path", "Machine") + ";" + [System.Environment]::GetEnvironmentVariable("Path", "User")
        
        if (Test-Command "git") {
            Write-Success "Git installed successfully!"
        } else {
            Write-Warning "Git installation completed, but 'git' command not found. You may need to restart your terminal."
        }
        
        Remove-Item $gitInstaller -Force -ErrorAction SilentlyContinue
    }
    catch {
        Write-Error "Failed to install Git: $($_.Exception.Message)"
        Write-Info "Please install Git manually from https://git-scm.com/"
        exit 1
    }
}

# Install pnpm globally
function Install-Pnpm {
    Write-Step "Installing pnpm"
    
    if (Test-Command "pnpm") {
        $pnpmVersion = pnpm --version
        Write-Success "pnpm is already installed: $pnpmVersion"
        return
    }
    
    try {
        Write-Info "Installing pnpm globally..."
        npm install -g pnpm
        Write-Success "pnpm installed successfully!"
    }
    catch {
        Write-Error "Failed to install pnpm: $($_.Exception.Message)"
        exit 1
    }
}

# Clone Vencord repository
function Install-Vencord {
    param($InstallPath)
    
    Write-Step "Setting up Vencord"
    
    if (Test-Path "$InstallPath\package.json") {
        Write-Success "Vencord already exists at: $InstallPath"
        return $InstallPath
    }
    
    $parentDir = Split-Path $InstallPath -Parent
    if (!(Test-Path $parentDir)) {
        New-Item -ItemType Directory -Path $parentDir -Force | Out-Null
    }
    
    try {
        Write-Info "Cloning Vencord repository..."
        Set-Location $parentDir
        git clone https://github.com/Vendicated/Vencord.git (Split-Path $InstallPath -Leaf)
        
        if (Test-Path "$InstallPath\package.json") {
            Write-Success "Vencord cloned successfully!"
        } else {
            throw "Vencord clone verification failed"
        }
        
        return $InstallPath
    }
    catch {
        Write-Error "Failed to clone Vencord: $($_.Exception.Message)"
        exit 1
    }
}

# Install Vencord dependencies
function Install-VencordDependencies {
    param($VencordPath)
    
    Write-Step "Installing Vencord dependencies"
    
    try {
        Set-Location $VencordPath
        Write-Info "Installing dependencies with pnpm..."
        pnpm install
        Write-Success "Vencord dependencies installed successfully!"
    }
    catch {
        Write-Error "Failed to install Vencord dependencies: $($_.Exception.Message)"
        exit 1
    }
}

# Clone AIResponder plugin directly
function Install-AIResponder {
    param($VencordPath)
    
    Write-Step "Installing AIResponder Plugin"
    
    $userPluginsPath = Join-Path $VencordPath "src\userplugins"
    $aiResponderPath = Join-Path $userPluginsPath "vencord-ai-responder"
    
    if (Test-Path "$aiResponderPath\index.tsx") {
        Write-Success "AIResponder plugin already exists!"
        return
    }
    
    # Create userplugins directory if it doesn't exist
    if (!(Test-Path $userPluginsPath)) {
        New-Item -ItemType Directory -Path $userPluginsPath -Force | Out-Null
        Write-Info "Created userplugins directory"
    }
    
    try {
        Write-Info "Cloning AIResponder plugin repository..."
        Set-Location $userPluginsPath
        
        # Remove existing directory if it exists but is incomplete
        if (Test-Path $aiResponderPath) {
            Write-Info "Removing incomplete AIResponder directory..."
            Remove-Item $aiResponderPath -Recurse -Force
        }
        
        # Clone the repository directly into userplugins
        git clone https://github.com/tsx-awtns/vencord-ai-responder.git
        
        if (Test-Path "$aiResponderPath\index.tsx") {
            Write-Success "AIResponder plugin cloned successfully!"
        } else {
            throw "AIResponder plugin files not found after cloning"
        }
    }
    catch {
        Write-Error "Failed to clone AIResponder plugin: $($_.Exception.Message)"
        Write-Info "You can manually clone from: https://github.com/tsx-awtns/vencord-ai-responder.git"
        exit 1
    }
}

# Build Vencord
function Build-Vencord {
    param($VencordPath)
    
    Write-Step "Building Vencord"
    
    try {
        Set-Location $VencordPath
        Write-Info "Building Vencord with AIResponder plugin..."
        pnpm build
        Write-Success "Vencord built successfully!"
    }
    catch {
        Write-Error "Failed to build Vencord: $($_.Exception.Message)"
        exit 1
    }
}

# Inject Vencord into Discord
function Inject-Vencord {
    param($VencordPath)
    
    Write-Step "Injecting Vencord into Discord"
    
    try {
        Set-Location $VencordPath
        Write-Info "Injecting Vencord into Discord..."
        Write-Warning "If prompted, press ENTER to use the default Discord path, or enter your custom Discord path."
        pnpm inject
        Write-Success "Vencord injection completed!"
    }
    catch {
        Write-Error "Failed to inject Vencord: $($_.Exception.Message)"
        Write-Info "You can manually run 'pnpm inject' in the Vencord directory later."
    }
}

# Main execution
function Main {
    Write-Host @"
╔══════════════════════════════════════════════════════════════╗
║                   AIResponder Setup Script                  ║
║                        Version 2.6                          ║
║                     by mays_024                              ║
╚══════════════════════════════════════════════════════════════╝
"@ -ForegroundColor Cyan

    # Check administrator privileges
    if (!(Test-Administrator)) {
        Write-Warning "Running without administrator privileges. Some installations might fail."
        Write-Info "Consider running PowerShell as Administrator for best results."
        $continue = Read-Host "Continue anyway? (y/N)"
        if ($continue -ne "y" -and $continue -ne "Y") {
            exit 0
        }
    }

    # Install dependencies
    if (!$SkipNodeInstall) {
        Install-NodeJS
    }
    
    if (!$SkipGitInstall) {
        Install-Git
    }
    
    Install-Pnpm
    
    # Determine Vencord installation path
    if ([string]::IsNullOrEmpty($VencordPath)) {
        $defaultPath = Join-Path $env:USERPROFILE "Desktop\Vencord"
        $VencordPath = Read-Host "Enter Vencord installation path (default: $defaultPath)"
        if ([string]::IsNullOrEmpty($VencordPath)) {
            $VencordPath = $defaultPath
        }
    }
    
    # Setup Vencord and AIResponder
    $vencordDir = Install-Vencord -InstallPath $VencordPath
    Install-VencordDependencies -VencordPath $vencordDir
    Install-AIResponder -VencordPath $vencordDir
    Build-Vencord -VencordPath $vencordDir
    
    # Ask about injection
    Write-Info "`nVencord and AIResponder are now ready!"
    $inject = Read-Host "Do you want to inject Vencord into Discord now? (Y/n)"
    if ($inject -ne "n" -and $inject -ne "N") {
        Inject-Vencord -VencordPath $vencordDir
    }
    
    # Final instructions
    Write-Step "Setup Complete!"
    Write-Success @"
✅ AIResponder plugin has been successfully installed!

NEXT STEPS:
1. Restart Discord completely
2. Go to Discord Settings > Vencord > Plugins
3. Enable the 'AIResponder' plugin
4. Configure your settings (optional)
5. Click the AI icon in any DM to start using it!

OPTIONAL - GET YOUR OWN API KEY:
• Visit: https://openrouter.ai
• Sign up for free account
• Get API key for unlimited usage (~1,000 requests/day limit removed)
• Enable 'Use your own API key' in plugin settings

SUPPORT:
• Discord: https://discord.gg/aBvYsY2GnQ
• Website: https://www.syva.uk/syva-dev/

Enjoy your AI auto-responder! 🤖✨
"@

    Write-Info "`nVencord installation directory: $vencordDir"
    
    if ($inject -eq "n" -or $inject -eq "N") {
        Write-Warning "Remember to run 'pnpm inject' in the Vencord directory to inject into Discord!"
    }
}

# Run main function
try {
    Main
}
catch {
    Write-Error "Setup failed: $($_.Exception.Message)"
    Write-Info "Please check the error above and try again, or install manually using the README.md guide."
    exit 1
}
finally {
    # Return to original directory
    if ($PWD.Path -ne $PSScriptRoot) {
        Set-Location $PSScriptRoot
    }
}
