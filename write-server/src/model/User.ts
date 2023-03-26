import mongoose from 'mongoose';
import { Document, ObjectId } from 'mongoose';
import { updateIfCurrentPlugin } from 'mongoose-update-if-current';

interface IUser {
  name: string;
  age: number;
  address: string;
  isAdmin: boolean;
  version: number;
}

type IUserDocument = IUser & Document;

const userSchema = new mongoose.Schema({
  name: {type:String, unique: true},
  age: Number,
  address: String,
  isAdmin: Boolean
}, { versionKey: 'version' });

// Call plugin() to add the updateIfCurrentPlugin plugin to userSchema
userSchema.plugin(updateIfCurrentPlugin);

export const User = mongoose.model<IUserDocument>('User', userSchema);


// Example usage
// const john = new User({
//   name: 'John Smith',
//   age: 30,
//   address: '123 Main St'
// });
// john.save()
//   .then(() => console.log('Saved John to the database'))
//   .catch((err) => console.error('Error saving John to the database:', err));
