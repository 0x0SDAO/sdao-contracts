# SDAO Smart Contracts

##  🔧 Setting up local development

Requirements:
- [Node v14](https://nodejs.org/download/release/latest-v14.x/)
- [Git](https://git-scm.com/downloads)


Local Setup Steps:
1. ``git clone https://github.com/ScholarDAO/sdao-contracts.git ``
1. Install dependencies: `npm install`
    - Installs [Hardhat](https://hardhat.org/getting-started/) and [OpenZepplin](https://docs.openzeppelin.com/contracts/4.x/) dependencies
1. Compile Solidity: ``npm run compile``
1. **_TODO_**: How to do local deployments of the contracts


## 🤨 How it all works
![High Level Contract Interactions](./docs/box-diagram.png)

## Contract addresses

### Mainnet addresses

|Contract       | Addresses                                                                                                        | Notes                                |
|:-------------:|:----------------------------------------------------------------------------------------------------------------:|:------------------------------------:|
|PSDAO          |[                                          ](https://ftmscan.io/address/                                         )| Presale token contract               |
|PrivateSale    |[                                          ](https://ftmscan.io/address/                                         )| Private sale contract                |
|SDAO           |[                                          ](https://ftmscan.io/address/                                         )| Main token contract                  |
|SSDAO          |[                                          ](https://ftmscan.io/address/                                         )| Staked token contract                |
|Treasury       |[                                          ](https://ftmscan.io/address/                                         )| SDAO Treasury holds all the assets   |
|Staking        |[                                          ](https://ftmscan.io/address/                                         )| Main Staking contract                |
|Distributor    |[                                          ](https://ftmscan.io/address/                                         )| Distributor contract                 |
|DAO            |[                                          ](https://ftmscan.io/address/                                         )| Storage Wallet for DAO under MS      |

### Bonds

**_TODO_**: What are the requirements for creating a Bond Contract?

All LP bonds use the Bonding Calculator contract which is used to compute RFV.

|Contract           | Addresses                                                                                                           | Notes                                                |
|:-----------------:|:-------------------------------------------------------------------------------------------------------------------:|:----------------------------------------------------:|
|BondingCalculator  |[                                          ](https://etherscan.io/address/                                          )| Bonding calculator                                   |
|USDC bond          |[                                          ](https://etherscan.io/address/                                          )| Main bond managing serve mechanics for USDC          |
|DAI bond           |[                                          ](https://etherscan.io/address/                                          )| Main bond managing serve mechanics for DAI           |
|USDC/SDAO LP Bond  |[                                          ](https://etherscan.io/address/                                          )| Main bond managing serve mechanics for USDC-SDAO LP. |
|WFTM Bond          |[                                          ](https://etherscan.io/address/                                          )| Main bond managing serve mechanics for WFTM          |
|RedeemHelper       |[                                          ](https://etherscan.io/address/                                          )| Redeem helper for bonds                              |

### Testnet addresses

|Contract       | Addresses                                                                                                        | Notes                                |
|:-------------:|:----------------------------------------------------------------------------------------------------------------:|:------------------------------------:|
|PSDAO          |[                                          ](https://ftmscan.io/address/                                         )| Presale token contract               |
|PrivateSale    |[                                          ](https://ftmscan.io/address/                                         )| Private sale contract                |
|SDAO           |[                                          ](https://ftmscan.io/address/                                         )| Main token contract                  |
|SSDAO          |[                                          ](https://ftmscan.io/address/                                         )| Staked token contract                |
|Treasury       |[                                          ](https://ftmscan.io/address/                                         )| SDAO Treasury holds all the assets   |
|Staking        |[                                          ](https://ftmscan.io/address/                                         )| Main Staking contract                |
|Distributor    |[                                          ](https://ftmscan.io/address/                                         )| Distributor contract                 |
|DAO            |[                                          ](https://ftmscan.io/address/                                         )| Storage Wallet for DAO under MS      |

## Bonds

|Contract           | Addresses                                                                                                           | Notes                                                |
|:-----------------:|:-------------------------------------------------------------------------------------------------------------------:|:----------------------------------------------------:|
|BondingCalculator  |[                                          ](https://etherscan.io/address/                                          )| Bonding calculator                                   |
|USDC bond          |[                                          ](https://etherscan.io/address/                                          )| Main bond managing serve mechanics for USDC          |
|DAI bond           |[                                          ](https://etherscan.io/address/                                          )| Main bond managing serve mechanics for DAI           |
|USDC/SDAO LP Bond  |[                                          ](https://etherscan.io/address/                                          )| Main bond managing serve mechanics for USDC-SDAO LP. |
|WFTM Bond          |[                                          ](https://etherscan.io/address/                                          )| Main bond managing serve mechanics for WFTM          |
|RedeemHelper       |[                                          ](https://etherscan.io/address/                                          )| Redeem helper for bonds                              |

## Allocator Guide

The following is a guide for interacting with the treasury as a reserve allocator.

A reserve allocator is a contract that deploys funds into external strategies, such as Aave, Curve, etc.

Treasury Address: `0x31F8Cc382c9898b273eff4e0b7626a6987C846E8`

### Managing
The first step is withdraw funds from the treasury via the "manage" function. "Manage" allows an approved address to withdraw excess reserves from the treasury.

**NOTE**: This contract must have the "reserve manager" permission, and that withdrawn reserves decrease the treasury's ability to mint new SDAO (since backing has been removed).

Pass in the token address and the amount to manage. The token will be sent to the contract calling the function.

```
function manage( address _token, uint _amount ) external;
```

Managing treasury assets should look something like this:
```
treasury.manage( DAI, amountToManage );
```

### Returning
The second step is to return funds after the strategy has been closed.
We utilize the `deposit` function to do this. Deposit allows an approved contract to deposit reserve assets into the treasury, and mint SDAO against them. In this case however, we will NOT mint any SDAO. This will be explained shortly.

**NOTE**: The contract must have the "reserve depositor" permission, and that deposited reserves increase the treasury's ability to mint new SDAO (since backing has been added).


Pass in the address sending the funds (most likely the allocator contract), the amount to deposit, and the address of the token. The final parameter, profit, dictates how much SDAO to send. send_, the amount of SDAO to send, equals the value of amount minus profit.
```
function deposit( address _from, uint _amount, address _token, uint _profit ) external returns ( uint send_ );
```

To ensure no SDAO is minted, we first get the value of the asset, and pass that in as profit.
Pass in the token address and amount to get the treasury value.
```
function valueOf( address _token, uint _amount ) public view returns ( uint value_ );
```

All together, returning funds should look something like this:
```
treasury.deposit( address(this), amountToReturn, DAI, treasury.valueOf( DAI, amountToReturn ) );
```

## Dapptools testing

1. Install dapptools (see [here](https://github.com/dapphub/dapptools))
2. Pull the contract dependencies: ``git submodule update --init --recursive``
2. Run ``dapp test``

