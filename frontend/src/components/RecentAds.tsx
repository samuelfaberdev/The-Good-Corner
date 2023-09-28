import AdCard, { AdType } from "./AdCard";
import { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "@/config";

export default function RecentAds() {
  const [total, setTotal] = useState(0);
  const [ads, setAds] = useState([] as AdType[]);

  async function fetchAds() {
    try {
      const result = await axios.get(`${API_URL}/ads`);
      setAds(result.data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchAds();
  }, []);

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
              imgSrc={ad.imgSrc}
              title={ad.title}
              price={ad.price}
            />
            <button
              className="button"
              onClick={() => {
                setTotal(total + ad.price);
              }}
            >
              Ajouter au total
            </button>
          </div>
        ))}
      </section>
    </>
  );
}
