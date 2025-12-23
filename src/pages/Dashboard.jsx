import { useState } from "react";
import Header from "../components/layout/Header";
import Sidebar from "../components/layout/Sidebar";
import Stepper from "../components/crm/Stepper";
import ContactsTable from "../components/crm/ContactsTable";
import BankTemplateSelector from "../components/crm/BankTemplateSelector";
import MessagePreview from "../components/crm/MessagePreview";

export default function Dashboard() {
  const [step, setStep] = useState(1);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [selectedBank, setSelectedBank] = useState(null);

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <Header />

        <Stepper step={step} />

        <main className="p-6 max-w-7xl w-full mx-auto">
          {step === 1 && (
            <ContactsTable
              selectedUsers={selectedUsers}
              setSelectedUsers={setSelectedUsers}
              onNext={() => setStep(2)}
            />
          )}

          {step === 2 && (
            <BankTemplateSelector
              onSelect={(bank) => {
                setSelectedBank(bank);
                setStep(3);
              }}
            />
          )}

          {step === 3 && (
            <MessagePreview
              users={selectedUsers}
              bank={selectedBank}
            />
          )}
        </main>
      </div>
    </div>
  );
}
