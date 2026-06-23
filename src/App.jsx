import React, { useEffect, useMemo, useState } from "react";
import {
  ArrowRight,
  Check,
  Clover,
  CreditCard,
  Facebook,
  Feather,
  Heart,
  Instagram,
  Leaf,
  Mail,
  Minus,
  Plus,
  RefreshCw,
  Search,
  ShoppingBag,
  Sparkles,
  Truck,
  User,
  X,
  Youtube,
} from "lucide-react";

const asset = (name) => `/assets/generated/${name}.webp`;

const categories = [
  ["Lounge", "category-lounge"],
  ["Sets", "category-sets"],
  ["Dresses", "category-dresses"],
  ["Essentials", "category-essentials"],
  ["Couples Edit", "category-couples"],
];

const products = [
  {
    id: "half-zip",
    name: "Soft Structure Half Zip",
    color: "Taupe",
    price: 88,
    image: "product-half-zip",
    swatches: ["#8b7967", "#d6c9b4", "#f2efe7"],
    variants: [
      { label: "Taupe", image: "product-half-zip" },
      { label: "Oat", image: "product-half-zip-alt" },
      { label: "Stone", image: "product-half-zip-detail" },
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
  },
  {
    id: "hoodie",
    name: "Signature Hoodie",
    color: "Olive",
    price: 78,
    image: "product-hoodie",
    swatches: ["#7d8068", "#b9b2a0", "#4b4d3a"],
    variants: [
      { label: "Olive", image: "product-hoodie" },
      { label: "Moss", image: "product-hoodie-alt" },
      { label: "Sage", image: "product-hoodie-detail" },
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
  },
  {
    id: "sweatpant",
    name: "Wide Leg Sweatpant",
    color: "Bone",
    price: 68,
    image: "product-sweatpant",
    swatches: ["#f0eadc", "#d9cdb8", "#9a8974"],
    variants: [
      { label: "Bone", image: "product-sweatpant" },
      { label: "Cream", image: "product-sweatpant-alt" },
      { label: "Dune", image: "product-sweatpant-detail" },
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
  },
  {
    id: "tank",
    name: "Ribbed Tank",
    color: "Black",
    price: 48,
    image: "product-tank",
    swatches: ["#15120f", "#8b7863", "#dfd3c0"],
    variants: [
      { label: "Black", image: "product-tank" },
      { label: "Cocoa", image: "product-tank-alt" },
      { label: "Sand", image: "product-tank-detail" },
    ],
    sizes: ["XS", "S", "M", "L"],
  },
  {
    id: "jacket",
    name: "Cropped Zip Jacket",
    color: "Chocolate",
    price: 88,
    image: "product-jacket",
    swatches: ["#5d4635", "#a9896c", "#e5d7c0"],
    variants: [
      { label: "Chocolate", image: "product-jacket" },
      { label: "Truffle", image: "product-jacket-alt" },
      { label: "Mocha", image: "product-jacket-detail" },
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
  },
  {
    id: "tee",
    name: "Heavyweight Tee",
    color: "Sand",
    price: 48,
    image: "product-tee",
    swatches: ["#d8c7aa", "#f0e8d9", "#c4b294"],
    variants: [
      { label: "Sand", image: "product-tee" },
      { label: "Ivory", image: "product-tee-alt" },
      { label: "Clay", image: "product-tee-detail" },
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
  },
];

const looks = [
  {
    name: "The City Set",
    image: "look-city",
    items: ["Soft Structure Half Zip", "Wide Leg Sweatpant", "Essential Tee"],
    price: "$156.00",
  },
  {
    name: "The Airport Set",
    image: "look-airport",
    items: ["Signature Hoodie", "Wide Leg Sweatpant", "Crew Sock"],
    price: "$146.00",
  },
  {
    name: "The Weekend Set",
    image: "look-weekend",
    items: ["Cropped Zip Jacket", "Ribbed Tank", "Wide Leg Pant"],
    price: "$162.00",
  },
  {
    name: "The Vacay Set",
    image: "look-vacay",
    items: ["Linen Shirt", "Linen Short", "Tank Top"],
    price: "$148.00",
  },
];

const social = [
  "insta-couple",
  "insta-white-set",
  "insta-olive",
  "insta-brown",
  "insta-linen",
  "insta-taupe",
  "look-city",
  "look-vacay",
  "category-essentials",
  "category-lounge",
];

const money = (value) => `$${value.toFixed(2)}`;

async function sendSiteMessage(payload) {
  try {
    const response = await fetch("/api/message", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error("Message endpoint unavailable");
    }

    return response.json();
  } catch (error) {
    const fallback = {
      ...payload,
      id: `local-${Date.now()}`,
      receivedAt: new Date().toISOString(),
    };
    const saved = JSON.parse(localStorage.getItem("blaqueLotusMessages") || "[]");
    localStorage.setItem("blaqueLotusMessages", JSON.stringify([fallback, ...saved].slice(0, 20)));
    return { ok: true, local: true, message: fallback };
  }
}

function Logo({ footer = false }) {
  return (
    <div className={footer ? "logo logoFooter" : "logo"} aria-label="Blaque Lotus">
      <span>BLAQUE</span>
      <span>LOTUS</span>
    </div>
  );
}

function SectionHeader({ title, action, onAction }) {
  return (
    <div className="sectionHeader" data-reveal>
      <h2>{title}</h2>
      {action ? (
        <button type="button" className="textLink" onClick={onAction}>
          {action} <ArrowRight size={17} strokeWidth={1.5} />
        </button>
      ) : null}
    </div>
  );
}

function App() {
  const [selectedVariants, setSelectedVariants] = useState({});
  const [wishlist, setWishlist] = useState(() => new Set());
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [quickView, setQuickView] = useState(null);
  const [query, setQuery] = useState("");
  const [toast, setToast] = useState("");
  const [noteOpen, setNoteOpen] = useState(false);
  const [sending, setSending] = useState("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("isVisible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 },
    );

    document.querySelectorAll("[data-reveal]").forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!toast) return;
    const id = window.setTimeout(() => setToast(""), 2600);
    return () => window.clearTimeout(id);
  }, [toast]);

  const filteredProducts = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return products;
    return products.filter((product) =>
      [product.name, product.color, ...product.variants.map((variant) => variant.label)]
        .join(" ")
        .toLowerCase()
        .includes(normalized),
    );
  }, [query]);

  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const selectVariant = (productId, index) => {
    setSelectedVariants((current) => ({ ...current, [productId]: index }));
  };

  const addToCart = (product, size = "M") => {
    const variantIndex = selectedVariants[product.id] || 0;
    const variant = product.variants[variantIndex];
    const cartId = `${product.id}-${variant.label}-${size}`;
    setCart((items) => {
      const existing = items.find((item) => item.cartId === cartId);
      if (existing) {
        return items.map((item) =>
          item.cartId === cartId ? { ...item, quantity: item.quantity + 1 } : item,
        );
      }
      return [
        ...items,
        {
          cartId,
          productId: product.id,
          name: product.name,
          color: variant.label,
          image: variant.image,
          price: product.price,
          quantity: 1,
          size,
        },
      ];
    });
    setCartOpen(true);
    setToast(`${product.name} added to bag`);
  };

  const updateCart = (cartId, quantity) => {
    setCart((items) =>
      quantity <= 0
        ? items.filter((item) => item.cartId !== cartId)
        : items.map((item) => (item.cartId === cartId ? { ...item, quantity } : item)),
    );
  };

  const toggleWishlist = (id) => {
    setWishlist((current) => {
      const next = new Set(current);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const scrollToSection = (selector) => {
    document.querySelector(selector)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleNewsletter = async (event) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    setSending("newsletter");
    await sendSiteMessage({
      type: "newsletter",
      email: form.get("email"),
      source: "footer-newsletter",
    });
    event.currentTarget.reset();
    setSending("");
    setToast("You are on the list");
  };

  const handleConcierge = async (event) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    setSending("concierge");
    await sendSiteMessage({
      type: "concierge",
      name: form.get("name"),
      email: form.get("contactEmail"),
      message: form.get("message"),
      cart: cart.map(({ name, color, size, quantity }) => ({ name, color, size, quantity })),
    });
    event.currentTarget.reset();
    setSending("");
    setToast("Message sent to Blaque Lotus");
  };

  const handleCheckoutMessage = async () => {
    setSending("checkout");
    await sendSiteMessage({
      type: "checkout-intent",
      message: "Customer started checkout from storefront cart.",
      cart,
      total: cartTotal,
    });
    setSending("");
    setToast("Checkout note sent");
  };

  return (
    <div className="siteShell">
      <header>
        <div className="announcement">
          <div>
            <Truck size={14} strokeWidth={1.6} />
            Free U.S. shipping on orders $150+
          </div>
          <button type="button" className="announcementCenter" onClick={() => scrollToSection(".productsSection")}>
            New drop live <span>|</span> Shop now
          </button>
          <div>
            <RefreshCw size={13} strokeWidth={1.7} />
            Easy returns & exchanges
          </div>
        </div>

        <nav className="nav" aria-label="Main navigation">
          <div className="navGroup navLeft">
            <button className="iconButton" aria-label="Search" onClick={() => setSearchOpen(true)}>
              <Search size={22} strokeWidth={1.4} />
            </button>
            <button type="button" onClick={() => scrollToSection(".productsSection")}>New In</button>
            <button type="button" onClick={() => scrollToSection(".categoryGrid")}>Women</button>
            <button type="button" onClick={() => scrollToSection(".productsSection")}>Him</button>
            <button type="button" onClick={() => scrollToSection(".looksSection")}>Sets</button>
          </div>
          <button type="button" className="brandLink" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
            <Logo />
          </button>
          <div className="navGroup navRight">
            <button type="button" onClick={() => scrollToSection(".categoryGrid")}>Couples Edit</button>
            <button type="button" onClick={() => scrollToSection(".productsSection")}>Best Sellers</button>
            <button type="button" onClick={() => scrollToSection(".looksSection")}>Sale</button>
            <button className="iconButton" aria-label="Styling concierge" onClick={() => setNoteOpen(true)}>
              <User size={21} strokeWidth={1.4} />
            </button>
            <button className="iconButton cartIconButton" aria-label="Cart" onClick={() => setCartOpen(true)}>
              <ShoppingBag size={20} strokeWidth={1.4} />
              {cartCount ? <span>{cartCount}</span> : null}
            </button>
          </div>
        </nav>
      </header>

      <main>
        <section className="hero">
          <div className="retroLines" aria-hidden="true">
            <i />
            <i />
            <i />
          </div>
          <img src={asset("hero-couple")} alt="" className="heroImage" />
          <div className="heroCopy">
            <h1>
              City Play.
              <br />
              Luxe Lines.
            </h1>
            <p>Cartoon chic for her and the one beside her.</p>
            <div className="heroActions">
              <button className="button buttonDark" type="button" onClick={() => scrollToSection(".productsSection")}>
                Shop Women
              </button>
              <button className="button buttonLight" type="button" onClick={() => scrollToSection(".categoryGrid")}>
                Shop Couples
              </button>
            </div>
          </div>
        </section>

        <section className="categoryGrid" aria-label="Featured categories" data-reveal>
          {categories.map(([label, image]) => (
            <button type="button" className="categoryTile" key={label} onClick={() => scrollToSection(".productsSection")}>
              <img src={asset(image)} alt="" />
              <span>{label}</span>
              <small>Shop now</small>
            </button>
          ))}
        </section>

        <section className="sectionBlock productsSection">
          <SectionHeader title="Best Sellers" action="View All" onAction={() => setSearchOpen(true)} />
          <div className="productGrid">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                selectedIndex={selectedVariants[product.id] || 0}
                isWished={wishlist.has(product.id)}
                onVariant={selectVariant}
                onWish={toggleWishlist}
                onQuickView={setQuickView}
                onAdd={addToCart}
              />
            ))}
          </div>
        </section>

        <section className="fabricBand" data-reveal>
          <img src={asset("fabric-story")} alt="Blaque Lotus fabric detail" />
          <div className="fabricCopy">
            <span>Fabric. Fit. Feel.</span>
            <h2>Our Off Duty Standard.</h2>
            <p>
              Every piece is crafted in premium, breathable fabrics with a fit
              that moves with you. Made to be worn well. Designed to last.
            </p>
            <div className="fabricIcons">
              <div>
                <Sparkles size={24} strokeWidth={1.1} />
                <small>Premium Fabrics</small>
              </div>
              <div>
                <Clover size={24} strokeWidth={1.1} />
                <small>Luxe Comfort</small>
              </div>
              <div>
                <Feather size={24} strokeWidth={1.1} />
                <small>Timeless Design</small>
              </div>
              <div>
                <Leaf size={24} strokeWidth={1.1} />
                <small>Made To Travel</small>
              </div>
            </div>
            <button className="button buttonLight fabricButton" type="button" onClick={() => setNoteOpen(true)}>
              Our Fabric Story
            </button>
          </div>
        </section>

        <section className="sectionBlock looksSection">
          <SectionHeader title="Shop The Look" action="View All Looks" onAction={() => scrollToSection(".looksSection")} />
          <div className="lookGrid">
            {looks.map((look) => (
              <article className="lookCard" key={look.name} data-reveal>
                <img src={asset(look.image)} alt={look.name} />
                <div>
                  <h3>{look.name}</h3>
                  <p>{look.items.join("\n")}</p>
                  <strong>{look.price}</strong>
                  <button type="button" onClick={() => addToCart(products[0])}>Shop The Look</button>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="sectionBlock socialSection">
          <SectionHeader title="Off Duty. Everywhere." action="See More On Instagram" onAction={() => setNoteOpen(true)} />
          <div className="socialStrip" data-reveal>
            {social.map((image, index) => (
              <img src={asset(image)} alt="" key={`${image}-${index}`} />
            ))}
          </div>
        </section>
      </main>

      <footer>
        <section className="newsletter" aria-label="Newsletter signup">
          <Mail size={44} strokeWidth={1.1} />
          <div>
            <h2>Be The First To Know</h2>
            <p>New drops, exclusive access, and style delivered straight to your inbox.</p>
          </div>
          <form onSubmit={handleNewsletter}>
            <label htmlFor="email">Email address</label>
            <input id="email" name="email" type="email" placeholder="Enter your email" required />
            <button type="submit" disabled={sending === "newsletter"}>
              {sending === "newsletter" ? "Sending" : "Subscribe"}
            </button>
          </form>
        </section>
        <section className="footerMain">
          <div className="footerBrand">
            <Logo footer />
            <p>Luxury street essentials for her. Made to wear. Styled to be.</p>
            <div className="socialIcons" aria-label="Social links">
              <Instagram size={16} strokeWidth={1.35} />
              <Facebook size={16} strokeWidth={1.35} />
              <Youtube size={17} strokeWidth={1.35} />
            </div>
            <small>© 2026 Blaque Lotus. All rights reserved.</small>
          </div>
          <FooterColumn title="Shop" links={["New In", "Women", "Him", "Sets", "Couples Edit", "Best Sellers", "Sale"]} />
          <FooterColumn
            title="Customer Care"
            links={["FAQ", "Shipping", "Returns & Exchanges", "Size Guide", "Care Guide", "Contact Us"]}
            onContact={() => setNoteOpen(true)}
          />
          <FooterColumn title="About" links={["Our Story", "Sustainability", "Careers", "Affiliates", "Press"]} />
          <FooterColumn title="Legal" links={["Terms & Conditions", "Privacy Policy", "Accessibility"]} />
          <div className="paymentRow" aria-label="Accepted payment methods">
            {["Shop", "Pay", "GPay", "Klarna", "PayPal", "MC", "Visa", "Amex"].map((label) => (
              <span key={label}>
                {label === "MC" ? <CreditCard size={13} strokeWidth={1.4} /> : label}
              </span>
            ))}
          </div>
        </section>
      </footer>

      <SearchPanel
        open={searchOpen}
        query={query}
        setQuery={setQuery}
        products={filteredProducts}
        onClose={() => setSearchOpen(false)}
        onQuickView={(product) => {
          setQuickView(product);
          setSearchOpen(false);
        }}
      />
      <CartDrawer
        open={cartOpen}
        cart={cart}
        total={cartTotal}
        sending={sending === "checkout"}
        onClose={() => setCartOpen(false)}
        onUpdate={updateCart}
        onCheckout={handleCheckoutMessage}
      />
      <ConciergeDrawer
        open={noteOpen}
        sending={sending === "concierge"}
        onClose={() => setNoteOpen(false)}
        onSubmit={handleConcierge}
      />
      {quickView ? (
        <QuickView
          product={quickView}
          selectedIndex={selectedVariants[quickView.id] || 0}
          onVariant={selectVariant}
          onAdd={addToCart}
          onClose={() => setQuickView(null)}
        />
      ) : null}
      <div className={toast ? "toast toastVisible" : "toast"} role="status">
        <Check size={16} strokeWidth={1.6} />
        {toast}
      </div>
    </div>
  );
}

function ProductCard({ product, selectedIndex, isWished, onVariant, onWish, onQuickView, onAdd }) {
  const variant = product.variants[selectedIndex];
  return (
    <article className="productCard" data-reveal>
      <div className="productImage">
        <button type="button" className="imageButton" onClick={() => onQuickView(product)} aria-label={`View ${product.name}`}>
          <img src={asset(variant.image)} alt={product.name} />
        </button>
        <button
          className={isWished ? "heartButton heartButtonActive" : "heartButton"}
          aria-label={`Save ${product.name}`}
          onClick={() => onWish(product.id)}
        >
          <Heart size={20} strokeWidth={1.45} />
        </button>
        <button type="button" className="quickAdd" onClick={() => onAdd(product)}>
          Quick Add
        </button>
      </div>
      <h3>{product.name}</h3>
      <p>{variant.label}</p>
      <strong>{money(product.price)}</strong>
      <div className="swatches" aria-label={`${product.name} colors`}>
        {product.swatches.map((color, index) => (
          <button
            type="button"
            className={index === selectedIndex ? "swatchActive" : ""}
            key={color}
            style={{ background: color }}
            aria-label={`${product.name} ${product.variants[index].label}`}
            onClick={() => onVariant(product.id, index)}
          />
        ))}
      </div>
    </article>
  );
}

function SearchPanel({ open, query, setQuery, products, onClose, onQuickView }) {
  return (
    <aside className={open ? "panelOverlay panelOverlayOpen" : "panelOverlay"} aria-hidden={!open}>
      <div className="searchPanel">
        <button className="closeButton" type="button" onClick={onClose} aria-label="Close search">
          <X size={18} strokeWidth={1.5} />
        </button>
        <h2>Find Your Fit</h2>
        <label htmlFor="searchInput">Search products</label>
        <input
          id="searchInput"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search color, set, or style"
        />
        <div className="searchResults">
          {products.map((product) => (
            <button type="button" key={product.id} onClick={() => onQuickView(product)}>
              <img src={asset(product.image)} alt="" />
              <span>
                <strong>{product.name}</strong>
                <small>{product.color} · {money(product.price)}</small>
              </span>
            </button>
          ))}
        </div>
      </div>
    </aside>
  );
}

function CartDrawer({ open, cart, total, sending, onClose, onUpdate, onCheckout }) {
  return (
    <aside className={open ? "cartDrawer cartDrawerOpen" : "cartDrawer"} aria-hidden={!open}>
      <div className="drawerHeader">
        <h2>Your Bag</h2>
        <button className="closeButton" type="button" onClick={onClose} aria-label="Close cart">
          <X size={18} strokeWidth={1.5} />
        </button>
      </div>
      {cart.length ? (
        <>
          <div className="cartItems">
            {cart.map((item) => (
              <article key={item.cartId} className="cartItem">
                <img src={asset(item.image)} alt="" />
                <div>
                  <h3>{item.name}</h3>
                  <p>{item.color} · {item.size}</p>
                  <strong>{money(item.price)}</strong>
                  <div className="qtyControl">
                    <button type="button" onClick={() => onUpdate(item.cartId, item.quantity - 1)} aria-label="Decrease quantity">
                      <Minus size={13} />
                    </button>
                    <span>{item.quantity}</span>
                    <button type="button" onClick={() => onUpdate(item.cartId, item.quantity + 1)} aria-label="Increase quantity">
                      <Plus size={13} />
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
          <div className="cartFooter">
            <p>
              <span>Subtotal</span>
              <strong>{money(total)}</strong>
            </p>
            <button className="button buttonDark" type="button" onClick={onCheckout} disabled={sending}>
              {sending ? "Sending" : "Send Checkout Note"}
            </button>
          </div>
        </>
      ) : (
        <div className="emptyCart">
          <p>Your bag is waiting for something soft.</p>
        </div>
      )}
    </aside>
  );
}

function ConciergeDrawer({ open, sending, onClose, onSubmit }) {
  return (
    <aside className={open ? "cartDrawer cartDrawerOpen" : "cartDrawer"} aria-hidden={!open}>
      <div className="drawerHeader">
        <h2>Styling Note</h2>
        <button className="closeButton" type="button" onClick={onClose} aria-label="Close styling form">
          <X size={18} strokeWidth={1.5} />
        </button>
      </div>
      <form className="conciergeForm" onSubmit={onSubmit}>
        <p>Send Blaque Lotus a fit question, event note, or styling request.</p>
        <label htmlFor="name">Name</label>
        <input id="name" name="name" placeholder="Your name" required />
        <label htmlFor="contactEmail">Email</label>
        <input id="contactEmail" name="contactEmail" type="email" placeholder="you@example.com" required />
        <label htmlFor="message">Message</label>
        <textarea id="message" name="message" rows="6" placeholder="Tell us what you want styled." required />
        <button className="button buttonDark" type="submit" disabled={sending}>
          {sending ? "Sending" : "Send Message"}
        </button>
      </form>
    </aside>
  );
}

function QuickView({ product, selectedIndex, onVariant, onAdd, onClose }) {
  const [size, setSize] = useState(product.sizes[2] || product.sizes[0]);
  const variant = product.variants[selectedIndex];

  return (
    <div className="modalOverlay" role="dialog" aria-modal="true" aria-labelledby="quickViewTitle">
      <article className="quickView">
        <button className="closeButton" type="button" onClick={onClose} aria-label="Close quick view">
          <X size={18} strokeWidth={1.5} />
        </button>
        <div className="quickGallery">
          <img src={asset(variant.image)} alt={product.name} />
          <div>
            {product.variants.map((item, index) => (
              <button
                type="button"
                key={item.image}
                className={index === selectedIndex ? "thumbActive" : ""}
                onClick={() => onVariant(product.id, index)}
              >
                <img src={asset(item.image)} alt="" />
              </button>
            ))}
          </div>
        </div>
        <div className="quickInfo">
          <span>Best Seller</span>
          <h2 id="quickViewTitle">{product.name}</h2>
          <p>{variant.label} · {money(product.price)}</p>
          <div className="sizePicker">
            {product.sizes.map((item) => (
              <button
                type="button"
                key={item}
                className={item === size ? "sizeActive" : ""}
                onClick={() => setSize(item)}
              >
                {item}
              </button>
            ))}
          </div>
          <button className="button buttonDark" type="button" onClick={() => onAdd(product, size)}>
            Add To Bag
          </button>
        </div>
      </article>
    </div>
  );
}

function FooterColumn({ title, links, onContact }) {
  return (
    <div className="footerColumn">
      <h3>{title}</h3>
      {links.map((link) => (
        <button type="button" key={link} onClick={link === "Contact Us" ? onContact : undefined}>
          {link}
        </button>
      ))}
    </div>
  );
}

export default App;
