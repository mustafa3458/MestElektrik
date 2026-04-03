import { getDashboardSummary } from "@/lib/store";
import type { Locale } from "@/lib/types";

export function AdminDashboard({ locale }: { locale: Locale }) {
  const data = getDashboardSummary();

  return (
    <div className="admin-stack">
      <section className="three-column-grid">
        <article className="metric-card accent">
          <span>{data.serviceRequests.length}</span>
          <p>{locale === "tr" ? "Hizmet talepleri" : "Service requests"}</p>
        </article>
        <article className="metric-card">
          <span>{data.appointmentRequests.length}</span>
          <p>{locale === "tr" ? "Randevu talepleri" : "Appointment requests"}</p>
        </article>
        <article className="metric-card">
          <span>{data.orders.length}</span>
          <p>{locale === "tr" ? "Siparisler" : "Orders"}</p>
        </article>
      </section>

      <section className="admin-grid">
        <div className="table-card">
          <h3>{locale === "tr" ? "Bildirim akisi" : "Notification stream"}</h3>
          <table>
            <thead>
              <tr>
                <th>Channel</th>
                <th>Title</th>
                <th>Message</th>
              </tr>
            </thead>
            <tbody>
              {data.notifications.map((notification) => (
                <tr key={notification.id}>
                  <td>{notification.channel}</td>
                  <td>{notification.title}</td>
                  <td>{notification.message}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="table-card">
          <h3>{locale === "tr" ? "Urun ve stok" : "Products and stock"}</h3>
          <table>
            <thead>
              <tr>
                <th>Product</th>
                <th>Stock</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              {data.products.map((product) => (
                <tr key={product.id}>
                  <td>{product.name[locale]}</td>
                  <td>{product.stock}</td>
                  <td>{product.price.toLocaleString("tr-TR")} TL</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="admin-grid">
        <div className="table-card">
          <h3>{locale === "tr" ? "Hizmet talepleri" : "Service requests"}</h3>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Area</th>
                <th>Status</th>
                <th>Estimate</th>
              </tr>
            </thead>
            <tbody>
              {data.serviceRequests.map((request) => (
                <tr key={request.id}>
                  <td>{request.fullName}</td>
                  <td>{request.city}/{request.district}</td>
                  <td>{request.status}</td>
                  <td>{request.estimate.averagePrice.toLocaleString("tr-TR")} TL</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="table-card">
          <h3>{locale === "tr" ? "Randevu talepleri" : "Appointment requests"}</h3>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Window</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {data.appointmentRequests.map((request) => (
                <tr key={request.id}>
                  <td>{request.fullName}</td>
                  <td>{request.requestedWindow}</td>
                  <td>{request.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
