import { useState } from "react";
import { ArrowUp } from "lucide-react";
import axios from "axios";

export default function Component() {
  const [sameAsResidential, setSameAsResidential] = useState(false);
  const [fileType1, setFileType1] = useState("images");
  const [fileType2, setFileType2] = useState("images");
  const [ageError, setAgeError] = useState("");
  const [additionalUploads, setAdditionalUploads] = useState([]);
  const [nextId, setNextId] = useState(3);

  const calculateAge = (dateOfBirth) => {
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }

    return age;
  };

  const validateAge = (dateOfBirth) => {
    if (!dateOfBirth) return false;

    const age = calculateAge(dateOfBirth);
    if (age < 18) {
      setAgeError(
        `You must be at least 18 years old to submit this form. Your current age is ${age} years.`
      );
      return false;
    }

    setAgeError("");
    return true;
  };

  const handleDateOfBirthChange = (e) => {
    const dateOfBirth = e.target.value;
    if (dateOfBirth) {
      validateAge(dateOfBirth);
    } else {
      setAgeError("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    const dateOfBirth = data.dateOfBirth;
    if (!validateAge(dateOfBirth)) {
      document.getElementById("dateOfBirth").scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
      return;
    }
    // for (let [key, value] of formData.entries()) {
    //   console.log(`${key}: ${value}`);
    // }
    try {
      const res = await axios.post(
        "https://buffer-assess.onrender.com/submitForm",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Server response:", res.data);
      alert("Form Submitted Successfully.")
      e.target.reset();
    } catch (error) {
      console.error(
        "Error submitting form:",
        error.response?.data || error.message
      );
    }
  };

  const addUploadSection = () => {
    const newUpload = {
      id: nextId,
      fileType: "images",
    };
    setAdditionalUploads([...additionalUploads, newUpload]);
    setNextId(nextId + 1);
  };

  const removeUploadSection = (id) => {
    setAdditionalUploads(
      additionalUploads.filter((upload) => upload.id !== id)
    );
  };

  const updateFileType = (id, newFileType) => {
    setAdditionalUploads(
      additionalUploads.map((upload) =>
        upload.id === id ? { ...upload, fileType: newFileType } : upload
      )
    );
  };

  function showHero() {
    const page = document.getElementById("hero");
    page.scrollIntoView();
  }

  return (
    <section id="form" className="relative">
      <div
        onClick={showHero}
        className="absolute hidden lg:block cursor-pointer  right-5 bottom-5 bg-[#1e293b] text-white p-2 rounded-lg"
      >
        <ArrowUp />
      </div>
      <div className="min-h-screen bg-gray-50 py-4 sm:py-8 px-2 sm:px-4">
        <div className="max-w-5xl mx-auto px-2 sm:px-0">
          <div className="bg-white rounded-lg shadow-md border border-gray-200">
            <div className="px-6 py-4 border-b border-gray-200">
              <h1 className="text-2xl font-bold text-center text-gray-900">
                Professional Information Form
              </h1>
              <p className="text-center text-gray-600 mt-2">
                Please fill out all required fields marked with{" "}
                <span className="text-red-500">*</span>
              </p>
            </div>
            <div className="p-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">
                    Personal Information
                  </h3>

                  <div className="flex flex-col sm:flex-row flex-wrap gap-4">
                    <div className="flex-1 min-w-0 sm:min-w-[200px] space-y-2">
                      <label
                        htmlFor="firstName"
                        className="block text-sm font-medium text-gray-700"
                      >
                        First Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="firstName"
                        name="firstName"
                        type="text"
                        placeholder="Enter your first name"
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                      />
                    </div>

                    <div className="flex-1 min-w-0 sm:min-w-[200px] space-y-2">
                      <label
                        htmlFor="lastName"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Last Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="lastName"
                        name="lastName"
                        type="text"
                        placeholder="Enter your last name"
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row flex-wrap gap-4">
                    <div className="flex-1 min-w-0 sm:min-w-[200px] space-y-2">
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Email <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="ex: myname@example.com"
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                      />
                    </div>

                    <div className="flex-1 min-w-0 sm:min-w-[200px] space-y-2">
                      <label
                        htmlFor="dateOfBirth"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Date of Birth <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="dateOfBirth"
                        name="dateOfBirth"
                        type="date"
                        required
                        onChange={handleDateOfBirthChange}
                        className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 transition-colors ${
                          ageError
                            ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                            : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                        }`}
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        Min. age should be 18
                      </p>
                      {ageError && (
                        <div className="mt-2 p-3 bg-red-50 border border-red-200 rounded-md">
                          <p className="text-sm text-red-600 font-medium">
                            ⚠️ Age Validation Error
                          </p>
                          <p className="text-sm text-red-600 mt-1">
                            {ageError}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">
                    Residential Address <span className="text-red-500">*</span>
                  </h3>

                  <div className="flex flex-col sm:flex-row flex-wrap gap-4">
                    <div className="flex-1 min-w-0 sm:min-w-[200px] space-y-2">
                      <label
                        htmlFor="residentialStreet1"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Street 1 <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="residentialStreet1"
                        name="residentialStreet1"
                        type="text"
                        placeholder="Enter street address"
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                      />
                    </div>

                    <div className="flex-1 min-w-0 sm:min-w-[200px] space-y-2">
                      <label
                        htmlFor="residentialStreet2"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Street 2 <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="residentialStreet2"
                        name="residentialStreet2"
                        type="text"
                        placeholder="Enter additional address details"
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-2 py-2">
                  <input
                    id="sameAsResidential"
                    type="checkbox"
                    checked={sameAsResidential}
                    onChange={(e) => setSameAsResidential(e.target.checked)}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label
                    htmlFor="sameAsResidential"
                    className="text-sm font-medium text-gray-700 cursor-pointer"
                  >
                    Permanent address is same as residential address
                  </label>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">
                    Permanent Address{" "}
                    {!sameAsResidential && (
                      <span className="text-red-500">*</span>
                    )}
                  </h3>

                  <div className="flex flex-col sm:flex-row flex-wrap gap-4">
                    <div className="flex-1 min-w-0 sm:min-w-[200px] space-y-2">
                      <label
                        htmlFor="permanentStreet1"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Street 1{" "}
                        {!sameAsResidential && (
                          <span className="text-red-500">*</span>
                        )}
                      </label>
                      <input
                        id="permanentStreet1"
                        name="permanentStreet1"
                        type="text"
                        placeholder="Enter street address"
                        required={!sameAsResidential}
                        disabled={sameAsResidential}
                        className={`w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                          sameAsResidential
                            ? "bg-gray-100 text-gray-500 cursor-not-allowed"
                            : ""
                        }`}
                      />
                    </div>

                    <div className="flex-1 min-w-0 sm:min-w-[200px] space-y-2">
                      <label
                        htmlFor="permanentStreet2"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Street 2{" "}
                        {!sameAsResidential && (
                          <span className="text-red-500">*</span>
                        )}
                      </label>
                      <input
                        id="permanentStreet2"
                        name="permanentStreet2"
                        type="text"
                        placeholder="Enter additional address details"
                        required={!sameAsResidential}
                        disabled={sameAsResidential}
                        className={`w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                          sameAsResidential
                            ? "bg-gray-100 text-gray-500 cursor-not-allowed"
                            : ""
                        }`}
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-gray-900 border-b pb-2 flex-1">
                      Upload Documents
                    </h3>
                    <button
                      type="button"
                      onClick={addUploadSection}
                      className="ml-4 bg-[#1e293b] hover:bg-gray-300 cursor-pointer hover:text-[#1e293b] text-white font-medium py-1 px-3 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors duration-200 flex items-center gap-1"
                    >
                      <span className="text-lg">+</span>
                      Add More
                    </button>
                  </div>

                  <div className="flex flex-col lg:flex-row flex-wrap gap-4 p-4 bg-[#F4F4F4] rounded-lg border border-gray-300">
                    <div className="flex-1 min-w-0 lg:min-w-[150px] space-y-2">
                      <label
                        htmlFor="fileName1"
                        className="block text-sm font-medium text-gray-700"
                      >
                        File Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="fileName1"
                        name="fileName1"
                        type="text"
                        placeholder="Enter file name"
                        required
                        className="w-full h-[42px] px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                      />
                    </div>

                    <div className="flex-1 min-w-0 lg:min-w-[120px] space-y-2">
                      <label
                        htmlFor="fileType1"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Type of File <span className="text-red-500">*</span>
                      </label>
                      <select
                        id="fileType1"
                        name="fileType1"
                        value={fileType1}
                        onChange={(e) => setFileType1(e.target.value)}
                        required
                        className="w-full h-[42px] px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                      >
                        <option value="images">Images</option>
                        <option value="pdf">PDF</option>
                      </select>
                    </div>

                    <div className="flex-1 min-w-0 lg:min-w-[180px] space-y-2">
                      <label
                        htmlFor="uploadDocument1"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Upload Document <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="uploadDocument1"
                        name="uploadDocument1"
                        type="file"
                        accept={
                          fileType1 === "images" ? "image/*" : "application/pdf"
                        }
                        required
                        className="w-full h-[42px] px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors file:mr-4 file:py-1 file:px-2 file:rounded file:border-0 file:text-sm file:font-medium file:bg-white file:text-black hover:file:bg-gray-100 hover:cursor-pointer"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col lg:flex-row flex-wrap gap-4 p-4 bg-[#F4F4F4] rounded-lg border border-gray-400">
                    <div className="flex-1 min-w-0 lg:min-w-[150px] space-y-2">
                      <label
                        htmlFor="fileName2"
                        className="block text-sm font-medium text-gray-700"
                      >
                        File Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="fileName2"
                        name="fileName2"
                        type="text"
                        placeholder="Enter file name"
                        required
                        className="w-full h-[42px] px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                      />
                    </div>

                    <div className="flex-1 min-w-0 lg:min-w-[120px] space-y-2">
                      <label
                        htmlFor="fileType2"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Type of File <span className="text-red-500">*</span>
                      </label>
                      <select
                        id="fileType2"
                        name="fileType2"
                        value={fileType2}
                        onChange={(e) => setFileType2(e.target.value)}
                        required
                        className="w-full h-[42px] px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                      >
                        <option value="images">Images</option>
                        <option value="pdf">PDF</option>
                      </select>
                    </div>

                    <div className="flex-1 min-w-0 lg:min-w-[180px] space-y-2">
                      <label
                        htmlFor="uploadDocument2"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Upload Document <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="uploadDocument2"
                        name="uploadDocument2"
                        type="file"
                        accept={
                          fileType2 === "images" ? "image/*" : "application/pdf"
                        }
                        required
                        className="w-full h-[42px] px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors file:mr-4 file:py-1 file:px-2 file:rounded file:border-0 file:text-sm file:font-medium file:bg-white file:text-black hover:file:bg-gray-100 hover:cursor-pointer"
                      />
                    </div>
                  </div>

                  {additionalUploads.map((upload) => (
                    <div
                      key={upload.id}
                      className="flex flex-col lg:flex-row flex-wrap gap-4 p-4 bg-gray-50 rounded-lg border border-gray-200 relative"
                    >
                      <div className="flex-1 min-w-0 lg:min-w-[150px] space-y-2">
                        <label
                          htmlFor={`fileName${upload.id}`}
                          className="block text-sm font-medium text-gray-700"
                        >
                          File Name
                        </label>
                        <input
                          id={`fileName${upload.id}`}
                          name={`fileName${upload.id}`}
                          type="text"
                          placeholder="Enter file name"
                          className="w-full h-[42px] px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                        />
                      </div>

                      <div className="flex-1 min-w-0 lg:min-w-[120px] space-y-2">
                        <label
                          htmlFor={`fileType${upload.id}`}
                          className="block text-sm font-medium text-gray-700"
                        >
                          Type of File
                        </label>
                        <select
                          id={`fileType${upload.id}`}
                          name={`fileType${upload.id}`}
                          value={upload.fileType}
                          onChange={(e) =>
                            updateFileType(upload.id, e.target.value)
                          }
                          className="w-full h-[42px] px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                        >
                          <option value="images">Images</option>
                          <option value="pdf">PDF</option>
                        </select>
                      </div>

                      <div className="flex-1 min-w-0 lg:min-w-[180px] space-y-2">
                        <label
                          htmlFor={`uploadDocument${upload.id}`}
                          className="block text-sm font-medium text-gray-700"
                        >
                          Upload Document
                        </label>
                        <input
                          id={`uploadDocument${upload.id}`}
                          name={`uploadDocument${upload.id}`}
                          type="file"
                          accept={
                            upload.fileType === "images"
                              ? "image/*"
                              : "application/pdf"
                          }
                          className="w-full h-[42px] px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors file:mr-4 file:py-1 file:px-2 file:rounded file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                        />
                      </div>

                      <button
                        type="button"
                        onClick={() => removeUploadSection(upload.id)}
                        className="absolute top-2 right-2 bg-red-600 hover:bg-red-700 text-white font-medium py-1 px-2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors duration-200 text-sm"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>

                <div className="pt-6">
                  <button
                    type="submit"
                    className={`w-full font-medium py-2 px-4 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors duration-200 ${
                      ageError
                        ? "bg-gray-400 cursor-not-allowed text-gray-600"
                        : "bg-[#1e293b] cursor-pointer hover:bg-blue-700 text-white focus:ring-blue-500"
                    }`}
                    disabled={!!ageError}
                  >
                    {ageError
                      ? "Please Fix Age Validation Error"
                      : "Submit Form"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
