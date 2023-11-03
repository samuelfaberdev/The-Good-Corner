import AdCard, { AdType } from "./AdCard";
import { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { getAds } from "@/graphql/getAds";
import { mutationDeleteAd } from "@/graphql/mutationDeleteAd";

export default function RecentAds() {
  const [total, setTotal] = useState(0);

  const { loading, error, data } = useQuery(getAds);
  const [doDelete] = useMutation(mutationDeleteAd, {
    refetchQueries: [getAds],
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  const ads: AdType[] = data.getAds;

  console.log(ads);

  async function DeleteAd(adId: number) {
    await doDelete({
      variables: {
        deleteAdId: Number(adId),
      },
    });
  }

  return (
    <>
      <h2>Annonces récentes</h2>
      <p>Prix total : {total}</p>
      <section className="recent-ads">
        {ads.map((ad) => (
          <div key={ad.id}>
            <AdCard
              id={ad.id}
              link={`/ads/${ad.id}`}
              imgSrc={ad.imgSrc ? ad.imgSrc : ""}
              title={ad.title}
              price={ad.price}
              description={ad.description}
            />
            <div className="ad-button">
              <button
                className="button"
                onClick={() => {
                  setTotal(total + ad.price);
                }}
              >
                Ajouter au total
              </button>
              <button className="button" onClick={() => DeleteAd(ad.id)}>
                Supprimer
              </button>
            </div>
          </div>
        ))}
      </section>
    </>
  );
}
