import { IoStatsChart } from "react-icons/io5";

export default function Nav() {
  return (
    <header className="container max-w-2xl px-6 py-6 mx-auto">
      <div className="flex items-center justify-between">
        {/* User infromation */}
        <div className="flex items-center gap-2">
          {/* img */}
          <div className="h-[40px] w-[40px] rounded-full overflow-hidden">
            <img
              className="object-cover w-full h-full "
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVGXpNvwI9dXwzSGDZQRJcAwnLI5DTban6-g&s"
              alt="Profile image"
            />
          </div>

          {/*name */}
          <small>Hi, Dawson!</small>
        </div>
        {/* Right side of our nav */}
        <nav className="flex items-center gap-4">
          <div>
            <IoStatsChart className="text-2xl" />
          </div>
          <div>
            <button className="btn btn-danger">Sign Out</button>
          </div>
        </nav>
      </div>
    </header>
  );
}
