// src/components/HeroSlider.jsx
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";


const slides = [
  {
    id: 1,
    title: "Discover Stunning Artworks from Emerging Artists",
    subtitle:
      "Explore a world of creativity — from digital illustrations to traditional paintings. Every piece tells a story.",
    image:
      "https://i.ibb.co/jHcNns6/art-gallery-exhibit-modern-paintings.jpg",
    alt: "Art gallery with modern paintings on wall",
  },
  {
    id: 2,
    title: "Connect and Collaborate with Creative Minds",
    subtitle:
      "Join a vibrant community of artists and art lovers. Share feedback, collaborate on projects, and grow together.",
    image:
      "https://i.ibb.co/nbXtVWr/artists-collaboration-studio-creative-work.jpg",
    alt: "Group of artists collaborating in a studio",
  },
  {
    id: 3,
    title: "Curate Your Personal Gallery of Favorites",
    subtitle:
      "Save the artworks that inspire you. Build your own virtual gallery and express your unique artistic taste.",
    image:
      "https://i.ibb.co/ZJQ0c7M/abstract-art-colorful-wall-display.jpg",
    alt: "Colorful abstract paintings displayed in an art space",
  },
];

export default function Banner() {
  return (
    <section aria-label="Hero slider" className="relative">
      <Swiper
        modules={[Autoplay, Pagination, Navigation, EffectFade]}
        spaceBetween={0}
        slidesPerView={1}
        loop={true}
        effect="fade"
        autoplay={{
          delay: 4500,
          disableOnInteraction: true,
          pauseOnMouseEnter: true
        }}
        pagination={{ clickable: true }}
        navigation={true}
        a11y={{ enabled: true }}
        style={{ height: "min(70vh, 560px)" }}
      >
        {slides.map((s) => (
          <SwiperSlide key={s.id}>
            {/* Background image */}
            <div
              className="w-full h-full bg-center bg-cover flex items-center justify-center"
              style={{
                backgroundImage: `url(${s.image})`,
              
                minHeight: "380px"
              }}
              role="img"
              aria-label={s.alt}
            >
              {/* Dark overlay to improve text contrast */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/25 to-black/40"></div>

              {/* Content container */}
              <div className="relative z-10 max-w-4xl text-center px-6 py-12">
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-white drop-shadow-lg leading-tight">
                  {s.title}
                </h1>
                <p className="mt-4 text-sm sm:text-base text-gray-100/90 max-w-2xl mx-auto">
                  {s.subtitle}
                </p>

                {/* CTA buttons */}
                {/* <div className="mt-6 flex items-center justify-center gap-3">
                  <a
                    href="/signup"
                    className="inline-block rounded-md bg-indigo-600 px-5 py-2 text-sm sm:text-base font-medium text-white shadow hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                  >
                    Get Started
                  </a>
                  <a
                    href="/#how-it-works"
                    className="inline-block rounded-md border border-white/30 px-4 py-2 text-sm sm:text-base text-white hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/30"
                  >
                    How it works
                  </a>
                </div> */}
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}