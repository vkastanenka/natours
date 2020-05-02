// React
import React from "react";

// Components
import PageAux from "../../components/HigherOrder/PageAux";
import SideNav from "./Layout/SideNav";
import Content from "./Layout/Content";

const Account = () => {
  return (
    <PageAux>
      <main className="main">
        <div className="user-view">
          <SideNav />
          <Content />
        </div>
      </main>
    </PageAux>
  );
};

export default Account;
