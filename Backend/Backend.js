const express = require('express')
const fs = require('fs')
const HDWalletProvider = require('@truffle/hdwallet-provider');
const Web3 = require('web3');
const https = require("https")
//const sendMail = require('./mailservice')
const nodemailer = require('nodemailer')
const bodyParser = require('body-parser')
//const Moralis = require("moralis/node");
const linkpreview = require('link-preview-js')
const Pageres = require('pageres')
const dotenv = require('dotenv');
const crypto = require('crypto');

dotenv.config();

const redis = require('redis');

const client = redis.createClient();

client.connect();


const serverUrl = "https://lbn4bdcyigza.usemoralis.com:2053/server";
const appId = "sj9S2QaFxz3JkackdDjSBnBR5KIjwpbVgeWV7fQe";

const app = express()
app.use(function (req, res, next) {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');
    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,Authorization');
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);
    // Pass to next layer of middleware
    next();
});

const validatorabi = require('./validatorABI')
const protonabi = require('./protonABI')

const config = {
    private: process.env.WALLETKEY,
    rpc: "https://speedy-nodes-nyc.moralis.io/5a65aeefd6cc8930e6f47455/polygon/mumbai",
    ownerAddress: "0x2711A5379d704Ce8f475D079c6b99390ca216FC7",
    protonAddress: "0xbf3d3d199f04dbEb578250B1111361e25bEE7335",
    valAddress: "0xAC7bC4B424Dad961c63Fe6F165aFDFD58f6A4cC6"
}

/*
const httpsServer = https.createServer({
    key: fs.readFileSync('server.key'),
    cert: fs.readFileSync('server.cert')
}, app)
httpsServer.listen(7171, () => {
    console.log('HTTPS Server Started @ 7171 ')
})
*/


 app.listen(7171, () => {
     console.log('HTTP Server Started @ 7171')
 })
app.use(express.json({ limit: '15mb' }));
app.use(bodyParser.urlencoded({ limit: "15mb", extended: true }));

app.post("/sendinvite", function (req, res) {
    getToken(req.headers.authorization.split(' ')[1], req.headers.authorization.split(' ')[2]).then(function (response, err) {
        if (response) {
            console.log("Reached here", req.body);
            sendInvite(req.body).then(function (response, err) {
                console.log("RESPONSE NEW", response,err)
                if (response) {
                    
			console.log("Reached set invites");    
			setInvites(req.body.sender).then(function(res2,error){
                        console.log(response,res2, "Response here");
                        res.status(200).json({ Status: response,invites: res2 })
		       })		
                    } else {
                        res.status(500).json({ Status: err })
                    }
                })
	       }
                
        else {
            res.status(401).json({ Message: 'Invalid Session Token' })
        }
    })
})

async function sendInvite(data) {

	let transporter = nodemailer.createTransport({
			host: "smtp.titan.email",
			port: 465,
			secure: true,
        auth: {
            user: process.env.EMAILUSER,
            pass: process.env.EMAILPASS
            
        }
    });

    let linkEnd = Math.floor((Math.random() * 10000000) + 1);
    

    //await client.connect();   

    await client.set(linkEnd, data.receiver);

    console.log("written updated to  redis");
    var mailOptions = {
        from: 'scambuster@quantlabs.technology',
        to: data.to,
        subject: "Invitation to be a Scambuster validator",
        text: "Hello,\n\nYou have been invited to be a validator on Scambuster.\n\nPlease follow this link to verify: \n\nhttps://scambuster.io/verifylink/" + linkEnd + "\n\n Thanks \n\n Quantlabs Team"
    };

    return new Promise(function (resolve, reject) {
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
                resolve(error)
            } else {
                console.log('Email sent: ' + info.response);
                resolve(info.response)
            }
        });
    })
}

app.post('/mint', function (req, res) {
    
    getToken(req.headers.authorization.split(' ')[1], req.headers.authorization.split(' ')[2]).then(function (response, err) {
        if (response) {
            console.log('VALID SESSION TOKEN', response)
            const owner = new HDWalletProvider(config.private, config.rpc)
            const web3 = new Web3(owner)
            const protonABI = JSON.parse(protonabi);
            const contract = new web3.eth.Contract(protonABI, config.protonAddress)
            console.log("Reached here", req.body)
            console.log("txns counts: ", web3.eth.getTransactionCount("0xcc1eB02Fa619dceb2dBd69BbAd7Dcd6C10063a37"))
            contract.methods.mint(req.body.address,1).send({ from: config.ownerAddress }, function (error, transactionHash) {
                if (error) {
                    console.log("Error at mint charm");
                }
            })
                .on('error', function (error) {
                    console.log("error at mintcharm", error)
                    res.status(500).json({ Status: error })
                })
                .on('transactionHash', function (transactionHash) {
                    console.log("txHash", transactionHash);
                })
                .on('receipt', function (receipt) {
                    console.log("receipt", receipt);
                    //res.status(200).json({ Status: receipt })
                })
		.on('confirmation', function (confirmationNumber, receipt) {
                    if (confirmationNumber == 2) {
	            res.status(200).json({ Status: receipt })
		    }
		});
        } else {
            res.status(401).json({ Message: 'Invalid Session Token' })
        }
    })
})


app.post('/mintValidator', function (req, res) {
    getToken(req.headers.authorization.split(' ')[1], req.headers.authorization.split(' ')[2]).then(function (response, err) {
        if (response) {
            const owner = new HDWalletProvider(config.private, config.rpc)
            const web3 = new Web3(owner)
            const protonABI = JSON.parse(protonabi);
            const contract = new web3.eth.Contract(protonABI, config.protonAddress)

            console.log("Reached here", req.body)
            console.log("txns counts: ", web3.eth.getTransactionCount("0xcc1eB02Fa619dceb2dBd69BbAd7Dcd6C10063a37"))
            contract.methods.mint(req.body.address, 25).send({ from: config.ownerAddress }, function (error, transactionHash) {
                if (error) {
                    console.log("Error at mint");
                }
            })
                .on('error', function (error) {
                    console.log("error at mint", error)
                    res.status(500).json({ Status: error })
                })
                .on('transactionHash', function (transactionHash) {
                    console.log("txHash", transactionHash);
                })
                .on('receipt', function (receipt) {
                    console.log("receipt", receipt);
                    //res.status(200).json({ Status: receipt })
                })
		.on('confirmation', function (confirmationNumber, receipt) {
                    if (confirmationNumber == 2) {
                    res.status(200).json({ Status: receipt })
                    }
                });
        } else {
            res.status(401).json({ Message: 'Invalid Session Token' })
        }
    })
})
//app.post('/getpreview', function (req, res) {
//    console.log("Reached here", req.body.url)
//    linkpreview.getLinkPreview(req.body.url).then((data) =>
//        res.status(200).json({ Status: data })
//    );
//})

app.post('/getpreview', async function (req, res) {
    getToken(req.headers.authorization.split(' ')[1], req.headers.authorization.split(' ')[2]).then(async function (response, err) {
        if (response) {
            console.log("Reached getpreview", req.body.url)
            try {
		console.log('Inside Preview Try')
		    
                let image = await new Pageres({ delay: 2, crop: true, filename: '<%= url %>' })
                    .src(req.body.url, ['1000x720'])
                    .dest('./SitePreview')
                    .run();

                //console.log('Finished generating screenshots!', image);
                res.status(200).json({ Status: image })
            } catch (error) {
		    console.log('preview error', error)
                res.status(200).json({ Status: 'error' })
            }
        } else {
            res.status(401).json({ Message: 'Invalid Session Token' })
        }
    })
})


app.post('/validatormint', function (req, res) {

    const owner = new HDWalletProvider(config.private, config.rpc)
    const web3 = new Web3(owner)
    const protonABI = JSON.parse(protonabi);
    const contract = new web3.eth.Contract(protonABI, config.protonAddress)

    console.log("Reached here", req.body)
    //console.log("txns counts: ", web3.eth.getTransactionCount("0xcc1eB02Fa619dceb2dBd69BbAd7Dcd6C10063a37"))
    
   contract.methods.balanceOf(req.body.address).call({ from: config.ownerAddress }, function (response, err) 
	    {
       
     if(response >= 25)
       {
	console.log("Already a validator");
        res.status(500).json({ Status: "Already a validator" })
      }	       
	    
    contract.methods.mint(req.body.address, 25).send({ from: config.ownerAddress }, function (error, transactionHash) {
        if (error) {
            console.log("Error at mint charm");
        }
    })
        .on('error', function (error) {
            console.log("error at mintcharm", error)
            res.status(500).json({ Status: error })
        })
        .on('transactionHash', function (transactionHash) {
            console.log("txHash", transactionHash);
        })
        .on('receipt', function (receipt) {
            console.log("receipt", receipt);

            initInvites(req.body.address).then(function(res,err){

            res.status(200).json({ Status: receipt })
	    })	    
	

        });
})
})


async function initInvites(address) {
try {
	let addressInvite = address + 'invite';
	await client.set(addressInvite,5);
	return;
    }catch (error) {
        console.log(error)
    }
 }


app.post('/getInvites', function (req, res) {
  getInvites(req.body.address).then(function(response,err){
   
   res.status(200).json({ invites: response })

  })
 
})

async function getInvites(address) {
try {
        let addressInvite = address + 'invite';
        let invites = await client.get(addressInvite);
        return invites;
    }catch (error) {
        console.log(error)
    }
 }

app.post('/setInvites', function (req, res) {
  setInvites(req.body.address).then(function(response,err){
   
   res.status(200).json({ invites: response })
  
  })
})

async function setInvites(address) {
try {
        
	let addressInvite = address + 'invite';
	let invites = await client.get(addressInvite);
	let inviteint = parseInt(invites);
	let newinvites = inviteint-1
	console.log("invites initial and final in set invites",addressInvite,invites,newinvites);
        await client.set(addressInvite,newinvites);
        return newinvites;
    }catch (error) {
        console.log(error)
    }
 }

app.get('/getSiteStatus', function (req, res) {
    console.log("Reached here get", req.query)
    // res.status(200).json({ Data:"TRUE", URL: req.query.url})

    const owner = new HDWalletProvider(config.private, config.rpc)
    const web3 = new Web3(owner)
    const validatorABI = JSON.parse(validatorabi);
    web3.eth.handleRevert = true;
    const contract = new web3.eth.Contract(validatorABI, config.valAddress)

    try {
        contract.methods.getVoteStatus(req.query.url).call({ from: config.address }).then(function (response, err) {
            if (response) {
                //console.log(response[1]);
                res.status(200).send({ status: response[1] })
            } else {
                //console.log(error)
            }
        })
        // .on('error', function (error) {
        //     console.log("error at mintcharm", error)
        //     res.status(500).json({ Status: error })
        // })
        // .on('transactionHash', function (transactionHash) {
        //     console.log("txHash", transactionHash);
        // })
        // .on('receipt', function (receipt) {
        //     console.log("receipt", receipt);
        //     res.status(200).json({ Status: receipt })

    } catch (error) {
        console.log(error)
    }
})

app.post('/getSiteStatus', function (req, res) {
    console.log("Reached here post", req.body.url)
    // res.status(200).json({ Data:"TRUE", URL: req.query.url})

    const owner = new HDWalletProvider(config.private, config.rpc)
    const web3 = new Web3(owner)
    const validatorABI = JSON.parse(validatorabi);
    const contract = new web3.eth.Contract(validatorABI, config.valAddress)

    contract.methods.getVoteStatus(req.body.url).call({ from: config.address }).then(function (response, error) {
        if (response) {
            //console.log(response[1]);
            res.status(200).send({ status: response[1] })
        } else {
            //console.log(error)
        }
    })

})

app.post('/confirmlinkEnd', function (req, res) {

    console.log(req.body, "body")

    confirmlink(req.body.linkEnd).then(function (response, err) {

        res.status(200).json({ address: response })

    })

})

async function confirmlink(linkEnd) {

    //await client.connect();   

    const address = client.get(linkEnd);

    return address;
}



app.post("/getAuthToken", function (req, res) {
    console.log("Reached here - address", req.body.address);
    generateorcheckNonce(req.body.address).then(function (response, err) {
        console.log("RESPONSE", response)
        if (response) {
                res.status(200).json({ token: response[0] , status: response[1]  })
        }
        else {
            res.status(500).json({ error: err })
        }
    })
})



async function generateorcheckNonce(address) {

try {


let value = await client.get(address);
let nonce;
let status = "old"

if(!value)
{

	console.log(address,"address here");	
	nonce = await crypto.randomBytes(16).toString('base64');
	status = "new";

}

else
{
	let JSONtemp = JSON.parse(value)
	nonce = JSONtemp.nonce	
}	

console.log(nonce,status,"final nonce");

return [nonce, status];
} 

catch(err)
{
	console.log(err);
return [err.err];	
}
}




app.post("/addAuthToken", function (req, res) {
    console.log("Reached add Token - address and nonce", req.body.address, req.body.nonce );
    updateNonce(req.body.address,req.body.nonce,req.body.sig).then(function (response, err) {
        console.log("RESPONSE", response)
        if (response) {
                res.status(200).json({ status: response  })
        }
        else {
            res.status(500).json({ error: err })
        }
    })
})


async function updateNonce(address,nonce,sig) {

											
    try {

        console.log(address,nonce,sig,"Parameters for adding");
        
	let usercred = JSON.stringify({ nonce: nonce, sig: sig });

        await client.set(address, usercred, {
            EX: 86400
          });

	const value = await client.get(address);
	console.log("set value",value);

        return 'ok';
        }catch(err)
        {
            console.log(err);
            return err;
        }
}

// app.post('/verifytoken', function (req, res) {
//     console.log('Reached Here vtoken', req.body.address)
//     getToken(req.body.address).then(function (response, err) {
//         if (response) {
//             console.log('response', response)
//         } else {
//             console.log('error', err)
//             res.status(401).json({ Message: "Session Token Authentication Error" })
//         }
//     })
// })

async function getToken(address, tokenRecv) {
    try {
        //console.log('add', address, 'token', tokenRecv)
        let token = await client.get(address)
        //console.log('token', token, typeof(token), token.nonce, tokenRecv, token.nonce == tokenRecv)
	let nonce = token.split('"')
	//console.log('nonce', nonce)
        if (nonce[3] == tokenRecv) {
            return true
        } else {
            return false
        }
    } catch (error) {
        //console.log(error)
        return false
    }
}
