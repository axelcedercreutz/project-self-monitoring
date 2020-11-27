# project-self-monitoring
Project for Web Software Development project

A demo of the project can be found: --- ENTER URL HERE ---

The documented SQL Commands needed to create the database can be found in "Documentation/database.sql".

To add the credentials to your database, add a .env-file where you have specified your db-credentials.

In order to run the project locally, download the repo, go to the root-folder and run:

deno run --allow-env --allow-net --allow-read --allow-write --unstable app.js;

in order to run the tests locally, go to each folder of where the test is and run:

deno test --coverage --unstable {NAME_OF_THE_FILE_BEING_TESTED}.js