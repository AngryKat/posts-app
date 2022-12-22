import { Input, InputProps } from "antd";
import { FieldInputProps } from "formik";
import { ComponentType } from "react";

interface WithFormikProps<T> {
  field: FieldInputProps<T>,
  form: any,
}

export function formikAdapter<T>(ComponentToWrap: ComponentType<T>) {
  const WrappedComponent = ({ field, form, ...props }: T & WithFormikProps<T>) => {
    const changeHandler = (event: any) => {
      const value = event.target.value;
      form.setFieldValue(field.name, value);
      form.setFieldTouched(field.name, true);
    };
    const errorText = form?.errors?.[field.name];
    const isTouched = form?.touched?.[field.name];
    return (<ComponentToWrap
      {...(props as T)}
      onChange={changeHandler}
      value={field.value}
      name={field.name}
      checked={field.value} // used by checkbox
      errorText={isTouched ? errorText : undefined}
    />
    );
  };

  return WrappedComponent;
};

export const FormikTextField = formikAdapter<InputProps>(Input);