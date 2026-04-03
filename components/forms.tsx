"use client";

import { useState } from "react";

import { serviceAreas } from "@/lib/data";
import { getDictionary } from "@/lib/i18n";
import type { AppointmentRequest, Locale, Order, Product, QuoteEstimate, ServiceRequest } from "@/lib/types";

type StateMessage<T> = {
  loading: boolean;
  result?: T;
  error?: string;
};

export function QuoteForm({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);
  const [estimate, setEstimate] = useState<StateMessage<QuoteEstimate>>({ loading: false });
  const [request, setRequest] = useState<StateMessage<ServiceRequest>>({ loading: false });
  const [form, setForm] = useState({
    city: "Istanbul",
    district: "Kadikoy",
    propertyType: "apartment",
    squareMeters: 120,
    floorCount: 4,
    apartmentCount: 8,
    jobType: "new-installation",
    fullName: "",
    phone: "",
    email: "",
    notes: "",
  });

  async function handleEstimate() {
    setEstimate({ loading: true });
    const response = await fetch("/api/quote/estimate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    if (!response.ok) {
      setEstimate({ loading: false, error: "Estimate could not be calculated." });
      return;
    }
    setEstimate({ loading: false, result: await response.json() });
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setRequest({ loading: true });
    const response = await fetch("/api/service-requests", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    if (!response.ok) {
      setRequest({ loading: false, error: "Request could not be saved." });
      return;
    }
    setRequest({ loading: false, result: await response.json() });
  }

  return (
    <div className="split-layout">
      <form className="form-card" onSubmit={handleSubmit}>
        <h2>{locale === "tr" ? "Elektrik Tesisat Teklifi" : "Electrical Installation Quote"}</h2>
        <div className="form-grid">
          <label>
            City
            <input value={form.city} onChange={(event) => setForm({ ...form, city: event.target.value })} />
          </label>
          <label>
            District
            <input value={form.district} onChange={(event) => setForm({ ...form, district: event.target.value })} />
          </label>
          <label>
            Property type
            <select
              value={form.propertyType}
              onChange={(event) => setForm({ ...form, propertyType: event.target.value })}
            >
              <option value="apartment">Apartment</option>
              <option value="villa">Villa</option>
              <option value="office">Office</option>
              <option value="shop">Shop</option>
            </select>
          </label>
          <label>
            Job type
            <select value={form.jobType} onChange={(event) => setForm({ ...form, jobType: event.target.value })}>
              <option value="new-installation">New installation</option>
              <option value="renovation">Renovation</option>
              <option value="fault-detection">Fault detection</option>
              <option value="panel-upgrade">Panel upgrade</option>
            </select>
          </label>
          <label>
            m2
            <input type="number" value={form.squareMeters} onChange={(event) => setForm({ ...form, squareMeters: Number(event.target.value) })} />
          </label>
          <label>
            Floor count
            <input type="number" value={form.floorCount} onChange={(event) => setForm({ ...form, floorCount: Number(event.target.value) })} />
          </label>
          <label>
            Apartment count
            <input type="number" value={form.apartmentCount} onChange={(event) => setForm({ ...form, apartmentCount: Number(event.target.value) })} />
          </label>
          <label>
            Full name
            <input value={form.fullName} onChange={(event) => setForm({ ...form, fullName: event.target.value })} />
          </label>
          <label>
            Phone
            <input value={form.phone} onChange={(event) => setForm({ ...form, phone: event.target.value })} />
          </label>
          <label>
            Email
            <input value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} />
          </label>
          <label className="full-span">
            Notes
            <textarea value={form.notes} onChange={(event) => setForm({ ...form, notes: event.target.value })} />
          </label>
        </div>
        <div className="button-row">
          <button type="button" className="button secondary" onClick={handleEstimate}>
            {estimate.loading ? t.common.loading : locale === "tr" ? "Fiyati Hesapla" : "Calculate estimate"}
          </button>
          <button type="submit" className="button primary">
            {request.loading ? t.common.loading : locale === "tr" ? "Talep Gonder" : "Submit request"}
          </button>
        </div>
      </form>
      <aside className="side-card">
        <h3>{locale === "tr" ? "Canli sonuc" : "Live estimate result"}</h3>
        {estimate.result ? (
          <>
            <p className="price">{estimate.result.averagePrice.toLocaleString("tr-TR")} TL</p>
            <p>{t.common.starting}: {estimate.result.minimumPrice.toLocaleString("tr-TR")} - {estimate.result.maximumPrice.toLocaleString("tr-TR")} TL</p>
            <p>{estimate.result.packageLabel}</p>
            <p>{estimate.result.supportedArea ? t.common.supported : t.common.unsupported}</p>
            <p>{t.common.note}</p>
          </>
        ) : (
          <p>{locale === "tr" ? "Formu doldurup hesaplama yaptiginizda ortalama fiyat burada gorunur." : "Fill in the form to view the average price result here."}</p>
        )}
        {request.result ? (
          <div className="success-box">
            <strong>{locale === "tr" ? "Talep kaydedildi" : "Request saved"}</strong>
            <p>{request.result.id}</p>
          </div>
        ) : null}
        <div className="service-area-list">
          <h4>{locale === "tr" ? "Servis bolgeleri" : "Coverage list"}</h4>
          {serviceAreas.map((area) => (
            <p key={area.city}>{area.city}: {area.districts.join(", ")} {area.supported ? "• live" : "• review"}</p>
          ))}
        </div>
      </aside>
    </div>
  );
}

export function AppointmentForm({ locale }: { locale: Locale }) {
  const [state, setState] = useState<StateMessage<AppointmentRequest>>({ loading: false });
  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    email: "",
    city: "Istanbul",
    district: "Kadikoy",
    requestedWindow: "",
    serviceNeed: "",
    notes: "",
  });

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState({ loading: true });
    const response = await fetch("/api/appointment-requests", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    if (!response.ok) {
      setState({ loading: false, error: "Request could not be created." });
      return;
    }
    setState({ loading: false, result: await response.json() });
  }

  return (
    <div className="split-layout">
      <form className="form-card" onSubmit={handleSubmit}>
        <h2>{locale === "tr" ? "Randevu talebi" : "Site visit request"}</h2>
        <div className="form-grid">
          <label>Full name<input value={form.fullName} onChange={(event) => setForm({ ...form, fullName: event.target.value })} /></label>
          <label>Phone<input value={form.phone} onChange={(event) => setForm({ ...form, phone: event.target.value })} /></label>
          <label>Email<input value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} /></label>
          <label>City<input value={form.city} onChange={(event) => setForm({ ...form, city: event.target.value })} /></label>
          <label>District<input value={form.district} onChange={(event) => setForm({ ...form, district: event.target.value })} /></label>
          <label>Preferred range<input placeholder="Mon-Fri / 10:00-14:00" value={form.requestedWindow} onChange={(event) => setForm({ ...form, requestedWindow: event.target.value })} /></label>
          <label className="full-span">Service need<input value={form.serviceNeed} onChange={(event) => setForm({ ...form, serviceNeed: event.target.value })} /></label>
          <label className="full-span">Notes<textarea value={form.notes} onChange={(event) => setForm({ ...form, notes: event.target.value })} /></label>
        </div>
        <button type="submit" className="button primary">
          {state.loading ? "Sending..." : locale === "tr" ? "Randevu iste" : "Send request"}
        </button>
      </form>
      <aside className="side-card">
        <h3>{locale === "tr" ? "Akis" : "Flow"}</h3>
        <p>{locale === "tr" ? "Talep once admin paneline duser. Sonrasinda saha uygunluguna gore size geri donus yapilir." : "The request lands in the admin dashboard first. Your team can confirm manually based on availability."}</p>
        {state.result ? (
          <div className="success-box">
            <strong>{locale === "tr" ? "Kayit alindi" : "Saved"}</strong>
            <p>{state.result.id}</p>
          </div>
        ) : null}
      </aside>
    </div>
  );
}

export function CheckoutForm({ locale, products }: { locale: Locale; products: Product[] }) {
  const [state, setState] = useState<StateMessage<Order>>({ loading: false });
  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    email: "",
    address: "",
    company: "",
  });
  const [lines, setLines] = useState(
    products.slice(0, 2).map((product) => ({
      productId: product.id,
      quantity: 1,
    })),
  );

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState({ loading: true });
    const response = await fetch("/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ customer: form, items: lines }),
    });
    if (!response.ok) {
      setState({ loading: false, error: "Order creation failed." });
      return;
    }
    setState({ loading: false, result: await response.json() });
  }

  return (
    <div className="split-layout">
      <form className="form-card" onSubmit={handleSubmit}>
        <h2>{locale === "tr" ? "Odeme ve siparis" : "Checkout and payment"}</h2>
        <div className="form-grid">
          <label>Full name<input value={form.fullName} onChange={(event) => setForm({ ...form, fullName: event.target.value })} /></label>
          <label>Phone<input value={form.phone} onChange={(event) => setForm({ ...form, phone: event.target.value })} /></label>
          <label>Email<input value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} /></label>
          <label>Company<input value={form.company} onChange={(event) => setForm({ ...form, company: event.target.value })} /></label>
          <label className="full-span">Address<textarea value={form.address} onChange={(event) => setForm({ ...form, address: event.target.value })} /></label>
          {lines.map((line, index) => (
            <div key={`${line.productId}-${index}`} className="line-item-editor full-span">
              <select value={line.productId} onChange={(event) => {
                const next = [...lines];
                next[index] = { ...next[index], productId: event.target.value };
                setLines(next);
              }}>
                {products.map((product) => (
                  <option key={product.id} value={product.id}>{product.name[locale]}</option>
                ))}
              </select>
              <input type="number" min={1} value={line.quantity} onChange={(event) => {
                const next = [...lines];
                next[index] = { ...next[index], quantity: Number(event.target.value) };
                setLines(next);
              }} />
            </div>
          ))}
        </div>
        <button type="submit" className="button primary">
          {state.loading ? "Processing..." : locale === "tr" ? "Mock odeme ile siparis olustur" : "Create order with mock payment"}
        </button>
      </form>
      <aside className="side-card">
        <h3>{locale === "tr" ? "Odeme altyapisi" : "Payment layer"}</h3>
        <p>{locale === "tr" ? "Bu surumde provider adapter yapisi kullanilir. Gercek odeme saglayicisi sonra baglanir." : "This version uses a provider adapter shape so a real gateway can be plugged in later."}</p>
        {state.result ? (
          <div className="success-box">
            <strong>{locale === "tr" ? "Siparis olustu" : "Order created"}</strong>
            <p>{state.result.id}</p>
            <p>{state.result.subtotal.toLocaleString("tr-TR")} TL</p>
          </div>
        ) : null}
      </aside>
    </div>
  );
}
