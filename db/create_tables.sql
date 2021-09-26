do $$
BEGIN
  CREATE TABLE logs (
      id serial PRIMARY KEY,
      method text NOT NULL,
      path text NOT NULL,
      timestamp timestamp NOT NULL DEFAULT NOW()
  );
END
$$
