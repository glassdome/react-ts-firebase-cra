import { initializeApp } from 'firebase/app';
import {
  getAuth,
  connectAuthEmulator,
  GoogleAuthProvider,
} from 'firebase/auth';
import 'firebase/firestore';
import { config } from './config';

export const Firebase = initializeApp(config.firebase);

export const auth = getAuth();

const withAuthEmulator = (): boolean => {
  const e = process.env.REACT_APP_USE_EMULATOR?.toLowerCase();
  return e !== undefined && e === 'true';
};

console.log(`USE_EMULATOR : ${process.env.REACT_APP_USE_EMULATOR}`);
console.log(`NOT_EXIST : ${process.env.REACT_APP_NOT_EXIST}`);
console.log(`PROCES_NAME: ${process.env.PROJECT_NAME}`);

if (withAuthEmulator()) {
  connectAuthEmulator(auth, 'http://localhost:9099');
}

export const AuthProviders = {
  google: new GoogleAuthProvider(),
};
