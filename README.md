# project-self-monitoring
Project for Web Software Development -course at Aalto University (nov - dec 2020)

A demo of the project can be found: [DEMO](https://wsd-self-monitoring.herokuapp.com/)

The documented SQL Commands needed to create the database can be found in "Documentation/database.sql".

To add the credentials to your database, add a .env-file where you have specified your db-credentials.

In order to run the project locally, download the repo, go to the root-folder and run:
```
deno run --allow-env --allow-net --allow-read --allow-write --unstable app.js;
```
in order to run the tests locally, go to the root folder and run:
```
deno test --allow-env --allow-read --allow-net;
```
