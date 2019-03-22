const rl = require('readline');
const { Writable } = require('stream');



var mutableStdout = new Writable({
    write: function (chunk, encoding, callback) {
        //console.log('I am here', this.muted);
        if (!this.muted)
            process.stdout.write(chunk, encoding);
        callback();
    }
});
mutableStdout.muted = false;

const prompt = rl.createInterface(
    {
        input: process.stdin,
        output: mutableStdout,
        terminal: true
    }
);
prompt.question('Please give the password: ', answer => {
    if (answer) console.log(`you have input ${answer}\n`);
    prompt.close();
})
mutableStdout.muted = true;


