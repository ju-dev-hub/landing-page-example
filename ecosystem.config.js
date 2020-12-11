module.exports = {
    apps: [
        {
            name: 'MAPFRE_APP',
            script: 'npm run build && node server.js',
            trace: true
        }
    ]
};