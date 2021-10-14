const express = require('express');
const app = express();
const port = 3000;
const axios = require('axios');
const apiKey = "7d60ad7e";
const apiBaseUrl = "https://www.omdbapi.com";
const hbs = require('hbs');
const db = require('./db');

db.serialize(function() {
	db.run(`
		CREATE TABLE IF NOT EXISTS logs (
			id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
			key varchar(20) NOT NULL default '',
			url varchar(250)  NOT NULL default ''
		);
	`);
});

// db.close();

const myAxios = axios.create({
	baseURL: apiBaseUrl,
	headers: { 'Accept': 'application/json' }
});

myAxios.interceptors.request.use(req => {
	console.log('Starting Request', req);
	const fullUrl = req.baseURL + myAxios.getUri(req);

	const statement = db.prepare("INSERT INTO logs (key, url) VALUES(?, ?)");
	statement.run(apiKey, fullUrl);
	statement.finalize();

	return req;
})

hbs.registerHelper('ifCond', function (v1, operator, v2, options) {
	switch (operator) {
		case '==':
			return (v1 == v2) ? options.fn(this) : options.inverse(this);
		case '===':
			return (v1 === v2) ? options.fn(this) : options.inverse(this);
		case '!=':
			return (v1 != v2) ? options.fn(this) : options.inverse(this);
		case '!==':
			return (v1 !== v2) ? options.fn(this) : options.inverse(this);
		case '<':
			return (v1 < v2) ? options.fn(this) : options.inverse(this);
		case '<=':
			return (v1 <= v2) ? options.fn(this) : options.inverse(this);
		case '>':
			return (v1 > v2) ? options.fn(this) : options.inverse(this);
		case '>=':
			return (v1 >= v2) ? options.fn(this) : options.inverse(this);
		case '&&':
			return (v1 && v2) ? options.fn(this) : options.inverse(this);
		case '||':
			return (v1 || v2) ? options.fn(this) : options.inverse(this);
		default:
			return options.inverse(this);
	}
});

app.use(express.static('public'));
app.set('view engine', 'html');
app.engine('html', hbs.__express);

app.get('/', (req, res) => {
	res.send('Hello World!');
});

app.get('/search', async (req, res) => {
	let data = {};
	if (req.query.s) {
		const params = new URLSearchParams({ apikey: apiKey, ...req.query });
		const response = await myAxios.get('/', { params })
			.catch(err => console.error(err));
		// res.json(response.data);
		if (response && response.data && response.data.Response === 'True') {
			data = response.data;
		} else {
			console.log(response);
		}
	}
	res.render('search.html', data);
});

app.get('/detail', async (req, res) => {
	let data = {};
	if (req.query.i) {
		const params = new URLSearchParams({ apikey: apiKey, i: req.query.i });
		const response = await myAxios.get('/', { params })
			.catch(err => console.error(err));

		if (response && response.data && response.data.Response === 'True') {
			data = response.data;
		} else {
			console.log(response);
		}
		console.log(response.data);
	}
	res.render('detail.html', data);
});

app.get('/logs', async (req, res) => {
	db.all("SELECT * FROM logs ORDER BY id DESC LIMIT 20", function(err, rows) {
		let data = {};
		if (err) {
			data.error = err;
		} else {
			data.rows = rows;
		}
		res.render('log.html', data);
	});

});

app.listen(port, () => {
	console.log(`Example app listening at http://localhost:${port}`)
});