const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const bodyData = {
    title: {
        in: ["body"],
        notEmpty: {
            bail: true,
            errorMessage: "Il titolo è obbligatorio"
        },
        isString: {
            bail: true,
            errorMessage: "Deve essere un testo"
        }
    },
    description: {
        in: ["body"],
        notEmpty: {
            bail: true,
            errorMessage: "Il contenuto è obbligatorio"
        },
        isString: {
            bail: true,
            errorMessage: "Deve essere un testo"
        }
    },
    categories: {
        in: ["body"],
        isArray: {
            options: { min: 1 },
            errorMessage: "Una categoria è obbligatoria"
        }
    },
    img_path:{
        in:["body"],
        notEmpty:{
            bail: true,
            errorMessage:"La foto è obbligatoria"
        }
    }

}

module.exports =  bodyData;