import Layout from "@/components/Layout";
import { mutationSignup } from "@/graphql/mutationSignup";
import { useMutation } from "@apollo/client";
import { useRouter } from "next/router";
import { FormEvent, useState } from "react";

export default function Signup() {
  const [email, setEmail] = useState("test@test.fr");
  const [password, setPassword] = useState("supersecret");
  const [doSignup, { error }] = useMutation(mutationSignup);
  const router = useRouter();

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      await doSignup({ variables: { data: { email, password } } });

      router.replace("/signin");
    } catch {}
  }

  return (
    <>
      <Layout title="Inscription">
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
            Inscription
          </button>
        </form>
      </Layout>
    </>
  );
}
