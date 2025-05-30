/**
 * AIResponder v2.7 - Enhanced AI Auto-Responder for Vencord
 *
 * @author mays_024
 * @id 1210310965162414134
 * @website https://www.syva.uk/syva-dev/
 * @repository https://github.com/tsx-awtns/vencord-ai-responder
 * @version 2.7
 * @license MIT
 *
 * CHANGES v2.7:
 * - Updated to version 2.7 with synchronized client-server versioning
 * - Improved modular architecture with separated TypeScript files
 * - Enhanced error handling and connection stability
 * - Better conversation history management
 * - Optimized API request handling with proper headers
 * - Improved rate limiting and fallback mechanisms
 * - Enhanced debugging and logging capabilities
 * - Better state management across modules
 * - Improved UI responsiveness and user feedback
 * - Code cleanup and maintainability improvements
 */

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
AIResponder Plugin Automated Setup Script v2.7

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
    try {
        $currentUser = [Security.Principal.WindowsIdentity]::GetCurrent()
        $principal = New-Object Security.Principal.WindowsPrincipal($currentUser)
        return $principal.IsInRole([Security.Principal.WindowsBuiltInRole]::Administrator)
    }
    catch {
        return $false
    }
}

function Test-Command {
    param($Command)
    try { Get-Command $Command -ErrorAction Stop | Out-Null; return $true }
    catch { return $false }
}

function Test-ValidPath {
    param($Path)
    try {
        if ([string]::IsNullOrWhiteSpace($Path)) { return $false }
        $Path = $Path.Trim('"').Trim("'").Trim()
        if ($Path.Length -eq 0) { return $false }
        $invalidChars = [System.IO.Path]::GetInvalidPathChars()
        foreach ($char in $invalidChars) {
            if ($Path.Contains($char)) { return $false }
        }
        return $true
    }
    catch {
        return $false
    }
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
        Read-Host "Press Enter to exit"
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
        Read-Host "Press Enter to exit"
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
        Read-Host "Press Enter to exit"
        exit 1
    }
}

function Get-VencordPath {
    $defaultPath = Join-Path $env:USERPROFILE "Desktop\Vencord"
    
    while ($true) {
        try {
            Write-Info "Enter Vencord installation path:"
            Write-Info "Default: $defaultPath"
            Write-Info "Press ENTER for default, or type custom path:"
            
            $userInput = Read-Host "Path"
            
            if ([string]::IsNullOrWhiteSpace($userInput)) {
                Write-Info "Using default path: $defaultPath"
                return $defaultPath
            }
            
            $userInput = $userInput.Trim('"').Trim("'").Trim()
            
            if (Test-ValidPath $userInput) {
                Write-Info "Using custom path: $userInput"
                return $userInput
            } else {
                Write-Warning "Invalid path format. Please try again."
                Write-Info "Example: C:\MyFolder\Vencord"
                continue
            }
        }
        catch {
            Write-Warning "Error reading path. Using default: $defaultPath"
            return $defaultPath
        }
    }
}

function Install-Vencord {
    param($InstallPath)
    
    Write-Step "Setting up Vencord"
    
    try {
        if (Test-Path "$InstallPath\package.json") {
            Write-Success "Vencord already exists at: $InstallPath"
            return $InstallPath
        }
        
        $parentDir = Split-Path $InstallPath -Parent
        if (!(Test-Path $parentDir)) {
            Write-Info "Creating directory: $parentDir"
            New-Item -ItemType Directory -Path $parentDir -Force | Out-Null
        }
        
        Write-Info "Cloning Vencord repository..."
        $currentLocation = Get-Location
        Set-Location $parentDir
        git clone https://github.com/Vendicated/Vencord.git (Split-Path $InstallPath -Leaf)
        Set-Location $currentLocation
        
        if (Test-Path "$InstallPath\package.json") {
            Write-Success "Vencord cloned successfully!"
            return $InstallPath
        } else {
            throw "Vencord clone verification failed"
        }
    }
    catch {
        Write-Error "Failed to clone Vencord: $($_.Exception.Message)"
        Read-Host "Press Enter to exit"
        exit 1
    }
}

function Install-VencordDependencies {
    param($VencordPath)
    
    Write-Step "Installing Vencord dependencies"
    
    try {
        $currentLocation = Get-Location
        Set-Location $VencordPath
        Write-Info "Installing dependencies with pnpm..."
        pnpm install
        Set-Location $currentLocation
        Write-Success "Vencord dependencies installed successfully!"
    }
    catch {
        Write-Error "Failed to install Vencord dependencies: $($_.Exception.Message)"
        Read-Host "Press Enter to exit"
        exit 1
    }
}

function Install-AIResponder {
    param($VencordPath)
    
    Write-Step "Installing AIResponder Plugin v2.7"
    
    try {
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
        
        Write-Info "Cloning AIResponder plugin repository..."
        $currentLocation = Get-Location
        Set-Location $userPluginsPath
        
        if (Test-Path $aiResponderPath) {
            Write-Info "Removing existing AIResponder directory..."
            Remove-Item $aiResponderPath -Recurse -Force
        }
        
        # Clone the repository and copy files from the AIResponder subfolder
        git clone https://github.com/tsx-awtns/vencord-ai-responder.git temp-airesponder
        
        # Copy files from the AIResponder subfolder to the target location
        if (Test-Path "temp-airesponder\AIResponder") {
            Copy-Item "temp-airesponder\AIResponder" -Destination "AIResponder" -Recurse -Force
            Remove-Item "temp-airesponder" -Recurse -Force
        } else {
            throw "AIResponder subfolder not found in repository"
        }
        
        Set-Location $currentLocation
        
        if (Test-Path "$aiResponderPath\index.tsx") {
            Write-Success "AIResponder plugin v2.7 cloned successfully!"
        } else {
            throw "AIResponder plugin files not found after cloning"
        }
    }
    catch {
        Write-Error "Failed to clone AIResponder plugin: $($_.Exception.Message)"
        Write-Info "Manual clone: https://github.com/tsx-awtns/vencord-ai-responder.git (files are in AIResponder/ subfolder)"
        Read-Host "Press Enter to exit"
        exit 1
    }
}

function Build-Vencord {
    param($VencordPath)
    
    Write-Step "Building Vencord with AIResponder v2.7"
    
    try {
        $currentLocation = Get-Location
        Set-Location $VencordPath
        Write-Info "Building Vencord with AIResponder plugin..."
        pnpm build
        Set-Location $currentLocation
        Write-Success "Vencord built successfully!"
    }
    catch {
        Write-Error "Failed to build Vencord: $($_.Exception.Message)"
        Read-Host "Press Enter to exit"
        exit 1
    }
}

function Inject-Vencord {
    param($VencordPath)
    
    Write-Step "Injecting Vencord into Discord"
    
    try {
        $currentLocation = Get-Location
        Set-Location $VencordPath
        Write-Info "Injecting Vencord into Discord..."
        Write-Warning "Press ENTER for default Discord path, or enter custom path."
        pnpm inject
        Set-Location $currentLocation
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
║                        Version 2.7                          ║
║                     by mays_024                              ║
╚══════════════════════════════════════════════════════════════╝
"@ -ForegroundColor Cyan

    try {
        if (!(Test-Administrator)) {
            Write-Warning "Not running as Administrator. Some installations might fail."
            $continue = Read-Host "Continue anyway? (y/N)"
            if ($continue -ne "y" -and $continue -ne "Y") { 
                Write-Info "Exiting..."
                Read-Host "Press Enter to exit"
                exit 0 
            }
        }

        if (!$SkipNodeInstall) { Install-NodeJS }
        if (!$SkipGitInstall) { Install-Git }
        Install-Pnpm
        
        if ([string]::IsNullOrEmpty($VencordPath)) {
            $VencordPath = Get-VencordPath
        }
        
        $vencordDir = Install-Vencord -InstallPath $VencordPath
        Install-VencordDependencies -VencordPath $vencordDir
        Install-AIResponder -VencordPath $vencordDir
        Build-Vencord -VencordPath $vencordDir
        
        Write-Info "`nVencord and AIResponder v2.7 are ready!"
        $inject = Read-Host "Inject Vencord into Discord now? (Y/n)"
        if ($inject -ne "n" -and $inject -ne "N") {
            Inject-Vencord -VencordPath $vencordDir
        }
        
        Write-Step "Setup Complete!"
        Write-Success @"
✅ AIResponder v2.7 plugin installed successfully!

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
        
        Write-Info "`nSetup completed successfully!"
        Read-Host "Press Enter to exit"
    }
    catch {
        Write-Error "Setup failed: $($_.Exception.Message)"
        Write-Info "Try manual installation or check README.md"
        Read-Host "Press Enter to exit"
        exit 1
    }
}

try {
    Main
}
catch {
    Write-Error "Critical error: $($_.Exception.Message)"
    Read-Host "Press Enter to exit"
    exit 1
}
finally {
    try {
        if ($PWD.Path -ne $PSScriptRoot -and $PSScriptRoot) { 
            Set-Location $PSScriptRoot 
        }
    }
    catch {
    }
}
