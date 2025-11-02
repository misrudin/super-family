import { ProtectedLayout } from '@/components/layouts/ProtectedLayout';
import Dashboard from '@/containers/Dashboard';
import type { NextPage, NextPageContext } from 'next';

const DashboardPage: NextPage = () => {
  return (
    <ProtectedLayout isShowHeader={false}>
      <Dashboard />
    </ProtectedLayout>
  )
}

export async function getServerSideProps(context: NextPageContext) {
  return {
    props: {
      title: 'Dashboard',
    },
  };
}
export default DashboardPage