import dynamic from "next/dynamic";

const ModalTransaction = dynamic(() => import("./ModalTransaction"), { ssr: false });

export { ModalTransaction };
