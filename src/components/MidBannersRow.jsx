import React from 'react';
import { Link } from 'react-router-dom';

export default function MidBannersRow() {
  const banners = [
    { id: 1, src: '/banner/midbanner.webp', alt: 'Banner 1', link: '/shop' },

  ];

  return (
    <section className="w-full bg-[#eef1f5] py-8 md:py-12">
      <div className="max-w-[1700px] mx-auto px-4 md:px-3 lg:px-6 2xl:px-0">
        <div className="grid grid-cols-1 gap-6">
          {banners.map((banner) => (
            <Link
              key={banner.id}
              to={banner.link}
              className="relative overflow-hidden rounded-[10px] group block"
            >
              <img
                src={banner.src}
                alt={banner.alt}
                className="w-full h-full md:h-full object-cover "
              />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
