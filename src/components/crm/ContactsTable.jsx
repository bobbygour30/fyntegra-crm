import { useState, useEffect } from "react";
import ImportExport from "./ImportExport";
import AddUserForm from "./AddUserForm";
import {
  getUsers,
  deleteUsersByIds,
} from "../../utils/storage";

export default function ContactsTable({
  selectedUsers,
  setSelectedUsers,
  onNext,
}) {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    setUsers(getUsers());
  }, []);

  const toggleUser = (user) => {
    setSelectedUsers((prev) =>
      prev.some((u) => u.id === user.id)
        ? prev.filter((u) => u.id !== user.id)
        : [...prev, user]
    );
  };

  const deleteSingle = (id) => {
    if (!confirm("Delete this contact?")) return;
    const updated = deleteUsersByIds([id]);
    setUsers(updated);
    setSelectedUsers([]);
  };

  const deleteSelected = () => {
    if (!selectedUsers.length) return;
    if (!confirm(`Delete ${selectedUsers.length} contacts?`))
      return;

    const ids = selectedUsers.map((u) => u.id);
    const updated = deleteUsersByIds(ids);
    setUsers(updated);
    setSelectedUsers([]);
  };

  return (
    <div className="bg-white rounded-xl shadow p-6">
      <h2 className="text-xl font-semibold mb-4">
        Contacts
      </h2>

      {/* Add User */}
      <AddUserForm onAdded={() => setUsers(getUsers())} />

      {/* Import / Export + Bulk Delete */}
      <div className="flex flex-wrap gap-3 mb-4">
        <ImportExport users={users} setUsers={setUsers} />

        {selectedUsers.length > 0 && (
          <button
            onClick={deleteSelected}
            className="btn-secondary text-red-600 border-red-200"
          >
            Delete Selected ({selectedUsers.length})
          </button>
        )}
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full border">
          <thead className="bg-gray-100">
            <tr>
              <th />
              <th>Name</th>
              <th>Phone</th>
              <th>Email</th>
              <th>Company</th>
              <th />
            </tr>
          </thead>

          <tbody>
            {users.map((u) => (
              <tr key={u.id} className="border-t">
                <td>
                  <input
                    type="checkbox"
                    checked={selectedUsers.some(
                      (su) => su.id === u.id
                    )}
                    onChange={() => toggleUser(u)}
                  />
                </td>
                <td>{u.name}</td>
                <td>{u.phone}</td>
                <td>{u.email}</td>
                <td>{u.company}</td>
                <td>
                  <button
                    onClick={() => deleteSingle(u.id)}
                    className="text-xs text-red-600 hover:underline"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}

            {!users.length && (
              <tr>
                <td
                  colSpan="6"
                  className="text-center py-6 text-gray-400"
                >
                  No contacts found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Continue */}
      <button
        disabled={!selectedUsers.length}
        onClick={onNext}
        className="btn-primary mt-6"
      >
        Continue ({selectedUsers.length} Selected)
      </button>
    </div>
  );
}
