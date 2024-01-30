const inputEle = [
  {
    heading: "FirstName",
    name: "FirstName",
    type: "text",
    placeholder: "Enter FirstName",
    defaultvalue: "",
  },
  {
    heading: "LastName",
    name: "LastName",
    type: "text",
    placeholder: "Enter LastName",
    defaultvalue: "",
  },
  {
    heading: "Email",
    name: "email",
    type: "email",
    defaultValue: "",
    placeholder: "Enter Email",
  },
  {
    heading: "password",
    name: "password",
    type: "password",
    defaultValue: "",
    placeholder: "Enter password",
  },
  {
    heading: "Confirm password",
    name: "confirmpassword",
    type: "password",
    defaultValue: "",
    placeholder: "Enter confirmpassword",
  },

  {
    type: "radio",
    name: "gender",
    value: [
      {
        heading: "male",
        value: "male",
      },
      {
        heading: "female",
        value: "female",
      },
    ],
  },
  {
    heading: "Contact",
    name: "Contact",
    type: "text",
    defaultValue: "",
    placeholder: "Enter Contact",
  },
  {
    heading: "Send Email",
    type: "checkbox",
    value: "",
  },
  {
    heading: "Send notification",
    type: "checkbox",
    value: "",
  },
];

export default inputEle;
