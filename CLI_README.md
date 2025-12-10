
# YukiHookAPI Project Builder CLI

This is a command-line interface for the YukiHookAPI Project Builder. It allows you to generate YukiHookAPI projects without the Electron GUI.

## Usage

1.  Ensure you have Node.js installed.
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Run the CLI:
    ```bash
    node cli.js
    ```
4.  Follow the interactive prompts to configure your project.

## Configuration

The CLI will ask for the following information:

*   **Project Name**: The name of the project folder.
*   **Package Name**: The Android package name (e.g., `com.example.module`).
*   **App Name**: The name of the application.
*   **Module Description**: A description of the Xposed module.
*   **App Min API**: Minimum Android API level.
*   **App Target API**: Target Android API level.
*   **Xposed Min API**: Minimum Xposed API level.
*   **Module Component**: Choose between Fully (Activity + Hook), Blank (Hook Only), or No GUI.
*   **Target Xposed Platform**: Choose the target platform (Xposed, LSPosed, etc.).
*   **Gradle Version**: Select the Gradle version.
*   **AGP Version**: Select the Android Gradle Plugin version.
*   **Kotlin Version**: Select the Kotlin version.
*   **YukiHookAPI Version**: Select the YukiHookAPI version.

## Output

The generated project will be created in the current working directory under the specified Project Name.
