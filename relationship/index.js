const express = require('express')
const mongoose = require('mongoose')
const app = express()
app.use(express.json())
const connect = () => {
  return mongoose.connect('mongodb://127.0.0.1:27017/library')
}
//---------------------------------------------------------------------------------------------//
//user schema
const userSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
  },
  {
    versionKey: false,
    timestamps: true,
  },
)
//user model
const User = mongoose.model('user', userSchema)
//--------------------------------------------------------------------------------------------------------//
//section schema
const secSchema = new mongoose.Schema(
  {
    section_name: { type: String, required: false, default: 'general' },
  },
  {
    versionKey: false,
    timestamps: true,
  },
)

const Section = mongoose.model('section', secSchema)
//------------------------------------------------------------------------------------------------------------------//
//books schema
const booksSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    check: { type: Boolean, required: false, default: false },
    section_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'section',
      required: true,
    },
    auth_id: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'auth',
        required: true,
      },
    ],
  },
  {
    versionKey: false,
    timestamps: true,
  },
)
//books model
const Book = mongoose.model('book', booksSchema)
//-------------------------------------------------------------------------------------------------------//
//authur schema
const authSchema = new mongoose.Schema(
  {
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    books_id: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'book',
        required: true,
      },
    ],
  },
  {
    versionKey: false,
    timestamps: true,
  },
)

//authur model
const Auth = mongoose.model('auth', authSchema)
//------------------------------------------------------------------------------------------------------------------//
//create the section
app.post('/sections', async (req, res) => {
  try {
    const section = await Section.create(req.body)
    return res.status(200).send(section)
  } catch (err) {
    return res.status(500).send(err.message)
  }
})
//lets create the authors
app.post('/auths', async (req, res) => {
  try {
    const auth = await Auth.create(req.body)
    return res.status(200).send(auth)
  } catch (err) {
    return res.status(500).send(err.message)
  }
})
//lests create the books
app.post('/books', async (req, res) => {
  try {
    const book = await Book.create(req.body)
    return res.status(200).send(book)
  } catch (err) {
    return res.status(500).send(err.message)
  }
})
//lets add books into authors
app.put('/auths/:id', async (req, res) => {
  try {
    const auth = await Auth.findOneAndUpdate(
      { _id: req.params.id },
      { $push: { books_id: req.body.bookId } },
      { new: true },
    )
    return res.status(200).send(auth)
  } catch (err) {
    return res.status(500).send(err.message)
  }
})
//lets add the users
app.post('/users', async (req, res) => {
  try {
    const user = await User.create(req.body)
    return res.status(200).send(user)
  } catch (err) {
    return res.status(500).send(err.message)
  }
})
//lets update the books status according to users
app.put('/books/:id', async (req, res) => {
  try {
    const book = await Book.findOneAndUpdate(req.params.id, req.body, {
      new: true,
    })
    return res.status(200).send(book)
  } catch (err) {
    return res.status(500).send(err.message)
  }
})

//question 1st find book that are checkout
app.get('/books', async (req, res) => {
  try {
    const book = await Book.find({ check: { $eq: true } })
    return res.status(200).send(book)
  } catch (err) {
    return res.status(500).send(err.message)
  }
})
//question 2nd find all book of author
app.get('/auths/:id', async (req, res) => {
  try {
    const auth = await Auth.findById(req.params.id).populate({
      path: 'books_id',
    })
    return res.status(200).send(auth)
  } catch (err) {
    return res.status(500).send(err.message)
  }
})
// que 3rd find the book in a section
app.get('/books/section', async (req, res) => {
  try {
    const book = await Book.find({
      section_id: { $eq: '6230c4456562ed7e7228657b' },
    }).populate({
      path: 'section_id',
    })
    return res.status(200).send(book)
  } catch (err) {
    return res.status(500).send(err.message)
  }
})
//que 4th find the book that are not checkout
app.get('/books', async (req, res) => {
  try {
    const book = await Book.find({ check: { $eq: false } })
    return res.status(200).send(book)
  } catch (err) {
    return res.status(500).send(err.message)
  }
})
//que 5th find the book of 1 author
app.get('/auths/:id', async (req, res) => {
  try {
    const auth = await Auth.findById(req.params.id).populate({
      path: 'books_id',
    })
    return res.status(200).send(auth)
  } catch (err) {
    return res.status(500).send(err.message)
  }
})

app.listen(2233, async () => {
  try {
    await connect()
    console.log('listening to port 2233')
  } catch (e) {
    console.log(e.message)
  }
})
