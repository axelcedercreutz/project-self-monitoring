CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(320) NOT NULL,
  password CHAR(60) NOT NULL
);

CREATE UNIQUE INDEX ON users((lower(email)));

CREATE TABLE morningreports (
  id SERIAL PRIMARY KEY,
  date DATE NOT NULL,
  sleepDuration FLOAT NOT NULL,
  sleepQuality INTEGER NOT NULL,
  mood INTEGER NOT NULL,
  user_id INTEGER REFERENCES users(id)
);

CREATE TABLE eveningreports (
  id SERIAL PRIMARY KEY,
  date DATE NOT NULL,
  exerciseTime FLOAT NOT NULL,
  studyTime FLOAT NOT NULL,
  qualityOfEating INTEGER NOT NULL,
  mood INTEGER NOT NULL,
  user_id INTEGER REFERENCES users(id)
);