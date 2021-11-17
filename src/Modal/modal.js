import './modal.css';
import React, { useState, useEffect, useRef } from 'react';
import reactDom from 'react-dom';
import { notificationsSplice } from '../redux/actions/';
import { useDispatch } from 'react-redux';

function Modal({ children, color, keyValue }) {
    const dispatch = useDispatch();
    const [show, setShow] = useState(true);
    var backgroundBox = useRef();
    useEffect(() => {
        setTimeout(() => {
            if (backgroundBox.current != null) {
                backgroundBox.current.style.right = "-300px";

                backgroundBox.current.style.height = backgroundBox.current.offsetHeight + "px";
            }
        }, 10000);
        setTimeout(() => {
            if (backgroundBox.current != null) {
                backgroundBox.current.innerHTML = "";
                backgroundBox.current.style.height = "0px";
            }

        }, 11000)
        setTimeout(() => {
            if (backgroundBox.current != null) {
                dispatch(notificationsSplice(keyValue))
                setShow(false)
            }

        }, 12000)
    }, [backgroundBox, dispatch, keyValue])

    if (show === false)
        return null;


    return reactDom.createPortal(
        <div ref={backgroundBox} onClick={(e) => e.stopPropagation()}
            className="modalBackground" style={{ backgroundColor: color === "red" ? "rgb(255, 65, 65)" : null, borderColor: color === "red" ? "rgb(204, 52, 52)" : null }}>

            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 21 21" className="modalClose" onClick={() => setShow(false)}>
                <path id="Icon_material-close" data-name="Icon material-close"
                    d="M28.5,9.615,26.385,7.5,18,15.885,9.615,7.5,7.5,9.615,15.885,18,7.5,26.385,9.615,28.5,18,20.115,26.385,28.5,28.5,26.385,20.115,18Z"
                    transform="translate(-7.5 -7.5)" fill="#fff" />
            </svg>
            <div>{children}</div>
        </div>

        ,
        document.getElementById('modal')
    );
}

export default Modal;