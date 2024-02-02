const isName = RegExp(/^[A-Z ]{3,}$/i);
const isEmail = RegExp(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i);
const isPswd = RegExp(
  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/
);
const isPhone = RegExp(/^[6-9]\d{9}$/);
const validationSchema = {
  first_name: {
    required: true,
    validator: {
      regEx: isName,
      error: "Enter valid Firstname",
    },
  },
  last_name: {
    required: true,
    validator: {
      regEx: isName,
      error: "Enter valid Lastname",
    },
  },
  email: {
    required: true,
    validator: {
      regEx: isEmail,
      error: "Enter valid Email",
    },
  },
  password: {
    required: true,
    validator: {
      regEx: isPswd,
      error: "Enter valid Password",
    },
  },
  confirm_password: {
    required: true,
  },

  contact_number: {
    required: true,
    validator: {
      regEx: isPhone,
      error: "Enter valid Contact Number",
    },
  },
};
export default validationSchema;
