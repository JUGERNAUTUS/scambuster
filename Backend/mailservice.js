var nodemailer=require('nodemailer')

const transport=nodemailer.createTransport({

    service:'gmail',
    auth:{
        user:'graphiteworkflowbc@gmail.com',
        pass:'GPI@123#graphite'
    }

})

//add email address of sender in below code at "from" field
const sendMail=(receiver,subject,text1,callback)=>
{
    var mailOptions={
        from:process.env.MAIL_FROM,
        to:receiver,
        subject,
        text:text1
        
    };
    transport.sendMail(mailOptions,function(err,result)
    {
        if(err)
        callback(err,null)
        else
        callback(null,result)

    });

    
}

module.exports=sendMail;

