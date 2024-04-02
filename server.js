const http = require('http')
const fs = require('fs')


const server = http.createServer(( req , res) => {
    console.log( req.url)
    const url = req.url
    const method = req.method;
    if (url === '/'){
        res.setHeader('Content-Type' , 'text/html');
        res.write('<html>')
        res.write('<head> <title>this is what is going on underneath</title> </head>')
        res.write('<body><h1>Hello world</h1><form action="/message" method="POST"><input type="text" name="message" ><button type="submit">Send</button></form></body>')
        res.write('</html>')
        return  res.end()  
        // this would end
    }
    if(url === "/message" && method === 'POST'){
        const body = [];
        req.on('data' , (chunk) => {
            console.log(chunk)
            body.push(chunk);
        } )
        req.on('end' , () =>{
            const parsedBody = Buffer.concat(body).toString();
            console.log(parsedBody)
            const message = parsedBody.split('=')[1];
            fs.writeFileSync('message.txt' , message  )   
            res.statusCode = 302
            res.setHeader('Location' , '/')
            return res.end()                 
        })
    }
    res.setHeader('Content-Type' , 'text/html');
    res.write('<html>')
    res.write('<head> <title>this is what is going on underneath</title> </head>')
    res.write('<body><h1>Hello world</h1></body>')
    res.write('</html>')
    res.end()
})


server.listen(3001)

// how the web workers -> send : process : send back
// event loop that we know -> that the code should be going on even after the function has been performed
// asynchronus code -> there is a shit ton of async code 
// requests and respose
    // we have to parse the data
    // streams and buffers