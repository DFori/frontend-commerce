const CartSidebar = ({ isOpen, onClose }) => {
  const { items, cartTotal, clearCart } = useCart();

  return (
    <div
      className={`fixed inset-y-0 right-0 w-full sm:w-96 bg-white shadow-lg transform transition-transform ${
        isOpen ? "translate-x-0" : "translate-x-full"
      } z-50`}
    >
      <div className="h-full flex flex-col p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">Your Cart</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ×
          </button>
        </div>

        <div className="flex-1 overflow-y-auto">
          {items.length === 0 ? (
            <p className="text-gray-500 text-center">Your cart is empty</p>
          ) : (
            items.map((item) => <CartItem key={item.id} item={item} />)
          )}
        </div>

        {items.length > 0 && (
          <div className="mt-6 space-y-4">
            <div className="flex justify-between text-lg font-semibold">
              <span>Total</span>
              <span>${cartTotal.toFixed(2)}</span>
            </div>
            <button
              onClick={clearCart}
              className="w-full py-2 text-red-500 border border-red-500 rounded-lg hover:bg-red-50"
            >
              Clear Cart
            </button>
            <button
              onClick={() => {
                /* Handle checkout */
              }}
              className="w-full py-2 bg-[#b4166d] text-white rounded-lg hover:bg-[#690c43]"
            >
              Checkout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
export default CartSidebar;
