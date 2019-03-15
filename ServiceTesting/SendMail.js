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
var s ="";
s+='<body>'
s+='<div style="background: #f8f8f8">'
s+='        <link href="https://fonts.googleapis.com/css?family=Varela+Round" rel="stylesheet">'
s+='        <style>'
s+='            a:link, a:visited{'
s+='                text-decoration: none;'
s+='                color: white;'
s+='                transition: all 1s linear;'
s+='            }'
s+=''
s+='            a:hover, a:active{'
s+='                color: #bdbdbd;'
s+='            }'
s+='        </style>'
s+='        <div style="background: linear-gradient(#01aaad, #006666); width: 40vw; margin: 0 auto">'
s+='            <img src="https://drive.google.com/drive/folders/1hUYLADz6G5jE3s-gVxVSq-ZO0OMamXpi" alt="fnb logo" style="width: 200px; display: block; margin: 0 auto">'
s+='            <div style="padding: 60px 4vw 0 4vw; font: bold 20px \'Varela Round\', sans-serif; color: white; text-align: center;">'
s+='                <span>Good Day [Name Surname]</span><br>'
s+='                <span style="font: 15px \'Varela Round\', sans-serif; position: relative; top: 50px;">'
s+='                    A new One-Time-Pin has been generate <span>'+content.pin+'</span> <br><br>'
s+='                    This email was sent for the purpose of a one time authentication usage,<br>'
s+='                    if this was not you please contact 000 000 0000 or ignore this email.<br>'
s+='                    Thank you for using the FNB app. <br>'
s+='                </span><br>'
s+='                <span style="position: relative; top: 70px; font: 15px \'Varela Round\', sans-serif; border-top: solid 1px white; padding: 10px 75px;">'
s+='                    Terms · Privacy · <a href="https://www.fnb.co.za/" target="_blank">Goto FNB website</a>'
s+='                </span>'
s+='                <div style="height: 15vh;"></div>'
s+='            </div>'
s+='        </div>'
s+='        <div style="width: 40vw; margin: 10px auto; text-align: center">'
s+='            <img src="https://drive.google.com/drive/folders/1hUYLADz6G5jE3s-gVxVSq-ZO0OMamXpi" alt="fnb logo" style="width: 90px; display: block; margin: 0 auto">'
s+='            <span style="font: 13px \'Varela Round\', sans-serif; position: relative; color: #999">'
s+='                    This email was sent through the Merlot Notification System <br>'
s+='                    Thank you for using the FNB app. <br>'
s+='                </span><br>'
s+='        </div>'
s+='    </div>'
s+='</body>'
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


