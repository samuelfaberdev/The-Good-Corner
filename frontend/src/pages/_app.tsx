import "@/styles/globals.css";
import dynamic from "next/dynamic";
import type { AppProps } from "next/app";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
  useQuery,
} from "@apollo/client";
import { API_URL } from "@/config";
import { getMe } from "@/graphql/getMe";
import { useRouter } from "next/router";
import { useEffect } from "react";

const link = createHttpLink({
  uri: API_URL,
  credentials: "include",
});

const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
});

function Auth(props: { children: React.ReactNode }) {
  const router = useRouter();
  const publicRoutes = [
    "/",
    "/about",
    "/ads/[id]",
    "/signin",
    "/signup",
    "/categories/[id]",
  ];

  const { loading, error, data } = useQuery(getMe);

  useEffect(() => {
    console.log("Pathname =>", router.pathname);

    if (!publicRoutes.includes(router.pathname)) {
      console.log("Route privée");
      if (error) {
        console.log("Route privée : Utilisateur non-connecté");
        router.replace("/signin");
      }
    }
  }, [router, error, data]);

  if (loading) {
    return <p>En cours de chargement...</p>;
  }

  return props.children;
}

function App({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <Auth>
        <Component {...pageProps} />
      </Auth>
    </ApolloProvider>
  );
}

// Disabling SSR
export default dynamic(() => Promise.resolve(App), { ssr: false });
