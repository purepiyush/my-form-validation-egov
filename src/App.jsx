import React from "react";
import Form from "./components/form/Form";
import formConfig from "./config/formConfig";

const App = () => {
  const handleFormSubmit = (data) => {
    console.log("Form Submitted:", data);
  };

  return (
    <div>
      <h1>Dynamic Form</h1>
      <Form config={formConfig} onSubmit={handleFormSubmit} />
    </div>
  );
};

export default App;
