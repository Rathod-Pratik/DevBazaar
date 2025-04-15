import ContectModel from '../model/ContectModel.js'

export async function CreateContect(req, res) {

    const { name, email, number, message,userInfo } = req.body;

    if (!name || !email || !number || !message || !userInfo) {
        return res.status(400).json({ message: "All fields are required" });
    }

    await ContectModel.create({
      name,
      email,
      number,
      message,
      userInfo
    });
    res.status(200).json({ message: "Message sent successfully!" });
  };

  export const GetContact=async(req,res)=>{
    try {
      const Contect=await ContectModel.find();
      if(Contect.length<0){
        return res.status(200).send("No contact is found")
      }
      else{
        return res.status(200).json({Contect})
      }
    } catch (error) {
      return res.status(400).json({message:error})
    }
  }

  export const DeleteContact=async(req,res)=>{
    const {_id}=req.params;

    if(_id){
      return res.status(400).send("_id is required")
    }
    try {
      const Delete=await ContectModel.findByIdAndDelete(_id);
      if(Delete){
        return res.status(200).send("Contact Deleted Successfully")
      }
    } catch (error) {
      return res.status(400).json({error})
    }
  }

