export default function handler(req, res) {

    let pincode = {
      "110001":["New Delhi", "New Delhi"] ,
      "400001":["Bangalore", "Karnataka"] ,
      "700001":["Kolkata", "West Bengal"] ,
      "600001":["Chennai", "Tamil Nadu"] ,
      "431001":["Aurangabad", "Maharastra"] ,

    }
    res.status(200).json(pincode);
  }