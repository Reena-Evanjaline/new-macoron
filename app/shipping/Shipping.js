'use client';
import React from 'react';

function Shipping() {
  const shippingData = [
    { country: 'United States', courier: 'DHL', price: '60 USD', fee: 'Free' },
    { country: 'Australia', courier: 'PARXL', price: '60 USD', fee: 'Free' },
    { country: 'Canada', courier: 'DHL', price: '60 USD', fee: 'Free' },
    { country: 'Malaysia', courier: 'EFS', price: '50 USD', fee: 'Free' },
    { country: 'Philippines', courier: 'EFS', price: '50 USD', fee: 'Free' },
    { country: 'Vietnam', courier: 'EFS', price: '50 USD', fee: 'Free' },
    { country: 'Singapore', courier: 'PARXL', price: '50 USD', fee: 'Free' },
    { country: 'Cambodia', courier: 'DHL', price: '60 USD', fee: 'Free' },
    { country: 'United Kingdom', courier: 'DHL', price: '60 USD', fee: 'Free' },
    { country: 'France', courier: 'DHL', price: '60 USD', fee: 'Free' },
    { country: 'Germany', courier: 'DHL', price: '60 USD', fee: 'Free' },
    { country: 'Denmark', courier: 'DHL', price: '60 USD', fee: 'Free' },
    { country: 'Italy', courier: 'DHL', price: '60 USD', fee: 'Free' },
    { country: 'Hungary', courier: 'DHL', price: '60 USD', fee: 'Free' },
    { country: 'Norway', courier: 'DHL', price: '60 USD', fee: 'Free' },
    { country: 'Poland', courier: 'DHL', price: '60 USD', fee: 'Free' },
    { country: 'Swizerland', courier: 'DHL', price: '60 USD', fee: 'Free' },
    { country: 'Ireland', courier: 'DHL', price: '60 USD', fee: 'Free' },
    { country: 'Taiwan', courier: 'PARXL / DHL', price: '50 / 70 USD', fee: 'Free' },
    { country: 'Hong Kong', courier: 'PARXL / DHL', price: '50 / 70 USD', fee: 'Free' },
  ];

  return (
    <div className="container py-5">
      {/* Page Heading */}
      <h2 className="fw-bold mb-4">Shipping And Delivery</h2>

      {/* Section: Shipping General */}
      <h5 className="fw-bold">Shipping General</h5>
      <ul className="mb-4">
        <li>All parcels from StyleKorean are shipped from Korea.</li>
        <li>Shipping cost is calculated from Korea to the destination country.</li>
        <li>
          Every order is normally shipped out within 72 business hours from the time of order
          confirmation. If a shipping delay occurs, we will inform customers of the issue within 72 hours.
        </li>
        <li>
          We are unable to ship to the following address: P.O. Box, APO, FPO, DPO. This message appears
          automatically and won’t disappear even after customers enter the full address. As long as
          customers can proceed to the next stage, then there won’t be any issues.
        </li>
      </ul>

      {/* Section: Free Shipping Notice */}
      <h5 className="fw-bold">Free Shipping</h5>
      <p>Requirements for the FREE shipping</p>
      <p>Only beauty categories are applicable.</p>
      <p className="text-danger small">*Excluding K-pop goods including albums.</p>

      {/* SHIPPING NOTICE */}
      <h3 className="fw-bold mt-5">Shipping Notice</h3>
      <div className="border p-3 bg-light mt-3">
        <p className="fw-bold">
          Customs taxes are not included in the product price and may be charged before delivery.
          Customs related fee vary by country and they are customer's responsibility.
        </p>
        <p className="text-danger fw-semibold">
          *If customers refuse a package due to customs issues (including refusal to pay customs tax,
          failure to provide requested documents, or other related issues) we will not be responsible
          for any refund or reshipment of the refused package.
        </p>
        <p className="fw-bold">
          The weight displayed on the site may differ from the actual weight.
        </p>
        <p className="text-primary">
          Shipping notifications will be sent via email, so please check your email regularly.
        </p>
      </div>

      {/* ORDER VALUE LIMIT */}
      <h4 className="fw-bold mt-5">Order Value Limit</h4>
      <p>
        Due to customs regulations that can cause extensive delays, StyleKorean limits the maximum order
        amount to $500 (excluding cost of shipping). <br />
        Customers who wish to purchase more than $500 are recommended to place two separate orders to avoid
        customs issues.
      </p>

      {/* DELIVERY FAILURE */}
      <h4 className="fw-bold mt-5">Delivery Failure</h4>

      {/* 1. Lost Parcel */}
      <p className="fw-bold">1. Lost Parcel</p>
      <ul>
        <li>Customers need to inform us within 30 days when the delivery status has been marked as “Delivered”, but they haven’t received it so that we can inquire with the shipping company regarding it.</li>
        <li>Customers need to cooperate in providing us with proof of evidence such as pictures of any issues that occurred.</li>
        <li>A refund can be processed only if the delivery company officially claims the parcel as “Lost”.</li>
        <li>The delivery company is not responsible for a stolen or missing package after the delivery to the recipient's correct address, and a refund or redelivery is not possible in this case.</li>
      </ul>

      {/* 2. Tax Payment Refusal */}
      <p className="fw-bold mt-4">2. Tax Payment Refusal</p>
      <ul>
        <li>If customers refused to pay the customs tax, in which we had stated on the “Shipping Notice” that it is a part of customers responsibility, refund is NOT possible in this case.</li>
        <li>
          Please note that after it is confirmed that customers refuse to pay customs tax until the determined
          period decided by the shipping company, the whole package will be returned or disposed of, and even
          when customers change their mind and want to pay it, as it is already too late, refund or redelivery
          is not possible.
        </li>
      </ul>

      {/* 3. Recipient Unreachable */}
      <p className="fw-bold mt-4">3. Recipient Unreachable</p>
      <ul>
        <li>
          In case of incorrect address or contact information on customers’ order, we will send an email
          requesting the correct information. If customers fail to provide the required information within the
          determined period decided by the shipping company, the whole package will be returned or disposed of.
        </li>
        <li>Please be aware that refund or redelivery is NOT possible in this case.</li>
      </ul>

      {/* FREE SHIPPING TABLE */}
      <h4 className="fw-bold mt-5">Free Shipping Countries</h4>
      <div className="table-responsive">
        <table className="table table-bordered text-center">
          <thead className="table-light">
            <tr>
              <th>Country</th>
              <th>Couriers</th>
              <th>Price (Over than)</th>
              <th>Shipping Fee</th>
            </tr>
          </thead>
          <tbody>
            {shippingData.map((item, index) => (
              <tr key={index}>
                <td>{item.country}</td>
                <td>{item.courier}</td>
                <td>{item.price}</td>
                <td>{item.fee}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Shipping;
