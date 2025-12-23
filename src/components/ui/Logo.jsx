export default function Logo() {


  return (
    <div className="flex items-center gap-3 select-none">
      {/* Logo Image */}
      <img
        src="https://fyntegra.com/assets/logo-B6xZ6gZ0.png"
        alt="LoanNotify Logo"
        className="w-22 object-contain"
      />

      {/* Brand Text */}
      <div className="leading-tight hidden sm:block">
        
        <p className="text-xs text-gray-500">
          CRM for Loan Communication
        </p>
      </div>
    </div>
  );
}
