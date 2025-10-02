'use client'
import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'

const testimonials = [
  {
    text: 'First testimonial goes here. Praising your product or service and expressing satisfaction.',
    author: 'Ansub',
    image:
      'https://res.cloudinary.com/dfhp33ufc/image/upload/v1715276558/logos/t2awrrfzdvmg1chnzyfr.svg',
  },
  {
    text: 'Another testimonial goes here. Praising your product or service and expressing satisfaction.',
    author: 'Lex Collins',

    image:
      'https://res.cloudinary.com/dfhp33ufc/image/upload/v1715276558/logos/pmblusboe7vkw8vxdknx.svg',
  },
  {
    text: 'Third testimonial goes here. Praising your product or service and expressing satisfaction.',
    author: 'Alex Jones',
    image:
      'https://res.cloudinary.com/dfhp33ufc/image/upload/v1715276558/logos/tyos2ayezryjskox3wzs.svg',
  },
  {
    text: 'Fourth testimonial goes here. Praising your product or service and expressing satisfaction.',
    author: 'John Doe',
    image:
      'https://res.cloudinary.com/dfhp33ufc/image/upload/v1715276560/logos/nymiivu48d5lywhf9rpf.svg',
  },
]

const TestimonialCarousel = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0)

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTestimonial(
        (prevTestimonial) => (prevTestimonial + 1) % testimonials.length,
      )
    }, 5000) // Change Time here

    return () => {
      clearInterval(intervalId)
    }
  }, [])

  const { text, author, image } = testimonials[currentTestimonial]

  const variants = {
    initial: { opacity: 0, y: '100%', scale: 0.1 },
    animate: { opacity: 1, y: 0, scale: 1 },
    exit: { opacity: 0, y: '100%', scale: 0.1 },
  }
  const dotVariants = {
    active: { scale: 1.2, backgroundColor: '#3f3f46' },
    inactive: { scale: 1, backgroundColor: '#D1D5DB' },
  }

  return (
    <section className="py-8 md:py-16 lg:py-24 px-4 sm:px-6 lg:px-8">
      <div className="font-medium uppercase text-center mb-7 text-sm sm:text-base">
        Testimonials
      </div>
      <div className="flex flex-col lg:flex-row max-w-7xl mx-auto gap-8 lg:gap-12 items-center lg:items-start">
        <div className="w-full max-w-2xl">
          <AnimatePresence mode="popLayout">
            <motion.div
              key={currentTestimonial}
              initial="initial"
              animate="animate"
              exit="exit"
              variants={variants}
              className="flex w-full flex-col items-center justify-center px-4"
              transition={{
                type: 'spring',
                stiffness: 200,
                damping: 20,
                duration: 0.5,
              }}
            >
              <img
                src={image}
                alt={author}
                className="m-0 h-16 w-16 sm:h-20 sm:w-20 md:h-24 md:w-24"
              />
              <p className="m-0 text-center text-lg sm:text-xl md:text-2xl font-medium tracking-tight mt-4 sm:mt-6">
                &quot;{text}&quot;
              </p>
              <div className="mx-auto mt-4 sm:mt-5">
                <div className="flex flex-col items-center justify-center">
                  <div className="font-regular text-sm text-gray-900/80">
                    {author}
                  </div>
                </div>
              </div>
            </motion.div>
            <div className="mt-6 sm:mt-8 flex justify-center">
              {testimonials.map((_, index) => (
                <motion.div
                  key={index}
                  className="mx-1 h-2 w-2 sm:h-3 sm:w-3 cursor-pointer rounded-full"
                  variants={dotVariants}
                  animate={
                    index === currentTestimonial ? 'active' : 'inactive'
                  }
                  onClick={() => setCurrentTestimonial(index)}
                />
              ))}
            </div>
          </AnimatePresence>
        </div>

        {/* CEO Section */}
        <div className="flex flex-col items-center space-y-4 sm:space-y-6 w-full lg:w-auto lg:flex-shrink-0">
          <img
            src="/ceo.jpeg"
            alt="CEO"
            className="w-48 h-56 sm:w-56 sm:h-72 md:w-64 md:h-80 lg:w-72 lg:h-96 xl:w-64 xl:h-80 object-cover rounded-lg shadow-lg"
          />
          <blockquote className="text-center max-w-xs sm:max-w-sm px-4">
            <p className="text-base sm:text-lg font-medium text-gray-800 italic">
              "Leading innovation in data science and transforming businesses
              through intelligent solutions."
            </p>
            <footer className="mt-2 sm:mt-3 text-xs sm:text-sm text-gray-600">
              Chethan Gawali
              <br />
              — CEO & Founder
            </footer>
          </blockquote>
        </div>
      </div>
    </section>
  )
}

export default TestimonialCarousel