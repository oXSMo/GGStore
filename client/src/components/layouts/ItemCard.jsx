import { useEffect, useId, useState } from "react";
import { Eye, ShoppingCart, X } from "lucide-react";

const formatPrice = (price) => {
  if (typeof price === "number" || (typeof price === "string" && price.trim() !== "")) {
    const numericPrice = Number(price);
    if (Number.isFinite(numericPrice)) {
      return `${new Intl.NumberFormat("fr-FR").format(numericPrice)} DA`;
    }
  }

  return price ? `${price}` : "Price on request";
};

const ItemCard = ({ product, onAddToCart }) => {
  const [isOpen, setIsOpen] = useState(false);
  const titleId = useId();
  const name = product?.name || "Hardware component";
  const category = product?.category || "Hardware";
  const image = product?.image;
  const price = formatPrice(product?.price);
  const oldPrice = product?.oldPrice || product?.oldprice;
  const badge = product?.badge;
  const specs = product?.specs || {};

  useEffect(() => {
    if (!isOpen) return undefined;

    const previousOverflow = document.body.style.overflow;
    const handleKeyDown = (event) => {
      if (event.key === "Escape") setIsOpen(false);
    };

    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  const addToCart = () => {
    onAddToCart?.(product);
    setIsOpen(false);
  };

  return (
    <>
      <article className="group relative flex min-h-[26rem] flex-col justify-between border border-[#87cfff]/35 bg-[#0e0e1c]/90 p-5 shadow-[0_0_16px_rgba(0,183,255,0.08)] transition-[transform,border-color,box-shadow] duration-300 ease-out hover:-translate-y-2 hover:border-[#e10181] hover:shadow-[0_14px_35px_-8px_rgba(0,183,255,0.4),0_0_25px_rgba(225,1,129,0.3)] motion-reduce:transform-none motion-reduce:transition-none">
        {badge && (
          <span className="absolute left-4 top-4 z-10 bg-[#f9f871] px-2 py-1 font-mono text-[10px] font-bold uppercase tracking-wider text-[#13121c] shadow-[0_0_10px_rgba(249,248,113,0.45)]">
            {badge}
          </span>
        )}

        <button
          type="button"
          onClick={() => setIsOpen(true)}
          aria-label={`View ${name} details`}
          className="relative mb-4 flex h-52 w-full items-center justify-center overflow-hidden bg-[#0d0d17] text-[#87cfff] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#00dce5]"
        >
          {image ? (
            <img
              src={image}
              alt={name}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105 motion-reduce:transition-none"
            />
          ) : (
            <ShoppingCart aria-hidden="true" size={40} strokeWidth={1.25} />
          )}
          <span className="absolute right-3 top-3 inline-flex items-center gap-1 border border-[#87cfff]/50 bg-[#0e0e1c]/90 px-2 py-1 font-mono text-[10px] tracking-wider text-[#87cfff] opacity-0 transition-opacity group-hover:opacity-100 group-focus-within:opacity-100">
            <Eye size={13} aria-hidden="true" />
            HUD VIEW
          </span>
        </button>

        <div className="flex-1">
          <p className="mb-1 font-mono text-[10px] uppercase tracking-[0.16em] text-[#00dce5]">
            {category}
          </p>
          <button
            type="button"
            onClick={() => setIsOpen(true)}
            className="mb-2 text-left font-sans text-lg font-bold uppercase tracking-wide text-white transition-colors hover:text-[#ffb0cb] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#00dce5]"
          >
            {name}
          </button>
          <p className="mb-5 line-clamp-3 text-sm leading-5 text-[#a9a9c8]">
            {product?.description || "Explore the specifications for this product."}
          </p>
        </div>

        <div className="flex flex-col gap-3 border-t border-[#87cfff]/20 pt-4">
          <div className="flex items-baseline justify-between gap-2">
            <span className="font-mono text-lg font-bold text-[#ff4d9d]">{price}</span>
            {oldPrice && (
              <span className="font-mono text-xs text-[#a9a9c8] line-through">
                {formatPrice(oldPrice)}
              </span>
            )}
          </div>
          <button
            type="button"
            onClick={() => onAddToCart?.(product)}
            className="inline-flex items-center justify-center gap-2 border border-[#87cfff]/50 bg-[#0e0e1c] px-4 py-2.5 font-mono text-xs font-bold tracking-wider text-white shadow-[0_0_12px_rgba(0,183,255,0.18)] transition-all hover:border-transparent hover:bg-gradient-to-r hover:from-[#00b7ff] hover:to-[#e10181] active:scale-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#00dce5] motion-reduce:transition-none"
          >
            <ShoppingCart size={17} aria-hidden="true" />
            ADD TO CART
          </button>
        </div>
      </article>

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-hidden={!isOpen}
        onClick={(event) => {
          if (event.target === event.currentTarget) setIsOpen(false);
        }}
        className={`fixed inset-0 z-[60] flex items-center justify-center overflow-y-auto bg-[#070711]/80 p-4 backdrop-blur-sm transition-opacity duration-300 motion-reduce:transition-none ${
          isOpen ? "opacity-100" : "pointer-events-none invisible opacity-0"
        }`}
      >
        <section
          className={`relative my-auto w-full max-w-2xl border border-[#00b7ff]/50 bg-[#0e0e1c] p-6 shadow-[0_0_35px_rgba(0,183,255,0.2)] transition-[transform,opacity,filter] duration-300 ${
            isOpen ? "translate-y-0 scale-100 opacity-100 blur-0" : "translate-y-6 scale-95 opacity-0 blur-sm"
          } motion-reduce:transform-none motion-reduce:transition-none`}
        >
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            aria-label="Close product details"
            className="absolute right-4 top-4 rounded p-2 text-[#a9a9c8] transition-colors hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#00dce5]"
          >
            <X size={20} aria-hidden="true" />
          </button>
          <p className="mb-2 pr-10 font-mono text-xs uppercase tracking-[0.16em] text-[#00dce5]">
            {category}
          </p>
          <h2
            id={titleId}
            className="mb-5 pr-10 font-sans text-2xl font-bold uppercase tracking-wide text-white"
          >
            {name}
          </h2>
          {image && (
            <img
              src={image}
              alt={name}
              className="mb-5 max-h-64 w-full object-cover"
            />
          )}
          <p className="mb-5 text-sm leading-6 text-[#a9a9c8]">
            {product?.description || "Explore the specifications for this product."}
          </p>
          {Object.keys(specs).length > 0 && (
            <dl className="mb-5 divide-y divide-[#87cfff]/10 border-y border-[#87cfff]/10">
              {Object.entries(specs).map(([label, value]) => (
                <div key={label} className="flex justify-between gap-4 py-2 text-sm">
                  <dt className="text-[#a9a9c8]">{label}</dt>
                  <dd className="text-right font-semibold text-[#00dce5]">{value}</dd>
                </div>
              ))}
            </dl>
          )}
          <div className="flex flex-wrap items-center justify-between gap-4">
            <span className="font-mono text-xl font-bold text-[#ff4d9d]">{price}</span>
            <button
              type="button"
              onClick={addToCart}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-[#00b7ff] to-[#e10181] px-5 py-3 font-mono text-xs font-bold tracking-wider text-white transition-transform hover:scale-[1.02] active:scale-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#00dce5] motion-reduce:transition-none"
            >
              <ShoppingCart size={17} aria-hidden="true" />
              ADD TO CART
            </button>
          </div>
        </section>
      </div>
    </>
  );
};

export default ItemCard;
