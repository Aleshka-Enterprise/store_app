import React, { useEffect, useState } from "react";
import HeaderMenu from "../../components/header-menu/header-menu";
import StoreInput from "../../components/store-input/store-input";
import { useFormik } from "formik";
import * as yup from "yup";
import { REQUIRED_FIELD_ERROR } from "../../utils/utils";
import { observer } from "mobx-react-lite";
import { IUser } from "../../models/users/users";
import UsersStore from "../../store/users";
import UsersService from "../../services/users/users.service";

import "./profile.scss";

const userSchema = yup.object({
    username: yup.string().required(REQUIRED_FIELD_ERROR),
    email: yup.string().email().required(REQUIRED_FIELD_ERROR),
    firstName: yup.string().required(REQUIRED_FIELD_ERROR),
    lastName: yup.string().required(REQUIRED_FIELD_ERROR),
  });

const Profile = observer((): React.ReactElement => {
  const [user, setUser] = useState<IUser>();

  useEffect(() => {
    if (UsersStore.user?.id) {
      UsersService.getUser(UsersStore.user?.id).then(res => {
        setUser(res);
      });
    };
  }, [UsersStore.user])
  const formik = useFormik({
    initialValues: {...user},
    onSubmit: (values): void => {},
    validationSchema: userSchema,
  });

  return (
    <div className='profile'>
      <HeaderMenu />
      <div className='content'>
        <div className='profile-form'>
          <h4>Профиль</h4>
          <div className='avatar'>
            <img src="" alt="" />
          </div>
          <div className='input-block'>
              <StoreInput
                formik={formik}
                fieldName={"firstName"}
                label={"Имя"}
              />
              <StoreInput
                formik={formik}
                fieldName={"lastName"}
                label={"Фамилия"}
              />
            </div>
            <StoreInput
              formik={formik}
              fieldName={"image"}
              type={"file"}
              placeholder={"Выберите изображение"}
            />
            <div className='input-block'>
              <StoreInput
                formik={formik}
                fieldName={"username"}
                label={"Имя пользователя"}
                readonly={true}
              />
              <StoreInput
                formik={formik}
                fieldName={"email"}
                label={"Адрес электронной почты"}
                type={"email"}
                readonly={true}
              />
            </div>
            <button className='save-button'>Сохранить</button>
        </div>
      </div>
    </div>
  );
});

export default Profile;
