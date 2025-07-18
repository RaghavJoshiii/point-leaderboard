// Import necessary hooks and components from React and other files
import { useEffect, useState } from 'react';
import { UserSelector } from './components/UserSelector';
import { AddUser } from './components/AddUser';
import { ClaimButton } from './components/ClaimButton';
import { Leaderboard } from './components/Leaderboard';
import axios from 'axios'; // Axios is used for making HTTP requests

export default function App() {
  // State to store all users
  const [users, setUsers] = useState([]);

  // State to track the currently selected user's ID
  const [selectedUserId, setSelectedUserId] = useState('');

  // Function to fetch users from the backend API
  async function fetchUsers() {
    try {
      // Make a GET request to fetch the leaderboard data
      const res = await axios.get('http://localhost:3000/api/leaderboard');
      // Update the users state with the fetched data
      setUsers(res.data);
    } catch (error) {
      // Log any error that occurs during the request
      console.error("Error fetching users", error);
    }
  }

  // useEffect hook runs fetchUsers once when the component mounts
  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    // Container div with styling and layout
    <div className="min-h-screen p-4 sm:p-8 bg-slate-900 text-white flex flex-col items-center ">
      
      {/* Page title */}
      <h1 className="text-3xl font-bold mb-4 text-indigo-400">Points Leaderboard</h1>

      {/* Wrapper for form and buttons */}
      <div className="w-full max-w-md flex flex-col items-center">
        
        {/* Section for adding a new user */}
        <h2 className=' font-bold'>Add new user</h2>
        <AddUser onUserAdded={() => fetchUsers()} />

        {/* Section for assigning points to a selected user */}
        <h2 className='mt-4 font-bold'>Give points to selected user</h2>
        <div>
          {/* Dropdown to select a user */}
          <UserSelector
            users={users}
            selectedUserId={selectedUserId}
            setSelectedUserId={setSelectedUserId}
          />

          {/* Button to claim/give points to the selected user */}
          <ClaimButton
            selectedUserId={selectedUserId}
            onClaimed={() => fetchUsers()}
          />
        </div> 
      </div>

      {/* Component to display the leaderboard */}
      <Leaderboard users={users} />
    </div>
  );
}
