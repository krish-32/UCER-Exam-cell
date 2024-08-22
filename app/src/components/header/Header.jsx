import React from "react";
import ucerLogo from "../../assets/ucerLogo.jpg";
import "./header.css";

const Header = () => {
  return (
    <>
      <header>
        <img
          src={ucerLogo}
          alt="UCER LOGO"
          className="img-fluid  img-thumbnail"
        />
      </header>
    </>
  );
};

export default Header;
