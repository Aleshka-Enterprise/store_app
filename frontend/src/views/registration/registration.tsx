import React from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import StoreInput from "../../components/store-input/store-input";
import usersService from "../../services/users/users.service";
import { useNavigate } from "react-router-dom";
import { REQUIRED_FIELD_ERROR } from "../../utils/utils";

import "./registration.scss";

const userSchema = yup.object({
  username: yup.string().required(REQUIRED_FIELD_ERROR),
  firstName: yup.string().required(REQUIRED_FIELD_ERROR),
  lastName: yup.string().required(REQUIRED_FIELD_ERROR),
  email: yup.string().email().required(REQUIRED_FIELD_ERROR),
  password1: yup.string().required(REQUIRED_FIELD_ERROR),
  password2: yup.string().required(REQUIRED_FIELD_ERROR),
});


const Registration = (): React.ReactElement => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      username: "",
      password1: "",
      firstName: "",
      lastName: "",
      email: "",
      password2: "",
    },
    onSubmit: (values): void => {
      if (values.password1 === values.password2) {
        usersService.registration({ ...values, password: values.password1 })
        .then(() => {
          navigate("/login");
        })
        .catch(() => {
          formik.setSubmitting(false);
        });
      } else {
        formik.setSubmitting(false);
      }
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
              <StoreInput formik={formik} fieldName={"firstName"} label={"Имя"} placeholder={"Имя"} />
              <StoreInput formik={formik} fieldName={"lastName"} label={"Фамилия"} placeholder={"Фамилия"} />
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
              <button onClick={() => formik.submitForm()}>Создать аккаунт</button>
            </div>
          </div>
          <div className='card-footer'>
            <span onClick={(): void => navigate("/autorization")}>Уже есть аккаунт? Авторизоваться</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Registration;
