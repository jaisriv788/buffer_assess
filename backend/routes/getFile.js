const User = require("../modal/person.modal");

const getFile = async (req, res) => {
  try {
    const { email, fileId } = req.params;
    const decodedEmail = decodeURIComponent(email);

    console.log(decodedEmail);
    const user = await User.findOne({ email: decodedEmail });

    if (!user) {
      return res.status(404).json({ error: "User not found with this email" });
    }

    const file = user.files.id(fileId);
    if (!file) {
      return res.status(404).json({ error: "File not found" });
    }

    res.set({
      "Content-Type": file.mimetype,
      "Content-Length": file.size,
      "Content-Disposition": `inline; filename="${file.originalname}"`,
      "Cache-Control": "public, max-age=31536000",
    });

    res.send(file.data);
  } catch (error) {
    console.error("Error serving file:", error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = getFile;
