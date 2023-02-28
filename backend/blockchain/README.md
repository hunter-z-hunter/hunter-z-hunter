To compile:
```shell
yarn build
```

To test:
```shell
yarn test
```

To deploy:
```shell
npx hardhat run scripts/deploy.ts --network scrollTestnet
npx hardhat verify --network scrollTestnet <contract address>
```