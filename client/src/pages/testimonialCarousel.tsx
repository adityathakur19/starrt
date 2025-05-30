import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import t1 from "../assets/p5.png";

export default function TestimonialCarousel() {
  const testimonials = [
    {
      img:t1,
      text: "Hi Taiba, One more sales closed today! Thank you so much. Your inputs have really helped me.",
      name: "Deepak Jaswani",
    },
    {
 img:t1,  
     text: "Thanks to you, I gained massive confidence and have consistent client calls every week!",
      name: "Aisha Mehra",
    },
    {
 img:t1,
       text: "With her help, I closed my highest ticket ever. Absolutely game-changing!",
      name: "Rohan Gupta",
    },
    {
 img:t1,
       text: "I finally feel clear and confident with my pitch. Clients are responding better than ever.",
      name: "Priya Sharma",
    },
    {
 img:t1,
       text: "Working with Taiba has made my journey so much easier. She brought in thoughtful questions and frameworks that not only provided clarity but also helped me close clients more effectively.",
      name: "Khushboo Khusnay",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    );
  };

  const { img, text, name } = testimonials[currentIndex];

  return (
    <section className="py-16 bg-pink-100 text-center">
      <h2 className="text-3xl font-black text-black mb-10">Testimonials</h2>

      <div className="max-w-6xl mx-auto relative bg-[#fbd5d5] p-10 rounded shadow-md text-black">
        <button
          className="absolute left-4 top-1/2 -translate-y-1/2 text-white"
          onClick={handlePrev}
        >
          <ChevronLeft size={32} />
        </button>

        <div className="flex flex-col items-center justify-center">
          <img
            src={img}
            alt={name}
            className="w-20 h-20 rounded object-cover mb-6"
          />
          <p className="text-lg leading-relaxed mb-6 max-w-2xl">{text}</p>
          <p className="font-bold">{name}</p>
        </div>

        <button
          className="absolute right-4 top-1/2 -translate-y-1/2 text-white"
          onClick={handleNext}
        >
          <ChevronRight size={32} />
        </button>
      </div>
    </section>
  );
}
