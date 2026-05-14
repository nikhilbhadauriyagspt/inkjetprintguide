import React from "react";
import Truck from "lucide-react/dist/esm/icons/truck";
import Handshake from "lucide-react/dist/esm/icons/handshake";
import PackageCheck from "lucide-react/dist/esm/icons/package-check";
import HandCoins from "lucide-react/dist/esm/icons/hand-coins";

export default function ServiceFeatures() {
    const features = [
        {
            icon: Truck,
            title: "Free Shipping",
            desc: "Free shipping on all US order or order above $200",
        },
        {
            icon: Handshake,
            title: "Premium Selection",
            desc: "Explore modern printers and accessories made for home and office use.",
        },
        {
            icon: PackageCheck,
            title: "30 Days Return",
            desc: "Simply return it within 30 days for an exchange",
        },
        {
            icon: HandCoins,
            title: "Payment Secure",
            desc: "Contact us 24 hours live support, 7 days in a week",
        },
    ];

    return (
        <section className="w-full bg-[#eef1f5] py-5 px-4 md:px-6">
            <div className="mx-auto grid max-w-[1700px] grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {features.map((item, index) => {
                    const Icon = item.icon;

                    return (
                        <div
                            key={index}
                            className="flex min-h-[198px] flex-col items-center justify-center rounded-[14px] border border-slate-200 bg-white px-8 py-8 text-center"
                        >
                            <Icon
                                size={42}
                                strokeWidth={1.8}
                                className="mb-4 text-[#3154ff]"
                            />

                            <h3 className="mb-3 text-[21px] font-semibold text-[#10142b]">
                                {item.title}
                            </h3>

                            <p className="max-w-[285px] text-[15px] font-normal leading-[1.45] text-slate-500">
                                {item.desc}
                            </p>
                        </div>
                    );
                })}
            </div>
        </section>
    );
}