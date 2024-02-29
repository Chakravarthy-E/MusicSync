const ProfileInfo = ({
  label,
  icon,
  value,
}: {
  label?: string;
  icon?: JSX.Element;
  value?: string;
}) => (
  <div className="flex items-center space-x-4 rounded px-4 py-3 shadow">
    {icon}
    <div className="flex flex-col items-start">
      <h1 className="font-semibold sm:text-base md:text-base lg:text-xl">
        {label}
      </h1>
      <p className="text-base font-semibold text-slate-600">{value}</p>
    </div>
  </div>
);

export default ProfileInfo;
