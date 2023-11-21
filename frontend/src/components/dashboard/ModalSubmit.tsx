export default function ModalSubmit({
  handleSubmit,
  isLoading,
  credentialIssued
}: any) {

  return (
    <div>
      <button
        type="button"
        className="inline-flex w-full justify-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm"
        onClick={() => {
          handleSubmit();
        }}
        disabled={isLoading || credentialIssued}
      >
        {isLoading ? (
          <div className="spinner"></div>
        ) : (
          "Get Verified Credential"
        )}
      </button>
    </div>
  );
}