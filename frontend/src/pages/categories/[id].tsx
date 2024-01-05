import { AdType } from "@/components/AdCard";
import Layout from "@/components/Layout";
import { getAds } from "@/graphql/getAds";
import { useQuery } from "@apollo/client";

function CategoryDetail() {
  const { loading, error, data } = useQuery(getAds);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  const ads: AdType[] = data.getAds;

  console.log(ads);

  return (
    <Layout title={`Détails de la catégorie`}>
      <p>Test</p>
    </Layout>
  );
}

export default CategoryDetail;
