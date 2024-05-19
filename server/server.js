require('dotenv').config()
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const app = express();
const port = 8000;

require('./config/database.config');
app.use(cookieParser());
app.use(express.json());

app.use(
    cors({
        credentials: true,
        origin: ["http://localhost:3001"]
    })
)

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

const sessionRoutes = require('./routes/session.routes');
app.use("/api/session", sessionRoutes);
const userRoutes = require('./routes/user.routes');
app.use("/api/user", userRoutes);
const taskRoutes = require('./routes/task.routes');
app.use("/api/tasks", taskRoutes);

app.listen(port, () => console.log(`Listening on port: ${port}`));