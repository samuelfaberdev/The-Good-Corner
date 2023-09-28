import Layout from "@/components/Layout";
import { useRouter } from "next/router";

export default function AdDetailComponent() {
  const router = useRouter();

  return (
    <>
      <Layout title={`Détails de l'annonce ${router.query.id}`}>
        <p>
          Voici les informations détaillées de l&apos;annonce {router.query.id}{" "}
        </p>
      </Layout>
    </>
  );
}
