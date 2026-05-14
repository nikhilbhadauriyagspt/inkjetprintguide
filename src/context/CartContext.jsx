import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    try {
      const savedCart = localStorage.getItem('cart');
      return savedCart ? JSON.parse(savedCart) : [];
    } catch {
      return [];
    }
  });

  const [wishlist, setWishlist] = useState(() => {
    try {
      const savedWishlist = localStorage.getItem('wishlist');
      return savedWishlist ? JSON.parse(savedWishlist) : [];
    } catch {
      return [];
    }
  });

  const [compare, setCompare] = useState(() => {
    try {
      const savedCompare = localStorage.getItem('compare');
      return savedCompare ? JSON.parse(savedCompare) : [];
    } catch {
      return [];
    }
  });

  const [toast, setToast] = useState(null);
  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false);
  const [isWishlistDrawerOpen, setIsWishlistDrawerOpen] = useState(false);
  const [isCompareDrawerOpen, setIsCompareDrawerOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const openCartDrawer = () => setIsCartDrawerOpen(true);
  const closeCartDrawer = () => setIsCartDrawerOpen(false);

  const openWishlistDrawer = () => setIsWishlistDrawerOpen(true);
  const closeWishlistDrawer = () => setIsWishlistDrawerOpen(false);

  const openCompareDrawer = () => setIsCompareDrawerOpen(true);
  const closeCompareDrawer = () => setIsCompareDrawerOpen(false);

  const openSearch = () => setIsSearchOpen(true);
  const closeSearch = () => setIsSearchOpen(false);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem('compare', JSON.stringify(compare));
  }, [compare]);

  const addToCart = (product, quantity = 1) => {
    if (!product) return;

    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);

      if (existingItem) {
        return prevCart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }

      return [
        ...prevCart,
        {
          ...product,
          images: product.images ?? [],
          quantity
        }
      ];
    });

    showToast(`${product.name} added to cart!`);
    setIsCartDrawerOpen(true);
  };

  const removeFromCart = (productId) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
    showToast('Item removed from cart', 'info');
  };

  const updateQuantity = (productId, quantity) => {
    if (quantity < 1) {
      removeFromCart(productId);
      return;
    }

    setCart(prevCart =>
      prevCart.map(item =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const toggleWishlist = (product) => {
    setWishlist(prevWishlist => {
      const exists = prevWishlist.find(item => item.id === product.id);

      if (exists) {
        showToast(`${product.name} removed from wishlist`, 'info');
        return prevWishlist.filter(item => item.id !== product.id);
      }

      showToast(`${product.name} added to wishlist!`);
      setIsWishlistDrawerOpen(true);
      return [...prevWishlist, product];
    });
  };

  const isInWishlist = (productId) => {
    return wishlist.some(item => item.id === productId);
  };

  const toggleCompare = (product) => {
    setCompare(prevCompare => {
      const exists = prevCompare.find(item => item.id === product.id);

      if (exists) {
        showToast(`${product.name} removed from comparison`, 'info');
        return prevCompare.filter(item => item.id !== product.id);
      }

      if (prevCompare.length >= 4) {
        showToast('You can only compare up to 4 products', 'error');
        return prevCompare;
      }

      showToast(`${product.name} added to comparison!`);
      setIsCompareDrawerOpen(true);
      return [...prevCompare, product];
    });
  };

  const isInCompare = (productId) => {
    return compare.some(item => item.id === productId);
  };

  const removeFromCompare = (productId) => {
    setCompare(prevCompare => prevCompare.filter(item => item.id !== productId));
  };

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  const cartTotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  const wishlistCount = wishlist.length;
  const compareCount = compare.length;

  return (
    <CartContext.Provider
      value={{
        cart,
        wishlist,
        compare,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        toggleWishlist,
        isInWishlist,
        toggleCompare,
        isInCompare,
        removeFromCompare,
        cartCount,
        cartTotal,
        wishlistCount,
        compareCount,
        toast,
        showToast,
        isCartDrawerOpen,
        openCartDrawer,
        closeCartDrawer,
        isWishlistDrawerOpen,
        openWishlistDrawer,
        closeWishlistDrawer,
        isCompareDrawerOpen,
        openCompareDrawer,
        closeCompareDrawer,
        isSearchOpen,
        openSearch,
        closeSearch
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
