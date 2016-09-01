# gaia-account-management-client

This app is built with AngularJS, using webpack to bundle the source code, and [NodeJS](https://nodejs.org) with [Express](https://expressjs.com) to serve the bundle.

## Setup for development
1. Install [NodeJS](https://nodejs.org), which includes the [npm](https://www.npmjs.com/) package manager.
2. Install project dependencies. These dependencies are specified in package.json, and will be installed at the project level:
3. Configure your environment
    1. Copy ./.env.default to ./.env and set up appropriate variables
    2. If you've not already done so, you *must* set up [Google API Credentials](https://console.developers.google.com/apis/credentials)
        - The CLIENT_ID provided by Google must go in .env
        - In Google's API config, you must add the domain/port of the client app as an Authorized JavaScript Origin
        - In Google's API config, you must determine a redirect uri based on the domain/port of the client app, and add this as an Authorized Redirect URI

## Notes for developers
- The client app is designed to be written with ES2015 using AngularJS 1.5+, compiled by webpack. [This page](http://angular-tips.com/blog/2015/06/using-angular-1-dot-x-with-es6-and-webpack/) does a really great job of outlining when to use (and not use) classes.
- Injection/annotation is handled by the ngAnnotatePlugin.

## Docker
- SEE A DOCKER-COMPOSE EXAMPLE IN gaia-account-management, of which gaia-account-management-client is included as a submodule
- ```docker-compose up``` will start three containers: db, server, and client
- after bringing up services, any combination of the following commands may be necessary (but, by default, the DB will be migrated to latest and seeded with production data)
- ```docker-compose run backend knex migrate:latest``` will migrate to the latest db
- ```docker-compose run backend knex seed:run``` will seed/re-seed the production environment with essential data. It will NOT delete data from the DB instance
- ```docker-compose run backend knex seed:run --env=reset``` will delete everything in the db
    
