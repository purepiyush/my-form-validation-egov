const formConfig = [
    {
      type: "text",
      label: "Name",
      name: "name",
      placeholder: "Enter your full name",
      validation: {
        required: true,
        minLength: 3,
        maxLength: 50,
      },
    },
    {
      type: "email",
      label: "Email",
      name: "email",
      placeholder: "Enter your email address",
      validation: {
        required: true,
        pattern: /^\S+@\S+\.\S+$/, // Email format
        maxLength: 100,
      },
    },
    {
      type: "password",
      label: "Password",
      name: "password",
      placeholder: "Enter a secure password",
      validation: {
        required: true,
        minLength: 8,
        maxLength: 128,
        pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,}$/, // At least one letter, one number
      },
    },
    {
      type: "number",
      label: "Age",
      name: "age",
      placeholder: "Enter your age",
      validation: {
        required: true,
        min: 18, // Minimum age
        max: 100, // Maximum age
      },
    },
    {
      type: "select",
      label: "Gender",
      name: "gender",
      options: [
        { value: "", label: "Select your gender" },
        { value: "male", label: "Male" },
        { value: "female", label: "Female" },
        { value: "other", label: "Other" },
      ],
      validation: {
        required: true,
      },
    },
    {
      type: "checkbox",
      label: "I agree to the Terms and Conditions",
      name: "terms",
      validation: {
        required: true,
      },
    },
    {
      type: "radio",
      label: "Preferred Contact Method",
      name: "contactMethod",
      options: [
        { value: "email", label: "Email" },
        { value: "phone", label: "Phone" },
      ],
      validation: {
        required: true,
      },
    },
    {
      type: "tel",
      label: "Phone Number",
      name: "phoneNumber",
      placeholder: "Enter your phone number",
      validation: {
        required: true,
        pattern: /^[0-9]{10}$/, // 10-digit phone number
        conditional: (formData) => formData.contactMethod === "phone", // Required only if 'phone' is selected as contact method
      },
    },
    {
      type: "date",
      label: "Date of Birth",
      name: "dob",
      validation: {
        required: true,
      },
    },
    {
      type: "textarea",
      label: "Additional Information",
      name: "additionalInfo",
      placeholder: "Enter any additional information",
      validation: {
        required: false,
        maxLength: 500,
      },
    },
  ];

  export default formConfig;