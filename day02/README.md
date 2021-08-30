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

```postgres=# CREATE SCHEMA schemaname;
postgres=# CREATE TABLE schemaname.tablename;[create table within schema]
DROP SCHEMA schemaname CASCADE; [to drop objects of schema and delete schema]
postgres=# INSERT INTO TABLENAME(COLUMNNAME1,COLUMNNAME2) VALUES ('1','2')[row1 data], ('3','4')[row2 data];[give values according to datatype][by default value NULL]
<!--YOU CAN SET ANY ONE COLUMN AS PRIMARY KEY, IT ACTS AS AN IDENTIFIER FOR A ROW -->
postgres=# SELECT * FROM TABLENAME;[to see data in table]
postgres=# SELECT (30*2) AS colname;[to get the calculated value under colname]
postgres=# SELECT COUNT(*) AS "colname" FROM TABLENAME;[to see how many records we have in a table]
postgres=# SELECT COUNT(queryname) AS "colname" FROM TABLENAME;[to see how many records we have of a particular query]
postgres=# SELECT CURRENT_TIMESTAMP;[to see current time]
postgres=# SELECT * FROM TABLENAME WHERE (CONDITION);[to see all data which satisfies the condition ] [AND, OR can be used]
postgres=# SELECT * FROM TABLENAME WHERE colname BETWEEN START AND END;[to see all data which satisfies the given range] [NOT can be used to exclude the specified range]
postgres=# SELECT * FROM TABLENAME WHERE colname IN(START,END);[to see all data which satisfies the given range] [last one is included] [NOT can be used to exclude the specified range]
postgres=# SELECT * FROM TABLENAME WHERE colname LIKE 'firstLetter%';[first character should be same,% for others can be anything]
postgres=# SELECT * FROM TABLENAME WHERE colname LIKE 'firstLetter__otherLetters';
[__ for second & third letter can be anything,rest should be same as specified in condition]
postgres=# SELECT * FROM TABLENAME WHERE colname::newDatatype;[:: to typecast]
postgres=# UPDATE TABLENAME SET colname = value WHERE CONDITION;[ to update value]
postgres=# DELETE FROM TABLENAME WHERE CONDITION;[ to delete a row]
<!--YOU CAN CONNECT TABLES USING PRIMARY KEY -->
<!--FOREIGN KEY IS THAT DATA IN A TABLE WHICH CONNECTS TWO TABLES AND IT SHOULD EXIST IN BOTH TABLES-->
[while creating tables you can write GENERATED ALWAYS AS IDENTITY which will give data automatically if you don't provide data according to the sequence no. going on]
<!--  to connect tables [follow these steps inside create table] -->
postgres=# CONSTRAINT name[name not necessary, postgres can give any name if you don't]
postgres=# FOREIGN KEY (colname which is in both table); [we have here given the constrains]
postgres=# REFERENCES TABLENAME(the colname which has been set as foreign key); [specify the tablename to which you want to connect]
postgres=# ON DELETE CASCADE;[if the foreign key value row is not present in the 1st table then delete the row with that foreign key value from this table also] [only keep the rows which is in both table]
```
