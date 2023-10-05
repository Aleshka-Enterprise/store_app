import React from "react";
import { FormikProps } from "formik";
import { getFieldProps } from "../../utils/formik-fields";

import "./store-input.scss";

interface StoreInputProps {
  formik: FormikProps<any>;
  fieldName: string;
  placeholder?: string;
  label?: string;
  type?: "password" | "text" | "email";
}

const StoreInput = ({ formik, fieldName, label, placeholder, type = "text" }: StoreInputProps): React.ReactElement => {
  const formikProps = getFieldProps(formik, fieldName);

  return (
    <div className='store-input'>
      {label && <label htmlFor={fieldName}>{label}</label>}
      <input
        onChange={formikProps.onChange}
        name={formikProps.name as string}
        placeholder={placeholder}
        type={type}
        onKeyDown={(event: React.KeyboardEvent<HTMLInputElement>) => {
          if (event.key === "Enter") {
            formik.submitForm();
          };
        }}
      />
    </div>
  );
};

export default StoreInput;
