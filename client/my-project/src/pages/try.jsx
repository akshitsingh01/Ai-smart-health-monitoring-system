import React, { useState } from "react";

const DynamicForm = () => {
  const [fields, setFields] = useState([{ id: 1, value: "" }]);

  const addField = () => {
    setFields([...fields, { id: fields.length + 1, value: "" }]);
  };

  const handleChange = (id, newValue) => {
    setFields(fields.map((field) => (field.id === id ? { ...field, value: newValue } : field)));
  };

  return (
    <div className="p-6 max-w-md mx-auto border rounded shadow-md bg-white">
      <h2 className="text-xl font-bold mb-4">Dynamic Form</h2>

      {fields.map((field) => (
        <input
          key={field.id}
          type="text"
          placeholder={`Field ${field.id}`}
          className="border p-2 w-full mb-3"
          value={field.value}
          onChange={(e) => handleChange(field.id, e.target.value)}
        />
      ))}

      <button onClick={addField} className="bg-blue-500 text-white px-4 py-2 rounded w-full">
        Add New Field
      </button>
    </div>
  );
};

export default DynamicForm;
