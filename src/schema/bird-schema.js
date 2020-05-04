import Joi from "@hapi/joi";

const birdPostSchema = Joi.object({
    name: Joi.string().min(1).required(),
    scientific: Joi.string().min(1).required(),
    location: Joi.string().min(1).required(),
    date: Joi.string().min(1).required(),
    image: Joi.string().allow("").optional()
});

const birdPutSchema = birdPostSchema.keys(
    {
        id: Joi.string().required()
    }
);

export {birdPostSchema, birdPutSchema};