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
AIResponder Plugin Automated Setup Script v2.6

USAGE:
    .\setup.ps1 [OPTIONS]

OPTIONS:
    -SkipNodeInstall    Skip Node.js installation
    -SkipGitInstall     Skip Git installation  
    -VencordPath        Custom Vencord installation path
    -Help               Show this help

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
        Write-Success "Node.js already installed: $(node --version)"
        return $true
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
            Remove-Item $nodeInstaller -Force -ErrorAction SilentlyContinue
            return $true
        } else {
            Write-Warning "Node.js installed but command not found. Restart terminal if needed."
            Remove-Item $nodeInstaller -Force -ErrorAction SilentlyContinue
            return $true
        }
    }
    catch {
        Write-Error "Failed to install Node.js: $($_.Exception.Message)"
        Write-Info "Install manually from https://nodejs.org/"
        return $false
    }
}

function Install-Git {
    Write-Step "Installing Git"
    
    if (Test-Command "git") {
        Write-Success "Git already installed: $(git --version)"
        return $true
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
            Remove-Item $gitInstaller -Force -ErrorAction SilentlyContinue
            return $true
        } else {
            Write-Warning "Git installed but command not found. Restart terminal if needed."
            Remove-Item $gitInstaller -Force -ErrorAction SilentlyContinue
            return $true
        }
    }
    catch {
        Write-Error "Failed to install Git: $($_.Exception.Message)"
        Write-Info "Install manually from https://git-scm.com/"
        return $false
    }
}

function Install-Pnpm {
    Write-Step "Installing pnpm"
    
    if (Test-Command "pnpm") {
        Write-Success "pnpm already installed: $(pnpm --version)"
        return $true
    }
    
    try {
        Write-Info "Installing pnpm globally..."
        npm install -g pnpm
        Write-Success "pnpm installed successfully!"
        return $true
    }
    catch {
        Write-Error "Failed to install pnpm: $($_.Exception.Message)"
        return $false
    }
}

function Install-Vencord {
    param($InstallPath)
    
    Write-Step "Setting up Vencord"
    Write-Info "Target path: $InstallPath"
    
    if (Test-Path "$InstallPath\package.json") {
        Write-Success "Vencord already exists at: $InstallPath"
        return $InstallPath
    }
    
    $parentDir = Split-Path $InstallPath -Parent
    Write-Info "Parent directory: $parentDir"
    
    try {
        if (!(Test-Path $parentDir)) {
            Write-Info "Creating parent directory..."
            New-Item -ItemType Directory -Path $parentDir -Force | Out-Null
        }
        
        Write-Info "Cloning Vencord repository..."
        Set-Location $parentDir
        $folderName = Split-Path $InstallPath -Leaf
        git clone https://github.com/Vendicated/Vencord.git $folderName
        
        if (Test-Path "$InstallPath\package.json") {
            Write-Success "Vencord cloned successfully!"
            return $InstallPath
        } else {
            Write-Error "Vencord clone verification failed - package.json not found"
            return $null
        }
    }
    catch {
        Write-Error "Failed to clone Vencord: $($_.Exception.Message)"
        return $null
    }
}

function Install-VencordDependencies {
    param($VencordPath)
    
    Write-Step "Installing Vencord dependencies"
    
    try {
        Set-Location $VencordPath
        Write-Info "Installing dependencies..."
        pnpm install
        Write-Success "Dependencies installed successfully!"
        return $true
    }
    catch {
        Write-Error "Failed to install dependencies: $($_.Exception.Message)"
        return $false
    }
}

function Install-AIResponder {
    param($VencordPath)
    
    Write-Step "Installing AIResponder Plugin"
    
    $userPluginsPath = Join-Path $VencordPath "src\userplugins"
    $aiResponderPath = Join-Path $userPluginsPath "AIResponder"
    
    if (Test-Path "$aiResponderPath\index.tsx") {
        Write-Success "AIResponder plugin already exists!"
        return $true
    }
    
    try {
        if (!(Test-Path $userPluginsPath)) {
            New-Item -ItemType Directory -Path $userPluginsPath -Force | Out-Null
            Write-Info "Created userplugins directory"
        }
        
        Write-Info "Cloning AIResponder plugin..."
        Set-Location $userPluginsPath
        
        if (Test-Path $aiResponderPath) {
            Write-Info "Removing existing AIResponder directory..."
            Remove-Item $aiResponderPath -Recurse -Force
        }
        
        git clone https://github.com/tsx-awtns/vencord-ai-responder.git AIResponder
        
        if (Test-Path "$aiResponderPath\index.tsx") {
            Write-Success "AIResponder plugin installed successfully!"
            return $true
        } else {
            Write-Error "Plugin files not found after cloning"
            return $false
        }
    }
    catch {
        Write-Error "Failed to install AIResponder: $($_.Exception.Message)"
        Write-Info "Manual clone: https://github.com/tsx-awtns/vencord-ai-responder.git"
        return $false
    }
}

function Build-Vencord {
    param($VencordPath)
    
    Write-Step "Building Vencord"
    
    try {
        Set-Location $VencordPath
        Write-Info "Building Vencord with AIResponder..."
        pnpm build
        Write-Success "Build completed successfully!"
        return $true
    }
    catch {
        Write-Error "Build failed: $($_.Exception.Message)"
        return $false
    }
}

function Inject-Vencord {
    param($VencordPath)
    
    Write-Step "Injecting Vencord into Discord"
    
    try {
        Set-Location $VencordPath
        Write-Info "Injecting Vencord..."
        Write-Warning "Press ENTER for default Discord path or enter custom path when prompted"
        pnpm inject
        Write-Success "Injection completed!"
        return $true
    }
    catch {
        Write-Error "Injection failed: $($_.Exception.Message)"
        Write-Info "Run 'pnpm inject' manually in Vencord directory"
        return $false
    }
}

function Main {
    Write-Host @"
╔══════════════════════════════════════════════════════════════╗
║                   AIResponder Setup v2.6                    ║
║                     by mays_024                              ║
╚══════════════════════════════════════════════════════════════╝
"@ -ForegroundColor Cyan

    if (!(Test-Administrator)) {
        Write-Warning "Not running as Administrator. Some installations might fail."
        $continue = Read-Host "Continue? (y/N)"
        if ($continue -ne "y" -and $continue -ne "Y") { 
            Write-Info "Exiting..."
            exit 0 
        }
    }

    if (!$SkipNodeInstall) { 
        if (!(Install-NodeJS)) {
            Write-Error "Node.js installation failed. Cannot continue."
            Read-Host "Press Enter to exit"
            exit 1
        }
    }
    
    if (!$SkipGitInstall) { 
        if (!(Install-Git)) {
            Write-Error "Git installation failed. Cannot continue."
            Read-Host "Press Enter to exit"
            exit 1
        }
    }
    
    if (!(Install-Pnpm)) {
        Write-Error "pnpm installation failed. Cannot continue."
        Read-Host "Press Enter to exit"
        exit 1
    }
    
    if ([string]::IsNullOrEmpty($VencordPath)) {
        $defaultPath = Join-Path $env:USERPROFILE "Desktop\Vencord"
        Write-Info "Default installation path: $defaultPath"
        $userInput = Read-Host "Enter Vencord installation path (or press Enter for default)"
        
        if ([string]::IsNullOrEmpty($userInput.Trim())) { 
            $VencordPath = $defaultPath 
        } else {
            $VencordPath = $userInput.Trim()
        }
    }
    
    Write-Info "Using installation path: $VencordPath"
    
    $vencordDir = Install-Vencord -InstallPath $VencordPath
    if ($null -eq $vencordDir) {
        Write-Error "Vencord installation failed. Cannot continue."
        Read-Host "Press Enter to exit"
        exit 1
    }
    
    if (!(Install-VencordDependencies -VencordPath $vencordDir)) {
        Write-Error "Dependency installation failed. Cannot continue."
        Read-Host "Press Enter to exit"
        exit 1
    }
    
    if (!(Install-AIResponder -VencordPath $vencordDir)) {
        Write-Error "AIResponder installation failed. Cannot continue."
        Read-Host "Press Enter to exit"
        exit 1
    }
    
    if (!(Build-Vencord -VencordPath $vencordDir)) {
        Write-Error "Build failed. Cannot continue."
        Read-Host "Press Enter to exit"
        exit 1
    }
    
    Write-Info "`nSetup complete! Ready for injection."
    $inject = Read-Host "Inject Vencord into Discord now? (Y/n)"
    if ($inject -ne "n" -and $inject -ne "N") {
        Inject-Vencord -VencordPath $vencordDir
    }
    
    Write-Step "Installation Complete!"
    Write-Success @"
✅ AIResponder successfully installed!

NEXT STEPS:
1. Restart Discord completely
2. Settings > Vencord > Plugins > Enable 'AIResponder'
3. Click AI icon in DMs to activate
4. Optional: Get API key at openrouter.ai for unlimited usage

SUPPORT: discord.gg/aBvYsY2GnQ | www.syva.uk/syva-dev/
"@

    Write-Info "Installation directory: $vencordDir"
    if ($inject -eq "n" -or $inject -eq "N") {
        Write-Warning "Run 'pnpm inject' in Vencord directory to complete setup"
    }
    
    Read-Host "`nPress Enter to exit"
}

try {
    Main
}
catch {
    Write-Error "Setup failed: $($_.Exception.Message)"
    Write-Error "Stack trace: $($_.ScriptStackTrace)"
    Read-Host "Press Enter to exit"
    exit 1
}
finally {
    if ($PWD.Path -ne $PSScriptRoot) { 
        try { Set-Location $PSScriptRoot } catch { }
    }
}
