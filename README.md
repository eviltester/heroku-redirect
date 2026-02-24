# heroku-redirect

Redirects controlled by environment variables.

```
REDIRECT_TARGET=https://example.com
REDIRECT_STATUS=301
```

## Rename existing app for testing

```
heroku apps:rename testpages-pre-migration -a testpages
```

## Configure

Configure for initial temporary redirects

```
heroku config:set REDIRECT_TARGET=https://testpages.eviltester.com -a testpages
heroku config:set REDIRECT_STATUS=302 -a testpages
```

## Deploy

Deploy to each environment individually

```
heroku git:remote -a testpages
git push heroku main
```

```
heroku git:remote -a oldapi
git push heroku main
```