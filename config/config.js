const dotenv = require('dotenv').config();

module.exports = {
    build_version: process.env.build_version,
    build_date: process.env.build_date,
    globalPrefix: process.env.global_prefix,
    token: process.env.token,
    mysql_host: process.env.mysql_host,
    mysql_user: process.env.mysql_user,
    mysql_password: process.env.mysql_password,
    mysql_database: process.env.mysql_database
}