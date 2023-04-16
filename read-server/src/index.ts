import express from "express";
const app = express()
import mongoose from 'mongoose'; 
import {consumer} from "./kafka-function";
// import {get_city_weather} from "../../write-server/src/helper-function";
import { User } from "./model/User";
import { getUser } from "./middleware-validation";
const port = process.env.PORT ?? 3000;




// consumer();
app.get("/",async (req,res)=>{
    // const db = await connect();
    console.log("mongo env read server", process.env.MONGO_URI);
    const data = await mongoose.connect(process.env.MONGO_URI!);
// .then(async () => {
// console.log('Connected to MongoDB')
// })
// .catch((err) => console.error('Error connecting to MongoDB:', err));

    return res.send({message: "server running on port 3000"})
})


app.get("/get-user",async (req,res,next)=>{
  // const db = await connect();
  try {
    const result = await getUser.validateAsync(req.body);
    const user = await User.findOne({name: result.name});
    if (!user) {
      return res.status(400).send({message: "Not user found"})
    } else {
      return res.send({message: "user found", data: user});
    }
  } catch (error:any) {
    console.log("error in get user api", error);
        if (error.isJoi) {
            error.status = 422;
          }
          next(error);
  }
})


app.post("/subcribe",async (req,res)=>{
  if (req.body.email && req.body.city) {
    // get_city_weather(req.body.city)
    return res.send({message: "server running on port 3000"})
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
  