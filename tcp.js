const express = require('express');
const app = express();
app.listen(50001, () => console.log('Listening at 50001'));
app.use(express.static('public'));


app.post('/', (request,  response) => {
    console.log(request.body);
})