import Keycloak from 'keycloak-js';

let keycloak = null;

if (typeof window !== 'undefined') {
  // Initialize Keycloak instance only in the browser environment
  const keycloakConfig = {
    url: 'http://localhost:8090/realms/liveassist360/protocol/openid-connect/auth',
    realm: 'liveassist360',
    clientId: 'reboot-keycloak',
  };
  keycloak = new Keycloak(keycloakConfig);
}

export const initKeycloak = () => {
  return new Promise((resolve, reject) => {
    if (!keycloak) {
      // Keycloak is not available in the current environment
      reject(new Error('Keycloak is not available in the current environment.'));
      return;
    }

    keycloak.init({ onLoad: 'login-required' })
      .then((authenticated) => {
        if (authenticated) {
          console.log('User is authenticated');
          resolve(keycloak);
        } else {
          console.log('User is not authenticated');
          reject(new Error('User is not authenticated'));
        }
      })
      .catch((error) => {
        console.error('Error initializing Keycloak', error);
        reject(error);
      });
  });
};

export default keycloak;
