import { Link } from "react-router-dom";

// Import local assets
import mid1 from "@/assets/middle-imges/1.png";
import mid2 from "@/assets/middle-imges/2.png";
import mid3 from "@/assets/middle-imges/3.png";

export default function PromotionGrid() {
  const promotions = [
    { id: 1, image: mid1, link: "/shop" },
    { id: 2, image: mid2, link: "/printers" },
    { id: 3, image: mid3, link: "/accessories" },
  ];

  return (
    <section className="px-6 md:px-10 lg:px-12 py-12 bg-white">
      <div className="max-w-[1920px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {promotions.map((promo) => (
            <div
              key={promo.id}
              className="relative group overflow-hidden rounded-[2rem] border border-gray-100 shadow-sm transition-all"
            >
              <Link to={promo.link}>
                <img 
                  src={promo.image} 
                  alt={`Promotion ${promo.id}`} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-500" />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
