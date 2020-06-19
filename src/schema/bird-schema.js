import JoiBase from "@hapi/joi";
import JoiDate from "@hapi/joi-date";

const Joi = JoiBase.extend(JoiDate);

const birdPostSchema = Joi.object({
    name: Joi.string().min(1).required(),
    scientific: Joi.string().min(1).required(),
    location: Joi.string().min(1).required(),
    date: Joi.date().format("YYYY-MM-DD").utc().required(),
    image: Joi.string().allow("").optional()
});

const birdPutSchema = birdPostSchema.keys(
    {
        id: Joi.string().required()
    }
);

export {birdPostSchema, birdPutSchema};