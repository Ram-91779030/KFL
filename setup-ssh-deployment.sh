#!/bin/bash

# 🔐 SSH Deployment Setup Script for KFL E-commerce
# This script helps you set up SSH keys for GitHub Actions deployment

set -e

echo "🔐 Setting up SSH deployment for KFL E-commerce..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if SSH directory exists
if [ ! -d "$HOME/.ssh" ]; then
    print_status "Creating SSH directory..."
    mkdir -p "$HOME/.ssh"
    chmod 700 "$HOME/.ssh"
fi

# Generate SSH key if it doesn't exist
SSH_KEY_PATH="$HOME/.ssh/kfl_deploy_key"
if [ ! -f "$SSH_KEY_PATH" ]; then
    print_status "Generating new SSH key pair..."
    ssh-keygen -t rsa -b 4096 -C "kfl-deployment@karshakfoodlife.com" -f "$SSH_KEY_PATH" -N ""
    print_success "SSH key pair generated"
else
    print_warning "SSH key already exists at $SSH_KEY_PATH"
fi

# Set proper permissions
chmod 600 "$SSH_KEY_PATH"
chmod 644 "$SSH_KEY_PATH.pub"

print_success "SSH key permissions set correctly"

# Display the public key
echo ""
print_status "📋 Your public key (add this to your server's ~/.ssh/authorized_keys):"
echo "----------------------------------------"
cat "$SSH_KEY_PATH.pub"
echo "----------------------------------------"

# Display the private key
echo ""
print_status "🔑 Your private key (add this to GitHub Secrets as SSH_KEY):"
echo "----------------------------------------"
cat "$SSH_KEY_PATH"
echo "----------------------------------------"

echo ""
print_status "📝 Next steps:"
echo ""
echo "1. 📤 Add the PUBLIC key to your server:"
echo "   ssh-copy-id -i $SSH_KEY_PATH.pub username@your-server-ip"
echo "   OR manually add it to ~/.ssh/authorized_keys on your server"
echo ""
echo "2. 🔐 Add these secrets to your GitHub repository:"
echo "   - Go to: https://github.com/Ram-91779030/KFL/settings/secrets/actions"
echo "   - Add secret 'HOST': your-server-ip"
echo "   - Add secret 'USERNAME': your-server-username"
echo "   - Add secret 'SSH_KEY': (copy the private key above)"
echo ""
echo "3. 🧪 Test SSH connection:"
echo "   ssh -i $SSH_KEY_PATH username@your-server-ip"
echo ""
echo "4. 🚀 Run GitHub Actions workflow"
echo ""

print_warning "⚠️  Alternative: Use Netlify/Vercel for easier deployment"
echo "   - No server setup required"
echo "   - Automatic deployments"
echo "   - Free hosting"
echo ""

print_success "✅ SSH deployment setup completed!"
