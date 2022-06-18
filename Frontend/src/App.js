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
import axios from "axios";

//import HomePage from './components/reactComponents/HomePage'
//import EmailSignUp from "./components/reactComponents/EmailSignUp";
//import WebThreeAuth from './components/reactComponents/WebThreeAuth'
//import Login from './components/reactComponents/Login'
//import EmailLogin from './components/reactComponents/EmailLogin'


function App() {


  const params = { address: 'address' };

  const [appState, setAppState] = useState({
    //protonAddress: '0x8e9a2057Dfe4dBb98A69B8daed5A8E3867e5b6d7',
    //valAddress: '0x753941E8fA3e26E501cd8327f5EB621c8b4e2583',
    protonAddress: '0xbf3d3d199f04dbEb578250B1111361e25bEE7335',
    valAddress: '0xAC7bC4B424Dad961c63Fe6F165aFDFD58f6A4cC6',	  
    modalIsActive: false,
	  extModal:false,
    backend: 'https://sb-api.quantlabs.technology/',
    watchweb3: new Web3(new Web3.providers.WebsocketProvider('wss://speedy-nodes-nyc.moralis.io/833cf87df6d280847ac4787c/polygon/mumbai/ws')),
    account: "0x0000000000000000000000000000000000000000"	  
  })
  const [allUrlParams, setallUrlParams] = useState({})
  const [siteData, setsiteData] = useState({ site: [], isValidator: false })

  const [web3, setweb3] = useState({
    web3: "",
    account: "0x0000000000000000000000000000000000000000",
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

	const extensionModal = () => {
    return (
      <div className={appState.extModal ? "modal is-active" : "modal"}>
        <div class="modal-background"></div>
        <div class="modal-content">
          <div class="modal-card">
            <header class="modal-card-head">
              <p class="modal-card-title has-text-centered">
                <b>Install Scambuster Browser Extension</b>
              </p>
            </header>
            <section class="modal-card-body">
              <div className="column has-text-centered mb-4"><p className="subtitle is-5">Scambuster is a DApp for crowdsourcing and reporting fake/scammy website. Anyone can report a scammy website with screenshots and their comments. Validators vote on scammy websites. If a website gets more than 50% of the validators vote, it is marked as a scammy website. It'll immediately notify you if a website has been voted a scam.
              </p></div>
              <div className="columns is-centered">
                <div className="column has-text-centered">
                  <div className="columns is-flex is-flex-direction-column">
                    <div className="column">For Chrome</div>
                    <div className="column">
                      <img className="ext-logos" src="/images/chrome.png"></img>
                    </div>
                    <div className="column has-text-centered">
                      <a href="">
                        <button className="button is-link">Coming Soon</button>
                      </a>
                    </div>
                  </div>
                </div>
                <div className="column has-text-centered">
                  <div className="columns is-flex is-flex-direction-column">
                    <div className="column">For Firefox</div>
                    <div className="column">
                      <img className="ext-logos" src="/images/firefox.png"></img>
                    </div>
                    <div className="column has-text-centered">
                      <a href="https://addons.mozilla.org/en-US/firefox/addon/scambuster/">
                        <button className="button is-link">Get Extension</button>
                      </a>
                    </div>
                  </div>
                </div>
                <div className="column has-text-centered">
                  <div className="columns is-flex is-flex-direction-column">
                    <div className="column">For Brave</div>
                    <div className="column">
                      <img className="ext-logos" src="/images/brave.png"></img>
                    </div>
                    <div className="column has-text-centered">
                      <button className="button is-link">Coming Soon</button>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            <footer class="modal-card-foot">
              <div className="column has-text-centered">
                <button class="button is-dark" onClick={() => {
                  setAppState(prevState => {
                    return {
                      ...prevState,
                      extModal:false
                    }
                  })
                }}>Close</button>
              </div>
            </footer>
          </div>

        </div>

      </div>
    )
  }	

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

        switchNetworkMumbai(account, web3);

      });
    }
  };

  const handleSignMessage = (publicAddress, web3) => {

    //const server = "localhost:5000";
    console.log("address",publicAddress);
    var url = appState.backend + "getAuthToken";

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
        console.log("token",data.token,data.status);
      let nonce = data.token;
      let status = data.status;
     
     
     if(status == "new")
     {	      
     web3.eth.personal.sign(
      web3.utils.utf8ToHex


							  
								 
								

      (`Welcome to Scambuster! 
        
Click to sign in. This authentication is valid for 24 hours 
        
This request will not trigger a blockchain transaction or cost any gas fees. 

Wallet address: 
${publicAddress} 
        
Nonce:
${nonce}`),
        publicAddress
      ).then(function(response,error){
         if(response)
	      {
		console.log("signature",response)
                updateToken(publicAddress,nonce,response);      

	      }
	      else
	      {
	        console.log(error)
             }
    
  });

			 

				 
  }
	  else
    {
		  setAppState(prevState => {
  			return {
  		          ...prevState,
  			token: nonce
                        }
                      });
      }                 
	      
  });
 }
											
  const updateToken = (publicAddress, token, sig) => {

  //const server = "localhost:5000";
  console.log("address",publicAddress);
  var url = appState.backend + "addAuthToken";

  var params = JSON.stringify({
    address: publicAddress,
    nonce: token,
    sig: sig	  
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
      console.log("update response",data);

      setAppState(prevState => {
  			return {
  		          ...prevState,
  			token: token
                        }
                      });
    })
										
					   
								 		
  }



  const switchNetworkMumbai = (account, web3) => {
    //const ethereum = window.ethereum;
    //let web3 = new Web3(ethereum);
    //let web3 = appState.web3;	
    web3.currentProvider
      .request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: "0x13881" }],
      })
      .then(function (resonse, error) {
        console.log("account here", account);
        if (error) alert(error.message);
        else handleSignMessage(account, web3);
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

  const checkFunc = () => {
    console.log('cf called')
    axios.post(appState.backend + 'verifytoken', { address: web3.account.toLowerCase() }).then(function (response, error) {
      if (response) {
        console.log("response", response)
      } else {
        console.log('error', error)
      }
    }).catch(function (error) {
      if (error.response) {
        console.log('err', error.response.status)
      }
    })
  }


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
	  extensionModal={extensionModal}
          isValidator={siteData.isValidator}		
        />}
	  <div className="is-hidden-mobile">
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
            walletModal={walletModal}
            activateModal={activateModal}
	    
          />} />
          <Route path="/proposer" element={<HomeProposer
            appState={appState}
            setAppState={setAppState}
            ConnectWallet={ConnectWallet}
            isWeb3={web3.isWeb3}
            account={web3.account}
            web3={web3.web3}
            checkFunc={checkFunc}
            handleSignMessage={handleSignMessage}
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
            handleSignMessage={handleSignMessage}
          />} />
          <Route exact path="/searcher" element={<HomeSearcher
            appState={appState}
          />} />
          <Route exact path="/aboutus" element={<Aboutus
            appState={appState}
          />} />
          {/* web3={appState.web3} />} /> */}

        </Routes>
	  </div>
	  <div className="is-hidden-desktop mobile-message">
          Please view in desktop for best experience
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
