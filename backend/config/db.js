const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASS,
    {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        dialect: "mysql",

        dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: true,
                ca: process.env.DB_SSL_CA
            }
        },

        logging: false
    }
);

sequelize.authenticate()
    .then(() => {
        console.log("Sequelize connected to MySQL");
    })
    .catch((err) => {
        console.log("Database connection error:", err);
    });

module.exports = sequelize;