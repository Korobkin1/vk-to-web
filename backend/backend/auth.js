const jwt = require('jsonwebtoken');
const User = require('./models/User');
const bcrypt = require('bcryptjs');

const JWT_SECRET = process.env.JWT_SECRET;

exports.authenticate = async (req, res, next) => {
  // ... логика аутентификации ...
};

exports.initializeAdmin = async () => {
  // ... инициализация администратора ...
};
