import { type PropsWithChildren } from 'react';
import { useAutoSignin } from 'react-oidc-context';

interface Props {}

function Auth(props: PropsWithChildren<Props>) {
  const { children } = props;
  const { isAuthenticated } = useAutoSignin();

  return isAuthenticated ? children : null;
}

export default Auth;
