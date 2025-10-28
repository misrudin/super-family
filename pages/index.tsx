import type { NextPage, NextPageContext } from 'next';

const HomePage: NextPage = () => {
  return (
      <div>heloo</div>
  )
}

export async function getServerSideProps(context: NextPageContext) {
  return {
    props: {
      title: 'Home',
    },
  };
}
export default HomePage