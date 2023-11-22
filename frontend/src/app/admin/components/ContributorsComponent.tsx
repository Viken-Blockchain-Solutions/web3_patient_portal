// admin/components/ContributorsComponent.tsx
"use client";
import React, { useState, useEffect } from "react";
import { supabase } from "../../../../db/supabaseClient";
import { Contributor } from "../../../../types";
import ContributorForm from "./ContributorForm";
import ContributorTable from "./ContributorTable";

const ContributorsComponent: React.FC = () => {
  const [isSuccess, setIsSuccess] = useState(false);
  const [contributors, setContributors] = useState<Contributor[]>([]);
  const [isLoading, setLoading] = useState(true);
  const [newContributor, setNewContributor] = useState<Contributor>({
    contributor_did: "",
    name: "",
    phone_number: "",
    country: "",
    age: 0,
    gender: "",
    medical_conditions: "",
    consent_given: false
  });

  useEffect(() => {
    const fetchContributors = async () => {
      setLoading(true);
      console.log("Fetching contributors from the database...");

      const { data, error } = await supabase.from("contributors").select("*");
      console.log(data);
      if (error) {
        console.error("Error fetching data:", error);
      } else {
        setContributors(data || []);
      }

      setLoading(false);
    };

    fetchContributors();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewContributor({ ...newContributor, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSuccess(false);
    const { data, error } = await supabase.from("contributors").insert([newContributor]);
    console.log(data);
    if (error) {
      console.error("Error inserting new contributor:", error);
    } else {
      if (data !== null) {
        setContributors([...contributors, data[0]]);
        setIsSuccess(true);
        setTimeout(() => setIsSuccess(false), 5000);
      }
    }
  };

  if (isLoading) return <p>Loading contributors...</p>;
  if (contributors.length === 0) return (<div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-8">
    <div className="h-auto rounded-lg p-4">
      <ContributorForm
        newContributor={newContributor}
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
      />
    </div>
    <div className="h-auto rounded-lg lg:col-span-2 p-4">
      <ContributorTable
        contributors={contributors}
        setContributors={setContributors} // Pass setContributors to the ContributorTable
      />
    </div>
  </div>
  );

  return (
    <div className="flex flex-col mx-auto p-4">
      <h1 className="text-lg font-bold text-center mb-4">Contributors Data</h1>
      {isSuccess && (
        <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4" role="alert">
          <p className="font-bold">Success</p>
          <p>New contributor added successfully!</p>
        </div>
      )}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-8">
        <div className="h-auto rounded-lg p-4">
          <ContributorForm
            newContributor={newContributor}
            handleInputChange={handleInputChange}
            handleSubmit={handleSubmit}
          />
        </div>
        <div className="h-auto rounded-lg lg:col-span-2 p-4">
          <ContributorTable
            contributors={contributors}
            setContributors={setContributors} // Pass setContributors to the ContributorTable
          />
        </div>
      </div>
    </div>
  );
};

export default ContributorsComponent;
