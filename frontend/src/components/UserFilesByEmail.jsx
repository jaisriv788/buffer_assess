import { useState, useEffect } from "react";
import FileItem from "./FileItem";

const UserFilesByEmail = ({ userEmail }) => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_BASE_URL = "https://buffer-assess.onrender.com";

  useEffect(() => {
    const fetchUserFiles = async () => {
      try {
        setLoading(true);
        setError(null);

        const url = `${API_BASE_URL}/api/user/email/${encodeURIComponent(
          userEmail
        )}/files`;
        console.log(url);

        const response = await fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        console.log("Response status:", response.status);
        console.log("Response headers:", response.headers.get("content-type"));

        if (!response.ok) {
          const errorText = await response.text();
          console.log("Error response:", errorText);
          throw new Error(`HTTP ${response.status}: ${errorText}`);
        }

        const contentType = response.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
          const responseText = await response.text();
          console.log("Non-JSON response:", responseText);
          throw new Error("Server returned non-JSON response");
        }

        const data = await response.json();
        console.log("Received data:", data);

        if (data.success) {
          setUserData(data.user);
        } else {
          throw new Error(data.error || "Unknown error");
        }
      } catch (err) {
        console.error("Fetch error:", err);
        setError(err.message);
        setUserData(null);
      } finally {
        setLoading(false);
      }
    };

    if (userEmail) {
      fetchUserFiles();
    }
  }, [userEmail]);

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-md p-8">
        <div className="flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <span className="ml-3 text-gray-600">Loading user files...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-lg shadow-md p-8">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg
                className="h-5 w-5 text-red-400"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">Error</h3>
              <p className="text-sm text-red-700 mt-1">{error}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!userData) {
    return (
      <div className="bg-white rounded-lg shadow-md p-8">
        <div className="text-center text-gray-500">
          <svg
            className="mx-auto h-12 w-12 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
          <p className="mt-2">No user data found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-8">
      <div className="border-b border-gray-200 pb-6 mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Files for {userData.firstName} {userData.lastName}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center">
            <span className="text-sm font-medium text-gray-500 mr-2">
              Email:
            </span>
            <span className="text-sm text-gray-900">{userData.email}</span>
          </div>
          <div className="flex items-center">
            <span className="text-sm font-medium text-gray-500 mr-2">
              Total Files:
            </span>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
              {userData.filesCount}
            </span>
          </div>
        </div>
      </div>

      {userData.files.length === 0 ? (
        <div className="text-center py-12">
          <svg
            className="mx-auto h-12 w-12 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
            />
          </svg>
          <p className="mt-2 text-sm text-gray-500">
            No files uploaded by this user.
          </p>
        </div>
      ) : (
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Uploaded Files ({userData.files.length})
          </h3>
          <div className="space-y-4">
            {userData.files.map((file) => (
              <FileItem
                key={file._id}
                file={file}
                userEmail={userEmail}
                apiBaseUrl={API_BASE_URL}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserFilesByEmail;
