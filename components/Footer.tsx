export function Footer() {
  return (
    <footer className="border-t border-brand-border bg-white py-12">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
          <div>
            <h3 className="mb-3 text-xs font-semibold tracking-widest uppercase">Shop</h3>
            <ul className="space-y-2 text-xs text-brand-muted">
              <li><a href="/products/fantasmagory" className="hover:text-brand-black">Fragrance</a></li>
              <li><a href="#" className="hover:text-brand-black">Makeup</a></li>
              <li><a href="#" className="hover:text-brand-black">Skincare</a></li>
              <li><a href="#" className="hover:text-brand-black">Gifts</a></li>
            </ul>
          </div>
          <div>
            <h3 className="mb-3 text-xs font-semibold tracking-widest uppercase">Services</h3>
            <ul className="space-y-2 text-xs text-brand-muted">
              <li><a href="#" className="hover:text-brand-black">Personalisation</a></li>
              <li><a href="#" className="hover:text-brand-black">Gift Wrapping</a></li>
              <li><a href="#" className="hover:text-brand-black">Store Locator</a></li>
            </ul>
          </div>
          <div>
            <h3 className="mb-3 text-xs font-semibold tracking-widest uppercase">Help</h3>
            <ul className="space-y-2 text-xs text-brand-muted">
              <li><a href="#" className="hover:text-brand-black">Contact Us</a></li>
              <li><a href="#" className="hover:text-brand-black">Delivery & Returns</a></li>
              <li><a href="#" className="hover:text-brand-black">FAQs</a></li>
            </ul>
          </div>
          <div>
            <h3 className="mb-3 text-xs font-semibold tracking-widest uppercase">Us</h3>
            <ul className="space-y-2 text-xs text-brand-muted">
              <li><a href="#" className="hover:text-brand-black">Our Story</a></li>
              <li><a href="#" className="hover:text-brand-black">Sustainability</a></li>
              <li><a href="#" className="hover:text-brand-black">Careers</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-10 border-t border-brand-border pt-6 text-center text-[10px] tracking-widest text-brand-muted">
          © {new Date().getFullYear()} Us. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
