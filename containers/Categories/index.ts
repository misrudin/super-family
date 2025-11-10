import dynamic from "next/dynamic";

const Categories = dynamic(() => import("./Categories"), { ssr: false });
export default Categories;

