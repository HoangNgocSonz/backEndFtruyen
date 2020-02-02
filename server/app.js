const express = require('express');
const bodyParser = require('body-parser');
const mangaRouter = require('./api/modules/manga/manga.router');
const chapterRouter = require('./api/modules/chapter/chapter.router');
const userRouter = require('./api/modules/user/user.router');
const authRouter = require('./api/modules/auth/auth.router');
const mongoose = require('mongoose');
const config = require('./config');
const cors = require('cors')

mongoose.connect(config.mongoConnectionString);
const PORT = 6969;

const app = express();
// app.use((req, res, next)=>{
//   if(req.headers.origin){
//     res.setHeader("Access-Control-Allow-Origin",req.headers.origin);
//   }
//   req.setHeader("Access-Control-Allow-Origin",true);
//   next();
// });
app.use(cors());
app.use(bodyParser.json());
app.use('/', express.static('../client'));
app.use('/api/manga', mangaRouter);
app.use('/api/chapter', chapterRouter);
app.use('/api/user', userRouter);
app.use('/api/auth', authRouter);


app.listen(PORT, function() {
  console.log(`Server is listening on ${PORT}`);
});
