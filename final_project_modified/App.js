import express from 'express';
import router from './main/routes/routes.js';
import session from './main/middleware/session.js';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import redisClient from './main/redis_db_config/redis.js';
import cors from 'cors';

dotenv.config();

// Replicate __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Redis connection logic
async function connectRedis() {
  try {
      await redisClient.connect();
      console.log('Connected to Redis');
  } catch (err) {
      console.error('Failed to connect to Redis:', err);
      process.exit(1); // Exit the process if Redis connection fails
  }
}

await connectRedis();


const app = express();
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'main', 'views'));

//
app.use(cors({
  origin: 'http://localhost:3002', // React app's URL
  credentials: true, // Allow cookies to be sent
}));

const port  = process.env.PORT || 3000;

//Middleware
app.use(express.json());
app.use(bodyParser.json());

try{
app.use(session);
}
catch(err){
  console.error('Session middleware error:', err);
  process.exit(1); // Exit the process if session middleware fails
}
app.use('/api',router); //all routes have been moved to the routes directory.


// // Serve React build files
// app.use(express.static(path.join(__dirname, 'client', 'dist')));

// // Fallback route for React
// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
// });


app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});