import { useEffect, useState } from "react";
import api from "../../api/api";
import AddUserForm from "./AddUserForm";
import ImportExport from "./ImportExport";

export default function ContactsTable({
  selectedUsers,
  setSelectedUsers,
  onNext,
}) {
  const [users, setUsers] = useState([]);

  const load = async () => {
    const res = await api.get("/contacts");
    setUsers(res.data);
  };

  useEffect(() => {
    load();
  }, []);

  const toggle = (user) => {
    setSelectedUsers((prev) =>
      prev.some((u) => u._id === user._id)
        ? prev.filter((u) => u._id !== user._id)
        : [...prev, user]
    );
  };

  const deleteSelected = async () => {
    await api.post("/contacts/delete", {
      ids: selectedUsers.map((u) => u._id),
    });
    setSelectedUsers([]);
    load();
  };

  return (
    <div className="bg-white rounded-xl shadow p-6">
      <h2 className="text-xl font-semibold mb-4">Contacts</h2>

      <AddUserForm onAdded={load} />

      <ImportExport users={users} refresh={load} />

      {selectedUsers.length > 0 && (
        <button
          onClick={deleteSelected}
          className="btn-secondary text-red-600 mt-3"
        >
          Delete Selected ({selectedUsers.length})
        </button>
      )}

      <table className="w-full border mt-4">
        <thead className="bg-gray-100">
          <tr>
            <th />
            <th>Name</th>
            <th>Phone</th>
            <th>Company</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u._id} className="border-t">
              <td>
                <input
                  type="checkbox"
                  onChange={() => toggle(u)}
                />
              </td>
              <td>{u.name}</td>
              <td>{u.phone}</td>
              <td>{u.company}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <button
        disabled={!selectedUsers.length}
        onClick={onNext}
        className="btn-primary mt-6"
      >
        Continue
      </button>
    </div>
  );
}
