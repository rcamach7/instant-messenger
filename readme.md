# Instant Messenger

Instant Messenger application that allows users to chat with friends over a real-time socket connection. Uses my custom [**social media api**](https://github.com/rcamach7/social-media-api) for the backend.

<div align="center">

[Visit Instant-Messenger](https://rcamach7.github.io/instant-messenger/#/instant-messenger)

</div>

![project_demo](https://res.cloudinary.com/de2ymful4/image/upload/v1651963604/portfolio/project_demos/demo_do1qox.gif)

## Key Features

- Real-time messaging established by creating web socket connections with my [**social media api**](https://github.com/rcamach7/social-media-api) server, enabling instant communication.
- UI built with React, styled with SCSS, and designed with a mobile first approach, making it responsive to all view ports.
- Custom hooks created for user management, along with React's context API, useState hook, and useEffect hooks to build application functionality and features.
- User authentication and security implemented with JWT Tokens, which were also used to protect routes against un-authenticated users. Custom form validation and sanitation also implemented before processing requests.
- Uses my [**social media api**](https://github.com/rcamach7/social-media-api) for the backend allowing users to use my [**facebook clone**](https://github.com/rcamach7/social-media-api) with the exact same credentials, carrying over all user data.

#### Built Using:

<p align="center">
  <img src="https://res.cloudinary.com/de2ymful4/image/upload/v1648514838/main-portfolio/animated-logos/react-anim_jqtsxo.gif" width="40" height="40" alt="React" />
  <img src="https://res.cloudinary.com/de2ymful4/image/upload/v1655159498/main-portfolio/tech-skills/socketio_jkkj1u.png" width="40" height="40" alt="SOCKET_IO" />
  <img src="https://res.cloudinary.com/de2ymful4/image/upload/v1648514837/main-portfolio/animated-logos/js-anim_pxxk0j.gif" width="40" height="40" alt="Javascript" />
  <img src="https://res.cloudinary.com/de2ymful4/image/upload/v1648515099/main-portfolio/animated-logos/sass-animated_lhind3.gif" width="30" height="35" alt="SASS" />
</p>

react, socket-io-client, Context API, axios interceptors, uuid, react-router-dom, sass, font awesome icon's, useEffect, useState, custom hooks, hash router, promise based functions, async/await, custom API, moment, and more...

#### How to install and run?

```bash
  # Clone this repository
  git clone https://github.com/rcamach7/instant-messenger
  cd messenger
  npm install
  npm run use-local-server

  # Clone my social media api and follow the instructions to run it
  git clone https://github.com/rcamach7/social-media-api
  cd social-media-api
```