import React, { useState } from "react";
// import Sidebar from '../sidebar';
import { Accordion, ListGroup } from "react-bootstrap";
import "./_index.scss";
import navData from "../../data/nav.json";
import { faBars, faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Header = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const generateNav = (data) => {
    console.log("data");

    return data.map((navItem, i) => {
      return (
        <div key={i}>
          {!navItem.sub ? (
            <ListGroup.Item as="li">
              <a href={navItem.path}>{navItem.label}</a>
            </ListGroup.Item>
          ) : (
            <>
              <Accordion.Toggle
                as="li"
                className="list-item pl-3"
                eventKey={navItem.path}
              >
                <span>{navItem.label}</span>
                <FontAwesomeIcon className="ml-2" icon={faChevronDown} />
              </Accordion.Toggle>

              <Accordion.Collapse>
                <Accordion>
                  <ListGroup as="ul">{generateNav(navItem.sub)}</ListGroup>
                </Accordion>
              </Accordion.Collapse>
            </>
          )}
        </div>
      );
    });
  };

  return (
    <>
      <div
        onClick={() => {
          setIsOpen(!setIsOpen);
        }}
        className={`black-bg transition w-100 h-100 position-fixed ${isOpen ? "black-bg-open" : ""}`}
        role="button"
      ></div>

      <header className="w-100 d-flex align-items-center">
        <div
          className="nav-button rounded ml-3 px-2 py-1 border border-dark"
          onClick={() => {
            setIsOpen(!isOpen);
          }}
        >
          <FontAwesomeIcon className="" icon={faBars} />
        </div>

        <div className={`sidebar transition ${isOpen ? "sidebar-open" : ""}`}>
          <nav className="sidebar-container">
            {navData && (
              <Accordion>
                <ListGroup as="ul">{generateNav(navData.data)}</ListGroup>
              </Accordion>
            )}
          </nav>
        </div>
      </header>
    </>
  );
};

export default Header;
