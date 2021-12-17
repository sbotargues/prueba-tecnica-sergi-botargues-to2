var express     = require('express');
var mongoose    = require('mongoose');
var multer      = require('multer');
var path        = require('path');
var csvModel    = require('./models/csv');
var csv         = require('csvtojson');
var bodyParser  = require('body-parser');

var storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'./public/uploads');
    },
    filename:(req,file,cb)=>{
        cb(null,file.originalname);
    }
});

var uploads = multer({storage:storage});

//connect to db
mongoose.connect('mongodb://mongo:27017/docker-node-mongo',{useNewUrlParser:true})
.then(()=>console.log('connected to db'))
.catch((err)=>console.log(err))

//init app
var app = express();

//set the template engine
app.set('view engine','ejs');

//fetch data from the request
app.use(bodyParser.urlencoded({extended:false}));

//static folder
app.use(express.static(path.resolve(__dirname,'public')));

//default pageload
app.get('/',(req,res)=>{
    csvModel.find((err,data)=>{
         if(err){
             console.log(err);
         }else{
              if(data!=''){
                  console.log('dataaaaa', data)
                  const app = new Vue ({
                    el: '#app',
                    data: data[
                })
              }else{
                  res.render('demo',{data:''});
              }
         }
    });
});

var temp ;

app.post('/',uploads.single('csv'),(req,res)=>{
 //convert csvfile to jsonArray   
csv()
.fromFile(req.file.path)
.then((jsonObj)=>{
    for(var x=0;x<jsonObj;x++){
         temp = parseFloat(jsonObj[x].song_name)
         jsonObj[x].song_name = temp;
         temp = parseFloat(jsonObj[x].band)
         jsonObj[x].band = temp;
         temp = parseFloat(jsonObj[x].year)
         jsonObj[x].year = temp;
     }
     console.log('JASOOON', jsonObj);
     csvModel.insertMany(jsonObj,(err,data)=>{
            if(err){
                console.log(err);
            }else{
                res.redirect('/');
            }
     });
   });
});

//assign port
var port = process.env.PORT || 3000;
app.listen(port,()=>console.log('server run at port '+port));