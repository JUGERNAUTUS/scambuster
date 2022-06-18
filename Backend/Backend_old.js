const express = require('express')
const fs = require('fs')
const HDWalletProvider = require('@truffle/hdwallet-provider');
const Web3 = require('web3');
const https = require("https")
const sendMail = require('./mailservice')
const nodemailer = require('nodemailer')
const bodyParser = require('body-parser')
const Moralis = require("moralis/node");
//const linkpreview = require('link-preview-js')
const Pageres = require('pageres');
const dotenv = require('dotenv');
dotenv.config();

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

const protonabi = require('./protonABI')
const config = {
    private: "7526f47bfe4f3316f4f7d94c1fa978b27741f8de0d1d09a39120bb2a54400e6a",
    rpc: "https://speedy-nodes-nyc.moralis.io/5a65aeefd6cc8930e6f47455/polygon/mumbai",
    ownerAddress: "0xcc1eB02Fa619dceb2dBd69BbAd7Dcd6C10063a37",
    protonAddress: "0x222A1417108fde10eD49d447E782FbD30F8ADF37"
}
const owner = new HDWalletProvider(config.private, config.rpc)
const web3 = new Web3(owner)
const protonABI = JSON.parse(protonabi);
const contract = new web3.eth.Contract(protonABI, config.protonAddress)

const httpsServer = https.createServer({
    key: fs.readFileSync('server.key'),
    cert: fs.readFileSync('server.cert')
}, app)
httpsServer.listen(7171, () => {
    console.log('HTTPS Server Started @ 7171 ')
})
app.listen(5000, () => {
    console.log('HTTP Server Started @ 5000')
})
app.use(express.json({ limit: '15mb' }));
app.use(bodyParser.urlencoded({ limit: "15mb", extended: true }));

app.post("/sendinvite", function (req, res) {
    console.log("Reached here", req.body);
    sendInvite(req.body).then(function (response, err) {
        console.log("RESPONSE", response)
        if (response) {
            if (response === 'success') {
                res.status(200).json({ Status: response })
            } else {
                res.status(200).json({ Status: response })
            }
        }
        else {
            res.status(500).json({ error: err })
        }
    })
})

async function sendInvite(data) {
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.USER,
            pass: process.env.PASS
        }
    });

    var mailOptions = {
        from: 'howdy@mecasso.io',
        to: data.to,
        subject: data.subject,
        text: "Hello,\nPlease follow this link: https://mecasso.io/invite/" + data.body
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
    console.log("Reached here", req.body)
    console.log("txns counts: ", web3.eth.getTransactionCount("0xcc1eB02Fa619dceb2dBd69BbAd7Dcd6C10063a37"))
    contract.methods.mint(req.body.address, Web3.utils.toWei("1")).send({ from: config.ownerAddress }, function (error, transactionHash) {
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
            res.status(200).json({ Status: receipt })
        });
})

app.post('/getpreview', async function (req, res) {
    console.log("Reached here", req.body.url)
    try {
        let image = await new Pageres({ delay: 2, crop: true })
            .src(req.body.url, ['1200x720'])
            .dest('E:\\Blockchain\\Projects\\scambuster\\Backend\\')
            .run();

        console.log('Finished generating screenshots!', image);
        res.status(200).json({ Status: image })
    } catch (error) {
        res.status(200).json({ Status: "Error"})
    }
})