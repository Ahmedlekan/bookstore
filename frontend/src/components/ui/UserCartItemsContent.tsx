import { Minus, Plus, Trash } from "lucide-react";
import Button from "../ui/Button";
import { CartItemItemsProps } from "../../../../backend/src/types/types";
import { useCartContext } from "../../context/useCart";

type UserCartItemsContentProps = {
    item: CartItemItemsProps
}

function UserCartItemsContent({ item }: UserCartItemsContentProps) {

  const {updateQuantityHandler, deleteCartItemHandler} = useCartContext()

  // Handle updating the quantity of a cart item
  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity < 1) {
      alert("Can't go below 1");
      return;
    }
    updateQuantityHandler(item.bookId, newQuantity);
  };

// Handle deleting a cart item
const handleRemove = () => {
  deleteCartItemHandler(item.bookId);
};

// Safely calculate price
const itemPrice = (item.oldPrice ?? item.newPrice ?? 0) * item.quantity;

  return (
    <div className="flex items-center space-x-4">

      <div className="w-32 h-36">
        <img
          src={item.image && item.image.length > 0 ? item.image[0] : ""}
          alt={item?.title}
          className="w-full h-full object-contain"
        />
      </div>

      <div className="flex-1">
        <h3 className="font-extrabold">{item?.title}</h3>
        <div className="flex items-center gap-2 mt-1">
          <Button
            variant="outline"
            className="h-8 w-8 rounded-full"
            size="icon"
            onClick={() => handleQuantityChange(item.quantity - 1)}
          >
            <Minus className="w-4 h-4" />
            <span className="sr-only">Decrease</span>
          </Button>
          <span className="font-semibold">{item?.quantity}</span>
          <Button
            variant="outline"
            className="h-8 w-8 rounded-full"
            size="icon"
            onClick={() => handleQuantityChange(item.quantity + 1)}
          >
            <Plus className="w-4 h-4" />
            <span className="sr-only">Increase</span>
          </Button>
        </div>
      </div>
      <div className="flex flex-col items-end">
        <p className="font-semibold">
        ${itemPrice.toFixed(2)}
        </p>
        <Trash
          onClick={handleRemove}
          className="cursor-pointer mt-1"
          size={20}
        />
      </div>
    </div>
  );
}

export default UserCartItemsContent;