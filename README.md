# heroku-redirect

A simple node.js app to redirect after migrating from Heroku to new host with subdomains setup. e.g. redirect myapp.herokuapp.com to myapp.mysite.com

Redirects controlled by environment variables.

```
REDIRECT_TARGET=https://mysite.com
REDIRECT_STATUS=301
```

## Steps

- `heroku login`

reconfigure app to use temporary redirects initially

```
heroku git:remote -a myapp
heroku buildpacks:set heroku/nodejs -a myapp
git push heroku main
heroku config:set REDIRECT_TARGET=https://myapp.mysite.com -a myapp
heroku config:set REDIRECT_STATUS=302 -a myapp
```

Test, and when it works set to permanent 301:

```
heroku config:set REDIRECT_STATUS=301 -a myapp
```



## Rename existing app for testing

```
heroku apps:rename testpages-pre-migration -a testpages
```

## Configure

Configure for initial temporary redirects

```
heroku config:set REDIRECT_TARGET=https://myapp.mysite.com -a myapp
heroku config:set REDIRECT_STATUS=302 -a myapp
```

## Deploy

Deploy to each environment individually

```
heroku git:remote -a myapp
git push heroku main
```

```
heroku git:remote -a myapp2
git push heroku main
```