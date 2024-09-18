import type { AppProps } from "next/app";
import { ApolloProvider } from "@apollo/client";

import client from "./libs/apolloClient";
import "@/styles/globals.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
}
