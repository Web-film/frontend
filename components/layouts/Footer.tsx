import LogoVn from "@/public/images/vn_flag.svg";
import Image from "next/image";

function Footer() {
  return (
    <footer className="py-8 relative">
      <div className="flex items-center py-1.25 px-4 rounded-lg w-max" style={{ backgroundColor: "var(--bg-red)" }}>
        <Image src={LogoVn} className="mr-2 h-6 w-6" alt="Logo" />
        <span>Hoàng Sa & Trường Sa là của Việt Nam!</span>
      </div>
    </footer>
  );
}

export default Footer;
