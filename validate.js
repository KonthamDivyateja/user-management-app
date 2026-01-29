export const validateUser = (req, res, next) => {
  const { name, email, password, age } = req.body;

  if (!name || name.trim() === "")
    return res.status(400).json({ message: "Name is required" });

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailRegex.test(email))
    return res.status(400).json({ message: "Invalid email format" });

  if (!password || password.length < 8)
    return res.status(400).json({ message: "Password must be at least 8 characters" });

  if (age && age < 18)
    return res.status(400).json({ message: "Age must be 18 or above" });

  next();
};
