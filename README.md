## Running Application Locally with docker compose.

1. Add a `.env` file at the root of api folder.
```env
GOOGLE_CLIENT_ID=<google_client_id>
GOOGLE_SECRET=<google_secret>
```

2. run `make run-local` at the root directory of this project.

3. once the containers are up and running. run `make local-db-migrate`

4. Access the applications at:
    - App: `localhost:3000`
    - Api: `localhost:4000`
    - DB: `localhost:4566`
