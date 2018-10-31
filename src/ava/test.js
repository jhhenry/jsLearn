import test from 'ava'
const convertHex = require('convert-hex')
//import utils from './utils'
test('foo', t => {
	// for (let p in utils) {console.log(`${p}: ${utils[p]}`)}
	// console.log(utils.PI, typeof utils.PI);
	t.pass();
});

test('bar', async t=> {
	const bar = Promise.resolve('bar');
	t.is(await bar, 'bar');
});

test('try convert-hex', t=> {
	var hex = "0x34550122DF" //"0x" prefix is optional
	//console.dir(convertHex.hexToBytes(hex).join(',')) //'[52,85,1,34,223]'
	t.deepEqual(convertHex.hexToBytes(hex), [52,85,1,34,223]);
});