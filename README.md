# PWA(Progressive Web App) developed using Angular 6.2 / Material 6.4 UI Integrated with Node.js RESTful API ( OAuth2 )

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 6.2.5.

# Warning

 This will work fine in your local but when your going for production you must need https to serve the app otherwise you will get an error message like this "error message if you don't have ssl installed:
"ERROR Error: "Uncaught (in promise): SecurityError: The operation is insecure.""
and the angular service worker won't work either.

## Installation

Run `git clone https://github.com/sirinibin/pwa-app-in-angular6-material6.git pwa`

Run `cd pwa`

Run `npm install`

Run `npm install -g http-server`

## Build

Run `ng build --prod`


## Serve the app

Run ` http-server -p 8081 -c-1 dist/pwa -P http://api.nodejs.mongodb.nintriva.net`



## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
