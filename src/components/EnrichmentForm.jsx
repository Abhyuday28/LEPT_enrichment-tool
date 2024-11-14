import { ChevronRight, Loader } from "lucide-react";
import { useState } from "react";
import { toast } from "react-toastify";
import { db } from "../firebase";
import { doc, setDoc, collection, addDoc } from "firebase/firestore";
import { useUser } from "../contexts/userContext";

const EnrichmentForm = ({ setResult }) => {
  //------------------------------------------------
  const { user } = useUser();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    url: "",
  });

  const cacheData = (key, data) => {
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch (error) {
      console.error("Error caching data:", error);
    }
  };

  const getCachedData = (key) => {
    try {
      const cachedData = localStorage.getItem(key);
      return cachedData ? JSON.parse(cachedData) : null;
    } catch (error) {
      toast.error(error.message);
      return null;
    }
  };

  //--------------------------------------------------------
  const saveEnrichedData = async (enrichedData) => {
    if (!user) {
      return console.error("User not authenticated");
    }
    try {
      // Create a reference to the user's saved leads subcollection
      const userRef = doc(db, "users", user.uid);
      const leadsRef = collection(userRef, "savedLeads");

      // Add enriched data to Firestore under the user's savedLeads subcollection
      await addDoc(leadsRef, {
        ...enrichedData,
        timestamp: new Date(),
      });
      toast.success("Data saved to Firestore successfully.");
    } catch (error) {
      console.error("Error saving data to Firestore:", error);
      toast.error("Failed to save data to Firestore.");
    }
  };

  const getEnrichedData = async (e) => {
    try {
      e.preventDefault();
      setLoading(true);

      if (!form.name) {
        return toast.error(
          "Please enter company name to get company information."
        );
      }

      const cacheKey = form.website || form.name;

      const cachedData = getCachedData(cacheKey);

      if (cachedData) {
        toast.success("FOUND (Cached)");
        setResult(cachedData);
        await saveEnrichedData(cachedData);
        return;
      }

      const res = await fetch(
        `https://lept-enrichment-tool.vercel.app/api/enrich?website=${
          form.website || form.name
        }`
      );

      const data = await res.json();

      if (data?.message) {
        toast.info(data.message);
      }
      if (data?.data) {
        setResult(data.data);
        cacheData(cacheKey, data.data);
        await saveEnrichedData(data.data);
      }

      console.log(data);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={getEnrichedData}
      className="border w-full max-w-md mx-auto p-6 backdrop-blur-sm shadow-lg rounded-lg"
    >
      <h2 className="text-2xl font-semibold mb-4 text-center">
        Company Enrichment
      </h2>

      <div className="mb-4">
        <label
          htmlFor="companyName"
          className="block text-sm font-medium text-gray-700"
        >
          Company Name
        </label>
        <input
          id="companyName"
          name="name"
          type="text"
          value={form.name}
          onChange={(e) =>
            setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
          }
          required
          disabled={loading}
          className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-900"
        />
      </div>

      <div className="mb-6">
        <label
          htmlFor="companyUrl"
          className="block text-sm font-medium text-gray-700"
        >
          Company URL (Optional)
        </label>
        <input
          id="companyUrl"
          name="url"
          type="url"
          disabled={loading}
          value={form.url}
          onChange={(e) =>
            setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
          }
          className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-900 "
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className={`w-full flex items-center justify-center gap-2 py-2 px-4 bg-indigo-900 text-white font-semibold rounded-md hover:bg-indigo-800 focus:outline-none focus:ring-1 focus:ring-indigo-700 disabled:bg-indigo-300`}
      >
        {loading ? (
          <>
            <Loader className="w-4 h-4 animate-spin" />
            Loading...
          </>
        ) : (
          <>
            Enrich Data
            <ChevronRight className="w-4 h-4" />
          </>
        )}
      </button>
    </form>
  );
};

export default EnrichmentForm;
