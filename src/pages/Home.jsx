import { Building } from 'lucide-react';
import LoginBtn from '../components/LoginBtn';
const Home = () => {
  return (
    <section className="w-full h-[calc(100svh-64px)]">
      {/* <img
        src="/images/abstract_banner.jpg"
        alt="Data enrichment"
        className="w-full h-full object-cover aspect-video opacity-60"
      /> */}
<div className="min-h-screen bg-[url('https://img.freepik.com/free-vector/abstract-banner-with-network-communications-design-with-connecting-lines-dots_1048-20185.jpg')] bg-no-repeat bg-cover flex flex-col items-center justify-center p-4">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-6">
            <Building className="w-12 h-12 text-indigo-800" />
            <span className="ml-3 text-5xl tracking-wider font-bold  text-indigo-900">LEPT</span>
          </div>
          <h2 className="text-2xl font-thin text-orange-600">Lead Enrichment Preview Tool</h2>
        </div>
        <LoginBtn isLoggedIn={false} userEmail={null} />
      </div>

    </section>
  );
};

export default Home;
