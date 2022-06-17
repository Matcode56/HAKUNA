import { Link } from "react-router-dom";

export default function Navigation(props:any) {

    return (
      <nav className="bg-transparent  border-l-8 border-lavender h-screen flex flex-col justify-center fixed">
        <ul>
          <li className="bg-lavender rounded-3xl -ml-4 flex justify-end pr-3 py-1 px-5 mb-20">
            <Link to="/" data-testid="Home">
              <img src="/icons/home.svg" alt="" />
            </Link>
          </li>
          <li className="bg-lavender rounded-3xl -ml-4 flex justify-end pr-3 py-1 px-5 mb-20">
            <Link to="/projects" data-testid="Projects">
              <img src="/icons/projects.svg" alt="" />
            </Link>
          </li>
        </ul>
      </nav>
    );
  }
  