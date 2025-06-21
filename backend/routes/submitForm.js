const User = require("../modal/person.modal");

const submitForm = async (req, res) => {
  
  try {
    const {
      firstName,
      lastName,
      email,
      dateOfBirth,
      residentialStreet1,
      residentialStreet2,
      permanentStreet1,
      permanentStreet2,
      ...restBody
    } = req.body;

    const files = req.files.map((file, index) => {
      const fileIndex = index + 1;
      return {
        fieldname: file.fieldname,
        originalname: file.originalname,
        encoding: file.encoding,
        mimetype: file.mimetype,
        data: file.buffer,
        size: file.size,
        fileName: restBody[`fileName${fileIndex}`],
        fileType: restBody[`fileType${fileIndex}`],
      };
    });

    const userData = {
      firstName,
      lastName,
      email,
      dateOfBirth: new Date(dateOfBirth),
      residentialAddress: {
        street1: residentialStreet1,
        street2: residentialStreet2 || "",
      },
      permanentAddress: {
        street1: permanentStreet1,
        street2: permanentStreet2 || "",
      },
      files,
    };

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      await User.updateOne({ email }, userData);
      res.status(200).json({
        message: "User and files updated successfully",
        userId: existingUser._id,
      });
    } else {
      const newUser = new User(userData);
      const savedUser = await newUser.save();
      res.status(201).json({
        message: "User and files saved as buffers successfully",
        userId: savedUser._id,
      });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = submitForm;
