import test from 'ava'
const index = require('./index')
//import utils from './utils'
test('foo', t => {
	// for (let p in utils) {console.log(`${p}: ${utils[p]}`)}
	// console.log(utils.PI, typeof utils.PI);
	t.pass();
});

test('bar', async t=> {
    console.log(`the foo variable originating from the main js is exported by the index file: ${index.foo}`);
    t.truthy(index.foo);
});