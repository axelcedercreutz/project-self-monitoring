CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(320) NOT NULL,
  password CHAR(60) NOT NULL
);

CREATE UNIQUE INDEX ON users((lower(email)));

CREATE TABLE reports (
  id SERIAL PRIMARY KEY,
  date DATE NOT NULL,
  sleepDuration FLOAT,
  sleepQuality INTEGER,
  exerciseTime FLOAT,
  studyTime FLOAT,
  qualityOfEating INTEGER,
  morningMood INTEGER,
  eveningMood INTEGER,
  user_id INTEGER REFERENCES users(id)
);

CREATE INDEX ON reports(date);