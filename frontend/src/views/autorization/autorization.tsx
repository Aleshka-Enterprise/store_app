import React, { useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import StoreInput from "../../components/store-input/store-input";
import { useNavigate } from "react-router-dom";
import UsersService from "../../services/users/users.service";
import { REQUIRED_FIELD_ERROR } from "../../utils/utils";

import "font-awesome/css/font-awesome.min.css";
import "./autorization.scss";

interface IWarning {
  title: string;
  description: string;
}

const userSchema = yup.object({
  username: yup.string().required(REQUIRED_FIELD_ERROR),
  password: yup.string().required(REQUIRED_FIELD_ERROR),
});

const Autorization = (): React.ReactElement => {
  const [warning, setWarning] = useState<IWarning>();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    onSubmit: (values): void => {
      UsersService.autorization(values)
      .then((): void => {
        navigate("/");
        UsersService.getCurrentUser();
      })
      .catch(() => {
        setWarning({ title: "Ошибка", description: "Не верный логин или пароль!" });
        formik.setSubmitting(false);
      });
    },
    validationSchema: userSchema,
  });

  return (
    <div className='autorization'>
      <div className='content'>
        {warning && (
          <div className='warning'>
            <b>{warning.title}</b>
            <p>{warning.description}</p>
            <div className='cross' onClick={(): void => setWarning(undefined)}>×</div>
          </div>
        )}
        <div className='form'>
          <div className='card-header center'>
            <h3 className='center'>Авторизация</h3>
          </div>
          <div className='card-body'>
            <div className='input'>
              <StoreInput
                formik={formik}
                fieldName={"username"}
                label={"Имя пользователя"}
                placeholder={"Введите имя пользователя"}
              />
            </div>
            <div className='input'>
              <StoreInput
                formik={formik}
                fieldName={"password"}
                label={"Пароль"}
                placeholder={"Введите пароль"}
                type={"password"}
              />
            </div>
            <div className='button'>
              <span>Забыли пароль?</span>
              <button onClick={() => formik.submitForm()}>Авторизоваться</button>
            </div>
            <div className='form-group'>
              <div className='circle'>
                <i className='fa fa-google'></i>
              </div>
              <div className='circle'>
                <i className='fa fa-vk'></i>
              </div>
              <div className='circle'>
                <i className='fa fa-github'></i>
              </div>
              <div className='circle'>
                <i className='fa fa-facebook'></i>
              </div>
            </div>
          </div>
          <div className='card-footer'>
            <span onClick={(): void => navigate("/registration/")}>Нужен аккаунт? Зарегистрируйся!</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Autorization;
