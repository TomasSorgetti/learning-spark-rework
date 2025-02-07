export const validateRegisterField = (name, value, t) => {
  switch (name) {
    case "name":
      if (!value.trim()) return t("validations.name.required");
      if (value.length < 3) return t("validations.name.minLength");
      return "";

    case "email":
      if (!value.trim()) return t("validations.email.required");
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
        return t("validations.email.invalid");
      return "";

    case "password":
      if (!value.trim()) return t("validations.password.required");
      if (value.length < 5) return t("validations.password.minLength");
      return "";

    default:
      return "";
  }
};

export const validateRegisterForm = (form) => {
  const newErrors = {
    name: validateRegisterField("name", form.name),
    email: validateRegisterField("email", form.email),
    password: validateRegisterField("password", form.password),
  };

  return newErrors;
};
