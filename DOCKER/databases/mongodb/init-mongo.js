db.createUser(
    {
      user: "root",
      pwd: "password",
      roles: [
        {
          role: "readWrite",
          db: "testdb"
        }
      ]
    }
);
  db.createCollection('users');
  db.users.insertOne(
    {
      name: 'Username'
    }
  );