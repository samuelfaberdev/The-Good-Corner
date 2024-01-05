import Layout from "@/components/Layout";
import { AdType } from "@/components/AdCard";
import { getOneAd } from "@/graphql/getAdById";
import { useRouter } from "next/router";
import { useQuery } from "@apollo/client";

export default function AdDetailComponent() {
  const router = useRouter();

  const { loading, error, data } = useQuery(getOneAd, {
    variables: {
      getAdById: Number(router.query.id),
    },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  const ad: AdType = data.getAdById;

  console.log(ad);

  return (
    <>
      <Layout title={`Détails de l'annonce ${ad.id}`}>
        <p>Voici les informations détaillées de l&apos;annonce {ad.id} </p>
        <h2>{ad.title}</h2>
        <p>Description : {ad.description}</p>
        <p>Price : {ad.price} €</p>
      </Layout>
    </>
  );
}
