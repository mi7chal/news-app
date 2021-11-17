import "./articleInList.css";
import React from "react";
import { Link } from "react-router-dom";
//import PopUpLogin from '../../header/login/login';

const ArticleInList = React.forwardRef((props, ref) => {
  var content = props.object.tresc;
  if (content.length > 200) {
    content = content.substr(0, 200);
    content = content.substr(0, content.lastIndexOf(" "));
    content = content.concat("...");
  }
  var title = props.object.tytul;
  if (title.length > 100) {
    title = title.substr(0, 100);
    title = title.substr(0, title.lastIndexOf(" "));
    title = title.concat("...");
  }
  return (
    <Link to={`/articles/${props.object.id}`} className="articleInLink">
      <div className="articleInList" ref={ref}>
        <div
          className="articleInImage"
          style={{
            backgroundImage: `url("http://localhost/blogg/api/articleImages/${props.object.id}/${props.object.zdjecie}")`,
          }}
        ></div>
        <div className="articleInTextBox">
          <h3 className="articleInTitle">{title}</h3>
          <p>{content}</p>
        </div>
      </div>
    </Link>
  );
});

export default ArticleInList;
