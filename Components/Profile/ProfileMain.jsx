import React from "react";

import {Table,TableTwo} from "../index";

const ProfileMain = ({
  setOpen,
  open,
  getAllTokenListed,
  getUserTokens,
  address,
  fee,
  createERC20,
  balance,
  withdrawFund,
  donateFund,
  getAllDonation,
  mainBalance,
  nativeToken,
}) => {
  const details = [{
    title: "Created",
    value: `#${getUserTokens?.length || 0}`,
  },
  {
    title: "ERC20s",
    value: `#${getAllTokenListed?.length || 0}`,
  },
  {
    title: "Listing Fee",
    value: `#${fee?.length || 0}`,
  },
  {
    title: "Donors",
    value: `#${getAllDonation?.length || 0}`,
  },
  {
    title: `${nativeToken?.symbol} Token`,
    value: `#${nativeToken?.balance}`,
  },
  {
    title: "Contract Balance",
    value: `#${mainBalance == undefined ? "Only Owner See": mainBalance}`,
  }]

  const contractOwner = "0x88447cCd5095e37243B4A47401019fb9A085b1a9".toLowerCase();

  // console.log("address",address)
  // console.log("owner",contractOwner)
  return (
    <div className="col-xl-9 col-lg-9 col-md-8">
      <div className="row-user-dashboard">
        <div className="col-xl-12 col-lg-12 col-md-12">
            <div className="user-top">
                <div className="user-balance">
                    <span>Your balance</span>
                    <div className="main-bal">{balance?.slice(1,7)} Bera</div>
                </div>
                <div className="userboard-btn">
                    <a className="user-btn coin-btn" onClick={()=> donateFund()}>
                      Donate 1 Bera
                    </a>
                    {address === contractOwner && (
                      <a href="" onClick={() => withdrawFund()} className="user-btn color-btn">
                        Withdraw funds
                      </a>
                    )}
                </div>
            </div>
        </div>
      </div>
      <div className="row dashboard-content">
        {
          details.map((detail,i)=> {
            <div key={i+1} className="col-xl-4 col-lg-4 col-md-6">
              <div className="single-dash-head">
                  <div className="dashboard-amount d-flex flex-wrap align-items-center">
                    <div className="amount-content">
                        <span className="pro-name">{detail.title}</span>
                        <span className="pro-money">{detail.value}</span>
                    </div>
                    <div className="invest-tumb">
                        <img src={`img/icon/d${i+1}.png`} alt="" />
                    </div>
                  </div>
              </div>
            </div>
          })
        }

      </div>
        {open == "Dashboard" ? (
        <Table 
        title="All Create ERC20 Tokens"
        tableData = {getAllTokenListed}
        />
        ) : open == "Your Token" ? (
          <Table title= "Your Tokens" tableData={getUserTokens}/>
        ) : open == "Donation" ? (
          < TableTwo title= "All user donations" tableData={getAllDonation}/>
        ) : (
          ""
        )}
    </div>
  )
};

export default ProfileMain;
