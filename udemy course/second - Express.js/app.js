// const http = require('http');

const express = require('express'); // import za express.js
const bodyParser = require('body-parser');
// ovo inicijalizuje nov objekat expressa koji ima neku pozadinsku logiku i mogu da ga prosledim u http.createServer()
const app = express();

// body parser za express
// sve sto mi treba da nije direktno u expressu izgleda se dodaje u app.use()...
app.use(bodyParser.urlencoded({extended: false}));

// // koristim app.use() metodu da handlujem request respons i use() mora da bude deklarisan pre http.createServer(app)
// app.use((req, res, next) => {
//     // next se koristi da bi uradio neku logiku ovde i onda presao na sledeci app.use()
//     next(); 
//     // bez next() bi stao na ovom app.use() i krece se od gore na dole kroz kod
// });


// app.use() kao parametar prima i url path
app.use('/add-product', (req, res, next) => {
    res.send('<form action="/product" method="POST"><input type="text" name="title"><button type="submit">Add product</button></form>')
});

app.use('/product', (req, res) => {
    console.log(req.body);
    res.redirect('/');
})

// slash path mora zadnji da se deklarise jer se express.js kompajlira od gore na dole
app.use('/', (req, res, next) => {
    console.log('second midlewere')
    res.send('<h1>Hello from express.js</h1>')
});

// ako koristim express.js umesto server i server.listen() mogu da koristim app.listen()
app.listen(3000);

// // server se kreira i prima funkciju koja ima request respons
// // request je ono sto dolazi sa browsera i ima mnooogo podataka izmedju ostalog, klasican http protokol
// // respons salje podatke nazad

// const server = http.createServer(app);

// // server listen pali event loop koji osluskuje req res na odredjenom url-u

// server.listen(3000);