import React from 'react';
import './article.css';
import { Link } from 'react-router-dom';

function Article(props) {

  var title = props.articleObj.tytul;
  const cutTo = props.type ? 46 : 75;
  if (props.articleObj.tytul.length > cutTo) {
    title = title.substr(0, cutTo - 3);
    title = title.substr(0, title.lastIndexOf(' '));
    title = title.concat("...");
  }


  return (
    <Link to={`/articles/${props.articleObj.id}`} className={props.type ? ' smallArt' : ' bigArt'}>
      <div
        className={props.type ? 'articleImage smallArt' : 'articleImage bigArt'}
        style={{ backgroundImage: `url("http://localhost/blogg/api/articleImages/${props.articleObj.id}/${props.articleObj.zdjecie}")` }}>
        <div className="titleWrapper">
          <div className="imageTitleBox">
            <h3>
              {title}
            </h3>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default Article;
