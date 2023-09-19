<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>

## Description

This project is a RESTful API built with NestJS and MongoDB using Mongoose. It provides a flexible and scalable backend for managing resources, implementing user authentication, and handling CRUD operations on data. Additionally, it includes the capability to send emails via SMTP using the Nodemailer library.

## Features

- User registration and authentication with JWT
- CRUD operations for resource management
- MongoDB integration with Mongoose
- Modular and well-organized project structure
- API documentation for endpoints
- Email sending capability using the Nodemailer library for SMTP

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js and npm installed
- MongoDB running on your local machine or a remote server
- [Postman](https://www.postman.com/) or a similar tool for testing the API


## Installation

```bash
$ git clone https://github.com/your-username/your-project.git](https://github.com/taharoma/reqre-sample.git
$ npm install
```

## Running the app

Rename ``example.env`` to ``.env`` and insert your MongoDB Cluster URL and Mailer config To be able to store users data.

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```



## Stay in touch

If you have any questions or suggestions, feel free to contact us at taha.romany@gmail.com
