# Intro

Currently, I am using this project as practice to manage CI/CD pipelines using Github Actions.  Front-end is published with Github Pages, and back-end is deployed on a EC2 instance.  The back-end is sitting behind a Nginx reverse proxy server.

Notes regarding this pipeline can be found  here: https://github.com/robertshum/lighthouse-web-notes/tree/main/DevOps

Originally developed as part of the competition for IS21 FS Developer for BC Public Service.  Build a full stack application that allow users to manage and view paint stock, among other features as outlined in the user stories.  Separate the back and front end logic.

# Setup

Clone repo: ```git clone git@github.com:robertshum/a-paint-company.git```

# Startup

## Back-end API

1. Navigate into backend folder.
2. ```npm install```
3. ```run build```
4. ```npm start```

## Front-end

1. Navigate into frontend folder.
2. ```npm install```
3. rename 'sample.env' to '.env'.  You can use http://localhost for VITE_API_LOCATION.
4. ```npm run dev```
5. Follow the link to view the app.

```npm run build (to deploy to dist folder for manual output)```

# Demo

### Responsive Design
[![Responsive Design](https://img.youtube.com/vi/6rgAT5Wk3wE/0.jpg)](https://www.youtube.com/watch?v=6rgAT5Wk3wE)

### Front-end
[![Front-end](https://img.youtube.com/vi/u4WYHPqu0YI/0.jpg)](https://www.youtube.com/watch?v=u4WYHPqu0YI)

### Back-end
[![Back-end](https://img.youtube.com/vi/DMdnGnVf9Qo/0.jpg)](https://www.youtube.com/watch?v=DMdnGnVf9Qo)


### Input Validation
[![Back-end](https://github.com/robertshum/a-paint-company/blob/main/frontend/public/input_validation.png)]