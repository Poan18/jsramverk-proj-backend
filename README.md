Github repo:
https://github.com/Poan18/jsramverk-proj-backend

Available commands:

Install dependencies:
npm install

Create database from project folder, migrate.sql contain the correct table structure:
cd db
sqlite3 texts.sqlite
.read migrate.sql
.exit

Start the server:
npm start
View the website at: http://localhost:1338
