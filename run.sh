
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

# Ensure cleanup on exit
trap "rm -rf $TEMP_DIR" EXIT

echo "Downloading $ASSET_NAME from latest release..."
curl -L --fail -o "$TARGET_FILE" "$DOWNLOAD_URL"

if [ $? -ne 0 ]; then
    echo "Failed to download. Please check if a release exists."
    exit 1
fi

chmod +x "$TARGET_FILE"

echo "Running YukiHookAPI Project Builder..."
"$TARGET_FILE" "$@"
