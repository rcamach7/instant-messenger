# Instant Messenger

Instant Messenger application that allows users to chat with friends over a real-time socket connection. Uses my custom [**social media api**](https://github.com/rcamach7/social-media-api) for the backend.

![project_demo](https://res.cloudinary.com/de2ymful4/image/upload/v1651963604/portfolio/project_demos/demo_do1qox.gif)

<div align="center">

[Visit Instant-Messenger](https://rcamach7.github.io/instant-messenger/#/instant-messenger)

</div>

## Key Features

- User UI built with React, styled with SCSS, and designed with a mobile first approach, making it responsive to all view ports.
- Real-time messaging established by creating web socket connections with my [**social media api**](https://github.com/rcamach7/social-media-api) server, enabling instant communication.
- Custom hooks created for user management, along with React's context API, useState hook, and useEffect hooks to build application functionality and features.
- User authentication and security implemented with JWT Tokens, which were also used to protect routes against un-authenticated users. Custom form validation and sanitation also implemented before processing requests.
- Uses my [**social media api**](https://github.com/rcamach7/social-media-api) for the backend to allow users to use my [**facebook clone**](https://github.com/rcamach7/social-media-api) with the exact same credentials, carrying over all user data, like friends, messages, and posts.

#### Built Using:

- react, socket-io-client, Context API, axios interceptors, uuid, react-router-dom, sass, font awesome icon's, useEffect, useState, ustom hooks, hash router, promise based functions, async/await, custom API, moment, and more...

#### How to install and run?

```bash
 git clone https://github.com/rcamach7/instant-messenger
 cd messenger
 npm install
 npm start
```

#### To-Do's

- Give ability for users to send images.
- Group chat times together if multiple messages were sent at the same time - only display sent time once.
