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
5. Run server
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

## 📜 License

Project under [MIT](./LICENSE) License
