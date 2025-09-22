"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect,useState ,useRef} from "react";
import { motion, AnimatePresence , Variants,useInView} from "framer-motion";
import { Roboto , Merriweather} from "next/font/google";
import { div, img, li, main } from "framer-motion/client";

import GooeyNav from '../components/GooeyNav';
import { cursorTo } from "readline";


const steps = [
  {
    id: 1,
    title: "Pregnancy Care",
    description:
      "Diet recommendations, physiotherapy exercises, and lactation planning",
    svg: "/g1.gif",
    position: "left",
  },
  {
    id: 2,
    title: "Newborn Care and Immunization",
    description:
      "We provide guidance on newborn care practices, immunization schedules, and health check-ups.",
    svg: "/g2.gif",
    position: "right",
  },
  {
    id: 3,
    title: "Infant Care and Nutrition",
    description: (
      <>
        <strong>Nutrition Guidance:</strong> We offer personalized nutrition plans for your infant's growth and development.
        <br />
        <strong>Feeding Practices:</strong> Our experts provide advice on breastfeeding, formula feeding, and introducing solids.
      </>
    ),
    svg: "/g3.gif",
    position: "left",
  },
  {
    id: 4,
    title: "Toddler Care and Early Learning",
    description: (
      <>
        <strong>Developmental Milestones:</strong> We provide guidance on tracking and supporting your toddler's developmental milestones.
        <br />
        <strong>Learning Activities:</strong> Our experts suggest age-appropriate learning activities to stimulate your child's cognitive development.
        <br />
        <strong>Behavioral Guidance:</strong> We offer strategies for managing common toddler behaviors and promoting positive habits.
      </>
    ),
    svg: "/g4.gif",
    position: "right",
  },
];




const services = [
  { icon: "💬", title: "Instant Q&A" },
  { icon: "👥", title: "Live Community" },
  { icon: "✨", title: "Expert Consultation" },
  { icon: "💡", title: "Daily Tips" },
  
];




const cardVariants: Variants = {
   hiddenLeft: { opacity: 1, y: -100 },
  hiddenBottom: { opacity: 1, y: -100 },
  hiddenRight: { opacity: 1, y: -100 },
  visible: {
    opacity: 1,
    x: 0,
    y: 0,
    transition: { type: "spring", stiffness: 120, damping: 14, duration: 0.1 },
}
};



const roboto = Roboto({
  subsets: ["latin"],
  weight: ["800", "800"], // choose the weights you need
});
const merriweather = Merriweather({
  subsets: ["latin"],
  weight: ["400", "700"], // regular + bold for headings
});


export default function Home() {
  const [active, setActive] = useState(0);
const [menuOpen, setMenuOpen] = useState(false);
const [isCollapsed, setIsCollapsed] = useState(false);

const containerRef = useRef<HTMLDivElement | null>(null);
  const lineRef = useRef<HTMLDivElement | null>(null);
  const [lineHeight, setLineHeight] = useState(0);
  const [activeDots, setActiveDots] = useState<number[]>([]);

  // Scroll handler for line and active dots
  useEffect(() => {
  const handleScroll = () => {
    const container = containerRef.current;
    const line = lineRef.current;
    if (!container || !line) return;

    const scrollTop = window.scrollY;
    const windowHeight = window.innerHeight;
    const containerTop = container.offsetTop;
    const containerHeight = container.offsetHeight;
    const totalLineHeight = containerHeight - 350;

    // Calculate line height
    const rawProgress = (scrollTop + windowHeight - containerTop) / containerHeight;
    const progress = Math.min(Math.max(rawProgress, 0), 1);
    const lineCurrentHeight = progress * totalLineHeight;
    setLineHeight(lineCurrentHeight);

    // Activate dots exactly when line touches them
    const dotElements = container.querySelectorAll<HTMLElement>(".timeline-dot div");
    const active: number[] = [];
    dotElements.forEach((dot, idx) => {
      // dot position relative to container top
      const dotOffset = dot.offsetTop + dot.offsetHeight / 2;
      if (lineCurrentHeight >= dotOffset) {
        active.push(idx);
      }
    });
    setActiveDots(active);
  };

  window.addEventListener("scroll", handleScroll);
  handleScroll(); // trigger initially
  return () => window.removeEventListener("scroll", handleScroll);
}, []);



  // Intersection Observer for mobile reveal animation
  useEffect(() => {
    const elements = document.querySelectorAll<HTMLElement>(".mobile-reveal");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, idx) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.classList.add("visible");
            }, idx * 150);
          }
        });
      },
      { threshold: 0.2 }
    );

    elements.forEach((el) => observer.observe(el));
    return () => elements.forEach((el) => observer.unobserve(el));
  }, []);

  // Mobile reveal CSS (TS-safe cleanup)
  useEffect(() => {
    const style = document.createElement("style");
    style.innerHTML = `
      @media (max-width: 767px) {
        .mobile-reveal {
          opacity: 0;
          transform: translateY(60px);
          transition: opacity 0.8s ease, transform 0.8s ease;
        }
        .mobile-reveal.visible {
          opacity: 1;
          transform: translateY(0);
        }
      }
    `;
    document.head.appendChild(style);

    return () => {
      // Explicitly return void for TS
      document.head.removeChild(style);
      return undefined;
    };
  }, []);

  
    <div ref={containerRef} className="relative">
      <div
        ref={lineRef}
        className="absolute left-1/2 w-1 bg-green-600"
        style={{ height: `${lineHeight}px` }}
      />
      {/* Example dots */}
      {Array.from({ length: 5 }).map((_, idx) => (
        <div
          key={idx}
          className={`timeline-dot w-6 h-6 rounded-full absolute left-1/2 -translate-x-1/2 bg-gray-300 ${
            activeDots.includes(idx) ? "bg-green-600" : ""
          }`}
          style={{ top: `${idx * 150}px` }}
        />
      ))}

      {/* Example mobile reveal items */}
      <div className="mobile-reveal mt-16 p-4 bg-white rounded shadow">Item 1</div>
      <div className="mobile-reveal mt-16 p-4 bg-white rounded shadow">Item 2</div>
      <div className="mobile-reveal mt-16 p-4 bg-white rounded shadow">Item 3</div>
    </div>



useEffect(() => {
  const handleScroll = () => {
    if (window.scrollY > 150) {
      setIsCollapsed(true);
    } else {
      setIsCollapsed(false);
    }
  };

  window.addEventListener("scroll", handleScroll);
  return () => window.removeEventListener("scroll", handleScroll);
}, []);

// Autoplay carousel
useEffect(() => {
  const timer = setInterval(() => {
    setActive((prev) => (prev + 1) % services.length);
  }, 3000);
  return () => clearInterval(timer);
}, []);





 const ref = useRef(null);
  const inView = useInView(ref, { once: false, margin: "-100px" }); 

  

  const headingRef = useRef(null);

  const paraRef = useRef(null);
  const paraInView = useInView(paraRef, { once: false, margin: "-100px" });

 const carouselRef = useRef(null);
  const carouselInView = useInView(carouselRef, { once: false, margin: "-100px" });


const testimonials = [
    [
      {
        text: "This app has completely changed how I manage my health! Booking appointments with consultants is so simple, and I get reminders before every consultation. I also love the health tips and daily trackers — it keeps me motivated to stay healthy.",
        author: "Priyanka Sharma",
        title: "User",
      },
      {
        text: "Excellent app! I can consult with healthcare consultants online without waiting in long queues, and the video calls are smooth. The prescriptions are easy to download, and I feel confident knowing all my health records are securely stored in one place.",
        author: "Ananya Verma",
        title: "User",
      },
    ],
    [
      {
        text: "Very user-friendly and reliable. I especially appreciate the symptom checker — it gives me guidance before I even see a consultant. The app also tracks my medications and sends reminders so I never miss a dose. Highly recommended!",
        author: "Rahul.s",
        title: "User",
      },
      {
        text: "I love the clean design and simple navigation. Scheduling appointments, checking test results, and chatting with consultants is seamless. It really saves time and reduces stress compared to traditional clinics.",
        author: "Vikram.k",
        title: "User",
      },
    ],
    [
      {
        text: "Customer support is amazing! I had a small issue with uploading my health documents, and they resolved it immediately. The app also gives me personalized health insights, which is super helpful for managing my lifestyle.",
        author: "Sneha Reddy",
        title: "User",
      },
      {
        text: "This healthcare app is a game-changer. The AI-based reminders for medicines and regular checkups are spot on. I also like how it keeps all my medical history organized — I feel more in control of my health than ever before.",
        author: "Vijay Kumar",
        title: "User",
      },
    ],
  ]








   const articles = [
    {
      img: "/4.1.jpeg",
      category: "CORONAVIRUS",
      title: "How to Boost Your Child's Immunity During the Pandemic",
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
      img: "/3.1.webp",
      title: "Dietitian",
      desc: "For Nutrition, Weight Loss",
    },
    {
      img: "/3.2.webp",
      title: "Nutritionist",
      desc: "Get Expert Advice on Diet",
    },
    {
      img: "/3.3.jpeg",
      title: "Physiotherapist",
      desc: "Healthy Movement",
    },
    {
      img: "/3.4.jpeg",
      title: "Sleep Specialist",
      desc: "Restful Nights, Energized Days",
    },
    {
      img: "/3.5.jpg",
      title: "Child psychologist",
      desc: "Nurturing Young Minds",
    },
 
  ];
    const testimonialsData = [
    {
      text: "Very easy to book, maintain history. Hassle free from older versions of booking appointment via telephone. Thanks Sukoon for making it simple.",
      user: "Jyothi Bhatia",
    },
    {
      text: "Very helpful. Far easier than doing same things on computer. Allows quick and easy search with speedy booking. Even maintains history of Consultants visited.",
      user: "Amit Sharma",
    },
    {
      text: "Smooth experience, saves time and effort. Great way to find the right Consultant and manage appointments with ease.",
      user: "Ravi Mehra",
    },
  ];

const items = [
  { label: "Home", href: "#" },
  { label: "About", href: "#" },
  { label: "Community", href: "#" },
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

 <div className="min-h-screen bg-white text-gray-800 font-sans bg-[#E8F5E9]">
<div className="relative bg-green-200 overflow-hidden pb-50">


 <div className="absolute inset-0 bg-gradient-to-br from-green-50 via-green-100 to-green-200" />
      <div className="absolute -top-40 -left-40 w-[400px] h-[400px] rounded-full bg-green-300/30 blur-3xl" />
      <div className="absolute bottom-0 right-0 w-[300px] h-[300px] rounded-full bg-emerald-400/30 blur-3xl" />


  

      {/* NAVBAR */}
     <header className="border-b border-green-600">
  <div className="fixed top-4 left-0 right-0 z-50 flex justify-between items-center px-4 md:px-5 py-4 border border-white/10 rounded-2xl mx-4 backdrop-blur-sm bg-white/5">
    {/* Left: Logo + Nav (desktop only) */}
    <div className="flex items-center">
      <span className={`text-3xl font-bold text-green-700 tracking-tight ${merriweather.className}`}>
        Sukoon
      </span>

      <div className="text-black ml-10 hidden md:block">
  <GooeyNav
    items={items}
    particleCount={2}             // moderate number
    particleDistances={[10, 5]}    // small spread
    particleR={10}                 // small radius
    initialActiveIndex={0}
    animationTime={600}
    timeVariance={10}             // small variance
    colors={['green', 'green', 'green']} // green spark
  />
</div>

    </div>

    {/* Right: Small Links + Login (desktop only) */}
    <div className="hidden md:flex items-center gap-6 text-sm">
      <Link href="#" className="hover:text-gray-900">Instant Chat</Link>
      <Link href="#" className="hover:text-gray-900">Stages</Link>
      <Link href="#" className="hover:text-gray-900">Security & Help</Link>
      <button className="border border-green-600 rounded-md px-4 py-1 text-sm hover:shadow-sm cursor-pointer">
        Login / Signup
      </button>
    </div>

    {/* Mobile Toggle */}
    <button
      className="md:hidden flex flex-col gap-1"
      onClick={() => setMenuOpen(!menuOpen)}
    >
      <span className="w-6 h-0.5 bg-green-700"></span>
      <span className="w-6 h-0.5 bg-green-700"></span>
      <span className="w-6 h-0.5 bg-green-700"></span>
    </button>
  </div>

  {/* Mobile Menu */}
  <AnimatePresence>
    {menuOpen && (
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="md:hidden fixed top-20 left-0 right-0 bg-white shadow-lg flex flex-col items-center py-6 gap-4 z-40"
      >
        <Link href="#" className="text-lg">AboutUs</Link>
        <Link href="#" className="text-lg">Community</Link>
        <Link href="#" className="text-lg">Tips</Link>
        <Link href="#" className="text-lg">Instant Chat</Link>
        <Link href="#" className="text-lg">Stages</Link>
        <Link href="#" className="text-lg">Security & Help</Link>
        <button className="mt-2 border border-green-600 rounded-md px-4 py-2 text-sm">
          Login / Signup
        </button>
      </motion.nav>
    )}
  </AnimatePresence>
</header>
      {/* SEARCH BAR */}
  {/* Desktop version (unchanged) */}
<section className="max-w-xl mx-40 px-2 mt-25 hidden sm:block">
  <motion.div
    animate={{ x: [0, -5, 5, -5, 5, 0] }}
    transition={{ duration: 0.8, repeat: Infinity, ease: "easeInOut" }}
    whileHover={{ x: 0 }}
    whileTap={{ x: 0 }}
    className="flex border border-green-600 rounded-md overflow-hidden shadow-sm h-10"
  >
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
        placeholder="Dubai"
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
        placeholder="Search related consultants etc."
      />
    </div>
  </motion.div>
</section>

{/* Mobile version */}
<section className="sm:hidden px-4 mt-25">
  <motion.div
    animate={{ x: [0, -3, 3, -3, 3, 0] }}
    transition={{ duration: 0.8, repeat: Infinity, ease: "easeInOut" }}
    whileHover={{ x: 0 }}
    whileTap={{ x: 0 }}
    className="flex flex-col gap-2 border border-green-600 rounded-md overflow-hidden shadow-sm"
  >
    {/* location */}
    <div className="flex items-center gap-2 px-3 border-b border-green-600 bg-white h-10">
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
        className="w-full outline-none text-sm text-green-700 placeholder-green-600"
        placeholder="Dubai"
      />
    </div>

    {/* search */}
    <div className="flex items-center px-3 bg-green-600 h-10">
      <svg
        className="w-4 h-4 text-white mr-2"
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
        placeholder="Search related consultants etc."
      />
    </div>
  </motion.div>
</section>





      {/* CARDS */}
       <main ref={ref} className="max-w-3xl mx-auto px-6 mt-12">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Card 1 */}
<motion.article
  initial="hiddenBottom"
  animate={inView ? { opacity: 1, y: 0, rotateY: 360 } : { opacity: 0, y: 100, rotateY: 0 }}
  transition={{ type: "spring", stiffness: 80, damping: 20, duration: 3 }}
  whileHover={{ rotateY: 10, rotateX: -5, scale: 1.05 }}
  style={{ perspective: "1000px" }}
  className="rounded-2xl overflow-hidden border border-green-400 shadow-xl shadow-green-800 bg-white"
>
  <div className="h-48 flex items-center justify-center bg-[#AFCFED] ">
    <Image src="/1.01.webp" alt="Card" width={250} height={200} className="object-fit" />
  </div>
  <div className="px-6 py-6">
    <h3 className={`text-lg font-semibold text-gray-900 ${merriweather.className}`}>Top Dietition</h3>
    <p className="mt-2 text-gray-500 text-sm">Expert in nutrition and diet planning</p>
  </div>
</motion.article>



        {/* Card 2 */}
       <motion.article
  initial="hiddenBottom"
  animate={inView ? { opacity: 1, y: 0, rotateY: 360 } : { opacity: 0, y: 100, rotateY: 0 }}
  transition={{ type: "spring", stiffness: 80, damping: 20, duration: 3 }}
  whileHover={{ rotateY: 10, rotateX: -5, scale: 1.05 }}
  style={{ perspective: "1000px" }}
  className="rounded-2xl overflow-hidden border border-green-400 shadow-xl shadow-green-800 bg-white"
>
          <div className="h-48 flex items-center justify-center bg-[#4DB3AE]">
            <Image src="/1.02.jpg" alt="Find Doctors Near You" width={150} height={100} />
          </div>
          <div className="px-6 py-6">
            <h3 className={`text-lg font-semibold text-gray-900 ${merriweather.className}`}>
              Nutritionist Connect
            </h3>
            <p className="mt-2 text-gray-500 text-sm">Expert in nutrition and diet planning</p>
          </div>
        </motion.article>

        {/* Card 3 */}
        <motion.article
  initial="hiddenBottom"
  animate={inView ? { opacity: 1, y: 0, rotateY: 360 } : { opacity: 0, y: 100, rotateY: 0 }}
  transition={{ type: "spring", stiffness: 80, damping: 20, duration: 3 }}
  whileHover={{ rotateY: 10, rotateX: -5, scale: 1.05 }}
  style={{ perspective: "1000px" }}
  className="rounded-2xl overflow-hidden border border-green-400 shadow-xl shadow-green-800 bg-white"
>
          <div className="h-48 flex items-center justify-center bg-[#EDE7FF]">
            <Image src="/1.03.jpg" alt="Surgeries" width={250} height={200} />
          </div>
          <div className="px-6 py-6">
            <h3 className={`text-lg font-semibold text-gray-900 ${merriweather.className}`}>
              Physiotherapist
            </h3>
            <p className="mt-2 text-gray-500 text-sm">Healthy Movement</p>
          </div>
        </motion.article>

      </div>
    </main>
      <svg
    className="absolute inset-x-0 bottom-0 w-full h-70"
    viewBox="0 0 1440 320"
    preserveAspectRatio="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    
    <path
      fill="black"
      d="M0 64 C360 192 1080 192 1440 64 L1440 320 L0 320 Z"
    />
  </svg>
    </div>






    
      
      {/* Background */}
     
<section className="relative py-24 overflow-hidden bg-black">
  {/* Title */}
 <h2 className="text-center text-3xl md:text-4xl font-light mb-16 text-white/90">
        Our Services
      </h2>

  {/* Desktop: Keep your existing 3D CardSwap */}
  {/* Desktop only */}
  <div>
      {/* ✅ Desktop 3D Carousel */}
      <div className="hidden md:flex relative justify-center items-center h-[400px] overflow-x-hidden ">
        {services.map((service, i) => {
          const offset = i - active;
          const scale = offset === 0 ? 1 : 0.8;
          const opacity = offset === 0 ? 1 : 0.4;
          const x = `${offset * 250}px`; // wider spacing for desktop
          const zIndex = offset === 0 ? 10 : 0;

          return (
            <motion.div
              key={i}
              className="absolute w-72 h-80 rounded-2xl flex flex-col items-center justify-center
                         bg-black/20 backdrop-blur-xl border border-white/30 shadow-[0_8px_32px_rgba(0,0,0,0.25)]
                         text-white cursor-pointer border border-green-400 shadow-xl shadow-green-800"
              style={{ zIndex }}
              animate={{ x, scale, opacity }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              onClick={() => setActive(i)}
            >
              <span className="text-7xl mb-4">{service.icon}</span>
              <h3 className="text-xl font-semibold text-center">{service.title}</h3>
            </motion.div>
          );
        })}
      </div>

      {/* ✅ Mobile 3D Carousel */}
      <div className="md:hidden relative flex justify-center items-center h-[300px] overflow-x-hidden">
        {services.map((service, i) => {
          const offset = i - active;
          const scale = offset === 0 ? 1 : 0.75;
          const opacity = offset === 0 ? 1 : 0.3;
          const x = `${offset * 180}px`;
          const zIndex = offset === 0 ? 10 : 0;

          return (
            <motion.div
              key={i}
              className="absolute w-60 h-72 rounded-2xl flex flex-col items-center justify-center
                         bg-white/20 backdrop-blur-xl border border-white/30 shadow-[0_8px_32px_rgba(0,0,0,0.2)]
                         text-gray-900 cursor-pointer"
              style={{ zIndex }}
              animate={{ x, scale, opacity }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
              onClick={() => setActive(i)}
            >
              <span className="text-6xl mb-3">{service.icon}</span>
              <h3 className="text-lg font-semibold text-center">{service.title}</h3>
            </motion.div>
          );
        })}
      </div>

      {/* ✅ Dots (shared for both) */}
      <div className="flex justify-center mt-12 gap-3">
        {services.map((_, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className={`w-4 h-4 rounded-full transition-all ${
              i === active ? "bg-green-600 scale-125" : "bg-green-300"
            }`}
          />
        ))}
      </div>
    </div>
</section>

    


      {/* CONSULT TOP DOCTORS SECTION */}
  <section
      className="relative w-full bg-black text-white py-20 px-4 md:px-20 overflow-hidden font-sans "
      ref={containerRef}
    >
      <h2 className="text-center text-3xl md:text-4xl font-light mb-16 text-white/90">
        Choose Your Journey
      </h2>

      <div className="relative flex justify-center bg-black">
        {/* Scroll Line */}
        <div
          ref={lineRef}
          className="hidden md:block absolute top-0 left-1/2 transform -translate-x-1/2 w-1 bg-gradient-to-b from-green-600 via-green-500 to-green-400 z-0"
          style={{ height: `${lineHeight}px` }}
        ></div>

        <div className="relative z-10 w-full max-w-5xl">
          {steps.map((step, index) => (
            <div
              key={step.id}
              className="mb-24 relative flex flex-col md:flex-row items-center md:justify-between"
            >
              {/* Dot */}
              <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 z-20 timeline-dot">
                <div
                  className={`w-4 h-4 rounded-full transition-all duration-300 ${
                    activeDots.includes(index) ? "bg-red-600 shadow-lg" : "bg-gray-600"
                  }`}
                ></div>
              </div>

              {/* Step Label */}
              <div
                className={`hidden md:block absolute top-0 ${
                  step.position === "left"
                    ? "left-[calc(50%+2.5rem)]"
                    : "right-[calc(50%+2.5rem)]"
                } inline-block text-white text-sm font-semibold 
px-4 py-2 md:px-6 md:py-3 rounded-xl 
shadow-md bg-gradient-to-r from-green-400 
cursor-pointer>
              `}
              >
                Stage {index + 1}
              </div>

              {/* Content */}
              <div
                className={`mobile-reveal md:w-[48%] p-6 rounded-2xl bg-[#111] border border-white/10 shadow-md cursor-pointer ${
                  step.position === "left" ? "md:mr-auto" : "md:ml-auto"
                }`}
              >
                {step.svg && (
                  <img
                    src={step.svg}
                    alt={`Step ${index + 1}`}
                    className="w-12 md:w-15 h-auto rounded-lg mb-2 ml-0"
                    style={{ marginLeft: "-0.75rem" }}
                  />
                )}

                <h3 className="text-lg md:text-xl font-semibold mb-2 tracking-tight text-green-400">
                  {step.title}
                </h3>
                <p className="text-sm md:text-base text-gray-300 leading-relaxed font-light">
                  {step.description}
                </p>
              </div>
            </div>
          ))}

          {/* Final Dot */}
          <div className="hidden md:flex justify-center items-center mb-2 timeline-dot">
            <div
              className={`w-4 h-4 rounded-full transition-all duration-300 ${
                activeDots.includes(steps.length) ? "bg-red-500 shadow-lg" : "bg-gray-600"
              }`}
            ></div>
          </div>

          {/* Final Label */}
          <div className="flex justify-center mb-6">
            <button className="inline-block bg-white text-white text-sm font-medium px-6 py-3 rounded-xl shadow-mdhidden md:inline-block bg-gradient-to-r from-purple-600 to-indigo-700 px-4 py-2 rounded-xl text-sm font-semibold shadow-md cursor-pointer">
              Stage 5
            </button>
          </div>

          {/* Launch Campaign */}
          <div className="flex justify-center">
            <div className="mobile-reveal bg-gradient-to-br from-[#1a011f] via-black to-black border border-white/10 p-10 rounded-2xl text-center max-w-2xl">
             
              <h3 className="text-2xl font-bold text-green-400 mb-3 tracking-tight">
                Early Childhood
              </h3>
              <p className="text-gray-400 mb-6 max-w-xl mx-auto font-light">
               Covers ages 3 to 6 years, preparing for school and social integration. Focuses on nutrition, emotional well-being, and learning milestones. Helps children develop independence and confidence.
              </p>
            
            </div>
          </div>
        </div>
      </div>
    </section>









      <section className="px-6 md:px-35 py-12 bg-black">
  {/* Heading */}
  <h1 className="text-center text-3xl md:text-4xl font-light mb-4 text-white/90">
        Schedule a Personalized Consultation with Trusted Experts
      </h1>

  {/* Paragraph */}
 <p className="text-center text-white max-w-2xl mx-auto">
    Connect with Verified Specialists in Pregnancy, Childcare & Family Wellness
  </p>

  {/* Carousel Container */}
  <div
  ref={carouselRef}
  style={{ perspective: "1000px" }}
  className="relative mt-10"
>
  {/* Desktop carousel: visible on md and above */}
  <div className="hidden md:block">
    {/* Left Button */}
    <button
      onClick={handlePrev}
      disabled={index === 0}
      className="absolute left-0 top-1/2 -translate-y-1/2 bg-white border shadow-md w-10 h-10 flex items-center justify-center rounded-full disabled:opacity-50 z-10"
    >
      <span className="text-xl">‹</span>
    </button>

    <div className="overflow-hidden">
      <div
        className="flex transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${index * 25}%)` }}
      >
        {doctors.map((doc, i) => (
          <div key={i} className="w-1/4 flex-shrink-0 px-3 text-center">
            <div className="rounded-xl overflow-hidden shadow-sm bg-white">
              <Image
                src={doc.img}
                alt={doc.title}
                width={300}
                height={200}
                className="w-full h-48 rounded-2xl overflow-hidden border border-green-600 shadow-xl bg-white"
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

  {/* Mobile carousel: visible below md */}
  <div className="flex md:hidden overflow-x-scroll gap-4 no-scrollbar mt-4">
    {doctors.map((doc, i) => (
      <div key={i} className="flex-shrink-0 w-2/3">
        <div className="rounded-xl overflow-hidden shadow-sm bg-white">
          <Image
            src={doc.img}
            alt={doc.title}
            width={300}
            height={200}
            className="w-full h-40 rounded-2xl overflow-hidden border border-green-600 shadow-xl bg-white"
          />
          <div className="p-3">
            <h3 className="font-semibold text-gray-900 text-sm">{doc.title}</h3>
            <p className="text-xs text-gray-600 mt-1">{doc.desc}</p>
          </div>
        </div>
      </div>
    ))}
  </div>
</div>

</section>

     <section className="px-6 md:px-80 py-12 bg-black">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
        {/* Left Text Section */}
        <div>
          <h2 className={`text-3xl md:text-4xl font-light mb-4 text-white/90 text-center`}>
            Read top articles from <br /> health experts
          </h2>
          <p className="text-white mt-3">
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
            <div className="w-full h-48 rounded-2xl overflow-hidden border border-green-600 shadow-xl  bg-white">
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
              <h3 className="mt-1 text-lg font-semibold text-white leading-tight">
                {article.title}
              </h3>
              <p className="text-white text-sm mt-1">{article.author}</p>
            </div>
          </div>
        ))}
      </div>

    
    </section>

     <section className="px-6 md:px-16 py-20 text-center relative overflow-hidden bg-black">
       <div className="bg-black text-white py-0 px-4 md:px-16">
     <h2 className="text-center text-3xl md:text-4xl font-light mb-16 text-green-400">
  What our users have to say?
</h2>

      <style jsx>{`
        @keyframes scroll-down {
          0% {
            transform: translateY(0);
          }
          100% {
            transform: translateY(-50%);
          }
        }
        @keyframes scroll-up {
          0% {
            transform: translateY(-50%);
          }
          100% {
            transform: translateY(0);
          }
        }
        @keyframes scroll-left {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        @keyframes scroll-right {
          0% {
            transform: translateX(-50%);
          }
          100% {
            transform: translateX(0);
          }
        }
      `}</style>

      {/* Desktop layout */}
      <div className="hidden md:grid grid-cols-3 gap-8 max-w-7xl mx-auto">
        {testimonials.map((column, colIdx) => (
          <div
            key={colIdx}
            className="overflow-hidden relative h-[300px]"
          >
            <div
              className="flex flex-col gap-6"
              style={{
                animation: `${colIdx === 1 ? 'scroll-up' : 'scroll-down'} 12s linear infinite`,
              }}
            >
              {[...column, ...column].map((item, i) => (
                <div
                  key={`desktop-${colIdx}-${i}`}
                  className="border border-white/10 p-5 rounded-2xl backdrop-blur-md bg-white/5"
                >
                  <p className="text-sm text-white/90 mb-4">{item.text}</p>
                  <p className="font-semibold">{item.author}</p>
                  <p className="text-xs text-white/60">{item.title}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Mobile layout */}
      <div className="md:hidden flex flex-col gap-12">
        {testimonials.map((row, rowIdx) => (
          <div key={rowIdx} className="overflow-hidden w-full">
            <div
              className="flex gap-6 w-max"
              style={{
                animation: `${rowIdx === 1 ? 'scroll-right' : 'scroll-left'} 14s linear infinite`,
              }}
            >
              {[...row, ...row].map((item, i) => (
                <div
                  key={`mobile-${rowIdx}-${i}`}
                  className="min-w-[250px] max-w-[300px] border border-white/10 p-5 rounded-2xl backdrop-blur-md bg-white/5"
                >
                  <p className="text-sm text-white/90 mb-4">{item.text}</p>
                  <p className="font-semibold">{item.author}</p>
                  <p className="text-xs text-white/60">{item.title}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
    </section>





     <section className="bg-black py-16 px-6 md:px-16 ">
      <div className="max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-2 items-center gap-10 ">
        {/* Left: Doctor Image */}
        <div className="flex justify-center ">
           <motion.div
    animate={{
      x: [0, -6, 6, -6, 6, 0],  // side-to-side shake
    }}
    transition={{
      duration: 0.5,   // speed of one shake cycle
      repeat: Infinity, // keep shaking
      ease: "easeInOut",
    }}
    whileHover={{ x: 0 }} // stop shaking when hovered (optional)
  >
    <Image
      src="/doc.png"
      alt="Doctor Video Consultation"
      width={400}
      height={500}
      className="rounded-lg"
      priority
    />
  </motion.div>
        </div>

        {/* Right: Text + Input + Buttons */}
        <div>
         <h2 className={`text-3xl md:text-4xl font-light mb-4 text-white/90`}>
  <span className="text-green-600 text-3xl md:text-4xl font-light mb-4">Download </span>the Sukoon app
</h2>

          <p className={`mt-4 text-white text-base md:text-lg max-w-md ${merriweather.className}`}>
            Access video consultation with India’s top Consultants on the Sukoon app.
            Connect with Consultants online, available 24/7, from the comfort of your
            home.
          </p>

          {/* Phone Input */}
          <div className="mt-6 flex flex-col sm:flex-row items-center gap-3">
            <div className="flex border rounded-lg w-full sm:w-auto overflow-hidden">
              <span className="flex items-center px-3 bg-gray-100 text-sm">
                +91
              </span>
              <input
                type="tel"
                placeholder="Enter phone number"
                className="px-3 py-2 w-full outline-none text-white"
              />
            </div>
<button className="px-3 py-1 rounded-lg bg-green-600 text-white font-medium hover:bg-sky-600 transition whitespace-nowrap">
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


     <section className="bg-black py-16">
      <div className="max-w-3xl mx-auto text-center px-6">
        <h2 className="text-green-400 font-bold text-3xl md:text-4xl font-light mb-4">Join Our Community</h2>
        <p className="mt-4 text-green-600">
          Connect with healthcare experts, share experiences, and grow together.
        </p>
        <button className="mt-6 px-6 py-3 rounded-lg bg-green-600 text-white font-semibold hover:bg-green-700 transition">
          Join Community
        </button>
      </div>
    </section>

     <footer className="bg-green-600 text-white py-12 px-6 md:px-16 ">
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-6 gap-8">
        {/* Sukoon Column */}
        <div>
          <h3 className="font-semibold mb-4">Sukoon</h3>
          <ul className="space-y-2 text-sm text-200">
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
          <ul className="space-y-2 text-sm text-white">
            <li><a href="#">Search for Consultants</a></li>
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
          <h3 className="font-semibold mb-4">For Consultants</h3>
          <ul className="space-y-2 text-sm text-white">
            <li><a href="#">Sukoon Profile</a></li>
          </ul>
          <h3 className="font-semibold mt-6 mb-4">For clinics</h3>
          <ul className="space-y-2 text-sm text-white">
            <li><a href="#">Ray by Sukoon</a></li>
            <li><a href="#">Sukoon Reach</a></li>
            <li><a href="#">Ray Tab</a></li>
            <li><a href="#">Sukoon Pro</a></li>
          </ul>
        </div>

        {/* For Hospitals + Corporates */}
        <div>
          <h3 className="font-semibold mb-4">For hospitals</h3>
          <ul className="space-y-2 text-sm text-white">
            <li><a href="#">Insta by Sukoon</a></li>
            <li><a href="#">Qikwell by Sukoon</a></li>
            <li><a href="#">Sukoon Profile</a></li>
            <li><a href="#">Sukoon Reach</a></li>
            <li><a href="#">Sukoon Drive</a></li>
          </ul>
          <h3 className="font-semibold mt-6 mb-4">For Corporates</h3>
          <ul className="space-y-2 text-sm text-white">
            <li><a href="#">Wellness Plans</a></li>
          </ul>
        </div>

        {/* More */}
        <div>
          <h3 className="font-semibold mb-4">More</h3>
          <ul className="space-y-2 text-sm text-white">
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
          <ul className="space-y-2 text-sm text-white">
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
          <span className="text-2xl font-bold text-green-400">Sukoon</span>
        </div>
        <p className="text-sm text-white">
          Copyright © 2025, Sukoon. All rights reserved.
        </p>
      </div>
    </footer>
    </div>
  );
}