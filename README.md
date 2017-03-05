# Note-Share
## Description
Site with basic posting functionality. Supports link and text posts. Data is stored onto a local database (using nedb).

## Dependencies
Make sure you have node and npm installed on your machine.

## Getting Started
When building the project for the very first time, run the following command to get all required dependencies.

    npm install

## Usage
To run the project, execute the following command.

    npm start

To run the project in production mode using 'forverjs', execute the following command.

    npm run forever

Create a users.htpasswd file and put at the project root. If you would rather disable authentication, comment out line 20 in app.js.

Server runs on port 3000 by default.

##  To-Do
* basic markdown processing for text posts
* direct link to posts - 'permalinks'
* sanitize links on link posts
* implement search
* implement post sorting
* possibly add an image uploader?
