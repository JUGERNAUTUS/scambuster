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
    modalIsActive: false,
    backend: 'https://sb-api.quantamlabs.technology/',
    watchweb3: new Web3(new Web3.providers.WebsocketProvider('wss://speedy-nodes-nyc.moralis.io/833cf87df6d280847ac4787c/polygon/mumbai/ws'))
  })
  const [allUrlParams, setallUrlParams] = useState({})
  const [siteData, setsiteData] = useState({ site: [] })

  const [web3, setweb3] = useState({
    web3: "",
    account: "",
    isWeb3: ""
  })

  const activateModal = () => {
    console.log('amod called', appState)
    setAppState(prevState => {
      return {
        ...prevState,
        modalIsActive: !appState.modalIsActive
      }
    })
  };


  const walletModal = () => {
    return (
      <div className={appState.modalIsActive ? "modal is-active" : "modal"}>
        <div class="modal-background"></div>
        <div class="modal-content">
          <div class="modal-card">
            <header class="modal-card-head">
              <p class="modal-card-title has-text-centered">
                <b>Please Connect Your Wallet</b>
              </p>
            </header>
            <section
              class="modal-card-body"
              style={{
                borderBottomLeftRadius: "5px",
                borderBottomRightRadius: "5px",
              }}
            >
              <div className="columns is-centered">
                <img
                  src="/images/metamask.svg"
                  style={({ height: "300px" }, { width: "300px" })}
                ></img>
              </div>
              <div className="columns is-centered column-gap">
                <div classname="column">
                  <a
                    className="button is-info "
                    onClick={() => {
                      ConnectWallet();
                    }}
                  >
                    Connect Wallet
                  </a>
                </div>

                <div classname="column">
                  <a
                    className="button is-success"
                    href="https://metamask.io/download/"
                    target="_blank"
                    style={{ backgroundColor: "#F6851B" }}
                  >
                    Install Metamask
                  </a>
                </div>
              </div>
            </section>
            {/* <footer class="modal-card-foot">
              <button class="button is-success">Save changes</button>
              <button class="button">Cancel</button>
            </footer> */}
          </div>
        </div>
        <button
          class="modal-close is-large"
          aria-label="close"
          onClick={() => activateModal()}
        ></button>
      </div>
    )
  }


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
    console.log("Reached wallet", window.ethereum);
    if (window.ethereum) {
      appState.isWeb3 = true;
      const ethereum = window.ethereum;

      let web3 = new Web3(ethereum);

      ethereum.enable().then((accounts) => {
        let account = accounts[0];
        web3.eth.defaultAccount = account;
        console.log(account, appState);
        setweb3(prevState => {
          return {
            ...prevState,
            isWeb3: true,
            account: web3.utils.toChecksumAddress(accounts[0]),
            web3: web3
          }
        });

        setAppState((prevState) => {
          return {
            ...prevState,
            account: account,
            web3: web3,
          };
        });

        switchNetworkMumbai();
        handleSignMessage();
      });
    }
  };

  const handleSignMessage = ({ publicAddress}) => {

    //const server = "localhost:5000";

    var url = "http://" + server + "/getAuthToken";

    var params = JSON.stringify({
      address: publicAddress
    });


    fetch(url, {
      method: "POST",
      mode: "cors",

      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: params,
    })
      .then(function (response, error) {
        if (response) {
          return response.json();
        } else {
          console.log(error);
        }
      })
      .then(function (data) {
        console.log(data);
      let nonce = data;
    return new Promise((resolve, reject) =>
    appState.web3.personal.sign(
      appState.web3.fromUtf8(`Welcome to Scambuster! \n

        Click to sign in \n
        
        This request will not trigger a blockchain transaction or cost any gas fees. \n
        

        Wallet address: \n
        ${publicAddress} \n
        
        Nonce:\n
        3ce6bb80-9b80-4dbe-ac9e-5ad0425a35e5 ${nonce}`),
        publicAddress,

        (err, signature) => {
          if (err) return reject(err);
          return resolve({ publicAddress, signature });
        }
      )
    );
  });
  };

  const switchNetworkMumbai = () => {
    const ethereum = window.ethereum;
    let web3 = new Web3(ethereum);
    web3.currentProvider
      .request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: "0x13881" }],
      })
      .then(function (resonse, error) {
        if (error) alert(error.message);
      });
  };



  // const ConnectWallet = () => {

  //   console.log('Calling ConnectWallet...')

  //   //console.log("Reached wallet",window.ethereum)

  //   if (window.ethereum) {

  //     //app.state.isWeb3 = true;
  //     const ethereum = window.ethereum;

  //     let web3 = new Web3(ethereum);

  //     //this.web3 = web3;

  //     ethereum.enable().then((accounts) => {
  //       //let account = accounts[0];
  //       //web3.eth.defaultAccount = account ;
  //       //console.log ( account);
  //       /*
  //       app.setState({
  //          account : account,
  //          web3 : this.web3
  //        });*/
  //       console.log('accounts', accounts);
  //       setweb3(prevState => {
  //         return {
  //           ...prevState,
  //           isWeb3: true,
  //           account: web3.utils.toChecksumAddress(accounts[0]),
  //           web3: web3
  //         }
  //       });


  //     })
  //   }
  // }


  return (
    <>
      <BrowserRouter>
        {<Nav
          appState={appState}
          setAppState={setAppState}
          walletModal={walletModal}
          activateModal={activateModal}
          ConnectWallet={ConnectWallet}
          isWeb3={web3.isWeb3}
          web3={web3.web3}
          account={web3.account}
        />}
        <Routes>
          <Route path="/" element={<HomeScam
            appState={appState}
            setAppState={setAppState}
            siteData={siteData}
            setsiteData={setsiteData}
            isWeb3={web3.isWeb3}
            web3={web3.web3}
            account={web3.account}
            walletModal={walletModal}
            activateModal={activateModal}
          />} />
          <Route path="/validator" element={<HomeValidator
            appState={appState}
            setAppState={setAppState}
            isWeb3={web3.isWeb3}
            web3={web3.web3}
            account={web3.account}
            siteData={siteData}
            setsiteData={setsiteData}
            ConnectWallet={ConnectWallet}
          />} />
          <Route path="/proposer" element={<HomeProposer
            appState={appState}
            setAppState={setAppState}
            ConnectWallet={ConnectWallet}
            isWeb3={web3.isWeb3}
            account={web3.account}
            web3={web3.web3}
          />} />
          <Route exact path="/verifylink/:address" element={<VerifyLink
            appState={appState}
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
            appState={appState}
          />} />
          <Route exact path="/aboutus" element={<Aboutus
            appState={appState}
          />} />
          {/* web3={appState.web3} />} /> */}

        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
