import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <footer className="mt-12 bg-[#111111] text-white">
      <div className="mx-auto w-[92%] max-w-7xl py-12">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          <div>
            <h2 className="mb-4 text-2xl font-bold tracking-wide text-white">
              DevBazzar
            </h2>
            <p className="max-w-[280px] text-sm leading-6 text-gray-300">
              Your one-stop shop for all your needs with trusted quality,
              exciting offers, and fast delivery.
            </p>
          </div>

          <div>
            <h2 className="mb-4 text-lg font-semibold text-[#DB4444]">Support</h2>
            <p className="mb-2 text-sm text-gray-300">
              111 Bijoy Sarani, Dhaka, DH 1515, Bangladesh
            </p>
            <p className="mb-2 text-sm text-gray-300">devbazzarofficial@gmail.com</p>
            <p className="text-sm text-gray-300">+91 7202001502</p>
          </div>

          <div>
            <h2 className="mb-4 text-lg font-semibold text-[#DB4444]">Account</h2>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>
                <Link to="/account" className="transition-colors hover:text-[#DB4444]">
                  My Account
                </Link>
              </li>
              <li>
                <Link to="/login" className="transition-colors hover:text-[#DB4444]">
                  Login / Register
                </Link>
              </li>
              <li>
                <Link to="/cart" className="transition-colors hover:text-[#DB4444]">
                  Cart
                </Link>
              </li>
              <li>
                <Link to="/product" className="transition-colors hover:text-[#DB4444]">
                  Shop
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="mb-4 text-lg font-semibold text-[#DB4444]">Quick Links</h2>
            <ul className="space-y-2 text-sm text-gray-300">
              <li className="transition-colors hover:text-white">Privacy Policy</li>
              <li className="transition-colors hover:text-white">Terms of Use</li>
              <li className="transition-colors hover:text-white">FAQ</li>
              <li className="transition-colors hover:text-white">Contact</li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 sm:flex-row">
          <p className="text-sm text-gray-400">© 2026 DevBazzar. All Rights Reserved.</p>
          <p className="text-xs tracking-wide text-gray-500">Built for modern shopping experiences</p>
        </div>
      </div>
    </footer>

  );
};

export default Footer;
