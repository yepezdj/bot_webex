const express = require('express');
const app = express();
app.listen(50001, () => console.log('Listening at 50001'));
app.use(express.static('public'));
app.use(express.json({ limit: '5mb' }));

app.post('/', (request,  response) => {
    console.log(request.body);
})