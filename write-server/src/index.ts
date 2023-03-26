import express from "express";
const app = express()
import mongoose from 'mongoose'; 
import { User } from "./model/User";
import {runkafka,producer} from "./kafka/kafka-function";
import { saveUser, updateUser } from "./middleware/middleware-validation";
const bodyParser = require('body-parser');
const port = process.env.PORT;
app.use(bodyParser.json());

console.log("mongo env", process.env.MONGO_URI);
// console.log("mongo env", process.env.MONGO_URI,"mongodb://mongo2:27018/mydb");
mongoose.connect(process.env.MONGO_URI!) //, {  useUnifiedTopology: true })
  .then(async () => {console.log('Connected to MongoDB')
})
  .catch((err) => console.error('Error connecting to MongoDB:', err));
// runkafka("user",2);
app.get("/",async (req,res)=>{
    
    // const db = await connect();
    console.log();
    
    // if (req.body) {
    // }
    // const newUser = new User();
    // newUser.name= "abc";
    // newUser.age= 20;
    // newUser.address= "new place";
    // newUser.isAdmin= false;
    // const data = await newUser.save()
    // console.log(`user saved ${data}`);
    
    return res.send({message: "write server running on port 4000"})
})


app.post("/subcribe",async (req,res)=>{
    try {
        if (req.body.email && req.body.city) {
            console.log("sub body", req.body);
                
            // get_city_weather(req.body)
            return res.send({message: "write server running on port 4000"})
          } else {
            return res.status(400).send({message:"No request body"})
          }
    } catch (error) {
        console.log("error in subcribe api", error);
        return res.status(500).send({message:error})

    }
})

app.post("/create-user",async (req,res,next)=>{
    try {
        const result:any = await saveUser.validateAsync(req.body);
            console.log("sub body", req.body,result);
            // get_city_weather(req.body)
            const user = await User.findOne({name: result.name});
            if (!user) {
                // if (result.name)
                console.log("user does not exist");
                
                const newUser = new User();
                newUser.name= result.name;
                newUser.age= result.age;
                newUser.address= result.address;
                newUser.isAdmin= result.isAdmin;
                const data = await newUser.save();
                const part:number = result.isAdmin == true ? 0:1;
                await producer(part,data);
                return res.send({message: "User saved",data})

            } else {
                console.log("user does exist", user);
                const part:number = user.isAdmin == true ? 0:1;
                await producer(part,user);
                return res.send({message: "User saved",user})
            }
            
                
    } catch (error:any) {
        console.log("error in buyer/create-order api", error);
        if (error.isJoi) {
            error.status = 422;
          }
          next(error);

    }
  
  
})

app.post("/update-user",async (req,res,next)=>{
    try {
        const result:any = await updateUser.validateAsync(req.body);
            // get_city_weather(req.body)
            
            const user = await User.findById(String(result.user_id));
            const alluser = await User.find({});
            console.log("all user", alluser);
            
            // result.data.$inc={ version: 1 } // increment the version number by 1
            console.log("sub body", req.body,result,user);
            if (!user) {
                // if (result.name)
                // console.log("user does not exist");
                // const newUser = new User();
                // newUser.name= result.name;
                // newUser.age= result.age;
                // newUser.address= result.address;
                // newUser.isAdmin= result.isAdmin;
                // const data = await newUser.save();
                // const part:number = result.isAdmin == true ? 0:1;
                // await producer(part,data);
                return res.status(400).send({message: "User Not Found"})
            } else {
                const version=user.version == undefined ? 0: user.version;
                console.log("user found ?",user,result,user.version,version);

                // let version;
                // if (user.__v) {
                //     version = user.__v;
                // } else {
                //      version = user!.version;
                // }
                
                try {
                    const updatedUser = await User.findOneAndUpdate(
                      { _id: result.user_id, version: version }, 
                      { ...result.data, $inc: { version: 1 } }, // increment version by 1
                      { new: true, runValidators: true, context: 'query' }
                    );
                    console.log("Updated", updatedUser);
                    if (updatedUser) {
                        const part:number = updatedUser.isAdmin == true ? 0:1;
                        await producer(part,updatedUser);
                        return res.send({ message: "User Updated", updatedUser });
                    } else {
                        return res.status(500).send("User not updated")
                    }
                  } catch (err) {
                    console.error("error in updating user",err);
                    return res.status(500).send("User not updated")
                  }
                  
                // console.log("user does exist", user);

                // const part:number = user.isAdmin == true ? 0:1;
                // await producer(part,user);
                // return res.send({message: "User saved",user})
            }
            
                
    } catch (error:any) {
        console.log("error in buyer/create-order api", error);
        if (error.isJoi) {
            error.status = 422;
          }
          next(error);

    }
  
  
})

app.use((err:any, req:any, res:any, _next:any) => {
    res.status(err.status || 500);
    res.send({
      error: {
        status: err.status || 500,
        message: err.message || "Internal Server Error",
      },
    });
  });


app.listen(port,()=>{
    console.log(`server running on port${port}`);
})

function greet(name: string) {
    console.log(`Hello, ${name} from node app!`);
  }
  
  greet("world");
  