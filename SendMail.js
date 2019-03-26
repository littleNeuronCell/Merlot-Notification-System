const nodemailer = require("nodemailer");
exports.sendMail = async function(toMail,type,content){
    try{
    let tp = nodemailer.createTransport({
            service: "Gmail",
            // service: "smtp.up.ac.za",
            auth: {
                user: "MerlotClientNotifcation@gmail.com",
                pass: "oQCpfUuLpPZh3rPhjRpj"
                // user: "u16009917@tuks.co.za",
                // pass: "Viper3489753489"
            }
        });
        let mail = {
            from: '"MerlotNoReply" <MerlotClientNotifcation@gmail.coma>',
            to: toMail,
            subject:(type == "generic" ? content.subject : "Notification " + type) ,
            html: formatContent(type,content)
        };

        let info = await tp.sendMail(mail);
        // console.log("Message sent: %s", info.messageId);
        // console.log(info);
        if(info.rejected.length>0){
            return response("failed","Failed to send mail to "+info.rejected);
        }
        else
            return response("success","Mail sent successfully");
    }catch(error){
        return response("Fatal error",error);
    }
};    
function response(status,message){
    var response = {
        "status" : status,
        "timestamp": Math.floor(Date.now()),
        "message":message
    }
    return response
}


function formatContent(type, content){
    switch(type.toLowerCase()){
        case "otp":{
            return OTP(content);
            break;
        }
        case "card" :{
            return card(content);
            break;
        }
        case "generic" :{
            return generic(content);
            break;
        }
        default:{
            throw '{ "status": 400, "message":"Invalid Notification Type" }'
        }
    }
}


function OTP(content){
    var s ="";
    s+='<body>'
    s+='<style>.im{color:white !important</style>'
    s+='<div style="background: #f8f8f8">'
    s+='<meta charset="utf-8">'
    s+='    <link href="https://fonts.googleapis.com/css?family=Varela+Round" rel="stylesheet">'
    s+='        <div style="background: linear-gradient(#01aaad, #006666);">'
    s+='            <img src="https://raw.githubusercontent.com/littleNeuronCell/Merlot-Notification-System/master/TemplateDesign/OTP%20email%20format/fnb_logo.png" alt="fnb logo" style="width: 200px; display: block; margin: 0 auto">'
    s+='            <div style="padding: 60px 4vw 0 4vw; font: bold 20px \'Varela Round\', sans-serif; color: white !important; text-align: center;">'
    s+='                <span>Good Day [Name Surname]</span><br/><br/>'
    s+='                <span style="font: 15px \'Varela Round\', sans-serif; position: relative; top: 50px; color:white !important">'
    s+='                    A new One-Time-Pin has been generated <span>'+content.pin+'</span> <br/>'
    s+='                    This email was sent for the purpose of a one time authentication usage,<br/>'
    s+='                    if this was not you please contact 000 000 0000 or ignore this email.<br/>'
    s+='                    Thank you for using the FNB app. <br/>'
    s+='                </span><br/>'
    s+='                <span style="position: relative; top: 70px; font: 15px \'Varela Round\', sans-serif; border-top: solid 1px white;color: white !important">'
    s+='                    Terms · Privacy · <a href="https://www.fnb.co.za/" target="_blank" style="text-decoration: none; color: white;">Go to FNB website</a>'
    s+='                </span>'
    s+='                <div style="height: 15vh;"></div>'
    s+='            </div>'
    s+='        </div>'
    s+='        <div style="width: 40vw; margin: 10px auto; text-align: center">'
    s+='            <img src="https://raw.githubusercontent.com/littleNeuronCell/Merlot-Notification-System/master/TemplateDesign/OTP%20email%20format/fnb_logo2.png" alt="fnb logo" style="width: 90px; display: block; margin: 0 auto">'
    s+='            <span style="font: 13px \'Varela Round\', sans-serif; position: relative; color: #999">'
    s+='                    This email was sent through the Merlot Notification System <br/>'
    s+='                    Thank you for using the FNB app. <br/>'
    s+='                </span><br/>'
    s+='        </div>'
    s+='    </div>'
    s+='</body>'
    return s;
}

function card(content){
    var s ="";
    s+='<body>'
    s+='<style>.im{color:white !important</style>'
    s+='<div style="background: #f8f8f8">'
    s+='<meta charset="utf-8">'
    s+='    <link href="https://fonts.googleapis.com/css?family=Varela+Round" rel="stylesheet">'
    s+='        <div style="background: linear-gradient(#01aaad, #006666);">'
    s+='            <img src="https://raw.githubusercontent.com/littleNeuronCell/Merlot-Notification-System/master/TemplateDesign/OTP%20email%20format/fnb_logo.png" alt="fnb logo" style="width: 200px; display: block; margin: 0 auto">'
    s+='            <div style="padding: 60px 4vw 0 4vw; font: bold 20px \'Varela Round\', sans-serif; color: white !important; text-align: center;">'
    s+='                <span>Good Day [Name Surname]</span><br/><br/>'
    s+='                <span style="font: 15px \'Varela Round\', sans-serif; position: relative; top: 50px; color:white !important">'
    s+='                Your new card: <span>'+content.cardnumber+'</span> is ready for use.<br>'
    s+='                A pin has been generated for your card: <span>'+content.pin+'</span>.<br>'
    s+='                For security reasons please do not share your card number and pin.<br>'
    s+='                Thank you for using the FNB app. <br>'
    s+='                </span><br/>'
    s+='                <span style="position: relative; top: 70px; font: 15px \'Varela Round\', sans-serif; border-top: solid 1px white;color: white !important">'
    s+='                    Terms · Privacy · <a href="https://www.fnb.co.za/" target="_blank" style="text-decoration: none; color: white;">Go to FNB website</a>'
    s+='                </span>'
    s+='                <div style="height: 15vh;"></div>'
    s+='            </div>'
    s+='        </div>'
    s+='        <div style="width: 40vw; margin: 10px auto; text-align: center">'
    s+='            <img src="https://raw.githubusercontent.com/littleNeuronCell/Merlot-Notification-System/master/TemplateDesign/OTP%20email%20format/fnb_logo2.png" alt="fnb logo" style="width: 90px; display: block; margin: 0 auto">'
    s+='            <span style="font: 13px \'Varela Round\', sans-serif; position: relative; color: #999">'
    s+='                    This email was sent through the Merlot Notification System <br/>'
    s+='                    Thank you for using the FNB app. <br/>'
    s+='                </span><br/>'
    s+='        </div>'
    s+='    </div>'
    s+='</body>'
    return s;
}

function generic(content){
    var s ="";
    s+='<body>'
    s+='<style>.im{color:white !important</style>'
    s+='<div style="background: #f8f8f8">'
    s+='<meta charset="utf-8">'
    s+='    <link href="https://fonts.googleapis.com/css?family=Varela+Round" rel="stylesheet">'
    s+='        <div style="background: linear-gradient(#01aaad, #006666);">'
    s+='            <img src="https://raw.githubusercontent.com/littleNeuronCell/Merlot-Notification-System/master/TemplateDesign/OTP%20email%20format/fnb_logo.png" alt="fnb logo" style="width: 200px; display: block; margin: 0 auto">'
    s+='            <div style="padding: 60px 4vw 0 4vw; font: bold 20px \'Varela Round\', sans-serif; color: white !important; text-align: center;">'
    s+='                <span>Good Day [Name Surname]</span><br/><br/>'
    s+='                <span style="font: 15px \'Varela Round\', sans-serif; position: relative; top: 50px; color:white !important">'
    s+=                 content.body
    s+='                <br/>'
    s+='                </span><br/>'
    s+='                <span style="position: relative; top: 70px; font: 15px \'Varela Round\', sans-serif; border-top: solid 1px white;color: white !important">'
    s+='                    Terms · Privacy · <a href="https://www.fnb.co.za/" target="_blank" style="text-decoration: none; color: white;">Go to FNB website</a>'
    s+='                </span>'
    s+='                <div style="height: 15vh;"></div>'
    s+='            </div>'
    s+='        </div>'
    s+='        <div style="width: 40vw; margin: 10px auto; text-align: center">'
    s+='            <img src="https://raw.githubusercontent.com/littleNeuronCell/Merlot-Notification-System/master/TemplateDesign/OTP%20email%20format/fnb_logo2.png" alt="fnb logo" style="width: 90px; display: block; margin: 0 auto">'
    s+='            <span style="font: 13px \'Varela Round\', sans-serif; position: relative; color: #999">'
    s+='                    This email was sent through the Merlot Notification System <br/>'
    s+='                    Thank you for using the FNB app. <br/>'
    s+='                </span><br/>'
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


