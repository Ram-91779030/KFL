#!/bin/bash

# Disable all SSH workflows to prevent deployment errors

echo "🔧 Disabling all SSH workflows..."

# List of workflow files to disable
WORKFLOWS=(
  ".github/workflows/deploy.yml"
  ".github/workflows/deploy-fixed.yml" 
  ".github/workflows/deploy-with-token.yml"
  ".github/workflows/build-frontend.yml"
)

for workflow in "${WORKFLOWS[@]}"; do
  if [ -f "$workflow" ]; then
    echo "Disabling $workflow"
    # Comment out the on: section to disable automatic triggers
    sed -i.bak 's/^on:/# DISABLED - on:/' "$workflow"
    sed -i.bak 's/^  push:/#   push:/' "$workflow"
    sed -i.bak 's/^  pull_request:/#   pull_request:/' "$workflow"
    sed -i.bak 's/^    branches:/#     branches:/' "$workflow"
    sed -i.bak 's/^    paths:/#     paths:/' "$workflow"
    # Add workflow_dispatch for manual triggering
    echo "  workflow_dispatch: # Manual trigger only" >> "$workflow"
    rm "$workflow.bak"
  fi
done

echo "✅ All SSH workflows disabled!"
echo "📋 Only Netlify deployment will run now"
