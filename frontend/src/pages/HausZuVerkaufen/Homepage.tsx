import { Link } from "react-router-dom";
import styled from "styled-components";
import HausZuVerkaufenList from "../../components/HausZuVerkaufen/HausZuVerkaufenList";
import Logo from "../../components/Logo";

const Banner = styled.h4`
  position: relative;
  background-image: url("/banner.png");
  background-size: cover;
  background-position: center;
  padding: 40px;
  min-height: 300px;
  color: white;
  border-radius: 8px;
  font-size: 48px;
  font-weight: bold;
  text-align: center;
  z-index: 1;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.4); /* Overlay sombre */
    z-index: -1;
  }
`;

const HomePage = () => {
  return (
    <div>
      {/* NAVBAR */}
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container d-flex justify-content-between align-items-center">
          <div className="d-flex align-items-center gap-3">
            <Logo width={120} height={100} />
            <span className="navbar-brand mb-0 h1">Immobilien</span>
          </div>

          <div>
            <ul className="navbar-nav flex-row gap-3">
              <li className="nav-item">
                <Link to="/kontakt" className="nav-link">
                  Kontakt
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/ueber-uns" className="nav-link">
                  Über uns
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* FULL-WIDTH BANNER */}
      <Banner className="mb-4">Willkommen!</Banner>

      {/* CONTENT CONTAINER */}
      <div className="container">
        <HausZuVerkaufenList />
      </div>
    </div>
  );
};

export default HomePage;
