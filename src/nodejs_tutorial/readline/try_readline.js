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
new Promise((resolve, reject) => {
    prompt.question('Please input the password for mysql: ', 
        answer => {
            if (answer) resolve(answer);
            else reject("passowrd is required.")
            prompt.close();
        }
    );
    mutableStdout.muted = true;
}
).then(r => {
    console.log(`get password: ${r}`);
}).catch(err =>{
    console.error(err);
});



