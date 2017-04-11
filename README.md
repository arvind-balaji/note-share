# Note-Share
## Description
Site with basic posting functionality. Has a password protected admin panel for deleting posts. Supports link and text posts. Data is stored onto a local database (using nedb).

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

Create a users.htpasswd and admin.htpasswd file and put them at the project root.

Server runs on port 3000 by default.
/admin goes to admin panel.

##  To-Do
* ~~possibly add an image uploader?~~ DONE! (comit 7f3c007)
* ~~sanitize links on link posts~~ DONE! (comit 2b46713)
* basic markdown processing for text posts
* direct link to posts - 'permalinks'
* implement search
* implement post sorting
