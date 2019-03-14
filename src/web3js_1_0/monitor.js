const Web3 = require('web3');

const provider = new Web3.providers.WebsocketProvider("ws://kafka-server:8566", {headers: {
    Origin: "http://localhost"
}});
provider.on('error', e => console.error('WS Error', e));
provider.on('end', e => console.error('WS End', e));

const web3 = new Web3(provider);
const net = require('net');

readContractAddress().then((r, err) => {
    if (err) {
        console.log("Got an error", err);
        return;
    }
    const addr = r;
    try {
        // construct the contract instance with the address
        const lotteryC = new web3.eth.Contract(addr.abi, addr.address);
        console.log("start monitoring RedeemedLottery events");
        // start monitoring the specific event of the contract
        // subscribe the event
        lotteryC.events.RedeemedLotttery().on(
            "data", e => {
                console.log(e.returnValues);
        })
    } catch(e) {
        console.error(e);
    }  
});

function readContractAddress()
{
    let contractInfo;
    const client = net.createConnection({  host: 'localhost', port: 8124 }, () => {
        // 'connect' listener
        console.log('connected to server!');
        client.write('request contract address');
        //client.pipe(client);
    });
    client.on('data', (data) => {
        const data_str = data.toString();
        console.log("received data:", data_str.substr(0, 200));
        if (data_str.startsWith('{"address":')) {
            contractInfo = JSON.parse(data_str);
            console.log("got addr 1:", contractInfo.address);
            client.end();
        }
        
    });
    client.on('end', () => {
        console.log('disconnected from server');
    });
    return new Promise((resolve, reject) => {
        console.log("Enter promise logic");
        let tryTime = 0;
        const checkFunc = function() {
            if (contractInfo) {
                //console.log("got addr 2:", contractInfo);
                resolve(contractInfo);
            } else {
                tryTime++;
                if(tryTime >= 5) {
                    reject("timeout");
                }
                setTimeout(checkFunc, 1000);
            }
            
        };
        checkFunc();

    });
}