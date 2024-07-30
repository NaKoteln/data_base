import { ReactNode, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button, Collapse } from "reactstrap";
import { pagesReport, pagesTable } from "../routes/AppRouter";
import { jwtDecode } from "jwt-decode";

interface LayoutProps {
  children: ReactNode;
}

function BaseLayout(props: LayoutProps) {
  const [tIsOpen, setTIsOpen] = useState(false);
  const [rIsOpen, setRIsOpen] = useState(false);

  const toggleT = () => setTIsOpen(!tIsOpen);
  const toggleR = () => setRIsOpen(!rIsOpen);

  const logout = () => {
    sessionStorage.removeItem("token");
    location.reload();
  };

  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, [pathname]);

  const token = sessionStorage.getItem("token");
  const user: { role: string } = jwtDecode(token ?? "");

  return (
    <>
      <div className="d-flex">
        <div className="col-3 p-3 d-flex flex-column gap-3">
          <Button color="info" outline onClick={toggleT}>
            Tables
          </Button>
          <Collapse isOpen={tIsOpen}>
            {pagesTable.map((p, i) => (
              <Link key={i} to={`/${p.path}`}>
                <Button
                  className="w-100 my-1"
                  outline
                  // color={pageIndex == i ? "primary" : undefined}
                  // onClick={() => setPageIndex(i)}
                >
                  {p.title}
                </Button>
              </Link>
            ))}
          </Collapse>
          <Button color="info" outline onClick={toggleR}>
            Reports
          </Button>
          <Collapse isOpen={rIsOpen}>
            {pagesReport.map((p, i) => (
              <Link key={i} to={`/${p.path}`}>
                <Button
                  className="w-100 my-1"
                  outline
                  // color={pageIndex == i ? "primary" : undefined}
                  // onClick={() => setPageIndex(i)}
                >
                  {p.title}
                </Button>
              </Link>
            ))}
          </Collapse>
          {user.role === "admin" && (
            <Link to={`/query`}>
              <Button className="w-100 my-1" outline>
                Query
              </Button>
            </Link>
          )}
          <Button color="dark" outline onClick={() => logout()}>
            Sign-Out
          </Button>
        </div>
        <div className="col-9 p-3">{props.children}</div>
      </div>
    </>
  );
}

export default BaseLayout;
