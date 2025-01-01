const AuthImagePattern = ({ title, subtitle }) => {
  return (
    <div className="hidden lg:flex items-center justify-center bg-gray-900 p-12">
      <div className="relative max-w-lg">
        {/* Layered Card Effect */}
        <div className="absolute w-full h-full bg-indigo-800 rounded-xl transform rotate-2"></div>
        <div className="absolute w-full h-full bg-blue-800 rounded-xl transform -rotate-2"></div>
        <div className="relative bg-gray-800 rounded-xl shadow-lg p-8">
          {/* Title and Subtitle */}
          <h2 className="text-3xl font-bold text-white mb-4">{title}</h2>
          <p className="text-gray-300">{subtitle}</p>

          {/* Decorative Elements */}
          <div className="grid grid-cols-3 gap-4 mt-6">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="h-16 bg-gradient-to-tr from-indigo-500 to-blue-600 rounded-lg shadow-md"
              ></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthImagePattern;
