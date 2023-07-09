const express = require('express');
const app = express();
const dotenv = require('dotenv');
const basic_port = 3000;

//lib config
dotenv.config();

//sever functions
app.set('port', process.env.PORT || basic_port);

const cookieParser = require('cookie-parser');


const indexRouter = require('./routes/index.js');
app.use(express.json());
app.use(cookieParser());

app.use('/api', indexRouter);



app.listen(app.set('port'), () => {
  console.log(`${app.get('port')}`, '번 포트로 서버가 실행되었습니다.')
});