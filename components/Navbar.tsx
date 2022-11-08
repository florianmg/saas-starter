import Link from 'next/link';

import { useAuth } from '../hooks/useAuth';

import { LOGGED_NAVIGATION, NOT_LOGGED_NAVIGATION } from '../constants';

const NavigationItem: React.FC<{
  url: string;
  label: string;
}> = ({ url, label }) => (
  <li className="mx-5">
    <Link href={url}>{label}</Link>
  </li>
);

const Navbar: React.FC = () => {
  const { user } = useAuth();
  return (
    <header className="h-[70px]">
      <nav className="h-full">
        <ul className="flex items-center justify-center h-full">
          {user
            ? LOGGED_NAVIGATION.map((item) => (
                <NavigationItem
                  key={item.URL}
                  url={item.URL}
                  label={item.NAME}
                />
              ))
            : NOT_LOGGED_NAVIGATION.map((item) => (
                <NavigationItem
                  key={item.URL}
                  url={item.URL}
                  label={item.NAME}
                />
              ))}
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
