import dynamic from "next/dynamic";

export const Account = dynamic(() => import('./Account'), { ssr: false });
export const Family = dynamic(() => import('./Family'), { ssr: false });
export const Menu = dynamic(() => import('./Menu'), { ssr: false });