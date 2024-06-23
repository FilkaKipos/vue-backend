const Post = require('../models/Post');

async function createPost(req, res) {
  const { username, content } = req.body;
  const post = new Post({ username, content });
  try {
    await post.save();
    res.status(201).send({ message: 'Post created successfully' });
  } catch (err) {
    res.status(400).send({ message: 'Failed to create post', error: err.message });
  }
}

async function getAllPosts(req, res) {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    res.status(200).send(posts);
  } catch (err) {
    res.status(500).send({ message: 'Failed to fetch posts', error: err.message });
  }
}

module.exports = {
  createPost,
  getAllPosts
};
