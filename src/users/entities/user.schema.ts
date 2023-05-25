import * as mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    first_name:String,
    last_name: String,
    email: String,
},
{
  timestamps:true,
  collection:'users'
});

export default UserSchema;