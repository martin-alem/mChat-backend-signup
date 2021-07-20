/**
 * Manages database connection
 * @date 8/28/2021
 * @author Martin Alemajoh
 */

const mysql = require("mysql");

class MysqlDatabase {

    static connection = null;

    constructor(config) {

        if (MysqlDatabase.connection === null) {
            MysqlDatabase.connection = mysql.createConnection(config);
            MysqlDatabase.connection.connect(error => {
                if (error) {
                    // Logger.logError(error, fileURLToPath(import.meta.url), new Date());
                    throw new Error("Couldn't connect to database");
                }
                else {
                    // Logger.logInfo("Connection established", fileURLToPath(import.meta.url), new Date());
                }
            });
        }

        return MysqlDatabase.connection;
    }

}

module.exports = MysqlDatabase;