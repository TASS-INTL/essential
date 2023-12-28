import "./style.css";
import React from "react";

import { useAuth } from "../hooks/useLogin";
import { useLocation } from "react-router-dom";
import { Input, InputSubmit } from "../../../Components";

export const ValidateCode = () => {
  const { valueValidateCode, handleFormValidateCode, submitFormValidateCode } =
    useAuth();
  let {
    state: { screen },
  } = useLocation();

  return (
    <>
      <div className="container">
        <div className="d-f j-c a-c f-d-c">
          <h1 className="title">Validacion de codigo</h1>
          <h2 className="subtitle">ingresa el codigo</h2>
        </div>
        <div className="card d-f j-c a-c">
          <form
            action=""
            onSubmit={(event) => submitFormValidateCode(event, screen)}
          >
            <Input
              label={"Validacion de codigo"}
              name={"code"}
              type={"text"}
              value={valueValidateCode.code}
              onChange={handleFormValidateCode}
              error={"Ocurrio un error en el codigo de verificacion"}
            />
            <div className="contentButton">
              <InputSubmit text="Comprobar" />
            </div>
            <div className="contentButton mt-2">
              <InputSubmit text="volver a enviar" />
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
