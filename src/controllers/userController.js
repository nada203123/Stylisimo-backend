const bcrypt = require('bcrypt');
const User = require('../models/user');
const nodemailer  = require('nodemailer')
const jwt = require('jsonwebtoken');
const crypto = require('crypto');


async function register (req,res) {
    const { firstName, lastName, email, password } = req.body;

  if (!firstName || !lastName || !email || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
 
    const existingUser = await User.findOne({ where: { email } });

    if (existingUser) {
      return res.status(400).json({ message: 'Email already in use' });
    }


    const hashedPassword = await bcrypt.hash(password, 10);
    let otpCode = Math.floor(Math.random() * 900000) + 100000;

    const newUser = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      otpCode,
      role: 'client'
    });
    await sendOtp(req, res,otpCode);

    res.status(201).json({ message: 'User registered successfully', user: newUser });
  } catch (error) {
    console.error('erroooooooor',error);
    res.status(500).json({ message: 'Internal server error' });
  }

}


async function checkEmail (req,res) {
  try {
  const { email } = req.body; 

  if (!email) {
    return res.status(400).json({ message: 'Email is required' });
  }

  const existingUser = await User.findOne({ where: { email } });
  
  res.json(!!existingUser);
} catch (error) {
   console.error('Error checking email:', error);
    res.status(500).json({ message: 'Internal server error' });
}
}

const sendOtp = async (req,res,otpCode) => {
   

  const transporter = nodemailer.createTransport({
    service: "Gmail",
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
      auth: {
        
        user: "nada.ghribi203@gmail.com",
        pass: "bngo zjir gipn anjy"
    }
    });
    const mailOptions = {
      from: "nada.ghribi203@gmail.com",
      to: "stylisimo24@gmail.com",
      subject: "Hello from STYLISIMO",
      html:` <html>

<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href='http://fonts.googleapis.com/css?family=Montserrat:400,700' rel='stylesheet' type='text/css'>
    <title>TEKUP</title>
    <style type="text/css">
        div,
        p,
        a,
        li,
        td {
          -webkit-text-size-adjust: none;
        }

        .ReadMsgBody {
          width: 100%;
          background-color: #cecece;
        }

        .ExternalClass {
          width: 100%;
          background-color: #cecece;
        }

        body {
          width: 100%;
          height: 100%;
          background-color: #cecece;
          margin: 0;
          padding: 0;
          -webkit-font-smoothing: antialiased;
        }

        html {
          width: 100%;
        }

        img {
          border: none;
        }

        table td[class=show] {
          display: none !important;
        }

        @media only screen and (max-width: 640px) {
          body {
            width: auto !important;
          }

          table[class=full] {
            width: 100% !important;
          }

          table[class=devicewidth] {
            width: 100% !important;
            padding-left: 20px !important;
            padding-right: 20px !important;
          }

          table[class=inner] {
            width: 100% !important;
            text-align: center !important;
            clear: both;
          }

          table[class=inner-centerd] {
            width: 78% !important;
            text-align: center !important;
            clear: both;
            float: none !important;
            margin: 0 auto !important;
          }

          table td[class=hide],
          .hide {
            display: none !important;
          }

          table td[class=show],
          .show {
            display: block !important;
          }

          img[class=responsiveimg] {
            width: 100% !important;
            height: atuo !important;
            display: block !important;
          }

          table[class=btnalign] {
            float: left !important;
          }

          table[class=btnaligncenter] {
            float: none !important;
            margin: 0 auto !important;
          }

          table td[class=textalignleft] {
            text-align: left !important;
            padding: 0 !important;
          }

          table td[class=textaligcenter] {
            text-align: center !important;
          }

          table td[class=heightsmalldevices] {
            height: 45px !important;
          }

          table td[class=heightSDBottom] {
            height: 28px !important;
          }

          table[class=adjustblock] {
            width: 87% !important;
          }

          table[class=resizeblock] {
            width: 92% !important;
          }

          table td[class=smallfont] {
            font-size: 8px !important;
          }
        }

        @media only screen and (max-width: 520px) {
          table td[class=heading] {
            font-size: 24px !important;
          }

          table td[class=heading01] {
            font-size: 18px !important;
          }

          table td[class=heading02] {
            font-size: 27px !important;
          }

          table td[class=text01] {
            font-size: 22px !important;
          }

          table[class="full mhide"],
          table tr[class=mhide] {
            display: none !important;
          }
        }

        @media only screen and (max-width: 480px) {
          table {
            border-collapse: collapse;
          }

          table[id=colaps-inhiret01],
          table[id=colaps-inhiret02],
          table[id=colaps-inhiret03],
          table[id=colaps-inhiret04],
          table[id=colaps-inhiret05],
          table[id=colaps-inhiret06],
          table[id=colaps-inhiret07],
          table[id=colaps-inhiret08],
          table[id=colaps-inhiret09] {
            border-collapse: inherit !important;
          }
        }
    </style>
</head>

<body style="background-color: #cecece;">
<table width="100%" border="0" cellspacing="0" cellpadding="0" align="center" class="full">
    <tr>
        <td align="center">
            <table width="600" border="0" cellspacing="0" cellpadding="0" align="center" class="devicewidth">
                <tr>
                    <td>
                        <table width="100%" bgcolor="#ffffff" border="0" cellspacing="0" cellpadding="0" align="center"
                               class="full" style="background-color:#ffffff; border-radius:5px 5px 0 0;">
                            <tr>
                                <td>
                                    <table width="265" align="center" border="0" cellspacing="0" cellpadding="0"
                                           class="inner"
                                           style="text-align:center;">
                                        <tr>
                                            <td class="heightSDBottom" height="55">&nbsp;</td>
                                        </tr>
                                        
                                        <tr>
                                        </tr>
                                    </table>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
            </table>
        </td>
    </tr>
</table>
<table width="100%" border="0" cellspacing="0" cellpadding="0" align="center" class="full">
    <tr>
        <td align="center">
            <table width="600" border="0" cellspacing="0" cellpadding="0" align="center" class="devicewidth">
                <tr>
                    <td>
                        <table width="100%" bgcolor="#f8f8f8" border="0" cellspacing="0" cellpadding="0" align="center"
                               class="full" style="text-align:center; border-bottom:1px solid #e5e5e5;">
                            <tr>
                                <td
                                        style="font:700 30px 'Montserrat', Helvetica, Arial, sans-serif; color:#0056b3; text-transform:uppercase; padding:0 5% 0 5%;">
                                    STYLISIMO
                                </td>
                            </tr>
                           
                            <tr>
                                <td>
                                    <table width="100%" align="center" bgcolor="#ffffff" border="0" cellspacing="0"
                                           cellpadding="0"
                                           style="border-collapse:collapse;  text-align:center;"
                                           class="adjustblock">
                                        <tr>
                                            <td style="font:20px Arial, Helvetica, sans-serif; color:#5c5c5c;">Hi, you
                                                will find your OTP code.
                                            </td>
                                        </tr>
                                        <tr>
                                            <td class="heightSDBottom" height="55">&nbsp;</td>
                                        </tr>
                                        <tr>
                                            <td align="center">
                                                <table width="96%" align="center" border="0" cellspacing="0"
                                                       cellpadding="0"
                                                       style="border-collapse:collapse;  text-align:center; border:1px solid #d3d3d3;"
                                                       class="resizeblock">
                                                    <tr>
                                                        <td width="12">&nbsp;</td>
                                                        <td>
                                                            <table width="100%" align="center" border="0"
                                                                   cellspacing="0" cellpadding="0"
                                                                   style="border-collapse:collapse;  text-align:center;"
                                                                   class="inner">
                                                                <tr>
                                                                    <td height="42">&nbsp;</td>
                                                                </tr>
                                                                <tr>
                                                                    <td
                                                                            style="font:700 30px 'Montserrat', Helvetica, Arial, sans-serif; color:#404040; text-transform:uppercase;">
                                                                        OTP Code:
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td height="42">&nbsp;</td>
                                                                </tr>
                                                                <tr>
                                                                    <td class="heading02"
                                                                        style="font:400 54px 'Montserrat', Helvetica, Arial, sans-serif; color:#0056b3; text-transform:uppercase;">
                                                                        <span >${otpCode}</span>
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td class="heightsmalldevices" height="42">&nbsp;
                                                                    </td>
                                                                </tr>
                                                            </table>

                                                        </td>
                                                        <td width="12">&nbsp;</td>
                                                    </tr>
                                                </table>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td height="10"></td>
                                        </tr>
                                    </table>
                                </td>
                            </tr>
                            <tr>
                                <td height="11"></td>
                            </tr>
                            <tr>
                                <td>
                                    <table width="100%" align="center" bgcolor="#f8f8f8" border="0" cellspacing="0"
                                           cellpadding="0"
                                           style="border-collapse:collapse;  text-align:center;"
                                           class="adjustblock">
                                        <tr>
                                            <td height="10"></td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <table width="96%" align="center" border="0" cellspacing="0"
                                                       cellpadding="0"
                                                       style="border-collapse:collapse;  text-align:center;"
                                                       class="resizeblock">
                                                    <tr>
                                                        <td width="12">&nbsp;</td>
                                                        <td>
                                                            <table width="100%" align="center" border="0"
                                                                   cellspacing="0" cellpadding="0"
                                                                   style="border-collapse:collapse;  text-align:center;"
                                                                   class="inner">
                                                                <tr>
                                                                    <!--<td style="font:14px Arial, Helvetica, sans-serif; color:#5c5c5c;">
                                                                        Please be aware that the OTP code you receive is
                                                                        only valid for 1 minute. If one minute elapses
                                                                        before you
                                                                        can use the OTP, you'll need to generate a new
                                                                        one for verification.
                                                                    </td> -->
                                                                </tr>

                                                            </table>
                                                        </td>
                                                        <td width="12">&nbsp;</td>
                                                    </tr>
                                                </table>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td height="10"></td>
                                        </tr>
                                    </table>
                                </td>
                            </tr>
                            <tr>
                                <td height="11"></td>
                            </tr>
                        </table>
                    </td>
                </tr>
            </table>
        </td>
    </tr>
</table>

<table width="100%" border="0" cellspacing="0" cellpadding="0" align="center" class="full">
    <tr>
        <td align="center">
            <table width="600" border="0" cellspacing="0" cellpadding="0" align="center" class="devicewidth">
                <tr>
                    <td>
                        <table width="100%" bgcolor="#b5637e" border="0" cellspacing="0" cellpadding="0" align="center"
                               class="full" style="border-radius:0 0 5px 5px;">
                            <tr>
                                <td height="18">&nbsp;</td>
                            </tr>
                            <tr>
                                <td>
                                    <table width="340" border="0" cellspacing="0" cellpadding="0" align="right"
                                           style="border-collapse:collapse;  text-align:center;"
                                           class="inner">
                                        <tr>
                                            <td width="21">&nbsp;</td>
                                            <td>
                                                <table width="100%" border="0" cellspacing="0" cellpadding="0"
                                                       align="center">
                                                    <tr>
                                                        <td>
                                                            <table width="100%" border="0" cellspacing="0"
                                                                   cellpadding="0" align="center"
                                                                   class="full">
                                                                <tr>
                                                                    <td align="center"
                                                                        style="font:11px Helvetica,  Arial, sans-serif; color:#383838;">
                                                                        <a style="color:#ffffff; text-decoration:none;"
                                                                           href="#"> View in browser</a>
                                                                    </td>
                                                                    <td style="color:#ffffff;"> |</td>
                                                                    <td align="center"
                                                                        style="font:11px Helvetica,  Arial, sans-serif; color:#383838;">
                                                                        <a style="color:#ffffff; text-decoration:none;"
                                                                           href="#"> Unsubscribe</a>
                                                                    </td>
                                                                    <td style="color:#ffffff;"> |</td>
                                                                    <td align="center"
                                                                        style="font:11px Helvetica,  Arial, sans-serif; color:#383838;">
                                                                        <a style="color:#ffffff; text-decoration:none;"
                                                                           href="#"> Send to a friend</a>
                                                                    </td>
                                                                    <td class="hide" width="40" align="right">&nbsp;
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td height="18">&nbsp;</td>
                                                                </tr>
                                                            </table>

                                                        </td>
                                                    </tr>
                                                </table>

                                            </td>
                                        </tr>
                                    </table>
                                    <table width="230" border="0" cellspacing="0" cellpadding="0" align="left"
                                           style="border-collapse:collapse; text-align:center;"
                                           class="inner">
                                        <tr>
                                            <td width="21">&nbsp;</td>
                                            <td>
                                                <table width="100%" border="0" cellspacing="0" cellpadding="0"
                                                       align="center">
                                                    <tr>
                                                        <td align="center"
                                                            style="font:11px Helvetica,  Arial, sans-serif; color:#ffffff;">
                                                            &copy;
                                                            All rights reserved
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td height="18">&nbsp;</td>
                                                    </tr>
                                                </table>

                                            </td>
                                            <td width="21">&nbsp;</td>
                                        </tr>
                                    </table>

                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
                <tr class="mhide">
                    <td height="100">&nbsp;</td>
                </tr>
            </table>
        </td>
    </tr>
</table>
</body>

</html> `
    };
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error sending email: ", error);
      } else {
        console.log("Email sent: ", info.response);
      }
    });
  }


const verifyAccount = async (req, res) => {
  const { email, otpCode } = req.body;

  if (!email || !otpCode) {
    return res.status(400).json({ message: 'Email and OTP code are required' });
  }

  try {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (user.otpCode === parseInt(otpCode)) {
      user.otpCode = 0; // Reset the OTP code
      user.verified = true; // Mark the user as verified

      await user.save(); // Save the updated user

      res.status(200).json({ message: 'OTP verification successful' });
    } else {
      res.status(400).json({ message: 'OTP verification failed' });
    }
  } catch (error) {
    console.error('Error during OTP verification:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const login = async (req,res) => {
  try{
      const { email, password }= req.body;
      console.log("🚀 ~ login ~ req.body:", req.body)
     
      
      const user = await User.findOne({ where: { email } });
      console.log("🚀 ~ login ~ user:", user)

      if (!user){
          return res.status(404).json({message :'user not found'})
      }

      const isPasswordMatch = await  bcrypt.compare(password, user.password);
      if(!isPasswordMatch){
          return res.status(401).json({message :'invalid password'})
      }

      const verified= user.verified;
      if(verified==false){
        return res.status(403).json({message :'Verify your account'})
      }
      // Generate token   
      const token = jwt.sign({_id : user.id, role: user.role}, process.env.JWT_SECRET);

      res.json({token:token,user:user})

  } catch (error) {
      res.status(400).send(error.message)
  }
}

const resetPasswordRequest = async (req,res) => {

  const { email } = req.body;
  console.log('email',email)
  try {
    const user = await User.findOne({ where: { email } });
    console.log('user',user)
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    console.log('Before token generation');
    const token = crypto.randomBytes(20).toString('hex');
    console.log('token',token)
    console.log('After token generation');

    await user.update({
      passwordResetToken: token,
    });
    console.log('user after update',user)

 

    const transporter = nodemailer.createTransport({
      service: "Gmail",
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
        auth: {
          
          user: "nada.ghribi203@gmail.com",
          pass: "bngo zjir gipn anjy"
      }
      });

      const mailOptions = {
        from: "nada.ghribi203@gmail.com",
        to: "stylisimo24@gmail.com",
        subject: "Password Reset Request",
        html: `<html>

<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href='http://fonts.googleapis.com/css?family=Montserrat:400,700' rel='stylesheet' type='text/css'>
    <title>TEKUP</title>
    <style type="text/css">
        div,
        p,
        a,
        li,
        td {
          -webkit-text-size-adjust: none;
        }

        .ReadMsgBody {
          width: 100%;
          background-color: #cecece;
        }

        .ExternalClass {
          width: 100%;
          background-color: #cecece;
        }

        body {
          width: 100%;
          height: 100%;
          background-color: #cecece;
          margin: 0;
          padding: 0;
          -webkit-font-smoothing: antialiased;
        }

        html {
          width: 100%;
        }

        img {
          border: none;
        }

        table td[class=show] {
          display: none !important;
        }

        @media only screen and (max-width: 640px) {
          body {
            width: auto !important;
          }

          table[class=full] {
            width: 100% !important;
          }

          table[class=devicewidth] {
            width: 100% !important;
            padding-left: 20px !important;
            padding-right: 20px !important;
          }

          table[class=inner] {
            width: 100% !important;
            text-align: center !important;
            clear: both;
          }

          table[class=inner-centerd] {
            width: 78% !important;
            text-align: center !important;
            clear: both;
            float: none !important;
            margin: 0 auto !important;
          }

          table td[class=hide],
          .hide {
            display: none !important;
          }

          table td[class=show],
          .show {
            display: block !important;
          }

          img[class=responsiveimg] {
            width: 100% !important;
            height: atuo !important;
            display: block !important;
          }

          table[class=btnalign] {
            float: left !important;
          }

          table[class=btnaligncenter] {
            float: none !important;
            margin: 0 auto !important;
          }

          table td[class=textalignleft] {
            text-align: left !important;
            padding: 0 !important;
          }

          table td[class=textaligcenter] {
            text-align: center !important;
          }

          table td[class=heightsmalldevices] {
            height: 45px !important;
          }

          table td[class=heightSDBottom] {
            height: 28px !important;
          }

          table[class=adjustblock] {
            width: 87% !important;
          }

          table[class=resizeblock] {
            width: 92% !important;
          }

          table td[class=smallfont] {
            font-size: 8px !important;
          }
        }

        @media only screen and (max-width: 520px) {
          table td[class=heading] {
            font-size: 24px !important;
          }

          table td[class=heading01] {
            font-size: 18px !important;
          }

          table td[class=heading02] {
            font-size: 27px !important;
          }

          table td[class=text01] {
            font-size: 22px !important;
          }

          table[class="full mhide"],
          table tr[class=mhide] {
            display: none !important;
          }
        }

        @media only screen and (max-width: 480px) {
          table {
            border-collapse: collapse;
          }

          table[id=colaps-inhiret01],
          table[id=colaps-inhiret02],
          table[id=colaps-inhiret03],
          table[id=colaps-inhiret04],
          table[id=colaps-inhiret05],
          table[id=colaps-inhiret06],
          table[id=colaps-inhiret07],
          table[id=colaps-inhiret08],
          table[id=colaps-inhiret09] {
            border-collapse: inherit !important;
          }
        }
    </style>
</head>

<body style="background-color: #cecece;">

<table width="100%" border="0" cellspacing="0" cellpadding="0" align="center" class="full">
    <tr>
        <td align="center">
            <table width="600" border="0" cellspacing="0" cellpadding="0" align="center" class="devicewidth">
                <tr>
                    <td>
                        <table width="100%" bgcolor="#f8f8f8" border="0" cellspacing="0" cellpadding="0" align="center"
                               class="full" style="text-align:center; border-bottom:1px solid #e5e5e5;">
                            <tr>
                                <td
                                        style="font:700 30px 'Montserrat', Helvetica, Arial, sans-serif; color:rgb(	34, 59, 121); text-transform:uppercase; padding:0 5% 0 5%;">
                                    STYLISIMO
                                </td>
                            </tr>
                            <tr>
                                <td class="heightSDBottom" height="55">&nbsp;</td>
                            </tr>
                            <tr>
                                <td>
                                    <table width="100%" align="center" bgcolor="#ffffff" border="0" cellspacing="0"
                                           cellpadding="0"
                                           style="border-collapse:collapse;  text-align:center;"
                                           class="adjustblock">
                                        <tr>
                                            <td style="font:20px Arial, Helvetica, sans-serif; color:#5c5c5c;">
                                                Hi, We
                                                got a request to
                                                reset your password. 
                                            </td>
                                        </tr>
                                        <tr>
                                            <td class="heightSDBottom" height="55">&nbsp;</td>
                                        </tr>
                                        <tr>
                                            <td align="center">
                                                <table width="250" align="center" border="0" cellspacing="0"
                                                       cellpadding="0"
                                                       style="border-collapse:collapse;  text-align:center;">
                                                    <tbody>
                                                    <tr>
                                                        <td align="center" bgcolor="#F0F8FF" style="border-radius:28px; "
                                                            height="61">
                                                            <a href="http://localhost:4200/resetPassword/${token}"
                                                               style="font:700 16px/61px 'Montserrat', Helvetica, Arial, sans-serif; color:rgb(	34, 59, 121); text-decoration:none; display:block; overflow:hidden; outline:none;">RESET
                                                                PASSWORD</a>
                                                        </td>
                                                    </tr>
                                                    </tbody>
                                                </table>
                                            </td>
                                        </tr>
                                        
                                    </table>
                                </td>
                            </tr>
                            <tr>
                                <td height="11"></td>
                            </tr>
                            <tr>
                                <td>
                                    <table width="100%" align="center" bgcolor="#f8f8f8" border="0" cellspacing="0"
                                           cellpadding="0"
                                           style="border-collapse:collapse;  text-align:center;"
                                           class="adjustblock">
                                        <tr>
                                            <td height="10"></td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <table width="96%" align="center" border="0" cellspacing="0"
                                                       cellpadding="0"
                                                       style="border-collapse:collapse;  text-align:center;"
                                                       class="resizeblock">
                                                    <tr>
                                                        <td width="12">&nbsp;</td>
                                                        <td>
                                                            <table width="100%" align="center" border="0"
                                                                   cellspacing="0" cellpadding="0"
                                                                   style="border-collapse:collapse;  text-align:center;"
                                                                   class="inner">
                                                                <tr>
                                                                    <!--<td style="font:14px Arial, Helvetica, sans-serif; color:#5c5c5c;">
                                                                        Please be aware that the OTP code you receive is
                                                                        only valid for 1 minute. If one minute elapses
                                                                        before you
                                                                        can use the OTP, you'll need to generate a new
                                                                        one for verification.
                                                                    </td> -->
                                                                </tr>

                                                            </table>
                                                        </td>
                                                        <td width="12">&nbsp;</td>
                                                    </tr>
                                                </table>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td height="10"></td>
                                        </tr>
                                    </table>
                                </td>
                            </tr>
                            <tr>
                                <td height="11"></td>
                            </tr>
                        </table>
                    </td>
                </tr>
            </table>
        </td>
    </tr>
</table>

<table width="100%" border="0" cellspacing="0" cellpadding="0" align="center" class="full">
    <tr>
        <td align="center">
            <table width="600" border="0" cellspacing="0" cellpadding="0" align="center" class="devicewidth">
                <tr>
                    <td>
                        <table width="100%" bgcolor="#b5637e" border="0" cellspacing="0" cellpadding="0" align="center"
                               class="full" style="border-radius:0 0 5px 5px;">
                            <tr>
                                <td height="18">&nbsp;</td>
                            </tr>
                            <tr>
                                <td>
                                    <table width="340" border="0" cellspacing="0" cellpadding="0" align="right"
                                           style="border-collapse:collapse;  text-align:center;"
                                           class="inner">
                                        <tr>
                                            <td width="21">&nbsp;</td>
                                            <td>
                                                <table width="100%" border="0" cellspacing="0" cellpadding="0"
                                                       align="center">
                                                    <tr>
                                                        <td>
                                                            <table width="100%" border="0" cellspacing="0"
                                                                   cellpadding="0" align="center"
                                                                   class="full">
                                                                <tr>
                                                                    <td align="center"
                                                                        style="font:11px Helvetica,  Arial, sans-serif; color:#383838;">
                                                                        <a style="color:#ffffff; text-decoration:none;"
                                                                           href="#"> View in browser</a>
                                                                    </td>
                                                                    <td style="color:#ffffff;"> |</td>
                                                                    <td align="center"
                                                                        style="font:11px Helvetica,  Arial, sans-serif; color:#383838;">
                                                                        <a style="color:#ffffff; text-decoration:none;"
                                                                           href="#"> Unsubscribe</a>
                                                                    </td>
                                                                    <td style="color:#ffffff;"> |</td>
                                                                    <td align="center"
                                                                        style="font:11px Helvetica,  Arial, sans-serif; color:#383838;">
                                                                        <a style="color:#ffffff; text-decoration:none;"
                                                                           href="#"> Send to a friend</a>
                                                                    </td>
                                                                    <td class="hide" width="40" align="right">&nbsp;
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td height="18">&nbsp;</td>
                                                                </tr>
                                                            </table>

                                                        </td>
                                                    </tr>
                                                </table>

                                            </td>
                                        </tr>
                                    </table>
                                    <table width="230" border="0" cellspacing="0" cellpadding="0" align="left"
                                           style="border-collapse:collapse; text-align:center;"
                                           class="inner">
                                        <tr>
                                            <td width="21">&nbsp;</td>
                                            <td>
                                                <table width="100%" border="0" cellspacing="0" cellpadding="0"
                                                       align="center">
                                                    <tr>
                                                        <td align="center"
                                                            style="font:11px Helvetica,  Arial, sans-serif; color:#ffffff;">
                                                            &copy;
                                                            All rights reserved
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td height="18">&nbsp;</td>
                                                    </tr>
                                                </table>

                                            </td>
                                            <td width="21">&nbsp;</td>
                                        </tr>
                                    </table>

                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
                <tr class="mhide">
                    <td height="100">&nbsp;</td>
                </tr>
            </table>
        </td>
    </tr>
</table>
</body>

</html>`
      };
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error("Error sending email: ", error);
        } else {
          console.log("Email sent: ", info.response);
        }
      });
      res.status(200).json({ message: 'Password reset email sent' });
} catch (error) {
  res.status(500).json({ message: 'Internal Server Error', error });
}
}
const resetPassword = async (req,res) => {
  const { token } = req.params; 
  const { newPassword } = req.body;


  const user = await User.findOne({ where: { passwordResetToken: token } });
  
  if (!user) {
    return res.status(400).json({ message: 'Invalid or expired token' });
  }

 
  const hashedPassword = await bcrypt.hash(newPassword, 10);
  await user.update({ password: hashedPassword, passwordResetToken: null }); 

  return res.status(200).json({ message: 'Password reset successfully' });

}


async function countUsers(req, res) {
  try {

    const userCount = await User.count();
    res.status(200).json({ count: userCount });
  } catch (error) {
    console.error('Error counting users:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

module.exports = { register ,sendOtp ,verifyAccount,login,resetPasswordRequest,resetPassword,countUsers,checkEmail }