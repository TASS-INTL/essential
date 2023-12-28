import { useEffect, useState } from "react";
import { showToast } from "../../../helpers/toast";
import { userStore } from "../../../store/userStore";
import { AuthProvider } from "../../../auth/authProvider";

const initialStateLogin = {
  email: "",
  password: "",
};

const initialStateRegister = {
  email: "",
  username: "",
};

const initialStateValidateCode = {
  code: "",
};

const initialStatePersonalData = {
  name: "",
  key: "",
  city: "",
  email: "",
  region: "",
  country: "",
  address: "",
  username: "",
  phone_number: {
    code: "",
    number: "",
  },
  code_postal: "",
  state_province: "",
  number_document_company: 0,
  number_document_personal: "",
  type_person: "natural",
  terms_conditions: false,
  type_document_company: "NN",
  type_document_personal: "CC",
};

export const useAuth = () => {
  const {
    login,
    ValidateCodeApi,
    registerPersonalData,
    registerNameAndUserName,
  } = AuthProvider();
  const state = userStore((state) => state);
  const [valueValidateCode, setValueValidateCode] = useState(
    initialStateValidateCode
  );
  const [valuePersonalData, setValuePersonalData] = useState(
    initialStatePersonalData
  );
  const [valuesLogin, setValuesLogin] = useState(initialStateLogin);
  const [valuesRegister, setValuesRegister] = useState(initialStateRegister);

  useEffect(() => {
    setValuePersonalData({
      ...valuePersonalData,
      email: state?.userData.email,
      username: state?.userData.userName,
    });
  }, []);

  // Login
  const handleValuesLogin = (key, value) => {
    setValuesLogin({
      ...valuesLogin,
      [key]: value,
    });
  };

  const submitFormLogin = async (e) => {
    e.preventDefault();

    if (Object.values(valuesLogin).some((value) => value === ""))
      return showToast("❌ Debes ingresar el correo", "error");

    const { email, password } = valuesLogin;

    const response = await login({
      email,
      password,
    });
    console.log(response);

    if (response?.error)
      return showToast("❌ Algo ha salido mal " + response?.message, "error");

    if (response?.completed)
      return showToast("Validacion de manera exitosa", "success");

    //  setInput(initialState);
  };

  // Validate Code
  const handleFormValidateCode = (key, value) => {
    setValueValidateCode({
      ...valueValidateCode,
      [key]: value,
    });
  };

  const submitFormValidateCode = async (event, screen) => {
    event.preventDefault();

    if (Object.values(valueValidateCode).some((value) => value === ""))
      return showToast("❌ Debes ingresar el codigo de verificacion", "error");

    const { code } = valueValidateCode;

    const response = await ValidateCodeApi(state, {
      code,
      screen,
    });

    if (response?.error)
      return showToast("Algo ha salido mal " + response?.message, "error");

    if (response.success)
      return showToast(
        "Codigo ingresado con exito " + response?.message,
        "success"
      );

    //  setInput(initialState);
  };

  // Register
  const handleRegister = (key, value) => {
    setValuesRegister({
      ...valuesRegister,
      [key]: value,
    });
  };

  const submitFormRegister = async (event) => {
    event.preventDefault();

    if (Object.values(valuesRegister).some((value) => value === ""))
      return showToast("❌ Debes ingresar todos los campos", "error");

    const { email, username } = valuesRegister;

    const response = await registerNameAndUserName(state, {
      email,
      username,
    });

    if (response?.error)
      return showToast("❌ Algo ha salido mal " + response?.message, "error");

    if (response?.completed)
      return showToast("Validacion de manera exitosa", "success");

    //  setInput(initialState);
  };

  // Personal Data
  const handlePersonalData = (key, value) => {
    setValuePersonalData({
      ...valuePersonalData,
      [key]: value,
    });
  };

  const submitFormValidateData = async (event) => {
    event.preventDefault();

    if (Object.values(valuePersonalData).some((value) => value === ""))
      return showToast("❌ Debes ingresar todos los campos", "error");

    const response = await registerPersonalData(state, valuePersonalData);

    if (response?.error)
      return showToast("❌ Algo ha salido mal " + response?.message, "error");

    if (response?.completed)
      return showToast(
        "Se a completado de manera exitos el registro",
        "success"
      );

    //  setInput(initialState);
  };

  return {
    valuesLogin,
    valuesRegister,
    valueValidateCode,
    valuePersonalData,
    submitFormLogin,
    submitFormRegister,
    submitFormValidateData,
    submitFormValidateCode,
    handleValuesLogin,
    handleRegister,
    handlePersonalData,
    handleFormValidateCode,
  };
};
