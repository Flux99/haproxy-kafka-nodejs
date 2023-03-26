import mongoose from 'mongoose'; 

export const connect = async () => {
  try {
    console.log("mongo env", process.env.MONGO_URI);
    await mongoose.connect(process.env.MONGO_URI!);
    console.log('MongoDB connected');
    return true;
  } catch (err) {
    console.error("mongo err",err);
    return false;
  }
};