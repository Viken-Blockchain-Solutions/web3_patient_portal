// admin/components/PoolForm.tsx
import { NewPool } from "../../../../types";

type PoolFormProps = {
  newPool: NewPool;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
};

const PoolForm: React.FC<PoolFormProps> = ({ newPool, handleInputChange, handleSubmit }) => {
  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <div className="mb-4">
        <label htmlFor="pool_heading" className="block text-gray-700">Pool Heading</label>
        <input
          type="text"
          id="pool_heading"
          name="pool_heading"
          placeholder="Enter pool heading"
          value={newPool.pool_heading}
          onChange={handleInputChange}
          required
          className="w-full px-3 py-2 border rounded-lg"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="pool_description" className="block text-gray-700">Pool Description</label>
        <input
          type="text"
          id="pool_description"
          name="pool_description"
          placeholder="Enter pool description"
          value={newPool.pool_description}
          onChange={handleInputChange}
          required
          className="w-full px-3 py-2 border rounded-lg"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="start_date" className="block text-gray-700">Start Date</label>
        <input
          type="text"
          id="start_date"
          name="start_date"
          placeholder="Enter start date"
          value={newPool.start_date}
          onChange={handleInputChange}
          required
          className="w-full px-3 py-2 border rounded-lg"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="end_date" className="block text-gray-700">End Date</label>
        <input
          type="text"
          id="end_date"
          name="end_date"
          placeholder="Enter end date"
          value={newPool.end_date}
          onChange={handleInputChange}
          required
          className="w-full px-3 py-2 border rounded-lg"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="funding_amount" className="block text-gray-700">Funding Amount</label>
        <input
          type="text"
          id="funding_amount"
          name="funding_amount"
          placeholder="Enter funding amount"
          value={newPool.funding_amount}
          onChange={handleInputChange}
          required
          className="w-full px-3 py-2 border rounded-lg"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="currency_unit" className="block text-gray-700">Currency Unit</label>
        <input
          type="text"
          id="currency_unit"
          name="currency_unit"
          placeholder="Enter currency unit"
          value={newPool.currency_unit}
          onChange={handleInputChange}
          required
          className="w-full px-3 py-2 border rounded-lg"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="proof_template" className="block text-gray-700">Proof Template</label>
        <input
          type="text"
          id="proof_template"
          name="proof_template"
          placeholder="Enter proof template"
          value={newPool.proof_template}
          onChange={handleInputChange}
          required
          className="w-full px-3 py-2 border rounded-lg"
        />
      </div>
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Add Pool
      </button>
    </form>
  );
};

export default PoolForm;