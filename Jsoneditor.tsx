
import React, { useState } from 'react';

interface JSONEditorProps {
  json: string;
  onChange: (newJson: string) => void;
}

const JSONEditor: React.FC<JSONEditorProps> = ({ json, onChange }) => {
  const [error, setError] = useState<string | null>(null);

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = event.target.value;
    try {
      JSON.parse(newValue); // Validate JSON
      setError(null);
      onChange(newValue);
    } catch (err) {
      setError('Invalid JSON format');
    }
  };

  return (
    <div>
      <h2 className="text-lg font-bold mb-2">JSON Editor</h2>
      <textarea
        value={json}
        onChange={handleChange}
        rows={20}
        className="w-full p-2 border rounded"
      />
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  );
};

export default JSONEditor
