"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect,useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Roboto ,Merriweather} from "next/font/google";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["800", "800"], // choose the weights you need
});
const merriweather = Merriweather({
  subsets: ["latin"],
  weight: ["400", "700"], // regular + bold for headings
});


export default function Home() {
   const articles = [
    {
      img: "/4.1.jpeg",
      category: "CORONAVIRUS",
      title: "12 Coronavirus Myths and Facts That You Should Be Aware Of",
      author: "Dr. Diana Borgio",
    },
    {
      img: "/4.2.jpeg",
      category: "VITAMINS AND SUPPLEMENTS",
      title:
        "Eating Right to Build Immunity Against Cold and Viral Infections",
      author: "Dr. Diana Borgio",
    },
  ];
  const doctors = [
    {
      img: "/3.1.jpg",
      title: "General surgeon",
      desc: "Need to get operated? Find the right surgeon",
    },
    {
      img: "/3.2.jpg",
      title: "Orthopedist",
      desc: "For Bone and Joints issues, spinal injuries and more",
    },
    {
      img: "/3.3.jpg",
      title: "General physician",
      desc: "Find the right family doctor in your neighborhood",
    },
    {
      img: "/3.4.jpg",
      title: "Pediatrician",
      desc: "Child Specialists and Doctors for Infant",
    },
    {
      img: "/3.5.jpg",
      title: "Dentist",
      desc: "Teething troubles? Schedule a dental checkup",
    },
    {
      img: "/3.6.jpg",
      title: "Gynecologist/Obstetrician",
      desc: "Explore for women’s health, pregnancy and infertility treatments",
    },
    {
      img: "/3.7.jpg",
      title: "Dietitian/Nutrition",
      desc: "Get guidance on eating right, weight management and sports nutrition",
    },
    {
      img: "/3.8.jpg",
      title: "Physiotherapist",
      desc: "Pulled a muscle? Get it treated by a trained physiotherapist",
    },
  ];
    const testimonialsData = [
    {
      text: "Very easy to book, maintain history. Hassle free from older versions of booking appointment via telephone. Thanks Sukoon for making it simple.",
      user: "Jyothi Bhatia",
    },
    {
      text: "Very helpful. Far easier than doing same things on computer. Allows quick and easy search with speedy booking. Even maintains history of doctors visited.",
      user: "Amit Sharma",
    },
    {
      text: "Smooth experience, saves time and effort. Great way to find the right doctor and manage appointments with ease.",
      user: "Ravi Mehra",
    },
  ];

  const [testimonialIndex, setTestimonialIndex] = useState(0);
  const [direction, setDirection] = useState(1); // 1 = right, -1 = left

  // Auto scroll every 1 second
  useEffect(() => {
    const autoScroll = setInterval(() => {
      setDirection(1);
      setTestimonialIndex((prev) => (prev + 1) % testimonialsData.length);
    }, 3000);
    return () => clearInterval(autoScroll);
  }, [testimonialsData.length]);

  const prevTestimonial = () => {
    setDirection(-1);
    setTestimonialIndex((prev) =>
      prev === 0 ? testimonialsData.length - 1 : prev - 1
    );
  };

  const nextTestimonial = () => {
    setDirection(1);
    setTestimonialIndex((prev) => (prev + 1) % testimonialsData.length);
  };



  const [index, setIndex] = useState(0);

  const handleNext = () => {
    if (index < doctors.length - 4) {
      setIndex(index + 1);
    }
  };

  const handlePrev = () => {
    if (index > 0) {
      setIndex(index - 1);
    }
  };

  return (
    <div className="min-h-screen bg-white text-gray-800 font-sans">
      {/* NAVBAR */}
      <header className="border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-20">
          {/* left: logo + main links */}
          <div className="flex items-center">
            <div className="flex items-center mr-20">
              <span className={`text-3xl font-bold text-green-600 tracking-tight ${merriweather.className}`}>
                Sukoon
              </span>
              
            </div>

            <nav className="hidden md:flex gap-6 text-base font-extrabold text-gray-700">
              <Link href="#" className={roboto.className}>
                Find Doctors
              </Link>
              <Link href="#" className={roboto.className}>
                Video Consult
              </Link>
              <Link href="#" className={roboto.className}>
                Surgeries
              </Link>
            </nav>
          </div>

          {/* right: small links + login */}
          <div className="flex items-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <span className="inline-block bg-green-600 text-white text-[10px] px-2 py-[3px] rounded-full font-semibold">
                NEW
              </span>
              <Link
                href="#"
                className="flex items-center gap-1 hover:text-gray-900"
              >
                For Corporates
                <svg
                  className="w-3 h-3 text-gray-500"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.23 7.21a.75.75 0 011.06.02L10 11.17l3.71-3.94a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                    clipRule="evenodd"
                  />
                </svg>
              </Link>
            </div>
            <Link
                href="#"
                className="flex items-center gap-1 hover:text-gray-900"
              >
                For Providers
                <svg
                  className="w-3 h-3 text-gray-500"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.23 7.21a.75.75 0 011.06.02L10 11.17l3.71-3.94a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                    clipRule="evenodd"
                  />
                </svg>
              </Link>
            <Link
                href="#"
                className="flex items-center gap-1 hover:text-gray-900"
              >
                Security & help
                <svg
                  className="w-3 h-3 text-gray-500"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.23 7.21a.75.75 0 011.06.02L10 11.17l3.71-3.94a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                    clipRule="evenodd"
                  />
                </svg>
              </Link>
            <button className="border border-green-600 rounded-md px-4 py-1 text-sm hover:shadow-sm cursor-pointer">
              Login / Signup
            </button>
          </div>
        </div>
      </header>

      {/* SEARCH BAR */}
      <section className="max-w-xl mx-40 px-2 mt-8">
        <div className="flex border border-green-600 rounded-md overflow-hidden shadow-sm h-10">
          {/* location */}
          <div className="flex items-center gap-3 px-4 border-r border-green-600 bg-white w-56">
            <svg
              className="w-4 h-4 text-green-600"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
            >
              <path
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 11.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5z"
              />
              <path
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 11.5c0 6.5-9 11-9 11s-9-4.5-9-11a9 9 0 1118 0z"
              />
            </svg>
            <input
              className="w-full outline-none text-sm text-green-300 placeholder-green-600"
              placeholder="Visakhapatnam"
            />
          </div>

        
          {/* search */}
<div className="flex items-center px-4 flex-1 bg-green-600">
  <svg
    className="w-4 h-4 text-white mr-3"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
  >
    <path
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M21 21l-4.35-4.35"
    />
    <path
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M11 18a7 7 0 100-14 7 7 0 000 14z"
    />
  </svg>
  <input
    className="w-full outline-none text-sm text-white placeholder-white/80 bg-transparent"
    placeholder="Search doctors, clinics, hospitals, etc."
  />
</div>

        </div>
      </section>

      {/* CARDS */}
      <main className="max-w-3xl mx-auto px-6 mt-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 1 */}
          <article className="rounded-2xl overflow-hidden border border-green-400 shadow-xl shadow-green-800 shadow-md bg-white">
            <div className="h-48 flex items-center justify-center bg-blue-200 ">
              <Image
                src="/1.png"
                alt="Instant Video Consultation"
                width={150}
                height={200}
                className="object-contain"
              />
            </div>
            <div className="px-6 py-6">
              <h3 className={`text-lg font-semibold text-gray-900 ${merriweather.className}`}>
                Instant Video Consultation
              </h3>
              <p className="mt-2 text-gray-500 text-sm">Connect within 60 secs</p>
            </div>
          </article>

          {/* Card 2 */}
          <article className="rounded-2xl overflow-hidden border border-green-400 shadow-xl shadow-green-800 shadow-md bg-white">
            <div className="h-48 flex items-center justify-center bg-[#4DB3AD]">
              <Image
                src="/2.png"
                alt="Find Doctors Near You"
                width={180}
                height={160}
                className="object-contain"
              />
            </div>
            <div className="px-6 py-6">
              <h3 className={`text-lg font-semibold text-gray-900 ${merriweather.className}`}>
                Find Doctors Near You
              </h3>
              <p className="mt-2 text-gray-500 text-sm">
                Confirmed appointments
              </p>
            </div>
          </article>

          {/* Card 3 */}
          <article className="rounded-2xl overflow-hidden border border-green-400 shadow-xl shadow-green-800 shadow-md bg-white">
            <div className="h-48 flex items-center justify-center bg-[#EDE7FF]">
              <Image
                src="/3.png"
                alt="Surgeries"
                width={200}
                height={180}
                className="object-contain"
              />
            </div>
            <div className="px-6 py-6">
              <h3 className={`text-lg font-semibold text-gray-900 ${merriweather.className}`}>Surgeries</h3>
              <p className="mt-2 text-gray-500 text-sm">
                Safe and trusted surgery centers
              </p>
            </div>
          </article>
        </div>
      </main>

      {/* CONSULT TOP DOCTORS SECTION */}
 <section className="px-6 md:px-40 py-16">
  {/* Header Row */}
  <div className="flex flex-col md:flex-row md:items-center md:justify-between text-center md:text-left">
    <div>
      <h2 className={`text-2xl md:text-3xl font-semibold text-gray-900 ${merriweather.className}`}>
        Consult top doctors online for any health concern
      </h2>
      <p className="text-gray-600 mt-2">
        Private online consultations with verified doctors in all specialists
      </p>
    </div>

    <div className="mt-4 md:mt-0">
      <button className="border border-green-600 text-green-600 rounded-md px-6 py-2 hover:bg-green-50 transition cursor-pointer">
        View All Specialities
      </button>
    </div>
  </div>

  {/* Cards */}
  <div className="mt-10 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-10">
    {[
      { img: "/2.1.png", title: "Period doubts or Pregnancy" },
      { img: "/2.2.png", title: "Acne, pimple or skin issues" },
      { img: "/2.3.png", title: "Performance issues in bed" },
      { img: "/2.4.png", title: "Cold, cough or fever" },
      { img: "/2.5.png", title: "Child not feeling well" },
      { img: "/2.6.png", title: "Depression or anxiety" },
    ].map((item, i) => (
      <div
        key={i}
        className="flex flex-col items-center text-center w-full"
      >
        <div className="w-28 h-28 flex items-center justify-center rounded-full shadow-xl shadow-green-300 shadow-sm">
          <Image
            src={item.img}
            alt={item.title}
            width={70}
            height={70}
            className="object-contain w-22 h-22 object-cover"
          />
        </div>
        {/* text is constrained so it aligns under circle */}
        <p className="mt-4 text-sm font-medium text-gray-900 max-w-[120px]">
          {item.title}
        </p>
        <a
          href="#"
          className="mt-2 text-sm font-semibold text-green-600 hover:underline"
        >
          CONSULT NOW
        </a>
      </div>
    ))}
  </div>
</section>


       <section className="px-6 md:px-35 py-12 ">
      <h2 className={`text-2xl md:text-3xl font-semibold text-gray-900 ${merriweather.className}`}>
        Book an appointment for an in-clinic consultation
      </h2>
      <p className="text-gray-600 mt-2">
        Find experienced doctors across all specialties
      </p>

      {/* Carousel */}
      <div className="relative mt-10">
        {/* Left Button */}
        <button
          onClick={handlePrev}
          disabled={index === 0}
          className="absolute left-0 top-1/2 -translate-y-1/2 bg-white border shadow-md w-10 h-10 flex items-center justify-center rounded-full disabled:opacity-50 z-10"
        >
          <span className="text-xl">‹</span>
        </button>

        {/* Cards */}
        <div className="overflow-hidden ">
          <div
            className="flex transition-transform duration-500 ease-in-out "
            style={{ transform: `translateX(-${index * 25}%)` }}
          >
            {doctors.map((doc, i) => (
              <div key={i} className="w-1/4 flex-shrink-0 px-3 text-center  ">
                <div className="rounded-xl overflow-hidden shadow-sm bg-white">
                  <Image
                    src={doc.img}
                    alt={doc.title}
                    width={300}
                    height={200}
                    className="w-full h-48 object-cover border border-green-600"
                  />
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900">{doc.title}</h3>
                    <p className="text-sm text-gray-600 mt-1">{doc.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Button */}
        <button
          onClick={handleNext}
          disabled={index >= doctors.length - 4}
          className="absolute right-0 top-1/2 -translate-y-1/2 bg-white border shadow-md w-10 h-10 flex items-center justify-center rounded-full disabled:opacity-50 z-10"
        >
          <span className="text-xl">›</span>
        </button>
      </div>
    </section>

     <section className="px-6 md:px-80 py-12">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
        {/* Left Text Section */}
        <div>
          <h2 className={`text-2xl md:text-3xl font-semibold text-gray-900 text-center ${merriweather.className}`}>
            Read top articles from <br /> health experts
          </h2>
          <p className="text-gray-600 mt-3">
            Health articles that keep you informed about good health practices
            and achieve your goals.
          </p>
          <button className="mt-6 bg-green-600 hover:bg-sky-600 text-white font-semibold px-5 py-2 rounded">
            See all articles
          </button>
        </div>

        {/* Articles */}
        {articles.map((article, i) => (
          <div key={i} className="flex flex-col">
            <div className="rounded-md overflow-hidden border border-green-600 shadow-lg shadow-green-300">
              <Image
                src={article.img}
                alt={article.title}
                width={400}
                height={250}
                className="w-full h-48 object-cover border border-green-600 shadow-xl shadow-green-300"
              />
            </div>
            <div className="mt-3">
              <p className="text-green-600 text-xs font-semibold uppercase tracking-wide">
                {article.category}
              </p>
              <h3 className="mt-1 text-lg font-semibold text-gray-900">
                {article.title}
              </h3>
              <p className="text-gray-600 text-sm mt-1">{article.author}</p>
            </div>
          </div>
        ))}
      </div>

    
    </section>

     <section className="px-6 md:px-16 py-20 text-center relative overflow-hidden">
      <h2 className={`text-3xl md:text-4xl font-semibold text-green-600 ${merriweather.className}`}>
        What our users have to say
      </h2>

      <div className="mt-6 min-h-[200px] relative">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={testimonialIndex}
            custom={direction}
            initial={{ x: direction === 1 ? 300 : -300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: direction === 1 ? -300 : 300, opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="absolute w-full"
          >
            <p className="text-lg md:text-xl text-gray-800 max-w-3xl mx-auto">
              {testimonialsData[testimonialIndex].text}
            </p>
            <div className="mt-4 flex items-center justify-center space-x-2">
              <span className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-200 text-gray-600">
                👤
              </span>
              <span className="font-semibold text-gray-900">
                {testimonialsData[testimonialIndex].user}
              </span>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Left button */}
      <button
        onClick={prevTestimonial}
        className="absolute left-80 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-800 text-3xl"
      >
        ‹
      </button>

      {/* Right button */}
      <button
        onClick={nextTestimonial}
        className="absolute right-80 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-800 text-3xl"
      >
        ›
      </button>

      {/* Dots */}
      <div className="mt-6 flex justify-center space-x-2">
        {testimonialsData.map((_, i) => (
          <button
            key={i}
            onClick={() => {
              setDirection(i > testimonialIndex ? 1 : -1);
              setTestimonialIndex(i);
            }}
            className={`w-2 h-2 rounded-full ${
              i === testimonialIndex ? "bg-gray-600" : "bg-gray-300"
            }`}
          ></button>
        ))}
      </div>
    </section>

     <section className="bg-gray-50 py-16 px-6 md:px-16">
      <div className="max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-2 items-center gap-10 ">
        {/* Left: Doctor Image */}
        <div className="flex justify-center ">
          <Image
            src="/5.png" 
            alt="Doctor Video Consultation"
            width={400}
            height={500}
            className="rounded-lg "
            priority
          />
        </div>

        {/* Right: Text + Input + Buttons */}
        <div>
         <h2 className={`text-2xl md:text-3xl font-semibold text-gray-900 ${merriweather.className}`}>
  <span className="text-green-600">Download</span> the Sukoon app
</h2>

          <p className={`mt-4 text-gray-600 text-base md:text-lg max-w-md ${roboto.className}`}>
            Access video consultation with India’s top doctors on the Sukoon app.
            Connect with doctors online, available 24/7, from the comfort of your
            home.
          </p>

          {/* Phone Input */}
          <div className="mt-6 flex flex-col sm:flex-row items-center gap-3">
            <div className="flex border rounded-lg w-full sm:w-auto overflow-hidden">
              <span className="flex items-center px-3 bg-gray-100 text-gray-600 text-sm">
                +91
              </span>
              <input
                type="tel"
                placeholder="Enter phone number"
                className="px-3 py-2 w-full outline-none text-gray-800"
              />
            </div>
            <button className="px-3 py-1 rounded-lg bg-green-600 text-white font-medium hover:bg-sky-600 transition">
              Send SMS
            </button>
          </div>

          {/* Store Buttons */}
          <div className="mt-6 flex gap-4">
            <a href="#" target="_blank" rel="noopener noreferrer">
              <Image
                src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
                alt="Get it on Google Play"
                width={160}
                height={50}
              />
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer">
              <Image
                src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
                alt="Download on App Store"
                width={150}
                height={50}
              />
            </a>
          </div>
        </div>
      </div>
    </section>

     <footer className="bg-green-600 text-white py-12 px-6 md:px-16">
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-6 gap-8">
        {/* Sukoon Column */}
        <div>
          <h3 className="font-semibold mb-4">Sukoon</h3>
          <ul className="space-y-2 text-sm text-gray-200">
            <li><a href="#">About</a></li>
            <li><a href="#">Blog</a></li>
            <li><a href="#">Careers</a></li>
            <li><a href="#">Press</a></li>
            <li><a href="#">Contact Us</a></li>
          </ul>
        </div>

        {/* For Patients */}
        <div>
          <h3 className="font-semibold mb-4">For patients</h3>
          <ul className="space-y-2 text-sm text-gray-200">
            <li><a href="#">Search for doctors</a></li>
            <li><a href="#">Search for clinics</a></li>
            <li><a href="#">Search for hospitals</a></li>
            <li><a href="#">Sukoon Plus</a></li>
            <li><a href="#">Covid Hospital listing</a></li>
            <li><a href="#">Sukoon Care Clinics</a></li>
            <li><a href="#">Read health articles</a></li>
            <li><a href="#">Read about medicines</a></li>
            <li><a href="#">Sukoon drive</a></li>
            <li><a href="#">Health app</a></li>
          </ul>
        </div>

        {/* For Doctors + Clinics */}
        <div>
          <h3 className="font-semibold mb-4">For doctors</h3>
          <ul className="space-y-2 text-sm text-gray-200">
            <li><a href="#">Sukoon Profile</a></li>
          </ul>
          <h3 className="font-semibold mt-6 mb-4">For clinics</h3>
          <ul className="space-y-2 text-sm text-gray-200">
            <li><a href="#">Ray by Sukoon</a></li>
            <li><a href="#">Sukoon Reach</a></li>
            <li><a href="#">Ray Tab</a></li>
            <li><a href="#">Sukoon Pro</a></li>
          </ul>
        </div>

        {/* For Hospitals + Corporates */}
        <div>
          <h3 className="font-semibold mb-4">For hospitals</h3>
          <ul className="space-y-2 text-sm text-gray-200">
            <li><a href="#">Insta by Sukoon</a></li>
            <li><a href="#">Qikwell by Sukoon</a></li>
            <li><a href="#">Sukoon Profile</a></li>
            <li><a href="#">Sukoon Reach</a></li>
            <li><a href="#">Sukoon Drive</a></li>
          </ul>
          <h3 className="font-semibold mt-6 mb-4">For Corporates</h3>
          <ul className="space-y-2 text-sm text-gray-200">
            <li><a href="#">Wellness Plans</a></li>
          </ul>
        </div>

        {/* More */}
        <div>
          <h3 className="font-semibold mb-4">More</h3>
          <ul className="space-y-2 text-sm text-gray-200">
            <li><a href="#">Help</a></li>
            <li><a href="#">Developers</a></li>
            <li><a href="#">Privacy Policy</a></li>
            <li><a href="#">Terms & Conditions</a></li>
            <li><a href="#">PCS T&C</a></li>
            <li><a href="#">Healthcare Directory</a></li>
            <li><a href="#">Sukoon Health Wiki</a></li>
          </ul>
        </div>

        {/* Social */}
        <div>
          <h3 className="font-semibold mb-4">Social</h3>
          <ul className="space-y-2 text-sm text-gray-200">
            <li><a href="#">Facebook</a></li>
            <li><a href="#">Twitter</a></li>
            <li><a href="#">LinkedIn</a></li>
            <li><a href="#">YouTube</a></li>
            <li><a href="#">GitHub</a></li>
          </ul>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="mt-12 border-t border-gray-600 pt-6 text-center">
        <div className="flex justify-center items-center space-x-2 mb-2">
          <span className="w-3 h-3 rounded-full bg-green-400"></span>
          <span className="text-2xl font-bold">Sukoon</span>
        </div>
        <p className="text-sm text-gray-300">
          Copyright © 2025, Sukoon. All rights reserved.
        </p>
      </div>
    </footer>
    </div>
  );
}
