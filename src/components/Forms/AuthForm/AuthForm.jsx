import "./AuthForm.css";
import React, { useRef, useState } from "react";
import { useLocation } from "react-router-dom";

function AuthForm({ onSubmit }) {
  const emailRef = React.useRef();
  const passRef = React.useRef();
  const [validity, setValidity] = React.useState(false);
  const [errorMessageEmail, setErrorMessageEmail] = React.useState("");
  const [errorMessagePass, setErrorMessagePass] = React.useState("");

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
    if (passRef.current.validity.valid && emailRef.current.validity.valid) {
      setValidity(true);
    }
  }
  function submit(e) {
    e.preventDefault();
    if (validity) {
      onSubmit(emailRef.current.value, passRef.current.value);
    }
  }
  return (
    <form
      noValidate
      className="auth-form"
      method="post"
      action=""
      onSubmit={submit}
    >
      <span className="auth-form__input-caption">Email</span>
      <input
        ref={emailRef}
        type="email"
        name="email"
        placeholder="Введите почту"
        required
        className="auth-form__input-item"
        onChange={handleValidation}
      />
      <span className="auth-form__input-error-message">
        {errorMessageEmail}
      </span>
      <span className="auth-form__input-caption">Пароль</span>
      <input
        ref={passRef}
        type="password"
        name="pass"
        placeholder="Введите пароль"
        required
        className="auth-form__input-item"
        onChange={handleValidation}
        minLength="8"
      />
      <span className="auth-form__input-error-message">{errorMessagePass}</span>
      <button
        onClick={submit}
        className={
          validity
            ? "auth-form__submit-btn"
            : "auth-form__submit-btn auth-form__submit-btn_blocked"
        }
      >
        Войти
      </button>
    </form>
  );
}

export default AuthForm;
