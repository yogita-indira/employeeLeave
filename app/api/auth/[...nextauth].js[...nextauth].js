// pages/api/auth/[...nextauth].js

import NextAuth from "next-auth"
import Providers from 'next-auth/providers';
export default NextAuth({
  providers: [
    Providers.Google({
      clientId: "759978912156-alntqsqjj3jpv27q6gk655nlp3n4lbme.apps.googleusercontent.com",
      clientSecret: "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",
    }),
    // Add other providers as needed
  ],
  // Optional configuration options
});
