import jwt from 'jsonwebtoken'

export const verifyAdmin = (req, res, next) => {
  const token = req.cookies.auth;
  if (!token) {
    return res.status(403).json({ error: "token required" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (decoded.role !== "admin") {
      return res.status(403).json({ error: "Unauthorized access" });
    } else {
       req.user = decoded;
    }
    next();
  } catch (err) {
    return res.status(401).json({ error: "Invalid or expired token" });
  }
};

export const verifyUser = (req, res, next) => {
  const token = req.cookies.auth;
  if (!token) {
    return res.status(403).json({ error: "token required" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (decoded.role !== "user") {
      return res.status(403).json({ error: "Unauthorized access" });
    }
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ error: "Invalid or expired token" });
  }
};