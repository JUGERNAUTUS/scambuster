import React, { Component, useState, useEffect } from "react";
import Web3 from "web3";
import { useNavigate } from "react-router-dom";
import "../../App.css";

function Nav(props) {
  const navigate = useNavigate();

  useEffect(() => {
    props.ConnectWallet();
  }, []);

  return (
    <div>
      {props.walletModal()}
	  {props.extensionModal()}
      <nav className="navbar is-black py-3" aria-label="main navigation">
        <div className="navbar-brand">
          <a className="custom-align" onClick={() => {navigate("/")}}>
            <img
              src={"/sb_icon.png"}
              className="ml-4"
              style={{ height: "60px", width: "60px" }}
            ></img>
          </a>
          <div className="navbar-item ">
            <h1 className="title is-3 ml-5" style={{ color: "white" }}>
              <a
                className="remove-link-decor"
                onClick={() => {navigate("/")}}
              >
                Scambuster
              </a>
            </h1>
          </div>
        </div>

        <div className="navbar-menu is-active is-hidden-mobile">
          <div className="navbar-start"></div>
          <div className="navbar-menu mt-2">
            <a
              className="navbar-item ml-6"
              style={{ color: "white", fontSize: "20px", background: "none" }}
              onClick={() => {
                console.log("saw click");
                if (props.account != "0x0000000000000000000000000000000000000000") {
                  navigate("/proposer");
                } else {
                  props.activateModal();
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
                        if(props.account != "0x0000000000000000000000000000000000000000" && props.isValidator == true){
                          navigate("/validator")
                        } else if (props.account == "0x0000000000000000000000000000000000000000") {
                          props.activateModal()
                        }
                          else
                        {
                         window.alert("This account is not listed to a Scambuster validator. Please login with a validator account")
                        }
                      }}
             
            >
              Validate
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

            <a
              className="navbar-item"
              style={{ color: "white", fontSize: "20px", background: "none" }}
              onClick={() => {
                navigate("/aboutus");
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
          </div>

          <div className="navbar-end mr-5 mt-2">
            <a
              className="navbar-item"
              onClick={() => {
		      console.log('Ext Modal')
                props.setAppState((prevState) => {
                  return {
                    ...prevState,
                    extModal: true,
                  };
                });
              }}
            >
              Install Scambuster Extension
            </a>
          </div>
          {props.isWeb3 && props.account ? (
            <div className="navbar-end mr-5 mt-2">
              <a className="navbar-item ">
                {" "}
                Account Connected : {props.account.slice(0, 8)}...
              </a>
            </div>
          ) : (
            <div className="navbar-end mr-5 mt-2 custom-align">
              <a
                className="navbar-item button is-link"
                onClick={() => props.ConnectWallet()}
              >
                Connect Metamask Wallet
              </a>
            </div>
          )}
        </div>
      </nav>
	  <div className="is-hidden-mobile matic-message">
        <p className="">
          <b>
            To use this application you need Test MATIC tokens. Get Test MATIC
            tokens from <a href="https://faucet.polygon.technology/" target="_blank">
              Polygon Faucet
            </a>.
          </b>
        </p>
      </div>
    </div>
  );
}

export default Nav;
