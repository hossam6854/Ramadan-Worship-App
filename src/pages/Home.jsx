import { Link } from "react-router-dom";
import { BookOpen, ArrowDown, Landmark } from "lucide-react";
import CountdownTimer from "../components/CountdownTimer";
import PrayerTimes from "../components/PrayerTimes";
import DailyQuote from "../components/DailyQuote";
import { useRef, React } from "react";

const Home = () => {
  const prayerTimesRef = useRef(null);

  const handleScroll = () => {
    if (prayerTimesRef.current) {
      prayerTimesRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-10">
      <div className="container mx-auto px-6">
        <header className="flex flex-wrap justify-between items-center mb-6 gap-4 md:gap-6">
          <div className="flex flex-wrap items-center gap-2 sm:gap-4 order-1 md:order-2">
            <Link
              to="/worship"
              className="inline-flex items-center px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium text-gray-700 bg-white rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
            >
              <Landmark className="mr-1 sm:mr-2 h-4 w-4" /> العبادات اليومية
            </Link>

            <Link
              to="/quran"
              className="inline-flex items-center px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium text-gray-700 bg-white rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
            >
              <BookOpen className="mr-1 sm:mr-2 h-4 w-4" /> القرآن الكريم
            </Link>
          </div>

          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 text-center md:text-right w-full md:w-auto">
            بسم الله الرحمن الرحيم
          </h1>
        </header>

        <div className="text-center mt-6">
          <button
            onClick={handleScroll}
            className="inline-flex items-center px-4 py-2 mb-4 text-sm font-medium text-gray-700 bg-white rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors cursor-pointer"
          >
            <ArrowDown className="h-6 w-6" />
            الذهاب إلى أوقات الصلاة
          </button>
        </div>

        <main className="space-y-8">
          <div className="flex flex-col md:flex-row gap-4">
            <section className="bg-white shadow-lg rounded-2xl p-4 border-t-4 border-purple-400 flex-1">
              <h2 className="text-2xl font-semibold text-purple-700 mb-2 text-right">
                🕌 العدّاد التنازلي لرمضان
              </h2>
              <CountdownTimer />
            </section>

            <section className="bg-white shadow-lg rounded-2xl p-4 border-t-4 border-orange-400 flex-1">
              <h2 className="text-2xl font-semibold text-orange-700 mb-2 text-right">
                💬 الاقتباس اليومي
              </h2>
              <DailyQuote />
            </section>
          </div>

          <section
            ref={prayerTimesRef}
            id="prayer-times"
            className="bg-white shadow-lg rounded-2xl p-6 border-t-4 border-blue-400 mt-10"
          >
            <h2 className="text-3xl font-semibold text-blue-700 mb-4"></h2>
            <PrayerTimes />
          </section>
        </main>

        <footer className="mt-16 text-center text-gray-700 text-lg font-medium">
          <p>تطبيق الإيمان - كل يوم فرصة جديدة لتقرب إلى الله</p>
        </footer>
      </div>
    </div>
  );
};

export default Home;
