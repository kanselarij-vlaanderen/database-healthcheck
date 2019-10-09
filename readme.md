##### ENVIRONMENT VARIABLES

* MAIL_JET_API_KEY: Mailjet API key
* MAIL_JET_API_SECRET: Mailjet API secret
* INTERVAL: interval of the health check in ms (default: 5 min)
* SENDER: email address of the sender (must be authorized in mailjet)
* RECIPIENTS: Comma separated list of email recipients
* ENV_NAME: The name of the environment. Will be used to give context to the recipients

##### EXAMPLE DOCKER-COMPOSE

``` 
database-healthcheck:
    image: kanselarij/database-healthcheck
    restart: always
    depends_on:
      - database
    environment:
      ENV_NAME: "Test"
      SENDER: "john.doe@mail.com"
      RECIPIENTS: "john.doe@mail.com, jane.doe@mail.com"
      MAIL_JET_API_KEY: "key"
      MAIL_JET_API_SECRET: "secret"
```

