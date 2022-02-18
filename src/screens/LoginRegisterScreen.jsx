import GenericForm from "../components/generics/forms/GenericForm";
import GenericInput from "../components/generics/forms/GenericInput";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

const LoginRegisterScreen = (props) => {
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (evt, response) => {
    const text = await response.text();
    const data = text.toJson();
    console.log(data);
    if (props.isLogin) {
        document.cookie = `auth=${data.cookie}`;
        const {email, role} = data;
        localStorage.setItem("user", JSON.stringify({email, role}))
      setMessage({
        color: data.completed ? "alert-success" : "alert-danger",
        text: data.message,
      });
      if (data.completed) {
        setTimeout(() => navigate("/"), 4000);
        // document
        //   .querySelector(".alert")
        //   .addEventListener("closed.bs.alert", function () {
        //     navigate("/");
        //   });
      }
    } else {
      //isRegister
      setMessage({
        color: data.completed ? "alert-success" : "alert-danger",
        text: data.message,
      });
    }
  };

  const checkPasswords = () => {
    const password = document.querySelector('[name="password"]').value;
    const passwordConfirm = document.querySelector(
      '[name="password_confirm"]'
    )?.value;
    if (password !== passwordConfirm) {
      document
        .querySelector('[name="password_confirm"]')
        ?.classList.add("is-invalid");
    } else {
      document
        .querySelector('[name="password_confirm"]')
        ?.classList.remove("is-invalid");
    }
  };

  return (
    <>
      <h1>{props.isLogin ? "Se connecter" : "Créer un compte"}</h1>
      <GenericForm
        endpoint={
          "http://localhost:5000/auth/" + (props.isLogin ? "login" : "register")
        }
        submitButtonText={props.isLogin ? "Se connecter" : "S'inscrire"}
        callback={handleSubmit}
        validation={true}
      >
        <GenericInput
          className="mb-3"
          name="email"
          type="email"
          labelText="Adresse mail"
          required={true}
          // eslint-disable-next-line no-useless-escape
          pattern={"^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$"}
          invalidText="Saisr un email valide"
        />
        <GenericInput
          onBlur={checkPasswords}
          className="mb-3"
          name="password"
          type="password"
          labelText="Mot de passse"
          required={true}
          pattern={"^(?=.*[a-z]).{4,}$"}
          invalidText="Saisr un mot de passe valide (6 caractères minimum)"
        />
        {props.isRegister && (
          <GenericInput
            onBlur={checkPasswords}
            className="mb-3"
            name="password_confirm"
            type="password"
            labelText="Mot de passse (confirmation)"
            required={true}
            invalidText="Saisr un mot de passe identique"
          />
        )}
      </GenericForm>
      <div
        style={{ position: "relative", top: -40, left: 90 }}
        className={props.isLogin && "ms-4"}
      >
        {props.isLogin ? (<>
          <Link className="nav-link" to="/register">
            créer un compte ?
          </Link>
          <Link className="nav-link" to="/account/renew">
            mot de passe oublié ?
          </Link>
          </>
        ) : (
          <Link className="nav-link" to="/login">
            se connecter ?
          </Link>
        )}
      </div>
      {message && (
        <div
          className={`alert ${message.color} alert-dismissible fade show mt-1`}
          role="alert"
        >
          {message.text}
          {/* <button
            type="button"
            className="btn-close"
            data-bs-dismiss="alert"
            aria-label="Close"
          ></button> */}
        </div>
      )}
    </>
  );
};

export default LoginRegisterScreen;
