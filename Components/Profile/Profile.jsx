import React,{useState} from "react";

import {ProfileMain, SideBar} from "../index";


const Profile = ({
  setActive,
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
  setTransfer,
  nativeTokens,
}) => {
  const [open,setOpen] = useState("Dashboard");

  

  return(
    <div className="dsahboard-area- bg-color area-padding">
      <div className="container">
          <div className="row">
            <SideBar  
           address={address}
           setOpen={setOpen}
           open={open}
           setActive={setActive}
           setTransfer={setTransfer}
           />

            <ProfileMain 
            nativeTokens={nativeTokens}
            mainBalance={mainBalance}
            getAllDonation={getAllDonation}
            donateFund={donateFund}
            withdrawFund={withdrawFund}
            balance={balance}
            createERC20={createERC20}
            setOpen={setOpen}
            open={open}
            fee={fee}
            address={address}
            getAllTokenListed={getAllTokenListed}
            getUserTokens={getUserTokens}
            />
          </div>
      </div>

    </div>
  )
}


export default Profile;
