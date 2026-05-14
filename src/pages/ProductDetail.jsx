import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import SEO from '@/components/SEO';
import { useCart } from '../context/CartContext';
import Heart from 'lucide-react/dist/esm/icons/heart';
import ChevronRight from 'lucide-react/dist/esm/icons/chevron-right';
import Truck from 'lucide-react/dist/esm/icons/truck';
import ShieldCheck from 'lucide-react/dist/esm/icons/shield-check';
import Plus from 'lucide-react/dist/esm/icons/plus';
import Minus from 'lucide-react/dist/esm/icons/minus';
import ShoppingCart from 'lucide-react/dist/esm/icons/shopping-cart';
import Share2 from 'lucide-react/dist/esm/icons/share-2';
import Info from 'lucide-react/dist/esm/icons/info';
import Zap from 'lucide-react/dist/esm/icons/zap';
import RotateCcw from 'lucide-react/dist/esm/icons/rotate-ccw';
import ArrowRight from 'lucide-react/dist/esm/icons/arrow-right';
import { m } from 'framer-motion';
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
  const [mainImage, setMainImage] = useState('/logo/fabicon.avif');
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
          setMainImage(productImages.length > 0 ? productImages[0] : '/logo/fabicon.avif');

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
      if (Array.isArray(imgs) && imgs.length > 0) return `/${imgs[0].replace(/\\/g, '/')}`.replace(/\.(png|jpg|jpeg)$/i, '.avif');
    } catch { }
    return '/logo/fabicon.avif';
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white">
        <div className="w-10 h-10 border-4 border-slate-100 border-t-[#0096d6] rounded-none animate-spin"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-center px-6 bg-[#eef1f5]">
        <h2 className="text-2xl font-bold text-slate-900 mb-4 tracking-tight">Product Not Found</h2>
        <Link to="/shop" className="bg-slate-900 text-white px-8 py-3 rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-[#4254e8] transition-all shadow-lg shadow-slate-200">Return to Shop</Link>
      </div>
    );
  }

  const discount = product.old_price ? Math.round(((product.old_price - product.price) / product.old_price) * 100) : 0;

  return (
    <div className="min-h-screen bg-[#eef1f5] font-sans text-slate-900 pb-20">
      <SEO title={product.name} />

      {/* --- PAGE HEADER --- */}
      <div className="bg-white py-12 md:py-16 border-b border-slate-100 mb-12 shadow-sm">
        <div className="max-w-[1700px] mx-auto px-6">
          <nav className="flex items-center gap-2 text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-6">
            <Link to="/" className="hover:text-[#4254e8] transition-colors">Home</Link>
            <ChevronRight size={12} />
            <Link to="/shop" className="hover:text-[#4254e8] transition-colors">Shop</Link>
            <ChevronRight size={12} />
            <span className="text-[#4254e8]">Product Details</span>
          </nav>
          <div className="flex items-start gap-4">
            <div className="w-1.5 h-12 bg-[#4254e8] rounded-full shrink-0 mt-1"></div>
            <h1 className="text-3xl md:text-5xl font-bold text-slate-900 leading-tight max-w-4xl tracking-tight">
              {product.name}
            </h1>
          </div>
        </div>
      </div>

      <div className="max-w-[1700px] mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

          {/* --- LEFT: IMAGE GALLERY --- */}
          <div className="lg:col-span-6 space-y-8">
            <div className="flex flex-col md:flex-row gap-6">
              {/* Thumbnails */}
              {images.length > 1 && (
                <div className="flex md:flex-col gap-4 overflow-x-auto md:overflow-y-auto no-scrollbar max-h-[600px] order-2 md:order-1">
                  {images.map((img, idx) => (
                    <button
                      key={idx}
                      onMouseEnter={() => { setActiveImage(idx); setMainImage(img); }}
                      onClick={() => { setActiveImage(idx); setMainImage(img); }}
                      className={`w-20 h-20 border-2 p-2 bg-white shrink-0 transition-all rounded-2xl ${activeImage === idx ? 'border-[#4254e8] shadow-lg' : 'border-slate-100 hover:border-slate-300'}`}
                    >
                      <img src={img} alt="" className="w-full h-full object-contain mix-blend-multiply" />
                    </button>
                  ))}
                </div>
              )}

              {/* Main Image with Zoom */}
              <div
                className="flex-1 aspect-square bg-white border border-slate-100 rounded-[40px] shadow-xl shadow-slate-200/50 relative flex items-center justify-center p-12 group cursor-crosshair order-1 md:order-2 overflow-hidden"
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
              >
                <m.img
                  key={activeImage}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  src={mainImage}
                  alt={product.name}
                  className="max-w-full max-h-full object-contain mix-blend-multiply"
                />

                {/* Zoom Window */}
                <div
                  className="hidden lg:block absolute left-full top-0 ml-6 w-[600px] h-[600px] bg-white border border-slate-200 z-[100] pointer-events-none rounded-3xl shadow-2xl overflow-hidden"
                  style={{
                    ...zoomStyle,
                    backgroundImage: `url(${mainImage})`,
                    backgroundPosition: zoomBgPos,
                    backgroundSize: '300%',
                    backgroundRepeat: 'no-repeat'
                  }}
                />

                <button
                  onClick={() => toggleWishlist(product)}
                  className="absolute top-6 right-6 w-12 h-12 bg-white shadow-lg border border-slate-50 flex items-center justify-center text-slate-300 hover:text-red-500 transition-all z-10 rounded-2xl"
                >
                  <Heart size={24} fill={isInWishlist(product.id) ? '#ef4444' : 'none'} className={isInWishlist(product.id) ? 'text-red-500' : ''} />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-4 p-6 bg-white border border-slate-100 rounded-3xl shadow-sm">
                <div className="w-12 h-12 bg-blue-50 flex items-center justify-center text-[#4254e8] rounded-2xl">
                  <Truck size={24} />
                </div>
                <div className="flex flex-col">
                  <span className="text-[14px] font-bold text-slate-900">Free Shipping</span>
                  <span className="text-[12px] text-slate-400 font-medium">Doorstep Delivery</span>
                </div>
              </div>
              <div className="flex items-center gap-4 p-6 bg-white border border-slate-100 rounded-3xl shadow-sm">
                <div className="w-12 h-12 bg-blue-50 flex items-center justify-center text-[#4254e8] rounded-2xl">
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
            <div className="bg-white p-8 md:p-12 border border-slate-100 rounded-[40px] shadow-xl shadow-slate-200/50">
              <div className="space-y-8">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-4 bg-[#4254e8] rounded-full" />
                    <span className="text-[12px] font-bold text-slate-400 uppercase tracking-widest">
                      Quality Guaranteed
                    </span>
                  </div>
                  <button
                    onClick={handleShare}
                    className="w-10 h-10 bg-slate-50 flex items-center justify-center text-slate-400 hover:text-[#4254e8] transition-all rounded-xl border border-slate-100"
                  >
                    <Share2 size={18} />
                  </button>
                </div>

                <div className="space-y-4">
                  {discount > 0 && (
                    <span className="inline-block bg-red-500 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest">Save {discount}% Off</span>
                  )}
                  <div className="flex flex-col">
                    <div className="flex items-start">
                      <span className="text-xl font-bold mt-2 mr-1 text-[#4254e8]">$</span>
                      <span className="text-5xl font-bold text-slate-900 tracking-tight">{parseFloat(product.price).toLocaleString()}</span>
                    </div>
                    {product.old_price && (
                      <div className="text-[15px] text-slate-400 font-medium mt-1 uppercase tracking-wider ml-1">
                        Was: <span className="line-through">${parseFloat(product.old_price).toLocaleString()}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Selection and Actions */}
                <div className="pt-6 space-y-8">
                  <div className="flex items-center gap-6">
                    <span className="text-[14px] font-bold text-slate-800 uppercase tracking-widest">Quantity:</span>
                    <div className="flex items-center bg-slate-50 border border-slate-200 p-1.5 rounded-xl">
                      <button
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="w-10 h-10 flex items-center justify-center hover:bg-white rounded-lg transition-all"
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
                        className="w-10 h-10 flex items-center justify-center hover:bg-white rounded-lg transition-all"
                      >
                        <Plus size={16} strokeWidth={2.5} />
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <button
                      onClick={handleAddToCart}
                      className={`h-16 font-bold text-[14px] uppercase tracking-widest transition-all flex items-center justify-center gap-3 rounded-2xl shadow-lg ${isAdded ? 'bg-emerald-600 text-white shadow-emerald-100' : 'bg-slate-900 text-white hover:bg-[#4254e8] shadow-slate-200'}`}
                    >
                      <ShoppingCart size={20} />
                      {isAdded ? 'Added to Cart' : 'Add to Cart'}
                    </button>
                    <button
                      onClick={handleBuyNow}
                      className="h-16 bg-white border-2 border-slate-900 text-slate-900 hover:bg-slate-900 hover:text-white font-bold text-[14px] uppercase tracking-widest flex items-center justify-center gap-3 transition-all rounded-2xl shadow-md"
                    >
                      <Zap size={20} />
                      Buy it Now
                    </button>
                  </div>
                </div>

                <div className="pt-10 border-t border-slate-100">
                  <h4 className="text-[15px] font-bold text-slate-900 mb-6 uppercase tracking-widest">Overview</h4>
                  <ul className="space-y-4">
                    {product.description ? (
                      product.description.split('.').map((sentence, idx) => (
                        sentence.trim() && (
                          <li key={idx} className="flex gap-4 text-[15px] text-slate-600 leading-relaxed">
                            <div className="w-1.5 h-1.5 bg-[#4254e8] rounded-full mt-2.5 shrink-0" />
                            <span>{sentence.trim()}.</span>
                          </li>
                        )
                      ))
                    ) : (
                      <>
                        <li className="flex gap-4 text-[15px] text-slate-600 leading-relaxed"><div className="w-1.5 h-1.5 bg-[#4254e8] rounded-full mt-2.5 shrink-0" /><span>High-performance printer designed for professional excellence.</span></li>
                        <li className="flex gap-4 text-[15px] text-slate-600 leading-relaxed"><div className="w-1.5 h-1.5 bg-[#4254e8] rounded-full mt-2.5 shrink-0" /><span>Engineered for reliability and sharp, consistent output quality.</span></li>
                      </>
                    )}
                  </ul>
                </div>
              </div>
            </div>

            {/* Specifications Box */}
            <div className="bg-slate-900 p-10 text-white rounded-[32px] border-l-8 border-[#4254e8] shadow-2xl">
              <h3 className="text-xl font-bold mb-8 uppercase tracking-widest flex items-center gap-3">
                <Info size={24} className="text-[#4254e8]" />
                Features
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-8 gap-x-12">
                {[
                  { label: 'Series', value: 'Pro Series' },
                  { label: 'Speed', value: 'High Speed' },
                  { label: 'Build', value: 'Premium Quality' },
                  { label: 'Support', value: 'Expert Help' }
                ].map((spec, i) => (
                  <div key={i} className="flex flex-col gap-1">
                    <span className="text-[11px] font-bold text-slate-500 uppercase tracking-widest">{spec.label}</span>
                    <span className="text-[15px] font-bold text-white uppercase">{spec.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* --- RELATED PRODUCTS --- */}
        {relatedProducts.length > 0 && (
          <div className="mt-24 md:mt-32">
            <div className="flex items-center justify-between mb-12 pb-6 border-b border-slate-200">
              <div className="flex items-center gap-4">
                <div className="w-1.5 h-8 bg-[#4254e8] rounded-full"></div>
                <h3 className="text-2xl font-bold text-slate-900 tracking-tight uppercase">Recommended for You</h3>
              </div>
              <Link to="/shop" className="text-[13px] font-bold text-[#4254e8] hover:underline flex items-center gap-2 uppercase tracking-widest transition-all">
                See All Products <ArrowRight size={16} />
              </Link>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
              {relatedProducts.map((p) => (
                <Link to={`/product/${p.slug}`} key={p.id} className="bg-white border border-slate-100 p-5 rounded-3xl hover:shadow-2xl hover:shadow-slate-200/60 transition-all flex flex-col group border-b-4 border-b-transparent hover:border-b-[#4254e8]">
                  <div className="aspect-square bg-slate-50 rounded-2xl flex items-center justify-center mb-5 p-4 overflow-hidden border border-slate-50 transition-all group-hover:bg-white">
                    <img src={getImagePath(p.images)} alt="" className="w-full h-full object-contain mix-blend-multiply transition-transform duration-500 group-hover:scale-110" />
                  </div>
                  <h4 className="text-[13px] font-bold text-slate-800 line-clamp-2 mb-3 h-10 group-hover:text-[#4254e8] transition-colors">{p.name}</h4>
                  <p className="text-lg font-bold text-slate-900 mt-auto tracking-tight">${parseFloat(p.price).toLocaleString()}</p>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
