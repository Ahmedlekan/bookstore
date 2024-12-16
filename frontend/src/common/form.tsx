import RenderInputComponents from './RenderInputComponents';
import { useForm, FormProvider } from 'react-hook-form';
import BookImageUpload from "./BookImageUpload";
import { CgClose } from "react-icons/cg";
import { BookCategory } from '../../../backend/src/types/types';

export type initialFormDataProps = {
    _id?: string;
    title: string;
    author: string;
    publisher: string;
    description: string;
    sku: string;
    categories: BookCategory[];
    imageUrls: string[]; 
    imageFiles: FileList;
    oldPrice: number;
    newPrice: number;
    trending: boolean;
};


type CommonFormProps = {
    onSave: (productFormData: FormData) => void;
    isLoading: boolean;
    onClose?: ()=> void
}

function CommonForm({onSave, isLoading, onClose}: CommonFormProps) {

    const formMethods = useForm<initialFormDataProps>()
    
    const {handleSubmit} = formMethods

    const onSubmit = handleSubmit((formDataJson: initialFormDataProps) => {
      const formData = new FormData();
  
      // Append title and description
      formData.append("title", formDataJson.title);
      formData.append("author", formDataJson.author);
      formData.append("description", formDataJson.description);
      formData.append("publisher", formDataJson.publisher);
      formData.append("sku", formDataJson.sku);
  
      // Append categories as a JSON string since it's an array
      formData.append("categories", JSON.stringify(formDataJson.categories));
  
      // Append image URLs (if they exist)
      if (formDataJson.imageUrls) {
          formDataJson.imageUrls.forEach((url, index) => {
              formData.append(`imageUrls[${index}]`, url);
          });
      }
  
      // Append image files (if they exist)
      if (formDataJson.imageFiles) {
          Array.from(formDataJson.imageFiles).forEach((imageFile) => {
              formData.append("imageFiles", imageFile);
          });
      }
  
      // Append price information
      formData.append("oldPrice", formDataJson.oldPrice.toString());
      formData.append("newPrice", formDataJson.newPrice.toString());
  
      // Append trending flag
      formData.append("trending", formDataJson.trending.toString());
  
      // Call the `onSave` handler with the prepared FormData
      onSave(formData);
  });

  return (
    <FormProvider {...formMethods}>

      <div className="fixed w-full h-full bg-opacity-35 top-0 left-0
        right-0 bottom-0 flex justify-center items-center z-50 font-body"
      >
        <div className="bg-white p-4 rounded w-full max-w-2xl
        max-h-[80%] overflow-y-auto"
        >

          <div className='flex justify-between items-center pb-3'>
            <h2 className='font-bold text-lg'>Upload Book</h2>
            <div className='w-fit ml-auto text-2xl hover:text-red-600
                cursor-pointer' onClick={onClose}>
                <CgClose/>
            </div>
          </div>

          <form onSubmit={onSubmit}>
            <div className="flex flex-col gap-3 mt-10">
                <RenderInputComponents />
                <BookImageUpload />
            </div>

            <button disabled={isLoading} type="submit"
              className="mt-2 w-full bg-black hover:bg-black/80 text-white rounded-sm">
              {isLoading ? "Submitting..." : "Submit"}
            </button>
          </form>

        </div>
      </div>
    
    </FormProvider>
  );
}

export default CommonForm;