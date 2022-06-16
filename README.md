# CRUD API example on typescript

```bash
npm install - install dependencies

npm test - start tests for app
npm run start:prod - create dist and start app
npm run start:dev - start app on dev
```
Implemented endpoint: /api/users
GET /api/users return all users
GET /api/users/:uuid return user by uuid
POST /api/users create new user
PUT /api/users/:uuid change user by uuid
DELETE /api/users/:uuid delete user by uuid

{
    "username":"Name",
    "age": "number",
    "hobbies":["text"]
} - send in postman

jest, request, supertest, ts-jest - used for auto testing

.env not added to .gitignore for educational purposes

