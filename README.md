# Kakkop

Game and card scoring application, built with React, GraphQL and Django.

## Installation and Local Development

### Pre-requisites

1. Install Docker and Docker Compose, if you do not already have these applications
2. Create a Python virtual environment for local development purposes e.g. module definitions, linting, etc.
3. Download and install `nvm` and `npm` for local frontend development with React

### Running with Docker

Run `make run` in the root directory to spin up a local instance of Kakkop. This will build the Postgres, Django, and React Docker images, if necessary, and then spin up a self-contained application use Docker Compose.

You can access the frontend of the application on your local machine at `http://localhost:3000`.

To stop the current local instance of Kakkop, run `make stop` in the root directory.
