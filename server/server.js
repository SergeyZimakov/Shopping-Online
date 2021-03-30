const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const mongoose = require('mongoose');
const session = require('express-session');
const cookieParser = require('cookie-parser');

const app = express();

app.use(cors());
app.use(morgan('tiny'));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(session({
	secret: "somesecret",
	resave: true,
	saveUninitialized: true,
	cookie: {
		httpOnly: false,
		secure: false,
	},
}));

app.use('/api', require('./router'));
app.use(express.static('upload'));

const port = 8080;
mongoose.connect(
	'mongodb://localhost:27017/326839818',
	{ useNewUrlParser: true, useUnifiedTopology: true }
).then(() => app.listen(port, () => console.log(`Server is running on port ${port}`)))
	.catch(error => console.log(error));

app.get('/images/:name', (req, res) => {
	const { name } = req.params;
	const path = `${__dirname}/upload/${name}`;
	res.sendFile(path);
});