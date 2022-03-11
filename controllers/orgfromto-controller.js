const { text } = require('body-parser');
var Orgfromto = require('../model/Orgfromto');



exports.getChart = function(req,res) {
   // console.log("inside getOrg");
    Orgfromto.find()
    .select('title -_id')
    .exec((err,org)=> {
        if(err) {
            //console.log(err);
            return res.status(400).json(err);
        }
        //console.log(org);
       res.json(org);
    });  
  
}

exports.updateChart = function(req,res) {
 
     var title;
     const [from] = req.body;
    Orgfromto.findById({_id:'6040937d28ed8e265cf4629a'})
    .select('title -_id')
    .exec((err,org)=>{
      title=org.title;
      var block2='hello';
      title=org.title;
      title = title + ',';
      title=title+'['+from+']';
      Orgfromto.findOneAndUpdate({_id:'6040937d28ed8e265cf4629a'},{title: title},{new:true},(err,chart)=>{
        if(err) {
            console.log(err);
            return res.status(400).json(err);
        }
        return res.json(chart);
     
     }); 
    });
}  
    // Orgfromto.title.push(['block1', 'block2']);
    // Orgfromto.markModified('title');
    // Orgfromto.save();
     
    exports.deleteChart = function(req,res) {
        var data=req.body;
        // console.log(data);
        var data1=data[0].toString();
        var length = data.length;
        Orgfromto.findById('6040937d28ed8e265cf4629a')
        .select('title -_id')
        .exec((err,org)=>{ 
            console.log(org);
            var str=org.title;
            console.log("*********"+str);

        for(i=0;i<=length-1;i++){
            var data1=data[i].toString();
            // console.log(data1);
            str=str.replace(`,[${data1}]`,'');
        }
        console.log("********");
        console.log(str);
        // return res.json(str);
        Orgfromto.findOneAndUpdate({_id:'6040937d28ed8e265cf4629a'},{title: str},{new:true},(err,chart)=>{
            if(err) {
                console.log(err);
                console.log("--------");
                console.log(chart);
                return res.status(400).json(err);
            }
            return res.json(chart);
         
         }); 

       });
    }  


 exports.getHMembers = function(job){
    let arr1=new Array();
    let activities=new Array();
    let fromdata;
    var i,j=0;
    var tempString='';
    Orgfromto.find()
    .select('title -_id')
    .exec((err,org)=> {
        if(err) {
            //console.log(err);
            return res.status(400).json(err);
        }
    
    
       for (i=0;i<org[0].title.length;i++)
       {
           if(org[0].title[i]==']')
           {
               for(j;j<=i;j++)
               { 
                tempString=tempString+org[0].title[j];
               }
               j=i+2;
               var [a, b] = tempString.split(',');
               a=a.replace(/[['"]+/g, '');
               b=b.replace(/]+/g,'');
             //a=a.replace(/['"]+/g, '');
               b=b.replace(/['"]+/g,'');
               a=a.trim();
               b=b.trim();
               console.log("a",a);
               console.log("b",b);
               activities.push([a,b]);
               tempString='';

           }
       }
       console.log("==================activites120");
       console.log(activities);
       console.log("activites end");
       //activities=[['MD', 'FD'],['MD', 'DOE'],['DOE', 'PM'],['DOE', 'HRM'],['PM', 'BA'],['PM', 'Eng'],['Eng','Product']];
       indexOf2d(activities, job);
    });
    function indexof3d(val){
//  console.log("line 127");

        activities.some(function(sub,posX){
          var pe= sub.indexOf(val);
         // console.log(val);
          if(pe==0){
              //console.log(posX);
              arr1.push(activities[posX][1]);
              indexof3d(activities[posX][1]);
          }
          console.log(pe);
        // console.log("line 138");

        });
    }
    function indexOf2d(arr, val) {
 console.log("line 139");
        var index = [-1, -1];
    
        if (!Array.isArray(arr)) {
//  console.log("line 144");

            return index;

        }
    
        arr.some(function (sub, posX) {
//  console.log("line 150");
        
            if (!Array.isArray(sub)) {
//  console.log("line 153");

                return false;
            }
    
            var posY =sub.indexOf(val);
            //console.log(posY);
            
            if (posY !== -1) {
                let i=1;
                index[0] = posX;
                index[1] = posY;
                if(posY==0){
                //console.log(activities[posX][1]);
                arr1.push(activities[posX][1]);
                //arr1.push(posX);
                }
//  console.log("line 170");
               
                //return true;
            }
            
            return false;
        });
        arr1.forEach(function(number){
            console.log(number);
//  console.log("line 179");

            indexof3d(number);
        });
       // return arr1;
    }
 console.log("line 186");
    console.log(arr1)
  return arr1;  
 }