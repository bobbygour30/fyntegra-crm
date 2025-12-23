export default function Stepper({ step }) {
  const steps = [
    { id: 1, label: "Contacts" },
    { id: 2, label: "Bank & Template" },
    { id: 3, label: "Preview & Send" },
  ];

  return (
    <div className="bg-white border-b">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {steps.map((s, index) => {
            const isCompleted = step > s.id;
            const isActive = step === s.id;

            return (
              <div key={s.id} className="flex items-center flex-1">
                {/* Step Circle */}
                <div className="flex items-center gap-3">
                  <div
                    className={`h-8 w-8 rounded-full flex items-center justify-center text-sm font-semibold transition
                      ${
                        isCompleted
                          ? "bg-red-600 text-white"
                          : isActive
                          ? "border-2 border-red-600 text-red-600 bg-white"
                          : "border border-gray-300 text-gray-400 bg-white"
                      }
                    `}
                  >
                    {s.id}
                  </div>

                  {/* Step Label */}
                  <div className="hidden sm:block">
                    <p
                      className={`text-sm font-medium transition ${
                        isActive || isCompleted
                          ? "text-gray-900"
                          : "text-gray-400"
                      }`}
                    >
                      {s.label}
                    </p>
                  </div>
                </div>

                {/* Connector Line */}
                {index !== steps.length - 1 && (
                  <div className="flex-1 mx-4">
                    <div
                      className={`h-1 rounded-full transition-all duration-300 ${
                        isCompleted ? "bg-red-600" : "bg-gray-200"
                      }`}
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
