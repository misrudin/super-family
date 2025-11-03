import { ProtectedLayout } from '@/components/layouts/ProtectedLayout';
import Profile from '@/containers/Profile';
import type { NextPage, NextPageContext } from 'next';

const DashboardPage: NextPage = () => {
    return (
        <ProtectedLayout>
            <Profile />
        </ProtectedLayout>
    )
}

export async function getServerSideProps(context: NextPageContext) {
    return {
        props: {
            title: 'Profile',
        },
    };
}
export default DashboardPage