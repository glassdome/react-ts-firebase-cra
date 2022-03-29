import { ProvideAuth } from 'pages/auth/hooks/useAuth';
import { AuthChangePassword } from './change/AuthChangePassword';
import { AuthForgotPassword } from './forgot/AuthForgotPassword';
import { AuthResetPassword } from './reset/AuthResetPassword';
import { AuthLogin } from './login/AuthLogin';
import { AuthLogout } from './logout/AuthLogout';
import { AuthRegister } from './register/AuthRegister';
import { useAuth } from './hooks/useAuth';

export {
  AuthChangePassword,
  AuthForgotPassword,
  AuthResetPassword,
  AuthLogin,
  AuthLogout,
  AuthRegister,
  ProvideAuth,
  useAuth,
};
