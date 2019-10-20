const express = require("express");
const { convertToRomanNumber } = require("./utils/roman-convertor");

const app = express();
const port = process.env.PORT || "8000";
let sseResponseStream;

app.use(express.static('public'));
app.use(express.json());

app.post("/convertor", (req, res) => {
    if (!sseResponseStream) {
        return res.status(500).send("No response canal found");
    }
    res.status(200).send();
    const result = convertToRomanNumber(req.body.number);
    if (!result.success) {
        sseResponseStream.write(`data: { "error": "${result.message}" }\n\n`);
    } else {
        sseResponseStream.write(`data: { "romanNumber": "${result.romanNumber}" }\n\n`);
    }
});

app.get('/event-stream', (req, res) => {
    // SSE Setup
    res.writeHead(200, {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive'
    });
    res.write('\n');
    sseResponseStream = res;
    req.on('close', function () {
        console.log("connexion closed");
    })
});

app.listen(port, () => {
    console.log(`Listening to requests on http://localhost:${port}`);
});
