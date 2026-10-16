import "./shopiq-animations.css";
import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import LocationPicker from "./LocationPicker";
import {Search, ShoppingBag, Heart, Sparkles, ArrowRight, Star,
  TrendingUp, Zap, Menu, Bot, UserRound, Send, MessageCircle, X, PackageCheck} from "lucide-react";
import "./App.css";

const products = [
  { id: 1, name: "Aura Wireless Headphones", category: "Electronics", price: 2499, old: 3999, rating: 4.8, emoji: "🎧", tag: "BESTSELLER" , image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=max&w=900&q=85"},
  { id: 2, name: "Minimal Ceramic Bottle", category: "Lifestyle", price: 899, old: 1299, rating: 4.6, emoji: "🍶", tag: "TRENDING", image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=max&w=900&q=85" },
  { id: 3, name: "Urban Everyday Backpack", category: "Accessories", price: 1799, old: 2499, rating: 4.7, emoji: "🎒", tag: "POPULAR" , image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=max&w=900&q=85"},
  { id: 4, name: "Smart Fitness Watch", category: "Electronics", price: 3299, old: 4999, rating: 4.9, emoji: "⌚", tag: "TOP RATED" , image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=max&w=900&q=85"},
  { id: 5, name: "Cloud Comfort Sneakers", category: "Fashion", price: 2199, old: 2999, rating: 4.7, emoji: "👟", tag: "NEW ARRIVAL", image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=max&w=900&q=85" },
  { id: 6, name: "Everyday Desk Lamp", category: "Lifestyle", price: 1499, old: 1999, rating: 4.5, emoji: "💡", tag: "SMART PICK", image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=max&w=900&q=85" }
];

const categories = ["All Products", "Electronics", "Lifestyle", "Accessories", "Fashion"];
const money = n => "₹" + n.toLocaleString("en-IN");


import { useState as useShopIQGalleryState } from "react";

function ShopIQProductGallery({ product }) {
  const imagesById = {
    101: [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=max&w=1000&q=85",
      "https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=max&w=1000&q=85",
      "https://images.unsplash.com/photo-1484704849700-f032a568e944?auto=format&fit=max&w=1000&q=85",
      "https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=max&w=1000&q=85"
    ],
    102: [
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=max&w=1000&q=85",
      "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=max&w=1000&q=85",
      "https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=max&w=1000&q=85",
      "https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?auto=format&fit=max&w=1000&q=85"
    ],
    103: [
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=max&w=1000&q=85",
      "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=max&w=1000&q=85",
      "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=max&w=1000&q=85",
      "https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?auto=format&fit=max&w=1000&q=85"
    ],
    104: [
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=max&w=1000&q=85",
      "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=max&w=1000&q=85",
      "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?auto=format&fit=max&w=1000&q=85",
      "https://images.unsplash.com/photo-1495555961986-6d4c1ecb7be3?auto=format&fit=max&w=1000&q=85"
    ],
    105: [
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=max&w=1000&q=85",
      "https://images.unsplash.com/photo-1622560480654-d96214fdc887?auto=format&fit=max&w=1000&q=85",
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=max&w=1000&q=85",
      "https://images.unsplash.com/photo-1547949003-9792a18a2601?auto=format&fit=max&w=1000&q=85"
    ],
    106: [
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=max&w=1000&q=85",
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=max&w=1000&q=85&sat=-10",
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=max&w=1000&q=85&brightness=5",
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=max&w=1000&q=85&sat=10"
    ]
  };

  const images = imagesById[product.id] || imagesById[101];
  const [active, setActive] = useShopIQGalleryState(0);
  const [detailsOpen, setDetailsOpen] = useShopIQGalleryState(false);
  const [touchStart, setTouchStart] = useShopIQGalleryState(null);

  const move = (step) => setActive((current) =>
    (current + step + images.length) % images.length
  );

  const gallery = (large = false) => (
    <>
      <div
        className={`shopiq-gallery-stage ${large ? "shopiq-gallery-large" : ""}`}
        onTouchStart={(event) => setTouchStart(event.touches[0].clientX)}
        onTouchEnd={(event) => {
          if (touchStart === null) return;
          const delta = event.changedTouches[0].clientX - touchStart;
          if (Math.abs(delta) > 40) move(delta < 0 ? 1 : -1);
          setTouchStart(null);
        }}
      >
        <img
          src={images[active]}
          alt={`${product.name} - image ${active + 1}`}
          className="premium-product-image shopiq-gallery-image"
          loading="lazy"
          onError={(event) => {
            event.currentTarget.style.opacity = "0.35";
          }}
        />
        <button type="button" className="shopiq-gallery-arrow shopiq-gallery-prev"
          aria-label="Previous image" onClick={() => move(-1)}>‹</button>
        <button type="button" className="shopiq-gallery-arrow shopiq-gallery-next"
          aria-label="Next image" onClick={() => move(1)}>›</button>
        <span className="shopiq-gallery-count">{active + 1} / {images.length}</span>
      </div>
      <div className="shopiq-gallery-thumbs" aria-label="Product images">
        {images.map((image, index) => (
          <button
            type="button"
            key={`${product.id}-${index}`}
            className={`shopiq-gallery-thumb ${active === index ? "is-active" : ""}`}
            aria-label={`Show image ${index + 1}`}
            aria-pressed={active === index}
            onClick={() => setActive(index)}
          >
            <img src={image} alt="" loading="lazy" />
          </button>
        ))}
      </div>
    </>
  );

  return (
    <>
      <div className="premium-product-visual shopiq-gallery-card">
        <span className="premium-product-tag">{product.tag}</span>
        <button type="button" className="shopiq-gallery-open"
          onClick={() => setDetailsOpen(true)}
          aria-label={`View ${product.name} images and details`}>
          {gallery()}
          <span className="shopiq-gallery-hint">VIEW DETAILS ↗</span>
        </button>
      </div>

      {detailsOpen && createPortal(
        <div className="shopiq-detail-backdrop"
          role="presentation"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setDetailsOpen(false);
          }}>
          <section className="shopiq-detail-modal" role="dialog"
            aria-modal="true" aria-label={`${product.name} details`}>
            <button type="button" className="shopiq-detail-close"
              aria-label="Close product details"
              onClick={() => setDetailsOpen(false)}>×</button>
            <div className="shopiq-detail-gallery">{gallery(true)}</div>
            <div className="shopiq-detail-info">
              <span className="shopiq-detail-kicker">{product.category} · CURATED COLLECTION</span>
              <h2>{product.name}</h2>
              <p className="shopiq-detail-rating">★ {product.rating} <span>Customer rating</span></p>
              <p className="shopiq-detail-price">
                {typeof product.price === "number" ? `₹${product.price.toLocaleString("en-IN")}` : product.price}
                <del>{typeof product.old === "number" ? `₹${product.old.toLocaleString("en-IN")}` : ""}</del>
              </p>
              <p className="shopiq-detail-description">
                Thoughtfully selected for everyday style, comfort and a premium shopping experience.
                Explore the product gallery to view more images.
              </p>
              <div className="shopiq-detail-controls">
                <button type="button" onClick={() => move(1)}>Next image →</button>
                <button type="button" onClick={() => setDetailsOpen(false)}>Continue shopping</button>
              </div>
              <p className="shopiq-detail-note">
                Image gallery preview. A true 360° spin requires a real sequence of product-angle photographs or a 3D model.
              </p>
            </div>
          </section>
        </div>,
        document.body
      )}
    </>
  );
}

export default function App() {

  // SHOPIQ_DEMO_AUTH_V1
  const [authOpen, setAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState("signin");
  const [authName, setAuthName] = useState("");
  const [authEmail, setAuthEmail] = useState("");
  const [authPassword, setAuthPassword] = useState("");
  const [authMessage, setAuthMessage] = useState("");
  const [authUser, setAuthUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("shopiq-demo-session-v1") || "null");
    } catch {
      return null;
    }
  });

  async function handleShopiqAuth(event) {
    event.preventDefault();
    setAuthMessage("");

    const email = authEmail.trim().toLowerCase();
    const password = authPassword;

    if (!email || !password) {
      setAuthMessage("Please enter your email and password.");
      return;
    }

    if (authMode === "signup" && !authName.trim()) {
      setAuthMessage("Please enter your name.");
      return;
    }

    if (authMode === "signup" && password.length < 8) {
      setAuthMessage("Password must contain at least 8 characters.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setAuthMessage("Please enter a valid email address.");
      return;
    }

    try {
      if (!window.crypto?.subtle) {
        setAuthMessage("Secure demo sign-in is unavailable in this browser.");
        return;
      }

      const hashPassword = async (value) => {
        const bytes = new TextEncoder().encode(value);
        const digest = await crypto.subtle.digest("SHA-256", bytes);
        return Array.from(new Uint8Array(digest))
          .map(byte => byte.toString(16).padStart(2, "0"))
          .join("");
      };

      const accounts = JSON.parse(
        localStorage.getItem("shopiq-demo-accounts-v1") || "{}"
      );

      if (authMode === "signup") {
        if (accounts[email]) {
          setAuthMessage("An account with this email already exists. Please sign in.");
          return;
        }

        accounts[email] = {
          name: authName.trim(),
          passwordHash: await hashPassword(password)
        };

        localStorage.setItem("shopiq-demo-accounts-v1", JSON.stringify(accounts));
      } else {
        const account = accounts[email];
        if (!account || account.passwordHash !== await hashPassword(password)) {
          setAuthMessage("Email or password is incorrect. Please try again.");
          return;
        }
      }

      const account = accounts[email];
      const session = { name: account.name, email };
      localStorage.setItem("shopiq-demo-session-v1", JSON.stringify(session));
      setAuthUser(session);
      setAuthPassword("");
      setAuthOpen(false);
      setAuthMessage("");
      notify(authMode === "signup" ? "Demo account created successfully!" : "Welcome back!");
    } catch {
      setAuthMessage("Unable to complete this demo action. Please try again.");
    }
  }

  function shopiqSignOut() {
    localStorage.removeItem("shopiq-demo-session-v1");
    setAuthUser(null);
    notify("You have signed out.");
  }

  const [locationPickerOpen, setLocationPickerOpen] = useState(false);
  const [deliveryLocation, setDeliveryLocation] = useState(null);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All Products");
  const [cart, setCart] = useState(() => {
    try {
      const saved = JSON.parse(localStorage.getItem("shopiq-cart") || "[]");
      return Array.isArray(saved) ? saved : [];
    } catch {
      return [];
    }
  });
  const [wishlist, setWishlist] = useState(() => {
    try {
      const saved = JSON.parse(localStorage.getItem("shopiq-wishlist") || "[]");
      return Array.isArray(saved) ? saved : [];
    } catch {
      return [];
    }
  });
  const [notice, setNotice] = useState("");
  const [shopiqChatOpen, setShopiqChatOpen] = useState(false);
  const [shopiqChatDraft, setShopiqChatDraft] = useState("");
  const [shopiqChatMessages, setShopiqChatMessages] = useState([
    {
      role: "assistant",
      text: "Welcome to ShopIQ. Tell me what you're looking for, your budget, or a product category. I'll help you explore this sample collection."
    }
  ]);

  const filtered = products.filter(p =>
    (category === "All Products" || p.category === category) &&
    p.name.toLowerCase().includes(search.toLowerCase())
  );
  const cartCount = cart.reduce((s, p) => s + p.qty, 0);
  const total = cart.reduce((s, p) => s + p.price * p.qty, 0);

  useEffect(() => {
    try {
      localStorage.setItem("shopiq-cart", JSON.stringify(cart));
    } catch (error) {
      console.warn("ShopIQ could not save the cart.", error);
    }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem("shopiq-wishlist", JSON.stringify(wishlist));
    } catch (error) {
      console.warn("ShopIQ could not save the wishlist.", error);
    }
  }, [wishlist]);

  function recommendationScore(product) {
    let score = Number(product.rating) || 0;

    if (category !== "All Products" && product.category === category) {
      score += 5;
    }

    const interests = products.filter(item =>
      wishlist.includes(item.id) ||
      cart.some(cartItem => cartItem.id === item.id)
    );

    for (const item of interests) {
      if (item.category === product.category) score += 4;

      const words = item.name.toLowerCase().split(/[^a-z0-9]+/)
        .filter(word => word.length > 3);
      const candidate = product.name.toLowerCase();

      if (words.some(word => candidate.includes(word))) score += 2;
    }

    return score;
  }

  function notify(message) {
    setNotice(message);
    window.clearTimeout(window.shopiqToast);
    window.shopiqToast = window.setTimeout(() => setNotice(""), 2400);
  }

  function addToCart(product) {
    setCart(items => items.some(p => p.id === product.id)
      ? items.map(p => p.id === product.id ? { ...p, qty: p.qty + 1 } : p)
      : [...items, { ...product, qty: 1 }]);
    notify(product.name + " added to your bag");
  }

  function toggleWish(id) {
    setWishlist(items => items.includes(id)
      ? items.filter(x => x !== id)
      : [...items, id]);
  }


  // SHOPIQ_LUXURY_DASHBOARD_V1: catalogue-based demo assistant
  function sendShopiqMessage(event) {
    event.preventDefault();
    const question = shopiqChatDraft.trim();
    if (!question) return;

    const q = question.toLowerCase();
    let reply = "";
    const budgetMatch = q.match(/(?:under|below|within|budget(?: of)?|₹|rs\.?)\s*([0-9,]+)/);
    const budget = budgetMatch
      ? Number(budgetMatch[1].replace(/,/g, ""))
      : null;

    let matches = products.filter(p =>
      q.includes(p.category.toLowerCase()) ||
      p.name.toLowerCase().split(" ").some(word =>
        word.length > 3 && q.includes(word.toLowerCase())
      )
    );

    if (budget !== null && budget > 0) {
      matches = products.filter(p => p.price <= budget)
        .sort((a, b) => b.rating - a.rating);
    }

    if (/cheap|affordable|budget|under|below|price|₹|rs\.?/.test(q) && budget === null) {
      matches = [...products].sort((a, b) => a.price - b.price);
    }

    if (/wishlist|saved/.test(q)) {
      const saved = products.filter(p => wishlist.includes(p.id));
      reply = saved.length
        ? "Your saved favourites: " + saved.map(p => `${p.name} (${money(p.price)})`).join(", ") + "."
        : "Your wishlist is empty. Tap the heart on any product to save it.";
    } else if (/cart|bag|basket|subtotal/.test(q)) {
      reply = cart.length
        ? `Your bag has ${cartCount} item(s), with a subtotal of ${money(total)}.`
        : "Your shopping bag is empty. Explore the collection and tap the bag icon to add a product.";
    } else if (/hello|^hi\b|hey|help/.test(q)) {
      reply = "Hi! I can help you explore electronics, lifestyle products, accessories and fashion. Tell me your category or budget.";
    } else if (/recommend|suggest|best|popular|trending|gift/.test(q) && !matches.length) {
      matches = [...products].sort((a, b) => b.rating - a.rating).slice(0, 3);
      reply = "Here are some highly rated options from our sample catalogue: ";
    } else if (matches.length) {
      reply = budget !== null
        ? `Options within ${money(budget)} from this sample catalogue: `
        : "Here are the closest matches in our sample collection: ";
    } else {
      reply = "I couldn't find an exact match in this small demo catalogue. Try Electronics, Lifestyle, Fashion, Accessories, a product name, or a budget such as under 2000.";
    }

    if (matches.length) {
      reply += matches.slice(0, 3)
        .map(p => `${p.name} — ${money(p.price)}, rating ${p.rating}/5`)
        .join("; ") + ".";
    }

    setShopiqChatMessages(messages => [
      ...messages,
      { role: "user", text: question },
      { role: "assistant", text: reply }
    ]);
    setShopiqChatDraft("");
  }

  return (
    <div className="app-shell everyday-edit-premium">
      <div className="announcement">
        <Sparkles size={14}/> SMARTER SHOPPING STARTS HERE
        <span>Discover your next favourite.</span>
      </div>

      <header className="navbar">
        <a className="brand" href="#">
          <span className="brand-mark">S</span>
          <span>shopiq<span className="brand-ai">.ai</span></span>
        </a>

        <nav className="desktop-nav">
          <a href="#shop">Shop</a>
          <a href="#shop">Discover</a>
          <a href="#intelligence">AI Picks</a>
        </nav>

        <div className="nav-actions">
          <button className="track-order-nav" onClick={() => { setOrderFlowMode("tracking"); setOrderFlowOpen(true); }}>
            <PackageCheck size={15}/> Track order
          </button>
          <button
            className="delivery-location-nav"
            onClick={() => setLocationPickerOpen(true)}
            aria-label="Choose delivery location"
            title={deliveryLocation?.formattedAddress || "Choose delivery location"}
          >
            <span aria-hidden="true">📍</span>
            <span>{deliveryLocation?.city ? `Deliver to ${deliveryLocation.city}` : "Location"}</span>
          </button>
          <label className="search-box">
            <Search size={17}/>
            <input value={search} onChange={e => setSearch(e.target.value)}
              placeholder="Search products..." aria-label="Search products"/>
          </label>
          <button className="icon-button" aria-label="Wishlist"
            onClick={() => document.getElementById("wishlist").scrollIntoView({ behavior: "smooth" })}>
            <Heart size={20}/>
            {wishlist.length > 0 && <span className="count">{wishlist.length}</span>}
          </button>
          <button className="bag-button"
            onClick={() => document.getElementById("cart-panel").scrollIntoView({ behavior: "smooth" })}>
            <ShoppingBag size={18}/> Bag <b>{cartCount}</b>
          </button>
          {authUser ? (
            <button
              className="sign-in-button"
              onClick={shopiqSignOut}
              title={`Signed in as ${authUser.email}. Click to sign out.`}
            >
              <UserRound size={16} />
              <span>Sign Out</span>
            </button>
          ) : (
            <>
              <button
                className="sign-in-button"
                onClick={() => {
                  setAuthMode("signin");
                  setAuthMessage("");
                  setAuthOpen(true);
                }}
                aria-label="Sign in to your account"
              >
                <UserRound size={16} />
                <span>Sign In</span>
              </button>
              <button
                className="signup-nav-button"
                onClick={() => {
                  setAuthMode("signup");
                  setAuthMessage("");
                  setAuthOpen(true);
                }}
              >
                Sign Up
              </button>
            </>
          )}
        </div>
      </header>

      <main>
        <section className="hero">
          <div className="hero-content">
            <div className="eyebrow"><span className="live-dot"/> YOUR PERSONAL AI SHOPPING ASSISTANT</div>
            <h1>Good finds.<br/><span>Better choices.</span></h1>
            <p>Discover products you'll love, with a smarter shopping experience designed around you.</p>
            <div className="hero-actions">
              <a className="primary-button" href="#shop">Explore collection <ArrowRight size={17}/></a>
              <a className="text-link" href="#intelligence">Meet ShopIQ AI <Sparkles size={16}/></a>
            </div>
            <div className="hero-proof">
              <div className="avatar-stack"><span>✦</span><span>✓</span><span>♡</span></div>
              <div><strong>Thoughtful picks, every time.</strong><small>Discover products for everyday life.</small></div>
            </div>
          </div>

          <div className="hero-art hero-art-premium">
            <div className="hero-editorial-image">
              <img
                src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=max&w=1200&q=90"
                alt="Premium wireless headphones from the ShopIQ collection"
              />
              <span className="hero-image-label">THE EVERYDAY EDIT</span>
              <div className="hero-image-caption">
                <span>DESIGNED FOR EVERYDAY</span>
                <h2>Good taste.<br /><em>Great finds.</em></h2>
              </div>
            </div>
            <div className="hero-floating-note">
              <span className="hero-note-icon"><Sparkles size={17}/></span>
              <span><b>Discover your next favourite</b><small>Explore the curated collection</small></span>
            </div>
            <div className="hero-edition-mark">S<br />I<span>✳</span></div>
          </div>
          <div className="hero-index">01 — THE DISCOVERY EDIT</div>
        </section>

        <section className="benefit-strip">
          <div><Sparkles size={19}/><span><b>AI-inspired discovery</b><small>Explore smarter choices</small></span></div>
          <div><Zap size={19}/><span><b>Effortless browsing</b><small>Find what fits your style</small></span></div>
          <div><TrendingUp size={19}/><span><b>Trending essentials</b><small>Explore popular picks</small></span></div>
        </section>

        <section className="shop-section" id="shop">
          <div className="section-heading">
            <div><span className="section-kicker">THE CURATED COLLECTION</span>
              <h2>Find your <em>favourite.</em></h2>
              <p>Everyday essentials, thoughtfully selected.</p></div>
            <span className="result-count">{filtered.length} PRODUCTS</span>
          </div>

          <div className="category-row">
            {categories.map(c => <button key={c}
              className={`category-chip ${category === c ? "active" : ""}`}
              onClick={() => setCategory(c)}>{c}</button>)}
          </div>

          <div className="product-grid">
            {filtered.map((p, i) => (
              <article className="product-card" key={p.id}>
                <div className={`product-visual visual-${p.id}`}>
                  <span className="product-tag">{p.tag}</span>
                  <button className={`wishlist-button ${wishlist.includes(p.id) ? "wishlisted" : ""}`}
                    onClick={() => toggleWish(p.id)} aria-label={`Wishlist ${p.name}`}>
                    <Heart size={18} fill={wishlist.includes(p.id) ? "currentColor" : "none"}/>
                  </button>
                  {p.image ? (
    <img
      className="product-card-image"
      src={p.image}
      alt={p.name}
      loading="lazy"
      onError={(e) => {
        e.currentTarget.style.display = "none";
      }}
    />
  ) : (
    <span className="product-emoji">{p.emoji}</span>
  )}
                  <span className="visual-number">0{i + 1}</span>
                </div>
                <div className="product-info">
                  <span className="product-category">{p.category}</span>
                  <h3>{p.name}</h3>
                  <div className="rating"><Star size={14} fill="currentColor"/><b>{p.rating}</b><span>Sample rating</span></div>
                  <div className="product-bottom">
                    <div className="price">{money(p.price)} <del>{money(p.old)}</del></div>
                    <button className="add-button" onClick={() => addToCart(p)}
                      aria-label={`Add ${p.name} to cart`}><ShoppingBag size={17}/></button>
                  </div>
                </div>
              </article>
            ))}
          </div>
          {filtered.length === 0 && <div className="empty-state">No products found. Try another search or category.</div>}
        </section>

        <section className="ai-banner" id="intelligence">
          <div className="ai-orb shopiq-ai-orb"><span className="shopiq-orbit"><Sparkles size={35}/></span></div>
          <div className="ai-banner-copy">
            <span className="section-kicker">THE EVERYDAY EDIT</span>
            <h2>Made for your rhythm</h2>
            <p>AI-powered discovery is on our roadmap. Explore the sample catalogue while we build smarter recommendations.</p>
          </div>
          <button className="ai-button" onClick={() => {
            setSearch(""); setCategory("All Products");
            document.getElementById("shop").scrollIntoView({ behavior: "smooth" });
          }}>Explore picks <ArrowRight size={17}/></button>
        </section>


        {/* SHOPIQ_LUXURY_DASHBOARD_V1 */}
        <section className="shopiq-profile-dashboard" id="shopiq-profile">
          <div className="shopiq-dashboard-heading">
            <div>
              <span className="shopiq-gold-kicker">YOUR SHOPPING SPACE</span>
              <h2>Your world, <em>your choices.</em></h2>
              <p>A quick view of your ShopIQ activity.</p>
            </div>
            <div className="shopiq-profile-avatar"><UserRound size={25}/></div>
          </div>

          <div className="shopiq-dashboard-grid">
            <article className="shopiq-profile-card shopiq-profile-main">
              <span className="shopiq-profile-symbol"><Sparkles size={19}/></span>
              <span className="shopiq-card-eyebrow">PERSONAL SHOPPING PROFILE</span>
              <h3>Your next favourite starts here.</h3>
              <p>Browse thoughtfully selected everyday essentials and save the ones you love.</p>
              <a href="#shop" className="shopiq-dashboard-link">Explore collection <ArrowRight size={15}/></a>
            </article>

            <article className="shopiq-stat-card">
              <span className="shopiq-stat-icon"><ShoppingBag size={19}/></span>
              <span className="shopiq-card-eyebrow">BAG ITEMS</span>
              <strong>{cartCount}</strong>
              <small>{cartCount === 1 ? "item in your bag" : "items in your bag"}</small>
              <button onClick={() => document.getElementById("cart-panel")?.scrollIntoView({behavior:"smooth"})}>View bag <ArrowRight size={14}/></button>
            </article>

            <article className="shopiq-stat-card">
              <span className="shopiq-stat-icon"><Heart size={19}/></span>
              <span className="shopiq-card-eyebrow">SAVED FAVOURITES</span>
              <strong>{wishlist.length}</strong>
              <small>{wishlist.length === 1 ? "saved product" : "saved products"}</small>
              <button onClick={() => document.getElementById("wishlist")?.scrollIntoView({behavior:"smooth"})}>View wishlist <ArrowRight size={14}/></button>
            </article>

            <article className="shopiq-stat-card shopiq-total-card">
              <span className="shopiq-stat-icon"><Star size={19}/></span>
              <span className="shopiq-card-eyebrow">BAG SUBTOTAL</span>
              <strong className="shopiq-total-value">{money(total)}</strong>
              <small>Before any delivery fees</small>
              <button onClick={() => document.getElementById("cart-panel")?.scrollIntoView({behavior:"smooth"})}>Review selection <ArrowRight size={14}/></button>
            </article>
          </div>
          <p className="shopiq-dashboard-note">Demo profile · Activity updates as you use your bag and wishlist.</p>
        </section>

        <section className="recommendations-section" id="recommended-for-you">
          <div className="recommendations-heading">
            <div>
              <span className="section-kicker">CURATED FOR YOUR TASTE</span>
              <h2>Recommended for you</h2>
              <p>Picked for your next favourite.</p>
            </div>
            <span className="recommendation-sparkle">✳</span>
          </div>
          <div className="recommendation-grid">
    {[
      { id: 101, name: "Aura Pro Headphones", category: "Electronics", price: 8999, old: 12999, rating: 4.9, emoji: "🎧", tag: "PREMIUM PICK" },
      { id: 102, name: "Chrono Elite Smartwatch", category: "Wearables", price: 6499, old: 9999, rating: 4.8, emoji: "⌚", tag: "BESTSELLER" },
      { id: 103, name: "Luxe Everyday Bag", category: "Fashion", price: 5999, old: 8499, rating: 4.9, emoji: "👜", tag: "EDITOR'S PICK" },
      { id: 104, name: "Cloud Comfort Sneakers", category: "Footwear", price: 2799, old: 3999, rating: 4.8, emoji: "👟", tag: "COMFORT PICK" },
      { id: 105, name: "Urban Everyday Backpack", category: "Accessories", price: 1799, old: 2499, rating: 4.7, emoji: "🎒", tag: "EVERYDAY ESSENTIAL" },
      { id: 106, name: "Everyday Desk Lamp", category: "Home", price: 1499, old: 2199, rating: 4.6, emoji: "💡", tag: "HOME FAVOURITE" }
    ].sort((a, b) => recommendationScore(b) - recommendationScore(a)).map(p => (
      <article className="recommendation-card premium-recommendation-card" key={p.id}>
        <ShopIQProductGallery product={p} />
        <div className="recommendation-product-info">
          <h3>{p.name}</h3>
          <div className="recommendation-rating">
            <Star size={14} fill="currentColor" /> {p.rating}
          </div>
          <strong>{money(p.price)} <del className="premium-old-price">{money(p.old)}</del></strong>
        </div>
        <button className="recommendation-add" onClick={() => {
          setCart(items => {
            const existing = items.find(x => x.id === p.id);
            return existing
              ? items.map(x => x.id === p.id ? { ...x, qty: x.qty + 1 } : x)
              : [...items, { ...p, qty: 1 }];
          });
          notify(`${p.name} added to your bag.`);
        }}>
          Add to bag <ArrowRight size={15}/>
        </button>
      </article>
    ))}

          </div>
        </section>

        <section className="lower-grid">
          <div className="wishlist-panel" id="wishlist">
            <span className="section-kicker">SAVED FOR LATER</span>
            <h2>Your wishlist <Heart size={19}/></h2>
            {wishlist.length === 0
              ? <p>Keep your favourites close. Tap the heart on a product to save it here.</p>
              : <div className="saved-list">{products.filter(p => wishlist.includes(p.id)).map(p =>
                <div key={p.id} className="saved-item"><span>{p.emoji}</span><div><b>{p.name}</b><small>{money(p.price)}</small></div><button onClick={() => toggleWish(p.id)}>×</button></div>
              )}</div>}
          </div>

          <div className="cart-panel" id="cart-panel">
            <span className="section-kicker">YOUR SELECTION</span>
            <h2>Shopping bag <ShoppingBag size={19}/></h2>
            {cart.length === 0
              ? <p>Your bag is waiting for something lovely. Add a product to begin.</p>
              : <div className="saved-list">
                {cart.map(p => <div key={p.id} className="saved-item"><span>{p.emoji}</span><div><b>{p.name}</b><small>Qty: {p.qty} · {money(p.price * p.qty)}</small></div><button aria-label={`Remove ${p.name}`} onClick={() => setCart(items => items.filter(x => x.id !== p.id))}>×</button></div>)}
                <div className="cart-total"><span>Subtotal</span><b>{money(total)}</b></div>
                <button className="checkout-button" onClick={() => { setOrderFlowMode("checkout"); setOrderFlowOpen(true); }}>Continue to checkout <ArrowRight size={16}/></button>
              </div>}
          </div>
        </section>
      </main>


      {/* SHOPIQ_LUXURY_DASHBOARD_V1: floating catalogue assistant */}
      <div className="shopiq-assistant-root">
        {shopiqChatOpen && (
          <section className="shopiq-chat-panel" aria-label="ShopIQ shopping assistant">
            <header className="shopiq-chat-header">
              <span className="shopiq-chat-avatar"><Bot size={22}/></span>
              <div>
                <strong>ShopIQ Assistant</strong>
                <small><span className="shopiq-chat-status"/> Catalogue guide · Demo</small>
              </div>
              <button className="shopiq-chat-close" onClick={() => setShopiqChatOpen(false)} aria-label="Close assistant"><X size={19}/></button>
            </header>

            <div className="shopiq-chat-messages" aria-live="polite">
              {shopiqChatMessages.map((message, index) => (
                <div className={`shopiq-chat-message ${message.role === "user" ? "shopiq-chat-user" : "shopiq-chat-bot"}`} key={index}>
                  {message.role === "assistant" && <span className="shopiq-message-avatar"><Sparkles size={13}/></span>}
                  <p>{message.text}</p>
                </div>
              ))}
            </div>

            <div className="shopiq-chat-suggestions">
              <button onClick={() => setShopiqChatDraft("Recommend the best rated products")}>Top picks</button>
              <button onClick={() => setShopiqChatDraft("Show products under 2000")}>Under ₹2,000</button>
              <button onClick={() => setShopiqChatDraft("What's in my wishlist?")}>My wishlist</button>
            </div>

            <form className="shopiq-chat-form" onSubmit={sendShopiqMessage}>
              <input
                value={shopiqChatDraft}
                onChange={event => setShopiqChatDraft(event.target.value)}
                placeholder="Ask about products..."
                aria-label="Message ShopIQ assistant"
                maxLength={300}
              />
              <button type="submit" aria-label="Send message" disabled={!shopiqChatDraft.trim()}><Send size={17}/></button>
            </form>
            <p className="shopiq-chat-disclaimer">Catalogue-based demo. No live AI service is connected.</p>
          </section>
        )}

        <button className={`shopiq-assistant-launcher ${shopiqChatOpen ? "is-open" : ""}`}
          onClick={() => setShopiqChatOpen(open => !open)}
          aria-label={shopiqChatOpen ? "Close ShopIQ assistant" : "Open ShopIQ assistant"}>
          {shopiqChatOpen ? <X size={23}/> : <MessageCircle size={23}/>}
          {!shopiqChatOpen && <span>Ask ShopIQ</span>}
        </button>
      </div>

      <footer className="footer">
        <a className="brand" href="#"><span className="brand-mark">S</span><span>shopiq<span className="brand-ai">.ai</span></span></a>
        <span>Smarter discovery. Thoughtful choices.</span>
        <small>© 2026 ShopIQ AI · Prototype storefront</small>
      </footer>

      <LocationPicker
        open={locationPickerOpen}
        initialLocation={deliveryLocation}
        onClose={() => setLocationPickerOpen(false)}
        onConfirm={location => {
          setDeliveryLocation(location);
          setLocationPickerOpen(false);
          notify(`Delivery location saved: ${location.formattedAddress}`);
        }}
      />


      {authOpen && (
        <div
          className="shopiq-auth-overlay"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setAuthOpen(false);
          }}
        >
          <section
            className="shopiq-auth-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="shopiq-auth-title"
          >
            <button
              type="button"
              className="shopiq-auth-close"
              onClick={() => setAuthOpen(false)}
              aria-label="Close authentication dialog"
            >×</button>

            <div className="shopiq-auth-brand">
              <span className="brand-mark">S</span>
              <span>ShopIQ<span className="brand-ai"> AI</span></span>
            </div>

            <span className="shopiq-auth-kicker">A SMARTER WAY TO SHOP</span>
            <h2 id="shopiq-auth-title">
              {authMode === "signup" ? "Create your account" : "Welcome back"}
            </h2>
            <p className="shopiq-auth-description">
              {authMode === "signup"
                ? "Join ShopIQ and keep your shopping experience in one place."
                : "Sign in to continue your ShopIQ experience."}
            </p>

            <form className="shopiq-auth-form" onSubmit={handleShopiqAuth}>
              {authMode === "signup" && (
                <label>
                  Full name
                  <input
                    type="text"
                    autoComplete="name"
                    placeholder="Enter your name"
                    value={authName}
                    onChange={event => setAuthName(event.target.value)}
                    required
                  />
                </label>
              )}

              <label>
                Email address
                <input
                  type="email"
                  autoComplete="email"
                  placeholder="you@example.com"
                  value={authEmail}
                  onChange={event => setAuthEmail(event.target.value)}
                  required
                />
              </label>

              <label>
                Password
                <input
                  type="password"
                  autoComplete={authMode === "signup" ? "new-password" : "current-password"}
                  placeholder={authMode === "signup" ? "At least 8 characters" : "Enter your password"}
                  value={authPassword}
                  onChange={event => setAuthPassword(event.target.value)}
                  minLength={authMode === "signup" ? 8 : undefined}
                  required
                />
              </label>

              {authMessage && (
                <p className="shopiq-auth-error" role="alert">{authMessage}</p>
              )}

              <button type="submit" className="shopiq-auth-submit">
                {authMode === "signup" ? "Create account" : "Sign in"}
              </button>
            </form>

            <p className="shopiq-auth-switch">
              {authMode === "signup" ? "Already have an account?" : "New to ShopIQ?"}
              {" "}
              <button
                type="button"
                onClick={() => {
                  setAuthMode(authMode === "signup" ? "signin" : "signup");
                  setAuthMessage("");
                }}
              >
                {authMode === "signup" ? "Sign in" : "Create an account"}
              </button>
            </p>
            <p className="shopiq-auth-disclaimer">
              Demo account only. This prototype stores account data in this browser,
              not in a secure authentication service.
            </p>
          </section>
        </div>
      )}

      {notice && <div className="toast" role="status">{notice}</div>}
    </div>
  );
}
