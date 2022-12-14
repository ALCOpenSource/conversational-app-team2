const { check } = require("express-validator");

const fileName = check("fileName", "Filename is required.").not().isEmpty();
const courses = check("courses", "Course is required.").not().isEmpty();

const courseValidations = [fileName, courses];

module.exports = courseValidations;
