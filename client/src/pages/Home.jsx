import React from 'react'
import Navbar from '../comps/Navbar'
import Footer from '../comps/Footer'
import BrainIcon from "../assets/imgs/hero-sec-icon.png"
import PeoplesInChainImg from "../assets/imgs/home-page-benifit-img.png"
import { FaLaptopCode, FaLightbulb, FaRoad } from 'react-icons/fa';

const Home = () => {

  const featureData = [
    {
      icon: <FaLaptopCode className="text-5xl text-blue-500 mb-4" />,
      title: "On Demand Courses",
      description: "Find all the instructions you need to get an entry-level job in tech you already know with Compass."
    },
    {
      icon: <FaLightbulb className="text-5xl text-green-500 mb-4" />,
      title: "Interactive Learning",
      description: "Our courses have quizzes and code challenges to keep you engaged because the best way to learn."
    },
    {
      icon: <FaRoad className="text-5xl text-purple-500 mb-4" />,
      title: "Learning With Tracks",
      description: "Each of our Tracks is a mini-program designed to teach you a particular set of skills."
    }
  ];

  const benefitsContent = [
    {
      heading: "Flexibility",
      text: "Online education offers the flexibility to learn anytime, anywhere."
    },
    {
      heading: "Reduced Costs",
      text: "With online education, you save on commuting and accommodation expenses."
    },
    {
      heading: "Networking Opportunities",
      text: "Online courses provide opportunities to connect with a diverse group of learners from around the world."
    },
    {
      heading: "Documentation",
      text: "Access comprehensive documentation to support your learning journey"
    },
    {
      heading: "Increased Time",
      text: "Online education saves you time by eliminating the need for commuting. "
    },
    {
      heading: "Access to Expertise",
      text: "Gain access to expert instructors and industry professionals. "
    }
  ];

  // for testimonials
  const testimonials = [
    {
      name: 'John Doe',
      testimonial: 'The courses on this platform have transformed my career. The interactive learning and knowledgeable instructors make it a top-notch choice for anyone looking to learn new skills.',
      image: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D&w=1000&q=80', // Placeholder image URL
    },
    {
      name: 'Jane Smith',
      testimonial: 'I never thought online education could be so engaging. The practical exercises and real-world examples provided me with the confidence to apply what I learned in my job.',
      image: 'https://t3.ftcdn.net/jpg/02/00/90/24/360_F_200902415_G4eZ9Ok3Ypd4SZZKjc8nqJyFVp1eOD6V.jpg', // Placeholder image URL
    },
    {
      name: 'Sarah Davies',
      testimonial: 'As a full-time professional, finding time for education was a challenge. Thanks to this platform, I can now learn at my own pace and enhance my skills without disrupting my work-life balance.',
      image: 'https://images.unsplash.com/photo-1590541490155-0e1853825612?ixlib=rb-4.0.3&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max', // Placeholder image URL
    },

  ];

  // for FAQ
  const faqs = [
    {
      question: 'How do I enroll in a course?',
      answer: 'To enroll in a course, simply visit the course page and click the "Enroll" button. You will need to create an account or sign in if you haven\'t already.',
    },
    {
      question: 'Are the courses self-paced?',
      answer: 'Yes, our courses are designed to be self-paced. You can learn at your own convenience and set your own learning schedule.',
    },
    {
      question: 'What payment methods do you accept?',
      answer: 'We accept major credit cards, PayPal, and other secure online payment methods. You can choose your preferred payment option during the checkout process.',
    },
    // Add more FAQs here
  ];

  return (
    <>
      <Navbar />

      {/* HERO SECTION */}
      <div className='hero-section h-[90vh] text-white flex flex-col justify-center items-center '>

        <img src={BrainIcon} alt="" />

        <div className='text-center mt-10'>
          <p>We believe in</p>
          <h1 className='text-6xl font-bold'>Passion for learning</h1>
        </div>

        <div className='mt-5 mb-8 font-bold text-lg'>
          <p>And Online Exam is great tool to learn!</p>
        </div>

        <div>
          <button className='bg-[#0D6EFD] py-3 px-5 rounded-sm'>EXPLORE WITH US</button>
        </div>

      </div>

      {/* FEATURE SECTION */}
      <div className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-semibold text-center mb-8">
            The Great Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featureData.map((feature, index) => (
              <div
                key={index * Math.random()}
                className="flex flex-col items-center justify-center p-6 bg-white shadow-md rounded-lg text-center"
              >
                <div className="mb-4">{feature.icon}</div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* about us section */}
      <section className="bg-blue-600 text-white p-12 flex items-center">
        <div className="flex-none">
          <img
            src="https://www.blogtyrant.com/wp-content/uploads/2011/02/best-about-us-pages.png"
            alt="About Us"
            className="w-[100%] rounded-lg"
          />
        </div>
        <div className="ml-8">
          <h2 className="text-3xl font-semibold mb-4">About Us</h2>
          <p className="text-lg leading-relaxed">
            Welcome to our advanced Learning Management System (LMS) that is designed to provide
            exceptional learning experiences for students and educators alike. With a user-friendly
            interface and powerful features, we aim to transform education and training in the digital age.
          </p>
          <p className="mt-4 text-lg leading-relaxed">
            Our LMS offers a wide range of tools and resources to facilitate seamless communication
            between educators and learners. From interactive quizzes and assignments to collaborative
            discussion forums, our platform empowers individuals to excel in their learning journeys.
          </p>
        </div>
      </section>

      {/* How It Works Section */}
      <div className='bg-gray-100  py-20'>

        <div className='text-center pb-16'>
          <p className='text-[#E03A11] text-xl'>How It Works</p>
          <h2 className='text-5xl'>Benefits Of Online Education</h2>
        </div>

        <div className='grid grid-cols-3 w-[80%] m-auto gap-x-4'>

          <div className='space-y-5'>

            {
              benefitsContent.slice(0, 3).map(({ heading, text }) => (
                <div key={heading}>
                  <h2 className='font-semibold'>{heading}</h2>
                  <p className='text-gray-500 mt-2'>{text}</p>
                </div>
              ))
            }

          </div>

          <div className='flex  justify-center'>

            <img src={PeoplesInChainImg} className='h-[350px]' />

          </div>

          <div className='space-y-5'>

            {
              benefitsContent.slice(3).map(({ heading, text }) => (
                <div key={heading}>
                  <h2 className='font-semibold'>{heading}</h2>
                  <p className='text-gray-500 mt-2'>{text}</p>
                </div>
              ))
            }

          </div>

        </div>

      </div>

      {/* testimonial section */}
      <div className="bg-gray-100 pt-2 pb-16">
        <div className="container mx-auto px-4">
          <div className='text-center pb-16'>
            <p className='text-[#E03A11] text-xl'>What our user says</p>
            <h2 className='text-5xl'>User Testimonials</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-md shadow-md"
              >
                <div className="flex items-center mb-4 object-cover">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 object-cover rounded-full mr-4"
                  />
                  <h4 className="text-lg font-semibold">{testimonial.name}</h4>
                </div>
                <p className="text-gray-700">{testimonial.testimonial}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* for FAQ */}
      <div className="bg-gray-100 py-16">
        <div className="container mx-auto px-4">
          <div className='text-center pb-16'>
            <p className='text-[#E03A11] text-xl'>FAQ's</p>
            <h2 className='text-5xl'>Frequently Asked Question</h2>
          </div>
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white p-6 rounded-md shadow-md">
                <h3 className="text-lg font-semibold mb-2">{faq.question}</h3>
                <p className="text-gray-700">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer />

    </>
  )
}

export default Home