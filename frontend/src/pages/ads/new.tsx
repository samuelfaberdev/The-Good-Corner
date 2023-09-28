import { CategoryType } from "@/components/Category";
import Layout from "@/components/Layout";
import { API_URL } from "@/config";
import axios from "axios";
import { FormEvent, useEffect, useState } from "react";

export default function AdDetailComponent() {
  const [categories, setCategories] = useState([] as CategoryType[]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imgSrc, setImgSrc] = useState("");
  const [price, setPrice] = useState(0);
  const [categoryId, setCategoryId] = useState<number | null>();

  async function fetchCategories() {
    try {
      const result = await axios.get(`${API_URL}/categories`);
      setCategories(result.data);
    } catch (error) {
      console.error(error);
    }
  }

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    axios.post(`${API_URL}/ads`, {
      title,
      description,
      imgSrc,
      price,
      category: categoryId,
    });
  }

  useEffect(() => {
    fetchCategories();
  }, []);

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
