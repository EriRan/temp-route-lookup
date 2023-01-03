<div align="center">
  <h1>Route Lookup</h1>
</div>

[![Netlify Status](https://api.netlify.com/api/v1/badges/f81dae2a-f3d2-46eb-b1d7-69071ee19a4c/deploy-status)](https://app.netlify.com/sites/route-lookup/deploys)

# Introduction

This project is a webapp that was originally created for Solidabis' code challenge of April 2020. Their code challenges can be found from here: https://koodihaaste.solidabis.com/. Goal of the challenge was to create a route search web application where the user could select two stops and receive the fastest possible route between them using the available bus lines. I've continued the application even after the challenge with various improvements. If you want to see how the code was at the time of the submission, check one of the tags.

This app is running live here: https://route-lookup.netlify.app/

### Description

This application uses the provided route data json to first render the bus stops and the roads between them. JSON data is not used as it is but is mapped to a more easily handleable format with mapper classes. Bus stops are rendered in a crawling style: we first start from one of the stops and then render the neighbouring stops and their neighbours and so on. Neighbours are placed in one of the eight available directions and the duration between the stops affects the lenght of the road when possible. Route calculation between the stops is done using adapted [Dijkstra's algorithm](https://en.wikipedia.org/wiki/Dijkstra%27s_algorithm) which takes into account which bus line should be used between the roads as well.

### Technologies used

- React and React-Redux
  - Core of the application
- Typescript
  - Adds typing to Javascript and makes it easier to write bug free code
- Webpack
  - Compresses the codebase into a smaller space and transpiles them to run on older browsers
- Jest
  - Testing
- Material UI
  - User Interface components
- Lodash
  - General purpose conditions

### How to run

#### Requirements

1. <a href="https://docs.npmjs.com/downloading-and-installing-node-js-and-npm">NPM</a>
3. Node 16
2. ~500 mb storage space
3. For running tests you need to have Jest installed globally. Do this with `npm install -g jest`

#### Running the application

1. Download or git clone this repository
2. Open your preferred command line at the extracted folder
3. Type `npm ci`
4. After installation is complete, type `npm start`
5. Browser window should now open with the application

### All commands

- npm test
  - Run tests to ensure the application is working correctly. All of the tests should pass.
- npm run build
  - Create a production bundle to /dist folder
- npm start
  - Run the app in a local webpack server. The default address is http://localhost:8080/