import React from "react";
import MerchantTable from "../components/merchant_table/MerchantTable";

const MerchantPage = () => {
  return (
    <div>
      <h1 style={{ padding: "0 64px" }}>Üye İş Yerleri</h1>
      <MerchantTable />
    </div>
  );
};

export default MerchantPage;
