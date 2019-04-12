require('dotenv').config();

const server = require('./api/server.js');

const port = process.env.PORT || 3388;
server.listen(port, () => console.log(`\n\n--- I GOT ${port} PROBLEMS BUT A SERVER AIN'T 1 ---\n`));
