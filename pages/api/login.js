import connectdb from "@/middleware/mongoose";
import User from "@/models/User";
var CryptoJS = require("crypto-js");
var jwt = require('jsonwebtoken');

const handler = async (req, res)=> {

    if(req.method == 'POST')
    {
        // console.log(req.body)

        let user = await User.findOne({"email" : req.body.email})

        if(user)
        {
            const bytes  = CryptoJS.AES.decrypt(user.password,process.env.AES_SECRET)
            let unhashedpass = bytes.toString(CryptoJS.enc.Utf8)

            if(req.body.email == user.email && req.body.password == unhashedpass){
                
                var token = jwt.sign({email:user.email, name:user.name }, process.env.JWT_SECRET, {
                    expiresIn:'2d'
                });
                
                var email = user.email
                res.status(200).json({success:true, token,email})
            }
            else
            {
                res.status(200).json({success:false, error:"Invalid credentials"})
            }
        }
        else
        {
            res.status(200).json({success:false, error:"User dosen't exists"})
        }
    }
    else
    {
        res.status(400).json({error:"This method is not allowed"})
    }
  }

export default connectdb(handler)