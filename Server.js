const express = require("express");
const mongoose = require("mongoose");
const User = require("./models/User");
require("dotenv").config();


const app = express();
app.use(express.json());
const PORT = process.env.PORT || 5000;
mongoose.connect('mongodb://localhost:27017/UserDB')  //Create database locally
.then(()=> console.log("DATABASE is Connecting")).catch(err => console.log(err));


//Create 4 routes :


// 1.Get : Return all Users :

app.get("/getAllUsers", (req, res) => {
     User.find()
      .then((user) => res.send(user))
      .catch((err) => console.log(err));
  });





  //2.POST :  ADD A NEW USER TO THE DATABASE :


app.post("/CreateUser", async(req, res) =>{
    try {
        const { FirstName, LastName, Age, PhoneNumber, Email, Password } = req.body;
        
        //console.log(FirstName, LastName, Age, PhoneNumber, Email, Password);
    const user = await User.create({FirstName, LastName, Age, PhoneNumber, Email, Password});
      res
       .status(200)
       .json({status: true, message: "User Added", data: user});

    }catch(err) {
console.log(err);
 res
  .status(500)
  .json({ status: false, message: err});
    }
});




//3.PUT : EDIT A USER BY ID :

app.put("/UpdateUser/:id", async (req, res) => {
    try {
        const {id} = req.params;
        let user = await User.findById(id);
        if (user) {
    await User.findByIdAndUpdate(id, {...req.body});
    user = await User.findById(id);
    res
    .status(200)
    .json({ status: true, message: "User Updated", data: user});
        } else {
            res
            .status(200)
            .json({ status: true, message: "User is not existed"});

        }
    } catch(err) {
        console.log(err);
        res
        .status(500)
        .json({ status: false, message: err});
    }
});




//4.DELETE : REMOVE A USER BY ID :


app.delete("/DeleteUser/:id", async (req, res) => {
    try {
        const {id} = req.params;
        let user = await User.findById(id);
        if (user) {
    await User.findByIdAndDelete(id);
    user = await User.findById(id);
    res
    .status(200)
    .json({ status: true, message: "User Deleted", data: user});
        } else {
            res
            .status(200)
            .json({ status: true, message: "User is not existed"});

        }
    } catch(err) {
        console.log(err);
        res
        .status(500)
        .json({ status: false, message: err});
    }
});




app.listen(PORT,() => console.log(`Server Started on PORT ${PORT}`));


