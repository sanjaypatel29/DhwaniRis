const Joi = require("joi");

const registerValidator = (data) => {
    const schema = Joi.object({
        name: Joi.string().min(4).required(),
        userName: Joi.string().min(6).required(),
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(6).required(),
        organization: Joi.string().min(2).required(),
        designation: Joi.string().min(2).required(),
    });

    return schema.validate(data);
};

const loginValidator = (data) => {
    const schema = Joi.object({
        userName: Joi.string().min(6).required(),
        password: Joi.string().min(6).required(),
    });

    return schema.validate(data);
};

const stateDataValidator = (data) => {
    const schema = Joi.object({
        stateName: Joi.string().required(),
        district: Joi.array()
    })
    return schema.validate(data);
};

const childDataValidator = (data) => {
    const schema = Joi.object({
        name: Joi.string().required(),
        sex: Joi.string().required(),
        fatherName: Joi.string().required(),
        motherName: Joi.string().required(),
        dob: Joi.date().required(),
        image: Joi.string().required(),
        districtName: Joi.string().required(),
        stateName: Joi.string().required(),
    })
    return schema.validate(data);
}

module.exports.registerValidator = registerValidator;
module.exports.loginValidator = loginValidator;
module.exports.stateDataValidator = stateDataValidator;
module.exports.childDataValidator = childDataValidator;