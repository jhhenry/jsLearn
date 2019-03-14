const kafka = require("./kafka_client");
const log = console.log;
const topic = 'lottery-monitor-dev';
const broker_list = 'kafka-server:9092,kafka-server:9093,kafka-server:9094';
const consumer_p = kafka.getConsumer("test_group", broker_list);
consumer_p.then(r => {
    log(`enter cosuming function`);
    const consumer = r;
    consumer.subscribe([topic]);
    log(`subscribed topic`);
    //log(`consumer.seek: ${consumer.seek}`);
    consumer.assign([{topic, partition: 0, offset: 70}]);
    log(`assigned topic`);
    consumer.consume();
    let count = 0;
    consumer.on('data', r => {
        log(r);
        count++;
        if (count > 5) {
            consumer.disconnect();
        }
    });
    consumer.on('disconnected', r => {
        log(`consumer disconnected: ${r}`);
    })
    /**
     * I was also getting the Local: Erroneous state. I realized that in case of implicit assign (subscribe), you would have to wait for rebalance_cb to kick off and then call seek. And in case of explicit assign, you would have to specify the offset in your topicPartition object.
Here is the sample solution I came up with:
Implicit call to assign:

const topics = ['test'];
const consumer = new Kafka.KafkaConsumer({
    'group.id': 'kafka',
    'enable.auto.commit': false,
    'enable.auto.offset.store': false,
    'auto.offset.reset': 'earliest',
    'metadata.broker.list': 'localhost:9092',
    'rebalance_cb': function(err, assignments) {
        if (err.code === Kafka.CODES.ERRORS.ERR__ASSIGN_PARTITIONS) {
           // stuff you wanna do before assignment
          this.assign(assignments);
          this.emit('rebalanced'); // emit event 
        } else if (err.code === Kafka.CODES.ERRORS.ERR__REVOKE_PARTITIONS) {
            // Same as above, this can throw if we are disconnected.
            this.unassign();
        } else {
            // We had a real error.
            console.error(err);
        }
    }
}, {});

consumer.connect();
consumer.on('ready', function() {
    consumer.subscribe(topics);
    // now listen to rebalanced event
    consumer.on('rebalanced', function () {
        consumer.seek({topic: 'test', partition: 0, offset: 100}, 10, function (err) {
            console.log(err);
        }).on('data', (data) => {
            console.log(`${data.topic}  :  ${data.offset}`);
        });
    });

    consumer.consume();
});

In explicit call to assign, you would need to specify the offset and then consume it, or use seek to change the offset (without specifying the offset in topicPartition object, you would still get an error if you call seek function):

const consumer = new Kafka.KafkaConsumer({
    'group.id': 'kafka',
    'enable.auto.commit': false,
    'enable.auto.offset.store': false,
    'auto.offset.reset': 'earliest',
    'metadata.broker.list': 'localhost:9092',
}, {});

consumer.connect();
consumer.on('ready', function() {
    consumer.assign([{topic: 'test', partition: 0, offset: 100}]);
   // this becomes unnecessary as we already explicitly assign
   // but still you can call seek with no error
   /* 
   consumer.seek({topic: 'test', partition: 0, offset: 100}, 10, function (err) {
            console.log(err);
    });
   
    consumer.consume();
    consumer.on('data', (data) => {
            console.log(`${data.topic}  :  ${data.offset}`);
    })
});

     */
});