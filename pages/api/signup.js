import connectdb from "@/middleware/mongoose";
import User from "@/models/User";
var CryptoJS = require("crypto-js");

const handler = async (req, res)=> {

    if(req.method == 'POST')
    {
        // console.log(process.env.AES_SECRET)
        const {name,email} = req.body

        let u = new User({name,email,password:CryptoJS.AES.encrypt(req.body.password,process.env.AES_SECRET).toString()})
        await u.save()
        res.status(200).json({success:true})
    }
    else
    {
        res.status(400).json({error:"This method is not allowed"})
    }
  }

export default connectdb(handler)