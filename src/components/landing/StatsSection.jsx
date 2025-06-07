import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

const statsData = [
  { label: "URLs Shortened", count: 256, suffix: "+" },
  { label: "Total Clicks", count: 9854, suffix: "+" },
  { label: "Active Users", count: 52, suffix: "+" },
];

const AnimatedStat = ({ count, suffix, inView }) => {
  const [displayCount, setDisplayCount] = useState(0);

  useEffect(() => {
    if (!inView) return;

    let current = 0;
    const duration = 1000;
    const increment = Math.ceil(count / (duration / 10));

    const interval = setInterval(() => {
      current += increment;
      if (current >= count) {
        current = count;
        clearInterval(interval);
      }
      setDisplayCount(current);
    }, 10);

    return () => clearInterval(interval);
  }, [count, inView]);

  return (
    <span className="text-5xl font-extrabold leading-none text-indigo-600 dark:text-indigo-100">
      {inView ? displayCount : 0}
      {inView && suffix}
    </span>
  );
};

export default function UrlShortenerStats() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 });

  return (
    <div ref={ref} className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-screen-xl px-4 mx-auto sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
            Smarter URLs Start Here
          </h2>
          <p className="mt-3 text-xl text-gray-600 dark:text-gray-400">
            Create sleek, trackable links and take control of your click data in real time.
          </p>
        </div>
        <div className="mt-10">
          <dl className="bg-white dark:bg-gray-800 rounded-lg shadow-lg sm:grid sm:grid-cols-3">
            {statsData.map((stat, index) => (
              <div
                key={index}
                className={`flex flex-col p-6 text-center ${index === 0
                    ? "border-b sm:border-r"
                    : index === 1
                      ? "border-t border-b sm:border-0 sm:border-l sm:border-r"
                      : "border-t sm:border-l"
                  } border-gray-100 dark:border-gray-700`}
              >
                <dt className="order-2 mt-2 text-lg font-medium text-gray-500 dark:text-gray-400">
                  {stat.label}
                </dt>
                <dd className="order-1">
                  <AnimatedStat count={stat.count} suffix={stat.suffix} inView={inView} />
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}
