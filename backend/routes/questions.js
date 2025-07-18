const express = require('express');
const { authenticate } = require('../auth');
const Question = require('../models/Question');
const router = express.Router();

router.use(authenticate);

router.get('/', async (req, res) => {
  try {
    const questions = await Question.find().populate('userId', 'username');
    res.json(questions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const question = new Question({
      text: req.body.text,
      userId: req.user.userId
    });
    await question.save();
    
    // Emit to all connected clients
    req.io.emit('newQuestion', question);
    
    res.status(201).json(question);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
