db.createUser({
  user: process.env.MONGO_USER,
  pwd: process.env.MONGO_PASSWORD,
  roles: [{ role: 'readWrite', db: process.env.MONGO_DB_NAME }]
});

db = db.getSiblingDB(process.env.MONGO_DB_NAME);
db.createCollection('users');
db.createCollection('questions');
