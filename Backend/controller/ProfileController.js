const User = require("../model/UserModel");

async function UpdateProfile(req, res) {
    try {
        
  
  const {
    firstname,
    email,
    lastname,
    address,
    Oldpassword,
    NewPassword,
    user,
  } = req.body;

  const userName = await User.findOne({ email });
  if (!userName) {
    return res.status(400).json({ message: "User not found" });
  }
  // Validate password
  const isMatch = await bcrypt.compare(Oldpassword, user.password);
  if (!isMatch) {
    return res.status(400).json({ error: "Invalid credentials" });
  }

  // Create JWT token
  const tokenPayload = { id: user.id }; // Minimal payload for security
  const token = jwt.sign(tokenPayload, process.env.JWT_SECRET, {
    expiresIn: "1d", // Matches cookie lifetime
  });

  // Set the token in a secure cookie
  res.cookie("jwt", token, {
    httpOnly: true,
    secure: true, // Use HTTPS in production
    sameSite: "strict",
    maxAge: 24 * 60 * 60 * 1000, // 1 day
  });

  const updateData=User.updateOne(
    { email: user.email },
    {
      $set: {
        firstname: firstname,
        email: email,
        lastname: lastname,
        address: address,
        password: NewPassword,
      },
    }
  );

  if(updateData){
    res.status(201).json({ message: "Profile Updated" });
  }
  else{
    res.status(400).json({ message: "Profile not Updated" });
  }
} catch (error) {
        console.log("Error during profile update:", error.message);
}
}
