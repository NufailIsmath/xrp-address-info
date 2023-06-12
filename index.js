const RippleAPI = require("ripple-lib").RippleAPI;

const api = new RippleAPI({
    server: 'wss://s1.ripple.com'
})

const address = 'rBtttd61FExHC68vsZ8dqmS3DfjFEceA1A';

const main = async () => {
    try {
        // Connecting the XRP Mainnet
        await api.connect();
        console.log("[INFO] => Connected to the network.");

        // Get account Info
        const accountInfo = await api.getAccountInfo(address);

        // The balance of account. converted from drops to xrp
        console.log(`[INFO] => Balance of ${address} : ${accountInfo.xrpBalance}`);

        //Get transaction details
        const transactions = await api.getTransactions(address, {
            limit: 20
        });

        console.log("[INFO] => Transaction Histories");
        console.log();
        transactions.forEach(txn => {
            if (txn.type === 'payment') {
                console.log(`[INFO] => User Address: ${txn.address}`);
                console.log(`[INFO] => Transaction Hash: ${txn.id}`);
                console.log(`[INFO] => Amount: ${txn.outcome.deliveredAmount.value}`);
                console.log(`[INFO] => Timestamp: ${txn.outcome.timestamp}`);
                console.log(`---`);
            } else {
                console.log(`[INFO] => User Address: ${txn.address}`);
                console.log(`[INFO] => Transaction Hash: ${txn.id}`);
            }
        });

        // Disconnect the Network 
        await api.disconnect();

    } catch (error) {
        console.error(`[ERROR] = > ${error}`);
    }
}

main();