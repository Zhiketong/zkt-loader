const { cacheable } = require('../');
getName = cacheable('name', { ttl: 3 })(getName);
getName(1).then(console.log);
getName(1).then(console.log);

async function getName(id) {
	console.log('real getting name: ' + id);
	return 'foo' + id;
}


