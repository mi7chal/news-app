import './components.css';
import React, { useRef, useState } from 'react';

export default function TextBox({children}) {
  const input = useRef();
  const [editElement, setEditElement] = useState()
  let lastLength = 0;
  const onChange = (e) => {
    console.log(e.currentTarget)
    e.currentTarget.style.height = e.currentTarget.scrollHeight + "px";
    const length = e.currentTarget.innerText.length;
    if (length < lastLength) {
      e.currentTarget.style.height = "250px";
      e.currentTarget.style.height = e.currentTarget.scrollHeight + "px";
    }
    lastLength = length;
  }

  const onDoubleClick = (e) => {
    setEditElement();
    const selection = window.getSelection();

    if (selection.type == 'Range') {
      const range = selection.getRangeAt(0);
      const rect = range.getBoundingClientRect();
      const inputRect = input.current.getBoundingClientRect();
      const x = rect.left - inputRect.left, right = rect.right, y = rect.top - inputRect.top;
      setEditElement(<SelectMarker pos={{ x, y }}></SelectMarker >);
      console.log(range);
    }

    //document.execCommand('underline', false, null);
  }

  return (
    <>
      <div className="inputArea" onInput={(e) => onChange(e)} contentEditable="true" onSelect={(e) => onDoubleClick(e)} ref={input}>
        {children}
      </div>
      {editElement}
    </>
  )
}







function SelectMarker({ pos }) {

  return (
    <div style={{ position: 'absolute', top: pos.y - 25, left: pos.x }} unselectable="on" className="selectMarker" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" onSelect={e => e.preventDefault()}>
      <div onClick={() => document.execCommand('bold', false, null)}><b>B</b></div>
      <div onClick={() => document.execCommand('italic', false, null)}><i>I</i></div>
      <div onClick={() => document.execCommand('underline', false, null)}><u>U</u></div>
      <div onClick={() => document.execCommand('justifyLeft', false, null)}>Left</div>
      <div onClick={() => document.execCommand('justifyCenter', false, null)}>Center</div>
      <div onClick={() => document.execCommand('insertUnorderedList', false, null)}>Punctors</div>


    </div>

  )
}