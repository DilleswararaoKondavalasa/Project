import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';

interface Field {
  id: string;
  type: string;
  label: string;
  required: boolean;
  placeholder?: string;
  options?: { value: string; label: string }[];
}

interface Schema {
  formTitle: string;
  fields: Field[];
}

const FormGenerator: React.FC<{ schema: string }> = ({ schema }) => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  let parsedSchema: Schema;

  try {
    parsedSchema = JSON.parse(schema);
  } catch {
    return <p className="text-red-500">Invalid JSON Schema</p>;
  }

  const onSubmit: SubmitHandler<any> = (data) => {
    console.log(data);
    alert('Form submitted successfully!');
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <h2 className="text-lg font-bold">{parsedSchema.formTitle}</h2>
      {parsedSchema.fields.map((field) => (
        <div key={field.id} className="flex flex-col">
          <label htmlFor={field.id} className="mb-1">
            {field.label} {field.required && '*'}
          </label>
          {field.type === 'select' ? (
            <select
              id={field.id}
              {...register(field.id, { required: field.required })}
              className="p-2 border rounded"
            >
              {field.options?.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          ) : field.type === 'radio' ? (
            field.options?.map((option) => (
              <label key={option.value} className="flex items-center space-x-2">
                <input
                  type="radio"
                  value={option.value}
                  {...register(field.id, { required: field.required })}
                />
                <span>{option.label}</span>
              </label>
            ))
          ) : (
            <input
              id={field.id}
              type={field.type}
              placeholder={field.placeholder}
              {...register(field.id, { required: field.required })}
              className="p-2 border rounded"
            />
          )}
          {errors[field.id] && (
            <span className="text-red-500 text-sm">
              {field.label} is required.
            </span>
          )}
        </div>
      ))}
      <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">
        Submit
      </button>
    </form>
  );
};

export default FormGenerator;
