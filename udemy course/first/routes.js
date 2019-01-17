const fs = require('fs');

const requestHandeler = (req, res) => {
    const url = req.url;
    const method = req.method;
    if (url === '/') {
        res.write(`
            <html>
                <head>
                    <title>Enter message</title>
                </head>
                <body>
                    <form action="/message" method="POST">
                        <input type="text" name="message">
                        <button type="submit">Submit</button>
                    </form>
                </body>
            </html>
        `)
        // res.end mora da se pozove na kraju res.write zato sto konekcija ostaje otvorena
        return res.end();
    }
    if (url === '/message' && method === 'POST') {
        const body = [];
        // req.on je metoda koja prima string koji predstavlja neki event u nodejs
        // ovde je to 'data' koji predstavlja strim podataka koji dolaze sa req
        req.on('data', (chunk) => {
            body.push(chunk);
        });
        // ovo je end event koji predstavlja kraj strima podataka
        return req.on('end', () => {
            const parseBody = Buffer.concat(body).toString();
            const message = parseBody.split('=')[1];
            // snyc jer blokira izvrsavanje dok se writeFile ne zavrsi
            // fs.writeFileSync('message.txt', message);
            fs.writeFile('message.txt', message, (err) => {
                // ovo je setovanje hedera klasicno tj dinamicno ispod je klasicno
                res.writeHead(302, {'Location': '/'})
                return res.end();
            });
        })
    }
    res.setHeader('Content-Type', 'text/html');
    res.write(`
            <html>
                <head>
                    <title>My nodejs server</title>
                </head>
                <body>
                   <div>Some text</div>
                </body>
            </html>
        `)
}

// ovako registrujem sve sto treba da bude exportovano
module.exports = requestHandeler;