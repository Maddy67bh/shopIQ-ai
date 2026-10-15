import { useState } from "react";
import "./OrderFlow.css";

export default function OrderFlow(props) {
  const [customer, setCustomer] = useState({
    name: "",
    phone: "",
    address: "",
    payment: "Cash on Delivery"
  });
  const [placed, setPlaced] = useState(false);
  const [orderId] = useState(
    () => "SQ" + Math.random().toString(36).slice(2, 8).toUpperCase()
  );

  const close = props.onClose || props.onBack;
  const items = props.cartItems || props.cart || props.items || [];
  const total = Number(
    props.total ??
    items.reduce((sum, item) =>
      sum + Number(item.price || 0) * Number(item.quantity || item.qty || 1), 0
    )
  );

  function update(e) {
    setCustomer({ ...customer, [e.target.name]: e.target.value });
  }

  function submit(e) {
    e.preventDefault();
    if (!customer.name.trim() || !customer.phone.trim() || !customer.address.trim()) {
      return;
    }

    const order = {
      orderId,
      ...customer,
      total,
      items,
      status: "Order placed",
      createdAt: new Date().toISOString()
    };

    try {
      const previous = JSON.parse(localStorage.getItem("shopiq-orders") || "[]");
      localStorage.setItem("shopiq-orders", JSON.stringify([order, ...previous]));
    } catch {
      // Checkout demo can still show confirmation if browser storage is unavailable.
    }

    setPlaced(true);
    const callback = props.onOrderComplete || props.onComplete || props.onOrderPlaced;
    if (typeof callback === "function") callback(order);
  }

  return (
    <div className="sq-order-backdrop" role="presentation">
      <section className="sq-order-panel" role="dialog" aria-modal="true" aria-labelledby="sq-order-title">
        <button className="sq-order-close" onClick={() => close?.()} aria-label="Close checkout">×</button>

        {placed ? (
          <div className="sq-order-success">
            <div className="sq-order-check">✓</div>
            <p className="sq-order-eyebrow">SHOPIQ AI</p>
            <h2 id="sq-order-title">Order placed!</h2>
            <p>Your demo order has been saved in this browser.</p>
            <div className="sq-order-id">Order ID: <strong>{orderId}</strong></div>
            <p className="sq-order-total">Total: ₹{total.toLocaleString("en-IN")}</p>
            <button className="sq-order-submit" onClick={() => close?.()}>Continue shopping</button>
          </div>
        ) : (
          <>
            <p className="sq-order-eyebrow">SHOPIQ AI · CHECKOUT</p>
            <h2 id="sq-order-title">Almost yours.</h2>
            <p className="sq-order-subtitle">Enter your delivery details to place a demo order.</p>

            <form onSubmit={submit} className="sq-order-form">
              <label>Full name
                <input name="name" value={customer.name} onChange={update} placeholder="Your name" required />
              </label>
              <label>Phone number
                <input name="phone" value={customer.phone} onChange={update} placeholder="10-digit mobile number" inputMode="tel" pattern="[0-9+() -]{10,18}" required />
              </label>
              <label>Delivery address
                <textarea name="address" value={customer.address} onChange={update} placeholder="House, street, city, PIN code" rows="3" required />
              </label>
              <label>Payment method
                <select name="payment" value={customer.payment} onChange={update}>
                  <option>Cash on Delivery</option>
                  <option>Demo Online Payment</option>
                </select>
              </label>
              <div className="sq-order-summary">
                <span>Order total</span>
                <strong>₹{total.toLocaleString("en-IN")}</strong>
              </div>
              <button className="sq-order-submit" type="submit">Place demo order →</button>
              <p className="sq-order-note">Demo checkout only. No real payment or courier booking is made.</p>
            </form>
          </>
        )}
      </section>
    </div>
  );
}
