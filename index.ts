import * as dotenv from 'dotenv';
import * as http from 'http';
import { handler } from './src/handlers';

dotenv.config();

const PORT: number = parseInt(process.env.PORT as string, 10);

const server = http.createServer(handler);

server.listen(PORT, () => console.log(`Blest-off on ${PORT}`));