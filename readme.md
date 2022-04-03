# iChat Web App

Full stack messenger app that allows users to add and chat with friends over a realtime socket connection. Build with React on the frontend and a NodeJS API serving the frontend.

### Built Using

> **Front-End Technologies**

- React Framework
- Socket-IO Web Client
  - Create private socket connections to chats for realtime client updates.
- Javascript
- HTML
  - From Validation
  - Consistent Semantic Elements
- SASS Styling
  - Media Query Breakpoints for responsive design

> **Backend Technologies**

- Node JS
- Express JS
  - RESTful API endpoints
  - Server-side Data Validation and Sanitation
- Socket-IO
  - Communicate with active socket connections to emit new messages signal.
- MongoDB + Mongoose

#### Directory Guide

```bash
# React frontend client source code
cd client

# NodeJS backend API source code
cd ..
cd api
```

#### To-Do's

> **Severe**

- When users send messages - preview isn't updating to show most recent message.
- Add a confirm password field in the create account form and validate it client side, and server side.
- Before adding a friend, make sure the friends isn't already added in the users friend array.
- Update method of storing JWT token client-side.
- Implement Socket connection for adding a new friend
- Return errors on sign in or sign up to indicate what failed.
- Data validation and sanitation for all user endpoints that send data in.
- Detect expired tokens - and log user off. Currently, user is stuck in a 403 forbidden and had no access to logging out.

> **Important**

- Change color theme for buttons on log in and sign up pages/forms.
- Add time stamps to messages to indicate when they were sent
