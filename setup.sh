#!/bin/bash

# AIResponder Setup Script v2.7 (macOS/Linux)
# Author: mays_024

set -e

GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
CYAN='\033[1;36m'
MAGENTA='\033[1;35m'
NC='\033[0m'

function info() { echo -e "${CYAN}$1${NC}"; }
function success() { echo -e "${GREEN}$1${NC}"; }
function warn() { echo -e "${YELLOW}$1${NC}"; }
function error() { echo -e "${RED}$1${NC}"; }

function check_cmd() {
    if ! command -v $1 &> /dev/null; then
        return 1
    fi
    return 0
}

function install_node() {
    info "Checking Node.js..."
    if check_cmd node; then
        success "Node.js found: $(node -v)"
    else
        error "Node.js not found!"
        echo "Please install it via Homebrew: brew install node"
        exit 1
    fi
}

function install_git() {
    info "Checking Git..."
    if check_cmd git; then
        success "Git found: $(git --version)"
    else
        error "Git not found!"
        echo "Please install it via Homebrew: brew install git"
        exit 1
    fi
}

function install_pnpm() {
    info "Checking pnpm..."
    if check_cmd pnpm; then
        success "pnpm found: $(pnpm -v)"
    else
        info "Installing pnpm..."
        npm install -g pnpm
        success "pnpm installed!"
    fi
}

function get_vencord_path() {
    read -p "Enter path to Vencord (or press Enter to use ~/Vencord): " path
    if [[ -z "$path" ]]; then
        path="$HOME/Vencord"
    fi
    echo "$path"
}

function clone_vencord() {
    local path=$1
    if [[ -f "$path/package.json" ]] && grep -q '"name": *"vencord"' "$path/package.json"; then
        success "Found existing Vencord at $path"
        return
    fi
    info "Cloning Vencord into $path..."
    rm -rf "$path"
    git clone https://github.com/Vendicated/Vencord.git "$path"
    success "Vencord cloned!"
}

function install_dependencies() {
    local path=$1
    info "Installing Vencord dependencies..."
    cd "$path"
    pnpm install
    cd - > /dev/null
    success "Dependencies installed!"
}

function install_airesponder() {
    local path=$1
    local plugin_path="$path/src/userplugins/AIResponder"
    info "Installing AIResponder plugin..."
    rm -rf "$plugin_path"
    mkdir -p "$path/src/userplugins"
    git clone https://github.com/tsx-awtns/vencord-ai-responder.git "$path/temp-ai"
    cp -r "$path/temp-ai/AIResponder" "$plugin_path"
    rm -rf "$path/temp-ai"
    if [[ -f "$plugin_path/index.tsx" ]]; then
        success "AIResponder plugin installed!"
    else
        error "AIResponder installation failed."
        exit 1
    fi
}

function build_vencord() {
    local path=$1
    info "Building Vencord..."
    cd "$path"
    pnpm build
    cd - > /dev/null
    success "Vencord built!"
}

function inject_vencord() {
    local path=$1
    read -p "Inject Vencord into Discord now? (Y/n): " answer
    if [[ "$answer" == "n" || "$answer" == "N" ]]; then
        warn "Skipping injection. You can run 'pnpm inject' manually later."
        return
    fi
    cd "$path"
    pnpm inject
    cd - > /dev/null
    success "Vencord injected!"
}

function main() {
    echo -e "${MAGENTA}
╔══════════════════════════════════════════════════════════╗
║                  AIResponder Setup Script                ║
║                      Version 2.7                         ║
║                    by mays_024                           ║
╚══════════════════════════════════════════════════════════╝
${NC}"

    install_node
    install_git
    install_pnpm

    vencord_path=$(get_vencord_path)
    clone_vencord "$vencord_path"
    install_dependencies "$vencord_path"
    install_airesponder "$vencord_path"
    build_vencord "$vencord_path"
    inject_vencord "$vencord_path"

    echo -e "${GREEN}
✅ AIResponder v2.7 installed successfully!

Next steps:
1. Restart Discord
2. Go to Settings > Vencord > Plugins > Enable 'AIResponder'
3. Click the AI icon in your DMs to use

Optional API Key:
• Visit https://openrouter.ai
• Get a free API key for unlimited usage
• Enable 'Use your own API key' in the plugin settings

Support: https://discord.gg/aBvYsY2GnQ
Installation path: $vencord_path
${NC}"
}

main
