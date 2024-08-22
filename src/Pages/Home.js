import React, { useEffect, useState } from 'react';
import { FaComputer } from "react-icons/fa6";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa"; // Importing react-icons for carousel controls
import AOS from 'aos';
import 'aos/dist/aos.css';

function Home() {
  useEffect(() => {
    AOS.init({
      duration: 1000, 
      once: true,    
    });
  }, []);
  const testimonials = [
    {
      image: 'https://i.ibb.co/8x9xK4H/team.jpg',
      text: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s.',
      client: 'Client 1',
    },
    {
      image: 'https://i.ibb.co/8x9xK4H/team.jpg',
      text: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s.',
      client: 'Client 2',
    },
    {
      image: 'https://i.ibb.co/8x9xK4H/team.jpg',
      text: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s.',
      client: 'Client 3',
    },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <div>
<div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 gap-4 items-center bg-blue-900 text-white p-8">
  <div
    className="flex flex-col justify-center space-y-4 mx-auto w-full p-0 hero-section-content-custom"
    data-aos="fade-up"
  >
    <h2>The Password Manager for Teams</h2>
    <p>
      TeamPassword is the fastest, easiest, and most secure way to store and share team logins and passwords.
    </p>
    <div className="flex hero-section-button">
      <a
        href="#"
        className="py-3 px-9 border border-transparent text-base leading-6 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo transition duration-150 ease-in-out"
        data-aos="fade-up"
        data-aos-delay="200"
      >
        Get Started
      </a>
    </div>
  </div>
  <div
    className="hidden md:flex justify-center w-full h-full mx-auto hero-section-image"
    data-aos="fade-left"
  >
    <img
      className="w-full h-auto object-fill rounded-lg shadow-lg"
      src="https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2850&q=80"
      alt="App Screenshot"
    />
  </div>
</div>






<div className="feature-parent">
      <div className="feature-content mt-5 py-9">
        <h2 className="text-1xl tracking-tight leading-10 font-bold sm:text-2xl text-slate-700 text-center sm:leading-none md:text-3xl">
          Features
        </h2>
        <h4 className='text-xl tracking-tight leading-10 font-normal sm:text-1xl text-slate-700 text-center sm:leading-none md:text-2xl md:py-3'>
          Centralized Security Management
        </h4>
      </div>
      <div className="container grid-layout-custom mx-auto my-7">
        <div className="grid grid-layout-adjustment grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className='mx-auto w-full feature-content-parent' data-aos="fade-up" data-aos-delay="100">
            <div className='feature-icon-content'>
              <FaComputer />
              <h1>Keep Projects Moving</h1>
              <h2>Everybody hates being locked out. With our shared password manager, your team's apps and tools are accessible anywhere.</h2>
            </div>
          </div>
          <div className='mx-auto w-full feature-content-parent' data-aos="fade-up" data-aos-delay="300">
            <div className='feature-icon-content'>
              <FaComputer />
              <h1>Keep Projects Moving</h1>
              <h2>Everybody hates being locked out. With our shared password manager, your team's apps and tools are accessible anywhere.</h2>
            </div>
          </div>
          <div className='mx-auto w-full feature-content-parent' data-aos="fade-up" data-aos-delay="500">
            <div className='feature-icon-content'>
              <FaComputer />
              <h1>Keep Projects Moving</h1>
              <h2>Everybody hates being locked out. With our shared password manager, your team's apps and tools are accessible anywhere.</h2>
            </div>
          </div>
          <div className='mx-auto w-full feature-content-parent' data-aos="fade-up" data-aos-delay="700">
            <div className='feature-icon-content'>
              <FaComputer />
              <h1>Keep Projects Moving</h1>
              <h2>Everybody hates being locked out. With our shared password manager, your team's apps and tools are accessible anywhere.</h2>
            </div>
          </div>
        </div>
      </div>
    </div>
      <div className="feature-content mt-5 py-9">
          <h2 className="text-1xl tracking-tight leading-10 font-bold sm:text-2xl text-slate-700 text-center sm:leading-none md:text-3xl">
      Testimonial
          </h2>
          <h4 className='text-xl tracking-tight leading-10 font-normal sm:text-1xl text-slate-700 text-center sm:leading-none md:text-2xl md:py-3'>
            Centralized Security Management
          </h4>
        </div>
      <div className="testimonial testimonial-custom-layout text-center bg-cover bg-center py-12 relative" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2850&q=80')" }}>
  {/* Background Overlay */}
  
  <div className="absolute inset-0 bg-black opacity-50"></div> 

  <div className="container mx-auto relative z-10">
    <div className="relative overflow-hidden">
      <div
        className="carousel-inner flex transition-transform duration-1000 ease-out"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {testimonials.map((testimonial, index) => (
          <div key={index} className="carousel-item w-full flex-shrink-0">
            <div className="testimonial4_slide text-center p-8">
              <img src={testimonial.image} className="w-32 h-32 mx-auto rounded-full shadow-lg" alt="Client" />
              <p className="text-white mt-6 text-lg">{testimonial.text}</p>
              <h4 className="text-white mt-4 text-xl">{testimonial.client}</h4>
            </div>
          </div>
        ))}
      </div>
      <button
        className="carousel-control-prev absolute top-1/2 left-4 transform -translate-y-1/2 bg-white text-black rounded-full p-2 shadow-lg"
        onClick={prevSlide}
      >
        <FaChevronLeft />
      </button>
      <button
        className="carousel-control-next absolute top-1/2 right-4 transform -translate-y-1/2 bg-white text-black rounded-full p-2 shadow-lg"
        onClick={nextSlide}
      >
        <FaChevronRight />
      </button>
    </div>
  </div>
</div>

    </div>
  );
}

export default Home;
