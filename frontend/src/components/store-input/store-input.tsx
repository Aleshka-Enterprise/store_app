import React from "react";
import { FormikProps } from "formik";
import { getFieldProps } from "../../utils/formik-fields";

import "./store-input.scss";

interface StoreInputProps {
  formik: FormikProps<any>;
  fieldName: string;
  placeholder?: string;
  label?: string;
  type?: "password" | "text" | "email" | "file";
  readonly?: boolean;
}

const StoreInput = ({ formik, fieldName, label, placeholder, type = "text", readonly = false }: StoreInputProps): React.ReactElement => {
  const formikProps = getFieldProps(formik, fieldName);

  return (
    <div className={`store-input ${readonly ? "readonly" : ""}`}>
      {label && <label htmlFor={fieldName}>{label}</label>}
      {type !== "file" ? (
      <input
        onChange={formikProps.onChange}
        name={formikProps.name as string}
        placeholder={placeholder}
        type={type}
        readOnly={readonly}
        value={formik.values[fieldName] || ""}
        className={formik.touched[fieldName] && formik.errors[fieldName] ? "error" : ""}
        onKeyDown={(event: React.KeyboardEvent<HTMLInputElement>) => {
          if (event.key === "Enter") {
            formik.submitForm();
          };
        }}
      />) : (
        <div className='input'>
          {formik.values[fieldName] || ""}
          <label className='custom-file-upload'>
            <input type='file' name={formikProps.name as string} onChange={formikProps.onChange} />
            Browse
          </label>
        </div>
      )}
    </div>
  );
};

export default StoreInput;
