const {Secp256k1HdWallet} = require("@cosmjs/launchpad");
const {program} = require('commander');
const ethers = require('ethers');

program
    .requiredOption("-m, --mnemonic <mnemonic>", "Your mnemonic")
    .option("-p, --prefix <prefix>", "The bech32 prefix of the chain", "cosmos");
program.parse(process.argv);

const opts = program.opts();

async function generateCosmosAddress(mnemonic, hrp) {
    // Create a wallet from the mnemonic with a custom hrp
    const wallet = await Secp256k1HdWallet.fromMnemonic(mnemonic, {prefix: hrp});

    // Get accounts from the wallet
    const accounts = await wallet.getAccounts();

    // Assuming you want the first account
    const {address, pubkey} = accounts[0];

    // Convert pubkey to a hex string
    const pubkeyHexString = Buffer.from(pubkey).toString('hex');

    return {cosmosAddress: address, cosmosPubkey: pubkeyHexString};
}

function generateEthereumAddress(mnemonic) {
    const wallet = ethers.Wallet.fromMnemonic(mnemonic);
    return {
        ethereumAddress: wallet.address,
        ethereumPrivateKey: wallet.privateKey
    };
}

(async function () {
    const cosmosData = await generateCosmosAddress(opts.mnemonic, opts.prefix);
    const ethereumData = generateEthereumAddress(opts.mnemonic);

    const combinedData = {
        ...cosmosData,
        ...ethereumData
    };

    console.log(JSON.stringify(combinedData));
})();
