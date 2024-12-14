import React from "react";
import { useCartContext } from "../../context/useCart";
import Button from "../../components/ui/Button";
import { useNavigate } from "react-router-dom";

const CheckoutPage: React.FC = () => {
  const { cartItems } = useCartContext();
  const navigate = useNavigate();

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => {
      const price = item.oldPrice || item.newPrice;
      return total + price * item.quantity;
    }, 0);
  };

  return (
    <div className="min-h-screen bg-gray-100 font-body">
      {/* Header */}
      <div className="bg-white shadow-sm py-4 px-6">
        <h1 className="text-2xl font-bold">Checkout</h1>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto mt-8">
        {/* Cart Items List */}
        <div className="bg-white rounded-lg shadow-md p-6 space-y-6">
          <h2 className="text-xl font-semibold">Order Summary</h2>

          {cartItems.length > 0 ? (
            cartItems.map((item) => (
              <div
                key={item.bookId}
                className="flex items-center justify-between border-b pb-4"
              >
                <div className="flex items-center space-x-4">
                  <img
                    src={item.image && item.image.length > 0 ? item.image[0] : ""}
                    alt={item.title}
                    className="w-16 h-16 rounded object-contain border"
                  />
                  <div>
                    <h3 className="font-semibold text-sm">{item.title}</h3>
                    <p className="text-gray-500 text-xs">
                      Quantity: {item.quantity}
                    </p>
                  </div>
                </div>

                <p className="font-semibold text-sm">
                  ${(item.oldPrice ?? item.newPrice ?? 0) * item.quantity}
                </p>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-center">Your cart is empty.</p>
          )}
        </div>

        {/* Summary Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mt-6 space-y-4">
          <div className="flex justify-between">
            <span className="font-semibold">Subtotal</span>
            <span className="font-semibold">${calculateTotal().toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">Tax (10%)</span>
            <span className="font-semibold">
              ${(calculateTotal() * 0.1).toFixed(2)}
            </span>
          </div>
          <div className="flex justify-between text-lg">
            <span className="font-bold">Total</span>
            <span className="font-bold">
              ${(calculateTotal() * 1.1).toFixed(2)}
            </span>
          </div>
          <Button
            className="w-full mt-4 bg-black hover:bg-black/80 text-white py-2 rounded-md"
            onClick={() => navigate("/payment")}
          >
            Proceed to Payment
          </Button>
        </div>

        {/* Back to Shopping */}
        <div className="mt-6 text-center">
          <button
            className="text-black font-semibold hover:underline"
            onClick={() => navigate("/product-category")}
          >
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
