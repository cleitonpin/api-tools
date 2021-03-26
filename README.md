# Tools API

<img src="https://heroku-badges.herokuapp.com/?app=heroku-badges" />

## 🚀 Techs
- [Node.js](https://nodejs.org/en/)
- [TypeScript](https://www.typescriptlang.org/)
- [Express](https://expressjs.com/)
- [TypeORM](https://typeorm.io/)
- [Yup](https://github.com/jquense/yup)
- [Jest](https://jestjs.io/)

## ⚙ Installation
1. Clone repository
```console
$ git clone https://github.com/cleitonpin/api-tools.git
```
4. Enter in directory
```console
$ cd api-tools
```
3. Install dependencies
```console
$ yarn install
```
4. Run migrations
```console
$ yarn typeorm migration:run
```
5. Remove line 4 to 6 in ormconfig.js

<pre>
  <code>
    api-tools
      │
      │   
      │   
      │   
      │   
      │
      ├── ormconfig.js   // ORM and database connection configuration
      
      
4     "ssl": {
5         "rejectUnauthorized": false
6     },
  </code>
</pre>

6. Run server
```console
$ yarn run dev
```

Access through [`http://localhost:3000`](http://127.0.0.1:3000/)<br>
Heroku [`https://apitools-test.herokuapp.com`](https://apitools-test.herokuapp.com)

## Endpoints
### Tools
```http
GET    /tools
GET    /tools/1
GET    /tools?tag=node
POST   /tools
DELETE /tools/1
```
### Users
```http
GET    /user
GET    /user/profile
POST   /user
DELETE /user/1
```
### Login
```http
POST   /login
```
## ⚒️ API

## Tools collection [/tools]

### Create tool [POST]

+ Request criar nova ferramenta

    + Headers
    
            Accept: application/json
    + Body

            {
                "title": "hotel",
                "link": "https://github.com/typicode/hotel",
                "description": "Local app manager. Start apps within your browser, developer tool with local .localhost domain and https out of the box.",
                "tags":["node", "organizing", "webapps", "domain", "developer", "https", "proxy"]
            }
+ Response 201 (application/json)


### List All tools [GET]

+ Response 200 (application/json)

        [
            {
                "title": "hotel",
                "link": "https://github.com/typicode/hotel",
                "description": "Local app manager. Start apps within your browser, developer tool with local .localhost domain and https out of the box.",
                "tags":["node", "organizing", "webapps", "domain", "developer", "https", "proxy"]
            },
            {
                "title": "git",
                "link": "https://github.com/typicode/hotel",
                "description": "Local app manager. Start apps within your browser, developer tool with local .localhost domain and https out of the box.",
                "tags":["node", "rain", "flash", "house"]
            }
        ]

+ Response 404 (Error)

## Tool [/tools/{id_tool}]

+ Parameters
    + id_tool: 1absds-123ewq (hexadecimal, required) - ID tool

## Tool tag [/tools?tag={tag_tool}]

+ Parameters
    + tag_tool: node (string, required) - Name of tool tag

### Delete [DELETE]

+ Response 204

## User collection [/user]

### Create a new user [POST]

+ Request criar nova ferramenta

    + Headers
    
            Accept: application/json
    + Body

            {
                "username": "cleitonpin",
                "email": "cleitonpin@pin.com.br",
                "password": "thispassword",
            }
+ Response 201 (application/json)


### List All users [GET]

+ Response 200 (application/json)

        [
            {
                "username": "cleitonpin",
                "email": "cleitonpin@pin.com.br",
                "password": "thispassword",
            },
            {
                "username": "luizpoca",
                "email": "pocasi@pin.com.br",
                "password": "thispassword",
            }
        ]

+ Response 404 (Error)

## Users [/user/profile]

+ Request listar profile

    + Headers 

            Authorization: 'Bearer token'

    + Response 200

### Delete [DELETE]

+ Response 204

## 📜 License

Project under [MIT](./LICENSE) License
