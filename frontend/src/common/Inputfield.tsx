import { UseFormRegister, FieldValues, Path } from 'react-hook-form';

interface InputFieldProps<T extends FieldValues> {
  label: string; // Label text for the input field
  name: Path<T>; // Field name, compatible with react-hook-form
  type?: string; // Input type (e.g., text, email, password), defaults to 'text'
  register: UseFormRegister<T>; // react-hook-form's register function
  placeholder?: string; // Optional placeholder text
}

const InputField = <T extends FieldValues>({label,name,type = 'text',register,placeholder,
  }: InputFieldProps<T>) => {

    return (
      <div className="mb-4">
        <label className="block text-sm font-semibold text-gray-700">{label}</label>
        <input
          type={type}
          {...register(name, { required: true })}
          className="p-2 border w-full rounded-md focus:outline-none focus:ring focus:border-blue-300"
          placeholder={placeholder}
        />
      </div>
    );
  };
  
  export default InputField;