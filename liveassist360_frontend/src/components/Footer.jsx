import React from "react";

function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-4">AutoDepot</h3>
            <p className="mb-4">
              AutoDepot offers a comprehensive platform for buying and selling
              automobiles. We provide a seamless experience, connecting buyers
              and sellers to facilitate smooth transactions.
            </p>
            <p>© {new Date().getFullYear()} AutoDepot. All rights reserved.</p>
          </div>

          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-4">Products</h3>
            <ul className="mb-4">
              <li>
                <a href="#">Find Your Dream Car</a>
              </li>
              <li>
                <a href="#">Sell Your Car</a>
              </li>
              <li>
                <a href="#">Auto Financing</a>
              </li>
              <li>
                <a href="#">Trade-in Your Car</a>
              </li>
              <li>
                <a href="#">Car Insurance</a>
              </li>
            </ul>
          </div>

          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-4">Company</h3>
            <ul className="mb-4">
              <li>
                <a href="#">About AutoDepot</a>
              </li>
              <li>
                <a href="#">Contact Us</a>
              </li>
              <li>
                <a href="#">Pricing</a>
              </li>
              <li>
                <a href="#">Customer Reviews</a>
              </li>
              <li>
                <a href="#">Affiliate Program</a>
              </li>
              <li>
                <a href="#">Careers</a>
              </li>
              <li>
                <a href="#">Privacy Policy</a>
              </li>
              <li>
                <a href="#">Terms of Service</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
