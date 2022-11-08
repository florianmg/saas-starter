import { ReactElement } from 'react';

import cn from 'classnames';

import Navbar from './Navbar';

interface IPageContainer {
  children: ReactElement;
  withoutNavigation?: boolean;
}

const PageContainer: React.FC<IPageContainer> = ({
  withoutNavigation = false,
  children,
}) => (
  <>
    {!withoutNavigation && <Navbar />}
    <main
      className={cn('w-full', {
        'min-h-[calc(100vh_-_70px)]': !withoutNavigation,
        'min-h-screen': withoutNavigation,
      })}
    >
      {children}
    </main>
  </>
);

export default PageContainer;
