"use client";
import { FaHeart } from "react-icons/fa";
import { useState } from "react";

const LikeButton = () => {
  const [isLiked, setIsLiked] = useState(false);
  const handleIsLiked = () => {
    setIsLiked((prev) => !prev);
  };
  return (
    <button onClick={handleIsLiked} className={isLiked ? "text-blue-500" : ""}>
      <FaHeart size={25} />
    </button>
  );
};
export default LikeButton;
