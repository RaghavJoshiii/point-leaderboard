// This component renders a dropdown list to select a user from the leaderboard
export function UserSelector({ users, selectedUserId, setSelectedUserId }) {
  return (
    <select
      // Styling for the dropdown using Tailwind CSS
      className="p-2 rounded m-4 bg-slate-800 text-white w-full sm:w-auto"
      
      // The current selected value in the dropdown
      value={selectedUserId}
      
      // When the selection changes, update the selected user ID in parent state
      onChange={(e) => setSelectedUserId(e.target.value)}
    >
      {/* Default option prompting the user to select someone */}
      <option value="">-- Select User --</option>

      {/* Dynamically render options for each user in the list */}
      {users.map(user => (
        <option key={user._id} value={user._id}>
          {user.name} {/* Display user's name */}
        </option>
      ))}
    </select>
  );
}
