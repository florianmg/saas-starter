import { NextPage } from 'next';
import { useEffect } from 'react';

import useAuthentification from '../hooks/useAuthentification';

const Logout: NextPage = () => {
  const { logout } = useAuthentification();
  useEffect(() => {
    logout();
  }, []);
  return <p>Déconnexion...</p>;
};

export default Logout;
