import Link from "next/link";

export type CategoryType = {
  id: number;
  name: string;
};

type CategoryProps = CategoryType;

export default function Category({ id, name }: CategoryProps) {
  return (
    <Link href={`/categories/${id}`} className="category-navigation-link">
      {name}
    </Link>
  );
}
