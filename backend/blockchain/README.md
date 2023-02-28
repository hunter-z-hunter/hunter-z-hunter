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
npx hardhat run scripts/deploy.ts --network polygonMumbai
npx hardhat verify --network polygonMumbai --constructor-args scripts/arguments.js <contract address>
```