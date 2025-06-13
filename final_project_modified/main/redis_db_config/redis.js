// filepath: /Users/prakash/Desktop/major_proj/web_app/main/redis_db_config/redis.js
import redis from 'redis';

const redisClient = redis.createClient({
    host: 'localhost',
    port: 6379
});


export default redisClient;