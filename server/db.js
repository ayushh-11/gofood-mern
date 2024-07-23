const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path: './.env' });

const mongoDB = async() => {
    await mongoose.connect(process.env.db)
    .then(()=>{
        console.log("Mongoose connected for gofood");
        const fetchedData = mongoose.connection.db.collection("fooditems");
        fetchedData.find({}).toArray()
        .then(fooditems => {
            global.food_items = fooditems;
        })
        .catch(err => console.log(err));

        const fetchedData2 = mongoose.connection.db.collection("foodcategory");
        fetchedData2.find({}).toArray()
        .then(foodcategory=> {
            global.food_category = foodcategory;
        })
        .catch(err => console.log(err));
    })
    .catch((err)=>{
        throw err;
    })
}
module.exports = mongoDB;