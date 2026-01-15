//summary of the user's likes and dislikes

const Summary = ({ likedCats, total, onStartOver }) => {
  return (
    <div className="bg-white p-8 rounded-3xl shadow-lg w-full max-w-xs text-center animate-in fade-in zoom-in duration-300 border border-gray-100">
      <h2 className="text-3xl font-black text-gray-800 mb-2">That's All!</h2>
      <p className="text-gray-500 mb-6 font-medium">
        You liked {likedCats.length} out of {total} kitties.
      </p>
      
      <div className="grid grid-cols-2 gap-2 mb-6 max-h-48 overflow-y-auto p-2">
        {likedCats.map((cat) => (
          <img key={cat.id} src={cat.url} className="rounded-lg h-20 w-full object-cover border-2 border-gray-100" />
        ))}
      </div>
      
      <button 
        onClick={onStartOver}
        className="w-full bg-gray-800 text-white py-4 rounded-2xl font-bold shadow-lg hover:bg-gray-700 transition-all active:scale-95"
      >
        Start Over
      </button>
    </div>
  );
};

export default Summary;