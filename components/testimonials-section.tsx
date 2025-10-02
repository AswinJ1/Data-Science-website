"use client";

import { motion } from "framer-motion";

const testimonials = [
  {
    name: "Paul A.",
    title: "Founder of XYZ",
    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa nostrum labore dolor facilis.",
    img: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    name: "Cindy J.",
    title: "Founder of XYZ",
    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa nostrum labore dolor facilis.",
    img: "https://randomuser.me/api/portraits/women/65.jpg",
  },
  {
    name: "Alex F.",
    title: "Founder of XYZ",
    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa nostrum labore dolor facilis.",
    img: "https://randomuser.me/api/portraits/men/45.jpg",
  },
  {
    name: "Claude O.",
    title: "Founder of XYZ",
    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa nostrum labore dolor facilis.",
    img: "https://randomuser.me/api/portraits/men/12.jpg",
  },
  {
    name: "Ben S.",
    title: "Founder of XYZ",
    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa nostrum labore dolor facilis.",
    img: "https://randomuser.me/api/portraits/men/78.jpg",
  },
];

function TestimonialsMarquee() {
  return (
    <section className="w-full py-16 bg-white">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl font-sm text-gray-900">Testimonials</h2>
        <p className="mt-2 text-gray-500">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus
          consequatur reprehenderit.
        </p>
      </div>

      {/* Row 1 → Left */}
      <div className="relative mt-12 overflow-hidden">
        <motion.div
          className="flex gap-6"
          animate={{ x: ["0%", "-100%"] }}
          transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
        >
          {[...testimonials, ...testimonials].map((t, i) => (
            <div
              key={`row1-${i}`}
              className="flex-shrink-0 w-80 border border-blue-500 rounded-2xl p-6 bg-white shadow-sm text-left"
            >
              <div className="flex items-center gap-4">
                <img
                  src={t.img}
                  alt={t.name}
                  className="w-14 h-14 rounded-full object-cover border border-blue-400"
                />
                <div>
                  <h3 className="font-semibold text-gray-900">{t.name}</h3>
                  <p className="text-sm text-blue-600">{t.title}</p>
                </div>
              </div>
              <p className="mt-4 text-gray-600 text-sm leading-relaxed">
                {t.text}
              </p>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Row 2 → Right */}
      <div className="relative mt-8 overflow-hidden">
        <motion.div
          className="flex gap-6"
          animate={{ x: ["-100%", "0%"] }}
          transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
        >
          {[...testimonials, ...testimonials].map((t, i) => (
            <div
              key={`row2-${i}`}
              className="flex-shrink-0 w-80 border border-blue-500 rounded-2xl p-6 bg-white shadow-sm text-left"
            >
              <div className="flex items-center gap-4">
                <img
                  src={t.img}
                  alt={t.name}
                  className="w-14 h-14 rounded-full object-cover border border-blue-400"
                />
                <div>
                  <h3 className="font-semibold text-gray-900">{t.name}</h3>
                  <p className="text-sm text-blue-600">{t.title}</p>
                </div>
              </div>
              <p className="mt-4 text-gray-600 text-sm leading-relaxed">
                {t.text}
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export default TestimonialsMarquee;
