import { PublicLayout } from '@/components/layouts/PublicLayout';
import Register from '@/containers/Register';
import type { NextPage, NextPageContext } from 'next';

const RegisterPage: NextPage = () => {
  return (
    <PublicLayout>
      <Register />
    </PublicLayout>
  )
}

export async function getServerSideProps(context: NextPageContext) {
  return {
    props: {
      title: 'Daftar Super Family',
    },
  };
}
export default RegisterPage