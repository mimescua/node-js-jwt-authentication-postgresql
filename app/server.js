const express = require('express');
const cors = require('cors');

const app = express();

const corsOptions = {
    origin: process.env.CORS_ORIGIN || 'http://localhost:8081'
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const db = require('./models');
const Role = db.role;

const syncDatabase = async () => {
    try {
        await db.sequelize.sync({ force: true });
        console.log('Drop and Resync Database with { force: true }');
        initial();
    } catch (error) {
        console.error('Failed to sync database:', error);
    }
};

syncDatabase();

app.get('/', (req, res) => {
    res.json({ message: 'Welcome to the application.' });
});

require('./routes/auth.routes')(app);
require('./routes/user.routes')(app);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});

const initial = async () => {
    try {
        await Role.bulkCreate([
            { id: 1, name: 'user' },
            { id: 2, name: 'moderator' },
            { id: 3, name: 'admin' }
        ]);
        console.log('Initial roles created.');
    } catch (error) {
        console.error('Failed to create initial roles:', error);
    }
};
