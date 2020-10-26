Github repo:
https://github.com/Poan18/jsramverk-proj-backend

Different packages used:
Jsonwebtoken (https://www.npmjs.com/package/jsonwebtoken) - Used to create unique tokens that client saves in their cookies in order to properly authenticate when purchasing objects or adding balance.

cookie parser (https://www.npmjs.com/package/cookie-parser) Used to send cookies containing JWT tokens to client when logging in a simple way.

bcrypt.js (https://www.npmjs.com/package/bcryptjs) - Used to safely hash user passwords.

express-ws (https://www.npmjs.com/package/express-ws) - Used to open and control a websocket endpoint on the server.

node-cron (https://www.npmjs.com/package/node-cron) - Used to schedule price updates, in order to simulate real world trading.


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
