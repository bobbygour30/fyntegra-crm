import api from "../../api/api";

export default function MessagePreview({ users, bank }) {
  const send = async () => {
    await api.post("/campaigns/send", {
      message: bank.template,
      recipients: users.map((u) => u.phone),
    });

    alert("Message request sent. Delivery depends on operator & DND.");
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow">
      {users.map((u) => (
        <div key={u._id} className="mb-3">
          <strong>{u.name}</strong>
          <pre className="bg-gray-100 p-3 rounded mt-1">
            {bank.template
              .replace("{{name}}", u.name)
              .replace("{{link}}", bank.link)}
          </pre>
        </div>
      ))}

      <button onClick={send} className="btn-primary mt-4">
        Send Messages
      </button>
    </div>
  );
}
