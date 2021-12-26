// Import the functions you need from the SDKs you need
import admin from 'firebase-admin'

const credentials = {
  type: 'service_account',
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  clientEmail: process.env.NEXT_PUBLIC_FIREBASE_CLIENT_EMAIL,
  // The private key must not be accesssible on the client side.
  privateKey: (process.env.FIREBASE_PRIVATE_KEY || '').replace(/\\n/g, '\n'),
  privateKeyId: process.env.FIREBASE_PRIVATE_KEY_ID,
  authUri: process.env.NEXT_PUBLIC_FIREBASE_AUTH_URI,
  tokenUri: process.env.NEXT_PUBLIC_FIREBASE_TOKEN_URI,
  auth_provider_x509_cert_url: process.env.FIREBASE_AUTH_PROVIDER_X509_CERT_URL,
  client_x509_cert_url: process.env.FIREBASE_CLIENT_X509_CERT_URL,
}

const FirebaseCredentials = {
  credential: admin.credential.cert(credentials),
  databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
}

// if a Firebase instance doesn't exist, create one
if (!admin.apps.length) {
  admin.initializeApp(FirebaseCredentials)
}

// Initialize Firebase
export const adminDB = admin.database()
