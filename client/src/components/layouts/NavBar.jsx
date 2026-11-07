import { useState } from "react";
import { Link } from "react-router-dom";
import { Bell, Menu, Search, ShoppingCart, X } from "lucide-react";

const navigationLinks = [
  { label: "Home", href: "/" },
  { label: "Store", href: "/#store" },
  { label: "Categories", href: "/#categories" },
  { label: "Deals", href: "/#deals" },
  { label: "Contact", href: "/#contact" },
];

const NavBar = ({
  cartCount = 0,
  onCartClick,
  onNotificationClick,
  onSearch,
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (event) => {
    event.preventDefault();
    onSearch?.(searchQuery.trim());
  };

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className="sticky top-0 z-50 border-b border-[#87cfff]/30 bg-[#0e0e1c]/85 text-[#87cfff] shadow-[0_0_16px_rgba(0,183,255,0.2)] backdrop-blur-md">
      <div className="mx-auto flex w-full max-w-[1200px] items-center justify-between gap-4 px-5 py-4 sm:px-6">
        <Link
          to="/"
          onClick={closeMenu}
          aria-label="GG Store home"
          className="group flex shrink-0 items-center gap-1 font-mono text-xl font-bold tracking-wider focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#00dce5]"
        >
          <span className="text-[#e10181] transition-[text-shadow] group-hover:[text-shadow:0_0_12px_rgba(225,1,129,0.8)]">
            GG
          </span>
          <span className="text-[#00b7ff] transition-[text-shadow] group-hover:[text-shadow:0_0_12px_rgba(0,183,255,0.8)]">
            STORE
          </span>
          <span className="ml-1 h-2 w-2 animate-pulse rounded-full bg-[#00dce5] shadow-[0_0_10px_#00dce5] motion-reduce:animate-none" />
        </Link>

        <nav aria-label="Main navigation" className="hidden items-center gap-7 md:flex">
          {navigationLinks.map(({ label, href }) => (
            <a
              key={label}
              href={href}
              className={`border-b-2 pb-1 font-mono text-xs tracking-wider transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#00dce5] ${
                label === "Home"
                  ? "border-[#00dce5] text-[#00dce5]"
                  : "border-transparent text-[#a9a9c8] hover:text-white"
              }`}
            >
              {label}
            </a>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          <form
            role="search"
            onSubmit={handleSearch}
            className="hidden items-center border border-[#87cfff]/40 bg-[#0e0e1c] px-2 focus-within:border-[#e10181] focus-within:shadow-[0_0_10px_rgba(225,1,129,0.4)] lg:flex"
          >
            <Search size={17} aria-hidden="true" className="text-[#87cfff]" />
            <input
              type="search"
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              aria-label="Search products"
              placeholder="QUERY HARDWARE..."
              className="w-40 border-0 bg-transparent px-2 py-2 font-mono text-[10px] text-white placeholder:text-[#a9a9c8] focus:ring-0"
            />
          </form>

          <button
            type="button"
            aria-label="Notifications"
            onClick={onNotificationClick}
            className="rounded p-2 text-[#a9a9c8] transition-colors hover:text-[#87cfff] active:scale-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#00dce5]"
          >
            <Bell size={20} aria-hidden="true" />
          </button>
          <button
            type="button"
            aria-label={`Cart${cartCount > 0 ? `, ${cartCount} items` : ""}`}
            onClick={onCartClick}
            className="relative rounded p-2 text-[#a9a9c8] transition-colors hover:text-[#00dce5] active:scale-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#00dce5]"
          >
            <ShoppingCart size={20} aria-hidden="true" />
            {cartCount > 0 && (
              <span className="absolute -right-1 -top-1 min-w-5 rounded-full border border-white/20 bg-[#e10181] px-1 text-center font-mono text-[10px] font-bold leading-5 text-white shadow-[0_0_10px_rgba(225,1,129,0.65)]">
                {cartCount}
              </span>
            )}
          </button>
          <button
            type="button"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-navigation"
            onClick={() => setIsMenuOpen((open) => !open)}
            className="rounded p-2 text-[#a9a9c8] transition-colors hover:text-[#87cfff] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#00dce5] md:hidden"
          >
            {isMenuOpen ? <X size={21} aria-hidden="true" /> : <Menu size={21} aria-hidden="true" />}
          </button>
        </div>
      </div>

      <nav
        id="mobile-navigation"
        aria-label="Mobile navigation"
        inert={!isMenuOpen}
        className={`grid overflow-hidden border-t border-[#87cfff]/15 px-5 transition-[grid-template-rows,opacity] duration-200 md:hidden ${
          isMenuOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] border-t-transparent opacity-0"
        } motion-reduce:transition-none`}
      >
        <div className="min-h-0">
          <div className="flex flex-col py-2">
            {navigationLinks.map(({ label, href }) => (
              <a
                key={label}
                href={href}
                onClick={closeMenu}
                className="border-b border-[#87cfff]/10 py-3 font-mono text-xs tracking-wider text-[#a9a9c8] transition-colors last:border-0 hover:text-[#00dce5] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#00dce5]"
              >
                {label}
              </a>
            ))}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default NavBar;
