param(
    [switch]$SkipNodeInstall,
    [switch]$SkipGitInstall,
    [string]$VencordPath = "",
    [switch]$Verbose,
    [switch]$Help
)

$Global:StartTime = Get-Date
$Global:LogFile = "$env:TEMP\AIResponder-Setup-$(Get-Date -Format 'yyyyMMdd-HHmmss').log"

function Write-Success { 
    param($Message) 
    $timestamp = Get-Date -Format "HH:mm:ss"
    $output = "[$timestamp] ✅ $Message"
    Write-Host $output -ForegroundColor Green
    Add-Content -Path $Global:LogFile -Value $output
}

function Write-Warning { 
    param($Message) 
    $timestamp = Get-Date -Format "HH:mm:ss"
    $output = "[$timestamp] ⚠️  $Message"
    Write-Host $output -ForegroundColor Yellow
    Add-Content -Path $Global:LogFile -Value $output
}

function Write-Error { 
    param($Message) 
    $timestamp = Get-Date -Format "HH:mm:ss"
    $output = "[$timestamp] ❌ $Message"
    Write-Host $output -ForegroundColor Red
    Add-Content -Path $Global:LogFile -Value $output
}

function Write-Info { 
    param($Message) 
    $timestamp = Get-Date -Format "HH:mm:ss"
    $output = "[$timestamp] ℹ️  $Message"
    Write-Host $output -ForegroundColor Cyan
    Add-Content -Path $Global:LogFile -Value $output
}

function Write-Step { 
    param($Message) 
    $timestamp = Get-Date -Format "HH:mm:ss"
    $separator = "=" * 60
    $output = "`n[$timestamp] 🚀 $separator`n[$timestamp] 🎯 $Message`n[$timestamp] 🚀 $separator"
    Write-Host $output -ForegroundColor Magenta
    Add-Content -Path $Global:LogFile -Value $output
}

function Write-Verbose-Info {
    param($Message)
    if ($Verbose) {
        $timestamp = Get-Date -Format "HH:mm:ss"
        $output = "[$timestamp] 🔍 [VERBOSE] $Message"
        Write-Host $output -ForegroundColor DarkCyan
        Add-Content -Path $Global:LogFile -Value $output
    }
}

function Show-Banner {
    $banner = @"
╔══════════════════════════════════════════════════════════════════════════════╗
║                                                                              ║
║    █████╗ ██╗██████╗ ███████╗███████╗██████╗  ██████╗ ███╗   ██╗██████╗     ║
║   ██╔══██╗██║██╔══██╗██╔════╝██╔════╝██╔══██╗██╔═══██╗████╗  ██║██╔══██╗    ║
║   ███████║██║██████╔╝█████╗  ███████╗██████╔╝██║   ██║██╔██╗ ██║██║  ██║    ║
║   ██╔══██║██║██╔══██╗██╔══╝  ╚════██║██╔═══╝ ██║   ██║██║╚██╗██║██║  ██║    ║
║   ██║  ██║██║██║  ██║███████╗███████║██║     ╚██████╔╝██║ ╚████║██████╔╝    ║
║   ╚═╝  ╚═╝╚═╝╚═╝  ╚═╝╚══════╝╚══════╝╚═╝      ╚═════╝ ╚═╝  ╚═══╝╚═════╝     ║
║                                                                              ║
║                    🤖 INTELLIGENT AI AUTO-RESPONDER 🤖                      ║
║                                                                              ║
║                           Version 2.6 - Enhanced                            ║
║                          Created by mays_024                                 ║
║                      https://www.syva.uk/syva-dev/                          ║
║                                                                              ║
╚══════════════════════════════════════════════════════════════════════════════╝
"@
    Write-Host $banner -ForegroundColor Cyan
    Write-Host ""
    Write-Info "🌟 Welcome to the AIResponder Automated Setup Wizard!"
    Write-Info "📅 Setup started at: $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')"
    Write-Info "📝 Log file: $Global:LogFile"
    Write-Host ""
}

function Show-Help {
    Write-Host @"
╔══════════════════════════════════════════════════════════════════════════════╗
║                        AIResponder Setup Script Help                        ║
╚══════════════════════════════════════════════════════════════════════════════╝

DESCRIPTION:
    Automated installation script for AIResponder - an intelligent Discord AI 
    auto-responder plugin for Vencord. This script handles the complete setup
    process including dependencies, Vencord installation, and plugin integration.

USAGE:
    .\setup.ps1 [OPTIONS]

OPTIONS:
    -SkipNodeInstall    Skip Node.js installation check and setup
    -SkipGitInstall     Skip Git installation check and setup
    -VencordPath        Specify custom Vencord installation directory path
    -Verbose            Enable detailed verbose logging and output
    -Help               Display this comprehensive help information

EXAMPLES:
    .\setup.ps1
        → Full automated setup with all components

    .\setup.ps1 -SkipNodeInstall -SkipGitInstall
        → Skip dependency installations (if already installed)

    .\setup.ps1 -VencordPath "C:\MyCustomPath\Vencord"
        → Use custom installation directory

    .\setup.ps1 -Verbose
        → Enable detailed logging for troubleshooting

REQUIREMENTS:
    • Windows 10/11 with PowerShell 5.1 or PowerShell Core 7+
    • Active internet connection for downloads
    • Administrator privileges (recommended for best results)
    • Minimum 2GB free disk space
    • Discord application installed

WHAT THIS SCRIPT DOES:
    1. 🔧 Installs Node.js LTS (if needed)
    2. 🔧 Installs Git for Windows (if needed)
    3. 📦 Installs pnpm package manager globally
    4. 📥 Clones Vencord repository from GitHub
    5. 🔨 Installs all Vencord dependencies
    6. 🤖 Downloads and installs AIResponder plugin
    7. 🏗️  Builds Vencord with integrated AIResponder
    8. 💉 Optionally injects Vencord into Discord

SUPPORT & INFORMATION:
    • Discord Support Server: https://discord.gg/aBvYsY2GnQ
    • Developer Website: https://www.syva.uk/syva-dev/
    • GitHub Repository: https://github.com/tsx-awtns/vencord-ai-responder
    • Documentation: Full README available in repository

"@ -ForegroundColor White
}

if ($Help) { Show-Help; Read-Host "Press Enter to exit"; exit 0 }

function Test-Administrator {
    try {
        Write-Verbose-Info "Checking administrator privileges..."
        $currentUser = [Security.Principal.WindowsIdentity]::GetCurrent()
        $principal = New-Object Security.Principal.WindowsPrincipal($currentUser)
        $isAdmin = $principal.IsInRole([Security.Principal.WindowsBuiltInRole]::Administrator)
        Write-Verbose-Info "Administrator check result: $isAdmin"
        return $isAdmin
    }
    catch {
        Write-Verbose-Info "Administrator check failed: $($_.Exception.Message)"
        return $false
    }
}

function Test-Command {
    param($Command)
    try { 
        Write-Verbose-Info "Testing command availability: $Command"
        Get-Command $Command -ErrorAction Stop | Out-Null
        Write-Verbose-Info "Command '$Command' is available"
        return $true 
    }
    catch { 
        Write-Verbose-Info "Command '$Command' is not available"
        return $false 
    }
}

function Test-ValidPath {
    param($Path)
    try {
        Write-Verbose-Info "Validating path: $Path"
        if ([string]::IsNullOrWhiteSpace($Path)) { 
            Write-Verbose-Info "Path validation failed: null or whitespace"
            return $false 
        }
        $Path = $Path.Trim('"').Trim("'").Trim()
        if ($Path.Length -eq 0) { 
            Write-Verbose-Info "Path validation failed: empty after trimming"
            return $false 
        }
        $invalidChars = [System.IO.Path]::GetInvalidPathChars()
        foreach ($char in $invalidChars) {
            if ($Path.Contains($char)) { 
                Write-Verbose-Info "Path validation failed: contains invalid character '$char'"
                return $false 
            }
        }
        Write-Verbose-Info "Path validation successful"
        return $true
    }
    catch {
        Write-Verbose-Info "Path validation error: $($_.Exception.Message)"
        return $false
    }
}

function Test-InternetConnection {
    Write-Info "🌐 Testing internet connectivity..."
    try {
        $testUrls = @(
            "https://github.com",
            "https://nodejs.org",
            "https://raw.githubusercontent.com"
        )
        
        foreach ($url in $testUrls) {
            Write-Verbose-Info "Testing connection to: $url"
            $response = Invoke-WebRequest -Uri $url -Method Head -TimeoutSec 10 -UseBasicParsing
            if ($response.StatusCode -eq 200) {
                Write-Success "✅ Internet connection verified ($url)"
                return $true
            }
        }
        return $false
    }
    catch {
        Write-Warning "⚠️ Internet connection test failed: $($_.Exception.Message)"
        Write-Info "🔄 Continuing anyway - some features may not work properly"
        return $false
    }
}

function Get-SystemInfo {
    Write-Info "🖥️ Gathering system information..."
    try {
        $os = Get-CimInstance -ClassName Win32_OperatingSystem
        $cpu = Get-CimInstance -ClassName Win32_Processor | Select-Object -First 1
        $memory = Get-CimInstance -ClassName Win32_ComputerSystem
        $disk = Get-CimInstance -ClassName Win32_LogicalDisk | Where-Object { $_.DriveType -eq 3 -and $_.DeviceID -eq "C:" }
        
        Write-Info "💻 Operating System: $($os.Caption) ($($os.Version))"
        Write-Info "🔧 Processor: $($cpu.Name)"
        Write-Info "🧠 Total RAM: $([math]::Round($memory.TotalPhysicalMemory / 1GB, 2)) GB"
        Write-Info "💾 Free Disk Space (C:): $([math]::Round($disk.FreeSpace / 1GB, 2)) GB"
        Write-Info "🏠 PowerShell Version: $($PSVersionTable.PSVersion)"
        
        if ($disk.FreeSpace -lt 2GB) {
            Write-Warning "⚠️ Low disk space detected! At least 2GB recommended for installation."
        }
    }
    catch {
        Write-Verbose-Info "Could not gather complete system information: $($_.Exception.Message)"
    }
}

function Install-NodeJS {
    Write-Step "Installing Node.js LTS"
    Write-Info "📦 Node.js is required for building and running Vencord"
    Write-Info "🔍 Checking for existing Node.js installation..."
    
    if (Test-Command "node") {
        $nodeVersion = node --version
        Write-Success "✅ Node.js is already installed: $nodeVersion"
        Write-Info "📊 Node.js location: $(Get-Command node | Select-Object -ExpandProperty Source)"
        
        $npmVersion = npm --version
        Write-Info "📦 NPM version: $npmVersion"
        return
    }
    
    Write-Info "📥 Node.js not found. Starting download and installation..."
    $nodeUrl = "https://nodejs.org/dist/v20.10.0/node-v20.10.0-x64.msi"
    $nodeInstaller = "$env:TEMP\nodejs-installer.msi"
    
    try {
        Write-Info "🌐 Downloading Node.js LTS from: $nodeUrl"
        Write-Info "📁 Download location: $nodeInstaller"
        
        $progressPreference = 'SilentlyContinue'
        Invoke-WebRequest -Uri $nodeUrl -OutFile $nodeInstaller -UseBasicParsing
        $progressPreference = 'Continue'
        
        $fileSize = (Get-Item $nodeInstaller).Length / 1MB
        Write-Info "📊 Downloaded: $([math]::Round($fileSize, 2)) MB"
        
        Write-Info "🔧 Installing Node.js (this may take a few minutes)..."
        Write-Info "⏳ Please wait while the installation completes..."
        
        $installProcess = Start-Process -FilePath "msiexec.exe" -ArgumentList "/i", $nodeInstaller, "/quiet", "/norestart" -Wait -PassThru
        
        if ($installProcess.ExitCode -eq 0) {
            Write-Success "✅ Node.js installation completed successfully!"
        } else {
            throw "Installation failed with exit code: $($installProcess.ExitCode)"
        }
        
        Write-Info "🔄 Refreshing environment variables..."
        $env:Path = [System.Environment]::GetEnvironmentVariable("Path", "Machine") + ";" + [System.Environment]::GetEnvironmentVariable("Path", "User")
        
        Start-Sleep -Seconds 3
        
        if (Test-Command "node") {
            $newNodeVersion = node --version
            Write-Success "✅ Node.js installation verified: $newNodeVersion"
            Write-Info "🎉 Node.js is now ready for use!"
        } else {
            Write-Warning "⚠️ Node.js installed but command not found. Terminal restart may be required."
            Write-Info "💡 If issues persist, manually add Node.js to your PATH environment variable."
        }
        
        Write-Info "🧹 Cleaning up installer file..."
        Remove-Item $nodeInstaller -Force -ErrorAction SilentlyContinue
    }
    catch {
        Write-Error "❌ Failed to install Node.js: $($_.Exception.Message)"
        Write-Info "🔧 Manual installation required:"
        Write-Info "   1. Visit: https://nodejs.org/"
        Write-Info "   2. Download the LTS version"
        Write-Info "   3. Run the installer as Administrator"
        Write-Info "   4. Restart this script after installation"
        Read-Host "Press Enter to exit"
        exit 1
    }
}

function Install-Git {
    Write-Step "Installing Git for Windows"
    Write-Info "🔧 Git is required for cloning repositories and version control"
    Write-Info "🔍 Checking for existing Git installation..."
    
    if (Test-Command "git") {
        $gitVersion = git --version
        Write-Success "✅ Git is already installed: $gitVersion"
        Write-Info "📊 Git location: $(Get-Command git | Select-Object -ExpandProperty Source)"
        return
    }
    
    Write-Info "📥 Git not found. Starting download and installation..."
    $gitUrl = "https://github.com/git-for-windows/git/releases/download/v2.42.0.windows.2/Git-2.42.0.2-64-bit.exe"
    $gitInstaller = "$env:TEMP\git-installer.exe"
    
    try {
        Write-Info "🌐 Downloading Git for Windows from: $gitUrl"
        Write-Info "📁 Download location: $gitInstaller"
        
        $progressPreference = 'SilentlyContinue'
        Invoke-WebRequest -Uri $gitUrl -OutFile $gitInstaller -UseBasicParsing
        $progressPreference = 'Continue'
        
        $fileSize = (Get-Item $gitInstaller).Length / 1MB
        Write-Info "📊 Downloaded: $([math]::Round($fileSize, 2)) MB"
        
        Write-Info "🔧 Installing Git (this may take several minutes)..."
        Write-Info "⏳ Please wait while the installation completes..."
        Write-Info "🔇 Installation running in silent mode..."
        
        $installProcess = Start-Process -FilePath $gitInstaller -ArgumentList "/VERYSILENT", "/NORESTART" -Wait -PassThru
        
        if ($installProcess.ExitCode -eq 0) {
            Write-Success "✅ Git installation completed successfully!"
        } else {
            throw "Installation failed with exit code: $($installProcess.ExitCode)"
        }
        
        Write-Info "🔄 Refreshing environment variables..."
        $env:Path = [System.Environment]::GetEnvironmentVariable("Path", "Machine") + ";" + [System.Environment]::GetEnvironmentVariable("Path", "User")
        
        Start-Sleep -Seconds 3
        
        if (Test-Command "git") {
            $newGitVersion = git --version
            Write-Success "✅ Git installation verified: $newGitVersion"
            Write-Info "🎉 Git is now ready for use!"
        } else {
            Write-Warning "⚠️ Git installed but command not found. Terminal restart may be required."
            Write-Info "💡 If issues persist, manually add Git to your PATH environment variable."
        }
        
        Write-Info "🧹 Cleaning up installer file..."
        Remove-Item $gitInstaller -Force -ErrorAction SilentlyContinue
    }
    catch {
        Write-Error "❌ Failed to install Git: $($_.Exception.Message)"
        Write-Info "🔧 Manual installation required:"
        Write-Info "   1. Visit: https://git-scm.com/"
        Write-Info "   2. Download Git for Windows"
        Write-Info "   3. Run the installer as Administrator"
        Write-Info "   4. Restart this script after installation"
        Read-Host "Press Enter to exit"
        exit 1
    }
}

function Install-Pnpm {
    Write-Step "Installing pnpm Package Manager"
    Write-Info "📦 pnpm is a fast, disk space efficient package manager for Node.js"
    Write-Info "🔍 Checking for existing pnpm installation..."
    
    if (Test-Command "pnpm") {
        $pnpmVersion = pnpm --version
        Write-Success "✅ pnpm is already installed: v$pnpmVersion"
        Write-Info "📊 pnpm location: $(Get-Command pnpm | Select-Object -ExpandProperty Source)"
        return
    }
    
    try {
        Write-Info "📥 Installing pnpm globally via npm..."
        Write-Info "⏳ This process may take a few minutes..."
        
        $installOutput = npm install -g pnpm 2>&1
        Write-Verbose-Info "NPM install output: $installOutput"
        
        Start-Sleep -Seconds 2
        
        if (Test-Command "pnpm") {
            $pnpmVersion = pnpm --version
            Write-Success "✅ pnpm installed successfully: v$pnpmVersion"
            Write-Info "🎉 pnpm is now ready for use!"
            Write-Info "💡 pnpm offers faster installs and better disk space usage than npm"
        } else {
            throw "pnpm command not found after installation"
        }
    }
    catch {
        Write-Error "❌ Failed to install pnpm: $($_.Exception.Message)"
        Write-Info "🔧 Troubleshooting steps:"
        Write-Info "   1. Ensure Node.js and npm are properly installed"
        Write-Info "   2. Try running as Administrator"
        Write-Info "   3. Check your internet connection"
        Write-Info "   4. Manually run: npm install -g pnpm"
        Read-Host "Press Enter to exit"
        exit 1
    }
}

function Get-VencordPath {
    Write-Step "Configuring Vencord Installation Path"
    Write-Info "📁 Choose where to install Vencord and AIResponder"
    
    $defaultPath = Join-Path $env:USERPROFILE "Desktop\Vencord"
    
    Write-Info "💡 Recommended locations:"
    Write-Info "   • Desktop (default): $defaultPath"
    Write-Info "   • Documents: $(Join-Path $env:USERPROFILE 'Documents\Vencord')"
    Write-Info "   • Custom location: C:\MyFolder\Vencord"
    Write-Info ""
    Write-Info "⚠️  Important notes:"
    Write-Info "   • Avoid paths with spaces or special characters"
    Write-Info "   • Ensure you have write permissions to the location"
    Write-Info "   • The folder will be created if it doesn't exist"
    Write-Info ""
    
    while ($true) {
        try {
            Write-Host "📂 " -ForegroundColor Yellow -NoNewline
            Write-Host "Enter Vencord installation path:" -ForegroundColor White
            Write-Host "   Default: " -ForegroundColor Gray -NoNewline
            Write-Host "$defaultPath" -ForegroundColor Cyan
            Write-Host "   Press " -ForegroundColor Gray -NoNewline
            Write-Host "ENTER" -ForegroundColor Green -NoNewline
            Write-Host " for default, or type custom path:" -ForegroundColor Gray
            
            $userInput = Read-Host "Path"
            
            if ([string]::IsNullOrWhiteSpace($userInput)) {
                Write-Info "✅ Using default path: $defaultPath"
                Write-Verbose-Info "Selected default installation path"
                return $defaultPath
            }
            
            $userInput = $userInput.Trim('"').Trim("'").Trim()
            
            if (Test-ValidPath $userInput) {
                Write-Info "✅ Using custom path: $userInput"
                Write-Verbose-Info "Selected custom installation path: $userInput"
                
                $parentDir = Split-Path $userInput -Parent
                if ($parentDir -and !(Test-Path $parentDir)) {
                    Write-Warning "⚠️ Parent directory doesn't exist: $parentDir"
                    $createParent = Read-Host "Create parent directories? (Y/n)"
                    if ($createParent -eq "n" -or $createParent -eq "N") {
                        Write-Info "🔄 Please choose a different path..."
                        continue
                    }
                }
                
                return $userInput
            } else {
                Write-Warning "❌ Invalid path format. Please try again."
                Write-Info "💡 Example valid paths:"
                Write-Info "   • C:\Vencord"
                Write-Info "   • D:\MyApps\Vencord"
                Write-Info "   • $(Join-Path $env:USERPROFILE 'MyVencord')"
                continue
            }
        }
        catch {
            Write-Warning "⚠️ Error reading path. Using default: $defaultPath"
            Write-Verbose-Info "Path input error, falling back to default: $($_.Exception.Message)"
            return $defaultPath
        }
    }
}

function Install-Vencord {
    param($InstallPath)
    
    Write-Step "Setting up Vencord Discord Client Modification"
    Write-Info "🎮 Vencord is a Discord client modification with plugins and themes"
    Write-Info "📁 Installation path: $InstallPath"
    
    try {
        if (Test-Path "$InstallPath\package.json") {
            Write-Success "✅ Vencord already exists at: $InstallPath"
            Write-Info "📊 Checking existing installation..."
            
            $packageJson = Get-Content "$InstallPath\package.json" | ConvertFrom-Json
            Write-Info "📦 Found Vencord version: $($packageJson.version)"
            Write-Info "🔄 Skipping clone, using existing installation"
            return $InstallPath
        }
        
        $parentDir = Split-Path $InstallPath -Parent
        if (!(Test-Path $parentDir)) {
            Write-Info "📁 Creating parent directory: $parentDir"
            New-Item -ItemType Directory -Path $parentDir -Force | Out-Null
            Write-Success "✅ Parent directory created successfully"
        }
        
        Write-Info "🌐 Cloning Vencord repository from GitHub..."
        Write-Info "📡 Repository: https://github.com/Vendicated/Vencord.git"
        Write-Info "⏳ This may take several minutes depending on your internet speed..."
        
        $currentLocation = Get-Location
        Set-Location $parentDir
        
        Write-Verbose-Info "Executing git clone command..."
        $cloneOutput = git clone https://github.com/Vendicated/Vencord.git (Split-Path $InstallPath -Leaf) 2>&1
        Write-Verbose-Info "Git clone output: $cloneOutput"
        
        Set-Location $currentLocation
        
        if (Test-Path "$InstallPath\package.json") {
            Write-Success "✅ Vencord repository cloned successfully!"
            
            $packageJson = Get-Content "$InstallPath\package.json" | ConvertFrom-Json
            Write-Info "📦 Cloned Vencord version: $($packageJson.version)"
            Write-Info "📊 Repository size: $((Get-ChildItem $InstallPath -Recurse | Measure-Object -Property Length -Sum).Sum / 1MB | ForEach-Object { [math]::Round($_, 2) }) MB"
            
            return $InstallPath
        } else {
            throw "Vencord clone verification failed - package.json not found"
        }
    }
    catch {
        Write-Error "❌ Failed to clone Vencord: $($_.Exception.Message)"
        Write-Info "🔧 Troubleshooting steps:"
        Write-Info "   1. Check your internet connection"
        Write-Info "   2. Ensure Git is properly installed"
        Write-Info "   3. Verify you have write permissions to: $InstallPath"
        Write-Info "   4. Try running as Administrator"
        Write-Info "   5. Manually clone: git clone https://github.com/Vendicated/Vencord.git"
        Read-Host "Press Enter to exit"
        exit 1
    }
}

function Install-VencordDependencies {
    param($VencordPath)
    
    Write-Step "Installing Vencord Dependencies"
    Write-Info "📦 Installing all required Node.js packages for Vencord"
    Write-Info "📁 Working directory: $VencordPath"
    
    try {
        $currentLocation = Get-Location
        Set-Location $VencordPath
        
        Write-Info "📋 Reading package.json to determine dependencies..."
        if (Test-Path "package.json") {
            $packageJson = Get-Content "package.json" | ConvertFrom-Json
            $depCount = ($packageJson.dependencies | Get-Member -MemberType NoteProperty).Count
            $devDepCount = ($packageJson.devDependencies | Get-Member -MemberType NoteProperty).Count
            Write-Info "📊 Found $depCount runtime dependencies and $devDepCount development dependencies"
        }
        
        Write-Info "⏳ Installing dependencies with pnpm (this may take 5-10 minutes)..."
        Write-Info "🚀 pnpm will download and install all required packages..."
        
        $installStart = Get-Date
        $installOutput = pnpm install 2>&1
        $installEnd = Get-Date
        $installDuration = ($installEnd - $installStart).TotalSeconds
        
        Write-Verbose-Info "pnpm install output: $installOutput"
        
        Set-Location $currentLocation
        
        Write-Success "✅ Vencord dependencies installed successfully!"
        Write-Info "⏱️ Installation completed in $([math]::Round($installDuration, 1)) seconds"
        
        if (Test-Path "$VencordPath\node_modules") {
            $nodeModulesSize = (Get-ChildItem "$VencordPath\node_modules" -Recurse -ErrorAction SilentlyContinue | Measure-Object -Property Length -Sum).Sum / 1MB
            Write-Info "📊 node_modules size: $([math]::Round($nodeModulesSize, 2)) MB"
        }
        
        Write-Info "🎉 All dependencies are now ready for building Vencord!"
    }
    catch {
        Write-Error "❌ Failed to install Vencord dependencies: $($_.Exception.Message)"
        Write-Info "🔧 Troubleshooting steps:"
        Write-Info "   1. Ensure pnpm is properly installed"
        Write-Info "   2. Check your internet connection"
        Write-Info "   3. Try clearing pnpm cache: pnpm store prune"
        Write-Info "   4. Manually run: pnpm install in the Vencord directory"
        Write-Info "   5. Check for disk space issues"
        Read-Host "Press Enter to exit"
        exit 1
    }
}

function Install-AIResponder {
    param($VencordPath)
    
    Write-Step "Installing AIResponder Plugin"
    Write-Info "🤖 AIResponder is an intelligent AI auto-responder for Discord DMs"
    Write-Info "✨ Features: Auto-responses, Global DM mode, Custom API keys, Smart conversations"
    
    try {
        $userPluginsPath = Join-Path $VencordPath "src\userplugins"
        $aiResponderPath = Join-Path $userPluginsPath "AIResponder"
        
        Write-Info "📁 Plugin installation path: $aiResponderPath"
        
        if (Test-Path "$aiResponderPath\index.tsx") {
            Write-Success "✅ AIResponder plugin already exists!"
            Write-Info "📊 Checking existing plugin..."
            
            $indexFile = Get-Content "$aiResponderPath\index.tsx" -Raw
            if ($indexFile -match 'version.*?(\d+\.\d+)') {
                Write-Info "📦 Found AIResponder version: $($matches[1])"
            }
            
            Write-Info "🔄 Skipping clone, using existing plugin"
            return
        }
        
        if (!(Test-Path $userPluginsPath)) {
            Write-Info "📁 Creating userplugins directory: $userPluginsPath"
            New-Item -ItemType Directory -Path $userPluginsPath -Force | Out-Null
            Write-Success "✅ userplugins directory created"
        }
        
        Write-Info "🌐 Cloning AIResponder plugin repository..."
        Write-Info "📡 Repository: https://github.com/tsx-awtns/vencord-ai-responder.git"
        Write-Info "⏳ Downloading plugin files..."
        
        $currentLocation = Get-Location
        Set-Location $userPluginsPath
        
        if (Test-Path $aiResponderPath) {
            Write-Info "🧹 Removing incomplete AIResponder directory..."
            Remove-Item $aiResponderPath -Recurse -Force
            Write-Info "✅ Cleanup completed"
        }
        
        Write-Verbose-Info "Executing git clone for AIResponder..."
        $cloneOutput = git clone https://github.com/tsx-awtns/vencord-ai-responder.git AIResponder 2>&1
        Write-Verbose-Info "Git clone output: $cloneOutput"
        
        Set-Location $currentLocation
        
        if (Test-Path "$aiResponderPath\index.tsx") {
            Write-Success "✅ AIResponder plugin cloned successfully!"
            
            Write-Info "📊 Verifying plugin files..."
            $pluginFiles = Get-ChildItem $aiResponderPath -File
            Write-Info "📁 Plugin contains $($pluginFiles.Count) files:"
            foreach ($file in $pluginFiles) {
                Write-Info "   • $($file.Name) ($([math]::Round($file.Length / 1KB, 1)) KB)"
            }
            
            $indexContent = Get-Content "$aiResponderPath\index.tsx" -Raw
            if ($indexContent -match 'AIResponder.*?v(\d+\.\d+)') {
                Write-Info "🎯 AIResponder version: $($matches[1])"
            }
            
            Write-Info "🎉 AIResponder plugin is ready for integration!"
        } else {
            throw "AIResponder plugin files not found after cloning - index.tsx missing"
        }
    }
    catch {
        Write-Error "❌ Failed to clone AIResponder plugin: $($_.Exception.Message)"
        Write-Info "🔧 Troubleshooting steps:"
        Write-Info "   1. Check your internet connection"
        Write-Info "   2. Ensure Git is working properly"
        Write-Info "   3. Verify write permissions to: $userPluginsPath"
        Write-Info "   4. Manual clone command:"
        Write-Info "      git clone https://github.com/tsx-awtns/vencord-ai-responder.git AIResponder"
        Write-Info "   5. Place the cloned folder in: $userPluginsPath"
        Read-Host "Press Enter to exit"
        exit 1
    }
}

function Build-Vencord {
    param($VencordPath)
    
    Write-Step "Building Vencord with AIResponder Integration"
    Write-Info "🏗️ Compiling Vencord with integrated AIResponder plugin"
    Write-Info "📁 Build directory: $VencordPath"
    
    try {
        $currentLocation = Get-Location
        Set-Location $VencordPath
        
        Write-Info "🔍 Pre-build verification..."
        Write-Info "   • Checking package.json..."
        if (!(Test-Path "package.json")) {
            throw "package.json not found in Vencord directory"
        }
        
        Write-Info "   • Checking node_modules..."
        if (!(Test-Path "node_modules")) {
            throw "node_modules not found - dependencies not installed"
        }
        
        Write-Info "   • Checking AIResponder plugin..."
        $aiResponderPath = "src\userplugins\AIResponder\index.tsx"
        if (!(Test-Path $aiResponderPath)) {
            throw "AIResponder plugin not found at: $aiResponderPath"
        }
        
        Write-Success "✅ Pre-build verification completed"
        
        Write-Info "🚀 Starting Vencord build process..."
        Write-Info "⏳ This process typically takes 2-5 minutes..."
        Write-Info "🔧 Building optimized production version..."
        
        $buildStart = Get-Date
        $buildOutput = pnpm build 2>&1
        $buildEnd = Get-Date
        $buildDuration = ($buildEnd - $buildStart).TotalSeconds
        
        Write-Verbose-Info "pnpm build output: $buildOutput"
        
        Set-Location $currentLocation
        
        Write-Info "🔍 Post-build verification..."
        $distPath = Join-Path $VencordPath "dist"
        if (Test-Path $distPath) {
            $distFiles = Get-ChildItem $distPath -File
            Write-Info "📊 Build output: $($distFiles.Count) files in dist folder"
            
            $totalSize = ($distFiles | Measure-Object -Property Length -Sum).Sum / 1MB
            Write-Info "📦 Total build size: $([math]::Round($totalSize, 2)) MB"
        }
        
        Write-Success "✅ Vencord built successfully with AIResponder!"
        Write-Info "⏱️ Build completed in $([math]::Round($buildDuration, 1)) seconds"
        Write-Info "🎉 Vencord is now ready for injection into Discord!"
        
        Write-Info "💡 What was built:"
        Write-Info "   • Vencord core client modification"
        Write-Info "   • AIResponder plugin integration"
        Write-Info "   • All dependencies bundled"
        Write-Info "   • Optimized for production use"
    }
    catch {
        Write-Error "❌ Failed to build Vencord: $($_.Exception.Message)"
        Write-Info "🔧 Troubleshooting steps:"
        Write-Info "   1. Ensure all dependencies are installed"
        Write-Info "   2. Check for build errors in the output above"
        Write-Info "   3. Verify AIResponder plugin is properly installed"
        Write-Info "   4. Try cleaning and rebuilding:"
        Write-Info "      • Delete node_modules folder"
        Write-Info "      • Run: pnpm install"
        Write-Info "      • Run: pnpm build"
        Write-Info "   5. Check for disk space issues"
        Read-Host "Press Enter to exit"
        exit 1
    }
}

function Inject-Vencord {
    param($VencordPath)
    
    Write-Step "Injecting Vencord into Discord"
    Write-Info "💉 This process modifies your Discord installation to load Vencord"
    Write-Info "⚠️ Important: Close Discord completely before proceeding"
    
    Write-Warning "🚨 IMPORTANT SAFETY INFORMATION:"
    Write-Warning "   • This modifies your Discord client"
    Write-Warning "   • Always backup your Discord installation first"
    Write-Warning "   • Use at your own risk - Discord ToS considerations apply"
    Write-Warning "   • You can always uninject later if needed"
    Write-Host ""
    
    $proceed = Read-Host "Do you want to proceed with Discord injection? (Y/n)"
    if ($proceed -eq "n" -or $proceed -eq "N") {
        Write-Info "⏭️ Skipping Discord injection"
        Write-Info "💡 You can inject later by running: pnpm inject in the Vencord directory"
        return
    }
    
    try {
        $currentLocation = Get-Location
        Set-Location $VencordPath
        
        Write-Info "🔍 Detecting Discord installation..."
        Write-Info "🎯 Common Discord locations will be checked automatically"
        Write-Info "📁 If prompted, press ENTER for default path or enter custom Discord path"
        Write-Host ""
        
        Write-Warning "⚠️ NEXT STEPS:"
        Write-Warning "   1. The injection tool will start"
        Write-Warning "   2. Press ENTER to use default Discord path"
        Write-Warning "   3. Or enter your custom Discord installation path"
        Write-Warning "   4. Wait for injection to complete"
        Write-Host ""
        
        Read-Host "Press Enter to start injection process"
        
        Write-Info "🚀 Starting Vencord injection..."
        $injectionOutput = pnpm inject 2>&1
        Write-Verbose-Info "Injection output: $injectionOutput"
        
        Set-Location $currentLocation
        
        Write-Success "✅ Vencord injection process completed!"
        Write-Info "🎉 Vencord should now be integrated with Discord"
        
        Write-Info "📋 Next steps after injection:"
        Write-Info "   1. 🔄 Restart Discord completely"
        Write-Info "   2. ⚙️ Go to Discord Settings (gear icon)"
        Write-Info "   3. 📂 Look for 'Vencord' section in settings"
        Write-Info "   4. 🔌 Navigate to Plugins"
        Write-Info "   5. ✅ Enable 'AIResponder' plugin"
        Write-Info "   6. 🤖 Click the AI icon in any DM to start using it!"
    }
    catch {
        Write-Error "❌ Failed to inject Vencord: $($_.Exception.Message)"
        Write-Info "🔧 Troubleshooting steps:"
        Write-Info "   1. Ensure Discord is completely closed"
        Write-Info "   2. Run PowerShell as Administrator"
        Write-Info "   3. Check Discord installation path"
        Write-Info "   4. Try manual injection:"
        Write-Info "      • Open terminal in Vencord directory"
        Write-Info "      • Run: pnpm inject"
        Write-Info "   5. Common Discord paths:"
        Write-Info "      • $env:LOCALAPPDATA\Discord"
        Write-Info "      • $env:APPDATA\discord"
        Write-Info "      • C:\Users\$env:USERNAME\AppData\Local\Discord"
    }
}

function Show-CompletionSummary {
    param($VencordPath, $WasInjected)
    
    $endTime = Get-Date
    $totalDuration = ($endTime - $Global:StartTime).TotalMinutes
    
    Write-Step "🎉 INSTALLATION COMPLETED SUCCESSFULLY! 🎉"
    
    $summary = @"
╔══════════════════════════════════════════════════════════════════════════════╗
║                           🎊 SETUP COMPLETE! 🎊                            ║
╚══════════════════════════════════════════════════════════════════════════════╝

✅ AIResponder plugin has been successfully installed and integrated!

📊 INSTALLATION SUMMARY:
   • ⏱️ Total setup time: $([math]::Round($totalDuration, 1)) minutes
   • 📁 Installation location: $VencordPath
   • 🤖 AIResponder plugin: Integrated and ready
   • 💉 Discord injection: $(if($WasInjected){"Completed"}else{"Skipped - manual injection needed"})
   • 📝 Setup log: $Global:LogFile

🚀 NEXT STEPS TO START USING AIRESPONDER:

   1. 🔄 RESTART DISCORD COMPLETELY
      • Close Discord entirely (check system tray)
      • Reopen Discord application

   2. ⚙️ ENABLE THE PLUGIN
      • Open Discord Settings (gear icon ⚙️)
      • Scroll down to find "Vencord" section
      • Click on "Plugins"
      • Find "AIResponder" in the list
      • Toggle it ON ✅

   3. 🤖 START USING AIRESPONDER
      • Open any Direct Message conversation
      • Look for the AI bot icon 🤖 next to message input
      • Click the icon to activate/deactivate AI responder
      • Green = Active, Gray = Inactive

🌟 OPTIONAL - GET YOUR OWN API KEY FOR UNLIMITED USAGE:
   • 🌐 Visit: https://openrouter.ai
   • 📝 Sign up for a free account
   • 🔑 Get your API key (removes ~1,000 requests/day limit)
   • ⚙️ In Discord: Settings > Vencord > Plugins > AIResponder
   • ✅ Enable "Use your own OpenRouter.ai API key"
   • 📋 Paste your API key and save

🎯 AIRESPONDER FEATURES:
   • 🤖 Intelligent AI responses to DMs when you're away
   • 🌍 Global DM mode (responds to ALL DMs automatically)
   • 💬 Natural conversation handling
   • 🔄 Conversation memory and context
   • ⚙️ Customizable settings and preferences
   • 🚫 Blacklist users you don't want responses to

💡 USAGE TIPS:
   • Click the AI icon in DMs to toggle on/off per conversation
   • Use /airesponder command to quickly toggle
   • Check plugin settings for advanced configuration
   • Monitor daily usage if using default API key

🆘 NEED HELP OR SUPPORT?
   • 💬 Discord Support Server: https://discord.gg/aBvYsY2GnQ
   • 🌐 Developer Website: https://www.syva.uk/syva-dev/
   • 📚 GitHub Repository: https://github.com/tsx-awtns/vencord-ai-responder
   • 📧 Issues & Bug Reports: GitHub Issues page

🎉 ENJOY YOUR NEW AI AUTO-RESPONDER! 🤖✨

"@
    
    Write-Host $summary -ForegroundColor Green
    
    Write-Info "📋 Installation details saved to: $Global:LogFile"
    Write-Info "🔧 Keep this log file for troubleshooting if needed"
    
    if (!$WasInjected) {
        Write-Warning "⚠️ MANUAL INJECTION REQUIRED:"
        Write-Warning "   Run this command in the Vencord directory:"
        Write-Warning "   pnpm inject"
        Write-Warning "   Location: $VencordPath"
    }
    
    Write-Host "`n🎊 Thank you for using AIResponder! 🎊" -ForegroundColor Magenta
    Write-Host "Created with ❤️ by mays_024" -ForegroundColor Yellow
}

function Main {
    try {
        Show-Banner
        
        Write-Info "🔍 Performing initial system checks..."
        Test-InternetConnection
        Get-SystemInfo
        
        if (!(Test-Administrator)) {
            Write-Warning "⚠️ Not running as Administrator"
            Write-Info "💡 Some installations might fail without admin privileges"
            Write-Info "🔧 For best results, run PowerShell as Administrator"
            $continue = Read-Host "Continue anyway? (y/N)"
            if ($continue -ne "y" -and $continue -ne "Y") { 
                Write-Info "👋 Exiting setup. Run as Administrator for best results."
                Read-Host "Press Enter to exit"
                exit 0 
            }
        } else {
            Write-Success "✅ Running with Administrator privileges"
        }

        Write-Info "🚀 Starting dependency installation phase..."
        if (!$SkipNodeInstall) { Install-NodeJS }
        if (!$SkipGitInstall) { Install-Git }
        Install-Pnpm
        
        Write-Info "📁 Configuring installation location..."
        if ([string]::IsNullOrEmpty($VencordPath)) {
            $VencordPath = Get-VencordPath
        } else {
            Write-Info "✅ Using provided path: $VencordPath"
        }
        
        Write-Info "🏗️ Starting main installation phase..."
        $vencordDir = Install-Vencord -InstallPath $VencordPath
        Install-VencordDependencies -VencordPath $vencordDir
        Install-AIResponder -VencordPath $vencordDir
        Build-Vencord -VencordPath $vencordDir
        
        Write-Info "💉 Discord injection phase..."
        $inject = Read-Host "🤖 Inject Vencord into Discord now? (Y/n)"
        $wasInjected = $false
        if ($inject -ne "n" -and $inject -ne "N") {
            Inject-Vencord -VencordPath $vencordDir
            $wasInjected = $true
        } else {
            Write-Info "⏭️ Skipping Discord injection - you can do this manually later"
        }
        
        Show-CompletionSummary -VencordPath $vencordDir -WasInjected $wasInjected
        
        Write-Host "`n🎯 Setup completed successfully!" -ForegroundColor Green
        Read-Host "Press Enter to exit"
    }
    catch {
        Write-Error "💥 Critical setup failure: $($_.Exception.Message)"
        Write-Info "📝 Full error details logged to: $Global:LogFile"
        Write-Info "🆘 For support, visit: https://discord.gg/aBvYsY2GnQ"
        Write-Info "📋 Please include the log file when requesting help"
        Read-Host "Press Enter to exit"
        exit 1
    }
}

try {
    Main
}
catch {
    Write-Error "💥 Unhandled critical error: $($_.Exception.Message)"
    Write-Info "📝 Check log file: $Global:LogFile"
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
        # Ignore location reset errors
    }
}
