import react, { useEffect, useState } from 'react';
import {
  useDevCycleClient,
  useVariableValue,
} from '@devcycle/react-client-sdk';
// import Confetti from 'https://esm.sh/react-confetti';
import Showcase from '@/components/Showcase';
import Categories from '@/components/Categories';
import ProductList from '@/components/ProductList';
import { getProductsCategoriesApi } from './../../api/api';
import { useCountry } from '@/contexts/CountryProvider';
import ChatBot from '@/components/ChatBot';

export default function HomePage() {
  const isSale = useVariableValue('sale-status', false);
  const sortStrategy = useVariableValue('sort-strategy', 'normal-order');
  const chatbot = useVariableValue('chatbot-status', false);
  const shippingWaiver = useVariableValue('shipping-waiver', 'medium');

  const { country } = useCountry();

  const [confetti, toggleConfetti] = useState(false);

  // useEffect(() => {
  //   if (chatbotStatus) {
  //     const script = document.createElement('script');
  //     script.innerHTML = `
  //       window.__ow = window.__ow || {};
  //       window.__ow.organizationId = "6aca089b-920a-48d3-a97f-e911b65ef788";
  //       window.__ow.integration_name = "manual_settings";
  //       window.__ow.product_name = "openwidget";
  //       ;(function(n,t,c){function i(n){return e._h?e._h.apply(null,n):e._q.push(n)}var e={_q:[],_h:null,_v:"2.0",on:function(){i(["on",c.call(arguments)])},once:function(){i(["once",c.call(arguments)])},off:function(){i(["off",c.call(arguments)])},get:function(){if(!e._h)throw new Error("[OpenWidget] You can't use getters before load.");return i(["get",c.call(arguments)])},call:function(){i(["call",c.call(arguments)])},init:function(){var n=t.createElement("script");n.async=!0,n.type="text/javascript",n.src="https://cdn.openwidget.com/openwidget.js",t.head.appendChild(n)}};!n.__ow.asyncInit&&e.init(),n.OpenWidget=n.OpenWidget||e}(window,document,[].slice))
  //     `;
  //     setScriptStore(() => script);
  //     document.body.appendChild(script);

  //     return () => {
  //       document.body.removeChild(script);
  //     };
  //   } else {
  //     if (scriptStore) {
  //       console.log('🚀 ~ useEffect ~ scriptStore:', scriptStore);
  //       document.body.removeChild(scriptStore);
  //     }
  //   }
  // }, [chatbotStatus]);

  const data = getProductsCategoriesApi({
    country,
    isSale,
    sortStrategy,
  });

  useEffect(() => {
    if (isSale) {
      if (!localStorage.getItem('confetti')) {
        localStorage.setItem('confetti', 'blabla');
        toggleConfetti(() => true);
        setTimeout(() => toggleConfetti(() => false), 10000);
      }
    }

    return () => localStorage.removeItem('confetti');
  }, [isSale]);

  return (
    <div className="mx-3 md:mx-auto md:w-[80%] lg:w-[70%]">
      {/* Hello there !{saleActiveFlag ? <img src="/sale/banner.jpg" /> : 'No sale'} */}
      {/* {confetti && <Confetti />} */}
      {isSale && (
        <div className="w-full text-white font-extrabold italic border-white mt-6 bg-red-600 overflow-hidden whitespace-nowrap">
          ALE SALE SALE SALE SALE SALE SALE SALE SALE SALE SALE SALE SALE SALE
          SALE SALE SALE SALE SALE SALE SALE SALE SALE SALE SALE SALE SALE SALE
          SALE SALE SALE SALE SALE SALE SALE SALE SALE SALE SALE SALE SALE SALE
          SALE SALE SALE SALE SALE SALE SALE SALE SALE SALE SALE SALE SALE SALE
          SALE SALE SALE SALE SALE SALE SALE SALE SALE SALE SALE SALE SALE SALE
          SALE SALE
        </div>
      )}
      {isSale && shippingWaiver == 'medium' && (
        <div
          className="w-full text-center text-white font-semibold bg-blue-800"
          style={{ textShadow: '0 0 10px white' }}
        >
          hurray{'!,'} some* products are now eligible for free shipping
        </div>
      )}
      {isSale && shippingWaiver == 'high' && (
        <div
          className="w-full text-center text-white font-semibold bg-blue-800"
          style={{ textShadow: '0 0 10px white' }}
        >
          hurray{'!,'} all products are now eligible for free shipping
        </div>
      )}

      <Showcase data={data} isSale={isSale} />
      {/* <Categories data={data} isSale={isSale} /> */}
      <ProductList data={data} country={country} isSale={isSale} />
      {chatbot && <ChatBot />}
      <ChatBot />
    </div>
  );
}
