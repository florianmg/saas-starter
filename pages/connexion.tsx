import { useState } from 'react';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import Input from '../components/Input';
import Button from '../components/Button';
import useAuthentification from '../hooks/useAuthentification';
import { APP_ROUTES } from '../constants';

const Connexion: NextPage = () => {
  const [formValues, setFormValues] = useState({
    email: '',
    password: '',
  });

  const handleUpdateEmail = (newValue: string) =>
    setFormValues({ ...formValues, email: newValue });

  const handleUpdatePassword = (newValue: string) =>
    setFormValues({ ...formValues, password: newValue });

  const validateFields = (): boolean => true;

  const handleEmailLogin = () => {
    if (!validateFields()) return;
  };

  return (
    <main>
      <p>Page de connexion</p>
      <Input
        id="email"
        label="Adresse mail"
        value={formValues.email}
        onChange={handleUpdateEmail}
      />
      <Input
        type="password"
        id="password"
        label="Mot de passe"
        value={formValues.password}
        onChange={handleUpdatePassword}
      />
      <Button onClick={handleEmailLogin} label="Se connecter" />
    </main>
  );
};

export default Connexion;
