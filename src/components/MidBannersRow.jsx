import React from 'react';
import { Link } from 'react-router-dom';

export default function MidBannersRow() {
  const banners = [
    { id: 1, src: '/midbanner/images-1.png', alt: 'Banner 1', link: '/shop' },
    { id: 2, src: '/midbanner/images-2.png', alt: 'Banner 2', link: '/shop' },
    { id: 3, src: '/midbanner/images-3.png', alt: 'Banner 3', link: '/shop' },
  ];

  return (
    <section className="w-full bg-white py-8 md:py-12">
      <div className="max-w-[1800px] mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {banners.map((banner) => (
            <Link
              key={banner.id}
              to={banner.link}
              className="relative overflow-hidden rounded-[10px] group block"
            >
              <img
                src={banner.src}
                alt={banner.alt}
                className="w-full h-[270px] object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
