# App: Calm comments
## Description
A basic commenting system with a twist. All new and updated posts are sequestered for up to 5 minutes. After 5 minutes is up, posts are broadcasted through socket.io to all connected clients. 

## Why?
People are different. Some need time to think and consider but some chat rooms can be too busy for them. By sequestering all posts, users get a chance to consider their post. 

## Future directions
* The sequester time (5 minutes) is hard coded. Should be configurable.
* Other rooms
* Indication of those posts that are new and updated.
* Some limits on scroll

## Features
* React(ES6) & Redux based SPA application
* Markdown for editing
* Express on node backend
* Socket.io for outbound from server updates
* Postgres database for accounts and posts
* Sequelize for Postgres models
* Salted bcrypt and peppered AES256 encrypted passwords
* Passportjs authentication middleware
* Redis for session storage
* Material-UI use for some UI, custom fields for others
* Production configuration for webpack to reduce build sizes
* chai & mocha based tests


## Screen shots
*Main Page*

![Main Page](https://github.com/mdfw/calmcomments/blob/master/readme/calmCommentsScreenshot.png "Main Page")

*Phone*

![Phone](https://github.com/mdfw/calmcomments/blob/master/readme/calmCommentsOnPhone.png "On Phone")

## Acknowledgements
* Uses a personally modified version of Loading Wheel by Guilhem from the Noun Project under CC BY 3.0 US

Copyright 2017 Mark Williams