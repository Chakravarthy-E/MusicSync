import { FC } from "react";
import LikeButton from "../LikeButton/LikeButton";

interface Props {
  title: string;
  poster?: string;
  onLongPress?(): void;
  onClick?(): void;
}

const Card: FC<Props> = ({ title, poster }) => {
  return (
    <div className=" border w-56 h-56 rounded-md">
      <div className="flex flex-col">
        <img src={poster} alt={title} />
        <div className="flex  items-center justify-center  border-t">
          <p>{title}</p>
          <LikeButton />
        </div>
      </div>
    </div>
  );
};

export default Card;
