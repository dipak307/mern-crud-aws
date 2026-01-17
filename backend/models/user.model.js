import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    email: String,
    role: {
        type: String,
        enum: ['OWNER', 'USER'],
        default: 'USER'
    },
},{timestamps:true  });

const User = mongoose.model('User', userSchema);
export default User;

