import { validate, v4 } from 'uuid';

let userStore: string[] = [];

export const handler = async (req: any, res: any) => {

    try {
        if(req.url === '/api/users' && req.method === 'GET') {
            const users = JSON.stringify(userStore);
            res.writeHead(200, {'Content-Type': 'application/json'});
            return res.end(users);
        }
    
        if(req.url.match(/\api\/users\/(.+)/) && req.method === 'GET') {
            const urlArr = req.url.split('/');
            const id = urlArr[urlArr.length - 1];
    
            if(!validate(id)) {
                res.writeHead(400, {'Content-Type': 'application/json'});
                return res.end('Not valid uuid');
            }
    
            const users = userStore;
            const user = users.filter((users: any) => users.id === id );
            if(user.length === 0) {
                res.writeHead(404, {'Content-Type': 'application/json'});
                return res.end(JSON.stringify('Not found'));
            }
            res.writeHead(200, {'Content-Type': 'application/json'});
            return res.end(JSON.stringify(user));
        }
    
        if(req.url === '/api/users' && req.method === 'POST') {
            
            let body = '';
            let id = v4();
            req.on('data', (data: string) => {
                body += data;
            });
    
            req.on('end', () => {
                let bodyToJSON = JSON.parse(body);
    
                //something wrong
                if(!bodyToJSON.username || !bodyToJSON.age || !bodyToJSON.hobbies) {
                    res.writeHead(400, {'Content-Type': 'application/json'});
                    return res.end("bad request");
                }
    
                bodyToJSON.id = id;
                userStore.push(bodyToJSON);
            });
    
            res.writeHead(201, {'Content-Type': 'application/json'});
            return res.end(JSON.stringify({ userAdded: id}));
        }
    
        if(req.url.match(/\api\/users\/(.+)/) && req.method === 'DELETE') {
            const urlArr = req.url.split('/');
            const id = urlArr[urlArr.length - 1];
    
            if(!validate(id)) {
                res.writeHead(400, {'Content-Type': 'application/json'});
                return res.end('Not valid uuid');
            }
    
            let users = userStore;
    
            let filtered = users.filter((users: any) => users.id !== id );
    
            if(filtered.length !== users.length) {
                userStore = filtered;
                res.writeHead(204, {'Content-Type': 'application/json'});
                return res.end('User delete');
            } else {
                res.writeHead(404, {'Content-Type': 'application/json'});
                return res.end('Id not found');
            }
        }
    
        if(req.url.match(/\api\/users\/(.+)/) && req.method === 'PUT') {
            const urlArr = req.url.split('/');
            const id = urlArr[urlArr.length - 1];
    
            if(!validate(id)) {
                res.writeHead(400, {'Content-Type': 'application/json'});
                return res.end('Not valid uuid');
            }
    
            let body = '';
            req.on('data', (data: string) => {
                body += data;
            });
    
            req.on('end', () => {
                let bodyToJSON = JSON.parse(body);
                bodyToJSON.id = id
    
                let filter = userStore.filter((user: any) => user.id !== id);
                filter.push(bodyToJSON);
                userStore = filter;
            });
            
    
        }
    
        if(!req.url.startsWith('/api/users')) {
            res.writeHead(404, {'Content-Type': 'application/json'});
            return res.end(JSON.stringify({ message: 'url not found' }));
        }
        res.end('Done');
    } catch(e) {
        console.error(e);
        res.writeHead(500, {'Content-Type': 'application/json'});
        res.end((JSON.stringify({ message: 'server error' })));
    }
}