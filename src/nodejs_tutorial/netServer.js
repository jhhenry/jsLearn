const net = require('net');

const server  = new net.Server((c) => {
    // 'connection' listener
    console.log('client connected');
    c.on('end', () => {
      console.log('client disconnected');
    });
    c.on('data', data => {
        console.log(`received data from client ${c.localPort}: ${data}`)
        if (data == "request contract address") {
            console.log("received contract address request");
            c.write("contract address: 0xabcd");
            server.close();
        }
    })
    
  });
server.on('error', (err) => {
    throw err;
  });
server.listen({
    host: 'localhost',
    port: 8124,
    exclusive: true
  }, () => {
    console.log('server bound');
});
