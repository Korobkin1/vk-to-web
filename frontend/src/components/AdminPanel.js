import React, { useState, useEffect } from 'react';
import { getQuestions, answerQuestion } from '../services/api';

function AdminPanel({ user, socket }) {
  const [questions, setQuestions] = useState([]);
  const [newAnswer, setNewAnswer] = useState('');

  useEffect(() => {
    const loadQuestions = async () => {
      const data = await getQuestions();
      setQuestions(data);
    };
    loadQuestions();

    socket.on('newQuestion', (question) => {
      setQuestions(prev => [...prev, question]);
    });
  }, [socket]);

  const handleAnswer = async (questionId) => {
    await answerQuestion(questionId, newAnswer);
    setQuestions(questions.map(q => 
      q._id === questionId ? { ...q, answer: newAnswer, status: 'answered' } : q
    ));
    setNewAnswer('');
  };

  return (
    <div className="admin-panel">
      <h2>Welcome, {user.username} (Admin)</h2>
      <div className="questions-list">
        {questions.map(q => (
          <div key={q._id} className="question-card">
            <p>{q.text}</p>
            {q.status === 'answered' ? (
              <p>Answer: {q.answer}</p>
            ) : (
              <>
                <textarea
                  value={newAnswer}
                  onChange={(e) => setNewAnswer(e.target.value)}
                  placeholder="Your answer..."
                />
                <button onClick={() => handleAnswer(q._id)}>Submit Answer</button>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminPanel;
