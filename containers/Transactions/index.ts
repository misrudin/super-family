import dynamic from "next/dynamic";

const Transactions = dynamic(() => import("./Transactions"), { ssr: false });
export default Transactions;

