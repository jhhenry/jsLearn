const test = require('ava');
const asyncMutex = require('async-mutex').Mutex;
const pre = require('./pre');

test.before("", t => {
	pre.init(new asyncMutex());
});

test('foo2', t => {
	// for (let p in utils) {console.log(`${p}: ${utils[p]}`)}
	// console.log(utils.PI, typeof utils.PI);
	t.pass();
});

test('bar2', async t=> {
	const bar = Promise.resolve('bar');
	t.is(await bar, 'bar');
});