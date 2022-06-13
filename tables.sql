CREATE TABLE users (
    id serial PRIMARY KEY NOT NULL,
    name text NOT NULL,
    email text UNIQUE NOT NULL,
    password text NOT NULL
);

CREATE TABLE session (
    id serial PRIMARY KEY NOT NULL,
    "userId" integer REFERENCES users(id),
    token text NOT NULL UNIQUE
);