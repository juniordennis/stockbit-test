const sqlite3 = require('sqlite3').verbose();
// const db = new sqlite3.Database(':memory:');
const db = new sqlite3.Database('./db/local.db', (err) => {
	if (err) {
		console.error(err.message);
	} else {
		console.log('Connected to the local database.');
	}
});

module.exports = db;