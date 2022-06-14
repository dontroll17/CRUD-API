import { read, write } from './fileSystem';
import { join } from 'path';
import { writeFile } from 'fs/promises';
import { validate } from 'uuid';

export const handler = async (req: any, res: any) => {

    if(req.url === '/api/users' && req.method === 'GET') {
        const users = await read();
        res.writeHead(200);
        return res.end(users);
    }

    if(req.url.match(/\api\/users\/(.+)/) && req.method === 'GET') {
        const urlArr = req.url.split('/');
        const id = urlArr[urlArr.length - 1];

        if(!validate(id)) {
            res.writeHead(400);
            return res.end('Not valid uuid');
        }

        const users = await read();
        const usersToJSON = JSON.parse(users);
        const user = usersToJSON.filter((users: { id: string; }) => users.id === id );
        if(user.length === 0) {
            res.writeHead(404);
            return res.end('Not found');
        }
        res.writeHead(200);
        return res.end(JSON.stringify(user));
    }

    if(req.url === '/api/users' && req.method === 'POST') {
        
        let body = '';
        req.on('data', (data: string) => {
            body += data;
        });

        req.on('end', async () => {
            let bodyToJSON = JSON.parse(body);

            if(!bodyToJSON.username || !bodyToJSON.age || !bodyToJSON.hobbies) {
                res.writeHead(400);
                return res.end();
            }

            await write(bodyToJSON);
        });

        res.writeHead(201);
        return res.end('User added');
    }

    if(req.url.match(/\api\/users\/(.+)/) && req.method === 'DELETE') {
        const urlArr = req.url.split('/');
        const id = urlArr[urlArr.length - 1];

        if(!validate(id)) {
            res.writeHead(400);
            return res.end('Not valid uuid');
        }

        let users = await read();
        const usersToJSON = JSON.parse(users);

        let filtered = usersToJSON.filter((users: { id: string; }) => users.id !== id );

        if(filtered.length !== usersToJSON.length) {
            await writeFile(join (__dirname,'store.json'), JSON.stringify(filtered));
            res.writeHead(204);
            return res.end('User delete');
        } else {
            res.writeHead(404);
            return res.end('Id not found');
        }
    }

    if(!req.url.startsWith('/api/users')) {
        res.writeHead(404);
        return res.end('url not found');
    }
    res.end('Done');
}