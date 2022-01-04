/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import {
  Signer,
  utils,
  BigNumberish,
  Contract,
  ContractFactory,
  Overrides,
} from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { SDOGEVault, SDOGEVaultInterface } from "../SDOGEVault";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "sdoge_",
        type: "address",
      },
      {
        internalType: "address",
        name: "sSDOGE_",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "epochLength_",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "firstEpochNumber_",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "firstEpochBlock_",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "recipient",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "LogClaim",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "recipient",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "LogForfeit",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "epochNumber",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "epochNextBlock",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "distribution",
        type: "uint256",
      },
    ],
    name: "LogRebase",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "recipient",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "bool",
        name: "trigger",
        type: "bool",
      },
    ],
    name: "LogRedeem",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "depositer",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "recipient",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "expiry",
        type: "uint256",
      },
    ],
    name: "LogStake",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "recipient_",
        type: "address",
      },
    ],
    name: "claim",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "contractBalance",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "distributor",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "epoch",
    outputs: [
      {
        internalType: "uint256",
        name: "period",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "number",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "nextBlock",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "distribute",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "escrowContract",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "escrowPeriod",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "forfeit",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "amount_",
        type: "uint256",
      },
    ],
    name: "giveLockBonus",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "index",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "locker",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "rebase",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "amount_",
        type: "uint256",
      },
      {
        internalType: "bool",
        name: "trigger_",
        type: "bool",
      },
    ],
    name: "redeem",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "amount_",
        type: "uint256",
      },
      {
        internalType: "bool",
        name: "trigger_",
        type: "bool",
      },
      {
        internalType: "uint256",
        name: "expiry",
        type: "uint256",
      },
      {
        internalType: "uint8",
        name: "v",
        type: "uint8",
      },
      {
        internalType: "bytes32",
        name: "r",
        type: "bytes32",
      },
      {
        internalType: "bytes32",
        name: "s",
        type: "bytes32",
      },
    ],
    name: "redeemWithPermit",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "amount_",
        type: "uint256",
      },
    ],
    name: "returnLockBonus",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "sSDOGE",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "sdoge",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "enum SDOGEVault.CONTRACTS",
        name: "contract_",
        type: "uint8",
      },
      {
        internalType: "address",
        name: "address_",
        type: "address",
      },
    ],
    name: "setContract",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "escrowPeriod_",
        type: "uint256",
      },
    ],
    name: "setEscrowPeriod",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "amount_",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "recipient_",
        type: "address",
      },
    ],
    name: "stake",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "stakeInfo",
    outputs: [
      {
        internalType: "uint256",
        name: "deposit",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "gons",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "expiry",
        type: "uint256",
      },
      {
        internalType: "bool",
        name: "lock",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "recipient_",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount_",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "expiry",
        type: "uint256",
      },
      {
        internalType: "uint8",
        name: "v",
        type: "uint8",
      },
      {
        internalType: "bytes32",
        name: "r",
        type: "bytes32",
      },
      {
        internalType: "bytes32",
        name: "s",
        type: "bytes32",
      },
    ],
    name: "stakeWithPermit",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "toggleDepositLock",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "totalBonus",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newOwner_",
        type: "address",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const _bytecode =
  "0x60c06040526001600b5534801561001557600080fd5b5060405162001ff138038062001ff1833981810160405260a081101561003a57600080fd5b50805160208201516040808401516060850151608090950151600080546001600160a01b031916331780825593519596949592949391926001600160a01b0392909216917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0908290a36001600160a01b0385166100b657600080fd5b6001600160601b0319606086901b166080526001600160a01b0384166100db57600080fd5b6001600160601b0319606085901b1660a0528261012a5760405162461bcd60e51b815260040180806020018281038252602581526020018062001fcc6025913960400191505060405180910390fd5b8061013457504382015b604080516080810182528481526020810184905290810182905260006060909101819052600193909355600291909155600355600455505060805160601c60a05160601c611de1620001eb600039806104b1528061059352806106e7528061085e52806108845280610dd45280610e7a52806112b4528061144852806115b652806117dc52806118d852806119135250806104df5280610a495280610cb052806113a752806115eb528061176e5250611de16000f3fe608060405234801561001057600080fd5b50600436106101ae5760003560e01c80638f077b83116100ee578063d65a06b011610097578063f16b51c111610071578063f16b51c114610426578063f2fde38b1461042e578063f3d86e4a14610454578063f62ae76a1461045c576101ae565b8063d65a06b0146103f1578063d7b96d4e14610416578063e42a96e71461041e576101ae565b8063af14052c116100c8578063af14052c146103c4578063b46f08bb146103cc578063bfe10928146103e9576101ae565b80638f077b8314610386578063900cf0cf1461038e578063a8dd07dc146103bc576101ae565b80632986c0e51161015b5780637acb7757116101355780637acb77571461031b578063865e6fd3146103475780638b7afe2e146103765780638da5cb5b1461037e576101ae565b80632986c0e5146102b2578063715018a6146102cc57806373d6a889146102d4576101ae565b80631601e6411161018c5780631601e641146102365780631e83409a1461028457806320ff23bf146102aa576101ae565b806303c23670146101b357806304befb71146101d25780631561956c146101f6575b600080fd5b6101d0600480360360208110156101c957600080fd5b5035610479565b005b6101da6104dd565b604080516001600160a01b039092168252519081900360200190f35b6101d0600480360360c081101561020c57600080fd5b50803590602081013515159060408101359060ff6060820135169060808101359060a00135610501565b61025c6004803603602081101561024c57600080fd5b50356001600160a01b0316610605565b6040805194855260208501939093528383019190915215156060830152519081900360800190f35b6101d06004803603602081101561029a57600080fd5b50356001600160a01b031661062f565b6101da61085c565b6102ba610880565b60408051918252519081900360200190f35b6101d061090c565b6102ba600480360360c08110156102ea57600080fd5b506001600160a01b038135169060208101359060408101359060ff6060820135169060808101359060a001356109b5565b6102ba6004803603604081101561033157600080fd5b50803590602001356001600160a01b0316610abe565b6101d06004803603604081101561035d57600080fd5b50803560ff1690602001356001600160a01b0316610b1b565b6102ba610ca6565b6101da610d52565b6101d0610d61565b610396610d85565b604080519485526020850193909352838301919091526060830152519081900360800190f35b6102ba610d94565b6101d0610d9a565b6101d0600480360360208110156103e257600080fd5b5035610fee565b6101da611052565b6101d06004803603604081101561040757600080fd5b50803590602001351515611061565b6101da6110b0565b6101da6110bf565b6102ba6110ce565b6101d06004803603602081101561044457600080fd5b50356001600160a01b03166110d4565b6101d06111d3565b6101d06004803603602081101561047257600080fd5b5035611410565b6007546001600160a01b0316331461049057600080fd5b60085461049d9082611472565b6008556007546104da906001600160a01b037f000000000000000000000000000000000000000000000000000000000000000081169116836114d3565b50565b7f000000000000000000000000000000000000000000000000000000000000000081565b600b54600114610541576040805162461bcd60e51b81526020600482015260066024820152651313d0d2d15160d21b604482015290519081900360640190fd5b6000600b8190556040805163d505accf60e01b8152336004820152306024820152604481018990526064810187905260ff8616608482015260a4810185905260c4810184905290516001600160a01b037f0000000000000000000000000000000000000000000000000000000000000000169263d505accf9260e4808201939182900301818387803b1580156105d657600080fd5b505af11580156105ea573d6000803e3d6000fd5b505050506105f8868661153f565b50506001600b5550505050565b60056020526000908152604090208054600182015460028301546003909301549192909160ff1684565b600b5460011461066f576040805162461bcd60e51b81526020600482015260066024820152651313d0d2d15160d21b604482015290519081900360640190fd5b6000600b5561067c611d14565b506001600160a01b03811660009081526005602090815260409182902082516080810184528154815260018201549281018390526002820154938101939093526003015460ff1615156060830152158015906106de5750604081015160025410155b156108535760007f00000000000000000000000000000000000000000000000000000000000000006001600160a01b0316637965d56d83602001516040518263ffffffff1660e01b81526004018082815260200191505060206040518083038186803b15801561074d57600080fd5b505afa158015610761573d6000803e3d6000fd5b505050506040513d602081101561077757600080fd5b50516001600160a01b038085166000818152600560205260408082208281556001810183905560028101839055600301805460ff19169055600954815163c3a2a66560e01b815260048101949094526024840186905290519495509092169263c3a2a6659260448084019391929182900301818387803b1580156107fa57600080fd5b505af115801561080e573d6000803e3d6000fd5b50506040805184815290516001600160a01b03871693507ffce6d5860f911bc27ece1365300332d2ddbe20c1adc46ee2eddd8f72c48053b292509081900360200190a2505b50506001600b55565b7f000000000000000000000000000000000000000000000000000000000000000081565b60007f00000000000000000000000000000000000000000000000000000000000000006001600160a01b0316632986c0e56040518163ffffffff1660e01b815260040160206040518083038186803b1580156108db57600080fd5b505afa1580156108ef573d6000803e3d6000fd5b505050506040513d602081101561090557600080fd5b5051905090565b6000546001600160a01b0316331461096b576040805162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572604482015290519081900360640190fd5b600080546040516001600160a01b03909116907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0908390a3600080546001600160a01b0319169055565b6000600b546001146109f7576040805162461bcd60e51b81526020600482015260066024820152651313d0d2d15160d21b604482015290519081900360640190fd5b6000600b8190556040805163d505accf60e01b8152336004820152306024820152604481018990526064810188905260ff8716608482015260a4810186905260c4810185905290516001600160a01b037f0000000000000000000000000000000000000000000000000000000000000000169263d505accf9260e4808201939182900301818387803b158015610a8c57600080fd5b505af1158015610aa0573d6000803e3d6000fd5b50505050610aae8688611651565b6001600b55979650505050505050565b6000600b54600114610b00576040805162461bcd60e51b81526020600482015260066024820152651313d0d2d15160d21b604482015290519081900360640190fd5b6000600b55610b0f8383611651565b6001600b559392505050565b6000546001600160a01b03163314610b7a576040805162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572604482015290519081900360640190fd5b6000826002811115610b8857fe5b1415610bae57600680546001600160a01b0319166001600160a01b038316179055610ca2565b6001826002811115610bbc57fe5b1415610c2a576009546001600160a01b031615610c0a5760405162461bcd60e51b8152600401808060200182810382526023815260200180611d886023913960400191505060405180910390fd5b600980546001600160a01b0319166001600160a01b038316179055610ca2565b6002826002811115610c3857fe5b1415610ca2576007546001600160a01b031615610c865760405162461bcd60e51b8152600401808060200182810382526023815260200180611d3f6023913960400191505060405180910390fd5b600780546001600160a01b0319166001600160a01b0383161790555b5050565b6000610d4d6008547f00000000000000000000000000000000000000000000000000000000000000006001600160a01b03166370a08231306040518263ffffffff1660e01b815260040180826001600160a01b0316815260200191505060206040518083038186803b158015610d1b57600080fd5b505afa158015610d2f573d6000803e3d6000fd5b505050506040513d6020811015610d4557600080fd5b505190611472565b905090565b6000546001600160a01b031690565b336000908152600560205260409020600301805460ff19811660ff90911615179055565b60015460025460035460045484565b60085481565b6003544310610fec57600254600454600154600354610db891611472565b6003556002805460010190556000610dce610ca6565b905060007f00000000000000000000000000000000000000000000000000000000000000006001600160a01b0316639358928b6040518163ffffffff1660e01b815260040160206040518083038186803b158015610e2b57600080fd5b505afa158015610e3f573d6000803e3d6000fd5b505050506040513d6020811015610e5557600080fd5b50519050808211610e6a576000600455610e78565b610e74828261198b565b6004555b7f00000000000000000000000000000000000000000000000000000000000000006001600160a01b031663058ecdb484866040518363ffffffff1660e01b81526004018083815260200182815260200192505050602060405180830381600087803b158015610ee657600080fd5b505af1158015610efa573d6000803e3d6000fd5b505050506040513d6020811015610f1057600080fd5b50506006546001600160a01b031615610fa057600660009054906101000a90046001600160a01b03166001600160a01b031663e4fc6b6d6040518163ffffffff1660e01b8152600401602060405180830381600087803b158015610f7357600080fd5b505af1158015610f87573d6000803e3d6000fd5b505050506040513d6020811015610f9d57600080fd5b50505b60025460035460045460408051938452602084019290925282820152517f6012dbce857565c4a40974aa5de8373a761fc429077ef0c8c8611d1e20d63fb29181900360600190a1505050505b565b6000546001600160a01b0316331461104d576040805162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572604482015290519081900360640190fd5b600a55565b6006546001600160a01b031681565b600b546001146110a1576040805162461bcd60e51b81526020600482015260066024820152651313d0d2d15160d21b604482015290519081900360640190fd5b6000600b55610853828261153f565b6007546001600160a01b031681565b6009546001600160a01b031681565b600a5481565b6000546001600160a01b03163314611133576040805162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572604482015290519081900360640190fd5b6001600160a01b0381166111785760405162461bcd60e51b8152600401808060200182810382526026815260200180611d626026913960400191505060405180910390fd5b600080546040516001600160a01b03808516939216917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e091a3600080546001600160a01b0319166001600160a01b0392909216919091179055565b600b54600114611213576040805162461bcd60e51b81526020600482015260066024820152651313d0d2d15160d21b604482015290519081900360640190fd5b6000600b55611220611d14565b503360009081526005602090815260409182902082516080810184528154815260018201549281018390526002820154938101939093526003015460ff161515606083015215611408573360009081526005602090815260408083208381556001810184905560028101849055600301805460ff19169055838201518151637965d56d60e01b8152600481019190915290517f00000000000000000000000000000000000000000000000000000000000000006001600160a01b031692637965d56d9260248082019391829003018186803b1580156112fe57600080fd5b505afa158015611312573d6000803e3d6000fd5b505050506040513d602081101561132857600080fd5b50516009546040805163c3a2a66560e01b81523060048201526024810184905290519293506001600160a01b039091169163c3a2a6659160448082019260009290919082900301818387803b15801561138057600080fd5b505af1158015611394573d6000803e3d6000fd5b505083516113d092506001600160a01b037f000000000000000000000000000000000000000000000000000000000000000016915033906114d3565b60408051828152905133917f49061b06e96eda05f6ac81413280dea0d1b9b2a4cd9eabbfb91ea9ce0ad30c9e919081900360200190a2505b506001600b55565b6007546001600160a01b0316331461142757600080fd5b600854611434908261198b565b6008556007546104da906001600160a01b037f00000000000000000000000000000000000000000000000000000000000000008116911630846119cd565b6000828201838110156114cc576040805162461bcd60e51b815260206004820152601b60248201527f536166654d6174683a206164646974696f6e206f766572666c6f770000000000604482015290519081900360640190fd5b9392505050565b604080516001600160a01b038416602482015260448082018490528251808303909101815260649091019091526020810180517bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1663a9059cbb60e01b17905261153a908490611a42565b505050565b611547610ca6565b82111561159b576040805162461bcd60e51b815260206004820152601d60248201527f496e73756666696369656e7420636f6e74726163742062616c616e6365000000604482015290519081900360640190fd5b80156115a9576115a9610d9a565b6115de6001600160a01b037f0000000000000000000000000000000000000000000000000000000000000000163330856119cd565b6116126001600160a01b037f00000000000000000000000000000000000000000000000000000000000000001633846114d3565b604080518381528215156020820152815133927fce85436fa15febc004406cb8625d12da4b65aa49fa8c8c2576abea181e4ec67a928290030190a25050565b60006001600160a01b0382166116ae576040805162461bcd60e51b815260206004820152601360248201527f526563697069656e7420756e646566696e656400000000000000000000000000604482015290519081900360640190fd5b6116b6611d14565b506001600160a01b03821660009081526005602090815260409182902082516080810184528154815260018201549281019290925260028101549282019290925260039091015460ff161580156060830152611759576040805162461bcd60e51b815260206004820152601f60248201527f4465706f7369747320666f72206163636f756e7420617265206c6f636b656400604482015290519081900360640190fd5b611761610d9a565b6117966001600160a01b037f0000000000000000000000000000000000000000000000000000000000000000163330876119cd565b600a546002546000916117a99190611472565b82519091506000906117bb9087611472565b600a54909150156119065760405180608001604052808281526020016118757f00000000000000000000000000000000000000000000000000000000000000006001600160a01b0316631bd396748a6040518263ffffffff1660e01b81526004018082815260200191505060206040518083038186803b15801561183e57600080fd5b505afa158015611852573d6000803e3d6000fd5b505050506040513d602081101561186857600080fd5b5051602087015190611472565b81526020808201859052600060409283018190526001600160a01b0389811682526005835290839020845181559184015160018301559183015160028201556060909201516003909201805460ff191692151592909217909155600954611901917f000000000000000000000000000000000000000000000000000000000000000081169116886114d3565b61193a565b61193a6001600160a01b037f00000000000000000000000000000000000000000000000000000000000000001686886114d3565b604080518781526020810184905281516001600160a01b0388169233927fb9ba725934532316cffe10975da6eb25ad49c2d1c294d982c46c9f8d684ee075929081900390910190a395945050505050565b60006114cc83836040518060400160405280601e81526020017f536166654d6174683a207375627472616374696f6e206f766572666c6f770000815250611af3565b604080516001600160a01b0380861660248301528416604482015260648082018490528251808303909101815260849091019091526020810180517bffffffffffffffffffffffffffffffffffffffffffffffffffffffff166323b872dd60e01b179052611a3c908590611a42565b50505050565b6060611a97826040518060400160405280602081526020017f5361666545524332303a206c6f772d6c6576656c2063616c6c206661696c6564815250856001600160a01b0316611b8a9092919063ffffffff16565b80519091501561153a57808060200190516020811015611ab657600080fd5b505161153a5760405162461bcd60e51b815260040180806020018281038252602a815260200180611dab602a913960400191505060405180910390fd5b60008184841115611b825760405162461bcd60e51b81526004018080602001828103825283818151815260200191508051906020019080838360005b83811015611b47578181015183820152602001611b2f565b50505050905090810190601f168015611b745780820380516001836020036101000a031916815260200191505b509250505060405180910390fd5b505050900390565b6060611b998484600085611ba1565b949350505050565b6060611bac85611d0e565b611bfd576040805162461bcd60e51b815260206004820152601d60248201527f416464726573733a2063616c6c20746f206e6f6e2d636f6e7472616374000000604482015290519081900360640190fd5b60006060866001600160a01b031685876040518082805190602001908083835b60208310611c3c5780518252601f199092019160209182019101611c1d565b6001836020036101000a03801982511681845116808217855250505050505090500191505060006040518083038185875af1925050503d8060008114611c9e576040519150601f19603f3d011682016040523d82523d6000602084013e611ca3565b606091505b50915091508115611cb7579150611b999050565b805115611cc75780518082602001fd5b60405162461bcd60e51b8152602060048201818152865160248401528651879391928392604401919085019080838360008315611b47578181015183820152602001611b2f565b3b151590565b6040518060800160405280600081526020016000815260200160008152602001600015158152509056fe4c6f636b65722063616e6e6f7420626520736574206d6f7265207468616e206f6e63654f776e61626c653a206e6577206f776e657220697320746865207a65726f2061646472657373457363726f772063616e6e6f7420626520736574206d6f7265207468616e206f6e63655361666545524332303a204552433230206f7065726174696f6e20646964206e6f742073756363656564a164736f6c6343000705000a45706f636820706572696f642073686f756c642062652067726561746572207468616e2030";

export class SDOGEVault__factory extends ContractFactory {
  constructor(
    ...args: [signer: Signer] | ConstructorParameters<typeof ContractFactory>
  ) {
    if (args.length === 1) {
      super(_abi, _bytecode, args[0]);
    } else {
      super(...args);
    }
  }

  deploy(
    sdoge_: string,
    sSDOGE_: string,
    epochLength_: BigNumberish,
    firstEpochNumber_: BigNumberish,
    firstEpochBlock_: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<SDOGEVault> {
    return super.deploy(
      sdoge_,
      sSDOGE_,
      epochLength_,
      firstEpochNumber_,
      firstEpochBlock_,
      overrides || {}
    ) as Promise<SDOGEVault>;
  }
  getDeployTransaction(
    sdoge_: string,
    sSDOGE_: string,
    epochLength_: BigNumberish,
    firstEpochNumber_: BigNumberish,
    firstEpochBlock_: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(
      sdoge_,
      sSDOGE_,
      epochLength_,
      firstEpochNumber_,
      firstEpochBlock_,
      overrides || {}
    );
  }
  attach(address: string): SDOGEVault {
    return super.attach(address) as SDOGEVault;
  }
  connect(signer: Signer): SDOGEVault__factory {
    return super.connect(signer) as SDOGEVault__factory;
  }
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): SDOGEVaultInterface {
    return new utils.Interface(_abi) as SDOGEVaultInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): SDOGEVault {
    return new Contract(address, _abi, signerOrProvider) as SDOGEVault;
  }
}
