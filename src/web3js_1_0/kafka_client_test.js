const kafka = require("./kafka_client");
const log = console.log;
const topic = 'lottery-monitor-dev';
const broker_list = 'kafka-server:9092,kafka-server:9093,kafka-server:9094';
const consumer_p = kafka.getConsumer("test_group", broker_list);
const disconnect_array = [];
consumer_p.then(r => {
    const consumer = r;
    disconnect_array.push(r);
    consumer.subscribe([topic]);
    const interval_h = setInterval(function() {
        consumer.consume(1);
      }, 1000);
    consumer.on('data', data => {
        log('consumer received data: ', data.value.toString());
        clearInterval(interval_h);
    });
    log('consumer ready to receive messages.');
});
const producer_p = kafka.getProducer(broker_list);
producer_p.then(r => {
    const producer = r;
    disconnect_array.push(r);
    producer.produce(topic, null, Buffer.from("hello" + Date.now().toString()), "key", Date.now());
    //producer.flush();
    producer.removeAllListeners();   
}).catch(err => {
    log(err);
})
setTimeout(() => {disconnect_array.forEach(e => e.disconnect())}, 2000);