param(
    [switch]$SkipNodeInstall,
    [switch]$SkipGitInstall,
    [string]$VencordPath = "",
    [switch]$Help
)

function Write-Success { param($Message) Write-Host $Message -ForegroundColor Green }
function Write-Warning { param($Message) Write-Host $Message -ForegroundColor Yellow }
function Write-Error { param($Message) Write-Host $Message -ForegroundColor Red }
function Write-Info { param($Message) Write-Host $Message -ForegroundColor Cyan }
function Write-Step { param($Message) Write-Host "`n=== $Message ===" -ForegroundColor Magenta }

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
    .\setup.ps1
    .\setup.ps1 -SkipNodeInstall -SkipGitInstall
    .\setup.ps1 -VencordPath "C:\MyVencord"

"@ -ForegroundColor White
}

if ($Help) { Show-Help; exit 0 }

function Test-Administrator {
    $currentUser = [Security.Principal.WindowsIdentity]::GetCurrent()
    $principal = New-Object Security.Principal.WindowsPrincipal($currentUser)
    return $principal.IsInRole([Security.Principal.WindowsBuiltInRole]::Administrator)
}

function Test-Command {
    param($Command)
    try { Get-Command $Command -ErrorAction Stop | Out-Null; return $true }
    catch { return $false }
}

function Install-NodeJS {
    Write-Step "Installing Node.js"
    
    if (Test-Command "node") {
        Write-Success "Node.js is already installed: $(node --version)"
        return
    }
    
    $nodeUrl = "https://nodejs.org/dist/v20.10.0/node-v20.10.0-x64.msi"
    $nodeInstaller = "$env:TEMP\nodejs-installer.msi"
    
    try {
        Write-Info "Downloading and installing Node.js..."
        Invoke-WebRequest -Uri $nodeUrl -OutFile $nodeInstaller -UseBasicParsing
        Start-Process -FilePath "msiexec.exe" -ArgumentList "/i", $nodeInstaller, "/quiet", "/norestart" -Wait
        
        $env:Path = [System.Environment]::GetEnvironmentVariable("Path", "Machine") + ";" + [System.Environment]::GetEnvironmentVariable("Path", "User")
        
        if (Test-Command "node") {
            Write-Success "Node.js installed successfully!"
        } else {
            Write-Warning "Node.js installed, but 'node' command not found. Restart terminal may be required."
        }
        
        Remove-Item $nodeInstaller -Force -ErrorAction SilentlyContinue
    }
    catch {
        Write-Error "Failed to install Node.js: $($_.Exception.Message)"
        Write-Info "Install manually from https://nodejs.org/"
        exit 1
    }
}

function Install-Git {
    Write-Step "Installing Git"
    
    if (Test-Command "git") {
        Write-Success "Git is already installed: $(git --version)"
        return
    }
    
    $gitUrl = "https://github.com/git-for-windows/git/releases/download/v2.42.0.windows.2/Git-2.42.0.2-64-bit.exe"
    $gitInstaller = "$env:TEMP\git-installer.exe"
    
    try {
        Write-Info "Downloading and installing Git..."
        Invoke-WebRequest -Uri $gitUrl -OutFile $gitInstaller -UseBasicParsing
        Start-Process -FilePath $gitInstaller -ArgumentList "/VERYSILENT", "/NORESTART" -Wait
        
        $env:Path = [System.Environment]::GetEnvironmentVariable("Path", "Machine") + ";" + [System.Environment]::GetEnvironmentVariable("Path", "User")
        
        if (Test-Command "git") {
            Write-Success "Git installed successfully!"
        } else {
            Write-Warning "Git installed, but 'git' command not found. Restart terminal may be required."
        }
        
        Remove-Item $gitInstaller -Force -ErrorAction SilentlyContinue
    }
    catch {
        Write-Error "Failed to install Git: $($_.Exception.Message)"
        Write-Info "Install manually from https://git-scm.com/"
        exit 1
    }
}

function Install-Pnpm {
    Write-Step "Installing pnpm"
    
    if (Test-Command "pnpm") {
        Write-Success "pnpm is already installed: $(pnpm --version)"
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

function Install-AIResponder {
    param($VencordPath)
    
    Write-Step "Installing AIResponder Plugin"
    
    $userPluginsPath = Join-Path $VencordPath "src\userplugins"
    $aiResponderPath = Join-Path $userPluginsPath "AIResponder"
    
    if (Test-Path "$aiResponderPath\index.tsx") {
        Write-Success "AIResponder plugin already exists!"
        return
    }
    
    if (!(Test-Path $userPluginsPath)) {
        New-Item -ItemType Directory -Path $userPluginsPath -Force | Out-Null
        Write-Info "Created userplugins directory"
    }
    
    try {
        Write-Info "Cloning AIResponder plugin repository..."
        Set-Location $userPluginsPath
        
        if (Test-Path $aiResponderPath) {
            Write-Info "Removing existing AIResponder directory..."
            Remove-Item $aiResponderPath -Recurse -Force
        }
        
        git clone https://github.com/tsx-awtns/vencord-ai-responder.git AIResponder
        
        if (Test-Path "$aiResponderPath\index.tsx") {
            Write-Success "AIResponder plugin cloned successfully!"
        } else {
            throw "AIResponder plugin files not found after cloning"
        }
    }
    catch {
        Write-Error "Failed to clone AIResponder plugin: $($_.Exception.Message)"
        Write-Info "Manual clone: https://github.com/tsx-awtns/vencord-ai-responder.git"
        exit 1
    }
}

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

function Inject-Vencord {
    param($VencordPath)
    
    Write-Step "Injecting Vencord into Discord"
    
    try {
        Set-Location $VencordPath
        Write-Info "Injecting Vencord into Discord..."
        Write-Warning "Press ENTER for default Discord path, or enter custom path."
        pnpm inject
        Write-Success "Vencord injection completed!"
    }
    catch {
        Write-Error "Failed to inject Vencord: $($_.Exception.Message)"
        Write-Info "Run 'pnpm inject' manually in the Vencord directory later."
    }
}

function Main {
    Write-Host @"
╔══════════════════════════════════════════════════════════════╗
║                   AIResponder Setup Script                  ║
║                        Version 2.6                          ║
║                     by mays_024                              ║
╚══════════════════════════════════════════════════════════════╝
"@ -ForegroundColor Cyan

    if (!(Test-Administrator)) {
        Write-Warning "Not running as Administrator. Some installations might fail."
        $continue = Read-Host "Continue anyway? (y/N)"
        if ($continue -ne "y" -and $continue -ne "Y") { exit 0 }
    }

    if (!$SkipNodeInstall) { Install-NodeJS }
    if (!$SkipGitInstall) { Install-Git }
    Install-Pnpm
    
    if ([string]::IsNullOrEmpty($VencordPath)) {
        $defaultPath = Join-Path $env:USERPROFILE "Desktop\Vencord"
        $VencordPath = Read-Host "Vencord installation path (default: $defaultPath)"
        if ([string]::IsNullOrEmpty($VencordPath)) { $VencordPath = $defaultPath }
    }
    
    $vencordDir = Install-Vencord -InstallPath $VencordPath
    Install-VencordDependencies -VencordPath $vencordDir
    Install-AIResponder -VencordPath $vencordDir
    Build-Vencord -VencordPath $vencordDir
    
    Write-Info "`nVencord and AIResponder are ready!"
    $inject = Read-Host "Inject Vencord into Discord now? (Y/n)"
    if ($inject -ne "n" -and $inject -ne "N") {
        Inject-Vencord -VencordPath $vencordDir
    }
    
    Write-Step "Setup Complete!"
    Write-Success @"
✅ AIResponder plugin installed successfully!

NEXT STEPS:
1. Restart Discord
2. Settings > Vencord > Plugins > Enable 'AIResponder'
3. Click AI icon in DMs to use

OPTIONAL API KEY:
• Visit: https://openrouter.ai
• Get free API key for unlimited usage
• Enable 'Use your own API key' in settings

SUPPORT: https://discord.gg/aBvYsY2GnQ
"@

    Write-Info "`nInstallation: $vencordDir"
    if ($inject -eq "n" -or $inject -eq "N") {
        Write-Warning "Run 'pnpm inject' in Vencord directory to inject into Discord!"
    }
}

try {
    Main
}
catch {
    Write-Error "Setup failed: $($_.Exception.Message)"
    Write-Info "Try manual installation or check README.md"
    exit 1
}
finally {
    if ($PWD.Path -ne $PSScriptRoot) { Set-Location $PSScriptRoot }
}
