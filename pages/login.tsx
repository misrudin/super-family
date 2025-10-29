import type { NextPage, NextPageContext } from 'next';

const LoginPage: NextPage = () => {
  return (
      <div>heloo</div>
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