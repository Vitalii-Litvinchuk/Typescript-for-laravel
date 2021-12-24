import { string, object } from "yup";

export const ProductSchema = object({
    name: string()
        .required("Вкажіть назву"),

    detail: string()
        .required("Вкажіть деталі"),

    file: string().nullable()
        .required("Виберіть фото"),
});