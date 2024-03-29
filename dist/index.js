import express from 'express';
import bodyParser from 'body-parser';
import { DATA } from './static.js';
// THE DATABASE STONKS
let data = [...DATA];
const PORT = process.env.PORT || 3000;
const app = express();
app.use(bodyParser.json());
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, PATCH');
    // res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});
app.get('/', async (req, res) => {
    res.send({ message: 'Hello World', data: data });
});
app.patch('/:id', async (req, res) => {
    const id = parseInt(req.params.id, 10); // Extract integer param
    const requestedItem = data.find((item) => item.id === id);
    const itemIndex = data.findIndex((item) => item.id === id);
    if (!requestedItem) {
        res.status(404).send('Item not found');
    }
    const { label, description } = await req.body;
    const newItem = {
        ...requestedItem,
        label: label || 'not provided',
        description: description || 'not provided',
    };
    data.splice(itemIndex, 1, newItem);
    res.send({
        message: 'Item updated',
        data: newItem,
    });
});
// reply with html
app.get('/hello', (req, res) => {
    const name = req.query.name || 'World';
    res.send(`<h1>Hello ${name}</h1>`);
});
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
//# sourceMappingURL=index.js.map