# Devcycle Commmerce - Live Sale and Simulation

This is my submission to dev.to's Devcycle feature flag challenge

### Architecture

<img src="https://github.com/user-attachments/assets/b18b8435-7fb5-4517-befc-72e9b365628e" height="500" />

## Local Setup

### dashboard

The dashboard is stateless and hence everytime it is run or gets an error, it would need a new project to start with and create all features with default variations.

The reason for being stateless is, otherwise the dashboard would have to validate the state of devcycle data before it can proceeed which is very complex.

```
npm install
npm run dev
```

it will start at port `5174`

### website

the website requires a env variable of client sdk key from development environment. the project must already have all the configuration and features required.

Please note that if you want to run the dashboard in sync with the website locally, then first run the dashboard, note the project key and copy only that project's 'development' client sdk key into the .env file at `frontend/.env`.

```
npm install
npm run dev
```

it will start at port `5173`

### NOTE

Please report the bugs in the issues tab here.
Feel free to conrtibute or raise PRs.
