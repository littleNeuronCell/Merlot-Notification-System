const nodemailer = require("nodemailer");
exports.sendMail = async function(toMail,type,content){
    try{
    let tp = nodemailer.createTransport({
            service: "Gmail",
            auth: {
                user: "MerlotClientNotifcation@gmail.com",
                pass: "oQCpfUuLpPZh3rPhjRpj"
            }
        });
        let mail = {
            from: '"MerlotNoReply" <MerlotClientNotifcation@gmail.coma>',
            to: toMail,
            subject: "Notification "+ type ,
            html: formatContent(type,content)
        };

        let info = await tp.sendMail(mail);
        // console.log("Message sent: %s", info.messageId);
        // console.log(info);
        if(info.rejected.length>0){
            return '{ "status": 400, "message":"Failed to send mail to '+info.rejected+'" }'
        }
        else
            return '{ "status": 200, "message":"Mail sent successfully" }'
    }catch(error){
        return error
    }
};    



function formatContent(type, content){
    switch(type.toLowerCase()){
        case "otp":{
            return OTP(content)
            break;
        }


        default:{
            throw '{ "status": 400, "message":"Invalid Notification Type" }'
        }
    }
}


function OTP(content){
    console.log(content.pin);
    var s =""
    s+="<span>"
    s+="    A new One-Time-Pin has been generated "+content.pin 
    s+="    if this was not you please contact 000 000 0000"; 
    s+="</span>"
    return s;
}

/*
async function sendEmail(){
    let tp = nodemailer.createTransport({
        service: "Gmail",
        auth: {
            user: "MerlotClientNotifcation@gmail.com",
            pass: "oQCpfUuLpPZh3rPhjRpj"
        }
    });
    let mail = {
        from: '"MerlotNoReply" <MerlotClientNotifcation@gmail.coma>',
        to: "u16009917@tuks.co.za",
        subject: "Notification",
        html: "<span>Wys vir Reinhardt^^</span>"
    };

    let info = await tp.sendMail(mail);

    console.log("Message sent: %s", info.messageId);
};

sendEmail().catch(console.error);*/