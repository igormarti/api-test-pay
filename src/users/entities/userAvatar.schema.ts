import * as mongoose from 'mongoose';

const UserAvatarSchema = new mongoose.Schema({
    userId:String,
    hash: String,
    email: String,
},
{
  timestamps:true,
  collection:'userAvatar'
});

export default UserAvatarSchema;