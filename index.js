const http = require('http');
const app = require('./app');
const {port} = require('./config/keys');
const {authRouter }= require('./rotues')

// create server
const server = http.createServer(app);

//routes
app.use('/api/v1/auth',authRouter);

// start server
server.listen(port, () => console.log(`Server running on port ${port}`));