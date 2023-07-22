const ethers = require('ethers');
const fs = require('fs');
const {program} = require('commander');

program
    .option('-k, --private-key <key>', 'Your private key')
    .option('-m, --mnemonic <mnemonic>', 'Your mnemonic')
    .requiredOption('-c, --contract-file <file>', 'The path to the contract artifact JSON file')
    .requiredOption('-r, --rpc <endpoint>', 'The RPC endpoint for the Ethereum network')
    .option('-a, --args [args]', 'Optional arguments for the contract constructor, comma-separated');

program.parse(process.argv);

(async () => {
    let wallet;

    const opts = program.opts();

    if (opts.privateKey) {
        const provider = new ethers.providers.JsonRpcProvider(({url: opts.rpc, skipFetchSetup: true}))
        wallet = new ethers.Wallet(opts.privateKey, provider);
    } else if (opts.mnemonic) {
        const mnemonic = opts.mnemonic;
        const path = "m/44'/60'/0'/0/0"; // You can adjust the path as needed
        wallet = ethers.Wallet.fromMnemonic(mnemonic, path);
        wallet = wallet.connect(new ethers.providers.JsonRpcProvider(opts.rpc));
    } else {
        console.error('You must provide either a private key or a mnemonic.');
        process.exit(1);
    }

    const contractFile = opts.contractFile;
    const metadata = JSON.parse(fs.readFileSync(contractFile).toString());

    const factory = new ethers.ContractFactory(metadata.abi, metadata.bytecode, wallet);

    // Parse optional args if provided, and feed them into the deploy function
    const deployArgs = opts.args ? opts.args.split(",") : [];
    const contract = await factory.deploy(...deployArgs);
    await contract.deployed();

    console.log(contract.address);
})();
