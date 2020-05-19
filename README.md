# OhdmFrontend

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.3.17.

## Deploy on Github Pages

To deploy the app on Github, it use https://github.com/angular-schule/angular-cli-ghpages

Custom Domain:

```
$ ng deploy --cname=ohdm.net
```

To point your domain to github pages, you have to set the `CNAME` entry of your
domain to `username.github.io`. Don't forget to change `username` with your
Github username, on which the site should be hosted!

Without custom domain:

```
$ ng deploy --base-href=/ohdm-angular-frontend/
```

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

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
