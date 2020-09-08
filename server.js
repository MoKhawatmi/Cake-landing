const express=require("express");
const hbs=require("express-handlebars");
const multer = require('multer');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Cake=require("./models/cake");
const Request=require("./models/request");

const app=express();

//db connection 
const dbURI = "mongodb+srv://{username}:{password}@cluster0.6y5yz.mongodb.net/CakeLanding?retryWrites=true&w=majority";
mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);
mongoose.set('useFindAndModify', false);
mongoose.connect(dbURI).then((result)=>{
    app.listen(3000,()=>{
        console.log("connected and listening");
    });
}).catch((err)=>{
    console.log(err);
});


//multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads');
    },
    filename: (req, file, cb) => {
        console.log(file);
        cb(null, Date.now() + path.extname(file.originalname));
    }
});
const fileFilter = (req, file, cb) => {
    if (file.mimetype == 'image/jpeg' || file.mimetype == 'image/png') {
        cb(null, true);
    } else {
        cb(null, false);
    }
}
const upload = multer({ storage: storage, fileFilter: fileFilter });


//view engine
app.engine('hbs', hbs({
    extname: "hbs",
    runtimeOptions: {
        allowProtoPropertiesByDefault: true,
        allowProtoMethodsByDefault: true
      },
    defaultLayout: "",
    layoutsDir: "",
 }));

app.set('view engine', 'hbs');

//middleware
app.use("/scripts",express.static('scripts'));
app.use("/styles",express.static('styles'));
app.use("/assets",express.static('assets'));
app.use('/uploads', express.static(path.join(__dirname,'/uploads')));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());


app.get(["/","/index"],(req,res)=>{
    //res.sendFile("./views/index.html",{root: __dirname}); //no engine rendering

    Cake.find().then((result)=>{
        let onSale=result.filter(cake=>{
            return cake.onSale;
        })
        res.render("index", {cakes: result.reverse().slice(0,6), onSale}); //with engine rendering
    }).catch(err=>{
        res.send(err);
    }); 
});

app.get("/cakes",(req,res)=>{
    //res.sendFile("./views/cakes.html",{root: __dirname}); 
    Cake.find().then((result)=>{
        res.render("cakes",{cakes: result.reverse()});
    }).catch((err)=>{
        console.log(err);
    })
});

app.put("/cakes/:id",(req,res)=>{
    let id=req.params.id;
    let body=req.body;
    console.log(body)
    Cake.findByIdAndUpdate(id,body).then(result=>{
        console.log(result);
        res.redirect(303,"/admin");
    }).catch(err=>{
        console.log(err);
    });
    
});

app.delete("/cakes/:id",(req,res)=>{
    let id=req.params.id;
    Cake.findByIdAndDelete(id).then(deleted=>{
        res.render("admin");
    }).catch(err=>{
        res.send(err);
    })
});

app.get("/about",(req,res)=>{
   //res.sendFile("./views/about.html", {root: __dirname});
    res.render("about");
})

app.get("/contact",(req,res)=>{
    //res.sendFile("./views/contact.html", {root: __dirname});
    res.render("contact");
});

app.get("/makeCake",(req,res)=>{
    //res.sendFile("./views/makeACake.html",{root: __dirname});
    res.render("makeACake");
});

app.get("/order",(req,res)=>{
    //res.sendFile("./views/order.html",{root: __dirname});
    res.render("order");
})

app.post("/order",upload.single('image'),(req,res)=>{

    let request=new Request({
        userName:req.body.name,
        userPhone:req.body.phone,
        userLocation:req.body.location,
        image:(req.file?req.file.path:""),
        orderDescription:req.body.description
    });
    
    request.save().then(result=>{
        res.render("order");
    }).catch(err=>{
        console.log(err)
        res.send(err);
    });
    
})

app.get("/admin",(req,res)=>{
    let resObject={};
    Cake.find().then(result=>{
        resObject.cakes=result.reverse();
        Request.find().then(result=>{
            resObject.requests=result;
            res.render("admin",{cakes: resObject.cakes, requests: resObject.requests});
        })
    }).catch(err=>{
        res.send(err);
    })
    
})

app.post("/admin",upload.single('image'),(req,res)=>{
    let cake=new Cake({
        name:req.body.name,
        description:req.body.description,
        price:req.body.price,
        image:(req.file?req.file.path:"")
    });
    
    cake.save().then(result=>{
        res.redirect(303,"/admin")
    }).catch(err=>{
        console.log(err)
        res.send(err);
    });

})

app.put("/request/:id",(req,res)=>{
    console.log(req.params.id);
    console.log(req.body);
    
    Request.findByIdAndUpdate(req.params.id,req.body).then(response=>{
        res.send(response);
    }).catch(err=>{
        res.send(err);
    });
})

app.get("/getNames",(req,res)=>{
    //db.student.find({}, {roll:1, _id:0})
    Cake.find({},{name:1}).then(result=>{
        res.json(result);
    }).catch(err=>{
        res.send(err);
    });
});

app.get("/cakedetails/:id",(req,res)=>{
    let urlFlag;
    Cake.findById(req.params.id).then(result=>{
        if(/^uploads/i.test(result.image)){
            urlFlag=true;
        }else{
            urlFlag=false;
        }
        res.render("cakeDetails",{cake:result,urlFlag})
    }).catch(err=>{
        res.send(err);
    })
})

