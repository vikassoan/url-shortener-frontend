import { useState } from "react";
import { createShortUrl } from "../api/shortUrl.api";
import { useSelector } from "react-redux";
import { queryClient } from "../main";

const UrlForm = () => {
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [copied, setCopied] = useState(false);
  const [customSlug, setCustomSlug] = useState("");
  const {isAuthenticated} = useSelector((state) => state.auth)

  const handleSubmit = async () => {
    const _shortUrl = await createShortUrl(url, customSlug);
    setShortUrl(_shortUrl);
    queryClient.invalidateQueries({queryKey: ['userUrls']})
    setCopied(false);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(shortUrl);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2500);
  };

  return (
    <div className="mt-8 flex flex-col gap-4">
      {/* Long URL input */}
      <input
        type="url"
        placeholder="https://example.com/very-long-url"
        required
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        className="w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      {/* Submit button */}
      <button
        onClick={handleSubmit}
        className="rounded-xl bg-blue-600 px-6 py-3 font-medium text-white transition hover:bg-blue-500 active:scale-95"
      >
        Shorten URL
      </button>

      {isAuthenticated && (
        <div className="mt-4">
          <label
            htmlFor="customSlug"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Custom URL (optional)
          </label>
          <input
            type="text"
            id="customSlug"
            value={customSlug}
            onChange={(event) => setCustomSlug(event.target.value)}
            placeholder="Enter custom slug"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus-outline-none focus:ring-blue-500"
          />
        </div>
      )}

      {/* Short URL + Copy */}
      {shortUrl && (
        <div className="flex items-center gap-2 rounded-xl border border-gray-200 bg-gray-50 p-3">
          <input
            type="url"
            readOnly
            value={shortUrl}
            className="flex-1 bg-transparent px-2 py-2 text-gray-800 focus:outline-none"
          />

          <button
            onClick={handleCopy}
            className={`rounded-lg px-4 py-2 text-sm font-medium transition
              ${
                copied
                  ? "bg-green-600 text-white"
                  : "bg-gray-800 text-white hover:bg-gray-700"
              }
            `}
          >
            {copied ? "Copied ✓" : "Copy"}
          </button>
        </div>
      )}
    </div>
  );
};

export default UrlForm;
