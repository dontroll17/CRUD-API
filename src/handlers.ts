import { validate, v4 } from 'uuid';
import { findUser } from './findUser';

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
                return res.end(JSON.stringify({ message: 'Not valid uuid' }));
            }
    
            const users = userStore;
            const user = users.filter((users: any) => users.id === id );
            if(user.length === 0) {
                res.writeHead(404, {'Content-Type': 'application/json'});
                return res.end(JSON.stringify({ message: 'Not found' }));
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
                try {
                    if(body.length === 0) {
                        res.writeHead(400, {'Content-Type': 'application/json'});
                        return res.end(JSON.stringify({ message: "bad request" }));
                    }
                    let bodyToJSON = JSON.parse(body);
        
                    if(!bodyToJSON.username || !bodyToJSON.age || !bodyToJSON.hobbies) {
                        res.writeHead(400, {'Content-Type': 'application/json'});
                        return res.end(JSON.stringify({ message: "bad request" }));
                    }
        
                    bodyToJSON.id = id;
                    userStore.push(bodyToJSON);
                    res.writeHead(201, {'Content-Type': 'application/json'});
                     return res.end(JSON.stringify({ userAdded: id}));
                } catch(e) {
                    throw(e);
                }
            });
        }
    
        if(req.url.match(/\api\/users\/(.+)/) && req.method === 'DELETE') {
            const urlArr = req.url.split('/');
            const id = urlArr[urlArr.length - 1];
    
            if(!validate(id)) {
                res.writeHead(400, {'Content-Type': 'application/json'});
                return res.end(JSON.stringify( { message: 'Not valid uuid' }));
            }
            
            const check = findUser(userStore, id);

            if(check) {
                let users = userStore;
    
                let filtered = users.filter((users: any) => users.id !== id );
                userStore = filtered;
                res.writeHead(204, {'Content-Type': 'application/json'});
                return res.end(JSON.stringify({ message:'User delete' }));
  
            } else {
                res.writeHead(404, {'Content-Type': 'application/json'});
                return res.end(JSON.stringify({ message:'Id not found' }));
            }
        }  
        
        if(req.url.match(/\api\/users\/(.+)/) && req.method === 'PUT') {
            const urlArr = req.url.split('/');
            const id = urlArr[urlArr.length - 1];
    
            if(!validate(id)) {
                res.writeHead(400, {'Content-Type': 'application/json'});
                return res.end(JSON.stringify({ message: 'Not valid uuid' }));
            }
            
            const check = findUser(userStore, id);
            if(check) {
                let body = '';
                req.on('data', (data: string) => {
                    body += data.toString();
                });
    
                req.on('end', () => {
                    let bodyToJSON = JSON.parse(body);
                    bodyToJSON.id = id
        
                    let filter = userStore.filter((user: any) => user.id !== id);
                    filter.push(bodyToJSON);
                    userStore = filter;

                    
                    res.writeHead(200, {'Content-Type': 'application/json'});
                    return res.end(JSON.stringify({ message: 'user updated'}));
                });
                
            } else {
                res.writeHead(404, {'Content-Type': 'application/json'});
                return res.end(JSON.stringify({ message:'Id not found' }));
            }
        }
    
        if(!req.url.startsWith('/api/users')) {
            res.writeHead(404, {'Content-Type': 'application/json'});
            return res.end(JSON.stringify({ message: 'url not found' }));
        }
    } catch(e) {
        console.error(e);
        res.writeHead(500, {'Content-Type': 'application/json'});
        res.end((JSON.stringify({ message: 'server error' })));
    }
}