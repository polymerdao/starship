#!/usr/bin/env node

const {Command} = require('commander');
const {providers} = require('ethers');

const program = new Command();

async function checkIfContractExists(address, providerUrl) {
    const provider = new providers.JsonRpcProvider(providerUrl);
    const code = await provider.getCode(address);
    return code && code !== "0x";
}

program
    .description('CLI utility to check if a smart contract exists at a given Ethereum address')
    .requiredOption('-a, --address <address>', 'Ethereum address to check')
    .requiredOption('-r, --rpc <endpoint>', 'The RPC endpoint for the Ethereum network')
    .action(async (options) => {
        const {address, rpc} = options;
        const exists = await checkIfContractExists(address, rpc);
        if (!exists) {
            process.exit(1);
        }
    });

program.parse(process.argv);