import "./header.css";
import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router";
//import { render } from '@testing-library/react';
import PopUpLogin from "./login/login";
import { useSelector, useDispatch } from "react-redux";
import { signIn, signOut, notificationsPush } from "../redux/actions/";
import logo from "../img/ic.png";
import SearchBox from "./searchBox/searchBox";

// Plik zawiera zmiane kolorów, w tym kontrastu
// oraz zmiane tekstu
// Uzytkownik moze powiekszac i pomniejszac teskt i wybrac pasujacy
// mu motyw



function Header() {
  const [loginBool, setLoginBool] = useState(false);
  const isLogged = useSelector((state) => state.isLogged);
  const notifications = useSelector((state) => state.notifications);
  const dispatch = useDispatch();
  const history = useHistory();
  const [searchBoxes, setSerachBoxes] = useState(null);
  const [focused, setFocused] = useState(false);

  const search = useRef();
  const searchBox = useRef();

  useEffect(() => {
    async function fetchDatta() {
      const fetchData = await fetch("http://localhost/blogg/api/isLogged.php", {
        credentials: "include",
        method: "GET",
      });
      const data = await fetchData.json();
      if (data.status === 1) {
        dispatch(signIn());
      }
    }
    fetchDatta();
  }, [dispatch, isLogged, notifications]);

  const onFocus = () => {
    setFocused(true);
    searchBox.current.style.width = "210px";
  };
  const onBlur = () => {
    if (search.current.value.length === 0) {
      searchBox.current.style.width = "30px";
      setFocused(false);
    }
  };
  const onMouseEnter = () => {
    searchBox.current.style.width = "210px";
  };
  const onMouseLeave = () => {
    if (focused === false) {
      searchBox.current.style.width = "30px";
    }
  };

  const onChange = async (e) => {
    const reqBody = {
      phrase: e.target.value,
      long: false,
    };
    const fetchData = await fetch("http://localhost/blogg/api/search.php", {
      credentials: "include",
      method: "POST",
      body: JSON.stringify(reqBody),
    });
    const data = await fetchData.json();
    if (data.status === 1) {
      var dataToDisplay = await data.body.map((x) => (
        <SearchBox
          key={x.id}
          object={x}
          onLinkClicked={() => {
            search.current.value = "";
            setSerachBoxes(null);
            searchBox.current.style.width = "30px";
            setFocused(false);
          }}
        />
      ));

      setSerachBoxes(dataToDisplay);
    }
  };

  const logOut = async () => {
    const fetchData = await fetch("http://localhost/blogg/api/logout.php", {
      credentials: "include",
      method: "GET",
    });
    const data = await fetchData.json();
    if (data.status === 1) {
      dispatch(signOut());
      history.push("/");
      // history.go(0);
      dispatch(notificationsPush({ x: "Zostałeś wylogowany", color: "" }));
    }
  };

  function* switcher() {
    let state = 0;
    const root = document.documentElement;
    while (true) {
      root.style.setProperty("--background", "#fff");
      root.style.setProperty("--backgroundLight", "rgb(199, 199, 199)");
      root.style.setProperty("--textOnBackground", "rgb(19, 19, 19)");
      root.style.setProperty("--textOnContrast", "rgb(241, 241, 241)");

      yield;
      root.style.setProperty("--background", "#000");
      root.style.setProperty("--backgroundLight", "rgb(59, 59, 59)");
      root.style.setProperty("--textOnBackground", "#ffdd00");
      root.style.setProperty("--textOnContrast", "#ff0000");

      yield;

      root.style.setProperty("--background", "rgb(44, 44, 44)");
      root.style.setProperty("--backgroundLight", "rgb(59, 59, 59)");
      root.style.setProperty("--textOnBackground", "rgb(241, 241, 241)");
      root.style.setProperty("--textOnContrast", "rgb(19, 19, 19)");
      yield;
      if (state === 3) state = 1;
    }
  }

  const changeFontSize = (property, action) => {
    const root = document.documentElement;
    const rootToGet = window.getComputedStyle(root);
    const text = rootToGet.getPropertyValue(property);
    let output = text.substring(0, text.length - 2);
    console.log(output);
    if (action === true) root.style.setProperty(property, `${++output}px`);
    else if (action === false)
      root.style.setProperty(property, `${--output}px`);
    else throw "Parameter action is not a boolean";
  };
  let switchColors = switcher();

  const zoomIn = () => {
    changeFontSize("--normalFontSize", true);
    changeFontSize("--mediumFontSize", true);
    changeFontSize("--bigFontSize", true);
    changeFontSize("--defaultFontSize", true);
  };

  const zoomOut = () => {
    changeFontSize("--normalFontSize", false);
    changeFontSize("--mediumFontSize", false);
    changeFontSize("--bigFontSize", false);
    changeFontSize("--defaultFontSize", false);
  };

  return (
    <div className="header">
      <div className="mainHeader">
        <div className="mainHeaderWrap">
          <Link to={"/"}>
            <div className="logo">news portal</div>
          </Link>
          <div className="loginRegisterButtons">
            <div className="headerWrapper">
              <div className="HeaderAccessibilityOptions">
                <div className="HeaderZoomOut" onClick={() => zoomOut()}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="39.805"
                    height="30"
                    viewBox="0 0 39.805 30"
                    fill="var(--textOnBackground)"
                  >
                    <path
                      id="Icon_awesome-font"
                      data-name="Icon awesome-font"
                      d="M28.929,27.9H27.361L18.608,3.64a2.143,2.143,0,0,0-2.029-1.452H13.421A2.143,2.143,0,0,0,11.392,3.64L2.639,27.9H1.071A1.071,1.071,0,0,0,0,28.973v2.143a1.071,1.071,0,0,0,1.071,1.071H9.643a1.071,1.071,0,0,0,1.071-1.071V28.973A1.071,1.071,0,0,0,9.643,27.9H8.332l1.56-4.286H20.108l1.56,4.286H20.357a1.071,1.071,0,0,0-1.071,1.071v2.143a1.071,1.071,0,0,0,1.071,1.071h8.571A1.071,1.071,0,0,0,30,31.116V28.973A1.071,1.071,0,0,0,28.929,27.9ZM11.843,18.259,15,9.588l3.157,8.671Z"
                      transform="translate(0 -2.188)"
                    />
                    <path
                      id="Icon_awesome-minus"
                      data-name="Icon awesome-minus"
                      d="M13,14.219H1a1,1,0,0,0-1,1v1a1,1,0,0,0,1,1H13a1,1,0,0,0,1-1v-1A1,1,0,0,0,13,14.219Z"
                      transform="translate(25.805 -0.719)"
                    />
                  </svg>
                </div>
                <div className="HeaderZoomIn" onClick={() => zoomIn()}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="39.805"
                    height="30"
                    viewBox="0 0 39.805 30"
                    fill="var(--textOnBackground)"
                  >
                    <path
                      id="Icon_awesome-font"
                      data-name="Icon awesome-font"
                      d="M28.929,27.9H27.361L18.608,3.64a2.143,2.143,0,0,0-2.029-1.452H13.421A2.143,2.143,0,0,0,11.392,3.64L2.639,27.9H1.071A1.071,1.071,0,0,0,0,28.973v2.143a1.071,1.071,0,0,0,1.071,1.071H9.643a1.071,1.071,0,0,0,1.071-1.071V28.973A1.071,1.071,0,0,0,9.643,27.9H8.332l1.56-4.286H20.108l1.56,4.286H20.357a1.071,1.071,0,0,0-1.071,1.071v2.143a1.071,1.071,0,0,0,1.071,1.071h8.571A1.071,1.071,0,0,0,30,31.116V28.973A1.071,1.071,0,0,0,28.929,27.9ZM11.843,18.259,15,9.588l3.157,8.671Z"
                      transform="translate(0 -2.188)"
                    />
                    <path
                      id="Icon_awesome-plus"
                      data-name="Icon awesome-plus"
                      d="M13,7.687H8.5v-4.5a1,1,0,0,0-1-1h-1a1,1,0,0,0-1,1v4.5H1a1,1,0,0,0-1,1v1a1,1,0,0,0,1,1H5.5v4.5a1,1,0,0,0,1,1h1a1,1,0,0,0,1-1v-4.5H13a1,1,0,0,0,1-1v-1A1,1,0,0,0,13,7.687Z"
                      transform="translate(25.805 5.813)"
                    />
                  </svg>
                </div>

                <div
                  className="HeaderColorSwitch"
                  onClick={() => switchColors.next()}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="35"
                    height="35"
                    viewBox="0 0 35 35"
                    fill="var(--textOnBackground)"
                  >
                    <path
                      id="Icon_ionic-ios-contrast"
                      data-name="Icon ionic-ios-contrast"
                      d="M20.781,3.281a17.5,17.5,0,1,0,17.5,17.5A17.5,17.5,0,0,0,20.781,3.281Zm10.71,28.21a15.044,15.044,0,0,1-10.71,4.434V5.637a15.147,15.147,0,0,1,10.71,25.855Z"
                      transform="translate(-3.281 -3.281)"
                    />
                  </svg>
                </div>
              </div>
              <div
                className="buttonBlank leftButton hovered"
                onClick={() => (isLogged ? logOut() : setLoginBool(true))}
              >
                {isLogged ? "Wyloguj" : "Zaloguj"}
              </div>
              <Link to={isLogged ? "/panel" : "/register"} className="linkBox">
                <div className="buttonFill hovered">
                  {isLogged ? "Panel Użytkownika" : "Zarejestruj"}
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="bottomHeader">
        <div className="bottomHeaderWrap">
          <ul className="bottomHeaderList">
            <Link
              to={{
                pathname: "/articles",
                state: { category: "ogrod" },
              }}
            >
              <li>OGRÓD</li>
            </Link>
            <Link
              to={{
                pathname: "/articles",
                state: { category: "polityka" },
              }}
            >
              <li>POLITYKA</li>
            </Link>
            <Link
              to={{
                pathname: "/articles",
                state: { category: "news" },
              }}
            >
              <li>NEWS</li>
            </Link>
          </ul>
          <div className="searchWrapper">
            <div
              className="searchBox"
              onMouseEnter={() => onMouseEnter()}
              onMouseLeave={() => onMouseLeave()}
              ref={searchBox}
            >
              <div className="searchBefore"></div>
              <input
                type="text"
                ref={search}
                className="search toSelect"
                name="search"
                placeholder="Wyszukaj"
                onFocus={() => onFocus()}
                onBlur={() => onBlur()}
                onChange={(e) => onChange(e)}
              />
              <div className="searchButton">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                >
                  <path
                    id="Icon_awesome-search"
                    data-name="Icon awesome-search"
                    d="M19.728,17.291,15.833,13.4a.937.937,0,0,0-.664-.273h-.637a8.122,8.122,0,1,0-1.406,1.406v.637a.937.937,0,0,0,.273.664l3.895,3.894a.934.934,0,0,0,1.324,0l1.106-1.105A.942.942,0,0,0,19.728,17.291Zm-11.6-4.168a5,5,0,1,1,5-5A5,5,0,0,1,8.126,13.124Z"
                    fill="#fff"
                  />
                </svg>
              </div>
            </div>
            <div className="searchList">{searchBoxes}</div>
          </div>
        </div>
      </div>
      <PopUpLogin show={loginBool} onClose={() => setLoginBool(false)} />
    </div>
  );
}

export default Header;
