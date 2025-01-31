import * as Yup from "yup";
const mensagem = "O campo título é obrigatório!";
const validation = Yup.string().trim().required(mensagem);
export const validationSchema = Yup.object().shape({
    titulo:validation,
    descricao:validation
})