import { useState, useEffect, useRef } from "react";
// Artsywishh Store - Full Source Code

const INITIAL_PRODUCTS = [
  { id: 1, name: "Ivory Bloom Bedsheet Set", category: "Bedsheets", price: 1299, originalPrice: 1799, emoji: "🌸", color: "#f9e8f0", tag: "Bestseller", description: "100% cotton, 300 thread count with delicate floral embroidery. Includes 1 bedsheet + 2 pillowcases.", stock: 12, image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=400&q=80" },
  { id: 2, name: "Rose Petal Duvet Cover", category: "Bedsheets", price: 1599, originalPrice: 2100, emoji: "🌹", color: "#fde8e8", tag: "New", description: "Soft microfibre with botanical print. Available in Queen & King sizes.", stock: 8, image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&q=80" },
  { id: 3, name: "Lavender Dreams Set", category: "Bedsheets", price: 999, originalPrice: 1399, emoji: "💜", color: "#ede8fd", tag: "Sale", description: "Hypoallergenic cotton blend. Perfect for sensitive skin.", stock: 20, image: "https://images.unsplash.com/photo-1560185127-6ed189bf02f4?w=400&q=80" },
  { id: 4, name: "Sage & White Linen", category: "Bedsheets", price: 1499, originalPrice: 1800, emoji: "🍃", color: "#e8f5e9", tag: null, description: "Earthy sage tones with crisp white trims. Breathable and light.", stock: 15, image: "https://images.unsplash.com/photo-1588511870339-30aa2c6fdb72?w=400&q=80" },
  { id: 5, name: "Kanjivaram Silk Saree", category: "Sarees", price: 8999, originalPrice: 11000, emoji: "✨", color: "#fff3e0", tag: "Premium", description: "Authentic Kanjivaram silk with zari border. Perfect for weddings and festive occasions.", stock: 3, image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=400&q=80" },
  { id: 6, name: "Chiffon Blush Saree", category: "Sarees", price: 2499, originalPrice: 3200, emoji: "🌷", color: "#fce4ec", tag: "Trending", description: "Lightweight chiffon in soft blush with delicate sequin work.", stock: 7, image: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=400&q=80" },
  { id: 7, name: "Cotton Kalamkari Saree", category: "Sarees", price: 1899, originalPrice: 2400, emoji: "🦚", color: "#e8f5e9", tag: "New", description: "Hand-printed kalamkari motifs on breathable cotton. Everyday elegance.", stock: 10, image: "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=400&q=80" },
  { id: 8, name: "Royal Banarasi Drape", category: "Sarees", price: 6999, originalPrice: 9000, emoji: "👑", color: "#fef9e7", tag: "Bestseller", description: "Heavy brocade with gold zari weave. A timeless heirloom piece.", stock: 4, image: "https://images.unsplash.com/photo-1594938298603-c8148c4b4e71?w=400&q=80" },
  { id: 9, name: "Wildflower Watercolor", category: "Artwork", price: 3499, originalPrice: 4200, emoji: "🎨", color: "#e8f4fd", tag: "Original", description: "Hand-painted A3 watercolor on cold press paper. One-of-a-kind floral composition.", stock: 1, image: "https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?w=400&q=80" },
  { id: 10, name: "Botanical Line Art Print", category: "Artwork", price: 799, originalPrice: 999, emoji: "🌿", color: "#f1f8e9", tag: "Print", description: "Fine line botanical illustration. Giclée print on archival paper. 8x10 inches.", stock: 30, image: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=400&q=80" },
  { id: 11, name: "Sunrise Abstract Canvas", category: "Artwork", price: 5499, originalPrice: 7000, emoji: "🌅", color: "#fff8e1", tag: "Original", description: "Acrylic on stretched canvas, 16x20 inches. Signed by the artist.", stock: 2, image: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400&q=80" },
  { id: 12, name: "Pastel Mandala Series", category: "Artwork", price: 1299, originalPrice: 1600, emoji: "🔮", color: "#f3e5f5", tag: "Set of 3", description: "Set of 3 mandala prints in soft pastels. Perfect for gallery walls.", stock: 9, image: "https://images.unsplash.com/photo-1604871000636-074fa5117945?w=400&q=80" },
];

const INSTAGRAM_POSTS = [
  { id: 1, emoji: "🌸", bg: "linear-gradient(135deg,#fce8f0,#f8d7e3)", likes: 243, caption: "New bedsheet drop 🌸" },
  { id: 2, emoji: "✨", bg: "linear-gradient(135deg,#fff3e0,#ffe0b2)", likes: 187, caption: "Kanjivaram dreams ✨" },
  { id: 3, emoji: "🎨", bg: "linear-gradient(135deg,#e8f4fd,#bbdefb)", likes: 312, caption: "Fresh artwork arrivals 🎨" },
  { id: 4, emoji: "🌷", bg: "linear-gradient(135deg,#fce4ec,#f8bbd0)", likes: 198, caption: "Blush chiffon vibes 🌷" },
  { id: 5, emoji: "🌿", bg: "linear-gradient(135deg,#f1f8e9,#dcedc8)", likes: 156, caption: "Botanical prints 🌿" },
  { id: 6, emoji: "💜", bg: "linear-gradient(135deg,#ede7f6,#d1c4e9)", likes: 275, caption: "Lavender season 💜" },
];

const WHATSAPP_NUMBER = "919999951933";
const CATEGORIES = ["All", "Bedsheets", "Sarees", "Artwork"];

const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,600&family=Jost:wght@300;400;500;600&display=swap');
  *{box-sizing:border-box;margin:0;padding:0;}
  ::-webkit-scrollbar{width:4px;}::-webkit-scrollbar-track{background:#fdf8f5;}::-webkit-scrollbar-thumb{background:#e8b4b8;border-radius:2px;}
  .card-hover{transition:transform .3s,box-shadow .3s;cursor:pointer;}
  .card-hover:hover{transform:translateY(-7px);box-shadow:0 24px 60px rgba(180,100,110,.18)!important;}
  .btn{font-family:'Jost',sans-serif;font-weight:500;font-size:13px;cursor:pointer;border:none;transition:all .25s;letter-spacing:1px;text-transform:uppercase;border-radius:50px;}
  .btn-rose{background:linear-gradient(135deg,#e8b4b8,#d4899a);color:white;padding:11px 26px;}
  .btn-rose:hover{background:linear-gradient(135deg,#d4899a,#c4738a);transform:scale(1.03);}
  .btn-ghost{background:transparent;border:1.5px solid #e8b4b8;color:#c4738a;padding:10px 22px;}
  .btn-ghost:hover{background:#fce8ec;}
  .btn-wa{background:linear-gradient(135deg,#25d366,#128c7e);color:white;padding:11px 26px;}
  .btn-wa:hover{background:linear-gradient(135deg,#128c7e,#075e54);transform:scale(1.03);}
  .btn-sm-danger{background:#fff0f0;color:#e57373;border:1px solid #ffcdd2;padding:6px 12px;font-size:11px;font-family:'Jost',sans-serif;cursor:pointer;border-radius:8px;transition:all .2s;}
  .btn-sm-danger:hover{background:#ffebee;}
  .btn-sm-ok{background:#e8f5e9;color:#43a047;border:1px solid #c8e6c9;padding:6px 12px;font-size:11px;font-family:'Jost',sans-serif;cursor:pointer;border-radius:8px;transition:all .2s;}
  .btn-sm-ok:hover{background:#c8e6c9;}
  .btn-sm-edit{background:#f3f0ff;color:#7c4daa;border:1px solid #d8c8f8;padding:6px 12px;font-size:11px;font-family:'Jost',sans-serif;cursor:pointer;border-radius:8px;transition:all .2s;}
  .btn-sm-edit:hover{background:#e8d8f8;}
  .overlay{position:fixed;inset:0;background:rgba(61,44,44,.48);backdrop-filter:blur(5px);z-index:100;}
  .panel{position:fixed;right:0;top:0;height:100%;width:400px;max-width:96vw;background:#fdf8f5;z-index:101;box-shadow:-12px 0 60px rgba(0,0,0,.14);overflow-y:auto;padding:32px 26px;}
  .modal{position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);background:#fdf8f5;z-index:101;border-radius:22px;width:540px;max-width:96vw;max-height:92vh;overflow-y:auto;padding:36px;box-shadow:0 32px 90px rgba(0,0,0,.22);}
  .tag-badge{font-family:'Jost',sans-serif;font-size:10px;font-weight:500;letter-spacing:1.5px;text-transform:uppercase;padding:3px 10px;border-radius:20px;}
  input,textarea,select{font-family:'Jost',sans-serif;font-size:14px;border:1.5px solid #f0d8da;border-radius:10px;padding:10px 14px;background:white;width:100%;outline:none;transition:border .2s;color:#3d2c2c;}
  input:focus,textarea:focus,select:focus{border-color:#e8b4b8;}
  .cat-btn{font-family:'Jost',sans-serif;font-size:12px;letter-spacing:1px;text-transform:uppercase;padding:8px 20px;border-radius:50px;border:1.5px solid transparent;cursor:pointer;transition:all .25s;}
  .cat-btn.active{background:linear-gradient(135deg,#e8b4b8,#d4899a);color:white;}
  .cat-btn:not(.active){background:white;border-color:#f0d8da;color:#a0707a;}
  .cat-btn:not(.active):hover{border-color:#e8b4b8;color:#c4738a;}
  .nav-btn{font-family:'Jost',sans-serif;font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#a0707a;cursor:pointer;transition:color .2s;background:none;border:none;}
  .nav-btn:hover,.nav-btn.active-nav{color:#c4738a;}
  .tab-seg{display:flex;gap:0;background:#f5e6e8;border-radius:50px;padding:3px;}
  .tab-btn{flex:1;padding:7px;border-radius:50px;border:none;cursor:pointer;font-family:'Jost',sans-serif;font-size:11px;font-weight:500;letter-spacing:1px;text-transform:uppercase;transition:all .2s;}
  .tab-btn.active-tab{background:white;color:#c4738a;box-shadow:0 2px 8px rgba(0,0,0,.08);}
  .tab-btn:not(.active-tab){background:transparent;color:#b09090;}
  .insta-card{border-radius:14px;overflow:hidden;cursor:pointer;box-shadow:0 4px 16px rgba(0,0,0,.08);transition:transform .3s;}
  .insta-card:hover{transform:scale(1.05);}
  .admin-row{transition:background .15s;}
  .admin-row:hover{background:#fff8f8;}
  @keyframes fadeUp{from{opacity:0;transform:translateY(18px)}to{opacity:1;transform:translateY(0)}}
  @keyframes slideRight{from{transform:translateX(100%)}to{transform:translateX(0)}}
  @keyframes popUp{from{opacity:0;transform:translate(-50%,-48%) scale(.95)}to{opacity:1;transform:translate(-50%,-50%) scale(1)}}
  @keyframes toastUp{from{opacity:0;transform:translateX(-50%) translateY(20px)}to{opacity:1;transform:translateX(-50%) translateY(0)}}
  @keyframes heartbeat{0%,100%{transform:scale(1)}50%{transform:scale(1.08)}}
  .anim-fade{animation:fadeUp .5s ease forwards;}
  .anim-slide{animation:slideRight .35s cubic-bezier(.4,0,.2,1) forwards;}
  .anim-pop{animation:popUp .3s cubic-bezier(.4,0,.2,1) forwards;}
  .anim-toast{animation:toastUp .3s ease forwards;}
`;

const Lbl = ({ ch }) => <p style={{ fontFamily: "'Jost',sans-serif", fontSize: 11, letterSpacing: 2.5, textTransform: "uppercase", color: "#d4a0a8", marginBottom: 5 }}>{ch}</p>;
const SectionHead = ({ title, sub }) => (
  <div style={{ textAlign: "center", marginBottom: 40 }}>
    <p style={{ fontFamily: "'Jost',sans-serif", fontSize: 11, letterSpacing: 4, textTransform: "uppercase", color: "#d4a0a8", marginBottom: 8 }}>{sub}</p>
    <h2 style={{ fontSize: "clamp(26px,4vw,38px)", fontWeight: 300, color: "#3d2c2c" }}>{title}</h2>
    <div style={{ width: 48, height: 2, background: "linear-gradient(90deg,#e8b4b8,#d4899a)", margin: "14px auto 0", borderRadius: 2 }} />
  </div>
);

export default function Artsywishh() {
  const [products, setProducts] = useState(INITIAL_PRODUCTS);
  const [cat, setCat] = useState("All");
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const [selProd, setSelProd] = useState(null);
  const [toast, setToast] = useState(null);
  const [adminOpen, setAdminOpen] = useState(false);
  const [adminTab, setAdminTab] = useState("products");
  const [adminPass, setAdminPass] = useState("");
  const [adminAuth, setAdminAuth] = useState(false);
  const [activeNav, setActiveNav] = useState("shop");
  const [editProd, setEditProd] = useState(null);
  const [newProd, setNewProd] = useState({ name: "", category: "Bedsheets", price: "", originalPrice: "", emoji: "🌸", color: "#fce8f0", tag: "", description: "", stock: "", image: "" });
  const searchRef = useRef(null);

  const filtered = products.filter(p => {
    const mc = cat === "All" || p.category === cat;
    const ms = p.name.toLowerCase().includes(search.toLowerCase()) || p.category.toLowerCase().includes(search.toLowerCase());
    return mc && ms;
  });

  const cartCount = cart.reduce((s, i) => s + i.qty, 0);
  const cartTotal = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const shipping = 99;
  const grandTotal = cartTotal + shipping;

  const toast_ = (msg) => { setToast(msg); setTimeout(() => setToast(null), 2800); };
  const addCart = (p) => {
    setCart(prev => { const ex = prev.find(i => i.id === p.id); if (ex) return prev.map(i => i.id === p.id ? { ...i, qty: i.qty + 1 } : i); return [...prev, { ...p, qty: 1 }]; });
    toast_(`${p.name} added! 🛍️`); setSelProd(null);
  };
  const removeCart = (id) => setCart(p => p.filter(i => i.id !== id));
  const updateQty = (id, d) => setCart(p => p.map(i => i.id === id ? { ...i, qty: Math.max(1, i.qty + d) } : i));

  useEffect(() => { if (searchOpen && searchRef.current) searchRef.current.focus(); }, [searchOpen]);

  const waProduct = (p) => { const m = encodeURIComponent(`Hi Artsywishh! I'm interested in:\n\n*${p.name}*\nPrice: ₹${p.price.toLocaleString()}\n\nPlease confirm availability 🌸`); window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${m}`, "_blank"); };
  const waCart = () => { const items = cart.map(i => `• ${i.name} × ${i.qty} = ₹${(i.price * i.qty).toLocaleString()}`).join("\n"); const m = encodeURIComponent(`Hi Artsywishh! Order request:\n\n${items}\n\nSubtotal: ₹${cartTotal.toLocaleString()}\nShipping: ₹99\n*Total: ₹${grandTotal.toLocaleString()}*\n\nPlease confirm 🌸`); window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${m}`, "_blank"); };

  const authAdmin = () => { if (adminPass === "artsywishh123") { setAdminAuth(true); setAdminPass(""); } else toast_("Wrong password ❌"); };
  const delProd = (id) => { setProducts(p => p.filter(x => x.id !== id)); toast_("Deleted"); };
  const toggleStock = (id) => setProducts(p => p.map(x => x.id === id ? { ...x, stock: x.stock > 0 ? 0 : 10 } : x));
  const saveNew = () => {
    if (!newProd.name || !newProd.price) return toast_("Name & price required");
    setProducts(p => [...p, { ...newProd, id: Date.now(), price: +newProd.price, originalPrice: +(newProd.originalPrice || newProd.price), stock: +(newProd.stock || 10) }]);
    setNewProd({ name: "", category: "Bedsheets", price: "", originalPrice: "", emoji: "🌸", color: "#fce8f0", tag: "", description: "", stock: "", image: "" });
    toast_("Product added 🌸");
  };
  const saveEdit = () => { setProducts(p => p.map(x => x.id === editProd.id ? { ...editProd } : x)); setEditProd(null); toast_("Updated ✓"); };

  const uploadImage = async (file, onSuccess) => {
    if (!file) return;
    toast_("Uploading image... ⏳");
    const fd = new FormData();
    fd.append("file", file);
    fd.append("upload_preset", "artsywishh");
    try {
      const res = await fetch("https://api.cloudinary.com/v1_1/divzsy0gp/image/upload", { method: "POST", body: fd });
      const data = await res.json();
      if (data.secure_url) { onSuccess(data.secure_url); toast_("Image uploaded! ✅"); }
      else toast_("Upload failed ❌");
    } catch { toast_("Upload failed ❌"); }
  };
  const navTo = (id) => { document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }); setActiveNav(id); };

  return (
    <div style={{ fontFamily: "'Cormorant Garamond',Georgia,serif", background: "#fdf8f5", minHeight: "100vh", color: "#3d2c2c" }}>
      <style>{CSS}</style>

      {/* HEADER */}
      <header style={{ background: "white", borderBottom: "1px solid #f5e6e8", padding: "0 16px", height: 56, display: "flex", alignItems: "center", justifyContent: "space-between", position: "sticky", top: 0, zIndex: 50, boxShadow: "0 2px 20px rgba(232,180,184,.12)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
          <span style={{ fontSize: 18 }}>🌸</span>
          <div style={{ fontSize: 17, fontWeight: 600, color: "#c4738a", letterSpacing: 2 }}>Artsywishh</div>
        </div>
        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
          <button onClick={() => setSearchOpen(v => !v)} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 18, color: "#c4738a" }}>🔍</button>
          <button onClick={() => setAdminOpen(true)} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 18, color: "#c4738a" }} title="Admin">⚙️</button>
          <button onClick={() => setCartOpen(true)} style={{ background: "linear-gradient(135deg,#e8b4b8,#d4899a)", border: "none", cursor: "pointer", borderRadius: 50, padding: "7px 14px", display: "flex", alignItems: "center", gap: 6 }}>
            <span style={{ fontSize: 16 }}>🛍️</span>
            <span style={{ fontFamily: "'Jost',sans-serif", fontSize: 12, fontWeight: 600, color: "white" }}>Bag</span>
            {cartCount > 0 && <span style={{ background: "white", color: "#c4738a", borderRadius: "50%", width: 18, height: 18, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Jost',sans-serif", fontSize: 10, fontWeight: 700 }}>{cartCount}</span>}
          </button>
        </div>
      </header>

      {/* HERO */}
      <div style={{ background: "linear-gradient(135deg,#fdf0f3 0%,#fdf8f5 50%,#f5f0fd 100%)", padding: "72px 32px 56px", textAlign: "center", position: "relative", overflow: "hidden", borderBottom: "1px solid #f5e6e8" }}>
        {[{ e: "🌸", s: { top: 16, left: "7%", fontSize: 64, position: "absolute", opacity: .14, pointerEvents: "none" } }, { e: "🌷", s: { top: 30, right: "9%", fontSize: 44, position: "absolute", opacity: .14, pointerEvents: "none" } }, { e: "✨", s: { bottom: 16, left: "17%", fontSize: 36, position: "absolute", opacity: .14, pointerEvents: "none" } }, { e: "🌺", s: { bottom: 24, right: "20%", fontSize: 52, position: "absolute", opacity: .14, pointerEvents: "none" } }].map((x, i) => <span key={i} style={x.s}>{x.e}</span>)}
        <p style={{ fontFamily: "'Jost',sans-serif", letterSpacing: 4, textTransform: "uppercase", fontSize: 11, color: "#d4a0a8", marginBottom: 16 }}>Spring — Summer 2026</p>
        <h1 style={{ fontSize: "clamp(38px,6vw,66px)", fontWeight: 300, color: "#3d2c2c", lineHeight: 1.12, marginBottom: 18 }}>
          Where Every Thread<br /><em style={{ color: "#c4738a", fontStyle: "italic" }}>Tells a Story</em>
        </h1>
        <p style={{ fontFamily: "'Jost',sans-serif", fontSize: 15, color: "#9a7070", maxWidth: 500, margin: "0 auto 32px", lineHeight: 1.85, fontWeight: 300 }}>
          Handpicked bedsheets, sarees & original artwork — crafted for homes that feel like poetry.
        </p>
        <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
          <button className="btn btn-rose" onClick={() => navTo("shop")}>Shop Now 🌸</button>
          <button className="btn btn-wa" onClick={() => window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hi Artsywishh! 🌸 I'd like to know more about your collection.")}`, "_blank")}>💬 WhatsApp Us</button>
        </div>
        <div style={{ display: "flex", gap: 32, justifyContent: "center", marginTop: 44, flexWrap: "wrap" }}>
          {[["🚚", "Flat Shipping", "₹99 on all orders"], ["↩️", "Easy Returns", "7-day policy"], ["✅", "Handpicked", "quality assured"], ["🎁", "Gift Wrapping", "on request"]].map(([ic, t, s]) => (
            <div key={t} style={{ textAlign: "center" }}>
              <div style={{ fontSize: 22, marginBottom: 4 }}>{ic}</div>
              <div style={{ fontFamily: "'Jost',sans-serif", fontSize: 12, fontWeight: 500, color: "#7d5c5c" }}>{t}</div>
              <div style={{ fontFamily: "'Jost',sans-serif", fontSize: 11, color: "#b09090" }}>{s}</div>
            </div>
          ))}
        </div>
      </div>

      {/* SHOP */}
      <div id="shop" style={{ maxWidth: 1200, margin: "0 auto", padding: "56px 24px" }}>
        <SectionHead title="Shop by Category" sub="Our Collection" />
        {searchOpen && (
          <div style={{ maxWidth: 480, margin: "0 auto 28px", position: "relative" }}>
            <input ref={searchRef} value={search} onChange={e => setSearch(e.target.value)} placeholder="Search bedsheets, sarees, artwork…" style={{ paddingRight: 42 }} />
            <button onClick={() => { setSearchOpen(false); setSearch(""); }} style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "#c4738a", fontSize: 15 }}>✕</button>
          </div>
        )}
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 36, justifyContent: "center" }}>
          {CATEGORIES.map(c => <button key={c} className={`cat-btn ${cat === c ? "active" : ""}`} onClick={() => setCat(c)}>{c}</button>)}
        </div>
        <p style={{ fontFamily: "'Jost',sans-serif", fontSize: 13, color: "#b09090", marginBottom: 24 }}>{filtered.length} items</p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(240px,1fr))", gap: 24 }}>
          {filtered.map((p, i) => (
            <div key={p.id} className="card-hover anim-fade" onClick={() => setSelProd(p)} style={{ background: "white", borderRadius: 18, overflow: "hidden", boxShadow: "0 4px 22px rgba(180,100,110,.08)", animationDelay: `${i * 0.04}s`, opacity: 0 }}>
              <div style={{ height: 190, position: "relative", overflow: "hidden", background: p.color }}>
                <img src={p.image} alt={p.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} onError={e => { e.target.style.display = "none"; }} />
                {p.tag && <span className="tag-badge" style={{ position: "absolute", top: 10, left: 10, background: p.tag === "Sale" ? "#ffebee" : p.tag === "Premium" ? "#fff8e1" : "#fce8f0", color: p.tag === "Sale" ? "#e57373" : p.tag === "Premium" ? "#f9a825" : "#c4738a" }}>{p.tag}</span>}
                {p.stock === 0 && <div style={{ position: "absolute", inset: 0, background: "rgba(255,255,255,.65)", display: "flex", alignItems: "center", justifyContent: "center" }}><span style={{ fontFamily: "'Jost',sans-serif", fontSize: 12, fontWeight: 600, color: "#c4738a", letterSpacing: 2, textTransform: "uppercase" }}>Sold Out</span></div>}
                {p.stock > 0 && p.stock <= 3 && <span style={{ position: "absolute", bottom: 8, right: 8, background: "#fff3e0", color: "#e65100", fontFamily: "'Jost',sans-serif", fontSize: 10, padding: "3px 8px", borderRadius: 20 }}>Only {p.stock} left!</span>}
              </div>
              <div style={{ padding: "16px 18px 20px" }}>
                <Lbl ch={p.category} />
                <h3 style={{ fontSize: 17, fontWeight: 500, lineHeight: 1.3, marginBottom: 10 }}>{p.name}</h3>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8 }}>
                  <div>
                    <span style={{ fontFamily: "'Jost',sans-serif", fontSize: 17, fontWeight: 600, color: "#c4738a" }}>₹{p.price.toLocaleString()}</span>
                    <span style={{ fontFamily: "'Jost',sans-serif", fontSize: 12, color: "#c0a0a0", textDecoration: "line-through", marginLeft: 7 }}>₹{p.originalPrice.toLocaleString()}</span>
                  </div>
                  {p.stock > 0 && <button className="btn btn-rose" style={{ padding: "7px 15px", fontSize: 12 }} onClick={e => { e.stopPropagation(); addCart(p); }}>Add</button>}
                </div>
              </div>
            </div>
          ))}
          {filtered.length === 0 && (
            <div style={{ gridColumn: "1/-1", textAlign: "center", padding: "72px 0", color: "#c0a0a0" }}>
              <div style={{ fontSize: 52, marginBottom: 16 }}>🌸</div>
              <p style={{ fontFamily: "'Jost',sans-serif", fontSize: 15 }}>No items found.</p>
            </div>
          )}
        </div>
      </div>

      {/* INSTAGRAM */}
      <div id="instagram" style={{ background: "white", padding: "56px 24px", borderTop: "1px solid #f5e6e8" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <SectionHead title="As Seen on Instagram" sub="Follow @artsywishh" />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(158px,1fr))", gap: 12, marginBottom: 28 }}>
            {INSTAGRAM_POSTS.map(post => (
              <div key={post.id} className="insta-card" onClick={() => window.open("https://instagram.com/artsywishh", "_blank")}>
                <div style={{ background: post.bg, height: 158, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 52 }}>{post.emoji}</div>
                <div style={{ padding: "10px 12px", background: "white" }}>
                  <p style={{ fontFamily: "'Jost',sans-serif", fontSize: 12, color: "#9a7070", marginBottom: 2 }}>❤️ {post.likes}</p>
                  <p style={{ fontFamily: "'Jost',sans-serif", fontSize: 11, color: "#b09090", overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis" }}>{post.caption}</p>
                </div>
              </div>
            ))}
          </div>
          <div style={{ textAlign: "center" }}>
            <button className="btn btn-ghost" onClick={() => window.open("https://instagram.com/artsywishh", "_blank")}>📸 Follow on Instagram</button>
          </div>
        </div>
      </div>

      {/* ABOUT */}
      <div id="about" style={{ background: "linear-gradient(135deg,#fdf0f3,#fdf8f5)", padding: "56px 24px", borderTop: "1px solid #f5e6e8" }}>
        <div style={{ maxWidth: 680, margin: "0 auto", textAlign: "center" }}>
          <SectionHead title="Made with Love" sub="Our Story" />
          <p style={{ fontSize: 18, fontWeight: 300, lineHeight: 2, color: "#7d5c5c", marginBottom: 28 }}>
            Artsywishh began as a dream — to bring beautiful, thoughtfully curated home textiles and original artwork to homes across India.<br /><br />
            Every piece is hand-selected for its quality, artistry, and the feeling it brings to your space. From luxurious sarees to dreamy bedsheets and one-of-a-kind artwork, each item carries a little bit of soul.
          </p>
          <button className="btn btn-wa" onClick={() => window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hi! I'd love to learn more about Artsywishh 🌸")}`, "_blank")}>💬 Chat with Us</button>
        </div>
      </div>

      {/* FOOTER */}
      <footer style={{ background: "#3d2c2c", padding: "38px 32px 26px", textAlign: "center" }}>
        <div style={{ fontSize: 18, marginBottom: 10 }}>🌸 <span style={{ fontSize: 16, fontWeight: 600, color: "#e8b4b8", letterSpacing: 2.5 }}>Artsywishh</span> 🌸</div>
        <p style={{ fontFamily: "'Jost',sans-serif", fontSize: 12, color: "#a08888", lineHeight: 2 }}>
          Flat shipping ₹99 · Easy 7-day returns · Gift wrapping available<br />
          <span style={{ cursor: "pointer", color: "#e8b4b8" }} onClick={() => window.open(`https://wa.me/${WHATSAPP_NUMBER}`, "_blank")}>📱 +91 99999 51933</span>
          {" · "}
          <span style={{ cursor: "pointer", color: "#e8b4b8" }} onClick={() => window.open("https://instagram.com/artsywishh", "_blank")}>📸 @artsywishh</span>
        </p>
        <p style={{ fontFamily: "'Jost',sans-serif", fontSize: 11, color: "#6d5050", marginTop: 14 }}>© 2026 Artsywishh · Made with 💕</p>
      </footer>

      {/* PRODUCT MODAL */}
      {selProd && (
        <>
          <div className="overlay" onClick={() => setSelProd(null)} />
          <div className="modal anim-pop">
            <button onClick={() => setSelProd(null)} style={{ position: "absolute", top: 14, right: 18, background: "none", border: "none", cursor: "pointer", fontSize: 19, color: "#c4738a" }}>✕</button>
            <div style={{ background: selProd.color, borderRadius: 16, height: 200, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 24, overflow: "hidden", position: "relative" }}>
              <img src={selProd.image} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", position: "absolute" }} onError={e => e.target.style.display = "none"} />
              <span style={{ fontSize: 72, position: "relative", zIndex: 1 }}>{selProd.emoji}</span>
            </div>
            <Lbl ch={selProd.category} />
            <h2 style={{ fontSize: 26, fontWeight: 500, marginBottom: 10 }}>{selProd.name}</h2>
            <p style={{ fontFamily: "'Jost',sans-serif", fontSize: 14, color: "#9a7070", lineHeight: 1.85, marginBottom: 18 }}>{selProd.description}</p>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: selProd.stock > 0 && selProd.stock <= 5 ? 8 : 20 }}>
              <span style={{ fontFamily: "'Jost',sans-serif", fontSize: 22, fontWeight: 700, color: "#c4738a" }}>₹{selProd.price.toLocaleString()}</span>
              <span style={{ fontFamily: "'Jost',sans-serif", fontSize: 14, color: "#c0a0a0", textDecoration: "line-through" }}>₹{selProd.originalPrice.toLocaleString()}</span>
              <span className="tag-badge" style={{ background: "#fce8f0", color: "#c4738a" }}>{Math.round((1 - selProd.price / selProd.originalPrice) * 100)}% off</span>
            </div>
            {selProd.stock > 0 && selProd.stock <= 5 && <p style={{ fontFamily: "'Jost',sans-serif", fontSize: 12, color: "#e65100", marginBottom: 16 }}>⚠️ Only {selProd.stock} left!</p>}
            {selProd.stock === 0
              ? <button className="btn btn-wa" style={{ width: "100%", padding: 13 }} onClick={() => waProduct(selProd)}>💬 Notify me on WhatsApp</button>
              : <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                  <button className="btn btn-rose" style={{ flex: 1, padding: 13 }} onClick={() => addCart(selProd)}>Add to Bag 🛍️</button>
                  <button className="btn btn-wa" style={{ flex: 1, padding: 13 }} onClick={() => waProduct(selProd)}>💬 Order via WhatsApp</button>
                </div>
            }
          </div>
        </>
      )}

      {/* CART */}
      {cartOpen && (
        <>
          <div className="overlay" onClick={() => setCartOpen(false)} />
          <div className="panel anim-slide">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
              <h2 style={{ fontSize: 22, fontWeight: 500 }}>Your Bag 🛍️</h2>
              <button onClick={() => setCartOpen(false)} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 19, color: "#c4738a" }}>✕</button>
            </div>
            {cart.length === 0
              ? <div style={{ textAlign: "center", padding: "64px 0", color: "#c0a0a0" }}>
                  <div style={{ fontSize: 52, marginBottom: 14 }}>🌸</div>
                  <p style={{ fontFamily: "'Jost',sans-serif", fontSize: 15 }}>Your bag is empty</p>
                </div>
              : <>
                  <div style={{ display: "flex", flexDirection: "column", gap: 13, marginBottom: 22 }}>
                    {cart.map(item => (
                      <div key={item.id} style={{ display: "flex", gap: 12, background: "white", borderRadius: 14, padding: 13, boxShadow: "0 2px 12px rgba(180,100,110,.06)" }}>
                        <div style={{ background: item.color, borderRadius: 10, width: 52, height: 52, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24, flexShrink: 0, overflow: "hidden" }}>
                          <img src={item.image} style={{ width: "100%", height: "100%", objectFit: "cover" }} onError={e => e.target.style.display = "none"} alt="" />
                        </div>
                        <div style={{ flex: 1 }}>
                          <p style={{ fontSize: 14, fontWeight: 500, lineHeight: 1.3, marginBottom: 7 }}>{item.name}</p>
                          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                            <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
                              <button onClick={() => updateQty(item.id, -1)} style={{ width: 24, height: 24, borderRadius: "50%", border: "1px solid #f0d8da", background: "white", cursor: "pointer", color: "#c4738a", display: "flex", alignItems: "center", justifyContent: "center" }}>−</button>
                              <span style={{ fontFamily: "'Jost',sans-serif", fontSize: 14, width: 20, textAlign: "center" }}>{item.qty}</span>
                              <button onClick={() => updateQty(item.id, 1)} style={{ width: 24, height: 24, borderRadius: "50%", border: "1px solid #f0d8da", background: "white", cursor: "pointer", color: "#c4738a", display: "flex", alignItems: "center", justifyContent: "center" }}>+</button>
                            </div>
                            <span style={{ fontFamily: "'Jost',sans-serif", fontWeight: 600, color: "#c4738a" }}>₹{(item.price * item.qty).toLocaleString()}</span>
                          </div>
                        </div>
                        <button onClick={() => removeCart(item.id)} style={{ background: "none", border: "none", cursor: "pointer", color: "#d4a0a8", alignSelf: "flex-start" }}>✕</button>
                      </div>
                    ))}
                  </div>
                  <div style={{ borderTop: "1px solid #f5e6e8", paddingTop: 16 }}>
                    <p style={{ fontFamily: "'Jost',sans-serif", fontSize: 12, color: "#d4a0a8", marginBottom: 10 }}>🚚 Shipping: ₹99</p>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16 }}>
                      <span style={{ fontFamily: "'Jost',sans-serif", color: "#9a7070" }}>Total (incl. shipping)</span>
                      <span style={{ fontFamily: "'Jost',sans-serif", fontWeight: 700, fontSize: 18, color: "#3d2c2c" }}>₹{grandTotal.toLocaleString()}</span>
                    </div>
                    <button className="btn btn-wa" style={{ width: "100%", padding: 13 }} onClick={() => { waCart(); setCartOpen(false); }}>💬 Order via WhatsApp</button>
                  </div>
                </>
            }
          </div>
        </>
      )}

      {/* ADMIN */}
      {adminOpen && (
        <>
          <div className="overlay" onClick={() => { setAdminOpen(false); setAdminAuth(false); }} />
          <div className="panel anim-slide" style={{ width: 460 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
              <h2 style={{ fontSize: 20, fontWeight: 500 }}>⚙️ Admin Panel</h2>
              <button onClick={() => { setAdminOpen(false); setAdminAuth(false); }} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 19, color: "#c4738a" }}>✕</button>
            </div>
            {!adminAuth
              ? <div>
                  <p style={{ fontFamily: "'Jost',sans-serif", fontSize: 14, color: "#9a7070", marginBottom: 16 }}>Enter admin password:</p>
                  <input type="password" value={adminPass} onChange={e => setAdminPass(e.target.value)} placeholder="Password" onKeyDown={e => e.key === "Enter" && authAdmin()} style={{ marginBottom: 12 }} />
                  <button className="btn btn-rose" style={{ width: "100%", padding: 12 }} onClick={authAdmin}>Login</button>
                  <p style={{ fontFamily: "'Jost',sans-serif", fontSize: 11, color: "#c0a0a0", textAlign: "center", marginTop: 10 }}>Demo: artsywishh123</p>
                </div>
              : <>
                  <div className="tab-seg" style={{ marginBottom: 22 }}>
                    {["products", "add"].map(t => (
                      <button key={t} className={`tab-btn ${adminTab === t ? "active-tab" : ""}`} onClick={() => setAdminTab(t)}>{t}</button>
                    ))}
                  </div>
                  {adminTab === "products" && (
                    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                      {products.map(p => (
                        <div key={p.id} className="admin-row" style={{ background: "white", borderRadius: 12, padding: "12px 14px", display: "flex", alignItems: "center", gap: 10, boxShadow: "0 2px 8px rgba(0,0,0,.04)" }}>
                          <div style={{ width: 38, height: 38, background: p.color, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, flexShrink: 0 }}>{p.emoji}</div>
                          <div style={{ flex: 1, minWidth: 0 }}>
                            <p style={{ fontSize: 14, fontWeight: 500, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{p.name}</p>
                            <p style={{ fontFamily: "'Jost',sans-serif", fontSize: 11, color: "#b09090" }}>₹{p.price.toLocaleString()} · Stock: {p.stock}</p>
                          </div>
                          <div style={{ display: "flex", gap: 5, flexShrink: 0 }}>
                            <button className="btn-sm-ok" onClick={() => toggleStock(p.id)}>{p.stock > 0 ? "✓ In Stock" : "✗ OOS"}</button>
                            <button className="btn-sm-edit" onClick={() => setEditProd({ ...p })}>Edit</button>
                            <button className="btn-sm-danger" onClick={() => delProd(p.id)}>Del</button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                  {adminTab === "add" && (
                    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                      {[["PRODUCT NAME *", "name", "Product name"], ["TAG", "tag", "New / Sale / Premium…"]].map(([l, k, ph]) => (
                        <div key={k}><label style={{ fontFamily: "'Jost',sans-serif", fontSize: 11, color: "#9a7070", display: "block", marginBottom: 4, letterSpacing: 0.5 }}>{l}</label><input value={newProd[k]} onChange={e => setNewProd(p => ({ ...p, [k]: e.target.value }))} placeholder={ph} /></div>
                      ))}
                      <div>
                        <label style={{ fontFamily: "'Jost',sans-serif", fontSize: 11, color: "#9a7070", display: "block", marginBottom: 6, letterSpacing: 0.5 }}>PRODUCT IMAGE</label>
                        <input type="file" accept="image/*" id="new-img-upload" style={{ display: "none" }} onChange={e => uploadImage(e.target.files[0], url => setNewProd(p => ({ ...p, image: url })))} />
                        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                          <label htmlFor="new-img-upload" style={{ background: "linear-gradient(135deg,#e8b4b8,#d4899a)", color: "white", padding: "9px 18px", borderRadius: 50, fontFamily: "'Jost',sans-serif", fontSize: 12, fontWeight: 500, cursor: "pointer", letterSpacing: 0.5 }}>📱 Upload Photo</label>
                          {newProd.image && <img src={newProd.image} alt="" style={{ width: 44, height: 44, borderRadius: 8, objectFit: "cover", border: "2px solid #e8b4b8" }} />}
                        </div>
                        {newProd.image && <p style={{ fontFamily: "'Jost',sans-serif", fontSize: 10, color: "#7abd7a", marginTop: 5 }}>✅ Image uploaded successfully</p>}
                      </div>
                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                        {[["PRICE ₹ *", "price", "1299"], ["ORIGINAL ₹", "originalPrice", "1799"]].map(([l, k, ph]) => (
                          <div key={k}><label style={{ fontFamily: "'Jost',sans-serif", fontSize: 11, color: "#9a7070", display: "block", marginBottom: 4, letterSpacing: 0.5 }}>{l}</label><input value={newProd[k]} onChange={e => setNewProd(p => ({ ...p, [k]: e.target.value }))} placeholder={ph} /></div>
                        ))}
                      </div>
                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                        <div><label style={{ fontFamily: "'Jost',sans-serif", fontSize: 11, color: "#9a7070", display: "block", marginBottom: 4, letterSpacing: 0.5 }}>CATEGORY</label>
                          <select value={newProd.category} onChange={e => setNewProd(p => ({ ...p, category: e.target.value }))}><option>Bedsheets</option><option>Sarees</option><option>Artwork</option></select>
                        </div>
                        <div><label style={{ fontFamily: "'Jost',sans-serif", fontSize: 11, color: "#9a7070", display: "block", marginBottom: 4, letterSpacing: 0.5 }}>STOCK</label><input value={newProd.stock} onChange={e => setNewProd(p => ({ ...p, stock: e.target.value }))} placeholder="10" /></div>
                      </div>
                      <div><label style={{ fontFamily: "'Jost',sans-serif", fontSize: 11, color: "#9a7070", display: "block", marginBottom: 4, letterSpacing: 0.5 }}>EMOJI</label><input value={newProd.emoji} onChange={e => setNewProd(p => ({ ...p, emoji: e.target.value }))} placeholder="🌸" /></div>
                      <div><label style={{ fontFamily: "'Jost',sans-serif", fontSize: 11, color: "#9a7070", display: "block", marginBottom: 4, letterSpacing: 0.5 }}>DESCRIPTION</label><textarea rows={3} value={newProd.description} onChange={e => setNewProd(p => ({ ...p, description: e.target.value }))} placeholder="Product description…" style={{ resize: "none" }} /></div>
                      <button className="btn btn-rose" style={{ width: "100%", padding: 13 }} onClick={saveNew}>Add Product 🌸</button>
                    </div>
                  )}
                </>
            }
          </div>
        </>
      )}

      {/* EDIT PRODUCT */}
      {editProd && (
        <>
          <div className="overlay" onClick={() => setEditProd(null)} />
          <div className="modal anim-pop" style={{ maxWidth: 460 }}>
            <button onClick={() => setEditProd(null)} style={{ position: "absolute", top: 14, right: 18, background: "none", border: "none", cursor: "pointer", fontSize: 19, color: "#c4738a" }}>✕</button>
            <h2 style={{ fontSize: 20, fontWeight: 500, marginBottom: 20 }}>Edit Product</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {[["NAME", "name"], ["IMAGE URL", "image"]].map(([l, k]) => (
                <div key={k}><label style={{ fontFamily: "'Jost',sans-serif", fontSize: 11, color: "#9a7070", display: "block", marginBottom: 4, letterSpacing: 0.5 }}>{l}</label><input value={editProd[k] || ""} onChange={e => setEditProd(p => ({ ...p, [k]: e.target.value }))} /></div>
              ))}
              <div>
                <label style={{ fontFamily: "'Jost',sans-serif", fontSize: 11, color: "#9a7070", display: "block", marginBottom: 6, letterSpacing: 0.5 }}>REPLACE IMAGE</label>
                <input type="file" accept="image/*" id="edit-img-upload" style={{ display: "none" }} onChange={e => uploadImage(e.target.files[0], url => setEditProd(p => ({ ...p, image: url })))} />
                <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                  <label htmlFor="edit-img-upload" style={{ background: "linear-gradient(135deg,#e8b4b8,#d4899a)", color: "white", padding: "9px 18px", borderRadius: 50, fontFamily: "'Jost',sans-serif", fontSize: 12, fontWeight: 500, cursor: "pointer", letterSpacing: 0.5 }}>📱 Upload New Photo</label>
                  {editProd.image && <img src={editProd.image} alt="" style={{ width: 44, height: 44, borderRadius: 8, objectFit: "cover", border: "2px solid #e8b4b8" }} />}
                </div>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                {[["PRICE ₹", "price"], ["ORIGINAL ₹", "originalPrice"]].map(([l, k]) => (
                  <div key={k}><label style={{ fontFamily: "'Jost',sans-serif", fontSize: 11, color: "#9a7070", display: "block", marginBottom: 4, letterSpacing: 0.5 }}>{l}</label><input type="number" value={editProd[k] || ""} onChange={e => setEditProd(p => ({ ...p, [k]: +e.target.value }))} /></div>
                ))}
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                {[["STOCK", "stock"], ["TAG", "tag"]].map(([l, k]) => (
                  <div key={k}><label style={{ fontFamily: "'Jost',sans-serif", fontSize: 11, color: "#9a7070", display: "block", marginBottom: 4, letterSpacing: 0.5 }}>{l}</label><input value={editProd[k] || ""} onChange={e => setEditProd(p => ({ ...p, [k]: k === "stock" ? +e.target.value : e.target.value }))} /></div>
                ))}
              </div>
              <div><label style={{ fontFamily: "'Jost',sans-serif", fontSize: 11, color: "#9a7070", display: "block", marginBottom: 4, letterSpacing: 0.5 }}>DESCRIPTION</label><textarea rows={3} value={editProd.description || ""} onChange={e => setEditProd(p => ({ ...p, description: e.target.value }))} style={{ resize: "none" }} /></div>
              <button className="btn btn-rose" style={{ width: "100%", padding: 13 }} onClick={saveEdit}>Save Changes ✓</button>
            </div>
          </div>
        </>
      )}

      {/* TOAST */}
      {toast && (
        <div className="anim-toast" style={{ position: "fixed", bottom: 26, left: "50%", transform: "translateX(-50%)", background: "linear-gradient(135deg,#e8b4b8,#d4899a)", color: "white", padding: "11px 22px", borderRadius: 50, fontFamily: "'Jost',sans-serif", fontSize: 13, boxShadow: "0 8px 30px rgba(196,115,138,.4)", zIndex: 200, whiteSpace: "nowrap" }}>
          ✓ {toast}
        </div>
      )}

      {/* FLOATING WA */}
      <button className="btn btn-wa" onClick={() => window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hi Artsywishh! 🌸")}`, "_blank")}
        style={{ position: "fixed", bottom: 24, right: 24, borderRadius: "50%", width: 54, height: 54, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, boxShadow: "0 6px 24px rgba(37,211,102,.4)", zIndex: 49, padding: 0 }} title="WhatsApp">
        💬
      </button>
    </div>
  );
}
