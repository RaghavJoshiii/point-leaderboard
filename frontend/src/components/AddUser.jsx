import { useState } from 'react';
import axios from 'axios';

// Component to add a new user
export function AddUser({ onUserAdded }) {
  const [name, setName] = useState(''); // State to hold the input field value

  // Function to handle adding a user when the button is clicked or enter is pressed
  async function handleAdd() {
    // Prevent adding empty or whitespace-only names
    if (!name.trim()) return;

    try {
      // Send POST request to the backend to add the user
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/users`, {
        name:name.trim()
      });

      const newUser = res.data; // Response contains the newly created user
      setName(''); // Clear the input field
      onUserAdded(newUser); // Notify the parent component to update the UI
    } catch (error) {
      console.error('Error adding user:', error); // Log any errors
    }
  }

  // Function to handle "Enter" key press in the input field
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleAdd(); // Trigger the same add user logic on Enter key
    }
  };

  return (
    // Container with horizontal spacing between input and button
    <div className="flex gap-2 mt-2">
      {/* Input field for entering user name */}
      <input
        className="p-2 rounded bg-slate-700 text-white w-full sm:w-auto"
        placeholder="Enter name"
        value={name}
        onChange={(e) => setName(e.target.value)} // Update state on input change
        onKeyDown={handleKeyDown} // Call handleAdd on Enter key
      />

      {/* Button to manually add the user */}
      <button
        onClick={handleAdd}
        className="bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded"
      >
        Add User
      </button>
    </div>
  );
}
