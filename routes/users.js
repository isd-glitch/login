const express = require('express');
const router = express.Router();

const users = [];

router.post('/register', (req, res) => {
  const { username, password } = req.body;
  users.push({ username, password });
  res.redirect('/login');
});

router.post('/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username && u.password === password);
  if (user) {
    req.session.user = username;
    res.redirect('/dashboard');
  } else {
    res.status(401).send('<script>alert("ログインに失敗しました"); window.location.href = "/register";</script>');
  }
});

module.exports = router;