// app/pages/InstituteDashboard.tsx
'use client'
import React, { useState } from 'react';
import Menu from '../../components/Menu';

const InstituteDashboard = () => {
  const [researchFund, setResearchFund] = useState<number>(0);
  const [selectedSchema, setSelectedSchema] = useState<string>('');

  const handleFundChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setResearchFund(Number(e.target.value));
  };

  const handleSchemaChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedSchema(e.target.value);
  };

  const createResearchPool = () => {
    // Logic to create a research pool
  };

  return (
    <div className='container mx-auto max-w-6xl p-8'>
      <Menu />
      <h1 className='text-4xl mb-8 font-semibold text-blue-700'>Institute Dashboard</h1>
      <div className='bg-blue-100 p-8 rounded-lg shadow-lg'>
        <h2 className='text-2xl mb-6 font-medium text-blue-600'>Initiate a Research Pool</h2>
        <div className='flex flex-col mt-2 space-y-4'>
          <div className='flex items-center'>
            <label htmlFor='researchFund' className='w-1/3 text-lg'>
              Research Funding Amount:
            </label>
            <input
              type='number'
              id='researchFund'
              value={researchFund}
              onChange={handleFundChange}
              className='border p-2 w-1/4'
            />
          </div>
          <div className='flex items-center'>
            <label htmlFor='schema' className='w-1/3 text-lg'>
              Specify Research Domain in Laboratory Diagnostics:
            </label>
            <select id='schema' value={selectedSchema} onChange={handleSchemaChange} className='border p-2 w-1/4'>
              <option value=''>--Select--</option>
              <option value='BloodClotLabTestCredential-v1'>Blood Clot Lab Test Credential v1</option>
              <option value='CholesterolLabTestCredential-v1'>Cholesterol Lab Test Credential v1</option>
              {/* Add more schemas here */}
            </select>
          </div>
          <button onClick={createResearchPool} className='self-end mt-4 p-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700'>
            Initiate Research Pool
          </button>
        </div>
      </div>
    </div>
  );
};

export default InstituteDashboard;
