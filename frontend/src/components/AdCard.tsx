import Link from "next/link";
import Image from "next/image";

export type AdType = {
  id: number;
  title: string;
  imgSrc: string;
  price: number;
  description: string;
  category?: { id: number } | null;
};

type AdCardProps = AdType & {
  link: string;
};

export default function AdCard({ link, imgSrc, title, price }: AdCardProps) {
  return (
    <div className="ad-card-container">
      <Link className="ad-card-link" href={link}>
        <Image
          className="ad-card-image"
          src={imgSrc}
          alt={""}
          width={254}
          height={254}
        />
        <div className="ad-card-text">
          <div className="ad-card-title">{title}</div>
          <div className="ad-card-price">{price} €</div>
        </div>
      </Link>
    </div>
  );
}
