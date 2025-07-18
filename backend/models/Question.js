const mongoose = require('mongoose');

const QuestionSchema = new mongoose.Schema({
  text: { type: String, required: true },
  answer: { type: String },
  status: { type: String, enum: ['pending', 'answered'], default: 'pending' },
  createdAt: { type: Date, default: Date.now },
  answeredAt: { type: Date },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

module.exports = mongoose.model('Question', QuestionSchema);
