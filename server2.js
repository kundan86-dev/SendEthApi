
const express = require("express");
const cors = require("cors");

 const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

let { Web3 } = require("web3");
 
require('dotenv').config();
const web3 = new Web3(new Web3.providers.HttpProvider(process.env.API_URL));

app.post("/txhash", async (req, res) => {
    try {
        const { body } = req;
        const { txHash } = body;

        if (!txHash) {
            return res.status(400).json({ error: "Missing txHash in request body" });
        }

        const transaction = await web3.eth.getTransaction(txHash);

        if (!transaction) {
            return res.status(404).json({ error: "Transaction not found" });
        }

        const response = {
            transactionHash: transaction.hash.toString(),
            blockNumber: transaction.blockNumber.toString(),
            fromAddress: transaction.from.toString(),
            toAddress: transaction.to.toString(),
            valueWei: transaction.value.toString(),
            gasPriceWei: transaction.gasPrice.toString(),
            gasLimit: transaction.gas.toString(),
            nonce: transaction.nonce.toString(),
        };
        console.log(response);

        // You can also fetch the transaction receipt for additional details
        // const receipt = await web3.eth.getTransactionReceipt(txHash);
        // if (receipt) {
        //     response.gasUsed = receipt.gasUsed.toString();
        //     response.status = receipt.status.toString(); // 0 for failed, 1 for success
        //     // Additional details can be added to the response from the receipt
        // } else {
        //     response.status = "Pending"; // Transaction not yet mined
        // }

        return res.status(200).json(response);
    } catch (error) {
        console.error('Error:', error);
        return res.status(500).json({ error: "Internal server error" });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});





