import { ReactNode } from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import classes from "./header.module.css";

interface Props {
  children: ReactNode;
}

const Header: React.FC<Props> = ({ children }) => {
  const { pathname } = useLocation();

  return (
    <>
      <header className={classes.mainHeader}>
        <nav>
          <ul className={classes.links}>
            <li>
              <Link
                to="/"
                className={
                  pathname === "/"
                    ? `${classes.link} ${classes.activelink}`
                    : classes.link
                }
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/history"
                className={
                  pathname === "/history"
                    ? `${classes.link} ${classes.activelink}`
                    : classes.link
                }
              >
                History
              </Link>
            </li>
          </ul>
        </nav>
        {pathname === "/" && children}
      </header>
      <Outlet />
    </>
  );
};

export default Header;