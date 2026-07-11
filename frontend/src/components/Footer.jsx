const Footer = () => {
  return (
    <footer className="bg-secondary text-white pt-12 pb-6 mt-12">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
        <div>
          <h3 className="text-2xl font-bold text-primary mb-4">Dubai Food & Pizza Hut</h3>
          <p className="text-gray-400 mb-4">
            Introducing in Chowk Azam. The Taste Expert!
          </p>
          <p className="text-gray-300">
            Opposite Akbar Plaza Near Waqas Nazir Printers<br />
            Layyah Road, Chowk Azam (Layyah)
          </p>
        </div>
        <div>
          <h4 className="text-xl font-bold mb-4">Quick Links</h4>
          <ul className="space-y-2 text-gray-400">
            <li><a href="/menu" className="hover:text-primary transition-colors">Full Menu</a></li>
            <li><a href="/deals" className="hover:text-primary transition-colors">Exclusive Deals</a></li>
            <li><a href="/cart" className="hover:text-primary transition-colors">Cart</a></li>
          </ul>
        </div>
        <div>
          <h4 className="text-xl font-bold mb-4">Contact & Timings</h4>
          <p className="text-gray-300 mb-2">WhatsApp / Call:</p>
          <p className="text-primary font-bold text-lg mb-4">0308-8020784<br/>0345-6420784</p>
          <p className="text-gray-300 mb-2">Shop Timing:</p>
          <p className="text-accent font-bold">10:00 AM to 01:30 Midnight</p>
        </div>
      </div>
      <div className="text-center text-gray-500 border-t border-gray-800 pt-6">
        &copy; {new Date().getFullYear()} Dubai Food & Pizza Hut. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
