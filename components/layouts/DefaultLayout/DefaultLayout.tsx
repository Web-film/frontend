import Footer from "@/components/layouts/Footer";
import Navigation from "@/components/layouts/Navigation";
import 'swiper/css';
import 'swiper/css/pagination';

const DefaultLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div>
      <Navigation />
      {children}
      <Footer />
    </div>
  );
};

export default DefaultLayout;
