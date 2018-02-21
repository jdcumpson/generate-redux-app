# generate-redux-app
Some boilerplate code I don't want to write over and over.

## Use to generate your own react-redux project
This project allows for default use of:
  - react
  - redux
  - react-router
  - less
  - css
  - redux-logger
  - redux-thunk
 
## TODO
- Add support for built-in http server instead of nginx
- Add examples of how to use material-ui-next (for CSS-in-JS)
- Add examples of SASS/Less interop
- Add examples of how to extend in 5 minutes

## What do?

Get the source, it's not on npm yet
```bash
git clone git@github.com:jdcumpson/generate-redux-app.git
cd generate-redux-app
```

Install the deps, uses `babel-node` because ES6
```bash
yarn install
```

Generate an application in your directory of choice
```bash
yarn new ../my-project
cd ../my-project
```

Install your new apps deps
```bash
yarn install
```

Run your new application in dev mode
```bash
yarn dev
```

Now copy your nginx configuration to an `http { ... }` server directive of your choice.
Use nginx - it's closer to prod, and makes you consider build steps. Also no promise
on when the built-in HTTP server will be added.
