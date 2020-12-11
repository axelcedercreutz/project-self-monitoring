# project-self-monitoring
Project for Web Software Development -course at Aalto University (nov - dec 2020).

A demo of the project can be found: [DEMO](https://wsd-self-monitoring.herokuapp.com/)

The documented SQL Commands needed to create the database can be found in "Documentation/database.sql".

To add the credentials to your database, add a .env-file where you have specified your db-credentials.

The assigment was to create a simple application, where users can sign up and sign in to add their daily metrics.

NOTE! For the mood-average to be calculated correctly, the program expects there to be both a morning and evening mood -value entered.

The only changes to the assigment given is that there is no deletion of rows from the database since the database uses a unique index for the date of reports. Depending on which report-type (morning or evening) is added first for a specific date, the new row is added to the reports-table. If there already is a row for the specific date, the new report is used to update the existing row.

In order to run the project locally, download the repo, go to the root-folder and run:
```
deno run --allow-env --allow-net --allow-read --allow-write --unstable app.js;
```
The application will be running on http://localhost:7777/.

in order to run the tests locally, go to the root folder and run:
```
deno test --coverage --unstable --allow-env --allow-read --allow-net
```
Once the tests have run, press ctrl + c to exit.