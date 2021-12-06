import { string, object } from "yup";

export const RegisterSchema = object({
    name: string()
        .required("Вкажіть Ім'я"),

    email: string()
        .email("Не коректно вказана пошта")
        .required("Вкажіть пошту"),

    password: string()
        .required("Вкажіть пароль"),

    password_confirmation: string()
        .required("Підтвердіть пароль")
        .test(
            'passwordConfirm',
            'Потрібно, щоб збігався',
            function () {
                return this.parent.password === this.parent.password_confirmation;
            }
        ),
});