// users/{uid}
{
	email: "usuario@ejemplo.com",
	role: "free", // valores: 'free', 'silver', 'gold', 'admin'
	subscriptionStatus: "active", // o 'past_due', 'canceled'
	subscriptionEnd: Timestamp, // Cuándo vence la semana
	createdAt: Timestamp
}
const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

exports.createUserDocument = functions.auth.user().onCreate((user) => {
    return admin.firestore().collection('users').doc(user.uid).set({
        email: user.email,
        role: 'free', // Nivel por defecto
        subscriptionStatus: 'inactive',
        createdAt: admin.firestore.FieldValue.serverTimestamp()
    });
});
// Ejemplo conceptual de un Webhook de pago
exports.handlePaymentWebhook = functions.https.onRequest(async (req, res) => {
	const event = req.body;

	// Lógica para verificar la firma del webhook (Criptografía básica)
	// ...

	if (event.type === 'invoice.payment_succeeded') {
					const customerId = event.data.object.customer;
					const amountPaid = event.data.object.amount_paid;
					
					// Determinar nivel basado en el monto pagado
					let newRole = 'free';
					if (amountPaid === 500) newRole = 'silver'; // Ejemplo $5.00
					if (amountPaid === 1000) newRole = 'gold';  // Ejemplo $10.00

					// Buscar al usuario por su ID de cliente de pago y actualizar
					const userSnapshot = await admin.firestore().collection('users')
									.where('stripeCustomerId', '==', customerId).get();

					if (!userSnapshot.empty) {
									const userDoc = userSnapshot.docs[0];
									// Aquí ocurre la magia: Actualización segura del nivel
									await userDoc.ref.update({
													role: newRole,
													subscriptionStatus: 'active',
													// Sumar 7 días a la fecha actual
													subscriptionEnd: admin.firestore.Timestamp.fromDate(new Date(Date.now() + 7 * 24 * 60 * 60 * 1000))
									});
					}
	}
	res.json({received: true});
});
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {

    // --- FUNCIONES AUXILIARES (La magia del código limpio) ---

    // Obtener los datos del usuario actual desde la DB
    function getUserData() {
      return get(/databases/$(database)/documents/users/$(request.auth.uid)).data;
    }

    // Verificar si está logueado
    function isSignedIn() {
      return request.auth != null;
    }

    // Jerarquía de roles: Admin > Gold > Silver > Free
    // Un Gold puede ver cosas de Silver, pero un Silver no cosas de Gold.
    
    function isSilverOrBetter() {
       let role = getUserData().role;
       return role == 'silver' || role == 'gold' || role == 'admin';
    }

    function isGoldOrBetter() {
       let role = getUserData().role;
       return role == 'gold' || role == 'admin';
    }

    function isAdmin() {
       return getUserData().role == 'admin';
    }

    // --- REGLAS DE ACCESO POR COLECCIÓN ---

    // 1. INVITADOS (Público)
    match /publicContent/{docId} {
      allow read: if true; // Cualquiera puede leer
    }

    // 2. ACCESO GRATUITO (Solo autenticados)
    match /freeContent/{docId} {
      allow read: if isSignedIn();
    }

    // 3. ACCESO PLATA (Paga cuota base)
    match /premiumContent/{docId} {
      allow read: if isSignedIn() && isSilverOrBetter();
    }

    // 4. ACCESO ORO (Paga cuota VIP)
    match /vipContent/{docId} {
      allow read: if isSignedIn() && isGoldOrBetter();
    }

    // 5. ADMINISTRADOR (Control total)
    match /users/{userId} {
      // El usuario puede leer su propio perfil
      allow read: if request.auth.uid == userId;
      // Solo el admin puede escribir/editar roles manualmente
      allow write: if isSignedIn() && isAdmin();
    }
    
    match /systemSettings/{docId} {
       allow read, write: if isSignedIn() && isAdmin();
    }
  }
}
// useRole.js
import { useState, useEffect } from 'react';
import { auth, db } from './firebase'; // tu config
import { doc, onSnapshot } from 'firebase/firestore';

export function useUserRole() {
  const [role, setRole] = useState('guest');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Escuchar cambios de autenticación
    const unsubscribeAuth = auth.onAuthStateChanged((user) => {
      if (user) {
        // Si está logueado, escuchar cambios en su documento de rol en tiempo real
        const unsubscribeSnapshot = onSnapshot(doc(db, "users", user.uid), (doc) => {
            if (doc.exists()) {
                const data = doc.data();
                // Verificar si la suscripción ha expirado
                const now = new Date();
                if (data.subscriptionEnd && data.subscriptionEnd.toDate() < now && data.role !== 'admin') {
                   setRole('free'); // Degradación automática en UI
                } else {
                   setRole(data.role);
                }
            } else {
                setRole('free');
            }
            setLoading(false);
        });
        return () => unsubscribeSnapshot();
      } else {
        setRole('guest');
        setLoading(false);
      }
    });
    return () => unsubscribeAuth();
  }, []);

  return { role, loading };
}
const { role } = useUserRole();

if (role === 'guest') return <LoginButton />;
if (role === 'free') return <UpgradeToSilverButton />;
if (role === 'silver') return <ContentSilver />;
// ... etc