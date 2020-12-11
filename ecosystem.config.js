module.exports = {
    apps: [
        {
            name: 'BATATA_APP',
            script: 'npm run build && node server.js',
            trace: true
        }
    ]
};