import { Outlet } from "react-router";
import Header from "../../Components/ui/Header";
import Footer from "../../Components/ui/Footer";

const GuestLayout = () => {
  return (
    <>
      <Header />
      <main className="flex min-h-[95.7vh] w-full items-center justify-center gap-2 dark:bg-gray-800 xl:min-h-[93.7vh] 2xl:min-h-[95.7vh]">
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default GuestLayout;
