import React from "react";

import {Header,Footer,About,Brand,HeroSection,Information,Staking,Swap,Welcome, Faq} from "../Components/index";
import { useStateContext } from "../Context/index";
import Feature from "../Components/Feature";


const index = () => {
 const {createERC20, getAllERC20TokenListed,getUserERC20Tokens,fee,address,nativeToken,transferNativeToken} = useStateContext();
 
 return(
  <div>
    <Header />
    <main>
      <HeroSection/>
      <About />
      <Brand />
       <Swap 
      nativeToken={nativeToken}
      transferNativeToken={transferNativeToken} 
      />
      <Welcome/>
      {/*<Information />
      <Staking/>
      <Feature/>
      <Faq /> */}
    </main>
    <Footer />
  </div>
 )
};

export default index;
