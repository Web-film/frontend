import Footer from "@/components/layouts/Footer";
import Navigation from "@/components/layouts/Navigation";

const DefaultLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="container">
      <Navigation />
      {children}
      <Footer />
    </div>
  );
};

export default DefaultLayout;
