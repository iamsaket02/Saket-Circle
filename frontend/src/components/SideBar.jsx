import { Link, useLocation } from "react-router";
import userAuthUser from "../hooks/userAuthUser";
import { BellIcon, CircleFadingPlus, HomeIcon, SearchIcon } from "lucide-react";
import { capitalizeWords } from "../common/utils";

const SideBar = () => {
  const { authUser } = userAuthUser();
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <>
      <aside className="w-64 bg-base-200 border-r border-base-300 hidden lg:flex flex-col h-screen sticky top-0">
        <div className="p-5 border-b border-base-300">
          <Link to="/" className="flex items-center gap-2.5">
            <CircleFadingPlus className="size-9 text-primary" />
            <span className="text-3xl font-bold font-mono bg-clip-text text-transparent bg-linear-to-r from-primary to-secondary tracking-wider">
              Circle
            </span>
          </Link>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          <Link
            to="/"
            className={`btn btn-ghost justify-start w-full gap-3 px-3 normal-case ${currentPath === "/" ? "btn-active" : ""}`}
          >
            <HomeIcon className="size-5 text-base-content opacity-70" />
            <span>Home</span>
          </Link>

          <Link
            to="/search"
            className={`btn btn-ghost justify-start w-full gap-3 px-3 normal-case ${currentPath === "/search" ? "btn-active" : ""}`}
          >
            <SearchIcon className="size-5 text-base-content opacity-70" />
            <span>Search</span>
          </Link>

          <Link
            to="/notifications"
            className={`btn btn-ghost justify-start w-full gap-3 px-3 normal-case ${currentPath === "/notifications" ? "btn-active" : ""}`}
          >
            <BellIcon className="size-5 text-base-content opacity-70" />
            <span>Notifications</span>
          </Link>
        </nav>

        <div className="p-4 border-t border-base-300 mt-auto">
          <div className="flex items-center gap-3">
            <div className="avatar">
              <div className="w-10 rounded-full">
                <img src={authUser?.profilePic} alt="User avatar" />
              </div>
            </div>
            <div className="flex-1">
              <p className="font-semibold text-sm">
                {capitalizeWords(authUser?.fullName)}
              </p>
              <p className="text-xs text-success flex items-center gap-1">
                <span className="size-2 rounded-full bg-success inline-block" />
                Online
              </p>
            </div>
          </div>
        </div>
      </aside>

      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-base-200 border-t border-base-300">
        <div className="flex justify-around items-center px-2 py-2">
          <Link
            to="/"
            className={`btn btn-ghost btn-sm flex-1 justify-center gap-1 normal-case ${currentPath === "/" ? "btn-active" : ""}`}
          >
            <HomeIcon className="size-5" />
          </Link>

          <Link
            to="/search"
            className={`btn btn-ghost btn-sm flex-1 justify-center gap-1 normal-case ${currentPath === "/search" ? "btn-active" : ""}`}
          >
            <SearchIcon className="size-5" />
          </Link>

          <Link
            to="/notifications"
            className={`btn btn-ghost btn-sm flex-1 justify-center gap-1 normal-case ${currentPath === "/notifications" ? "btn-active" : ""}`}
          >
            <BellIcon className="size-5" />
          </Link>
        </div>
      </nav>
    </>
  );
};

export default SideBar;
