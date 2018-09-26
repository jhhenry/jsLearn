import test from 'ava'
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