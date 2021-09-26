# OBS Overlay

This will be my personal [twitch](https://www.twitch.tv/) stream overlay 
for [OBS Studio](https://github.com/obsproject/obs-studio), which can be included
into as a browser source.

## Execute

All mandatory environment variables should be defined first, either in your OS, Terminal session
or a `server/.env` file. You can lookup all available & used environment variables by
searching for `process.env` in `server/src`. 

You can then start the web application by executing...

```
docker-compose up --build -d
```

This will start the server and webapp on `http://localhost:8080`. 
You can then start browsing and look for the parts you may be interested in.

## Contribute

Feel free to contribute your ideas by pull requests or issues. You may use this code
& project in any fashion you like.