# Visual Studio Code - Open Source ("Code - OSS")
This is a self-compiled portable version of Code - OSS for Windows system under x86 architecture.

You can compile Code - OSS by yourself! See the [official document](https://github.com/microsoft/vscode/wiki/How-to-Contribute) for details.

## Licenses
For this self-compiled portable version, see [LICENSE.txt](https://github.com/qtxh/vscode/blob/master/LICENSE.txt).

For its source code, see [LICENSE-source.txt](https://github.com/qtxh/vscode/blob/master/LICENSE-source.txt).

For FFmpeg, see [LICENSE-FFmpeg.txt](https://github.com/qtxh/vscode/blob/master/LICENSE-FFmpeg.txt).

For other third-party software, see [ThirdPartyNotices.txt](https://github.com/qtxh/vscode/blob/master/ThirdPartyNotices.txt).

## Instructions
0. Make sure that Node.js is installed on your computer.
1. Start Powershell as Administrator, and install windows-build-tools.
```
npm install --global windows-build-tools --vs2015
```
2. Clone repository from the official one.
```
cd vscode
git checkout master
git pull https://github.com/microsoft/vscode.git master
```
3. Install dependencies and clean working environment with Yarn. If not installed, please install it first.
```
yarn
yarn watch
```
4. Compile the code according to your target architecture.
```
# Using win32-ia32 as an example.
yarn run gulp vscode-win32-ia32
```