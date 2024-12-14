import { useNavigate } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import Button from "./Button";
import UserCartItemsContent from "./UserCartItemsContent";

import {SheetContent, SheetHeader, SheetTitle } from "./Sheet";
// import UserCartItemsContent from "./UserCartItemsContent";
import { CartItemItemsProps } from "../../../../backend/src/types/types";

type CartWrapperProps = {
    cartItems: CartItemItemsProps[]; 
    setOpenCartSheet: React.Dispatch<React.SetStateAction<boolean>>;
  };

function CartWrapper({ setOpenCartSheet, cartItems }: CartWrapperProps) {
  const navigate = useNavigate();

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => {
      const price = item.oldPrice || item.newPrice;
      return total + price * item.quantity;
    }, 0);
  };

  return (
    <SheetContent className="sm:max-w-md bg-white font-body">
      <SheetHeader>
        <SheetTitle>Your Cart</SheetTitle>
      </SheetHeader>
      <div className="max-h-[500px] overflow-y-auto p-4 space-y-4">
      {cartItems && cartItems.length > 0
        ? cartItems.map((item) => {
            return <UserCartItemsContent key={item.bookId} item={item} />;
          })
        : (
          <div className="flex flex-col items-center gap-2">
            <FaShoppingCart className="w-6 h-6" />
            <p className=" font-bold text-center">Your cart is empty.</p>
          </div>
        )} 
    </div>

    <div className="sticky bottom-0 bg-white p-4">
      {cartItems && cartItems.length > 0 
      ?(
        <>
          <div className="mt-8 space-y-4">
            <div className="flex justify-between">
              <span className="font-bold">Total</span>
              <span className="font-bold">${calculateTotal().toFixed(2)}</span>
            </div>
          </div>
          <Button
            onClick={() => {
              navigate("/checkout");
              setOpenCartSheet(false);
            }}
            className="w-full mt-6 bg-black 
              hover:bg-black/80 text-white font-body"
          >
            Checkout
          </Button>
        </>
        ) 
      : (
        <Button
            onClick={() => {
              navigate("/product-category");
              setOpenCartSheet(false);
            }}
            className="w-full mt-6"
          >
            Let's go shopping
          </Button>
      ) }  
    </div>   
     
    </SheetContent>
  );
}

export default CartWrapper;