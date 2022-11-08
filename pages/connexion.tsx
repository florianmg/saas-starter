import { useState } from 'react';
import { NextPage } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';

import useAuthentification from '../hooks/useAuthentification';
import { isValidEmail } from '../lib/forms/validators';

import Input from '../components/Input';
import Button from '../components/Button';
import PageContainer from '../components/PageContainer';
import Loader from '../components/Loader';

import { APP_ROUTES } from '../constants';

const Connexion: NextPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [formValues, setFormValues] = useState({
    email: '',
    password: '',
  });
  const [formErrors, setFormErrors] = useState({
    email: '',
    password: '',
  });
  const router = useRouter();
  const { emailLogin, googleAuth } = useAuthentification();

  const handleUpdateEmail = (newValue: string) =>
    setFormValues({ ...formValues, email: newValue });

  const handleUpdatePassword = (newValue: string) =>
    setFormValues({ ...formValues, password: newValue });

  const handleEmailLogin = async () => {
    let newFormErrors = {
      email: '',
      password: '',
    };
    let hasError = false;

    if (formValues.email === '') {
      newFormErrors.email = "L'adresse mail n'est pas renseigné";
      hasError = true;
    } else if (!isValidEmail(formValues.email)) {
      newFormErrors.email = "L'adresse mail n'est pas valide";
      hasError = true;
    }
    if (formValues.password === '') {
      newFormErrors.password = "Le mot de passe n'est pas renseigné";
      hasError = true;
    }

    if (hasError) {
      setFormErrors(newFormErrors);
      return;
    }
    setIsLoading(true);
    const response = await emailLogin({ ...formValues });
    if (response.success) {
      router.push(APP_ROUTES.DASHBOARD.URL);
    } else {
      setIsLoading(false);
    }
  };

  const handleGoogleAuth = async () => {
    setIsLoading(true);
    const response = await googleAuth();
    if (response.success) {
      router.push(APP_ROUTES.DASHBOARD.URL);
    } else {
      setIsLoading(false);
    }
  };
  if (isLoading)
    return (
      <div className="w-screen h-screen flex justify-center items-center">
        <div className="w-16 h-16">
          <Loader />
        </div>
      </div>
    );
  return (
    <PageContainer>
      <>
        <h1>Connexion</h1>
        <Input
          id="email"
          label="Adresse mail"
          value={formValues.email}
          onChange={handleUpdateEmail}
          error={formErrors.email}
        />
        <Input
          type="password"
          id="password"
          label="Mot de passe"
          value={formValues.password}
          onChange={handleUpdatePassword}
          error={formErrors.password}
        />
        <Button onClick={handleEmailLogin} label="Se connecter" />
        <Button onClick={handleGoogleAuth} label="Continuer avec Google" />
        <p>
          Vous n'avez pas de compte ?{' '}
          <Link
            className="underline underline-offset-2"
            href={APP_ROUTES.REGISTER.URL}
          >
            Créer un compte
          </Link>
        </p>
      </>
    </PageContainer>
  );
};

export default Connexion;
