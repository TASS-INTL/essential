import "./style.css";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useLogin";
import { Input, InputSubmit } from "../../../Components";

export const Login = () => {
  const { valuesLogin, handleValuesLogin, submitFormLogin } = useAuth();

  return (
    <div className="container">
      <div className="card">
        <div className="contentTitles d-f j-c a-c">
          <h1 className="title">TASS INTERNATIONAL </h1>
          <h2 className="subtitle">Inicia sesion</h2>
        </div>
        <div className="content">
          <form action="" onSubmit={submitFormLogin}>
            <Input
              label={"email"}
              name={"email"}
              type={"email"}
              value={valuesLogin.email}
              onChange={handleValuesLogin}
              error={"Ocurrio un error en el email"}
            />
            <Input
              label={"Contraseña"}
              name={"password"}
              type={"password"}
              value={valuesLogin.password}
              onChange={handleValuesLogin}
              error={"Ocurrio un error en el email"}
            />
            <div className="contentButton">
              <InputSubmit text="Siguiente" />
            </div>
          </form>
          <div className="d-f j-c a-c f-d-c">
            <p className="">
              <Link to={"/auth/register"}>
                No tienes una cuenta? Registrate
              </Link>
            </p>
            <p className="">
              <Link to={"/auth/forgot-password"}>
                ¿Ha olvidado la contraseña?
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
