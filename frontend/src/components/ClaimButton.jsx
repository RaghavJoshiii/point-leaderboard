import axios from "axios";

export function ClaimButton({ selectedUserId, onClaimed }) {
  async function claimPoints() {
    if (!selectedUserId) return alert("Select a user first.");
    try{
    const res = await axios.post(`${import.meta.env.VITE_API_URL}/claim/${selectedUserId}`);
    onClaimed(res.data);
    } catch(error){
        console.error("Error claiming points",error);
    }
  }

  return (
    <button
      onClick={claimPoints}
      className="m-4 bg-violet-600 hover:bg-violet-700 px-4 py-2 rounded"
    >
      Claim Points
    </button>
  );
}
