require("dotenv").config();

module.exports = {
    // database details
    database: {
        database: process.env.DB_NAME || 'salon',
        username: process.env.DB_USER || 'root',
        password: process.env.DB_PASSWORD || '',
        host: process.env.DB_HOST || 'localhost',
        dialect: process.env.DB_DIALECT || 'mysql',
        port: process.env.DB_PORT || '3306',
    },
    //  ssl Keys details 
    certificate: {
        privkey: process.env.PRIVKEY_PATH || 'path to priv key',
        fullchain: process.env.FULLCHAIN_PATH || 'path to fullchain key',
    },
    protocol: process.env.PROTOCOL || 'http',
    port: process.env.APP_PORT || 1000,
    app_base_url: process.env.APP_BASE_URL || 'http://localhost:8423',
    app_project_path: process.env.APP_PROJECT_PATH || 'http://localhost:1000',
    node_env: process.env.NODE_ENV || 'development',
    jwt: process.env.JWT,
    email:process.env.EMAIL,
    email_password:process.env.EMAIL_PASSWORD,
    stripe_secret_key: process.env.STRIPE_SECRET_KEY,
};


// <% var totalSum = parseInt(data[0].totalPrice) %>
// <% for (var i = 1; i < data.length; i++) { %>
// <% totalSum += parseInt(data[i].totalPrice) %>
// <% } %>