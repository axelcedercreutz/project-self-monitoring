# project-self-monitoring
Project for Web Software Development -course at Aalto University (nov - dec 2020)

A demo of the project can be found: [DEMO](https://wsd-self-monitoring.herokuapp.com/)

The documented SQL Commands needed to create the database can be found in "Documentation/database.sql".

To add the credentials to your database, add a .env-file where you have specified your db-credentials.

The only changes to the assigment given is that there is no deletion of rows from the database since the database uses a unique index for the date of reports. Depending on which report-type (morning or evening) is added first for a specific date, the new row is added to the reports-table. If there already is a row for the specific date, the new report is used to update the existing row.

In order to run the project locally, download the repo, go to the root-folder and run:
```
deno run --allow-env --allow-net --allow-read --allow-write --unstable app.js;
```
in order to run the tests locally, go to the root folder and run:
```
deno test --allow-env --allow-read --allow-net;
```
