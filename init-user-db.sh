#!/bin/bash
set -e

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" <<-EOSQL
  CREATE USER user WITH ENCRYPTED PASSWORD 'password';
  CREATE DATABASE mydatabase;
  GRANT ALL PRIVILEGES ON DATABASE mydatabase TO user;
EOSQL
