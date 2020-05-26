// 服务器
const ws = require('ws')
const host = '10.31.160.40'
const port = 5000
const server = new ws.Server({
    host,
    port
})

let count = 1
let clients = []

// 获取客户端进行编号，然后存储，发布
server.on('connection', client => {
    client.name = ++count
    clients[client.name] = client

    // 获取数据
    client.on('message', msg => {
        msg.name = client.name
        boradcast(client, msg)
    })

})

function boradcast(client, msg) {  //写入广播函数
    for (let key in clients) {
        clients[key].send(msg.toString())
    }

}

server.on('listening', () => {
    console.log(`The server is running at: ws://${host}:${port}`)
})