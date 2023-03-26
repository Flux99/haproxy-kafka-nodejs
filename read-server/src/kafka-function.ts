import {Kafka} from "kafkajs";
import { User } from "./model/User";

export const runkafka = async (topic:string,numPart:number) => {
    try {
        const kafka = new Kafka({
            "clientId": "myapp1",
            "brokers":["localhost:29092"]
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
        await admin.disconnect()
        console.log("Topic created");
    } catch (error) {
        console.log(`err in kafkajs ${error}`);
    }
    
}


const producer = async (part:number,value:object) => {
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
        await producer.disconnect()
        console.log("producer created", JSON.stringify(data));
    } catch (error) {
        console.log(`err in kafkajs ${error}`);
    } finally {
        process.exit(0)
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
        "eachMessage": async (res:any)=>{
            console.log(`RVD message ${res.message.value} from partition ${res.partition} typeof ${JSON.parse(res.message.value)}`);
            if (res.message.value !== null) {
                const newobj = JSON.parse(res.message.value);
                delete newobj._id
                const newVersion = newobj.version
                delete newobj.version;
                console.log("new obj", newobj,newVersion);
                const user = await User.findOne({ name: newobj.name });
                console.log("user in findone", user,!user,typeof res.message.value);
                if (!user) {
                    const newUser = new User();
                    newUser.name= newobj.name;
                    newUser.age= newobj.age;
                    newUser.address= newobj.address;
                    newUser.isAdmin= newobj.isAdmin;
                    const data = await newUser.save();
                    console.log("User data saved",data);
                } else {
                const updatedUser = await User.findOneAndUpdate(
                    { _id: user.id, version: newVersion-1 }, 
                    { ...newobj, $inc: { version: 1 } },
                    { new: true, runValidators: true, context: 'query' }
                  );
                  console.log("Updated", updatedUser);
                  if (updatedUser) {
                    console.log("user updated");
                  } else {
                    console.log("user not updated");
                    
                  }
                console.log("User data already exist");

                }
            }
            if (res.partition==0) { // perform operations based on different partition;
             
                  
            } else {

            }
        }
      })
        // await consumer.disconnect()
        console.log("consumer created");
    } catch (error) {
        console.log(`err in kafkajs ${error}`);
    }
    
}
