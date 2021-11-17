import "./edit.css";
import React, { useState, useRef, useEffect } from "react";
import { useDispatch } from "react-redux";
import { notificationsPush } from "../redux/actions/";
import { useHistory } from "react-router";
import { useParams } from "react-router-dom";
import TextBox from "../components/TextBox";

function EditArticle() {
  const [options, setOptions] = useState("");
  const editImageInput = useRef();
  const editImageView = useRef();
  const titleInput = useRef();
  const contentInput = useRef();
  const selectStatus = useRef();
  const selectCategory = useRef();
  const tags = useRef();
  const dispatch = useDispatch();
  const history = useHistory();

  const [ifEdit, setIfEdit] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    async function fetchdownload() {
      const fetchData = await fetch(
        "http://localhost/blogg/api/listCategories.php",
        { credentials: "include", method: "GET" }
      );
      const data = await fetchData.json();
      if (data.status === 1) {
        const toSet = await data.body.map((x) => (
          <option value={x.id} key={x.id}>
            {x.kategoria}
          </option>
        ));
        setOptions(toSet);

        if (data.alreadyLogged === false) {
          history.push("/");
        }
      } else {
        dispatch(notificationsPush({ x: data.info, color: "red" }));
      }
      if (id) {
        const fetchData = await fetch(
          `http://localhost/blogg/api/articleToEdit.php?id=${id}`,
          { credentials: "include", method: "GET" }
        );
        const data1 = await fetchData.json();

        if (data1.status === 1) {
          const tagsToView = JSON.parse(data1.body.tagi).join(", ");

          editImageView.current.style.backgroundImage = `url('http://localhost/blogg/api/articleImages/${data1.body.id}/${data1.body.zdjecie}')`;
          //titleInput.current.value = data1.body.tytul;
          console.log(titleInput)
          contentInput.current.value = data1.body.tresc;
          selectStatus.current.value = data1.body.status;
          selectCategory.current.value = data1.body.kategorie;
          tags.current.value = tagsToView;
          setIfEdit(true);
        } else {
          history.push("/panel");
          dispatch(notificationsPush({ x: data1.info, color: "red" }));
        }
      }
    }
    fetchdownload();
  }, [dispatch, history, id]);

  const imageOnChange = (evt) => {
    var tgt = evt.target,
      files = tgt.files;

    if (FileReader && files && files.length) {
      var fr = new FileReader();
      fr.onload = function () {
        editImageView.current.style.backgroundImage = `url('${fr.result}')`;
      };
      fr.readAsDataURL(files[0]);
    } else {
    }
  };
  const addSend = async () => {
    var formData = new FormData();
    let link = "http://localhost/blogg/api/add.php";
    if (ifEdit) {
      link = "http://localhost/blogg/api/edit.php";
      formData.append("id", id);
    }

    formData.append("title", titleInput.current.value);
    formData.append("tags", JSON.stringify(tags.current.value.split(", ")));
    formData.append("content", contentInput.current.value);
    formData.append("image", editImageInput.current.files[0]);
    formData.append("category", selectCategory.current.value);
    formData.append("status", selectStatus.current.value);
    const dataTemp = await fetch(link, {
      method: "POST",
      credentials: "include",
      body: formData,
    });
    const data = await dataTemp.json();

    if (data.status === 1) {
      history.push("/panel");
      dispatch(notificationsPush({ x: data.info, color: "" }));
    } else {
      dispatch(notificationsPush({ x: data.info, color: "red" }));
    }
  };

  return (
    <div className="editBody">
      <div className="editImage" ref={editImageView}></div>
      <TextBox
        placeholder="Tytuł"
        className="editTitle toSelect"
        ref={titleInput}
      ></TextBox>
      <textarea
        placeholder="Treść"
        className="editContent toSelect"
        ref={contentInput}
      ></textarea>
      <br />
      Tagi (oddziel przeicnkiem i spacją){" "}
      <textarea
        placeholder="z dziś, ogród, news"
        className="editTags toSelect"
        ref={tags}
      />
      <br />
      <br />
      Kategoria:<select ref={selectCategory}>{options}</select>
      <br />
      <br />
      Status:
      <select ref={selectStatus}>
        <option value={0}>prywatny</option>
        <option value={1}>publiczny</option>
      </select>
      <br />
      <br />
      <input
        type="file"
        accept="image/*"
        ref={editImageInput}
        onChange={(e) => imageOnChange(e)}
      />
      <br />
      <br />
      <div className="button" onClick={() => addSend()}>
        Zapisz
      </div>
    </div>
  );
}

export default EditArticle;
