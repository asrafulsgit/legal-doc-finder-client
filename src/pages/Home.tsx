import React, { useState } from "react";

const documents = [
    {
      title: "Contract Breach Case 2021",
      description:
        "A comprehensive analysis of breach of contract claims in commercial agreements, including damages calculation and enforcement mechanisms.",
      category: "Business Law",
      year: "2021",
      img: "https://images.unsplash.com/photo-1542023250582-d7cbd0bd774f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
      alt: "Legal office desk setup",
    },
    {
      title: "Employment Agreement Template",
      description:
        "Standardized employment contract template with key clauses for non-compete, confidentiality, and termination provisions.",
      category: "Employment Law",
      year: "2023",
      img: "https://images.unsplash.com/photo-1683384546413-d207b5677dc0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
      alt: "Afternoon office workspace",
    },
    {
      title: "Intellectual Property Guidelines",
      description:
        "Comprehensive guide on trademark registration, copyright protection, and patent filing procedures for tech startups.",
      category: "IP Law",
      year: "2022",
      img: "https://images.unsplash.com/photo-1586202690666-e1f32e218afe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
      alt: "MacBook on wooden desk",
    },
    {
      title: "Lease Agreement Summary",
      description:
        "Key provisions in commercial lease agreements including rent escalation, maintenance responsibilities, and termination clauses.",
      category: "Real Estate Law",
      year: "2023",
    },
    {
      title: "Data Privacy Compliance",
      description:
        "GDPR and CCPA compliance checklist for businesses handling personal data, including consent requirements and breach protocols.",
      category: "Privacy Law",
      year: "2024",
    },
    {
      title: "M&A Due Diligence",
      description:
        "Essential legal documents and compliance checks required for mergers and acquisitions transactions under $50M.",
      category: "Corporate Law",
      year: "2024",
    },
  ];

 
const Home = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [query, setQuery] = useState("");


  const searchDocs = async()=>{
    if (!query.trim()) return;
    setIsLoading(true);

    // Simulate async search (replace with real API call)
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setIsLoading(false);
    console.log("Searching for:", query);
  }
 

  const onSubmitHandler =(e : React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault();
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 my-6">
      {isLoading ? 
        <div className="text-center mt-20">
            <h1 className="text-xl">Loading...</h1>
        </div> : documents.map((doc, index) => (
        <div
          key={index}
          className="bg-white rounded-lg border border-neutral-300 
          p-4 hover:shadow-lg transition-shadow"
        >
          {doc.img && (
            <img
              src={doc.img}
              alt={doc.alt}
              className="w-full h-32 object-cover rounded-md mb-4"
            />
          )}
          <h3 className="font-semibold text-lg text-neutral-900 mb-2">
            {doc.title}
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

export default Home
