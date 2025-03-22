const Loader = () => {
  return (
    <div className="flex items-center gap-2 justify-center text-white font-medium">
      <div className="w-5 h-5 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
      <span>Sedang memproses...</span>
    </div>
  );
};

export default Loader;
