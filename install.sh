
#!/bin/bash

REPO="vhqtvn/YukiHookAPI-ProjectBuilder-cli"
OS=$(uname -s | tr '[:upper:]' '[:lower:]')

if [ "$OS" == "darwin" ]; then
    ASSET_NAME="yukihookapi-projectbuilder-macos"
elif [ "$OS" == "linux" ]; then
    ASSET_NAME="yukihookapi-projectbuilder-linux"
else
    echo "Unsupported OS: $OS"
    exit 1
fi

DOWNLOAD_URL="https://github.com/$REPO/releases/latest/download/$ASSET_NAME"
TEMP_DIR=$(mktemp -d)
TARGET_FILE="$TEMP_DIR/$ASSET_NAME"

echo "Downloading $ASSET_NAME from latest release..."
curl -L --fail -o "$TARGET_FILE" "$DOWNLOAD_URL"

if [ $? -ne 0 ]; then
    echo "Failed to download. Please check if a release exists."
    exit 1
fi

chmod +x "$TARGET_FILE"

echo "Running YukiHookAPI Project Builder..."
"$TARGET_FILE"

# Cleanup is tricky if the process replaces itself or runs long.
# But usually we want to keep it or install it?
# The user said "run this project easily".
# If they want to install, they might move it.
# For now, this script just runs it once.
