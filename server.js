const express = require('express');
const app = express();
const port = 8080;

app.get('/', (req,res)=>{
    res.send("hello");
})

app.listen(port, ()=>{
    console.log(`connected to the port ${port}`);
})