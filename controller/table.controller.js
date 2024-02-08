const table = require("../Database/models/table.model");
const tableModel = require("../Database/models/table.model");

exports.addTable = async (req, res) => {
    const {firstName , lastName , phone , address} = req.body;
const userID = req.params.id;
console.log(userID);
if(phone.toString().length !== 10){
  return res.json({
      status : "failed",
      type : "mobile",
      message : "Invalid mobile number"
  })
}

    const addCont = new table({
        user : req.params.id,
        firstName,
        lastName,
        phone,
        address
    })
    try {
        await addCont.save();
        res.send({status : "success" , message : "Contact added successfully" , addCont})
    } catch (error) {
        res.send({status : "failed" , message : "Internal server error" , error : error.message})
    }
}
exports.getContact = async (req, res) => {

  try {
    const contact = await table.find({user : req.params.id});
    return res.json({
      status : "success",
      contact
    })
  } catch (error) {
    return res.status(500).json({
      status : "failed",
      message : "Internal server error"
    })
  }
}

exports.updateContact = async (req, res) => {
    const {firstName , lastName , phone , address} = req.body;
    
    try {
        const userId = req.params.id;
        const userExist = await table.findById(userId);
        if(!userExist){
          return res.json({
            status : "failed",
            message : "Contact not found"
          })
        }
    const updatecontact =  await table.findByIdAndUpdate( userId , {firstName , lastName , phone , address} );
   
    await updatecontact.save();
      return res.json({
        updatecontact,
        status : "success",
        message : "Contact updated successfully"
      })
    } catch (error) {
      return res.status(500).json({
        error : error.message,
        status : "failed",
        message : "Internal server error"
      })
    }
}

exports.deleteContact = async (req, res) => {

  try {
    const contact =  await table.findByIdAndDelete(req.params.id);
    
   
    return res.json({
      status : "success",
      message : "Contact deleted successfully"
    })
  } catch (error) {
    return res.status(500).json({
      status : "failed",
      error : error.message,
      message : "Internal server error"
    })
  }
}