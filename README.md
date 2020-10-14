[![Build Status](https://travis-ci.org/Poan18/me-backend.svg?branch=master)](https://travis-ci.org/Poan18/me-backend)
[![Scrutinizer Code Quality](https://scrutinizer-ci.com/g/Poan18/me-backend/badges/quality-score.png?b=master)](https://scrutinizer-ci.com/g/Poan18/me-backend/?branch=master)
[![Build Status](https://scrutinizer-ci.com/g/Poan18/me-backend/badges/build.png?b=master)](https://scrutinizer-ci.com/g/Poan18/me-backend/build-status/master)
[![Code Coverage](https://scrutinizer-ci.com/g/Poan18/me-backend/badges/coverage.png?b=master)](https://scrutinizer-ci.com/g/Poan18/me-backend/?branch=master)

Github repo:
https://github.com/Poan18/me-backend/

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
View the website at: http://localhost:1337
