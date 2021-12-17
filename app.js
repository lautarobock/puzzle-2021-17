const express = require('express')
const app = express()
const port = process.env.PORT || 3000;

app.use(express.json()) // for parsing application/json

function isValid(data) {
    const fields = ['width', 'height', 'length'];
    for (let field of fields) {
        if (data[field] <= 0 || data[field] > 10) {
            return `${field} dimention must be greater than 0 and lester or equal to 10`
        }
    }
    return undefined;
}

function calculate(data) {
    return 2.1 * (data.width * data.height) + 2.1 * (data.width * data.length) + 2.1 * (data.length * data.height)
}

function metersToFeet(meters) {
    return meters * 10.764;
}

app.post('/util/calculate_wrap', (req, res) => {
    console.log(req.body);
    const message = isValid(req.body);
    if (!message) {
        res.json({
            success: true,
            paper_required: Math.ceil(metersToFeet(calculate(req.body)))
        });
    } else {
        res.json({
            success: false,
            message
        });
    }
    
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
});