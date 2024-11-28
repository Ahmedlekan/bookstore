import { useAppContext } from '../../context/useAppContext';
import { useQueryClient, useMutation } from '@tanstack/react-query';
import * as adminApiClient from "../../apiClient/admin"


type DeleteBookModalProps = {
    bookId: string;
    onClose: () => void;
};

const DeleteBookModal = ({bookId, onClose}: DeleteBookModalProps) => {
    const { showToast } = useAppContext();
    const queryClient = useQueryClient();

    const { mutate, isPending:isLoading } = useMutation({
        mutationFn: adminApiClient.deleteBook,
        onSuccess: () => {
            queryClient.invalidateQueries(); // Refetch book data after deletion
            showToast({ message: "Book deleted successfully!", type: "SUCCESS" });
            onClose();
        },
        onError: (error) => {
            console.error("Error deleting book:", error);
            showToast({ message: "Failed to delete the book!", type: "ERROR" });
        },
    });

    const handleDelete = () => {
        mutate(bookId);
    };

  return (
    <div className="fixed w-full h-full bg-opacity-50 top-0 left-0 flex justify-center items-center z-50 bg-gray-900">
            <div className="bg-white p-6 rounded shadow-md w-96">
                <h2 className="text-lg font-semibold">Confirm Deletion</h2>
                <p className="mt-2">Are you sure you want to delete this book?</p>
                <div className="mt-4 flex justify-between">
                    <button
                        onClick={onClose}
                        className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
                        disabled={isLoading}
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleDelete}
                        className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                        disabled={isLoading}
                    >
                        {isLoading ? "Deleting..." : "Delete"}
                    </button>
                </div>
            </div>
        </div>
  )
}

export default DeleteBookModal