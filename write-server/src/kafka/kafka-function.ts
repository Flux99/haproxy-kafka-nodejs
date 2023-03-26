import {Kafka} from "kafkajs";

export const runkafka = async (topic:string,numPart:number) => {
    try {
        const kafka = new Kafka({
            "clientId": "myapp1",
            "brokers":["localhost:29092"],
        })
    
        const admin = kafka.admin()
        console.log("Connecting...");
        
        await admin.connect();
        console.log("Connected");
        admin.createTopics({
            "topics":[{
                "topic":topic,
                "numPartitions":numPart
            }],
        });
        // await admin.disconnect()
        console.log("Topic created");
        return
    } catch (error) {
        console.log(`err in kafkajs ${error}`);
        return;
    }
    
}


export const producer = async (part:number,value:object) => {
    try {
        const kafka = new Kafka({
            "clientId": "myapp1",
            "brokers":["localhost:29092"]
        })
    
        const producer = kafka.producer()
        console.log("Connecting...");
        
        await producer.connect();
        console.log("Connected");
        const data = await producer.send({
            "topic":"user",
            "messages":[
                {
                    "value":JSON.stringify(value),
                    "partition": part
                }
            ]
        })
        await producer.disconnect();
        console.log("producer created", JSON.stringify(data));
        return data;
    } catch (error) {
        console.log(`err in kafkajs ${error}`);
    }
}

 export const consumer = async () => {
    try {
        const kafka = new Kafka({
            "clientId": "myapp1",
            "brokers":["localhost:29092"]
        })
    
        const consumer = kafka.consumer({"groupId":"test"})
        console.log("Connecting...");
        
        await consumer.connect();
        console.log("Connected");
      await consumer.subscribe({
        "topic":"user",
        "fromBeginning":true,
    
      })
      await consumer.run({
        "eachMessage": async (res)=>{
            console.log(`RVD message ${res.message.value} from partition ${res.partition}`);
        }
      })
        // await consumer.disconnect()
        console.log("consumer created");
    } catch (error) {
        console.log(`err in kafkajs ${error}`);
    }
    
}
interface userInfo {
    name: String,
    location: String
    }
    enum location  {
        USA= "usa",
        CANADA= "canada"
    }
    const user: userInfo={
        name:"abc",
        location:"usa"
    }