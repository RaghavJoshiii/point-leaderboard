export function Leaderboard({ users }) {
  return (
    <div className="mt-6 w-full overflow-auto">
      <h2 className="text-xl font-bold mb-2">🏆 Leaderboard</h2>
      <table className="w-full table-auto bg-slate-800 rounded">
        <thead>
          <tr className="text-left bg-slate-700">
            <th className="p-2">Rank</th>
            <th className="p-2">User</th>
            <th className="p-2">Points</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, i) => {
            let rowStyle = '';
            if (i === 0) rowStyle = 'bg-yellow-500 text-black font-bold';       // 🥇 Gold
            else if (i === 1) rowStyle = 'bg-gray-300 text-black font-semibold'; // 🥈 Silver
            else if (i === 2) rowStyle = 'bg-amber-700 text-white font-semibold';// 🥉 Bronze
            else rowStyle = 'hover:bg-slate-700'; // Default for rest

            return (
              <tr key={user._id} className={rowStyle}>
                <td className="p-2">{i + 1}</td>
                <td className="p-2">{user.name}</td>
                <td className="p-2">{user.totalPoints}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
