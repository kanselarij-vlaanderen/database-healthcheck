##### ENVIRONMENT VARIABLES

* MAIL_JET_API_KEY: Mailjet API key
* MAIL_JET_API_SECRET: Mailjet API secret
* INTERVAL: interval of the health check in ms (default: 5 min)
* RECIPIENTS: Comma separated list of mail recipients
* ENV_NAME: The name of the environment. Will be used to give context to the user

##### EXAMPLE DOCKER-COMPOSE

``` 
database-healthcheck:
    image: kanselarij/database-healthcheck
    environment:
      MAIL_JET_API_KEY: "key"
      MAIL_JET_API_SECRET: "secret"
      RECIPIENTS: "john.doe@mail.com, jane.doe@mail.com"
      ENV_NAME: "Test"
```

