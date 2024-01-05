import Layout from "@/components/Layout";
import { AdType } from "@/components/AdCard";
import { CategoryType } from "@/components/Category";
import { getAds } from "@/graphql/getAds";
import { getCategories } from "@/graphql/getCategories";
import { mutationCreateAd } from "@/graphql/mutationCreateAd";
import { useMutation, useQuery } from "@apollo/client";
import { FormEvent, useState } from "react";
import { getMe } from "@/graphql/getMe";
import { useRouter } from "next/router";

export default function AdDetailComponent() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imgSrc, setImgSrc] = useState("");
  const [price, setPrice] = useState(0);
  const [categoryId, setCategoryId] = useState<number | null>();
  const router = useRouter();

  const { loading, error, data } = useQuery(getMe);
  const categoriesData = useQuery(getCategories);
  const [doCreate] = useMutation(mutationCreateAd, {
    refetchQueries: [getAds],
  });

  if (categoriesData.loading) return <p>Loading...</p>;
  if (categoriesData.error)
    return <p>Error : {categoriesData.error.message}</p>;

  const categories: CategoryType[] = categoriesData.data.getCategories;

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
    router.replace("/");
  }

  return (
    <>
      <Layout title={`Création d'une annonce`}>
        {!data ? (
          <p>
            Accès refusé : Vous devez vous connecter avant d&apos;effectuer
            cette action !
          </p>
        ) : (
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
        )}
      </Layout>
    </>
  );
}
