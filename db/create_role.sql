do $$
BEGIN
  CREATE ROLE interview_participant;
  CREATE USER interview_user;
  GRANT ALL PRIVILEGES ON DATABASE interview_db TO interview_participant;
  GRANT interview_participant TO interview_user;
END
$$
