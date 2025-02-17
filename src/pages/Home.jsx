import { Link } from "react-router-dom";
import { BookOpen, ArrowDown, Landmark } from "lucide-react";
import CountdownTimer from "../components/CountdownTimer";
import PrayerTimes from "../components/PrayerTimes";
import DailyQuote from "../components/DailyQuote";
import { useRef, React} from "react";

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
        {/* العنوان مع رابط صفحة القرآن */}
        <header  className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">
            بسم الله الرحمن الرحيم
          </h1>
          <div className="flex space-x-4">

          <Link
            to="/quran"
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
            >
            <BookOpen className="mr-2 h-4 w-4" /> القرآن الكريم
          </Link>
          <Link
            to="/worship"
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
          >
            <Landmark className="mr-2 h-4 w-4" /> العبادات اليومية
          </Link>
          </div>
          
          
        </header>

         {/* زر النزول إلى أوقات الصلاة */}
         <div className="text-center mt-6">
            <a
              onClick={handleScroll}
              className="inline-flex items-center px-4 py-2 mb-4 text-sm font-medium text-gray-700 bg-white rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors cursor-pointer"
              >
              <ArrowDown className="h-6 w-6" />
              الذهاب إلى أوقات الصلاة
            </a>
          </div>

        {/* المحتوى الرئيسي */}
        <main className="space-y-8">
          {/* العد التنازلي + الاقتباس اليومي */}
          <div className="flex flex-col md:flex-row gap-4">
            {/* العد التنازلي */}
            <section className="bg-white shadow-lg rounded-2xl p-4 border-t-4 border-purple-400 flex-1">
              <h2 className="text-2xl font-semibold text-purple-700 mb-2">
                ⏳ العدّاد التنازلي
              </h2>
              <CountdownTimer />
            </section>

            {/* الاقتباس اليومي */}
            <section className="bg-white shadow-lg rounded-2xl p-4 border-t-4 border-orange-400 flex-1">
              <h2 className="text-2xl font-semibold text-orange-700 mb-2">
                💬 الاقتباس اليومي
              </h2>
              <DailyQuote />
            </section>
          </div>

         

          {/* أوقات الصلاة */}
          <section
            ref={prayerTimesRef} id="prayer-times"
            className="bg-white shadow-lg rounded-2xl p-6 border-t-4 border-blue-400 mt-10"
          >
            <h2 className="text-3xl font-semibold text-blue-700 mb-4">
            </h2>
            <PrayerTimes />
          </section>
        </main>

        {/* الفوتر */}
        <footer className="mt-16 text-center text-gray-700 text-lg font-medium">
          <p>تطبيق الإيمان - كل يوم فرصة جديدة لتقرب إلى الله.</p>
        </footer>
      </div>
    </div>
  );
};

export default Home;
