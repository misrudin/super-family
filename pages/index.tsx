import { PublicLayout } from '@/components/layouts/PublicLayout';
import { Landing } from '@/containers/Landing';
import type { NextPage, NextPageContext } from 'next';

const LandingPage: NextPage = () => {
  return (
    <PublicLayout>
      <Landing />
    </PublicLayout>
  )
}

export async function getServerSideProps(context: NextPageContext) {
  return {
    props: {
      title: 'Home',
    },
  };
}
export default LandingPage