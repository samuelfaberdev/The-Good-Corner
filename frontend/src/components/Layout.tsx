import Head from "next/head";
import { ReactNode } from "react";
import Header from "./Header";

export default function Layout({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content="" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="favicon.ico" />
      </Head>
      <Header />
      <main className="main-content">{children}</main>
    </>
  );
}
