import { useState } from "react";
import UserFilesByEmail from "../components/UserFilesByEmail";

const App = () => {
  const [email, setEmail] = useState("");
  const [searchEmail, setSearchEmail] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchEmail(email);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">Find User Files by Email</h1>

          <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter user email"
              required
              className="w-full sm:w-80 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200"
            />
            <button
              type="submit"
              className="w-full sm:w-auto px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Search Files
            </button>
          </form>
        </div>

        {searchEmail && <UserFilesByEmail userEmail={searchEmail} />}
      </div>
    </div>
  );
};

export default App;
