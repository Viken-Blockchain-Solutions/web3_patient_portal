export const HowItWorksSection = () => {
  return (
    <div>
      <h2 className="text-lg font-semibold text-gray-700 mb-4">How It Works</h2>
      <p className="text-sm text-gray-600 mb-4">
        This platform is a <span className='text-blue-400'>`proof of concept`</span> for a pioneering approach in healthcare data management and research. By utilizing Decentralized Identifiers (DIDs), we demonstrate how you can securely share and monetize your healthcare data, while contributing to medical research.
      </p>
      <p className="text-sm text-gray-600 mb-4">
        Your role in this ecosystem is straightforward: Scan a QR code and verify your identity to receive your lab results as a Verifiable Credential. This format ensures your medical data´s confidentiality and integrity on the blockchain.
      </p>
      <p className="text-sm text-gray-600 mb-4">
        Once your results are issued, proceed to the Medical Research Hub. Here, select a research pool of your choice and scan the provided QR code with your digital wallet to share your encrypted lab results. Following this, funds will be credited to your account.
      </p>
      <p className="text-sm text-gray-600 mb-4">
        By participating, you not only access your results but also anonymously contribute to medical research, aiding in medical advancements and receiving financial incentives for your contribution.
      </p>
    </div>
  );
};
