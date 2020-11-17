# JulmustRacet

[![Build Status](https://travis-ci.com/JohnPhoto/julmustracet.svg?branch=main)](https://travis-ci.com/JohnPhoto/julmustracet)
[![GitHub version](https://badge.fury.io/gh/johnphoto%2Fjulmustracet.svg)](https://badge.fury.io/gh/johnphoto%2Fjulmustracet)
![GitHub package.json dependency version (prod)](https://img.shields.io/github/package-json/dependency-version/johnphoto/julmustracet/next)
![GitHub package.json dependency version (prod)](https://img.shields.io/github/package-json/dependency-version/johnphoto/julmustracet/react)
[![GitHub issues](https://img.shields.io/github/issues/JohnPhoto/julmustracet)](https://github.com/JohnPhoto/julmustracet/issues)
[![GitHub license](https://img.shields.io/github/license/JohnPhoto/julmustracet)](https://github.com/JohnPhoto/julmustracet/blob/main/LICENSE)

This project is kickstarted from [with-next-auth](https://github.com/vercel/next.js/tree/canary/examples/with-next-auth).

## Get started

1. Clone this project.
2. `npm install`
3. `cp env.local.example .env.local` and fill out the blanks
4. `npm run dev`

## Prepare for production

## CouchDB

### Mac:

[https://docs.couchdb.org/en/stable/install/mac.html](https://docs.couchdb.org/en/stable/install/mac.html)

```
brew install couchdb
```

## Prod FreeBSD

- `$HOME/ws/julmustracet` - sourcecode etc

```bash
pkg update
pkg upgrade
pkg install nano curl wget git htop
nano ~/.cshrc # DO: setenv EDITOR vi -> setenv EDITOR /usr/local/bin/nano
pkg install node www/npm www/yarn # will give somewhat LTS

# Get Node to work in FreeBSD
pkg install graphics/vips # To get packages to work properly
pkg install couchdb3
# DO: Configure /usr/local/etc/couchdb3/local.ini based on couchdb.example.local.ini

mkdir -p /var/db/couchdb3/data
mkdir -p /var/db/couchdb3/views

chown -R couchd:couchdb /var/db/couchdb3/data
chown -R couchd:couchdb /var/db/couchdb3/views

sysrc couchdb3_enable=YES couchdb_enablelogs=YES couchdb_user=couchdb

service couchdb3 start
curl -X PUT http://admin:passwd@127.0.0.1:5984/_users
curl -X PUT http://admin:passwd@127.0.0.1:5984/_replicator
curl -X PUT http://admin:passwd@127.0.0.1:5984/_global_changes


npm i -g pm2

# enable pm2 to start up
pm2 startup

pm2 install pm2-logrotate

pm2 start ecosystem.config.js

pm2 save

```

### Tips

```bash
# MacOS
# generate random characters
LC_ALL=C tr -dc 'A-Za-z0-9' </dev/urandom | head -c 64 ; echo

# base64 encode without linefeed
echo -n 'input' | openssl base64
```

Couch DB install message

```
Message from couchdb3-3.1.0_1:

--
If this is the first time you are installing couchdb3, you will need
to add a default administrator, and initialise the database node.

If you are upgrading an existing couchdb3 installation < 2.0, you will
need to replicate your databases across with HTTP, and manually apply
any security objects and local.ini settings.

If you are upgrading from 2.0 and newer,  you can simply re-use the
existing database and views directory, amending your local.ini file
accordingly:

[couchdb]
uuid = ....
database_dir = /var/db/couchdb/data
view_index_dir = /var/db/couchdb/views

In both cases, make sure your javascript functions are compliant with
modern JS, as the SpiderMonkey 60 engine is more strict than its
predecessors used in older CouchDB versions.

For a single node setup, append an inital administrator username and
password to the [admins] section of your local.ini, and a [log] section:

[admins]
admin = passwd
[log]
# http://docs.couchdb.org/en/latest/config/logging.html
level = err
include_sasl = true
writer = syslog
syslog_host = localhost

Amend /usr/local/etc/couchdb3/vm.args as required, at least altering the cookie.

Then, start Apache CouchDB, and run the following commands once the
database is started for the first time, amending admin:passwd to match
your choice above to initialise the default databases:

sudo service couchdb3 start

curl -X PUT http://admin:passwd@127.0.0.1:5984/_users
curl -X PUT http://admin:passwd@127.0.0.1:5984/_replicator
curl -X PUT http://admin:passwd@127.0.0.1:5984/_global_changes

Then use the admin interface at http://127.0.0.1:5984/_utils/# as usual.

For more information see
http://docs.couchdb.org/en/latest/install/setup.html
```
