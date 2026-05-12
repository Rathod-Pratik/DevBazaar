import ContectModel from './Contect.Model.js'
import { contactCreateSchema, idSchema } from './Contect.Validation.js'

export  const CreateContect=async(req, res) => {
  try {
    const validation = contactCreateSchema.safeParse(req.body);

    if (!validation.success) {
      return res.status(400).json({
        success: false,
        message: validation.error.errors.map(e => e.message).join(', '),
      });
    }

    const { name, email, number, message, userInfo } = validation.data;

    await ContectModel.create({ name, email, number, message, userInfo });
    return res.status(200).json({ success: true, message: "Message sent successfully!" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
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
    try {
      const validation = idSchema.safeParse(req.params);

      if (!validation.success) {
        return res.status(400).json({
          success: false,
          message: validation.error.errors.map(e => e.message).join(', '),
        });
      }

      const { _id } = validation.data;

      const deleted = await ContectModel.findByIdAndDelete(_id);
      if (!deleted) {
        return res.status(404).json({ success: false, message: 'Contact not found' });
      }

      return res.status(200).json({ success: true, message: 'Contact deleted successfully' });
    } catch (error) {
      return res.status(500).json({ success: false, message: error.message });
    }
  };