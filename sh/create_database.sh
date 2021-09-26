#!/bin/bash

set -eu
set -o pipefail

main() {
  createdb interview_db
  psql postgres -f db/create_role.sql
  psql interview_user -f db/create_tables.sql --dbname interview_db
}

main $@
