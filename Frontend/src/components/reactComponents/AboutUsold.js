import React from 'react';

function Aboutus(props) {

    const donateAddress = '0x1a05D8a43a88b532bB47D2317C4A34a891Be2D4E'

    return (
        <div className="columns is-centered">
            <section class="hero is-fullheight">
                <div class="hero-body has-text-centered">
                    <div class="login">
                        <img src={'/images/donate.svg'} style={{width: '120px', height: '120px', marginBottom: '20px'}}></img>
                        <div className="has-background-dark has-text-white py-4 px-4" style={{borderRadius: '5px'}}>Donate Us</div>
                        <br></br>
                        <p className='title is-5'><b>{donateAddress}</b></p>
                        <button className='button is-link mb-3' onClick={() => navigator.clipboard.writeText(donateAddress)}>Copy Address</button>
                        <p className='has-text-link'>Polygon/Ethereum Address</p>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Aboutus;