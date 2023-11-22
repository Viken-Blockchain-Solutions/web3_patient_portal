export type ModalComponentProps = {
    buttonText: string;
    credentialIssued: boolean;
    setCredentials: (id: []) => void;
    setCredentialIssued: (issued: boolean) => void;
    setQrUrl: (url: string) => void;
};
