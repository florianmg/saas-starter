import { useState } from 'react';
import { NextPage } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';

import cn from 'classnames';

import useAuthentification from '../hooks/useAuthentification';
import {
  isValidEmail,
  isPasswordLongEnouph,
  isPasswordContainSpecialChar,
} from '../lib/forms/validators';

import Input from '../components/Input';
import Button from '../components/Button';
import PageContainer from '../components/PageContainer';
import Loader from '../components/Loader';
import Alert from '../components/Alert';

import { APP_ROUTES } from '../constants';

const Inscription: NextPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [globalError, setGlobalError] = useState<string[]>();
  const [formValues, setFormValues] = useState({
    email: '',
    password: '',
  });
  const [formErrors, setFormErrors] = useState({
    email: '',
    password: '',
  });
  const router = useRouter();
  const { emailRegister, googleAuth } = useAuthentification();
  const handleUpdateEmail = (newValue: string) =>
    setFormValues({ ...formValues, email: newValue });

  const handleUpdatePassword = (newValue: string) =>
    setFormValues({ ...formValues, password: newValue });

  const handleEmailRegister = async () => {
    let newFormErrors = {
      email: '',
      password: '',
    };
    let hasError = false;

    if (formValues.email === '' || !isValidEmail(formValues.email)) {
      newFormErrors.email = "L'adresse mail n'est pas valide";
      hasError = true;
    }

    if (
      formValues.password === '' ||
      !isPasswordLongEnouph(formValues.password) ||
      !isPasswordContainSpecialChar(formValues.password)
    ) {
      newFormErrors.password = "Le format du mot de passe n'est pas valide";
      hasError = true;
    }
    if (hasError) {
      setFormErrors(newFormErrors);
      return;
    }
    setIsLoading(true);
    const response = await emailRegister({ ...formValues });
    if (response.success) {
      router.push(APP_ROUTES.DASHBOARD.URL);
    } else {
      setGlobalError([
        "Une erreur est survenur lors de l'inscription.",
        'V??rifiez que les conditions des champs sont bien remplies et r??essayez.',
      ]);
      setIsLoading(false);
    }
  };

  const handleGoogleAuth = async () => {
    setIsLoading(true);
    const response = await googleAuth();
    if (response.success) {
      router.push(APP_ROUTES.DASHBOARD.URL);
    } else {
      setGlobalError([
        "Une erreur est survenue lors de l'inscription avec votre compte Google.",
        'Merci de r??essayer.',
      ]);
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
        <h1>Inscription</h1>
        {globalError && <Alert type="error" message={globalError} />}
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
        <div className="font-bold text-xs">
          <p>Conditions du mot de passe:</p>
          <ul className="list-disc">
            <li
              className={cn({
                'text-red-500': !isPasswordLongEnouph(formValues.password),
              })}
            >
              - Au moins 6 charact??res
            </li>
            <li
              className={cn({
                'text-red-500': !isPasswordContainSpecialChar(
                  formValues.password
                ),
              })}
            >
              - Au moins 1 chatact??re sp??cial
            </li>
          </ul>
        </div>
        <Button onClick={handleEmailRegister} label="S'inscrire" />
        <Button onClick={handleGoogleAuth} label="Continuer avec Google" />
        <p>
          Vous avez d??j?? un compte ?{' '}
          <Link
            className="underline underline-offset-2"
            href={APP_ROUTES.LOGIN.URL}
          >
            Se connecter
          </Link>
        </p>
      </>
    </PageContainer>
  );
};

export default Inscription;
