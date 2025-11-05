import React, { useEffect, useState } from "react";
import { apiRequest } from "../utils/baseApi";
import { toast } from "react-toastify";

// const documents = [
//     {
//       title: "Contract Breach Case 2021",
//       description:
//         "A comprehensive analysis of breach of contract claims in commercial agreements, including damages calculation and enforcement mechanisms.",
//       category: "Business Law",
//       year: "2021"
//     },
//     {
//       title: "Employment Agreement Template",
//       description:
//         "Standardized employment contract template with key clauses for non-compete, confidentiality, and termination provisions.",
//       category: "Employment Law",
//       year: "2023"
//     },
//     {
//       title: "Intellectual Property Guidelines",
//       description:
//         "Comprehensive guide on trademark registration, copyright protection, and patent filing procedures for tech startups.",
//       category: "IP Law",
//       year: "2022"
//     },
//     {
//       title: "Lease Agreement Summary",
//       description:
//         "Key provisions in commercial lease agreements including rent escalation, maintenance responsibilities, and termination clauses.",
//       category: "Real Estate Law",
//       year: "2023"
//     },
//     {
//       title: "Data Privacy Compliance",
//       description:
//         "GDPR and CCPA compliance checklist for businesses handling personal data, including consent requirements and breach protocols.",
//       category: "Privacy Law",
//       year: "2024"
//     },
//     {
//       title: "M&A Due Diligence",
//       description:
//         "Essential legal documents and compliance checks required for mergers and acquisitions transactions under $50M.",
//       category: "Corporate Law",
//       year: "2024"
//     },
//   ];



interface IDocument {
    title : string;
    description : string;
    category : string;
    year : string;
    _id : string;
    createdAt : Date;
    updatedAt : Date;
}
 
const Home = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [query, setQuery] = useState("");

  const [documents,setDocuments]=useState<IDocument[]>([]);


  const searchDocs = async()=>{
    setIsLoading(true);
     try {
        const response = await apiRequest('GET',`/documents?search=${query.trim()}`);
        setDocuments(response?.data);
     } catch (error: any) {
        toast.error(error?.response?.data?.message);
     }finally{
       setIsLoading(false);
     }
  };

  useEffect(()=>{
    searchDocs();
  },[]);
 

  const onSubmitHandler =(e : React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault();
    if(!query.trim()) return;
    searchDocs();
  }

  return (
    <section
      className="px-10 pt-10"
    >
        <div>
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">
                Search Legal Documents
              </h1>
              <p className="text-xl text-gray-600">
                Find summaries of legal cases and agreements instantly.
              </p>
            </div>

            <form action="" onSubmit={onSubmitHandler} className="flex flex-col sm:flex-row gap-4 mt-6">
                <input
                  type="text"
                  id="search-input"
                  value={query}
                  onChange={(e)=>setQuery(e.target.value)}
                  placeholder="Enter keywords, e.g., contract breach..."
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                />

                <button
                   
                  disabled={isLoading}
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center disabled:opacity-70"
                >
                    Search
                </button>
            </form>
          
        </div>
      {
        isLoading && 
        <div className="text-center w-full mt-20">
            <h1 className="text-xl">Loading...</h1>
        </div>
      }

      {
        !isLoading && !documents.length &&
        <div className="text-center w-full mt-20">
            <h1 className="text-xl">Documents is not found</h1>
        </div>
      }

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 my-6">
      {!isLoading &&
        documents.map((doc, index) => (
        <div
          key={index}
          className="bg-white rounded-lg border border-neutral-300 
          p-4 hover:shadow-lg transition-shadow"
        >
          <h3 className="font-semibold text-lg text-neutral-900 mb-2">
            {doc?.title}
          </h3>
          <p className="text-neutral-600 text-sm mb-4">{doc.description}</p>
          <div className="flex justify-between items-center text-sm">
            <span className="text-blue-600 font-medium">{doc.category}</span>
            <span className="text-neutral-500">{doc.year}</span>
          </div>
        </div>
      ))}
    </div>     
    </section>)
}

export default Home;
