// pages/CampaignWizard.jsx (or whatever you prefer)
import { useState } from "react";
import Stepper from "../components/crm/Stepper";
import ContactsTable from "../components/crm/ContactsTable";
import BankTemplateSelector from "../components/crm/BankTemplateSelector";
import MessagePreview from "../components/crm/MessagePreview";

export default function CampaignWizard() {
  const [step, setStep] = useState(1);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [selectedBank, setSelectedBank] = useState(null);

  return (
    <>
      <Stepper step={step} />

      <div className="max-w-7xl w-full mx-auto">
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
          <MessagePreview users={selectedUsers} bank={selectedBank} />
        )}
      </div>
    </>
  );
}