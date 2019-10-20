const express = require("express");
const { convertToRomanNumber } = require("./utils/roman-convertor");

const app = express();
const port = process.env.PORT || "8000";

app.use(express.static('public'));
app.use(express.json());

app.post("/convertor", (req, res) => {
    const result = convertToRomanNumber(req.body.number);
    if (!result.success) {
        res.statusMessage = result.message;
        return res.status(400).send();
    }
    res.status(200).send({ romanNumber: result.romanNumber });
});

app.listen(port, () => {
    console.log(`Listening to requests on http://localhost:${port}`);
});
