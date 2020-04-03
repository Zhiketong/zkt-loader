zkt-loader
==========

cache data resource with smart auto-refresh and lock.

## Usage ##

`new ZKTLoader(name, loadFunction, options)`

```javascript
const ZKTLoader = require('zkt-loader');
const loader = new ZKTLoader('user', function(user_id) {
	return db.getUser(user_id);
}, {
	useRedis: true,
	redisOptions: 'redis://127.0.0.1:6379' //options passed to ioredis
});

//...

router.get('/getUser', async ctx => {
	ctx.body = loader.load(ctx.query.user_id);
});

//...

```


### options

```javascript
{
	//use redis? if not, use in-memory cache provided by node-cache
	useRedis: false, 

	//parameter passed to new IORedis()
	redisOptions: process.env.REDIS_URL,

	//use existing ioredis instance?
	redisInstance: null,

	//default expiration seconds
	//if you request data after this time, zkt-loader will return cached  
	//data immediately, then request real data to update cache in background
	ttl: 30,

	//prefix for every key
	keyPrefix: 'zktLoader'
}
```

### cacheable decorator

`require('zkt-loader').cacheable(name, options)(loadFunction)`

example: 

```javascript
const { cacheable } = require('zkt-loader');

async function getName(id) {
	console.log('real getting name: ' + id);
	return 'foo' + id;
}
getName = cacheable('name', { ttl: 3 })(getName);

getName(1).then(console.log);
getName(1).then(console.log);
```



