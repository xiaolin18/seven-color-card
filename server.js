var http = require('http')
var fs = require('fs')

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
console.log('Server Running at http://127.0.0.1:8000')