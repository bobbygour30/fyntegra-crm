export default function StepSendMessage({ user, message }) {
  const sendSMS = () => {
    console.log("Sending to:", user.phone);
    console.log(message);
    alert("Message sent successfully!");
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-8">
      <h2 className="text-2xl font-semibold mb-4">
        Confirm & Send Message
      </h2>

      <div className="mb-4 text-sm">
        <p><strong>User:</strong> {user.name}</p>
        <p><strong>Phone:</strong> {user.phone}</p>
      </div>

      <div className="bg-gray-50 border rounded-lg p-4 whitespace-pre-wrap text-sm mb-6">
        {message}
      </div>

      <button
        onClick={sendSMS}
        className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition"
      >
        Send SMS
      </button>
    </div>
  );
}
