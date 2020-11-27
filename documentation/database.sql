CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(320) NOT NULL,
  password CHAR(60) NOT NULL
);

CREATE UNIQUE INDEX ON users((lower(email)));

CREATE TABLE morningReports (
  id SERIAL PRIMARY KEY,
  date TEXT NOT NULL,
  sleepDuration FLOAT NOT NULL,
  sleepQuality INTEGER NOT NULL,
  mood INTEGER NOT NULL,
  user_id INTEGER REFERENCES users(id)
);