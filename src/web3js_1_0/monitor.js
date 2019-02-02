const Web3 = require('web3');

const web3 = new Web3("http://192.168.56.123:8565");
const net = require('net');
//console.log(web3);

//web3.personal.unLockAccount

readContractAddress();
function readContractAddress()
{
    const client = net.createConnection({  host: 'localhost', port: 8124 }, () => {
        // 'connect' listener
        console.log('connected to server!');
        client.write('world!\r\n');
    });
    client.on('data', (data) => {
        console.log("received data:", data.toString());
        client.end();
    });
    client.on('end', () => {
        console.log('disconnected from server');
    });
}