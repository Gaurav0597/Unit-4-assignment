const mongoose = require('mongoose');
const userSchema = new mongoose.Schema(
    {
        first_name:{type: 'string', required: true},
        last_name:{type: 'string', required: true},
        email:{type: 'string', required: true},
        pincode:{type: 'Number', required: true},
        age:{type: 'Number', required: true},
        gender:{type: 'string', required: true},
    },
    {
        varsionKey:false,
        timestamp:true
    }
    );
    module.exports=mongoose.model("user",userSchema)