import { UseFormRegister, FieldValues, Path } from 'react-hook-form';

interface Option {
  value: string | number;
  label: string;
}

interface SelectFieldProps<T extends FieldValues> {
  label: string;
  name: Path<T>;
  options: Option[];
  register: UseFormRegister<T>;
}

const SelectField = <T extends FieldValues>({label,name,options,register,}: SelectFieldProps<T>) => {

  return (
    <div className="mb-4">
      <label className="block text-sm font-semibold text-gray-700">{label}</label>
      <select
        {...register(name, { required: true })}
        className="w-full p-2 border rounded-md focus:outline-none
            focus:ring focus:border-blue-300"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectField;