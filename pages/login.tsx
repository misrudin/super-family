import { PublicLayout } from '@/components/layouts/PublicLayout';
import Login from '@/containers/Login';
import type { NextPage, NextPageContext } from 'next';

const LoginPage: NextPage = () => {
  return (
    <PublicLayout isShowFooter={false}>
      <Login />
    </PublicLayout>
  )
}

export async function getServerSideProps(context: NextPageContext) {
  return {
    props: {
      title: 'Masuk Super Family',
    },
  };
}
export default LoginPage