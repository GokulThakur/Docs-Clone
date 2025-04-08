// app/loading.tsx
export default function FullScreenLoader() {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#f5f7fa] to-[#c3cfe2]">
        <div className="flex flex-col items-center gap-4 animate-fade-in">
          <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-20 w-20" />
          <h1 className="text-lg font-semibold text-gray-700">Loading, please wait...</h1>
        </div>
  
        <style jsx>{`
          .loader {
            border-top-color: #3498db;
            animation: spin 1s linear infinite;
          }
  
          @keyframes spin {
            to {
              transform: rotate(360deg);
            }
          }
  
          @keyframes fade-in {
            from {
              opacity: 0;
              transform: scale(0.95);
            }
            to {
              opacity: 1;
              transform: scale(1);
            }
          }
  
          .animate-fade-in {
            animation: fade-in 0.5s ease-in-out;
          }
        `}</style>
      </div>
    );
  }
  