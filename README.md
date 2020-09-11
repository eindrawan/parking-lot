# PARKING LOT - BACKEND SAMPLE

This is a sample of parking lot api, which covers feature below:

- Park a car
- Unpark a car by giving parking slot number
- Get info of parked car by using slot or car number
- limit the request by IP address 10 request/ 10 seconds
  (for this feature I actually prefer to do it on nginx or server config)

### Libraries

This backend using some common libraries as below:

- [Express](https://www.npmjs.com/package/express) - This is required for creating backend server
- [BodyParser](https://www.npmjs.com/package/body-parser) - configure express for take json as input
- [DotEnv](https://www.npmjs.com/package/dotenv) - for configure env variables
- [Mocha+Chai](https://www.npmjs.com/package/mocha) - for testing purpose.
- [Axios](https://www.npmjs.com/package/axios) - used in testing, for calling the backend API

### Running the server

This module requires [Node.js](https://nodejs.org/) v4+ to run.
Install the dependencies and devDependencies and start the server.
the server will run on port 8001 by default

```sh
$ cd test-nasdaily
$ npm install
$ node app.js
```

For running the test case
(for this sample, some test case will fail if the limiter is being used)

```sh
$ npm run test
```

### Consume the API

| 1.     | Park a Car                                              |
| ------ | ------------------------------------------------------- |
| Method | POST                                                    |
| Url    | /parking-lot/park                                       |
| Data   | { carNumber: <string> }                                 |
|        | carNumber can be any string, and cannot contained space |

| 2.     | Unpark a Car                                                     |
| ------ | ---------------------------------------------------------------- |
| Method | POST                                                             |
| Url    | /parking-lot/unpark                                              |
| Data   | { slot: <number> }                                               |
|        | slot is any positive number less than the maximum available slot |

| 3.     | Get info of slot/parked car          |
| ------ | ------------------------------------ |
| Method | GET                                  |
| Url    | /parking-lot/info/<string or number> |
|        | can be either slot or car number     |

### About Me

Im a loyal, hardworker person,
(even I'm writing this in the middle of the night :)
and Im quite creative and problem solver too,
I love to surprise people with my idea,
as individual, im a humble and love to help people as much as I can
