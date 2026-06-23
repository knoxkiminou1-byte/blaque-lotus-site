import React from "react";
import {
  ArrowRight,
  Clover,
  CreditCard,
  Facebook,
  Feather,
  Heart,
  Instagram,
  Leaf,
  Mail,
  RefreshCw,
  Search,
  ShoppingBag,
  Sparkles,
  Truck,
  User,
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
    name: "Soft Structure Half Zip",
    color: "Taupe",
    price: "$88.00",
    image: "product-half-zip",
    swatches: ["#8b7967", "#d6c9b4", "#f2efe7"],
  },
  {
    name: "Signature Hoodie",
    color: "Olive",
    price: "$78.00",
    image: "product-hoodie",
    swatches: ["#7d8068", "#b9b2a0", "#4b4d3a"],
  },
  {
    name: "Wide Leg Sweatpant",
    color: "Bone",
    price: "$68.00",
    image: "product-sweatpant",
    swatches: ["#f0eadc", "#d9cdb8", "#9a8974"],
  },
  {
    name: "Ribbed Tank",
    color: "Black",
    price: "$48.00",
    image: "product-tank",
    swatches: ["#15120f", "#8b7863", "#dfd3c0"],
  },
  {
    name: "Cropped Zip Jacket",
    color: "Chocolate",
    price: "$88.00",
    image: "product-jacket",
    swatches: ["#5d4635", "#a9896c", "#e5d7c0"],
  },
  {
    name: "Heavyweight Tee",
    color: "Sand",
    price: "$48.00",
    image: "product-tee",
    swatches: ["#d8c7aa", "#f0e8d9", "#c4b294"],
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

function Logo({ footer = false }) {
  return (
    <div className={footer ? "logo logoFooter" : "logo"} aria-label="Blaque Lotus">
      <span>BLAQUE</span>
      <span>LOTUS</span>
    </div>
  );
}

function SectionHeader({ title, action }) {
  return (
    <div className="sectionHeader">
      <h2>{title}</h2>
      {action ? (
        <a href="#" className="textLink">
          {action} <ArrowRight size={17} strokeWidth={1.5} />
        </a>
      ) : null}
    </div>
  );
}

function App() {
  return (
    <div className="siteShell">
      <header>
        <div className="announcement">
          <div>
            <Truck size={14} strokeWidth={1.6} />
            Free U.S. shipping on orders $150+
          </div>
          <div className="announcementCenter">
            New drop live <span>|</span> Shop now
          </div>
          <div>
            <RefreshCw size={13} strokeWidth={1.7} />
            Easy returns & exchanges
          </div>
        </div>

        <nav className="nav" aria-label="Main navigation">
          <div className="navGroup navLeft">
            <button className="iconButton" aria-label="Search">
              <Search size={22} strokeWidth={1.4} />
            </button>
            <a href="#">New In</a>
            <a href="#">Women</a>
            <a href="#">Him</a>
            <a href="#">Sets</a>
          </div>
          <a href="#" className="brandLink">
            <Logo />
          </a>
          <div className="navGroup navRight">
            <a href="#">Couples Edit</a>
            <a href="#">Best Sellers</a>
            <a href="#">Sale</a>
            <button className="iconButton" aria-label="Account">
              <User size={21} strokeWidth={1.4} />
            </button>
            <button className="iconButton" aria-label="Cart">
              <ShoppingBag size={20} strokeWidth={1.4} />
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
              <a href="#" className="button buttonDark">
                Shop Women
              </a>
              <a href="#" className="button buttonLight">
                Shop Couples
              </a>
            </div>
          </div>
        </section>

        <section className="categoryGrid" aria-label="Featured categories">
          {categories.map(([label, image]) => (
            <a href="#" className="categoryTile" key={label}>
              <img src={asset(image)} alt="" />
              <span>{label}</span>
              <small>Shop now</small>
            </a>
          ))}
        </section>

        <section className="sectionBlock productsSection">
          <SectionHeader title="Best Sellers" action="View All" />
          <div className="productGrid">
            {products.map((product) => (
              <article className="productCard" key={product.name}>
                <div className="productImage">
                  <img src={asset(product.image)} alt={product.name} />
                  <button className="heartButton" aria-label={`Save ${product.name}`}>
                    <Heart size={20} strokeWidth={1.45} />
                  </button>
                </div>
                <h3>{product.name}</h3>
                <p>{product.color}</p>
                <strong>{product.price}</strong>
                <div className="swatches" aria-label={`${product.name} colors`}>
                  {product.swatches.map((color) => (
                    <span key={color} style={{ background: color }} />
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="fabricBand">
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
            <a href="#" className="button buttonLight fabricButton">
              Our Fabric Story
            </a>
          </div>
        </section>

        <section className="sectionBlock looksSection">
          <SectionHeader title="Shop The Look" action="View All Looks" />
          <div className="lookGrid">
            {looks.map((look) => (
              <article className="lookCard" key={look.name}>
                <img src={asset(look.image)} alt={look.name} />
                <div>
                  <h3>{look.name}</h3>
                  <p>{look.items.join("\n")}</p>
                  <strong>{look.price}</strong>
                  <a href="#">Shop The Look</a>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="sectionBlock socialSection">
          <SectionHeader title="Off Duty. Everywhere." action="See More On Instagram" />
          <div className="socialStrip">
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
          <form>
            <label htmlFor="email">Email address</label>
            <input id="email" type="email" placeholder="Enter your email" />
            <button type="submit">Subscribe</button>
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
    </div>
  );
}

function FooterColumn({ title, links }) {
  return (
    <div className="footerColumn">
      <h3>{title}</h3>
      {links.map((link) => (
        <a href="#" key={link}>
          {link}
        </a>
      ))}
    </div>
  );
}

export default App;
