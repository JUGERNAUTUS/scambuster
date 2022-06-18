import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Aboutus(props) {

    const donateAddress = '0x1a05D8a43a88b532bB47D2317C4A34a891Be2D4E'

    return (
        <div className="columns is-centered is-vcentered">

            <div className="column is-8 is-offset-1">

                <div className="columns is-centered is-vcentered">
                    <div className="column">
                        <br></br><br></br><br></br>
                        <h1 className='title is-3'><b>About Scambuster</b></h1>

                        <p className='has-text-left'>Scambuster is a DApp for crowdsourcing and reporting fake/scammy website. Anyone can report a scammy website with screenshots and their comments</p><br></br>
                        <p className='has-text-left'>Validators vote on scammy websites. If a website gets more than 50% of the validators vote, it is marked as a scammy website</p><br></br>
                        <p className='has-text-left'>You can download and install the Scambuster browser extension <a href={
                            navigator.userAgent.indexOf("Chrome") > -1
                                ? "https://scambuster.quantlabs.technology/"
                                : navigator.userAgent.indexOf("Firefox") > -1
                                    ? "https://addons.mozilla.org/en-US/firefox/addon/scambuster/"
                                    : "https://scambuster.quantlabs.technology/"
                        }
                            target="_blank"><b>here</b></a>. It'll immediately notify you if a website has been voted a scam</p><br></br><br></br>

                    </div>
                </div>


                <div className="columns is-centered">
                    <div className="column is-6">
                        <div className="columns is-centered">
                            <div className="column has-text-centered">
                                <h1 className='title is-3'><b>Team Quantlab</b></h1><br></br>
                            </div>
                        </div>

                        <div className="columns is-centered">
                            <div className="column has-text-centered ">
                                <div class="card">
                                    <div className="column">
                                        <figure class="image">
                                            <img className="is-rounded" src="https://pbs.twimg.com/profile_images/1160953752548810754/FF1_xgIt_400x400.jpg" alt="Placeholder image"></img>
                                        </figure>
                                    </div>

                                    <div class="card-content">

                                        <div class="media">
                                            <div class="media-content has-text-centered">

                                                <p class="title is-4">Ishan Roy</p>
                                                <p class="subtitle is-6"><FontAwesomeIcon icon="fa-brands fa-twitter-square" />&nbsp;&nbsp;@ishanroy</p>
                                                <p><a href="https://linktr.ee/ishanroyblockchain" target="_blank">Linktree</a></p>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                            <div className="column has-text-centered ">
                                <div class="card is-rounded">
                                    <div className="column">
                                        <figure class="image">
                                            <img className="is-rounded" src="https://avatars.githubusercontent.com/u/49331404?v=4" alt="Placeholder image"></img>
                                        </figure>
                                    </div>

                                    <div class="card-content">
                                        <div class="media">
                                            <div class="media-content">
                                                <p class="title is-4">Manu Areraa</p>
                                                <p class="subtitle is-6"><FontAwesomeIcon icon="fa-brands fa-twitter-square" />&nbsp;&nbsp;@Manu_Areraa</p>
                                                <p><a href="https://linktr.ee/manuareraa" target="_blank">Linktree</a></p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>







            <div className="column">
                <section class="hero is-fullheight">
                    <div class="hero-body has-text-centered">
                        <div class="login">
                            <img src={'/images/donate.svg'} style={{ width: '120px', height: '120px', marginBottom: '20px' }}></img>
                            <div className="has-background-dark has-text-white py-4 px-4" style={{ borderRadius: '5px' }}>Support us!</div>
                            <br></br>
                            <p className='title is-6'><b>{donateAddress}</b></p>
                            <button className='button is-link mb-3' onClick={() => navigator.clipboard.writeText(donateAddress)}>Copy Address</button>
                            <p className='has-text-link'>Please transfer Matic/Eth to the above address</p>
                        </div>
                    </div>
                </section>
            </div>
        </div>


    )
}

export default Aboutus;
