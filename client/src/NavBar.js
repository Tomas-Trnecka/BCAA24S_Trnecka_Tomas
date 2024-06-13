import { useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Icon from "@mdi/react";
import { mdiDesktopClassic, mdiHome } from "@mdi/js";
import Button from "react-bootstrap/Button";
import logo from "./assets/databyte.png";

function NavBar() {
  const navigate = useNavigate();

  return (
    <Navbar expand="lg" style={componentStyle()}>
      <Container>
        <Navbar.Brand style={{ display: "flex", alignItems: "center" }}>
          <img src={logo} alt="Logo" style={{ height: 60 }} />
        </Navbar.Brand>
        <Nav className="ml-auto">
          <Button style={linkStyle()} onClick={() => navigate("/")}>
            <Icon path={mdiHome} size={1} color={"white"} />
            Home
          </Button>
          <Button style={linkStyle()} onClick={() => navigate("/pcconfig")}>
            <Icon path={mdiDesktopClassic} size={1} color={"white"} />
            My PC
          </Button>
        </Nav>
      </Container>
    </Navbar>
  );
}

function componentStyle() {
  return { backgroundColor: "#6495ED" };
}

function linkStyle() {
  return {
    display: "flex",
    gap: "8px",
    color: "white",
    margin: "5px",
    backgroundColor: "#006eff",
    border: "none",
  };
}

export default NavBar;
