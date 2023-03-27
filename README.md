# haproxy-kafka-nodejs# E-Commerce Backend apis

## Description

#### This a fully scalable project Read & Write Server,where two services(write service & read server),which talks to eachother asynchronously via kafka distributed streaming process.

### For better understanding of kafka checkout my ![blog](https://singhabhishek.hashnode.dev/demystifying-kafka-understanding-producers-consumers-brokers-and-more).

### System Design
 
![Screenshot_1](https://github.com/Flux99/College-Database-Management/blob/master/Screenshots/Screenshot_2.jpeg?raw=true)



### Modules

- Read Server

- Write Server

- Kafka Server


### Tech Stack

- Typescript Express(Nodejs)

- Docker

- Kafka

- mongodb


## How to run

1. Now either fork or download the app and open the folder in the cli

2. To spin up kafka + zookeeper server locally.

3. Inside Project Folder go to `kafka-server/` and run the command `docker-compose up`.

4. To spin up write server.

5. Inside Project Folder go to `write-server/` 

6. Run the command `docker-compose build` and then `docker-compose up`.

7. Same steps to spin up read server. 

## User Stories

- Can Create/write Update user in the write-server `/create-user`.

- After writing user data into the mongodb write server will send user data to kafka broker by Producer Api 

- User data will be pulled by Consumer Api in read-server and gonna save in mongodb.

- User data will be written in read-server by `optimistic concurrency control` method in mongo

- gonna add haproxy to handle multiple instance of server.

## Dependencies

- Docker

- Kafka 

- express

- typescript

- mongo
