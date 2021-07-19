# iClient-JavaScript 压缩包

按需下载 iClient-JavaScript 的压缩包，解压后保持 dist 文件夹和 example 文件夹平级。

dist 文件夹下是 iclient 地图API；

example 文件夹是示例文件,在浏览器中打开 index.html 可查看示例列表；

示例需要在服务器环境打开运行。

# 常见的几种服务器环境

## Apache Tomcat 等Web服务中间件

### 1.下载 Tomcat 服务器 和 JDK

```
在 JDK 官网（ https://www.oracle.com/java/technologies/javase-downloads.html ）下载安装 JDK。

在 tomcat 官网（ https://tomcat.apache.org ）下载安装 tomcat。
```

### 2.开启 tomcat 服务器

```
在 tomcat 安装目录下进入 bin 文件夹，双击 startup.bat 文件开启 tomcat 服务器。
```

### 3.使用

```
将上述解压后的文件夹放入 tomcat 安装目录下的 webapps 文件夹中。
在浏览器地址栏输入 `http://localhost:port/放入 webapps 文件夹中的文件路径`，回车即可打开示例文件。
例如：http://localhost:8080/iClient/examples/index.html
```

## Visual Studio Code 插件 Live Server

### 1.安装

```
在 Vscode 中安装 Live Server 插件，并打开上述的文件夹。
```

### 2.使用

```
在菜单栏右键选中 index.html 文件，在对话框中选择 Open with Live Server 即可打开示例文件。
```

## Node.js

### 1.下载 Node.js

```
在 Node 官网（ https://nodejs.org ）下载安装 Node.js 。
在命令行输入：
$ npm -v
返回 npm 的版本号即表示安装成功。
```

### 2.安装 web 服务器

```
npm install -g http-server
```

### 3.使用

```
在上述上述文件夹下打开命令行
在命令行输入 http-server 即可在此文件夹下打开服务器，此时返回域名和端口号。
到浏览器输入该地址即可打开示例文件。
```
