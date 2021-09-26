DROP DATABASE interview_db;
REVOKE interview_participant FROM interview_user;

DROP OWNED BY interview_participant;
DROP OWNED BY interview_user;
DROP ROLE interview_participant;
DROP USER interview_user;
