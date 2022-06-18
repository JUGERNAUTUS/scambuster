// This is a skeleton starter React component generated by Plasmic.
// This file is owned by you, feel free to edit as you see fit.
import * as React from "react";
import { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";

import abi from "../contract/validator.js";
var ABI = JSON.parse(abi);

const validatorAddress = "0x1026628c3Ad736cc8FF09066724CF69e7a166F95";

//import { useMoralis, useMoralisFile} from "react-moralis";

//import InputField from './InputField';

//function HomeScam_() {

const HomeScam = (props) => {
  useEffect(() => {
    var contract = new props.appState.watchweb3.eth.Contract(
      ABI,
      validatorAddress
    );

    //props.watchweb3.eth.getBlockNumber(function(error,response){
    //if(response)
    //{

    contract
      .getPastEvents("siteAdded", {
        //Block where contract was created. Ideally show data for 1 year?
        fromBlock: 26083674,
        toBlock: "latest",
      })
      .then(function (events) {
        for (
          let i = events.length - 1;
          i != -1 && i > events.length - 11;
          i--
        ) {
          let t = i;

          contract.methods
            .sitelist(events[t].returnValues._url)
            .call({ from: props.appState.account })
            .then(function (response, err) {
              console.log("response in HomeScam", response);
              events[t].returnValues.yesVotes =
                response.yesVotes / Math.pow(10, 18);
              events[t].returnValues.noVotes =
                response.noVotes / Math.pow(10, 18);
              events[t].flag = false;

              if (t == 0 || t == events.length - 11) {
                props.setsiteData((prevState) => {
                  return {
                    ...prevState,
                    site: events,
                  };
                });
              }
            });
        }
      });
  }, []);

  const navigate = useNavigate();

  return (
    <div className="bg-img">
      <div className="box bg-img">
        <div className="columns is-centered">
          <div className="column has-text-centered">
            <figure className="image ">
              <img src="banner.gif"></img>
            </figure>
            <figure className="image ">
              <img src="matrixshort.gif"></img>
            </figure>
            <div className="columns is-overlay is-centered">
              <div className="column is-6 has-text-centered">
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>

                <div className="columns">
                  <div className="column ">
                    <a
                      className="button is-large is-black "
                      onClick={() => navigate("/proposer")}
                    >
                      Report a Scam{" "}
                    </a>
                  </div>
                  <div className="column">
                    <a
                      className="button is-large is-link "
                      onClick={() => navigate("/validator")}
                    >
                      {" "}
                      Validator Login
                    </a>
                  </div>
                </div>

                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>

                <div className="columns is-centered">
                  <div className="box bg-img">
                    <div class="panel-block has-text-white">
                      Recently Submit Websites
                    </div>
                    {props.siteData.site.map((site, index) => {
                      return (
                        <div key={index + 1}>
                          <div class="panel-block ">
                            <br></br>
                            <br></br>
                            <div className="column is-full has-text-centered">
                              <marquee direction="down">
                                <div className="is-size-3 has-text-white">
                                  {" "}
                                  {site.returnValues._url}
                                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                  {site.returnValues.noVotes >= 50 ? (
                                    <span class="tag is-danger">Scam!</span>
                                  ) : site.Votes >= 50 ? (
                                    <span class="tag is-success">Clean</span>
                                  ) : (
                                    <span class="tag is-info">
                                      Voting in progress
                                    </span>
                                  )}
                                </div>
                              </marquee>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  
                </div>
                <button class="button is-link is-large mt-4">Check for a Site</button>
              </div>
              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

//const HomeScam = React.forwardRef(HomeScam_);

export default HomeScam;
