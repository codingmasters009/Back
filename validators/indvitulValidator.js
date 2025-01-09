const { body } = require('express-validator');

exports.validateUserCreation = [
  body('referenceNo').notEmpty().withMessage('Reference number is required'),
  body('firstName') .notEmpty().withMessage('First name is required'),
  body('middleName') .optional().isString() .withMessage('Middle name must be a string'),
  body('lastName').notEmpty() .withMessage('Last name is required'),
  body('passportIdNo') .notEmpty().withMessage('Passport ID number is required'),
  body('profession').notEmpty().withMessage('Profession is required'),
  body('registrationPurpose') .notEmpty() .withMessage('Registration purpose is required'),
  body('email') .isEmail() .withMessage('Invalid email format') .notEmpty() .withMessage('Email is required'),
  body('residentialAddress').notEmpty().withMessage('Residential address is required'),
  body('residentialCountry').notEmpty().withMessage('Residential country is required'),
  body('residentialState') .notEmpty().withMessage('Residential state is required'),
  body('residentialCity') .optional().isString().withMessage('Residential city must be a string'),
  body('personalPhoneNumber').notEmpty() .withMessage('Personal phone number is required'),
  body('gender') .notEmpty().withMessage('Gender is required'),
  body('nationality') .notEmpty() .withMessage('Nationality is required'),
  body('nationalityState').notEmpty().withMessage('Nationality state is required'),
  body('nationalityCity').optional().isString().withMessage('Nationality city must be a string'),
  body('nationalityAddress').notEmpty().withMessage('Nationality address is required'),
  body('nationalityPhoneNumber').notEmpty().withMessage('Nationality phone number is required'),
  body('PassportIDCopy').notEmpty().withMessage('Passport ID copy is required'),
  body('CurrentPicture').notEmpty().withMessage('Current picture is required'),
  body('termsAccepted').isBoolean().withMessage('Terms accepted must be a boolean')  .equals(true) .withMessage('Terms must be accepted'),
  body('dateTime') .optional() .isISO8601() .withMessage('DateTime must be a valid ISO8601 date'),
  
];
