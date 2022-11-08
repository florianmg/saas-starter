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

import { APP_ROUTES } from '../constants';

const Inscription: NextPage = () => {
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

    const response = await emailRegister({ ...formValues });
    if (response.success) router.push(APP_ROUTES.DASHBOARD.URL);
  };

  const handleGoogleAuth = async () => {
    const response = await googleAuth();
    if (response.success) router.push(APP_ROUTES.DASHBOARD.URL);
  };
  return (
    <PageContainer>
      <>
        <h1>Inscription</h1>
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
              - Au moins 6 charactères
            </li>
            <li
              className={cn({
                'text-red-500': !isPasswordContainSpecialChar(
                  formValues.password
                ),
              })}
            >
              - Au moins 1 chatactère spécial
            </li>
          </ul>
        </div>
        <Button onClick={handleEmailRegister} label="S'inscrire" />
        <Button onClick={handleGoogleAuth} label="Continuer avec Google" />
        <p>
          Vous avez déjà un compte ?{' '}
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
