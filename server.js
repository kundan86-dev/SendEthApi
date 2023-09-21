
// const Web3= require("web3");
const express= require("express");
const https = require('https');
 
let { Web3 } = require("web3");
 
let provider = new Web3.providers.HttpProvider("https://sepolia.infura.io/v3/012c76e4a7e24c2c921459af30311e0a");

let web3 = new Web3(provider);




// const providerUrl = 'https://sepolia.infura.io/v3/012c76e4a7e24c2c921459af30311e0a';

const myKey = '289b0254f4e55ca25797a58efbcd55a28618525ef71e13e4000f29e7b7ccfc5f'; // Replace with your private key
const senderAddress = '0xd9Ea3594F4339CE9216c6B7d4C9FB64f6476a707'; // Replace with your sender address


// const web3 = new Web3.providers.HttpProvider(providerUrl);
// console.log(web3);

const app= express();
 app.use(express.json());
 app.use(express.static('public'));
 app.use(express.urlencoded({extended:true}));

app.post('/transfer',async(req,res)=>{
    const receiver= req.body.receiver;
    const amount= req.body.amount;
    const sendAm= await web3.utils.toWei(amount.toString(), 'ether');

    try{
        const gasPrice= await web3.eth.getGasPrice();
        let transaction={
            from:senderAddress,
            to: receiver,
            value:sendAm,
            gasPrice:gasPrice,
            gas:550000,
            chainId:11155111
        }
        const signedTransaction=await web3.eth.accounts.signTransaction(transaction,myKey);
        let receipt=await web3. eth.sendSignedTransaction(signedTransaction.rawTransaction);
        
        let trnsHash = receipt.transactionHash;
        // console.log(abc);
        return res.status(200).json({ trnsHash });
    }
    catch(error){
      console.log(error);
      return res.status(500).json({error:'Transaction failed'});
        
    }

});
app.listen(3000,()=>{
    console.log("server started at 3000.....");
});






//0xa74bdcde85b4adbcb016d553eec72e71a8ec3a2e2f8decf0968c9d4e92537b8a