db = db.getSiblingDB('admin');
db.auth('admin', 'adminpassword123!');

db = db.getSiblingDB('vkqa');

db.createUser({
  user: 'qaapp',
  pwd: 'apppassword456!',
  roles: [{ role: 'readWrite', db: 'vkqa' }]
});

db.createCollection('users');
db.createCollection('questions');

// Инициализация администратора
db.users.insertOne({
  username: 'admin',
  password: '$2a$10$xD8rZ5J5J5J5J5J5J5J5.e',
  role: 'admin',
  createdAt: new Date()
});
