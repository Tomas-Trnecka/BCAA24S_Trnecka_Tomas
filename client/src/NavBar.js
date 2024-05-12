import { useNavigate } from "react-router-dom";

import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

import Icon from "@mdi/react";
import { mdiAlphaDBox, mdiAccountDetails, mdiDesktopClassic } from "@mdi/js";
import Button from "react-bootstrap/esm/Button";

function NavBar() {
  const navigate = useNavigate();

  return (
    <Navbar expand="lg" style={componentStyle()}>
      <Container>
        <Navbar.Brand>
          <Button style={brandStyle()} onClick={() => navigate("/")}>
            <Icon path={mdiAlphaDBox} size={1} color={"white"} />
            DATABYTE
          </Button>
        </Navbar.Brand>
        <Nav>
        </Nav>
        <Nav>
          <Button style={linkStyle()} onClick={() => navigate("/pcconfig")}>
            <Icon path={mdiDesktopClassic} size={1} color={"white"} />
            My PC
          </Button>
          <Button style={linkStyle()} onClick={() => navigate("/user")}>
            <Icon path={mdiAccountDetails} size={1} color={"white"} />
            User Profile
          </Button>
        </Nav>
      </Container>
    </Navbar>
  );
}

function componentStyle() {
  return { backgroundColor: "#7a7777" };
}

function brandStyle() {
  return {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    color: "white",
    backgroundColor: "black",
    border: "none"
  };
}

function linkStyle() {
  return {
    display: "flex",
    alignItems: "right",
    gap: "8px",
    color: "white",
    marginLeft: "auto",
    float: "right",
    margin: "5px",
    backgroundColor: "black",
    border: "none"
  };
}

export default NavBar;
