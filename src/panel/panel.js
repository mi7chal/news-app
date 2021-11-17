import "./panel.css";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { notificationsPush } from "../redux/actions";
import { useHistory } from "react-router";
import PanelArticle from "./panelArticle/panelArticle";

function Panel() {
  const [artTable, setArtTable] = useState();
  const history = useHistory();
  const dispatch = useDispatch();
  useEffect(() => {
    async function fetchDatta() {
      const fetchData = await fetch("http://localhost/blogg/api/panel.php", {
        credentials: "include",
        method: "GET",
      });
      const data = await fetchData.json();
      if (data.status === 1) {
        const toSet = data.body.map((x, i) => (
          <PanelArticle key={i} object={x} />
        ));
        setArtTable(toSet);
      } else {
        dispatch(notificationsPush({ x: data.info, color: "red" }));
        if (data.alreadyLogged === false) {
          history.push("/");
        }
      }
    }
    fetchDatta();
  }, [dispatch, history]);

  return (
    <div className="panelTableBox">
      <Link to={"/add"}>
        <div className=" buttonBlank panelButton">Dodaj artykuł</div>
      </Link>
      <table className="panelTable">
        <thead>
          <tr>
            <th>tytuł</th>
            <th>utworzono</th>
            <th>status</th>
            <th>tagi</th>
            <th>kategoria</th>
            <th>odsłony</th>
            <th>odsłon dziś</th>
            <th>id</th>
            <th colSpan="3">czynności</th>
          </tr>
        </thead>
        <tbody className="panelTableBody">{artTable}</tbody>
      </table>
    </div>
  );
}

export default Panel;
