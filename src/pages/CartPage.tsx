import React, { useEffect } from 'react';
import { useCartStore } from '../store/cart';
import { useAuthStore } from '../store/auth';
import { useNavigate } from 'react-router-dom';

export const CartPage: React.FC = () => {
  const { cart, isLoading, error, updateCartItem, removeFromCart, applyCoupon } = useCartStore();
  const { isAuthenticated } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    // Cart data is automatically managed by the store
  }, []);

  const handleUpdateQuantity = async (itemId: number, qty: number) => {
    await updateCartItem(itemId, qty);
  };

  const handleRemoveItem = async (itemId: number) => {
    await removeFromCart(itemId);
  };

  const handleApplyCoupon = async (code: string) => {
    await applyCoupon(code);
  };

  const handleCheckout = () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    navigate('/checkout');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
          <p className="mt-4 text-gray-600">Loading cart...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600">Error: {error}</p>
        </div>
      </div>
    );
  }

  if (!cart || cart.items.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Your cart is empty</h2>
          <p className="text-gray-600 mb-8">Add some products to get started!</p>
          <button
            onClick={() => navigate('/products')}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm">
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-6">Cart Items ({cart.total_items})</h2>
                
                <div className="space-y-6">
                  {cart.items.map((item) => (
                    <div key={item.id} className="flex items-center space-x-4 p-4 border rounded-lg">
                      <div className="w-20 h-20 bg-gray-200 rounded-lg flex-shrink-0">
                        {item.variant.product.primary_image && (
                          <img
                            src={item.variant.product.primary_image.image}
                            alt={item.variant.product.primary_image.alt_text}
                            className="w-full h-full object-cover rounded-lg"
                          />
                        )}
                      </div>
                      
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900">{item.variant.product.name}</h3>
                        <p className="text-sm text-gray-600">{item.variant.title}</p>
                        <p className="text-sm text-gray-500">SKU: {item.variant.sku}</p>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleUpdateQuantity(item.id, item.qty - 1)}
                          className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50"
                        >
                          -
                        </button>
                        <span className="w-8 text-center">{item.qty}</span>
                        <button
                          onClick={() => handleUpdateQuantity(item.id, item.qty + 1)}
                          className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50"
                        >
                          +
                        </button>
                      </div>
                      
                      <div className="text-right">
                        <p className="font-medium">₹{item.total_price}</p>
                        <button
                          onClick={() => handleRemoveItem(item.id)}
                          className="text-red-600 text-sm hover:text-red-800"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold mb-6">Order Summary</h2>
              
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>₹{cart.subtotal}</span>
                </div>
                
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>Free</span>
                </div>
                
                <div className="flex justify-between">
                  <span>Tax</span>
                  <span>₹0</span>
                </div>
                
                <div className="border-t pt-4">
                  <div className="flex justify-between font-semibold text-lg">
                    <span>Total</span>
                    <span>₹{cart.subtotal}</span>
                  </div>
                </div>
              </div>
              
              <button
                onClick={handleCheckout}
                className="w-full mt-6 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
