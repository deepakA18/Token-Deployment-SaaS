import React from "react";

import {Header,Footer,About,Brand,HeroSection,Swap,Welcome, Faq} from "../Components/index";
import { useStateContext } from "../Context/index";



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
      <Faq /> 
    </main>
    <Footer />
  </div>
 )
};

export default index;
