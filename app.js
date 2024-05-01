import express from 'express';
import path from 'path';
// import fs from 'fs';
const __dirname = path.resolve();

const app = express();
const port = 3000;

app.use(express.static('public'));

app.get('/users/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'html', 'user_signin.html'));
});

app.get('/posts', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'html', 'post_list.html'));
});

app.get('/posts/:postNum', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'html', 'post_detail.html'));
});

app.get('/post/new', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'html', 'post_write.html'));
});

app.get('/posts/:postNum/update', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'html', 'post_modify.html'));
});

app.get('/users/signup', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'html', 'user_signup.html'));
  // fs.mkdirSync(path.join(__dirname, 'test'));
});

app.get('/users/:userId', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'html', 'user_modify.html'));
});

app.get('/users/:userId/password', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'html', 'modify_pw.html'));
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
