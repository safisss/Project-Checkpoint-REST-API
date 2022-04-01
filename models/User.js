const mongoose = require('mongoose');

//Create schema User

const User = new mongoose.Schema  ({

FirstName :{
    type: String,
    required : true,
},

LastName : {
    type: String,
    required : true,
},

Age :{

    type: Number,
},

PhoneNumber : {

    type: Number,
    unique: true,
    required: true,
},

Email : {
    type: String,
    required: true,
},

Password : {
    type : String,
    required: true,
}
});


module.exports = mongoose.model('user', User); // 'user' ==> name of collection od DB / User ==> Name of schema
