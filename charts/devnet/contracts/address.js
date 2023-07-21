const ethers = require('ethers');
const {program} = require('commander');

program.requiredOption("-m, --mnemonic <mnemonic>", "Your mnemonic");
program.parse(process.argv);

const opts = program.opts();
const wallet = ethers.Wallet.fromMnemonic(opts.mnemonic);
const address = wallet.address;
console.log(address);