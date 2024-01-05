import Layout from "@/components/Layout";
import { getMe } from "@/graphql/getMe";
import { mutationSignin } from "@/graphql/mutationSignin";
import { useMutation } from "@apollo/client";
import { useRouter } from "next/router";
import { FormEvent, useState } from "react";

export default function Signin() {
  const [email, setEmail] = useState("test@test.fr");
  const [password, setPassword] = useState("supersecret");
  const [doSignin, { error }] = useMutation(mutationSignin, {
    refetchQueries: [getMe],
  });
  const router = useRouter();

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      await doSignin({ variables: { email, password } });

      router.replace("/");
    } catch {}
  }

  return (
    <>
      <Layout title="Connexion">
        <form onSubmit={onSubmit} className="new-ad">
          {error && <p>Mauvais identifiants</p>}
          <label htmlFor="email">Email</label>
          <input
            type="text"
            name="email"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
          <label htmlFor="password">Mot de passe</label>
          <input
            type="password"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="button" type="submit">
            Connexion
          </button>
        </form>
      </Layout>
    </>
  );
}
