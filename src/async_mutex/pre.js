global.pre = {};
global.pre.init = Math.random();
console.log(global.pre.init);
function init(mutex) {
	console.log("entered init method")
	mutex.acquire().then(function(){
		if (!global.pre.init) {
			setTimeout(
				() => {
					console.log('hello');
					global.pre.init;
	
				}, 
				1);
		}
		
	});
}

module.exports.init  = init;