# TTFHW

## Database

To start code on databases you have to the database structure and what patch the databases are in so if you decide to modify the database you know which patch and version on the database we know

## Backend

```
 git clone https://github.com/kodmeron/crackend.git
 cd project
 npm i
```

## Frontend

```
 git clone https://github.com/kodmeron/NHiL.git
 cd project
 npm i
 npm start
```

## Testers

The testers needs to know what test-driven developement we use so that the testers know which documentain to watch and how to write the test cases before the software is fully developed

# ONBOARDING

### Prerequisites

> node
>
> Docker
>
> Heroku

### Build / Run

> npm install
>
> npm start
>
> node server.js

### Configuration

**Network Dependencies**

> MongoDB

**File Dependencies**
**Internal Behavior**
**Debug Parameters**

### Usage

Load image of app here

### GIT

**Git commit structure**

The commit type can include the following:

- feat
- fix
- docs
- style
- test
- revert
- chore

**Good**

> feat: improve performance with lazy load implementation for images
>
> chore: update npm dependency to latest version
>
> fix: bug preventing users from submitting the subscribe form
>
> update: incorrect client phone number within footer body per client request

**Bad**

> fixed bug on landing page
>
> Changed style
>
> oops
>
> I think I fixed it this time?
>
> _empty commit messages_

### Directory Structure

```javascript
���src
 ┣ ���App.css
  ┣ ���App.js
   ┣ ���index.css
    ┗ ���index.js
```

# SCRIPT

## Database

## Backend

Fetch Docker container:

```
$ docker pull kodmeron/crackend
```

To list your Docker containers:

```
$ docker images
```

Run the container:

```
$ docker run --rm -p 8080:3000 kodmeron/crackend
```

Ctrl + c to quit.

## Frontend

Clone the NHiL github repo:

```
$ git clone https://github.com/kodmeron/NHiL.git
```

cd into the project and write:

```
$ npm install
```

In order to start the project, write:

```
$ npm start
```

# TEST

## Jasmine

If Jasmine for some reason isn't installed:

> npm install --save jasmine

look if it is installed correctly

> npm test init

Run the tests!!

> npm test

# TEST API

Install jest and supertest:

> npm install jest

> npm install supertest

Check if it is intalled correctly by looking inside the package.json file

This is what you should see:

```json
{
  "name": "edu-api-testing",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "start": "jest --verbose",
    "test": "jest"
  }
}
```

Make a folder called \_\_tests\_\_ and make a file called supertest.js in the folder

```
> mkdir __tests__

> cd __tests__

> touch supertest.js

```

## supertest.js

```js
const request = require("supertest");

const HOST = process.env.HOST || "https://petstore.swagger.io";

afterAll(async () => {
  await new Promise((resolve) => setTimeout(() => resolve(), 500)); // avoid jest open handle error
});

describe("When testing jest", () => {
  describe("given i have a non failing test", () => {
    it("should be one", () => {
      expect(1).toBe(1);
    });
  });
```

This code tests the petstore API:

```js
describe("Testing petshop", () => {
  describe("given a broken url", () => {
    it("should return status 404", () => {
      const container = request(HOST);
      container.get("/whatever").expect(404);
    });
  });
});
```
