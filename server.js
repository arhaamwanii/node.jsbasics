const http = require('http')


const server = http.createServer((req , res) => {
    console.log(req)
    process.exit()
});

server.listen(
    3000
)




// create server method returns a server
// but keep this running until there are requests commng 
// getting a shit ton of data  - form te


