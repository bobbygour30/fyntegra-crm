import { useState } from "react";
import Logo from "./Logo";
import StepUserForm from "./StepUserForm";
import StepBankSelect from "./StepBankSelect";
import StepSendMessage from "./StepSendMessage";

export default function Dashboard({ setLoggedIn }) {
  const [step, setStep] = useState(1);
  const [selectedUser, setSelectedUser] = useState(null);
  const [messageData, setMessageData] = useState(null);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm px-6 py-4 flex justify-between items-center">
        <Logo />
        <button
          onClick={() => {
            localStorage.removeItem("loggedIn");
            setLoggedIn(false);
          }}
          className="text-sm text-red-600 font-medium"
        >
          Logout
        </button>
      </header>

      {/* Step Indicator */}
      <div className="max-w-5xl mx-auto mt-6 px-6">
        <div className="flex items-center gap-4">
          {[1, 2, 3].map((s) => (
            <div
              key={s}
              className={`flex-1 h-1 rounded-full transition ${
                step >= s ? "bg-red-600" : "bg-gray-200"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="max-w-5xl mx-auto p-6">
        <div className="transition-all duration-500 ease-in-out">
          {step === 1 && <StepUserForm onNext={() => setStep(2)} />}
          {step === 2 && (
            <StepBankSelect
              onNext={(user, msg) => {
                setSelectedUser(user);
                setMessageData(msg);
                setStep(3);
              }}
            />
          )}
          {step === 3 && (
            <StepSendMessage user={selectedUser} message={messageData} />
          )}
        </div>
      </div>
    </div>
  );
}
