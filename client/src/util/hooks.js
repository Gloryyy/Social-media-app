import { useState } from "react";

export const useForm = (callback, initialState = {}) => {
  const [value, setValue] = useState(initialState);

  const onChange = (event) => {
    setValue({
      ...value,
      [event.target.name]: event.target.value,
    });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    callback();
  };

  return {
    onChange,
    onSubmit,
    value,
  };
};
