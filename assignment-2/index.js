const express = require('express')

const app = express()

app.get('/', (req, res) => {
  // console.log("hello")
  res.send('hello')
})

const arr = ['harry porter', 'rich dad poor dad','half girlfriend','wings of fire']
app.get('/books', (req, res) => {
  res.send(arr)
  // console.log("hello")
})

app.listen(3000, () => {
  console.log('listening on port 3000')
})
