import * as admin from 'firebase-admin';

if (!admin.apps.length) {
  try {
    admin.initializeApp({
      credential: admin.credential.applicationDefault(),
      projectId: "acceso-a-cursos-4a314"
    });
  } catch (error) {
    console.error('Firebase Admin Initialization Error', error);
  }
}

export const adminAuth = admin.auth();
export const adminDb = admin.firestore();
