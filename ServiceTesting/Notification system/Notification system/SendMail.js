const nodemailer = require("nodemailer");
exports.SendMail = function(toMail,type,content){
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
    console.log("Message sent: %s", info.messageId);
    return true;
};    



function formatContent(type, content){
    switch(type.toLower()){
        case "otp":{
            OTP(content)
            break;
        }
    }
}


function OTP(content){
    String s =""
    s+="<html>"
    s+="    A new One-Time-Pin has been generated "+content.pin 
    s+="    if this was not you please contact 000 000 0000"; 
    s+="</html>"

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