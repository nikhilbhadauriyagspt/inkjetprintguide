import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import SEO from '@/components/SEO';
import { useCart } from '../context/CartContext';
import {
  Heart,
  ChevronRight,
  Truck,
  ShieldCheck,
  Plus,
  Minus,
  ShoppingCart,
  Share2,
  Info,
  Zap,
  RotateCcw,
  ArrowRight,
} from 'lucide-react';
import { motion } from 'framer-motion';
import API_BASE_URL from '../config';

export default function ProductDetail() {
  const { addToCart, toggleWishlist, isInWishlist } = useCart();
  const [isAdded, setIsAdded] = useState(false);
  const { slug } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);

  const [images, setImages] = useState([]);
  const [mainImage, setMainImage] = useState('/logo/fabicon.png');
  const [zoomStyle, setZoomStyle] = useState({ display: 'none' });
  const [zoomBgPos, setZoomBgPos] = useState('0% 0%');

  const handleMouseMove = (e) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.pageX - left - window.scrollX) / width) * 100;
    const y = ((e.pageY - top - window.scrollY) / height) * 100;
    setZoomBgPos(`${x}% ${y}%`);
    setZoomStyle({ display: 'block' });
  };

  const handleMouseLeave = () => {
    setZoomStyle({ display: 'none' });
  };

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity);
    navigate('/checkout');
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product.name,
        url: window.location.href,
      }).catch(() => { });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    setLoading(true);

    fetch(`${API_BASE_URL}/products/${slug}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 'success') {
          setProduct(data.data);
          const productImages = getImages(data.data.images);
          setImages(productImages);
          setMainImage(productImages.length > 0 ? productImages[0] : '/logo/fabicon.png');

          const categories = data.data.categories || [];
          const categorySlug = categories.length > 0 ? categories[0].slug : '';

          let fetchUrl = `${API_BASE_URL}/products?limit=12`;
          if (categorySlug) fetchUrl += `&category=${categorySlug}`;

          fetch(fetchUrl)
            .then((res) => res.json())
            .then((relData) => {
              if (relData.status === 'success') {
                setRelatedProducts(relData.data.filter((p) => p.id !== data.data.id).slice(0, 6));
              }
            });
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [slug]);

  const getImages = (images) => {
    try {
      const imgs = typeof images === 'string' ? JSON.parse(images) : images;
      return Array.isArray(imgs) ? imgs.map((img) => `/${img.replace(/\\/g, '/')}`) : [];
    } catch { return []; }
  };

  const getImagePath = (images) => {
    try {
      const imgs = typeof images === 'string' ? JSON.parse(images) : images;
      if (Array.isArray(imgs) && imgs.length > 0) return `/${imgs[0].replace(/\\/g, '/')}`;
    } catch { }
    return '/logo/fabicon.png';
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white">
        <div className="w-10 h-10 border-4 border-slate-100 border-t-[#2f5cab] rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-center px-6 bg-[#f8faff]">
        <h2 className="text-2xl font-bold text-slate-900 mb-4">Product Not Found</h2>
        <Link to="/shop" className="text-[#2f5cab] font-bold hover:underline">Return to Shop Catalog</Link>
      </div>
    );
  }

  const discount = product.old_price ? Math.round(((product.old_price - product.price) / product.old_price) * 100) : 0;

  return (
    <div className="min-h-screen bg-[#f8faff] font-sans text-slate-900 pb-20">
      <SEO title={product.name} />

      {/* --- PAGE HEADER --- */}
      <div className="bg-white py-10 md:py-14 border-b border-slate-100 mb-10">
        <div className="max-w-[1800px] mx-auto px-4 md:px-10">
          <nav className="flex items-center gap-2 text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-6">
            <Link to="/" className="hover:text-[#2f5cab] transition-colors">Home</Link>
            <ChevronRight size={12} className="opacity-50" />
            <Link to="/shop" className="hover:text-[#2f5cab] transition-colors">Shop</Link>
            <ChevronRight size={12} className="opacity-50" />
            <span className="text-[#2f5cab]">Product Details</span>
          </nav>
          <h1 className="text-2xl md:text-4xl font-bold text-slate-900 leading-tight max-w-4xl">
            {product.name}
          </h1>
        </div>
      </div>

      <div className="max-w-[1800px] mx-auto px-4 md:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-16 items-start">

          {/* --- LEFT: IMAGE GALLERY --- */}
          <div className="lg:col-span-6 space-y-8 lg:sticky lg:top-32">
            <div className="flex flex-col md:flex-row gap-6">
              {/* Thumbnails */}
              {images.length > 1 && (
                <div className="flex md:flex-col gap-4 overflow-x-auto md:overflow-y-auto no-scrollbar max-h-[600px] order-2 md:order-1">
                  {images.map((img, idx) => (
                    <button
                      key={idx}
                      onMouseEnter={() => { setActiveImage(idx); setMainImage(img); }}
                      onClick={() => { setActiveImage(idx); setMainImage(img); }}
                      className={`w-20 h-20 rounded-2xl border-2 p-2 bg-white shrink-0 transition-all ${activeImage === idx ? 'border-[#2f5cab] shadow-lg shadow-blue-600/5' : 'border-slate-50 hover:border-slate-200'}`}
                    >
                      <img src={img} alt="" className="w-full h-full object-contain mix-blend-multiply" />
                    </button>
                  ))}
                </div>
              )}

              {/* Main Image with Zoom */}
              <div
                className="flex-1 aspect-square bg-white border border-slate-100 rounded-[40px] relative flex items-center justify-center p-12 group cursor-crosshair order-1 md:order-2 shadow-sm"
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
              >
                <motion.img
                  key={activeImage}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  src={mainImage}
                  alt={product.name}
                  className="max-w-full max-h-full object-contain mix-blend-multiply"
                />

                {/* Zoom Window */}
                <div
                  className="hidden lg:block absolute left-full top-0 ml-6 w-[600px] h-[600px] bg-white border border-slate-200 shadow-2xl z-[100] pointer-events-none rounded-[32px] overflow-hidden"
                  style={{
                    ...zoomStyle,
                    backgroundImage: `url(${mainImage})`,
                    backgroundPosition: zoomBgPos,
                    backgroundSize: '300%',
                    backgroundRepeat: 'no-repeat'
                  }}
                />

                {/* Overlay Badges */}
                <div className="absolute top-6 left-6 flex flex-col gap-3 pointer-events-none">
                  {discount > 0 && (
                    <div className="bg-[#2f5cab] text-white text-[12px] font-bold px-4 py-1.5 rounded-full shadow-lg shadow-blue-600/20">
                      -{discount}% Off
                    </div>
                  )}
                </div>

                <button
                  onClick={() => toggleWishlist(product)}
                  className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white border border-slate-50 shadow-lg flex items-center justify-center text-slate-300 hover:text-red-500 transition-all z-10 active:scale-90"
                >
                  <Heart size={24} fill={isInWishlist(product.id) ? '#ef4444' : 'none'} className={isInWishlist(product.id) ? 'text-red-500' : ''} />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="flex items-center gap-4 p-6 bg-white border border-slate-100 rounded-[28px] shadow-sm">
                <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center text-[#2f5cab]">
                  <Truck size={24} />
                </div>
                <div className="flex flex-col">
                  <span className="text-[14px] font-bold text-slate-900">Free Delivery</span>
                  <span className="text-[12px] text-slate-400 font-medium">Worldwide Logistics</span>
                </div>
              </div>
              <div className="flex items-center gap-4 p-6 bg-white border border-slate-100 rounded-[28px] shadow-sm">
                <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center text-[#2f5cab]">
                  <RotateCcw size={24} />
                </div>
                <div className="flex flex-col">
                  <span className="text-[14px] font-bold text-slate-900">Easy Returns</span>
                  <span className="text-[12px] text-slate-400 font-medium">7-Day Guarantee</span>
                </div>
              </div>
            </div>
          </div>

          {/* --- RIGHT: PRODUCT INFO --- */}
          <div className="lg:col-span-6 space-y-10">
            <div className="bg-white p-8 md:p-12 border border-slate-100 rounded-[40px] shadow-sm">
              <div className="space-y-8">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                    <span className="text-[12px] font-bold text-slate-400 uppercase tracking-widest">
                      Hardware Certified
                    </span>
                  </div>
                  <button
                    onClick={handleShare}
                    className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 hover:text-[#2f5cab] transition-all"
                  >
                    <Share2 size={20} />
                  </button>
                </div>

                <div className="space-y-4">
                  <div className="flex items-baseline gap-4">
                    <span className="text-[#2f5cab] text-4xl font-light">-{discount}%</span>
                    <div className="flex flex-col">
                      <div className="flex items-start">
                        <span className="text-xl font-bold mt-2 mr-1">₹</span>
                        <span className="text-5xl font-black">{parseFloat(product.price).toLocaleString()}</span>
                      </div>
                      <div className="text-[15px] text-slate-400 font-medium mt-1">
                        M.R.P.: <span className="line-through">₹{(parseFloat(product.price) / (1 - discount/100)).toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                  <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-emerald-50 text-emerald-600 text-[12px] font-bold rounded-full">
                    <ShieldCheck size={14} />
                    Secure Transaction Guaranteed
                  </div>
                </div>

                {/* Selection and Actions */}
                <div className="pt-6 space-y-8">
                  <div className="flex items-center gap-6">
                    <span className="text-[15px] font-bold text-slate-800 uppercase tracking-widest">Quantity:</span>
                    <div className="flex items-center bg-slate-50 rounded-2xl border border-slate-100 p-1">
                      <button
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="w-10 h-10 flex items-center justify-center hover:bg-white rounded-xl transition-all shadow-sm"
                      >
                        <Minus size={16} strokeWidth={2.5} />
                      </button>
                      <input
                        type="number"
                        value={quantity}
                        readOnly
                        className="w-12 bg-transparent text-center text-lg font-bold outline-none"
                      />
                      <button
                        onClick={() => setQuantity(quantity + 1)}
                        className="w-10 h-10 flex items-center justify-center hover:bg-white rounded-xl transition-all shadow-sm"
                      >
                        <Plus size={16} strokeWidth={2.5} />
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <button
                      onClick={handleAddToCart}
                      className={`h-16 rounded-full font-bold text-[14px] uppercase tracking-widest shadow-xl transition-all flex items-center justify-center gap-3 cursor-pointer ${isAdded ? 'bg-emerald-600 text-white shadow-emerald-600/20' : 'bg-slate-900 hover:bg-[#2f5cab] text-white shadow-slate-900/10'}`}
                    >
                      <ShoppingCart size={20} />
                      {isAdded ? 'Synced to Cart' : 'Add to Manifest'}
                    </button>
                    <button
                      onClick={handleBuyNow}
                      className="h-16 bg-white border-2 border-slate-100 hover:border-[#2f5cab] hover:text-[#2f5cab] text-slate-900 rounded-full font-bold text-[14px] uppercase tracking-widest flex items-center justify-center gap-3 transition-all active:scale-95"
                    >
                      <Zap size={20} />
                      Instant Checkout
                    </button>
                  </div>
                </div>

                <div className="pt-10 border-t border-slate-50">
                  <h4 className="text-[16px] font-bold text-slate-900 mb-6 uppercase tracking-widest">Technical Overview</h4>
                  <ul className="space-y-4">
                    {product.description ? (
                      product.description.split('.').map((sentence, idx) => (
                        sentence.trim() && (
                          <li key={idx} className="flex gap-4 text-[15px] text-slate-500 leading-relaxed font-medium">
                            <div className="w-1.5 h-1.5 rounded-full bg-blue-100 mt-2.5 shrink-0" />
                            <span>{sentence.trim()}.</span>
                          </li>
                        )
                      ))
                    ) : (
                      <>
                        <li className="flex gap-4 text-[15px] text-slate-500 font-medium"><div className="w-1.5 h-1.5 rounded-full bg-blue-100 mt-2.5 shrink-0" /><span>Premium performance for demanding professional workflows.</span></li>
                        <li className="flex gap-4 text-[15px] text-slate-500 font-medium"><div className="w-1.5 h-1.5 rounded-full bg-blue-100 mt-2.5 shrink-0" /><span>Seamless connectivity with modern wireless standards.</span></li>
                      </>
                    )}
                  </ul>
                </div>
              </div>
            </div>

            {/* Specifications Box */}
            <div className="bg-slate-900 p-8 md:p-12 rounded-[40px] text-white relative overflow-hidden group">
              <h3 className="text-xl font-bold mb-8 flex items-center gap-3 relative z-10">
                <Info size={24} className="text-[#ffd33d]" />
                Technical Specs
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-12 relative z-10">
                {[
                  { label: 'System Type', value: 'Pro Series' },
                  { label: 'Interface', value: 'High Speed' },
                  { label: 'Quality', value: 'Certified' },
                  { label: 'Support', value: 'Lifetime' }
                ].map((spec, i) => (
                  <div key={i} className="flex flex-col gap-1">
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">{spec.label}</span>
                    <span className="text-[15px] font-bold text-[#ffd33d]">{spec.value}</span>
                  </div>
                ))}
              </div>
              <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-[#ffd33d] rounded-full blur-[80px] opacity-10 group-hover:opacity-20 transition-opacity" />
            </div>
          </div>
        </div>

        {/* --- RELATED PRODUCTS --- */}
        {relatedProducts.length > 0 && (
          <div className="mt-24 md:mt-32">
            <div className="flex items-center justify-between mb-12 pb-6 border-b border-slate-100">
              <h3 className="text-2xl md:text-3xl font-bold text-slate-900">Recommended Modules</h3>
              <Link to="/shop" className="text-[13px] font-bold text-[#2f5cab] hover:underline flex items-center gap-2">
                Explore All <ArrowRight size={16} />
              </Link>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-8">
              {relatedProducts.map((p) => (
                <Link to={`/product/${p.slug}`} key={p.id} className="bg-white border border-slate-50 p-6 rounded-[32px] hover:shadow-2xl hover:shadow-blue-600/5 transition-all group flex flex-col">
                  <div className="aspect-square bg-slate-50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-white transition-colors p-6">
                    <img src={getImagePath(p.images)} alt="" className="w-full h-full object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-700" />
                  </div>
                  <h4 className="text-[14px] font-bold text-slate-800 line-clamp-2 mb-3 h-10 group-hover:text-[#2f5cab] transition-colors">{p.name}</h4>
                  <p className="text-xl font-black text-slate-900 mt-auto">₹{parseFloat(p.price).toLocaleString()}</p>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Mobile Sticky Footer */}
      <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-slate-100 p-5 lg:hidden z-50 flex gap-4 shadow-[0_-10px_40px_rgba(0,0,0,0.08)]">
        <button
          onClick={handleAddToCart}
          className={`flex-1 h-14 rounded-2xl font-bold text-[13px] uppercase tracking-widest transition-all flex items-center justify-center gap-3 ${isAdded ? 'bg-emerald-600 text-white' : 'bg-slate-900 text-white'}`}
        >
          <ShoppingCart size={20} />
          {isAdded ? 'SYNCED' : 'MANIFEST'}
        </button>
        <button
          onClick={handleBuyNow}
          className="flex-1 h-14 bg-white border-2 border-slate-100 text-slate-900 rounded-2xl font-bold text-[13px] uppercase tracking-widest flex items-center justify-center gap-3 active:scale-95 shadow-sm"
        >
          <Zap size={20} className="text-[#2f5cab]" />
          BUY NOW
        </button>
      </div>
    </div>
  );
}
