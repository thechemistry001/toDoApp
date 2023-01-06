const express=require("express");
const bodyParser=require("body-parser");
const mongoose=require("mongoose");
const path=require("path")
const app=express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
mongoose.set('strictQuery', false);
mongoose.connect("mongodb+srv://admin:admin@cluster0.wu6ayr7.mongodb.net/ToDoReact")
// mongoose.connect("mongodb://localhost/ToDoReact")
let ItemSchema=new mongoose.Schema({
    item:String,

})

const Item=mongoose.model("Item",ItemSchema);

app.post("/item",function(req,res){
    const itemData=req.body.item;

    const Data=new Item({
        item:itemData,
        
    })
    Data.save();
    res.json({code:"success"});
})

app.get("/itemArray",function (req,res) { 
    Item.find({},function(err,foundArray){
        if(!err){
            res.json(foundArray);
        }
    })
 })

 app.post("/delete",function(req,res){
    const itemdel=req.body.item;
    console.log(itemdel);
    Item.findOneAndRemove({item:itemdel},function(err){
        if(!err){
            res.json({code:"success"});
        }
    })
 })
 app.use(express.static(path.join(__dirname,"./client/build")))
app.get("*",function (req,res) {
    res.sendFile(path.join(__dirname,"./client/build/index.html"));
  })
 app.listen(8080,()=>{console.log("server 8080 is live");})