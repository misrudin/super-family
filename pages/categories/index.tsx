import { ProtectedLayout } from '@/components/layouts/ProtectedLayout';
import Categories from '@/containers/Categories';
import type { NextPage, NextPageContext } from 'next';

const CategoriesPage: NextPage = () => {
  return (
    <ProtectedLayout>
      <Categories />
    </ProtectedLayout>
  )
}

export async function getServerSideProps(context: NextPageContext) {
  return {
    props: {
      title: 'Kategori Transaksi',
    },
  };
}
export default CategoriesPage

