import "./style.css";
import { useState } from "react";
import { Input } from "../../../Components";

const initialState = {
  email: "",
  password: "",
};

export const Login = () => {
  const [input, setInput] = useState(initialState);

  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setInput((prevState) => ({ ...prevState, [name]: value }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(input);
  };

  return (
    <>
      <div className="container">
        <header>
          <h1 className="title">TASS INTL </h1>
          <h2 className="subtitle">Login</h2>
        </header>
        <body>
          <div className="card">
            <form action="" onSubmit={onSubmit}>
              <Input
                label={"email"}
                name={"email"}
                type={"text"}
                value={input.email}
                onChange={onChangeInput}
                error={"Ocurrio un error en el email"}
              />
              <Input
                label={"password"}
                name={"password"}
                type={"password"}
                value={input.password}
                onChange={onChangeInput}
                error={"Ocurrio un error en el password"}
              />
            </form>
          </div>
        </body>
      </div>
    </>
  );
};
