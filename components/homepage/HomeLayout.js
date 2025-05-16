import HomeIntro from "./HomeIntro";
import HomeCard from "./HomeCard";
import HomeContact from "./HomeContact";

const HomeLayout = () => {
  return (
    <main className="bg-gray-100 min-h-screen">
      <HomeIntro />
      <HomeCard />
      <HomeContact />
    </main>
  );
};

export default HomeLayout;