const express = require('express');
const app = express();
const port = process.env.port || 3000;
app.listen(port);

app.use(express.static(__dirname + '/public'));

app.set('views', './views');
app.set('view engine', 'ejs');

const axios = require('axios');
const { parse } = require('node-html-parser');

(async () => {
    const page = await axios.get('https://www.worldometers.info/coronavirus/country/us/');
    const html = page.data;
    const dom = parse(html);
    const covidCaseCounter = dom.querySelector('.maincounter-number').text;
    console.log(covidCaseCounter);

    app.get('', (req, res) => {
        res.render('index', { text: 'Total COVID-19 Cases: ' + covidCaseCounter});
    });

    app.get('/tips', (req, res) => {
        res.render('tips');
    });
})();
