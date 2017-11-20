

## Community Admin Portal

This portal provides a platform to the super admin and individual community admins to create and manage the communities.

### Installing:

Put your mysql configuration settings - user, password, database and port in the 'routes/mysql.js' file.

Create the following table in your configured database:
```
create table communities(community varchar(25), username varchar(25), firstname varchar(25), lastname varchar(25), password varchar(25), isActive boolean, contact varchar(25), status int(1), isSuperAdmin int(1), purpose varchar(140), URL varchar(200));
```

Navigate to the project folder in CLI and execute the following commands:
```
npm install
npm start
```