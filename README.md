# E-commerce App

## Requirements

* MongoDB installed on your local machine or enter your cluster credentials in .env

* Node/npm

* Stripe account


## Install

* production

    ```npm install```

* dev

    ```npm run dev-install```

## Edit .env Variables

* open .env_sample with any text editor

    * ex with nano

        ```nano .env_sample```

* edit the file with your variables and change the name in .env

    * ex with nano

        CTRL+X => Y => delete _sample => ENTER => Y

```
# Mongo db connection

MONGO_USERNAME='username'
MONGO_PASSWORD='password'
MONGO_HOSTNAME='hostname'
MONGO_DB_NAME='db_name'

# Session / Cookie

SESSION_SECRET='secret'
SESSION_NAME='session_name'

# Stripe
STRIPE_API_KEY='stripe_api_key'

# Port
PORT='your_port'

# Admin email
ADMIN_EMAIL='admin@email.com'
```

## Scripts

* run only if .env variables are production ready

    ```npm start: run production```

* production test

    ```npm test-prod```

* only frontend (this is not working right now => TODO: missing API comunication/dummy data)

    ```npm run frontend```

* run only server (use it with insomnia/postman, TODO: give insomnia config)

    ```npm run server```

* run concurrently server and  frontend

    ```npm run dev```

* build react for production

    ```npm run build```

## Sign Up as Admin

* use the email you entered in .env to sign up with any password you want

# How to Contribute

TODO: give IDE config

## New Branch

* feature/feature-name - for update or create a feature

* docs/doc-name - for update docs

TODO: write API docs