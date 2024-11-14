import { FaLinkedin, FaExternalLinkAlt, FaIndustry, FaMapMarkerAlt, FaUsers, FaUserFriends, FaInfoCircle, FaToolbox } from "react-icons/fa";
import FirestoreTest from "./FirestoreTest";

const EnrichedData = ({ data }) => {
  // Check if data is available, if not show a loading message or no data message
  if (!data) {
    return (
      <div className="max-w-md mx-auto mt-2 text-red-500 bg-red-500 bg-opacity-20 px-4 py-2 rounded-lg text-center">
        <p>No data available. Please submit the form to see the result.</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Full-width Card for Main Company */}
      <div className="w-full p-6 backdrop-blur-sm shadow-lg rounded-lg ">
        <h2 className="pt-4 text-2xl font-serif mb-4 text-center text-indigo-800">
        {data?.logo && (
          <img
            src={`data:image/png;base64,${data.logo}`}
            alt="Company Logo"
            className="inline-block h-12 w-12 mr-2" // 
          />
        )}{data?.name}
        </h2>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="font-medium text-gray-700 flex items-center">
              <FaIndustry className="mr-2" /> Industry:
            </span>
            <span className="text-gray-600">{data?.industry || 'N/A'}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="font-medium text-gray-700 flex items-center">
              <FaMapMarkerAlt className="mr-2" /> Location:
            </span>
            <span className="text-gray-600">{data?.location || 'N/A'}</span>
          </div>

          <div className="flex items-center justify-between">
            <span className="font-medium text-gray-700 flex items-center">
              <FaUsers className="mr-2" /> Size:
            </span>
            <span className="text-gray-600">{data?.size || 'N/A'}</span>
          </div>

          <div className="flex items-center justify-between">
            <span className="font-medium text-gray-700 flex items-center">
              <FaUserFriends className="mr-2" /> Employee Count:
            </span>
            <span className="text-gray-600">{data?.employee_count || 'N/A'}</span>
          </div>

        </div>

        <div className="mt-6 text-center space-x-4 flex items-center justify-between">
        
          <a
            href={data?.website}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-blue-600 hover:text-blue-700 font-semibold"
          >
            Visit Company Website <FaExternalLinkAlt className="ml-1" size={16} />
          </a>
          {data?.linkedin_url && (
            <a
              href={data?.linkedin_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-blue-600 hover:text-blue-700 font-semibold"
            >
              LinkedIn Profile <FaLinkedin className="ml-1" />
             
            </a>
          )}
          <FirestoreTest />
        </div>
      </div>

      {/* Smaller Cards for Lookalike Companies */}
      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-6 text-gray-800 text-center">Similar Companies</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {data?.lookalike_companies?.length > 0
            ? data.lookalike_companies.map((company, index) => (
              <div key={index} className="p-4 bg-slate-50 shadow rounded-lg">
                <h4 className="text-lg font-semibold text-indigo-600 underline">
        {company.name}</h4>
                <article className="text-gray-600 text-sm mb-4 mt-2"> {company?.description
    ? company.description.length > 100
      ? `${company.description.slice(0, 100)}...`
      : company.description
    : 'No description available'}</article>

                <p className="text-sm text-gray-600 flex items-center">
                  <FaIndustry className="mr-1" /> Industry: {company.industry || 'N/A'}
                </p>
                <p className="text-sm text-gray-600 flex items-center">
                  <FaMapMarkerAlt className="mr-1" /> Location: {company.location || 'N/A'}
                </p>
                <p className="text-sm text-gray-600 flex items-center">
                  <FaUsers className="mr-1" /> Size: {company.size || 'N/A'}
                </p>
                <p className="text-sm text-gray-600 flex items-center">
                  <FaUserFriends className="mr-1" /> Employee Count: {company.employee_count || 'N/A'}
                </p>
                <p className="text-sm text-gray-600 flex items-center">
                  <FaInfoCircle className="mr-1" /> Lookalike Score: {company.lookalike_score.toFixed(2)}%
                </p>

                <div className="mt-4">
                  <h3 className="font-semibold text-gray-700 flex items-center">
                    <FaToolbox className="mr-2" /> Technologies
                  </h3>
                  <ul className="text-gray-600 space-y-1 flex flex-wrap gap-1">
                    {company?.technologies?.length > 0
                      ? company.technologies.slice(0, 5).map((tech, index) => <li className="bg-slate-200 p-1 px-2 rounded-full" key={index}>{tech}</li>)
                      : <li>No technologies listed</li>}
                  </ul>
                </div>
                <div className="mt-4 text-center space-x-2 flex items-center justify-between w-full">
                  {company.linkedin_url && (
                    <a
                      href={company.linkedin_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-700 font-medium inline-flex items-center"
                    >
                      LinkedIn <FaLinkedin className="ml-1" />
                    </a>
                  )}
                  <a
                    href={company.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-700 font-medium inline-flex items-center"
                  >
                    Website <FaExternalLinkAlt className="ml-1" size={12} />
                  </a>
                </div>
              </div>
            ))
            : <p className="text-center text-gray-600">No lookalike companies found</p>}
        </div>
      </div>
    </div>
  );
};

export default EnrichedData;
