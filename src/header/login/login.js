import "./login.css";
import React from "react";
import reactDom from "react-dom";
import { signIn, notificationsPush } from "../../redux/actions/";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";

function PopUpLogin({ show, onClose }) {
  const history = useHistory();
  const dispatch = useDispatch();
  if (show === false) {
    //document.querySelector('body').style.overflow="visible";
    return null;
  } else {
    //document.querySelector('body').style.overflow="hidden";
  }

  const signUp = async () => {
    // var formData = new FormData();
    // formData.append('login', document.querySelector(".uniqueLoginInput").value);
    // formData.append('password',  document.querySelector(".uniquePasswordInput").value);
    const formData = {
      login: document.querySelector(".uniqueLoginInput").value,
      password: document.querySelector(".uniquePasswordInput").value,
    };

    const fetchData = await fetch("http://localhost/blogg/api/login.php", {
      credentials: "include",
      method: "POST",
      body: JSON.stringify(formData),
    });

    const data = await fetchData.json();
    if (data.status === 1 || data.alreadyLogged === true) {
      dispatch(signIn());

      dispatch(notificationsPush({ x: data.info, color: "" }));
      //history.go(0);
      onClose();
    } else {
      if (data.info)
        dispatch(notificationsPush({ x: data.info, color: "red" }));
    }
  };

  return reactDom.createPortal(
    <div className="loginBackground" onClick={onClose}>
      <div className="loginBox" onClick={(e) => e.stopPropagation()}>
        <input
          type="text"
          className="uniqueLoginInput loginRegisterInput toSelect"
          name="login"
          placeholder="login lub email"
          autoComplete="off"
        />

        <input
          type="password"
          className="uniquePasswordInput loginRegisterInput toSelect"
          name="password"
          placeholder="hasło"
          autoComplete="off"
          onKeyPress={(e) => (e.key === "Enter" ? signUp() : null)}
        />
        <br />
        <br />
        <br />
        <div className="flexSpace">
          <div className="reigisterBackButon" onClick={onClose}>
            Powrót
          </div>
          <div className="buttonFill loginRegisterButton" onClick={signUp}>
            Zaloguj
          </div>
        </div>
      </div>
    </div>,
    document.getElementById("popUp")
  );
}

export default PopUpLogin;
