import React, { useState } from 'react';
import JSONEditor from './JSONEditor';
import FormGenerator from './FormGenerator';

const App: React.FC = () => {
  const [jsonSchema, setJsonSchema] = useState<string>(`{
    "formTitle": "Sample Form",
    "fields": [
      { "id": "name", "type": "text", "label": "Name", "required": true },
      { "id": "email", "type": "email", "label": "Email", "required": true }
    ]
  }`);

  return (
    <div className="flex flex-col md:flex-row h-screen">
      <div className="w-full md:w-1/2 p-4 bg-gray-100">
        <JSONEditor json={jsonSchema} onChange={setJsonSchema} />
      </div>
      <div className="w-full md:w-1/2 p-4 bg-gray-50">
        <FormGenerator schema={jsonSchema} />
      </div>
    </div>
  );
};

export default App;
