import { Play } from "lucide-react";
import { useState } from "react";

const testimonialVideos = [
  {
    title: "Here is what Aanandika Sood says about our service",
    url: "https://www.youtube.com/embed/CFBany9kzio",
    id: "CFBany9kzio",
  },
  {
    title: "Here is what Vidhya Chitta says about our service",
    url: "https://www.youtube.com/embed/6ao7foLT3qw",
    id: "6ao7foLT3qw",
  },
  {
    title: "Here is what Khushboo says about our service",
    url: "https://www.youtube.com/embed/Q1W4Se9WWYw",
    id: "Q1W4Se9WWYw",
  },
  {
    title: "Here is what Deepak says about our service",
    url: "https://www.youtube.com/embed/CFBany9kzio", // reused
    id: "CFBany9kzio",
  },
];

export default function TestimonialSection() {
  const [playingIndex, setPlayingIndex] = useState<number | null>(null);

  return (
    <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
      {testimonialVideos.map((video, index) => (
        <div
          key={index}
          className="relative bg-black rounded-2xl overflow-hidden shadow-xl"
        >
          <div className="aspect-video relative">
            {playingIndex === index ? (
              <iframe
                className="w-full h-full"
                src={`${video.url}?autoplay=1`}
                title={video.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <>
                <img
                  src={`https://img.youtube.com/vi/${video.id}/hqdefault.jpg`}
                  alt={video.title}
                  className="w-full h-full object-cover cursor-pointer"
                  onClick={() => setPlayingIndex(index)}
                />
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                  <div
                    className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center cursor-pointer hover:bg-red-700 transition-colors"
                    onClick={() => setPlayingIndex(index)}
                  >
                    <Play className="text-white text-xl ml-1" />
                  </div>
                </div>
              </>
            )}
            <div className="absolute bottom-4 left-4 text-white text-sm bg-black/70 px-2 py-1 rounded">
              {video.title}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}