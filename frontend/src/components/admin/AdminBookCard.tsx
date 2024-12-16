import { BookType } from '../../../../backend/src/types/types'
import { useState } from 'react';
import AdminEditBook from './AdminEditBook';
import DeleteBookModal from './DeleteBookModal';

type AdminBookCardProps = {
    data: BookType
}

const AdminBookCard:React.FC<AdminBookCardProps> = ({data}) => {
  const [openCreateEditBooksDialog, setOpenCreateEditBooksDialog] = useState<boolean>(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);

    const handleDeleteClick = () => {
        setDeleteModalOpen(true);
    };

    const closeModal = () => {
        setDeleteModalOpen(false);
    };

  return (
    <div className="flex border rounded-lg p-4 shadow-md hover:shadow-lg font-body">
      {/* Left Side: Book Image and Details */}
      
      <div className="flex-1 flex items-start gap-10">
        <img
          src={data.imageUrls[0]}
          alt={data.title}
          className="w-44 h-56 object-cover rounded-md"
        />
        <div className="flex flex-col items-start justify-around h-56">
          <h3 className="text-lg font-semibold">Title: {data.title}</h3>
          <p className="text-sm text-gray-500 line-clamp-4 max-w-96">{data.description}</p>
          <p>Author: {data.author}</p>
          <p>Category: {data.categories}</p>
          {/* <div className="mt-2">
            {data.oldPrice && <span className="text-gray-400 line-through mr-2">${data.oldPrice}</span>}
            <span className="text-green-600 font-semibold">${data.newPrice}</span>
          </div> */}
        </div>
      </div>

      {/* Right Side: Actions */}
      <div className="flex flex-col items-end justify-between">
        <button
          className="bg-black text-white text-sm px-4 py-2
          rounded-md hover:bg-black/80"
          onClick={() => setOpenCreateEditBooksDialog(true)}
        >
          Edit
        </button>
        <button
          className="bg-black text-white text-sm px-4 py-2
          rounded-md hover:bg-black/80"
          onClick={handleDeleteClick}
        >
          Delete
        </button>
      </div>

      {
        openCreateEditBooksDialog && (
          <AdminEditBook bookData={data} onClose={()=> setOpenCreateEditBooksDialog(false)} />
        )
      }

      {isDeleteModalOpen && (
        <DeleteBookModal
          bookId={data._id}
          onClose={closeModal}
        />
      )}
      
    </div>
  )
}

export default AdminBookCard