import "./register.css";
import React, { useState } from "react";
import { notificationsPush } from "../redux/actions/";
import { connect } from "react-redux";

// Plik zawiera formularz z działającą walidacją
// komórki z błędnymi danymi są obramowywane na czerwono,
// nad komórkami wyświetla się informacja o błędzie
// Po wysłaniu formularza w formie powiadomienia w prawym górnym narozniku
// wyświetla się komunikat o poprawnym logowaniu lub błędzie (z konkretna informacja)




class Register extends React.Component {
  constructor(props) {
    super(props);

    this.emailValid = false;
    this.passwordValid = false;
    this.loginValid = false;

    this.input = {};

    this.input.name = React.createRef();
    this.input.surname = React.createRef();
    this.input.login = React.createRef();
    this.input.email = React.createRef();
    this.input.password1 = React.createRef();
    this.input.password2 = React.createRef();

    this.state = {
      modal: [],
      before: { login: " ", email: " ", password1: " ", password2: " " },
    };
    if (this.props.loggedAlready) {
      this.props.history.push("/");
    }
  }

  onLogout() {}

  componentDidMount() {
    window.scrollTo(0, 0);
    if (this.props.loggedAlready) {
      this.props.history.push("/");
    }
  }

  componentDidUpdate() {
    if (this.props.loggedAlready) {
      this.props.history.push("/");
    }
  }

  validate = {
    firtstPassword: (e) => {
      if (e.target.value.length >= 8) {
        e.target.style.borderColor = "var(--background3)";
        this.setState({ before: { ...this.state.before, password1: "" } });
      } else {
        e.target.style.borderColor = "#c21d1d";
        this.setState({
          before: { ...this.state.before, password1: "Hasło jest za krótkie" },
        });
      }
    },
    secondPassword: (e) => {
      if (
        e.target.value.length >= 8 &&
        this.input.password1.current.value === e.target.value
      ) {
        e.target.style.borderColor = "var(--background3)";
        this.passwordValid = true;
        this.setState({ before: { ...this.state.before, password2: "" } });
      } else {
        this.passwordValid = false;
        e.target.style.borderColor = "#c21d1d";
        this.setState({
          before: {
            ...this.state.before,
            password2: "Hasła muszą być identyczne",
          },
        });
      }
    },
    email: (e) => {
      if (e.target.value.includes(".") && e.target.value.includes("@")) {
        e.target.style.borderColor = "var(--background3)";
        this.emailValid = true;
        this.setState({ before: { ...this.state.before, email: "" } });
      } else {
        this.emailValid = false;
        this.setState({
          before: { ...this.state.before, email: "Niepoprawny email" },
        });

        e.target.style.borderColor = "#c21d1d";
      }
    },
    login: (e) => {
      if (e.target.value.length >= 5) {
        e.target.style.borderColor = "var(--background3)";
        this.setState({ before: { ...this.state.before, login: "" } });
      } else {
        e.target.style.borderColor = "#c21d1d";
        this.setState({
          before: { ...this.state.before, login: "Login jest za krótki" },
        });
      }
    },
  };

  signUp = async () => {
    if (this.emailValid && this.passwordValid) {
      const formData = {
        name: this.input.name.current.value,
        surname: this.input.surname.current.value,
        login: this.input.login.current.value,
        email: this.input.email.current.value,
        password1: this.input.password1.current.value,
        password2: this.input.password2.current.value,
      };

      const fetchData = await fetch("http://localhost/blogg/api/register.php", {
        credentials: "include",
        method: "POST",
        body: JSON.stringify(formData),
      });

      const data = await fetchData.json();
      if (data.status === 1) {
        this.props.history.push("/");
        this.props.history.go(0);
        this.props.push({ x: data.info, color: "" });
      } else {
        //var newNotifications= data.info.map((x,i)=><Modal key={i} color="red">{x}</Modal>);
        //this.setState({ modal: null });
        //this.setState({ modal: newNotifications });
        data.info.map((item) => this.props.push({ x: item, color: "red" }));
      }
    } else {
      return 0;
    }
  };

  render() {
    return (
      <div>
        <div className="registerBackground">
          <div className="registerBox">
            <p className="registerHeader">Zarejestruj</p>

            <form className="registerForm">
              <input
                type="text"
                className="registerComponentInput loginRegisterInput toSelect uniqueRegisterName"
                name="name"
                placeholder="imię"
                autoComplete="off"
                ref={this.input.name}
              />

              <input
                type="text"
                className="registerComponentInput loginRegisterInput toSelect uniqueRegisterSurname"
                name="surname"
                placeholder="nazwisko"
                autoComplete="off"
                ref={this.input.surname}
              />

              <div>
                <div>{this.state.before.login}</div>
                <input
                  type="text"
                  className="registerComponentInput loginRegisterInput toSelect uniqueRegisterLogin"
                  name="login"
                  placeholder="login"
                  autoComplete="off"
                  onChange={(e) => this.validate.login(e)}
                  ref={this.input.login}
                />
              </div>

              <div>
                <div>{this.state.before.email}</div>
                <input
                  type="text"
                  className="registerComponentInput loginRegisterInput toSelect uniqueRegisterEmail"
                  name="email"
                  placeholder="email"
                  autoComplete="off"
                  onChange={(e) => this.validate.email(e)}
                  ref={this.input.email}
                />
              </div>

              <div>
                <div>{this.state.before.password1}</div>
                <input
                  type="password"
                  className="registerComponentInput loginRegisterInput toSelect uniqueRegisterPassword1"
                  name="password1"
                  placeholder="hasło"
                  autoComplete="off"
                  onChange={(e) => this.validate.firtstPassword(e)}
                  ref={this.input.password1}
                />
              </div>

              <div>
                <div>{this.state.before.password2}</div>
                <input
                  type="password"
                  className="registerComponentInput loginRegisterInput toSelect uniqueRegisterPassword2"
                  name="password2"
                  placeholder="powtórz hasło"
                  autoComplete="off"
                  onChange={(e) => this.validate.secondPassword(e)}
                  ref={this.input.password2}
                />
              </div>
            </form>

            <div className="flexSpace">
              <div
                className="reigisterBackButon"
                onClick={() => this.props.history.goBack()}
              >
                Powrót
              </div>

              <div
                className="buttonFill loginRegisterButton"
                onClick={() => this.signUp()}
              >
                Zarejestruj
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
// const mapStateToProps = state => ({
//     isLogged: state.isLogged
// });

const mapDispatchToProps = (dispatch) => {
  return {
    push: (x) => dispatch(notificationsPush(x)),
  };
};
export default connect(null, mapDispatchToProps)(Register);

//export default Register;
