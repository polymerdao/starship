const ethers = require('ethers');
const {program} = require('commander');

program
    .requiredOption('-r, --rpc <endpoint>', 'The RPC endpoint for the Ethereum network')
    .requiredOption('-a, --address <address>', 'The Ethereum address to check');

program.parse(process.argv);

const opts = program.opts();

const provider = new ethers.providers.JsonRpcProvider(opts.rpc);
const address = opts.address;

async function checkBalance() {
    const balanceWei = await provider.getBalance(address);
    const balanceEther = ethers.utils.formatEther(balanceWei);
    console.log(`Balance of ${address}: ${balanceEther} ETH`);
}

checkBalance().catch(error => {
    console.error('Error checking balance:', error);
    process.exit(1);
});
