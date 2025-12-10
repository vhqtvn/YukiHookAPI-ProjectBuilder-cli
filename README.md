# YukiHookAPI Project Builder

[![GitHub license](https://img.shields.io/github/license/vhqtvn/YukiHookAPI-ProjectBuilder-cli?color=blue&style=flat-square)](https://github.com/vhqtvn/YukiHookAPI-ProjectBuilder-cli/blob/main/LICENSE)
[![GitHub release](https://img.shields.io/github/v/release/vhqtvn/YukiHookAPI-ProjectBuilder-cli?display_name=release&logo=github&color=green&style=flat-square)](https://github.com/vhqtvn/YukiHookAPI-ProjectBuilder-cli/releases)
[![Telegram](https://img.shields.io/badge/discussion-Telegram-blue.svg?logo=telegram&style=flat-square)](https://t.me/YukiHookAPI)
[![Telegram](https://img.shields.io/badge/discussion%20dev-Telegram-blue.svg?logo=telegram&style=flat-square)](https://t.me/HighCapable_Dev)
[![QQ](https://img.shields.io/badge/discussion%20dev-QQ-blue.svg?logo=tencent-qq&logoColor=red&style=flat-square)](https://qm.qq.com/cgi-bin/qm/qr?k=Pnsc5RY6N2mBKFjOLPiYldbAbprAU3V7&jump_from=webapi&authKey=X5EsOVzLXt1dRunge8ryTxDRrh9/IiW1Pua75eDLh9RE3KXE+bwXIYF5cWri/9lf)

<img src="img-src/icon.png" width = "100" height = "100" alt="LOGO"/>

A CLI port of the Xposed Project Builder by YukiHookAPI.

English | [简体中文](README-zh-CN.md)

> **Note**: This is a CLI port of the original [YukiHookAPI-ProjectBuilder](https://github.com/HighCapable/YukiHookAPI-ProjectBuilder).
> The original project is a GUI application built with Electron. This fork converts it into a command-line tool for easier usage in headless environments or scripts.

## Original Project Credits

| <img src="https://github.com/HighCapable/.github/blob/main/img-src/logo.jpg?raw=true" width = "30" height = "30" alt="LOGO"/> | [HighCapable](https://github.com/HighCapable) |
|-------------------------------------------------------------------------------------------------------------------------------|-----------------------------------------------|

The original project belongs to the above-mentioned organization. **Click the link above to follow this organization** and discover more good projects.

## Original Project Migration Notice

The ultimate goal of this project is to create a new Android Studio/IDEA project template, and then open the project in the corresponding IDE.

This method is not very elegant and requires the software to be installed on the user's computer.

Later, I plan to merge this project into the IDEA plugin and integrate it into the new project template function.

In this way, you can use IDEA to install the plugin to create projects directly using this template, and it is more flexible and scalable.

After the new project is determined, a link to the new project will be added here.

At that time, I will terminate the maintenance of this project and recommend that everyone move to the new project.

**The project builder will be maintained before the release of the first `2.0.0` version of `YukiHookAPI`. This project will be officially deprecated
after the new version is released.**

## What's this

This is an automatic building tool for Xposed Modules using [YukiHookAPI](https://github.com/HighCapable/YuKiHookAPI) as the core.

Implementing automated search relies on quickly building an Android project template that includes a Xposed Module environment.

## How to use

This is a CLI tool to quickly build Xposed Modules using YukiHookAPI.

### Quick Run

You can run the tool directly without installation using the following command:

```bash
curl -sL https://raw.githubusercontent.com/vhqtvn/YukiHookAPI-ProjectBuilder-cli/main/run.sh | bash
```

This will download the latest release and run it.

### Manual Installation

You can also download the executable for your platform from [Releases](https://github.com/vhqtvn/YukiHookAPI-ProjectBuilder-cli/releases).

### Development

1. Install [Node.js](https://nodejs.org/en/) (v18+ recommended).
2. Clone the repository.
3. Install dependencies:
   ```bash
   npm install
   ```
4. Run the tool:
   ```bash
   npm start
   ```
5. Build executables:
   ```bash
   npx pkg .
   ```

## Promotion

<!--suppress HtmlDeprecatedAttribute -->
<div align="center">
     <h2>Hey, please stay! 👋</h2>
     <h3>Here are related projects such as Android development tools, UI design, Gradle plugins, Xposed Modules and practical software. </h3>
     <h3>If the project below can help you, please give me a star! </h3>
     <h3>All projects are free, open source, and follow the corresponding open source license agreement. </h3>
     <h1><a href="https://github.com/fankes/fankes/blob/main/project-promote/README.md">→ To see more about my projects, please click here ←</a></h1>
</div>

## Star History

![Star History Chart](https://api.star-history.com/svg?repos=HighCapable/YukiHookAPI-ProjectBuilder&type=Date)

## License

- [AGPL-3.0](https://www.gnu.org/licenses/agpl-3.0.html)

```
Copyright (C) 2019 HighCapable

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU Affero General Public License as
published by the Free Software Foundation, either version 3 of the
License, or (at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU Affero General Public License for more details.

You should have received a copy of the GNU Affero General Public License
along with this program.  If not, see <http://www.gnu.org/licenses/>.
```

Copyright © 2019 HighCapable