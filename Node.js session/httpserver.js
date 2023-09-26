const express = require('express')
const app = express()
const port = 3000

var students = ["alice", "bob", "charlie"]

app.get('/1',(req,res) => {
    res.send("Hello world1")
}) 

app.get('/2',(req,res)=>{
    res.send("Hello world2")
})

app.get('/students', (req, res) => {
    res.send(students)
})

app.post('/addstudent',(req,res)=>{
    const student = req.query.studentname
    console.log(student);
    students.push(student)
    res.sendStatus(200)
})



app.listen(port,() => {
    console.log(`Listening at port ${port}`)
})