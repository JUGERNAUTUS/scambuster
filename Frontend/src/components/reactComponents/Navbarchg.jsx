import React, { Component, useState, useEffect } from "react";
import Web3 from "web3";
import { useNavigate } from "react-router-dom";
import "../../App.css";

function Nav(props) {
  const navigate = useNavigate();
  const [isActive, setActive] = useState(false);

  const activateModal = () => {
    setActive(!isActive);
  };

  const connectWallet = () => {
    console.log("Reached wallet", window.ethereum);
    if (window.ethereum) {
      props.appState.isWeb3 = true;
      const ethereum = window.ethereum;

      let web3 = new Web3(ethereum);

      ethereum.enable().then((accounts) => {
        let account = accounts[0];
        web3.eth.defaultAccount = account;
        console.log(account, props.appState);

        props.setAppState((prevState) => {
          return {
            ...prevState,
            account: account,
            web3: web3,
          };
        });

        switchNetworkMumbai();
      });
    }
  };

  useEffect(() => {
    connectWallet();
  }, []);

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

  return (
    <div>
      <div className={isActive ? "modal is-active" : "modal"}>
        <div class="modal-background"></div>
        <div class="modal-content">
          <div class="modal-card">
            <header class="modal-card-head">
              <p class="modal-card-title has-text-centered">
                <b>Connect Your Wallet</b>
              </p>
            </header>
            <section class="modal-card-body" style={{borderBottomLeftRadius: "5px", borderBottomRightRadius: "5px"}}>
              <div className="columns is-centered">
                <img
                  src="/images/metamask.svg"
                  style={({ height: "300px" }, { width: "300px" })}
                ></img>
              </div>
              <div className="columns is-centered">
                <a href="https://metamask.io/download/" target="_blank">
                  <button
                    class="button is-success mb-3"
                    style={{ backgroundColor: "#F6851B" }}
                  >
                    Install Metamask
                  </button>
                </a>
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
      <nav className="navbar is-black" aria-label="main navigation">
        <div className="navbar-brand">
          <a href="http://google.com">
            <img
              src={"/sb_icon.png"}
              
              style={{ height: "60px", width: "60px" }}
            ></img>
          </a>
          <div className="navbar-item ">
            <h1 className="title is-3" style={{ color: "white" }}>
              <a href="http://#" style={{ textDecoration: "none", color: "white" }}>Scambuster</a>
            </h1>
          </div>
        </div>

        <div className="navbar-menu is-active">
          <div className="navbar-start"></div>
          <div className="navbar-menu">
            <a
              className="navbar-item"
              style={{ color: "white", fontSize: "20px", background: "none" }}
              onClick={() => {
                navigate("/aboutus")
                // if (props.appState.account) {
                //   navigate("/");
                // } else {
                //   //activateModal()
                //   alert("Please Connect You Wallet 1");
                // }
              }}
            >
              About Us
            </a>

            <a
              className="navbar-item"
              style={{ color: "white", fontSize: "20px", background: "none" }}
              onClick={() => {
                if (props.appState.account) {
                  navigate("/proposer");
                } else {
                  activateModal();
                  //alert("Please Connect You Wallet 2");
                }
              }}
            >
              Submit a Website
            </a>

            <a
              className="navbar-item"
              style={{ color: "white", fontSize: "20px", background: "none" }}
              onClick={() => {
                if (props.appState.account) {
                  navigate("/validator");
                } else {
                  activateModal();
                  // alert("Please Connect You Wallet 3");
                }
              }}
            >
              Validator Screen
            </a>

            <a
              className="navbar-item"
              style={{ color: "white", fontSize: "20px", background: "none" }}
              onClick={() => {
                navigate("/searcher");
                // if (props.appState.account) {
                //   navigate("/searcher");
                // } else {
                //   activateModal();
                //   // alert("Please Connect You Wallet");
                // }
              }}
            >
              Search
            </a>
          </div>

          {props.appState.isWeb3 && props.appState.account ? (
            <div className="navbar-end">
              <a className="navbar-item ">
                {" "}
                Account Connected : {props.appState.account.slice(0, 8)}...
              </a>
            </div>
          ) : (
            <div className="navbar-end">
              <a
                className="navbar-item button is-link"
                onClick={() => connectWallet()}
              >
                Connect Metamask Wallet
              </a>
            </div>
          )}
        </div>
      </nav>
    </div>
  );
}

export default Nav;
