# YukiHookAPI Project Builder

[![GitHub license](https://img.shields.io/github/license/vhqtvn/YukiHookAPI-ProjectBuilder-cli?color=blue&style=flat-square)](https://github.com/vhqtvn/YukiHookAPI-ProjectBuilder-cli/blob/main/LICENSE)
[![GitHub release](https://img.shields.io/github/v/release/vhqtvn/YukiHookAPI-ProjectBuilder-cli?display_name=release&logo=github&color=green&style=flat-square)](https://github.com/vhqtvn/YukiHookAPI-ProjectBuilder-cli/releases)
[![Telegram](https://img.shields.io/badge/discussion-Telegram-blue.svg?logo=telegram&style=flat-square)](https://t.me/YukiHookAPI)
[![Telegram](https://img.shields.io/badge/discussion%20dev-Telegram-blue.svg?logo=telegram&style=flat-square)](https://t.me/HighCapable_Dev)
[![QQ](https://img.shields.io/badge/discussion%20dev-QQ-blue.svg?logo=tencent-qq&logoColor=red&style=flat-square)](https://qm.qq.com/cgi-bin/qm/qr?k=Pnsc5RY6N2mBKFjOLPiYldbAbprAU3V7&jump_from=webapi&authKey=X5EsOVzLXt1dRunge8ryTxDRrh9/IiW1Pua75eDLh9RE3KXE+bwXIYF5cWri/9lf)

<img src="img-src/icon.png" width = "100" height = "100" alt="LOGO"/>

帮助你快速创建一个使用 YukiHookAPI 打造的 Xposed 项目模板。

[English](README.md) | 简体中文

| <img src="https://github.com/HighCapable/.github/blob/main/img-src/logo.jpg?raw=true" width = "30" height = "30" alt="LOGO"/> | [HighCapable](https://github.com/HighCapable) |
|-------------------------------------------------------------------------------------------------------------------------------|-----------------------------------------------|

这个项目属于上述组织，**点击上方链接关注这个组织**，发现更多好项目。

## 项目迁移公告

这个项目最终的目的就是创建一个新的 Android Studio/IDEA 项目模版，然后再在对应的 IDE 中打开项目。

这种方式不是很优雅，而且需要在用户的电脑上安装这个软件，后期我准备将这个项目合并到 IDEA 插件中，集成到新项目模版功能里。

这样一来，使用 IDEA 安装插件即可实现直接使用此模版创建项目的功能，而且更加灵活和具有可拓展性。

在新的项目确定后，会在这里添加新项目的链接，届时我会终止维护这个项目并建议大家转移到新项目。

**项目构建器将会在 `YukiHookAPI` 发布第一个 `2.0.0` 版本之前做最后的维护，在新的版本发布后，这个项目将正式弃用。**

## 这是什么

这是一个使用 [YukiHookAPI](https://github.com/HighCapable/YuKiHookAPI) 作为核心的 Xposed 模块自动构建工具。

实现自动化搜索依赖快速搭建一个包含 Xposed 模块环境的 Android 项目模板。

## 如何使用

这是一个使用 YukiHookAPI 快速构建 Xposed 模块的命令行工具。

### 快速运行

你可以使用以下命令直接运行工具，无需安装：

```bash
curl -sL https://raw.githubusercontent.com/vhqtvn/YukiHookAPI-ProjectBuilder-cli/main/run.sh | bash
```

这将下载最新版本并运行它。

### 手动安装

你也可以从 [Releases](https://github.com/vhqtvn/YukiHookAPI-ProjectBuilder-cli/releases) 下载对应平台的可执行文件。

### 开发

1. 安装 [Node.js](https://nodejs.org/zh-cn/) (推荐 v18+)。
2. 克隆仓库。
3. 安装依赖：
   ```bash
   npm install
   ```
4. 运行工具：
   ```bash
   npm start
   ```
5. 构建可执行文件：
   ```bash
   npx pkg .
   ```

## 项目推广

<!--suppress HtmlDeprecatedAttribute -->
<div align="center">
    <h2>嘿，还请君留步！👋</h2>
    <h3>这里有 Android 开发工具、UI 设计、Gradle 插件、Xposed 模块和实用软件等相关项目。</h3>
    <h3>如果下方的项目能为你提供帮助，不妨为我点个 star 吧！</h3>
    <h3>所有项目免费、开源，遵循对应开源许可协议。</h3>
    <h1><a href="https://github.com/fankes/fankes/blob/main/project-promote/README-zh-CN.md">→ 查看更多关于我的项目，请点击这里 ←</a></h1>
</div>

## Star History

![Star History Chart](https://api.star-history.com/svg?repos=HighCapable/YukiHookAPI-ProjectBuilder&type=Date)

## 许可证

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

版权所有 © 2019 HighCapable