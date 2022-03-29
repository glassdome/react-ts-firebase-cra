import { Route, Routes } from 'react-router-dom';
import { AuthRoute, Header } from 'components';
import { HomePage } from 'pages/home/home';
import {
  AuthChangePassword,
  AuthForgotPassword,
  AuthResetPassword,
  AuthLogin,
  AuthLogout,
  AuthRegister,
  ProvideAuth,
} from 'pages/auth';

function App() {
  return (
    <ProvideAuth>
      <Header />
      <div className='App center-wrap'>
        <Routes>
          <Route
            path='/'
            element={
              <AuthRoute>
                <HomePage />
              </AuthRoute>
            }
          />
          <Route
            path='/change'
            element={
              <AuthRoute>
                <AuthChangePassword />
              </AuthRoute>
            }
          />

          <Route
            path='/logout'
            element={
              <AuthRoute>
                <AuthLogout />
              </AuthRoute>
            }
          />
          <Route path='/register' element={<AuthRegister />} />
          <Route path='/login' element={<AuthLogin />} />
          <Route path='/forgot' element={<AuthForgotPassword />} />
          <Route path='/reset' element={<AuthResetPassword />} />
        </Routes>
      </div>
    </ProvideAuth>
  );
}

export default App;
