import "./RegForm.css";
import React, { useState } from "react";
import { useLocation } from "react-router-dom";

function RegForm({ onSubmit }) {
  const emailRef = React.useRef();
  const passRef = React.useRef();
  const nameRef = React.useRef();
  const [validity, setValidity] = React.useState(false);
  const [errorMessageEmail, setErrorMessageEmail] = React.useState("");
  const [errorMessagePass, setErrorMessagePass] = React.useState("");
  const [errorMessageName, setErrorMessageName] = React.useState("");
  function handleValidation() {
    if (!emailRef.current.validity.valid) {
      setValidity(false);
      setErrorMessageEmail(emailRef.current.validationMessage);
    }
    if (emailRef.current.validity.valid) {
      setErrorMessageEmail("");
    }
    if (!passRef.current.validity.valid) {
      setValidity(false);
      setErrorMessagePass(passRef.current.validationMessage);
    }
    if (passRef.current.validity.valid) {
      setErrorMessagePass("");
    }

    if (!nameRef.current.validity.valid) {
      setValidity(false);
      setErrorMessageName(nameRef.current.validationMessage);
    }
    if (nameRef.current.validity.valid) {
      setErrorMessageName("");
    }
    if (
      passRef.current.validity.valid &&
      emailRef.current.validity.valid &&
      nameRef.current.validity.valid
    ) {
      setValidity(true);
    }
  }
  function submit(e) {
    e.preventDefault();
    if (validity) {
      onSubmit(
        emailRef.current.value,
        passRef.current.value,
        nameRef.current.value
      );
    }
  }
  return (
    <form
      noValidate
      className="reg-form"
      method="post"
      action=""
      onSubmit={submit}
    >
      <span className="reg-form__input-caption">Email</span>
      <input
        ref={emailRef}
        type="email"
        name="email"
        placeholder="Email"
        required
        className="reg-form__input-item"
        onChange={handleValidation}
      />
      <span className="reg-form__input-error-message">{errorMessageEmail}</span>
      <span className="reg-form__input-caption">Пароль</span>
      <input
        ref={passRef}
        type="password"
        name="pass"
        placeholder="Введите пароль"
        required
        className="reg-form__input-item"
        onChange={handleValidation}
        minLength="8"
      />
      <span className="reg-form__input-error-message">{errorMessagePass}</span>
      <span className="reg-form__input-caption">Имя</span>
      <input
        ref={nameRef}
        type="text"
        name="name"
        placeholder="Введите своё имя"
        required
        className="reg-form__input-item"
        onChange={handleValidation}
        minLength="2"
      />
      <span className="reg-form__input-error-message">{errorMessageName}</span>

      <button
        onClick={submit}
        className={
          validity
            ? "reg-form__submit-btn"
            : "reg-form__submit-btn reg-form__submit-btn_blocked"
        }
      >
        Зарегистрироваться
      </button>
    </form>
  );
}

export default RegForm;
