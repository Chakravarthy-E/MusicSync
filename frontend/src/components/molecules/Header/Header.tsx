import { CgProfile } from "react-icons/cg";

export default function Header() {
  return (
    <div className="flex justify-between items-center border-b px-10 py-4">
      <div>
        <h1 className="logo">
          Music<span className="text-blue-500">S</span>nyc
        </h1>
      </div>
      <div>
        <button>
          <CgProfile size={35} />
        </button>
      </div>
    </div>
  );
}
