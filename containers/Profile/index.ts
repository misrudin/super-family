import dynamic from "next/dynamic";

const Profile = dynamic(() => import('./Profile'), { ssr: false });
export default Profile;