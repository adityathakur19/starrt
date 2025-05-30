import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import t1 from "../assets/t1.png";
import t2 from "../assets/t2.png";
import t3 from "../assets/t3.png";
import t4 from "../assets/t4.png";

export default function TestimonialCarousel() {
  const testimonials = [
    {
      img:t1,
      text: "Hi Taiba, One more sales closed today! Thank you so much and lots of gratitude to you. Your inputs have really helped me. I am much more confident in pitching and closing sales on a daily basis.",
      name: "Deepak Jaswani",
    },
    {
 img:t2,  
     text: "Thank you so much for your suggestions and guidance to find the right target market for me who can take their own decisions and will pay me for my services. This has definitely increased my sales and will keep on following this in the future as well. Thank you so much for ur help and this sales training.",
      name: "Vidya Chittha",
    },
    {
 img:t3,
       text: "Working with Taiba has made my journey so much easier.She brought in thoughtful questions and frameworks that not only provided clarity but also helped me close clients more effectively.I'm truly grateful for how she simplified the process and made everything so much smoother.",
      name: "Khushboo Khusnay",
    },
    {
 img:t4,
       text: "Before I started working with Taiba I felt lost trying to build my Public Speaking and Communication coaching business. My personal brand was all over the place, and I had no idea how to sell my services effectively. But after just a few sessions with Taiba, everything changed. She helped me niche down, clarify my message, and structure my narrative.I always knew that I have something valuable to offer to my clients but now, I feel confident in what I offer. If you're struggling to make your mark and grow your business, having Taiba on your side is the game-changer you need.",
      name: "Aanandika Sood",
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
