import { NextPage } from 'next';
import { useRouter } from 'next/router';
import useAuthentification from '../hooks/useAuthentification';
import { APP_ROUTES } from '../constants';

const Connexion: NextPage = () => {
  return (
    <main>
      <p>Page de connexion</p>
      <form action=""></form>
    </main>
  );
};

export default Connexion;
