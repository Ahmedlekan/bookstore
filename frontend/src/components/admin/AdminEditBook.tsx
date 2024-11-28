import { BookType } from '../../../../backend/src/types/types'
import RenderInputComponents from '../../common/RenderInputComponents'
import BookImageUpload from '../../common/BookImageUpload'
import { useForm, FormProvider } from 'react-hook-form';
import { CgClose } from "react-icons/cg";
import { initialFormDataProps } from '../../common/form';
import * as adminApiClient from "../../apiClient/admin"
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useAppContext } from '../../context/useAppContext';

type AdminEditBookProps = {
    bookData: BookType
    onClose:()=> void
}

const AdminEditBook = ({bookData, onClose}: AdminEditBookProps) => {
    const {showToast} = useAppContext()
    const queryClient = useQueryClient()

    const formMethods = useForm<initialFormDataProps>({
        defaultValues: bookData
    })
    const {handleSubmit} = formMethods

    const {mutate, isPending: isLoading} = useMutation({
        mutationFn: adminApiClient.updateBookById,
        onSuccess: async(data)=>{
            console.log("Book updated successfully:", data);
            showToast({ message: "Book Updated!", type: "SUCCESS" });
            queryClient.invalidateQueries()
        },
        onError: async(error)=>{
            console.error("Mutation failed:", error);
        showToast({ message: error.message || "Book failed to update!", type: "ERROR" });
        }
    })

    const onSave = (bookFormData: FormData)=>{
        mutate(bookFormData)
    }

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

      // **Append the product ID**
      if (formDataJson._id) {
        formData.append("bookId", formDataJson._id);
        } else {
            showToast({ message: "Book ID is missing", type: "ERROR" });
            return;
        }
  
      // Call the `onSave` handler with the prepared FormData
      onSave(formData);
  });


  return (
    <FormProvider {...formMethods}>

      <div className="fixed w-full h-full bg-opacity-35 top-0 left-0
        right-0 bottom-0 flex justify-center items-center z-50"
      >
        <div className="bg-white p-4 rounded w-full max-w-2xl
        max-h-[80%] overflow-y-auto"
        >

          <div className='flex justify-between items-center pb-3'>
            <h2 className='font-bold text-lg'>Edit Book</h2>
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

            <button disabled={isLoading} type="submit" className="mt-2 w-full">
              {isLoading ? "Submitting..." : "Submit"}
            </button>
          </form>

        </div>
      </div>
    
    </FormProvider>
  )
}

export default AdminEditBook