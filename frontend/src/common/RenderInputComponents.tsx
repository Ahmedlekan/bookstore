import { useFormContext } from 'react-hook-form'
import { initialFormDataProps } from "../common/form";
import InputField from './Inputfield';
import SelectField from './SelectField';

type Option = {
  id: string;
  label: string;
};

export type FormControl = {
  label: string;
  name: string;
  componentType: string;
  options: Option[];
};

const RenderInputComponents = () => {

  const {register} = useFormContext<initialFormDataProps>()


  return (
    <div className="flex flex-col gap-4">
      
      {/* Reusable Input Field for Title */}
      <InputField
          label="Title"
          name="title"
          placeholder="Enter book title"
          register={register}
      />
      
      <InputField
          label="Author"
          name="author"
          placeholder="Enter Author's Name"
          register={register}
      />

      {/* Reusable Textarea for Description */}
      <InputField
        label="Description"
        name="description"
        placeholder="Enter book description"
        type="textarea"
        register={register}
      />

      {/* Reusable Select Field for Category */}
        <SelectField
            label="Category"
            name="categories"
            options={[
            { value: '', label: 'Choose a category' },
            { value: 'History', label: 'History' },
            { value: 'Romance', label: 'Romance' },
            { value: 'Fantasy', label: 'Fantasy' },
            { value: 'Cook Book', label: 'Cook Book' },
            // Add more options as needed
            ]}
            register={register}
        />

      <InputField
        label="Publisher"
        name="publisher"
        placeholder="Enter book publisher"
        register={register}

      />
      
      {/* Trending Checkbox */}
      <div className="mb-4">
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              {...register('trending')}
              className="rounded text-blue-600 focus:ring focus:ring-offset-2 focus:ring-blue-500"
            />
            <span className="ml-2 text-sm font-semibold text-gray-700">Trending</span>
          </label>
        </div>

      {/* Old Price */}
      <InputField
          label="Old Price"
          name="oldPrice"
          type="number"
          placeholder="Old Price"
          register={register}
         
        />

      {/* New Price */}
      <InputField
          label="New Price"
          name="newPrice"
          type="number"
          placeholder="New Price"
          register={register}
        />

    </div>
  )
}

export default RenderInputComponents





