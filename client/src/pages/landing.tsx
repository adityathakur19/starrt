import QualificationModal from "@/components/QualificationModal"
import FAQAccordion from "@/components/FAQAccordion"
import { Button } from "@/components/ui/button"
import Img from "../assets/Taibapic.png"
import p1 from "../assets/p1.png"
import p2 from "../assets/p2.png"
import p3 from "../assets/p3.png"
import p4 from "../assets/p4.png"
import TestimonialsSection from "./testimonialVideos"
import TestimonialCarousel from "./testimonialCarousel"

export default function Landing() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="glass-effect py-4 sm:py-6">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-black text-lg sm:text-xl md:text-2xl font-bold tracking-wide fade-in-up">
            Attention Coaches, Consultants & Service Providers
          </h1>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-8 sm:py-12 md:py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 items-center max-w-6xl mx-auto">
            <div className="text-center lg:text-left order-2 lg:order-1">
<h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black mb-6 sm:mb-8 leading-tight tracking-tight slide-in-left delay-200 bg-gradient-to-r from-[hsl(var(--bright-pink))] to-[hsl(var(--deep-pink))] bg-clip-text text-transparent">
  Boost Your One-On-One Sales Conversions With Psychology Backed Strategies
</h2>

              <p className="text-base sm:text-lg md:text-xl text-black/90 mb-8 sm:mb-10 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-medium slide-in-left delay-400">
                In the one-on-one clarity call, I'll share my tried-and-tested sales strategies to help you close more
                sales in a simple and fun way—no pressure, just easy conversations that turn into happy clients!
              </p>
              <QualificationModal>
                <button className="premium-button text-base sm:text-lg md:text-xl px-6 sm:px-8 md:px-12 py-4 sm:py-6 md:py-8 scale-in delay-600 w-full sm:w-auto">
                  Book Your Clarity Call Now
                </button>
              </QualificationModal>
            </div>
            <div className="text-center order-1 lg:order-2">
              <div className="premium-card w-60 sm:w-72 md:w-80 lg:w-96 h-72 sm:h-80 md:h-96 lg:h-[500px] mx-auto overflow-hidden floating-animation slide-in-right delay-300">
                <img
                  src={Img || "/placeholder.svg"}
                  alt="Professional business coach Taiba Mahmood"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="w-full bg-white py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            {/* LinkedIn Community Card */}
            <div className="bg-white rounded-xl sm:rounded-2xl shadow-xl p-4 sm:p-6 lg:p-8 text-center transform transition duration-300 hover:scale-105 hover:shadow-2xl border border-pink-100">
              <h3 className="text-2xl sm:text-3xl lg:text-5xl font-extrabold text-bright-pink mb-2 sm:mb-3">11K+</h3>
              <p className="text-gray-800 font-semibold text-sm sm:text-base lg:text-lg">LinkedIn Community</p>
            </div>

            {/* Years of Experience Card */}
            <div className="bg-white rounded-xl sm:rounded-2xl shadow-xl p-4 sm:p-6 lg:p-8 text-center transform transition duration-300 hover:scale-105 hover:shadow-2xl border border-pink-100 delay-100">
              <h3 className="text-2xl sm:text-3xl lg:text-5xl font-extrabold text-bright-pink mb-2 sm:mb-3">4+</h3>
              <p className="text-gray-800 font-semibold text-sm sm:text-base lg:text-lg">Years of Experience</p>
            </div>

            {/* Happy Clients Card */}
            <div className="bg-white rounded-xl sm:rounded-2xl shadow-xl p-4 sm:p-6 lg:p-8 text-center transform transition duration-300 hover:scale-105 hover:shadow-2xl border border-pink-100 delay-200">
              <h3 className="text-2xl sm:text-3xl lg:text-5xl font-extrabold text-bright-pink mb-2 sm:mb-3">100+</h3>
              <p className="text-gray-800 font-semibold text-sm sm:text-base lg:text-lg">Happy Clients</p>
            </div>

            {/* Members Card */}
            <div className="bg-white rounded-xl sm:rounded-2xl shadow-xl p-4 sm:p-6 lg:p-8 text-center transform transition duration-300 hover:scale-105 hover:shadow-2xl border border-pink-100 delay-300">
              <h3 className="text-2xl sm:text-3xl lg:text-5xl font-extrabold text-bright-pink mb-2 sm:mb-3">240</h3>
              <p className="text-gray-800 font-semibold text-sm sm:text-base lg:text-lg">Members</p>
            </div>
          </div>
        </div>
      </section>

      {/* Highlights Section - Mobile Optimized */}
      <section className="py-12 sm:py-16 relative bg-pink-50">
        <div className="container mx-auto px-4 relative">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-black text-center mb-12 sm:mb-16 lg:mb-20 tracking-tight fade-in-up delay-100">
            Highlights of the clarity call
          </h2>

          {/* Mobile/Tablet Layout */}
          <div className="block lg:hidden">
            <div className="text-center mb-8">
              <div className="w-48 sm:w-56 md:w-64 h-48 sm:h-56 md:h-64 rounded-full mx-auto overflow-hidden">
                <img
                  src={p1 || "/placeholder.svg"}
                  alt="Main Circle"
                  className="w-full h-full object-cover rounded-full border-4 border-white shadow-2xl"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 max-w-2xl mx-auto">
              <div className="premium-card p-4 sm:p-6 text-center shadow-lg bg-white rounded-lg">
                <h3 className="font-black text-bright-pink text-base sm:text-lg">Develop Sales Mindset</h3>
              </div>
              <div className="premium-card p-4 sm:p-6 text-center shadow-lg bg-white rounded-lg">
                <h3 className="font-black text-bright-pink text-base sm:text-lg">Understand Buyer Psychology</h3>
              </div>
              <div className="premium-card p-4 sm:p-6 text-center shadow-lg bg-white rounded-lg">
                <h3 className="font-black text-bright-pink text-base sm:text-lg">Hit Your Sales Goals Every Month</h3>
              </div>
              <div className="premium-card p-4 sm:p-6 text-center shadow-lg bg-white rounded-lg">
                <h3 className="font-black text-bright-pink text-base sm:text-lg">
                  Unlock Secrets To Closing One-On-One Sales
                </h3>
              </div>
            </div>
          </div>

          {/* Desktop Layout */}
          <div className="hidden lg:flex relative w-full h-[480px] items-center justify-center">
            <div className="w-64 md:w-72 lg:w-80 h-64 md:h-72 lg:h-80 rounded-full z-10 relative">
              <img
                src={p1 || "/placeholder.svg"}
                alt="Main Circle"
                className="w-full h-full object-cover rounded-full border-4 border-white shadow-2xl"
              />
            </div>

            {/* Desktop positioned cards */}
            <div className="absolute top-[20%] left-[20%] transform -translate-x-1/2 -translate-y-1/2">
              <div className="premium-card p-8 md:p-10 lg:p-12 text-center w-72 md:w-80 shadow-lg bg-white rounded-lg">
                <h3 className="font-black text-bright-pink text-lg md:text-xl">Develop Sales Mindset</h3>
              </div>
            </div>

            <div className="absolute top-[20%] right-[20%] transform translate-x-1/2 -translate-y-1/2">
              <div className="premium-card p-8 md:p-10 lg:p-12 text-center w-72 md:w-80 shadow-lg bg-white rounded-lg">
                <h3 className="font-black text-bright-pink text-lg md:text-xl">Understand Buyer Psychology</h3>
              </div>
            </div>

            <div className="absolute bottom-[20%] left-[20%] transform -translate-x-1/2 translate-y-1/2">
              <div className="premium-card p-8 md:p-10 lg:p-12 text-center w-72 md:w-80 shadow-lg bg-white rounded-lg">
                <h3 className="font-black text-bright-pink text-lg md:text-xl">Hit Your Sales Goals Every Month</h3>
              </div>
            </div>

            <div className="absolute bottom-[20%] right-[20%] transform translate-x-1/2 translate-y-1/2">
              <div className="premium-card p-8 md:p-10 lg:p-12 text-center w-72 md:w-80 shadow-lg bg-white rounded-lg">
                <h3 className="font-black text-bright-pink text-lg md:text-xl">
                  Unlock Secrets To Closing One-On-One Sales
                </h3>
              </div>
            </div>
          </div>

          {/* CTA Button */}
          <div className="text-center mt-8 sm:mt-12 lg:mt-16">
            <QualificationModal>
              <Button className="premium-button text-base sm:text-lg md:text-xl px-6 sm:px-8 md:px-12 py-4 sm:py-6 md:py-8 scale-in delay-600 w-full sm:w-auto">
                Book Your Clarity Call Now
              </Button>
            </QualificationModal>
          </div>
        </div>
      </section>

      {/* Pain Points Section */}
      <section className="py-16 sm:py-20 lg:py-24 bg-[#ffe4ec] relative overflow-hidden">
        <div className="absolute -top-10 -left-10 w-72 h-72 bg-white/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-pink-300/10 rounded-full blur-2xl"></div>

        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-center mb-12 sm:mb-16 lg:mb-20 text-transparent bg-clip-text bg-gradient-to-r from-rose-500 via-pink-600 to-fuchsia-600 drop-shadow-md">
            This call is for you if...
          </h2>

          <div className="grid md:grid-cols-2 gap-6 sm:gap-8 lg:gap-10 max-w-6xl mx-auto">
            {[
              {
                text: "Struggling with fear of rejection and low confidence when selling? We train you to overcome fears and limiting beliefs so that you confidently close one-on-one sales.",
              },
              {
                text: "Struggling to justify your prices to clients? We help you show your true value with confidence.",
              },
              {
                text: "Struggling to handle objections effectively? We help you turn objections into opportunities to close sales calls.",
              },
              {
                text: "Struggling with low sales conversions? We help boost your conversion rates by 10-20% in your coaching or consulting business.",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="bg-white/30 border border-white/40 backdrop-blur-lg rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-2xl transform transition-all hover:scale-105 hover:shadow-pink-200 duration-300"
              >
                <p className="text-black/90 text-base sm:text-lg font-medium leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bonuses Section */}
      <section className="py-12 sm:py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8 sm:mb-12">
            <QualificationModal>
              <Button className="premium-button text-base sm:text-lg md:text-xl px-6 sm:px-8 md:px-12 py-4 sm:py-6 md:py-8 scale-in delay-600 w-full sm:w-auto">
                Book Your Clarity Call Now
              </Button>
            </QualificationModal>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-black/80 text-center mb-12 sm:mb-16">Bonuses</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto">
            <div className="w-full">
              <img
                src={p2 || "/placeholder.svg"}
                alt="Business checklist and qualification system"
                className="w-full h-48 sm:h-56 lg:h-64 object-cover rounded-lg"
              />
            </div>

            <div className="w-full">
              <img
                src={p3 || "/placeholder.svg"}
                alt="Business checklist and qualification system"
                className="w-full h-48 sm:h-56 lg:h-64 object-cover rounded-lg"
              />
            </div>

            <div className="w-full sm:col-span-2 lg:col-span-1">
              <img
                src={p4 || "/placeholder.svg"}
                alt="Business checklist and qualification system"
                className="w-full h-48 sm:h-56 lg:h-64 object-cover rounded-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-12 sm:py-16">
        <div>
          <div className="text-center mb-8 sm:mb-12 px-4">
            <QualificationModal>
              <Button className="premium-button text-base sm:text-lg md:text-xl px-6 sm:px-8 md:px-12 py-4 sm:py-6 md:py-8 scale-in delay-600 w-full sm:w-auto">
                Book Your Clarity Call Now
              </Button>
            </QualificationModal>
          </div>

          <TestimonialCarousel />

          {/* Video Testimonials Grid */}
          <TestimonialsSection />
        </div>
      </section>

      {/* About Section */}
      <section className="py-12 sm:py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8 sm:mb-12">
            <QualificationModal>
              <Button className="premium-button text-base sm:text-lg md:text-xl px-6 sm:px-8 md:px-12 py-4 sm:py-6 md:py-8 scale-in delay-600 w-full sm:w-auto">
                Book Your Clarity Call Now
              </Button>
            </QualificationModal>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-navy text-center mb-12 sm:mb-16">About The Coach</h2>
<div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-center max-w-6xl mx-auto px-4">
  {/* Content Left on Desktop */}
  <div className="order-2 lg:order-1 text-center lg:text-left">
    <h3 className="text-2xl sm:text-3xl font-bold text-pink-700 mb-4 sm:mb-6">
      Hi, I'm Taiba Mahmood!
    </h3>
    <p className="text-navy leading-relaxed text-base sm:text-lg">
      For the past 4 years, I've helped coaches like you close more sales by using my Psychology-backed
      strategies. I believe selling is serving, and it should feel natural and fun. My mission is to make
      sales effortless by teaching simple principles of human psychology. With my strategies, you'll overcome
      limiting beliefs related to sales, and gain the step-by-step skillset to close sales calls confidently.
      Ready to boost your sales conversions? Let's make sales simple, easy and fun for you!
    </p>
  </div>

  {/* Image Right on Desktop */}
  <div className="order-1 lg:order-2 flex justify-center">
    <div className="premium-card floating-animation slide-in-right delay-300 w-56 sm:w-64 md:w-72 lg:w-80 h-72 sm:h-80 md:h-88 lg:h-96">
      <img
        src={Img || "/placeholder.svg"}
        alt="Professional business coach Taiba Mahmood portrait"
        className="w-full h-full object-cover rounded-[28px]"
      />
    </div>
  </div>
</div>






        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-12 sm:py-16">
        <div className="container mx-auto px-4 text-center">
          <div className="text-center mb-8 sm:mb-12">
            <QualificationModal>
              <Button className="premium-button text-base sm:text-lg md:text-xl px-6 sm:px-8 md:px-12 py-4 sm:py-6 md:py-8 scale-in delay-600 w-full sm:w-auto">
                Book Your Clarity Call Now
              </Button>
            </QualificationModal>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-navy mb-4 sm:mb-6">Still wondering if the call is for you?</h2>
          <h3 className="text-base lg:text-xl text-navy/80 mb-8 max-w-3xl mx-auto leading-relaxed">
            If you want to close more sales in your coaching or consulting business, mastering one-on-one sales is the
            best path forward. We've crafted comprehensive sales strategies to help you close more sales consistently
            within 90 days.
          </h3>

          <QualificationModal>
            <Button className="premium-button text-base sm:text-lg md:text-xl px-6 sm:px-8 md:px-12 py-4 sm:py-6 md:py-8 scale-in delay-600 w-full sm:w-auto">
              Book Your Clarity Call Now
            </Button>
          </QualificationModal>
<div className="mt-10 mb-10 h-54 ">
 
</div>
          <div className="max-w-2xl mx-auto">
            <blockquote className="text-xl sm:text-2xl lg:text-3xl font-italic text-navy mb-4 leading-relaxed">
              "The secret of selling is to stop selling and start helping."
            </blockquote>
            <cite className="text-navy/70 font-medium text-base sm:text-lg">- Zig Ziglar</cite>
          </div>


        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-12 sm:py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-navy text-center mb-12 sm:mb-16">FAQs</h2>
          <div className="max-w-4xl mx-auto">
            <FAQAccordion />

            <div className="text-center mt-8 sm:mt-12">
              <QualificationModal>
                <Button className="premium-button text-base sm:text-lg md:text-xl px-6 sm:px-8 md:px-12 py-4 sm:py-6 md:py-8 scale-in delay-600 w-full sm:w-auto">
                  Book Your Clarity Call Now
                </Button>
              </QualificationModal>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
