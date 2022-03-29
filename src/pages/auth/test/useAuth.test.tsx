import { act, renderHook } from '@testing-library/react-hooks';
import React from 'react';
import { ProvideAuth, useAuth } from '../hooks/useAuth';
import { faker } from '@faker-js/faker';
import { FirebaseError } from 'firebase/app';

const clearAllUsers = async () => {
  let projectId = process.env.REACT_APP_PROJECT_ID;
  if (!projectId) {
    throw new Error('env var REACT_APP_PROJECT_ID not found in test');
  }
  const url = `http://localhost:9099/emulator/v1/projects/${projectId}/accounts`;
  return fetch(url, { method: 'DELETE' });
};

const wrapper = ({ children }: React.PropsWithChildren<unknown>) => {
  return <ProvideAuth>{children}</ProvideAuth>;
};

const renderAuth = () => {
  return renderHook(() => useAuth(), { wrapper });
};

const newRandomUser = () => {
  return {
    email: faker.internet.email().toLowerCase(),
    password: faker.internet.password(),
  };
};

const DEFAULT_USER = newRandomUser();

describe('useAuth()', () => {
  beforeAll(() => {
    console.log('before-all');
  });

  afterAll(async () => {
    await clearAllUsers();
    console.log('after-all');
  });

  test('create default user', async () => {
    await clearAllUsers().catch((error) => {
      throw new Error(error);
    });
    const { result } = renderAuth();
    await act(async () => {
      await result.current.register(DEFAULT_USER.email, DEFAULT_USER.password);
    });
    expect(result.current.user).toBeDefined();
    expect(result.current.user!.email).toEqual(DEFAULT_USER.email);
  });

  describe('register()', () => {
    it('should create and sign-in new users with email/password', async () => {
      const { result } = renderAuth();

      expect(result.current.user).toBeNull();
      const user = newRandomUser();
      await act(async () => {
        await result.current.register(user.email, user.password);
      });

      expect(result.current.user).toBeDefined();
      expect(result.current.user!.email).toEqual(user.email);
    });

    it('should fail to create a user with no email', async () => {
      const { result } = renderAuth();

      expect(result.current.user).toBeNull();

      let firebaseError: FirebaseError | undefined = undefined;
      await act(async () => {
        try {
          await result.current.register('', 'password');
        } catch (error) {
          firebaseError = error as FirebaseError;
        }
      });

      expect(firebaseError).toBeDefined();
      expect(firebaseError!.code).toEqual('auth/missing-email');
    });

    it('should fail to create a user with no password', async () => {
      const { result } = renderAuth();
      let firebaseError: FirebaseError | undefined = undefined;
      await act(async () => {
        try {
          await result.current.register(faker.internet.email(), '');
        } catch (error) {
          firebaseError = error as FirebaseError;
        }
      });
      expect(firebaseError).toBeDefined();
      expect(firebaseError!.code).toEqual('auth/internal-error');
    });

    it('should fail to create a user with an email that already exists', async () => {
      const { result } = renderAuth();
      let firebaseError: FirebaseError | undefined = undefined;
      await act(async () => {
        try {
          await result.current.register(
            DEFAULT_USER.email,
            faker.internet.password()
          );
        } catch (error) {
          firebaseError = error as FirebaseError;
        }
      });
      expect(firebaseError).toBeDefined();
      expect(firebaseError!.code).toEqual('auth/email-already-in-use');
    });
  });

  describe('signIn()', () => {
    it('should sign-in a user with a valid email/password', async () => {
      const { result } = renderAuth();
      expect(result.current.user).toBeNull();
      await act(async () => {
        await result.current.signIn(DEFAULT_USER.email, DEFAULT_USER.password);
      });
      expect(result.current.user?.email).toEqual(DEFAULT_USER.email);
    });

    it('should fail to sign-in a user with no email', async () => {
      const { result } = renderAuth();
      let firebaseError: FirebaseError | undefined = undefined;
      await act(async () => {
        try {
          await result.current.signIn('', 'password');
        } catch (error) {
          firebaseError = error as FirebaseError;
        }
      });
      expect(firebaseError).toBeDefined();
      expect(firebaseError!.code).toEqual('auth/missing-email');
    });

    it('should fail to sign-in a known user with a bad password', async () => {
      const { result } = renderAuth();
      let firebaseError: FirebaseError | undefined = undefined;
      await act(async () => {
        try {
          await result.current.signIn(DEFAULT_USER.email, 'bad-password');
        } catch (error) {
          firebaseError = error as FirebaseError;
        }
      });
      expect(firebaseError).toBeDefined();
      expect(firebaseError!.code).toEqual('auth/wrong-password');
    });
  });

  describe('signOut()', () => {
    it('should sign-out a signed-in user', async () => {
      const { result } = renderAuth();
      await act(async () => {
        await result.current.signIn(DEFAULT_USER.email, DEFAULT_USER.password);
      });

      expect(result.current.user?.email).toEqual(DEFAULT_USER.email);

      await act(async () => {
        await result.current.signOut();
      });

      expect(result.current.user).toBeNull();
    });
  });

  describe('changePassword()', () => {
    it("should change a valid user's password", async () => {
      const { result } = renderAuth();

      // Create new user
      const newUser = newRandomUser();
      await act(async () => {
        await result.current.register(newUser.email, newUser.password);
      });
      expect(result.current.user?.email).toEqual(newUser.email);

      // Change password, sign-out, sign-in with new password.
      const newPassword = faker.internet.password();
      await act(async () => {
        await result.current.changePassword(result.current.user!, newPassword);
        await result.current.signOut();
        await result.current.signIn(newUser.email, newPassword);
      });
      expect(result.current.user?.email).toEqual(newUser.email);
    });
  });
});
