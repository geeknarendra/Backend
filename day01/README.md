Redis Installation

For Linux

- Run the commands:
  > sudo apt-get install redis-server
  > sudo service redis-server restart
  > redis-cli

---

USAGE

- SET key value
- GET key
- ttl key
- KEYS \*
- DEL key
- FLUSHALL
- EXISTS key
- expire key time
- setex key time value

For Arrays

- LPUSH array value
- RPUSH array value
- LRANGE array start stop
- LPOP array
- RPOP array

For Sets

- SADD myset value
- SMEMBERS myset
- SREM myset value

For Object/Hash

- HSET key field value
- HGET key field
- HGETALL key
- HDEL key field
- HEXISTS key field

POSTGRES INSTALLATION

For linux
sudo -u postgres psql

psql (13.4 (Ubuntu 13.4-1.pgdg20.04+1))

```postgres=# CREATE USER username WITH PASSWORD 'password';
postgres=# CREATE DATABASE databasename;
postgres=# GRANT ALL PRIVILEGES ON DATABASE databasename TO username;
postgres=# GRANT SELECT PRIVILEGES ON DATABASE databasename TO username;
postgres=# GRANT INSERT PRIVILEGES ON DATABASE databasename TO username;
postgres=# GRANT DELETE PRIVILEGES ON DATABASE databasename TO username;
postgres=# GRANT UPDATE PRIVILEGES ON DATABASE databasename TO username;
postgres=# \c databasename [connect to database]

[AFTER CONNECTING TO DATABASE]

databasename=# CREATE TABLE tablename(
databasename(# ColumnName  DATATYPE NOT NULL,
databasename(# ColumnName  DATATYPE ,
databasename(# );
databasename=# \d [to display list of tables ]
databasename=# \d tablename [to display table properties]
databasename-# DROP TABLE tablename; [delete table]

postgres-# \l [all existing database can be seen]
postgres-# DROP DATABASE databasename; [delete database]
[first connect to different database then drop required database]
\q [to exit postgres]
```
