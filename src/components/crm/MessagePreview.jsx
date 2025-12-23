export default function MessagePreview({ users, bank }) {
  const sendMessages = () => {
    users.forEach((user) => {
      const msg = bank.template
        .replace("{{name}}", user.name)
        .replace("{{link}}", bank.link);

      console.log("Sending to:", user.phone);
      console.log(msg);
    });

    alert(`Messages sent to ${users.length} users`);
  };

  return (
    <div className="bg-white rounded-xl shadow p-6">
      <h2 className="text-xl font-semibold mb-4">
        Message Preview (User-wise)
      </h2>

      <div className="space-y-4 max-h-[400px] overflow-y-auto">
        {users.map((user) => (
          <div
            key={user.id}
            className="border rounded-lg p-4 bg-gray-50"
          >
            <p className="text-sm font-medium mb-1">
              {user.name} — {user.phone}
            </p>
            <pre className="text-sm whitespace-pre-wrap">
              {bank.template
                .replace("{{name}}", user.name)
                .replace("{{link}}", bank.link)}
            </pre>
          </div>
        ))}
      </div>

      <button
        onClick={sendMessages}
        className="mt-6 bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition"
      >
        Send Messages
      </button>
    </div>
  );
}
