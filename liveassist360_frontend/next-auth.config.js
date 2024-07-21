// next-auth.config.js
import NextAuth from 'next-auth';
import KeycloakProvider from 'next-auth/providers/keycloak';

const keycloakBaseUrl = 'http://localhost:8090/auth';

const options = {
  providers: [
    KeycloakProvider({
      clientId: 'reboot-keycloak',
      clientSecret: 'nuAOLydAqduK9y8kFtPr8XjpQpnew2q0',
      realm: 'liveassist360',
      keycloakUrl: `http://localhost:8090/realms/liveassist360/protocol/openid-connect/auth`,
    }),
  ],
};

export default NextAuth(options);
