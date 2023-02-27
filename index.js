const express = require('express')
const axios = require('axios')
const app = express()
const port = 3000

app.use(express.json())
app.get('/', async(req, res) => {
  const {data} = await axios.get('https://jsonplaceholder.typicode.com/users')
  res.send(data)
})

app.post("/",async (req,res)=>{
    const {body} =req
    console.log(req.body)
    const {data} = await axios.post('https://jsonplaceholder.typicode.com/users',body)
  res.send(data)
})

app.put("/:id",async(req,res)=>{
    const {id} = req.params
    const {body} = req
    await axios.put(`https://jsonplaceholder.typicode.com/users/${id}`,body)
    res.sendStatus(200)
})

app.delete("/:id",async(req,res)=>{
    const {id} = req.params
   
 await axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`)
res.sendStatus(204)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})