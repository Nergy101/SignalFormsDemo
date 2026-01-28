# SignalFormsDemo

This project demonstrates Angular Signal Forms with async HTTP validation using a real API server.

## Quick Start

### Run Everything Together (Recommended)

Start both the API server and Angular app:

```bash
npm run dev
```

This will:
- Start the API server on `http://localhost:3001`
- Start the Angular dev server on `http://localhost:4200`
- Open `http://localhost:4200` in your browser

### Run Separately

**Terminal 1 - Start API Server:**
```bash
npm run server
```

**Terminal 2 - Start Angular App:**
```bash
npm start
```

## Features

- ✅ Real HTTP validation using Angular HttpClient
- ✅ Async validation with pending state
- ✅ Spinner animation during validation
- ✅ Express.js API server for name validation
- ✅ Signal-based reactive forms

## API Server

The project includes a simple Express.js API server (`server.js`) that validates names. See [API_SERVER.md](./API_SERVER.md) for details.

## Development server

To start just the Angular development server:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

**Note:** The Angular app requires the API server to be running for validation to work.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
