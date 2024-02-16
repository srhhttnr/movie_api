const express = require('express'),
    morgan = require('morgan');

const app = express();

//morgan middleware
app.use(morgan('common'));

//movie data
let topMovies = [
    {
        title: 'Everything, Everywhere, All At Once',
        director: 'Daniel Kwan, Daniel Scheinert'
    },
    {
        title: 'CODA',
        director: 'Sian Heder'
    },
    {
        title: 'Nomadland',
        director: 'Frances McDormand, Peter Spears, Mollye Asher, Dan Janvey, Chloé Zhao'
    },
    {
        title: 'Parasite',
        director: 'Kwak Sin-ae, Bong Joon-ho'
    },
    {
        title: 'Green Book',
        director: 'Jim Burke, Charles B. Wessler, Brian Currie, Peter Farrelly, Nick Vallelonga'
    },
    {
        title: 'The Shape of Water',
        director: 'Guillermo del Toro, J. Miles Dale'
    },
    {
        title: 'Moonlight',
        director: 'Adele Romanski, Dede Gardner, Jeremy Kleiner'
    },
    {
        title: 'Spotlight',
        director: 'Blye Pagon Faust, Steve Golin, Nicole Rocklin, Michael Sugar'
    },
    {
        title: 'Birdman or (The Unexpected Virtue of Ignorance)',
        director: 'Alejandro G. Iñárritu, John Lesher, James W. Skotchdopole'
    },
    {
        title: '12 Years A Slave',
        director: 'Brad Pitt, Dede Gardner, Jeremy Kleiner, Steve McQueen, Anthony Katagas'
    }
];

//welcome GET route
app.get('/', (req, res) => {
    res.send('Welcome to myFlix API!');
});

//movie data GET route
app.get('/movies', (req, res) => {
    res.json(topMovies);
});

//express.static
app.use('/documentation', express.static('public'));

//error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Oops, something is broken.');
});

app.listen(8080, () => {
    console.log('Your app is listening on Port 8080.');
});