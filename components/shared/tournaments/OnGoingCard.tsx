import React, { Suspense } from "react";
import Image from "next/image";

interface Props {
  imageUrl: string;
}

const OnGoingCard = ({ imageUrl }: Props) => {
  return (
    <div className="flex gap-5 hover:scale-105 transition-all duration-300">
      <Suspense fallback={<div>Loading...</div>}>
        <Image
          src={imageUrl}
          width={200}
          height={100}
          alt="image"
          className="rounded-md"
        />
      </Suspense>
    </div>
  );
};

export default OnGoingCard;
