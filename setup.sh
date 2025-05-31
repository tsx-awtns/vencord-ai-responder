#!/bin/bash

# AIResponder Setup Script v2.7 (Linux)
# Author: mays_024 (Linux port by ChatGPT)

set -e

GREEN="\e[32m"
YELLOW="\e[33m"
RED="\e[31m"
CYAN="\e[36m"
MAGENTA="\e[35m"
RESET="\e[0m"

function print_success() { echo -e "${GREEN}$1${RESET}"; }
function print_warning() { echo -e "${YELLOW}$1${RESET}"; }
function print_error() { echo -e "${RED}$1${RESET}"; }
function print_info() { echo -e "${CYAN}$1${RESET}"; }
function print_step() { echo -e "\n${MAGENTA}=== $1 ===${RESET}"; }

function show_help() {
    cat <<EOF
AIResponder Plugin Automated Setup Script v2.7 (Linux)

USAGE:
    ./setup.sh [OPTIONS]

OPTIONS:
    --skip-node         Skip Node.js installation check
    --skip-git          Skip Git installation check
    --vencord-path PATH Specify custom Vencord path
    --help              Show this help message

EXAMPLES:
    ./setup.sh
    ./setup.sh --skip-node --skip-git
    ./setup.sh --vencord-path "/home/user/Projects/Vencord"
EOF
}

SKIP_NODE=false
SKIP_GIT=false
VENCORD_PATH=""
SHOW_HELP=false

while [[ "$#" -gt 0 ]]; do
    case $1 in
        --skip-node) SKIP_NODE=true ;;
        --skip-git) SKIP_GIT=true ;;
        --vencord-path) VENCORD_PATH="$2"; shift ;;
        --help) SHOW_HELP=true ;;
        *) print_error "Unknown parameter: $1"; exit 1 ;;
    esac
    shift
done

if $SHOW_HELP; then show_help; exit 0; fi

function check_command() {
    command -v "$1" >/dev/null 2>&1
}

function install_node() {
    print_step "Installing Node.js"
    if check_command node; then
        print_success "Node.js is already installed: $(node --version)"
        return
    fi

    print_info "Installing Node.js v20.x via nvm..."
    curl -fsSL https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
    export NVM_DIR="$HOME/.nvm"
    source "$NVM_DIR/nvm.sh"
    nvm install 20
    nvm use 20
    print_success "Node.js installed successfully!"
}

function install_git() {
    print_step "Installing Git"
    if check_command git; then
        print_success "Git is already installed: $(git --version)"
        return
    fi

    print_info "Installing Git..."
    sudo apt update && sudo apt install -y git
    print_success "Git installed successfully!"
}

function install_pnpm() {
    print_step "Installing pnpm"
    if check_command pnpm; then
        print_success "pnpm is already installed: $(pnpm --version)"
        return
    fi

    npm install -g pnpm
    print_success "pnpm installed successfully!"
}

function get_vencord_path() {
    local default_path="$HOME/Desktop/Vencord"
    echo
    read -rp "$(print_info "Enter Vencord path [default: $default_path]: ")" path
    if [[ -z "$path" ]]; then
        echo "$default_path"
    else
        echo "$path"
    fi
}

function install_vencord() {
    local path="$1"
    print_step "Cloning Vencord"

    if [[ -d "$path/package.json" ]]; then
        print_success "Vencord already exists in: $path"
        return
    fi

    rm -rf "$path"
    git clone https://github.com/Vendicated/Vencord.git "$path"
    print_success "Cloned Vencord into: $path"
}

function install_vencord_dependencies() {
    print_step "Installing Vencord dependencies"
    cd "$1"
    pnpm install
    print_success "Dependencies installed"
}

function install_ai_responder() {
    print_step "Installing AIResponder Plugin v2.7"
    local user_plugins="$1/src/userplugins"
    local plugin_path="$user_plugins/AIResponder"

    rm -rf "$plugin_path"
    mkdir -p "$user_plugins"
    git clone https://github.com/tsx-awtns/vencord-ai-responder.git /tmp/ai-responder
    mv /tmp/ai-responder/AIResponder "$plugin_path"
    rm -rf /tmp/ai-responder

    if [[ -f "$plugin_path/index.tsx" ]]; then
        print_success "AIResponder plugin installed at: $plugin_path"
    else
        print_error "Failed to install AIResponder plugin!"
        exit 1
    fi
}

function build_vencord() {
    print_step "Building Vencord"
    cd "$1"
    pnpm build
    print_success "Vencord built successfully!"
}

function inject_vencord() {
    print_step "Injecting Vencord"
    cd "$1"
    pnpm inject || print_warning "Injection failed. Try running 'pnpm inject' manually."
}

function main() {
    echo -e "${CYAN}
╔══════════════════════════════════════════════════════════════╗
║                   AIResponder Setup Script (Linux)          ║
║                        Version 2.7                          ║
║                     by mays_024                              ║
╚══════════════════════════════════════════════════════════════╝
${RESET}"

    if ! $SKIP_NODE; then install_node; fi
    if ! $SKIP_GIT; then install_git; fi
    install_pnpm

    if [[ -z "$VENCORD_PATH" ]]; then
        VENCORD_PATH=$(get_vencord_path)
    fi

    install_vencord "$VENCORD_PATH"
    install_vencord_dependencies "$VENCORD_PATH"
    install_ai_responder "$VENCORD_PATH"
    build_vencord "$VENCORD_PATH"

    read -rp "$(print_info "Inject Vencord into Discord now? [Y/n]: ")" confirm
    if [[ "$confirm" != "n" && "$confirm" != "N" ]]; then
        inject_vencord "$VENCORD_PATH"
    fi

    print_step "Setup Complete!"
    print_success "✅ AIResponder v2.7 plugin installed successfully!"

    echo -e "${CYAN}
NEXT STEPS:
1. Restart Discord
2. Settings > Vencord > Plugins > Enable 'AIResponder'
3. Click AI icon in DMs to use

OPTIONAL API KEY:
• Visit: https://openrouter.ai
• Get free API key for unlimited usage
• Enable 'Use your own API key' in settings

SUPPORT: https://discord.gg/aBvYsY2GnQ

Installation directory: $VENCORD_PATH
${RESET}"
}

main
