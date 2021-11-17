import './searchBox.css';
import React from 'react';
import { Link } from 'react-router-dom';

function SearchBox({ object, onLinkClicked }) {

    var title = object.tytul;
    if (object.tytul.length > 55) {
      title = title.substr(0, 55);
      title = title.substr(0, title.lastIndexOf(' '));
      title = title.concat("...");
    }



    return (
        <Link to={`/articles/${object.id}`} className="linkResetStyles" onClick={onLinkClicked}>
            <div className="searchBoxBox">{title}</div>
        </Link>
    );
}

export default SearchBox;
