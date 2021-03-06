import React, { Component } from "react";
import "../CSS/Header.css";
import { Navbar, Container, Nav, Dropdown } from "react-bootstrap";
import { BsList } from "react-icons/bs";
import { withAuth0 } from "@auth0/auth0-react";
import LogoutButton from "./LogoutButton";
import LoginButton from "./LoginButton";
import axios from "axios";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      scrolling: false,
      loadingUser: false,
    };
  }

  changeBackroung = () => {
    window.scrollY > 0
      ? this.setState({
          scrolling: true,
        })
      : this.setState({
          scrolling: false,
        });
  };

  // HERE
  createUser = (username, email, img) => {
    let config = {
      method: "POST",
      baseURL: `${process.env.REACT_APP_BACKEND_SERVER}`,
      url: "/create_account",
      data: {
        username: username,
        email: email,
        img: img,
      },
    };
    axios(config).then((res) => {
      // console.log(res.data);
    });
  };

  componentDidMount = () => {
    window.addEventListener("scroll", this.changeBackroung);
  };

  render() {
    return (
      <Navbar className={this.state.scrolling ? "nav_active" : "nav"}>
        <Container className="container">
          <Navbar.Brand
            className={this.state.scrolling ? "brandName_active" : "brandName"}
            href="/about_us"
          >
            ArtGram
          </Navbar.Brand>
          <Nav>
            <Nav.Item>
              <Nav.Link
                className={
                  this.state.scrolling ? "navItems_active" : "navItems"
                }
              >
                {this.props.auth0.isAuthenticated ? (
                  <LogoutButton />
                ) : (
                  <LoginButton />
                )}
                {/* for creating new users*/}
                {this.props.auth0.isAuthenticated && !this.props.gotUserFlag &&
                  this.createUser(
                    this.props.auth0.user.name,
                    this.props.auth0.user.email,
                    this.props.auth0.user.picture
                  )}
              </Nav.Link>
            </Nav.Item>
            {this.props.auth0.isAuthenticated && (
              <Nav.Item>
                <Dropdown>
                  <Dropdown.Toggle
                    variant="none"
                    className={
                      this.state.scrolling ? "navItems_active" : "navItems"
                    }
                  >
                    <BsList style={{fontSize: "25px"}}/>
                  </Dropdown.Toggle>
                  <Dropdown.Menu className={ this.state.scrolling ? "dropMenu_active" : "dropMenu"}>
                  <Dropdown.Item href="/" className="dropMenuItem">
                      Home
                    </Dropdown.Item>
                    <Dropdown.Item href="/gallery" className="dropMenuItem">
                      Gallery
                    </Dropdown.Item>
                    <Dropdown.Item href="/feed" className="dropMenuItem">
                      Feed
                    </Dropdown.Item>
                    <Dropdown.Item href="/about_us" className="dropMenuItem">
                      About Us
                    </Dropdown.Item>
                    <Dropdown.Item href="/page_not_found" className="dropMenuItem">
                      Contact Us
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </Nav.Item>
            )}
          </Nav>
        </Container>
      </Navbar>
    );
  }
}

export default withAuth0(Header);
