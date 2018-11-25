# 七色卡

### 思路
  - 以红色为基本色，利用saturate、desaturate、darken、lighten、adjust_hue五个函数创建新的颜色，形成色系
  - 以第11格为中心，向左lighten、向右darken

### 项目启动
  - yarn 装包
  - yarn start: 启动并监测scss文件

### 学习的知识点
  

### 遇到的问题
  - 利用node创建本地服务器，解析报错：css静态资源没有正确返回，始终返回index.html
  ```JavaScript
    // 错误代码,所有的请求都返回了index.html
    http.createServer(function(req, res) {
      res.writeHead(200, { 'Content-Type': "text/html;charset=utf-8'" })
      fs.readFile("./index.html", function(error, data) {
        if (error) {
          console.log('读取文件时发生错误:', error.response)
        } else {
          res.end(data)
        }
      })
    }).listen(8000, "127.0.0.1")
  ```
  ```js
    // 解决方案
    1. 对于请求要根据req.url分割出请求的文件名、文件后缀，然后根据不同的类型去返回相应的内容
    2. 根据文件后缀补全文件在项目中的具体地址
    3. 根据绝对路径读取到的内容返回给客户端

    function handleRequest(req, res) {
      var suffix = req.url.substr(req.url.length - 4, req.url.length)
      var filename = req.url.substr(req.url.length - 9)
      if (suffix === '.css') {
        // 客户端对服务器的请求，说白了就是对相关文件内容的请求。
        res.writeHead(200, { 'Content-Type': 'text/css' })
        // __dirname获取到项目的绝对路径
        res.end(getFileContent(__dirname + '/css/' + filename))
      } else {
        res.writeHead(200, { 'Content-Type': 'text/html' })
        res.end(getFileContent(__dirname + '/index.html'))
      }
    }

    function getFileContent(filepath) {
      return fs.readFileSync(filepath, function(error, data) {
        if (error) {
          console.log('读取文件时发生错误:', error.response)
        } else {
          res.end(data)
        }
      });
    }
    http.createServer(handleRequest).listen(8000, "127.0.0.1")
  ```
  
  