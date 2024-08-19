const mongoose = require('mongoose');
const { genSalt, hash } = require('bcrypt');

const UsersSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  },
  password: {
    type: String,
    required: true,
  },
 
}, {timestamps: true});

UsersSchema.pre('save', async function(){
    const {password} = this;

    try{
          const salt = await genSalt(10);
          const hashedPassword = await hash(password, salt);
          this.password = hashedPassword;
    }catch(err){
          console.log(err);
    }
});

module.exports = mongoose.model('User', UsersSchema);
