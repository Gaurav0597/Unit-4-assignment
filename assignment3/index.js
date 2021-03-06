const e = require("express");
const express=require("express")
const app=express();

app.use(Logger)
app.get("/books",Logger,(req,res)=>{

    return res.send(console.log("Fetching all books"))
})

app.get("/book",Logger,(req,res)=>{

    return res.send({route:"/book",role:req.role})
})

app.get("/book/:name",Logger,(req,res)=>{

    return res.send({route:"/book/:name",role:req.role})
})

function Logger(req,res,next){

    if(req.path==="/book"){
        req.role="Harry Potter"
    }
    else if(req.path==="/book"){
        req.role="Any"
    }
    else{
        req.role="Any"
    }
    next();
}

app.listen(3000,()=>{

    console.log("Listening on port 3000")
})