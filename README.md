# notification-api
This repository assumes you have docker installed, if you don't have it please install it https://docs.docker.com/get-docker/

If you already have docker, then clone this repository and then in the terminal run:
```sh
cd notification-api
cd docker-db
docker-compose up
```
Wait until you see `ready for connections`.

Now open another terminal and go to `notification-api` folder an run:
```sh
npm install
npm start
```

The api is ready to be used!

Note: its available in http://localhost:4017/api

## Endpoints
- POST notifications / creates notifications
- GET  notifications / gets notifications

## Unit test
Run the following to see unit testing:

```sh
npm run test
```