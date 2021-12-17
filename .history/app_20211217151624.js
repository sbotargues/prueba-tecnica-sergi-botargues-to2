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
                  res.render('demo',{data:data});
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
    console.log('EEEEEEEEEEEE!!!!!!!!', jsonObj)
    function toLowerCase(jsonObj) {
        if(typeof(jsonObj)=='object')
        {
            for (var key in jsonObj)
            {
                if (parseFloat(key).toString() == "NaN")
                {//非数字
                    var newKey = key.substring(0,1).toLowerCase()+key.substring(1);
                    var newValue = toLowerCase(jsonObj[key]);
                    
                    delete(jsonObj[key]);
    
                    jsonObj[newKey] = newValue;
                }
                else
                {
                    jsonObj[key] = toLowerCase(jsonObj[key]);
                }
            }
        }
        return jsonObj;
    }
    
   });
});

//assign port
var port = process.env.PORT || 3000;
app.listen(port,()=>console.log('server run at port '+port));