const express = require('express')
const crypto = require('crypto');

const app = express()
const port = 3000

function generateXApiAuth(uniquePartnerKey1) {
    // Generate the current epoch time
    const epochTime = Math.floor(Date.now() / 1000);
    console.log('Epoch Time:', epochTime);

    // Initialize the IV (Initialization Vector) with zeros (must be 16 bytes for aes-256-cbc)
    const iv = Buffer.alloc(16, 0);

    // Define your unique partner key (must be 32 bytes for aes-256-cbc)
    // const uniquePartnerKey = Buffer.from('your-unique-partner-key-32bytes-long'); // Replace with your actual key
    const uniquePartnerKey = crypto.randomBytes(32);

    // Create the cipher
    const cipher = crypto.createCipheriv('aes-256-cbc', uniquePartnerKey, iv);

    // Encrypt the epoch time
    let encrypted = cipher.update(epochTime.toString(), 'utf8', 'base64');
    encrypted += cipher.final('base64');

    // Output the encrypted string
    console.log('Encrypted Epoch Time:', encrypted);

    // Return the encrypted string
    return encrypted;
}

app.get('/', (req, res) => {
    console.log(generateXApiAuth())
    res.send(`${'Your hash key ' + generateXApiAuth()}`)
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})