var http = require('http')
var queryString = require('querystring')

// 侦听服务器的request事件
http.createServer(function(req, res) {
    var postData = '';
    req.setEncoding('utf-8')

    // 侦听请求的data事件
    req.on('data', function(chunk) {
        postData += chunk
        console.log(postData)
    })

    // 侦听请求的end事件
    req.on('end', function() {
        res.end(postData)
        console.log('end', postData)
    })
}).listen(8080)

console.log('服务启动完成')
