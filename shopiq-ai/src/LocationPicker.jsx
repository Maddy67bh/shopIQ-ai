import { useEffect, useRef, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "./LocationPicker.css";

const DEFAULT_CENTER = { lat: 20.5937, lng: 78.9629 };

export default function LocationPicker({ open, initialLocation, onClose, onConfirm }) {
  const mapElement = useRef(null);
  const mapRef = useRef(null);
  const markerRef = useRef(null);
  const reverseLookupRef = useRef(null);

  const [coords, setCoords] = useState(
    initialLocation?.coords || DEFAULT_CENTER
  );
  const [query, setQuery] = useState("");
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");

  const [form, setForm] = useState({
    street: initialLocation?.street || "",
    area: initialLocation?.area || "",
    city: initialLocation?.city || "",
    pincode: initialLocation?.pincode || "",
    landmark: initialLocation?.landmark || "",
    phone: initialLocation?.phone || ""
  });

  function updateField(key, value) {
    setForm(previous => ({ ...previous, [key]: value }));
  }

  useEffect(() => {
    if (!open || !mapElement.current) return;

    const start = initialLocation?.coords || DEFAULT_CENTER;
    const map = L.map(mapElement.current).setView(
      [start.lat, start.lng],
      initialLocation?.coords ? 15 : 5
    );

    mapRef.current = map;

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

    const marker = L.marker([start.lat, start.lng], {
      draggable: true,
      autoPan: true
    }).addTo(map);

    markerRef.current = marker;
    setCoords(start);

    async function reverseLookup(lat, lng) {
      setCoords({ lat, lng });
      setMessage("");

      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}&zoom=18&addressdetails=1`
        );
        if (!response.ok) return;

        const result = await response.json();
        const a = result.address || {};

        setForm(previous => ({
          ...previous,
          street: [a.house_number, a.road].filter(Boolean).join(" ") || previous.street,
          area: a.suburb || a.neighbourhood || a.residential || previous.area,
          city: a.city || a.town || a.village || a.municipality || previous.city,
          pincode: a.postcode || previous.pincode
        }));
      } catch {
        setMessage("Address lookup unavailable. You can enter your address manually.");
      }
    }

    reverseLookupRef.current = reverseLookup;

    map.on("click", event => {
      marker.setLatLng(event.latlng);
      reverseLookup(event.latlng.lat, event.latlng.lng);
    });

    marker.on("dragend", () => {
      const point = marker.getLatLng();
      reverseLookup(point.lat, point.lng);
    });

    const resize = window.setTimeout(() => map.invalidateSize(), 150);

    return () => {
      window.clearTimeout(resize);
      reverseLookupRef.current = null;
      map.remove();
      mapRef.current = null;
      markerRef.current = null;
    };
  }, [open]);

  async function searchLocation(event) {
    event.preventDefault();
    if (!query.trim()) return;

    setBusy(true);
    setMessage("");

    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=jsonv2&limit=1&addressdetails=1&q=${encodeURIComponent(query)}`
      );
      if (!response.ok) throw new Error("Search unavailable");

      const results = await response.json();
      if (!results.length) {
        setMessage("Location not found. Try a nearby area, city or PIN code.");
        return;
      }

      const result = results[0];
      const lat = Number(result.lat);
      const lng = Number(result.lon);
      const point = { lat, lng };

      setCoords(point);
      mapRef.current?.setView([lat, lng], 16);
      markerRef.current?.setLatLng([lat, lng]);

      const a = result.address || {};
      setForm(previous => ({
        ...previous,
        street: [a.house_number, a.road].filter(Boolean).join(" ") || previous.street,
        area: a.suburb || a.neighbourhood || a.residential || previous.area,
        city: a.city || a.town || a.village || a.municipality || previous.city,
        pincode: a.postcode || previous.pincode
      }));
    } catch {
      setMessage("Could not search right now. Please try again or enter your address manually.");
    } finally {
      setBusy(false);
    }
  }

  function useCurrentLocation() {
    if (!navigator.geolocation) {
      setMessage("Location is not supported by this browser. Enter your address manually.");
      return;
    }

    setBusy(true);
    setMessage("");

    navigator.geolocation.getCurrentPosition(
      position => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;

        setCoords({ lat, lng });
        mapRef.current?.setView([lat, lng], 17);
        markerRef.current?.setLatLng([lat, lng]);
        reverseLookupRef.current?.(lat, lng);
        setBusy(false);
      },
      error => {
        setBusy(false);
        setMessage(
          error.code === 1
            ? "Location permission denied. Allow location access in your browser or enter the address manually."
            : "Could not detect your location. Please search or enter your address manually."
        );
      },
      { enableHighAccuracy: true, timeout: 12000, maximumAge: 60000 }
    );
  }

  function saveLocation(event) {
    event.preventDefault();

    if (!form.street.trim() || !form.city.trim() || !form.pincode.trim()) {
      setMessage("Please enter at least your street address, city and PIN code.");
      return;
    }

    if (!/^[0-9]{6}$/.test(form.pincode.trim())) {
      setMessage("Enter a valid 6-digit Indian PIN code.");
      return;
    }

    onConfirm({
      ...form,
      coords,
      formattedAddress: [
        form.street,
        form.area,
        form.city,
        form.pincode
      ].filter(Boolean).join(", ")
    });
  }

  if (!open) return null;

  return (
    <div className="location-overlay" role="presentation" onMouseDown={event => {
      if (event.target === event.currentTarget) onClose();
    }}>
      <section className="location-dialog" role="dialog" aria-modal="true" aria-labelledby="location-title">
        <div className="location-heading">
          <div>
            <span className="location-kicker">SHOPIQ DELIVERY</span>
            <h2 id="location-title">Choose your location</h2>
            <p>Pin your delivery spot and add your address.</p>
          </div>
          <button className="location-close" onClick={onClose} aria-label="Close location picker">×</button>
        </div>

        <form className="location-search" onSubmit={searchLocation}>
          <input
            value={query}
            onChange={event => setQuery(event.target.value)}
            placeholder="Search area, city or PIN code"
            aria-label="Search for a location"
          />
          <button type="submit" disabled={busy}>{busy ? "Please wait…" : "Search"}</button>
        </form>

        <button type="button" className="location-current" onClick={useCurrentLocation} disabled={busy}>
          <span>◎</span> Use my current location
        </button>

        <div className="location-map" ref={mapElement} aria-label="Interactive delivery map" />

        <p className="location-map-hint">Move the map pin or tap the map to select your delivery point.</p>

        <form className="location-address-form" onSubmit={saveLocation}>
          <div className="location-field">
            <label htmlFor="delivery-street">House / street address *</label>
            <input id="delivery-street" required value={form.street} onChange={e => updateField("street", e.target.value)} placeholder="Flat, house number, street" />
          </div>

          <div className="location-field">
            <label htmlFor="delivery-area">Area / locality</label>
            <input id="delivery-area" value={form.area} onChange={e => updateField("area", e.target.value)} placeholder="Area or neighbourhood" />
          </div>

          <div className="location-form-row">
            <div className="location-field">
              <label htmlFor="delivery-city">City *</label>
              <input id="delivery-city" required value={form.city} onChange={e => updateField("city", e.target.value)} placeholder="City" />
            </div>
            <div className="location-field">
              <label htmlFor="delivery-pin">PIN code *</label>
              <input id="delivery-pin" required inputMode="numeric" maxLength={6} value={form.pincode} onChange={e => updateField("pincode", e.target.value.replace(/\D/g, ""))} placeholder="6-digit PIN" />
            </div>
          </div>

          <div className="location-field">
            <label htmlFor="delivery-landmark">Landmark (optional)</label>
            <input id="delivery-landmark" value={form.landmark} onChange={e => updateField("landmark", e.target.value)} placeholder="Nearby landmark" />
          </div>

          <div className="location-field">
            <label htmlFor="delivery-phone">Contact phone (optional)</label>
            <input id="delivery-phone" type="tel" value={form.phone} onChange={e => updateField("phone", e.target.value)} placeholder="Delivery contact number" />
          </div>

          {message && <p className="location-message" role="status">{message}</p>}

          <div className="location-coordinates">
            <span>Selected map coordinates</span>
            <code>{coords.lat.toFixed(5)}, {coords.lng.toFixed(5)}</code>
          </div>

          <button className="location-confirm" type="submit">Confirm delivery location →</button>
        </form>

        <p className="location-disclaimer">Map data © OpenStreetMap contributors. Location access is optional; you can enter your address manually.</p>
      </section>
    </div>
  );
}
