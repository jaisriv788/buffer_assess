const User = require("../modal/person.modal");

const getdetails = async (req, res) => {
  try {
    const email = req.params.email;

    const user = await User.findOne({ email: email });

    if (!user) {
      return res.status(404).json({ error: "User not found with this email" });
    }

    const filesWithUrls = user.files.map((file) => ({
      _id: file._id,
      originalname: file.originalname,
      fileName: file.fileName,
      fileType: file.fileType,
      mimetype: file.mimetype,
      size: file.size,
      uploadDate: file._id.getTimestamp(),
      url: `/api/file/email/${email}/${file._id}`,
    }));

    res.json({
      success: true,
      user: {
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        dateOfBirth: user.dateOfBirth,
        filesCount: user.files.length,
        files: filesWithUrls,
      },
    });
  } catch (error) {
    console.error("Error fetching user files:", error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = getdetails;
