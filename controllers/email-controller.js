var config = require('../config');
var mailgun = require('mailgun-js')({apiKey: config.mailgun.apiKey, domain: config.mailgun.domain});
var ejs = require('ejs');
var fs = require('fs');
var path = require('path');

var jsonPathStyle = path.join(__dirname,'..','templates','email_style.html');
var css = fs.readFileSync(jsonPathStyle,'utf8');

exports.sendWelcomeMail = function(user) {
    sendEmail('Welcome!',user,'welcome');
}

exports.sendNewTaskMail = function(user,task){
    let additional = {task:task};
    sendEmail('Task assigned',user,'new_task',additional);
}
exports.sendResetPasswordEmail = function (user,pw) {
    user.pw = pw;
    sendEmail('Password recovery', user, 'lost_pw');
}
exports.sendInvitationEmail = function(user,board) {
    var text=[];
    //var user=[ 'febyann.mathews@gmail.com', 'noel.484@greenvalleyschools.in' ,'abhi@gmail.com'];
    user.forEach((el,index)=>{ 
    if(index==0){
    console.log(index);
    text[index] = `{ "${el}" : { "firstName":"${board[index].to.fname}" , "lastName":"${board[index].to.lname}","board":"${board[index].board.title}","desc":"${board[index].board.desc}"}`;
    }
    else if(index!=0 && index<user.length-1){
    console.log(index," in elseif")
    text[index] = `"${el}" : { "firstName":"${board[index].to.fname}" , "lastName":"${board[index].to.lname}" ,"board":"${board[index].board.title}","desc":"${board[index].board.desc}"}`;
    }
    
    if(index+1==user.length && index!=0)
    {
    console.log(index);
    console.log("user length",user.length);
    text[index] = `"${el}" : { "firstName":"${board[index].to.fname}" , "lastName":"${board[index].to.lname}","board":"${board[index].board.title}","desc":"${board[index].board.desc}" }}`;
    }
    if(user.length==1){
        text[index] = `{"${el}" : { "firstName":"${board[index].to.fname}" , "lastName":"${board[index].to.lname}","board":"${board[index].board.title}","desc":"${board[index].board.desc}" }}`;
    }
    });
    var recipient=JSON.parse(JSON.stringify(text.toString()));
    console.log("recip",recipient);
    sendBatchEmail(`You have been invited to the board ${board[0].board.title}`,user,recipient);
}

function sendEmail(subject, user, template_name, additional_data) {
    var jsonPath = path.join(__dirname, '..', 'templates', template_name +'.html');
    var template = fs.readFileSync(jsonPath,'utf8');
    var options = { user: user, subject: subject, style:css};

    if(additional_data && additional_data !== undefined){
        options = Object.assign(options,additional_data);
    }

    var text = ejs.render(template, options);

    var data = {
        from:'Feby Mathews febyann.mathews@gmail.com',
        to:user.email,
        subject:subject,
        html:text
    };

    mailgun.messages().send(data).then(res=>console.log(res)).catch(err=>console.log(err));

}

function sendBatchEmail(subject, user, recipient_name) {
   
    var data = {
     from: 'Feby Mathews <febyann.mathews@gmail.com>',
     to: user,
     subject: subject,
     //text:'Hi %recipient.firstName% %recipient.lastName% You are invited to the board',
     'recipient-variables': recipient_name,
     //'v:subject': subject,
     // context: {                  
     //     subject: subject,
     //   },
     html:'<html><head><meta name="viewport" content="width=device-width" /><meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/></head><body class=""><table border="0" cellpadding="0" cellspacing="0" class="body"><tr><td>&nbsp;</td><td class="container"><div class="content"><table class="main"><tr><td class="wrapper"><table border="0" cellpadding="0" cellspacing="0"><tr><td><h2>Hey %recipient.firstName% %recipient.lastName%!</h2><p>You have been invited to collaborate on the board %recipient.board%!<p><b>Description:</b> %recipient.desc%</p><p>You can accept or decline the invitation inside your app!</p><p>Best,<br>your Startup Team</p></td></tr></table></td></tr></table></div></td></tr></table></body></html>',
   };
   
   mailgun.messages().send(data, function (error, body) {
     console.log(body);
   });
   
 }
 









// exports.sendTestEmail = function() {
//    var data = {
//        from : 'Feby <febyann.mathews@gmail.com>',
//        to: 'febyann.mathews@gmail.com',
//        subject: 'Hello!',
//        text: 'This is my test email!!!'
//    };
//    mailgun.messages().send(data,function(error,body){
//        console.log('body:' ,body);
//    })
// };

