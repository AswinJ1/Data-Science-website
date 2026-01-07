// Instructions for integrating continuous logo animation in Tailwind CSS:
// Add the following configurations to the `extend` section of your `tailwind.config.js`:
// 1. Keyframes for 'logo-cloud' animation that continuously moves logos from right to left:
//    keyframes: {
//      'logo-cloud': {
//        from: { transform: 'translateX(0)' },
//        to: { transform: 'translateX(calc(-100% - 4rem))' },
//      },
//    }
// 2. Animation utility to apply this keyframe:
//    animation: {
//      'logo-cloud': 'logo-cloud 30s linear infinite', // Adjust duration and timing as needed for your design.
//    }

const logos = [
  {
    name: 'Java',
    url: '/techstack/java.svg',
    preserveColor: true, // Flag to preserve original colors
  },
  {
    name: 'Power BI',
    url: '/techstack/powerbi.svg',
    preserveColor: true,
  },
  {
    name: 'Python',
    url: '/techstack/python.svg',
    preserveColor: true,
  },
  {
    name: 'R Language',
    url: '/techstack/R.svg',
    preserveColor: true,
  },
  {
    name: 'Tableau',
    url: '/techstack/tableau.svg',
    preserveColor: true,
  },
  // {
  //   name: 'Airbnb',
  //   url: 'https://res.cloudinary.com/dfhp33ufc/image/upload/v1715276558/logos/pmblusboe7vkw8vxdknx.svg',
  //   preserveColor: false,
  // },
  // {
  //   name: 'Tina',
  //   url: 'https://res.cloudinary.com/dfhp33ufc/image/upload/v1715276560/logos/afqhiygywyphuou6xtxc.svg',
  //   preserveColor: false,
  // },
  // {
  //   name: 'Stackoverflow',
  //   url: 'https://res.cloudinary.com/dfhp33ufc/image/upload/v1715276558/logos/ts1j4mkooxqmscgptafa.svg',
  //   preserveColor: false,
  // },
  // {
  //   name: 'mistral',
  //   url: 'https://res.cloudinary.com/dfhp33ufc/image/upload/v1715276558/logos/tyos2ayezryjskox3wzs.svg',
  //   preserveColor: false,
  // },
]

const Sponsor = () => {
  return (
    <div className="w-full py-12">
      <div className="mx-auto w-full px-4 md:px-8">
        <div className="font-medium uppercase text-center mb-7 ">Tech Stacks</div>
        <div
          className="group relative mt-6 flex gap-6 overflow-hidden p-2"
          style={{
            maskImage:
              'linear-gradient(to left, transparent 0%, black 20%, black 80%, transparent 95%)',
          }}
        >
          {Array(5)
            .fill(null)
            .map((_, index) => (
              <div
                key={index}
                className="flex shrink-0 animate-logo-cloud flex-row justify-around gap-6"
              >
                {logos.map((logo, logoIndex) => (
                  <img
                    key={`${index}-${logoIndex}`}
                    src={logo.url}
                    className={`h-10 w-28 px-2 ${
                      logo.preserveColor ? '' : 'brightness-0 dark:invert'
                    }`}
                    alt={`${logo.name}`}
                  />
                ))}
              </div>
            ))}
        </div>
      </div>
    </div>
  )
}

export default Sponsor