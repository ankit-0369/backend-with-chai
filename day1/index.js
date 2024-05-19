const port= 3000;

const express= require('express')
const app= express()

app.get('/', (req, res)=>{
    res.status(200)
    res.send("Hello world of BAckend");
})

app.get('/profile', (req, res)=>{
    res.send('<h1>Profile page</h1>')
    res.sendStatus(200)
})




app.listen(port, ()=>{
    console.log(`listening on port ${port}`)
})