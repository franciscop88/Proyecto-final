import "./ForgotPassword.css";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Navigate } from "react-router-dom";
import { forgotPasswordUser } from "../services/user.service";
import { useForgotPasswordError } from "../hooks";

export const ForgotPassword = () => {
  const { handleSubmit, register } = useForm();
  const [res, setRes] = useState({});
  const [send, setSend] = useState(false);
  const [forgotOk, setForgotOk] = useState(false);
  //! 1)-------------------- LA FUNCIOON QUE SE ENCARGA DE GESTIONAR LOS DATOS DEL FORMULARIO

  const formSubmit = async (formData) => {
    setSend(true);
    setRes(await forgotPasswordUser(formData));
    setSend(false);
  };
  //! 2) ----------------USEEFFECT QUE GESTIONA LA RES CON SUS ERRORES Y SUS 200
  useEffect(() => {
    useForgotPasswordError(res, setRes, setForgotOk);
  }, [res]);

  //! 3) ---------------- ESTADOS DE NAVEGACION O QUE LA fiuncion ESTA ok
  if (forgotOk) {
    return <Navigate to="/login" />;
  }
  return (
    <>
      <div className="form-wrap">
        <h1>Change your password 💱</h1>

        <form onSubmit={handleSubmit(formSubmit)}>
          <div className="user_container form-group">
            <input
              className="input_user"
              type="text"
              id="email"
              name="email"
              autoComplete="false"
              {...register("email", { required: true })}
            />
            <label htmlFor="custom-input" className="custom-placeholder">
              Email
            </label>
          </div>

          <div className="btn_container">
            <button
              className="btn"
              type="submit"
              disabled={send}
              style={{ background: send ? "#3d5dc9" : "#26c45a" }}
            >
              Change password
            </button>
          </div>

          <p className="bottom-text">
            <small>Enter your email to send you the new password 💌</small>
          </p>
        </form>
      </div>
    </>
  );
};
