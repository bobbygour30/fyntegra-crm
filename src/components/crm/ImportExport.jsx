export default function ImportExport({ users, setUsers }) {
  const exportCSV = () => {
    const csv =
      "Name,Phone,Email,Company\n" +
      users
        .map(
          (u) =>
            `${u.name},${u.phone},${u.email},${u.company}`
        )
        .join("\n");

    const blob = new Blob([csv]);
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "contacts.csv";
    link.click();
  };

  const importCSV = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      const rows = reader.result.split("\n").slice(1);
      const imported = rows.map((r) => {
        const [name, phone, email, company] = r.split(",");
        return {
          id: crypto.randomUUID(),
          name,
          phone,
          email,
          company,
        };
      });

      localStorage.setItem(
        "users",
        JSON.stringify([...users, ...imported])
      );
      setUsers([...users, ...imported]);
    };

    reader.readAsText(file);
  };

  return (
    <div className="flex gap-3">
      <label className="btn-secondary">
        Import CSV
        <input type="file" hidden onChange={importCSV} />
      </label>

      <button onClick={exportCSV} className="btn-secondary">
        Export CSV
      </button>
    </div>
  );
}
