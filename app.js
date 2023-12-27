const express = require('express');
const app = express();
const port = 3001;
const session = require('express-session');

let names = ['Mehmet', 'Tuncay', 'Burçin', 'Tuğçe', 'Gülali']; 

app.use(express.static('public'));


app.use(session({
    secret: 'raffle_secret',
    resave: false,
    saveUninitialized: true
}));


app.get('/raffle', (req, res) => {
    if (req.session.nameDrawn) {
        res.send(`You have already drawn a name: ${req.session.nameDrawn}`);
        return;
    }

    if (names.length === 0) {
        res.send("All names have been drawn.");
        return;
    }

    const index = Math.floor(Math.random() * names.length);
    const name = names.splice(index, 1)[0];
    req.session.nameDrawn = name;
    res.send(`Congratulations, ${name}!`);
});


app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.listen(port, () => {
    console.log(`Raffle app listening at http://localhost:${port}`);
});
