import React from "react";
import MerchantTable from "../components/merchant_table/MerchantTable";
import './MerchantPage.scss'; // Import the SCSS file for the page

const MerchantPage = () => {
  return (
    <div className="container">
      <h1>Üye İş Yerleri Ödeme Listesi</h1>
      <MerchantTable />
    </div>
  );
};

export default MerchantPage;
