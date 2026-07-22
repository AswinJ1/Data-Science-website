"use client";

const logos = [
  {
    name: 'Java',
    url: '/techstack/java.svg',
  },
  {
    name: 'Python',
    url: '/techstack/python.svg',
  },
  {
    name: 'Power BI',
    url: '/techstack/powerbi.svg',
  },
  {
    name: 'R Language',
    url: '/techstack/R.svg',
  },
  {
    name: 'Tableau',
    url: '/techstack/tableau.svg',
  },
  {
    name: 'AWS',
    url: '/techstack/aws.svg',
  },
  {
    name: 'Azure',
    url: '/techstack/Microsoft-Azure.svg',
  },
  {
    name: 'Gemini AI',
    url: '/techstack/gemini.svg',
  },
];

const Sponsor = () => {
  return (
    <div className="w-full py-14 bg-white border-y border-gray-100 overflow-hidden">
      <div className="mx-auto w-full px-4 md:px-8">
        <div className="text-xs font-bold uppercase tracking-widest text-center mb-8 text-blue-600">
          Powered by Industry-Leading Technologies
        </div>
        <div
          className="group relative flex gap-8 overflow-hidden p-2"
          style={{
            maskImage:
              'linear-gradient(to left, transparent 0%, black 15%, black 85%, transparent 100%)',
          }}
        >
          {Array(4)
            .fill(null)
            .map((_, index) => (
              <div
                key={index}
                className="flex shrink-0 animate-logo-cloud flex-row justify-around gap-10 items-center"
              >
                {logos.map((logo, logoIndex) => (
                  <div
                    key={`${index}-${logoIndex}`}
                    className="h-12 flex items-center justify-center px-4"
                  >
                    <img
                      src={logo.url}
                      className="h-10 w-auto max-w-[130px] object-contain transition-transform duration-300 hover:scale-110"
                      alt={logo.name}
                    />
                  </div>
                ))}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Sponsor;