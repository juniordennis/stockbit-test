const express = require('express');
const app = express();
const port = 3000;
const axios = require('axios');
const apiKey = "7d60ad7e";
const apiBaseUrl = "https://www.omdbapi.com";

const myAxios = axios.create({
	baseURL: apiBaseUrl,
	headers: { 'Accept': 'application/json' }
});

app.get('/', (req, res) => {
	res.send('Hello World!');
});

app.get('/search', async (req, res) => {
	const params = new URLSearchParams({ apikey: apiKey, ...req.query });
	const response = await myAxios.get('/', { params })
		.catch(err => console.error(err.toJSON()));

	res.json(response.data);
});

app.listen(port, () => {
	console.log(`Example app listening at http://localhost:${port}`)
});