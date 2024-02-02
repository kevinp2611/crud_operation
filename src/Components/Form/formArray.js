const formArray = {
  basic: [
    {
      label: "First Name",
      name: "first_name",
      type: "text",
      placeholder: "Enter first name",
      defaultValue: "",
    },
    {
      label: "Last Name",
      name: "last_name",
      type: "text",
      placeholder: "Enter last name",
      defaultValue: "",
    },
    {
      label: "Email",
      name: "email",
      type: "email",
      placeholder: "Enter email",
      defaultValue: "",
    },
    {
      label: "Password",
      name: "password",
      type: "password",
      placeholder: "Enter password",
      defaultValue: "",
    },
    {
      label: "Confirm Password",
      name: "confirm_password",
      type: "password",
      placeholder: "Enter confirm password",
      defaultValue: "",
    },
    {
      label: "Contact Number",
      name: "contact_number",
      type: "text",
      placeholder: "Enter contact number",
      defaultValue: "",
    },
    {
      label: "Gender",
      name: "gender",
      type: "radio",
      radioGroup: [
        {
          name: "gender",
          label: "Male",
          value: "male",
          id: "male",
        },
        {
          name: "gender",
          label: "Female",
          value: "female",
          id: "female",
        },
      ],
    },
  ],
  address: [
    {
      label: "Country",
      name: "country",
      type: "select",
      placeholder: "Select country",
      defaultValue: "",
    },
    {
      label: "State",
      name: "state",
      type: "select",
      placeholder: "Select state",
      defaultValue: "",
    },
    {
      label: "City",
      name: "city",
      type: "select",
      placeholder: "Select city",
      defaultValue: "",
    },
  ],
  preference: [
    {
      label: "Send Email",
      name: "send_mail",
      type: "checkbox",
      defaultValue: false,
    },
    {
      label: "Send Notification",
      name: "send_notification",
      type: "checkbox",
      defaultValue: false,
    },
  ],
};
export default formArray;
