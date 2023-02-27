To deploy:
```shell
npx hardhat run scripts/deploy.ts --network goerli
npx hardhat verify --contract contracts/SimpleToken.sol:SimpleToken --network goerli --constructor-args scripts/arguments.js <contract address>
```