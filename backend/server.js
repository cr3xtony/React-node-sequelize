const express = require('express');
const sequelize = require('./database');
const User = require('./models/User');

sequelize.sync({ force: true }).then(() => console.log('db is ready'));

const app = express();

app.use(express.json());

app.post('/users/register', async (req, res) => {
    await User.create(req.body);
    res.send('success');
});

app.post('/users/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ where: { email: email } });
        if (user.password === password) {
            res.send(user);
        } else {
            res.status(400).json({ message: 'email or password incorrect' });
        }
    } catch (error) {
        res.status(400).json({ message: 'user not found' });
    }
});

app.listen(5000, () => {
    console.log('server is running');
});
