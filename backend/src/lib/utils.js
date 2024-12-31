const generateToken = (userId, res) => {
  const JWTKey = process.env.JWT_SECRET;

  const token = jwt.sign({ id: userId }, JWTKey, { expiresIn: "7d" });
  res.cookie("token", token, {
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV !== "development",
  });

  return token;
};
