import Layout from "@/components/Layout";
import { AdType } from "@/components/AdCard";
import { CategoryType } from "@/components/Category";
import { getAds } from "@/graphql/getAds";
import { getCategories } from "@/graphql/getCategories";
import { mutationCreateAd } from "@/graphql/mutationCreateAd";
import { useMutation, useQuery } from "@apollo/client";
import { FormEvent, useState } from "react";

export default function AdDetailComponent() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imgSrc, setImgSrc] = useState("");
  const [price, setPrice] = useState(0);
  const [categoryId, setCategoryId] = useState<number | null>();

  const { loading, error, data } = useQuery(getCategories);
  const [doCreate] = useMutation(mutationCreateAd, {
    refetchQueries: [getAds],
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  const categories: CategoryType[] = data.getCategories;

  const newAd: Omit<AdType, "id"> = {
    title,
    description,
    imgSrc,
    price,
    category: { id: Number(categoryId) },
  };

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    doCreate({ variables: { data: newAd } });
  }

  return (
    <>
      <Layout title={`Création d'une annonce`}>
        <form onSubmit={onSubmit} className="new-ad">
          <label htmlFor="title">Titre</label>
          <input
            type="text"
            name="title"
            required
            onChange={(e) => setTitle(e.target.value)}
          />
          <label htmlFor="description">Description</label>
          <input
            type="text"
            name="description"
            onChange={(e) => setDescription(e.target.value)}
          />
          <label htmlFor="imgSrc">URL de l&apos;image</label>
          <input
            type="text"
            name="imgSrc"
            required
            onChange={(e) => setImgSrc(e.target.value)}
          />
          <label htmlFor="price">Prix</label>
          <input
            type="number"
            name="price"
            required
            onChange={(e) => setPrice(Number(e.target.value))}
          />
          <label htmlFor="categoryId">Catégorie</label>
          <select
            name="categoryId"
            onChange={(e) => {
              setCategoryId(Number(e.target.value));
            }}
          >
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
          <button className="button" type="submit">
            Publier l&apos;annonce
          </button>
        </form>
      </Layout>
    </>
  );
}
