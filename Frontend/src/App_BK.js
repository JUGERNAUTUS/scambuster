import React, { useState, useEffect } from "react";
import './App.css'
import { BrowserRouter, Route, Routes, useParams } from "react-router-dom";
//import { useMoralis } from 'react-moralis'
import 'bulma/css/bulma.min.css';
//import 'bulma/css/bulma.css';
//import './css/mystyles.css';
//import 'bulma-o-steps/bulma-steps.css';

// importing React Components
import Web3 from 'web3'
import Nav from './components/reactComponents/Navbar'
// import HomepageDemo from './components/reactComponents/HomepageDemo'
import HomeValidator from './components/reactComponents/Validator'
import HomeProposer from './components/reactComponents/Proposer'
import VerifyLink from './components/reactComponents/VerifyLink'
import HomeSearcher from './components/reactComponents/Searcher'
import Aboutus from './components/reactComponents/AboutUs'

//Using bulma alternative here to save effort. Plasmic version CreateNftForm is also there in repo
// import CreateNftForm  from './components/reactComponents/CreateNftbulma'
// import Mywallet  from './components/reactComponents/wallet'
// import MarketPlace  from './components/reactComponents/marketplace'
// import NftPage  from './components/reactComponents/NftPage'
// import SellNftForm from './components/reactComponents/nftsale'
// import BuyNftForm from './components/reactComponents/nftbuy'
import HomeScam from './components/reactComponents/HomeScam'

//import HomePage from './components/reactComponents/HomePage'
//import EmailSignUp from "./components/reactComponents/EmailSignUp";
//import WebThreeAuth from './components/reactComponents/WebThreeAuth'
//import Login from './components/reactComponents/Login'
//import EmailLogin from './components/reactComponents/EmailLogin'


function App() {


  const params = { address: 'address' };

  const [appState, setAppState] = useState({
    watchweb3: new Web3(new Web3.providers.WebsocketProvider('wss://speedy-nodes-nyc.moralis.io/833cf87df6d280847ac4787c/polygon/mumbai/ws'))
  })
  const [allUrlParams, setallUrlParams] = useState({ })
  const [siteData, setsiteData] = useState({ site: [] })

  const [web3, setweb3] = useState({
    web3: "",
    account: "",
    isWeb3: ""
  })




  const urlParser = () => {


    //const { address } = useParams()
    //const queryParams = new URLSearchParams(window.location.search);

    //const address = queryParams.get('address');

    //console.log(address, "address");

    // url parsing
    //var params = { address:''};

    let parser = document.createElement('a');
    let href = window.location.href;

    const paramsArray = href.split("/");

    const linkEnd = paramsArray[paramsArray.length - 1]

    //const queryParams = new URLSearchParams(window.location.search);
    //console.log("queryParams",queryParams);
    //const address = queryParams.get('address');
    //let query = parser.search.substring(1);
    //console.log("query",query,parser.href,parser);
    //params.address = decodeURIComponent(query);


    setallUrlParams(prevState => {
      return {
        ...prevState,
        linkEnd: linkEnd
      }
    })
  }



  const ConnectWallet = () => {

    console.log('Calling ConnectWallet...')

    //console.log("Reached wallet",window.ethereum)

    if (window.ethereum) {

      //app.state.isWeb3 = true;
      const ethereum = window.ethereum;

      let web3 = new Web3(ethereum);

      //this.web3 = web3;

      ethereum.enable().then((accounts) => {
        //let account = accounts[0];
        //web3.eth.defaultAccount = account ;
        //console.log ( account);
        /*
        app.setState({
           account : account,
           web3 : this.web3
         });*/
        console.log('accounts', accounts);
        setweb3(prevState => {
          return {
            ...prevState,
            isWeb3: true,
            account: web3.utils.toChecksumAddress(accounts[0]),
            web3: web3
          }
        });


      })
    }
  }


  return (
    <>
      <BrowserRouter>
        {<Nav
          appState={appState}
          setAppState={setAppState}
        />}
        <Routes>
          <Route path="/" element={<HomeScam
            appState={appState}
            setAppState={setAppState}
            siteData={siteData}
            setsiteData={setsiteData}
            account={web3.account}
          />} />
          <Route path="/validator" element={<HomeValidator
            appState={appState}
            setAppState={setAppState}
            web3={web3.web3}
            account={web3.account}
            siteData={siteData}
            setsiteData={setsiteData}
          />} />
          <Route path="/proposer" element={<HomeProposer
            appState={appState}
            setAppState={setAppState}
          />} />
          <Route exact path="/verifylink/:address" element={<VerifyLink
            allUrlParams={allUrlParams}
			setallUrlParams={setallUrlParams}
            urlParser={urlParser}
            isWeb3={web3.isWeb3}
            //account={appState.account}
            account={web3.account}
            ConnectWallet={ConnectWallet}
            web3={web3.web3}
          />} />
          <Route exact path="/searcher" element={<HomeSearcher
          />} />
          <Route exact path="/aboutus" element={<Aboutus
          />} />
          {/* web3={appState.web3} />} /> */}

        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
