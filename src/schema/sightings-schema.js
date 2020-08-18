import JoiBase from "@hapi/joi";
import JoiDate from "@hapi/joi-date";

const Joi = JoiBase.extend(JoiDate);

const sightingsPostSchema = Joi.object({
    bird_id: Joi.number().min(1).required(),
    user_id: Joi.string().min(1).required(),
    datetime: Joi.date().format("YYYY-MM-DD").utc().required(),
    lat: Joi.number().allow("").optional(),
    lng: Joi.number().allow("").optional(),
    notes: Joi.string().allow("")

});

const sightingsPutSchema = sightingsPostSchema.keys(
    {
        id: Joi.number().required()
    }
);

export {sightingsPostSchema, sightingsPutSchema};