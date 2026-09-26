const { celebrate, Joi, Segments } = require('celebrate');

const objectIdSchema = Joi.string().hex().length(24);

const validateSignup = celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
    headline: Joi.string().allow('').optional(),
    location: Joi.string().allow('').optional(),
    avatar: Joi.string().uri().allow('').optional(),
    skills: Joi.array().items(Joi.string()).optional(),
  }),
});

const validateSignin = celebrate({
  [Segments.BODY]: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
});

const validateUpdateProfile = celebrate({
  [Segments.BODY]: Joi.object().keys({
    headline: Joi.string().allow('').optional(),
    location: Joi.string().allow('').optional(),
    skills: Joi.array().items(Joi.string()).optional(),
  }),
});

const validateCreateApplication = celebrate({
  [Segments.BODY]: Joi.object().keys({
    jobId: Joi.string().required(),
    jobTitle: Joi.string().required(),
    company: Joi.string().required(),
    location: Joi.string().allow('').optional(),
    notes: Joi.string().max(1000).allow('').optional(),
  }),
});

const validateApplicationId = celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    applicationId: objectIdSchema.required(),
  }),
});

const validateApplicationStatus = celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    applicationId: objectIdSchema.required(),
  }),
  [Segments.BODY]: Joi.object().keys({
    status: Joi.string()
      .valid('Applied', 'Interview', 'Rejected', 'Offer')
      .required(),
  }),
});

const validateApplicationNotes = celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    applicationId: objectIdSchema.required(),
  }),
  [Segments.BODY]: Joi.object().keys({
    notes: Joi.string().max(1000).allow('').required(),
  }),
});

const validateSaveJob = celebrate({
  [Segments.BODY]: Joi.object().keys({
    jobId: Joi.string().required(),
    title: Joi.string().required(),
    company: Joi.string().required(),
    location: Joi.string().allow('').optional(),
    level: Joi.string().allow('').optional(),
    description: Joi.string().allow('').optional(),
    url: Joi.string().uri().allow('').optional(),
  }),
});

const validateSavedJobId = celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    savedJobId: objectIdSchema.required(),
  }),
});

module.exports = {
  validateSignup,
  validateSignin,
  validateUpdateProfile,
  validateCreateApplication,
  validateApplicationId,
  validateApplicationStatus,
  validateApplicationNotes,
  validateSaveJob,
  validateSavedJobId,
};
