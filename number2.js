const express = require('express');
const app = express();
const port = 3000;
const axios = require('axios');
const apiKey = "7d60ad7e";
const apiBaseUrl = "https://www.omdbapi.com";
const hbs = require('hbs');

const myAxios = axios.create({
	baseURL: apiBaseUrl,
	headers: { 'Accept': 'application/json' }
});

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
			.catch(err => console.error(err.toJSON()));
		// res.json(response.data);
		if (response.data && response.data.Response === 'True') {
			data = response.data;
		} else {
			console.log(response.data);
		}
	}
	res.render('search.html', data);
});

app.get('/detail', async (req, res) => {
	let data = {};
	if (req.query.i) {
		const params = new URLSearchParams({ apikey: apiKey, i: req.query.i });
		const response = await myAxios.get('/', { params })
			.catch(err => console.error(err.toJSON()));

		if (response.data && response.data.Response === 'True') {
			data = response.data;
		} else {
			console.log(response.data);
		}
		console.log(response.data);
	}
	res.render('detail.html', data);
});

app.listen(port, () => {
	console.log(`Example app listening at http://localhost:${port}`)
});