export type ModalComponentProps = {
    buttonText: string;
    credentialIssued: boolean;
    setCredentialId: (id: string) => void;
    setCredentialIssued: (issued: boolean) => void;
    setQrUrl: (url: string) => void;
};
