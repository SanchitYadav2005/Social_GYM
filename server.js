const express = require('express');
const app = express();
const port = 8080;
const ejs = require('ejs');
const path = require('path')

app.set('views', ejs)
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req,res)=>{
    res.send("hello");
})

app.listen(port, ()=>{
    console.log(`connected to the port ${port}`);
})