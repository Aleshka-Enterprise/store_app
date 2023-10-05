import React from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import StoreInput from "../../components/store-input/store-input";

import "./registration.scss";

const userSchema = yup.object({
  username: yup.string().required(),
  password: yup.string().required(),
});

const Registration = (): React.ReactElement => {
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    onSubmit: (): void => {
      // TODO Отправка формы
      console.log("Отправка формы");
    },
    validationSchema: userSchema,
  });

  return (
    <div className='registration'>
      <div className='content'>
        <div className='form'>
          <div className='card-header center'>
            <h3 className='center'>Создать аккаунт</h3>
          </div>
          <div className='card-body'>
            <div className='input-block'>
              <StoreInput formik={formik} fieldName={"firstname"} label={"Имя"} placeholder={"Имя"} />
              <StoreInput formik={formik} fieldName={"lastname"} label={"Фамилия"} placeholder={"Фамилия"} />
            </div>
            <div className='input-block'>
              <StoreInput
                formik={formik}
                fieldName={"username"}
                label={"Имя пользователя"}
                placeholder={"Имя пользователя"}
              />
              <StoreInput
                formik={formik}
                fieldName={"email"}
                label={"Адрес электронной почты"}
                placeholder={"Введите адрес эл. почты"}
                type={"email"}
              />
            </div>
            <div className='input-block'>
              <StoreInput
                formik={formik}
                fieldName={"password1"}
                label={"Парол"}
                placeholder={"Пароль"}
                type={"password"}
              />
              <StoreInput
                formik={formik}
                fieldName={"password2"}
                label={"Подтверждение пароля"}
                placeholder={"Подтверждение пароля"}
                type={"password"}
              />
            </div>
            <div className='button'>
              <button>Создать аккаунт</button>
            </div>
          </div>
          <div className='card-footer'>
            <span>Уже есть аккаунт? Авторизоваться</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Registration;
