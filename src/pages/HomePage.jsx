import UrlForm from "../components/UrlForm";

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="w-full max-w-2xl rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
        
        <div className="text-center">
          <h1 className="text-4xl font-semibold text-gray-900">
            URL Shortener
          </h1>
          <p className="my-3 text-gray-500">
            Shorten long links into clean, shareable URLs
          </p>
        </div>

        <UrlForm />
      </div>
    </div>
  );
};

export default HomePage;
