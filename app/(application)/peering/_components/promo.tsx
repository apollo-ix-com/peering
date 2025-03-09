import Image from "next/image";
import Link from "next/link";

const Promo: React.FC = () => (
  <div>
    <Link className="logo-link nk-sidebar-logo" href="/peering/register">
      {/* <Image
        className="logo-light logo-img"
        src="/images/logo.png"
        alt="logo"
        style={{ width: "70%", height: "auto" }}
        width={180} // Adjust based on actual logo size
        height={100}
        priority
      /> */}
    </Link>

    <div className="text-block wide-xs mx-auto">
      <h5 className="text-white ucap">Peering request form</h5>

      <Image
        alt=""
        className="nk-survey-gfx mt-5"
        height={0} // Use a more appropriate height
        priority
        src="/images/application/form.svg"
        style={{ width: "60%", height: "auto" }}
        width={0} // Use a more appropriate width
      />

      <p className="text-soft mt-3">
        Join our network and enhance your connectivity. Submit your peering
        request today and collaborate with a reliable, high-performance
        infrastructure.
      </p>

      <p className="text-soft">
        Fill out the form with your AS Number, contact details, and preferred
        location, and our team will get back to you shortly.
      </p>
    </div>

    <div>
      <p className="mt-2">© 2024 SmartCyber!!.</p>
    </div>
  </div>
);

export default Promo;
