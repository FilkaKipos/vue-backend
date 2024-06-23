const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const { register, login } = require('./controllers/userController');
const { createPost, getAllPosts } = require('./controllers/postController');

const app = express();
app.use(bodyParser.json());
app.use(cors({
  credentials: true,
  origin: "*"
}));

mongoose.connect('mongodb://localhost:27017/vue-backend', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

app.post('/register', register);
app.post('/login', login);
app.post('/post', createPost);
app.get('/posts', getAllPosts);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
