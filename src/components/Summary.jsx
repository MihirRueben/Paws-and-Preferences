//summary of the user's likes and dislikes

const Summary = ({ likedCats, total, onStartOver, onGoToLanding }) => {
  return (
    <div className="bg-white p-4 sm:p-6 md:p-8 rounded-2xl sm:rounded-3xl shadow-lg w-full max-w-xs sm:max-w-sm md:max-w-md text-center animate-in fade-in zoom-in duration-300 border border-gray-100">
      <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-gray-800 mb-2">That's All!</h2>
      <p className="text-sm sm:text-base text-gray-500 mb-4 sm:mb-6 font-medium">
        You liked {likedCats.length} out of {total} kitties.
      </p>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-4 sm:mb-6 max-h-32 sm:max-h-40 md:max-h-48 overflow-y-auto p-2">
        {likedCats.map((cat) => (
          <img key={cat.id} src={cat.url} className="rounded-lg h-16 sm:h-20 w-full object-cover border-2 border-gray-100" />
        ))}
      </div>
      
      <div className="space-y-2 sm:space-y-3">
        <button 
          onClick={onStartOver}
          className="w-full bg-gray-800 text-white py-3 sm:py-4 rounded-xl sm:rounded-2xl font-bold shadow-lg hover:bg-gray-700 transition-all active:scale-95 text-sm sm:text-base"
        >
          Start Over
        </button>
        <button 
          onClick={onGoToLanding}
          className="w-full bg-gray-200 text-white-800 py-3 sm:py-4 rounded-xl sm:rounded-2xl font-bold hover:bg-gray-300 transition-all active:scale-95 text-sm sm:text-base"
        >
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default Summary;