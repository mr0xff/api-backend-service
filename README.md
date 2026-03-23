# Backend Service for personal use

Practice backend service

Run this command on primary mongo server instance to enable replica set configuration: 
```js
rs.initiate( {
   _id : "rs0",
   members: [
      { _id: 0, host: "mongodb0.example.net:27017" },
      { _id: 1, host: "mongodb1.example.net:27017" },
      { _id: 2, host: "mongodb2.example.net:27017" }
   ]
})
```

For more details see [Deploy a Replica Set](https://www.mongodb.com/docs/manual/tutorial/deploy-replica-set/)

Pay attention on `DATABASE_URL` string connection to contain all server address: 
```sh
DATABASE_URL="mongodb://localhost:27017,localhost:27018,localhost:27019/mydb?replicaSet=rs0"
```