/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type {
  ScholarDAOToken,
  ScholarDAOTokenInterface,
} from "../ScholarDAOToken";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_psdao",
        type: "address",
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
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "Approval",
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
    name: "OwnershipPulled",
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
    name: "OwnershipPushed",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "Transfer",
    type: "event",
  },
  {
    inputs: [],
    name: "DOMAIN_SEPARATOR",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "PERMIT_TYPEHASH",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account_",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount_",
        type: "uint256",
      },
    ],
    name: "_burnFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "_newOwner",
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
    name: "_owner",
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
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
    ],
    name: "allowance",
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
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "approve",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "balanceOf",
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
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "burn",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account_",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount_",
        type: "uint256",
      },
    ],
    name: "burnFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "claimEnabled",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "claimWithPSDAO",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "decimals",
    outputs: [
      {
        internalType: "uint8",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "subtractedValue",
        type: "uint256",
      },
    ],
    name: "decreaseAllowance",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "disableSafeLaunch",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "enableClaim",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "enableSafeLaunch",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "addedValue",
        type: "uint256",
      },
    ],
    name: "increaseAllowance",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "initialized",
    outputs: [
      {
        internalType: "bool",
        name: "",
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
        name: "account_",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount_",
        type: "uint256",
      },
    ],
    name: "mint",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "name",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
    ],
    name: "nonces",
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
    name: "pair",
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
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "deadline",
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
    name: "permit",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "psdao",
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
    name: "pullManagement",
    outputs: [],
    stateMutability: "nonpayable",
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
    name: "pushManagement",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceManagement",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "safeLaunch",
    outputs: [
      {
        internalType: "bool",
        name: "",
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
        name: "pair_",
        type: "address",
      },
    ],
    name: "setPair",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "vault_",
        type: "address",
      },
    ],
    name: "setVault",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "symbol",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalSupply",
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
        name: "recipient",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "transfer",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "sender",
        type: "address",
      },
      {
        internalType: "address",
        name: "recipient",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "transferFrom",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "vault",
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
];

const _bytecode =
  "0x60a0604052600a805460ff60a81b1916600160a81b1790553480156200002457600080fd5b5060405162001fd938038062001fd9833981810160405260208110156200004a57600080fd5b5051604080518082018252601081526f29b1b437b630b92220a7903a37b5b2b760811b602082810191825283518085019094526005845264245344414f60d81b908401528151919291600991620000a59160039190620002bd565b508151620000bb906004906020850190620002bd565b506005805460ff191660ff92909216919091179055504690507f8b73c3c69bb8fe3d512ecc4cf759cc79239f7b179b0ffacaa9a75d522b39400f620000ff62000223565b805160209182012060408051808201825260018152603160f81b90840152805180840194909452838101919091527fc89efdaa54c0f20c7adf612882df0950f5a951637e0307cdcb4c672f298b8bc6606084015260808301939093523060a0808401919091528351808403909101815260c0909201928390528151910120600755600880546001600160a01b0319163317908190556001600160a01b0316906000907fea8258f2d9ddb679928cf34b78cf645b7feda9acc828e4dd82d014eaae270eba908290a36001600160a01b0381166200020d5760405162461bcd60e51b815260040180806020018281038252602681526020018062001fb36026913960400191505060405180910390fd5b60601b6001600160601b03191660805262000369565b60038054604080516020601f6002600019610100600188161502019095169490940493840181900481028201810190925282815260609390929091830182828015620002b35780601f106200028757610100808354040283529160200191620002b3565b820191906000526020600020905b8154815290600101906020018083116200029557829003601f168201915b5050505050905090565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282620002f5576000855562000340565b82601f106200031057805160ff191683800117855562000340565b8280016001018555821562000340579182015b828111156200034057825182559160200191906001019062000323565b506200034e92915062000352565b5090565b5b808211156200034e576000815560010162000353565b60805160601c611c226200039160003980610d525280610ffb52806110bc5250611c226000f3fe608060405234801561001057600080fd5b506004361061025c5760003560e01c806370a0823111610145578063a8aa1b31116100bd578063c5c359761161008c578063dd62ed3e11610071578063dd62ed3e14610656578063fbfa77cf14610684578063fe62af211461068c5761025c565b8063c5c35976146105fd578063d505accf146106055761025c565b8063a8aa1b31146105b9578063a9059cbb146105c1578063b2bdfa7b146105ed578063b74908fe146105f55761025c565b80638187f5161161011457806395d89b41116100f957806395d89b4114610559578063a22b35ce14610561578063a457c2d71461058d5761025c565b80638187f5161461052b5780639381ced1146105515761025c565b806370a082311461048f57806379cc6790146104b55780637ecebe00146104e1578063811ba4b5146105075761025c565b8063313ce567116101d857806342966c68116101a757806358ca83ee1161018c57806358ca83ee146104595780635a96ac0a146104615780636817031b146104695761025c565b806342966c681461041657806346f68ee9146104335761025c565b8063313ce567146103985780633644e515146103b657806339509351146103be57806340c10f19146103ea5761025c565b806318160ddd1161022f5780632866ed21116102145780632866ed211461038057806328dae6e31461038857806330adf81f146103905761025c565b806318160ddd1461033057806323b872dd1461034a5761025c565b806306fdde0314610261578063089208d8146102de578063095ea7b3146102e8578063158ef93e14610328575b600080fd5b610269610694565b6040805160208082528351818301528351919283929083019185019080838360005b838110156102a357818101518382015260200161028b565b50505050905090810190601f1680156102d05780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b6102e661072a565b005b610314600480360360408110156102fe57600080fd5b506001600160a01b0381351690602001356107d3565b604080519115158252519081900360200190f35b6103146107e9565b6103386107f9565b60408051918252519081900360200190f35b6103146004803603606081101561036057600080fd5b506001600160a01b038135811691602081013590911690604001356107ff565b610314610868565b6102e6610878565b610338610907565b6103a061092b565b6040805160ff9092168252519081900360200190f35b610338610934565b610314600480360360408110156103d457600080fd5b506001600160a01b03813516906020013561093a565b6102e66004803603604081101561040057600080fd5b506001600160a01b038135169060200135610970565b6102e66004803603602081101561042c57600080fd5b50356109c7565b6102e66004803603602081101561044957600080fd5b50356001600160a01b03166109d4565b6102e6610ad4565b6102e6610bd1565b6103146004803603602081101561047f57600080fd5b50356001600160a01b0316610c7d565b610338600480360360208110156104a557600080fd5b50356001600160a01b0316610d04565b6102e6600480360360408110156104cb57600080fd5b506001600160a01b038135169060200135610d1f565b610338600480360360208110156104f757600080fd5b50356001600160a01b0316610d29565b61050f610d50565b604080516001600160a01b039092168252519081900360200190f35b6102e66004803603602081101561054157600080fd5b50356001600160a01b0316610d74565b6102e6610df5565b610269610e63565b6102e66004803603604081101561057757600080fd5b506001600160a01b038135169060200135610ec4565b610314600480360360408110156105a357600080fd5b506001600160a01b038135169060200135610f10565b61050f610f5f565b610314600480360360408110156105d757600080fd5b506001600160a01b038135169060200135610f6e565b61050f610f7b565b61050f610f8a565b6102e6610f99565b6102e6600480360360e081101561061b57600080fd5b506001600160a01b03813581169160208101359091169060408101359060608101359060ff6080820135169060a08101359060c00135611126565b6103386004803603604081101561066c57600080fd5b506001600160a01b0381358116916020013516611353565b61050f61137e565b61031461138d565b60038054604080516020601f60026000196101006001881615020190951694909404938401819004810282018101909252828152606093909290918301828280156107205780601f106106f557610100808354040283529160200191610720565b820191906000526020600020905b81548152906001019060200180831161070357829003601f168201915b5050505050905090565b6008546001600160a01b03163314610789576040805162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572604482015290519081900360640190fd5b6008546040516000916001600160a01b0316907fea8258f2d9ddb679928cf34b78cf645b7feda9acc828e4dd82d014eaae270eba908390a3600880546001600160a01b0319169055565b60006107e033848461139d565b50600192915050565b600a54600160b01b900460ff1681565b60025490565b600061080c848484611489565b61085e843361085985604051806060016040528060288152602001611ae6602891396001600160a01b038a16600090815260016020908152604080832033845290915290205491906115e4565b61139d565b5060019392505050565b600a54600160a01b900460ff1681565b6008546001600160a01b031633146108d7576040805162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572604482015290519081900360640190fd5b600a80547fffffffffffffffffffffff00ffffffffffffffffffffffffffffffffffffffff16600160a01b179055565b7f6e71edae12b1b97f4d1f60370fef10105fa2faae0126114a169c64845d6126c981565b60055460ff1690565b60075481565b3360008181526001602090815260408083206001600160a01b038716845290915281205490916107e0918590610859908661167b565b600a546001600160a01b031633146109b95760405162461bcd60e51b8152600401808060200182810382526023815260200180611b0e6023913960400191505060405180910390fd5b6109c382826116dc565b5050565b6109d133826117cc565b50565b6008546001600160a01b03163314610a33576040805162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572604482015290519081900360640190fd5b6001600160a01b038116610a785760405162461bcd60e51b8152600401808060200182810382526026815260200180611a356026913960400191505060405180910390fd5b6008546040516001600160a01b038084169216907fea8258f2d9ddb679928cf34b78cf645b7feda9acc828e4dd82d014eaae270eba90600090a3600980546001600160a01b0319166001600160a01b0392909216919091179055565b6008546001600160a01b03163314610b33576040805162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572604482015290519081900360640190fd5b600a54600160b01b900460ff1615610b92576040805162461bcd60e51b815260206004820152600f60248201527f416c726561647920656e61626c65640000000000000000000000000000000000604482015290519081900360640190fd5b600a80547fffffffffffffffffff00ffffffffffffffffffffffffffffffffffffffffffff60ff60a81b19909116600160a81b1716600160b01b179055565b6009546001600160a01b03163314610c1a5760405162461bcd60e51b8152600401808060200182810382526022815260200180611aa36022913960400191505060405180910390fd5b6009546008546040516001600160a01b0392831692909116907faa151555690c956fc3ea32f106bb9f119b5237a061eaa8557cff3e51e3792c8d90600090a3600954600880546001600160a01b0319166001600160a01b03909216919091179055565b6008546000906001600160a01b03163314610cdf576040805162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572604482015290519081900360640190fd5b50600a80546001600160a01b0383166001600160a01b03199091161790556001919050565b6001600160a01b031660009081526020819052604090205490565b6109c38282610ec4565b6001600160a01b0381166000908152600660205260408120610d4a906118c8565b92915050565b7f000000000000000000000000000000000000000000000000000000000000000081565b6008546001600160a01b03163314610dd3576040805162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572604482015290519081900360640190fd5b600b80546001600160a01b0319166001600160a01b0392909216919091179055565b6008546001600160a01b03163314610e54576040805162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572604482015290519081900360640190fd5b600a805460ff60a81b19169055565b60048054604080516020601f60026000196101006001881615020190951694909404938401819004810282018101909252828152606093909290918301828280156107205780601f106106f557610100808354040283529160200191610720565b6000610ef482604051806060016040528060248152602001611b3160249139610eed8633611353565b91906115e4565b9050610f0183338361139d565b610f0b83836117cc565b505050565b60006107e0338461085985604051806060016040528060258152602001611bf1602591393360009081526001602090815260408083206001600160a01b038d16845290915290205491906115e4565b600b546001600160a01b031681565b60006107e0338484611489565b6008546001600160a01b031681565b6009546001600160a01b031681565b600a54600160a01b900460ff16610ff7576040805162461bcd60e51b815260206004820152601560248201527f436c61696d206e6f7420656e61626c6564207965740000000000000000000000604482015290519081900360640190fd5b60007f00000000000000000000000000000000000000000000000000000000000000006001600160a01b03166370a08231336040518263ffffffff1660e01b815260040180826001600160a01b0316815260200191505060206040518083038186803b15801561106657600080fd5b505afa15801561107a573d6000803e3d6000fd5b505050506040513d602081101561109057600080fd5b50516040805163079cc67960e41b81523360048201526024810183905290519192506001600160a01b037f000000000000000000000000000000000000000000000000000000000000000016916379cc67909160448082019260009290919082900301818387803b15801561110457600080fd5b505af1158015611118573d6000803e3d6000fd5b505050506109d133826116dc565b8342111561117b576040805162461bcd60e51b815260206004820152601860248201527f5065726d69743a206578706972656420646561646c696e650000000000000000604482015290519081900360640190fd5b6001600160a01b03871660009081526006602052604081207f6e71edae12b1b97f4d1f60370fef10105fa2faae0126114a169c64845d6126c9908990899089906111c4906118c8565b604080516020808201979097526001600160a01b0395861681830152939094166060840152608083019190915260a082015260c08082018990528251808303909101815260e08201835280519084012060075461190160f01b610100840152610102830152610122808301829052835180840390910181526101428301808552815191860191909120600091829052610162840180865281905260ff8a166101828501526101a284018990526101c28401889052935191955092936001926101e280820193601f1981019281900390910190855afa1580156112aa573d6000803e3d6000fd5b5050604051601f1901519150506001600160a01b038116158015906112e05750896001600160a01b0316816001600160a01b0316145b61131b5760405162461bcd60e51b8152600401808060200182810382526021815260200180611ac56021913960400191505060405180910390fd5b6001600160a01b038a16600090815260066020526040902061133c906118cc565b6113478a8a8a61139d565b50505050505050505050565b6001600160a01b03918216600090815260016020908152604080832093909416825291909152205490565b600a546001600160a01b031690565b600a54600160a81b900460ff1681565b6001600160a01b0383166113e25760405162461bcd60e51b8152600401808060200182810382526024815260200180611b9b6024913960400191505060405180910390fd5b6001600160a01b0382166114275760405162461bcd60e51b8152600401808060200182810382526022815260200180611a5b6022913960400191505060405180910390fd5b6001600160a01b03808416600081815260016020908152604080832094871680845294825291829020859055815185815291517f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b9259281900390910190a3505050565b6001600160a01b0383166114ce5760405162461bcd60e51b8152600401808060200182810382526025815260200180611b766025913960400191505060405180910390fd5b6001600160a01b0382166115135760405162461bcd60e51b81526004018080602001828103825260238152602001806119f06023913960400191505060405180910390fd5b61151e8383836118d5565b61155b81604051806060016040528060268152602001611a7d602691396001600160a01b03861660009081526020819052604090205491906115e4565b6001600160a01b03808516600090815260208190526040808220939093559084168152205461158a908261167b565b6001600160a01b038084166000818152602081815260409182902094909455805185815290519193928716927fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef92918290030190a3505050565b600081848411156116735760405162461bcd60e51b81526004018080602001828103825283818151815260200191508051906020019080838360005b83811015611638578181015183820152602001611620565b50505050905090810190601f1680156116655780820380516001836020036101000a031916815260200191505b509250505060405180910390fd5b505050900390565b6000828201838110156116d5576040805162461bcd60e51b815260206004820152601b60248201527f536166654d6174683a206164646974696f6e206f766572666c6f770000000000604482015290519081900360640190fd5b9392505050565b6001600160a01b038216611737576040805162461bcd60e51b815260206004820152601f60248201527f45524332303a206d696e7420746f20746865207a65726f206164647265737300604482015290519081900360640190fd5b6117423083836118d5565b60025461174f908261167b565b6002556001600160a01b038216600090815260208190526040902054611775908261167b565b6001600160a01b038316600081815260208181526040918290209390935580518481529051919230927fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef9281900390910190a35050565b6001600160a01b0382166118115760405162461bcd60e51b8152600401808060200182810382526021815260200180611b556021913960400191505060405180910390fd5b61181d826000836118d5565b61185a81604051806060016040528060228152602001611a13602291396001600160a01b03851660009081526020819052604090205491906115e4565b6001600160a01b03831660009081526020819052604090205560025461188090826119ad565b6002556040805182815290516000916001600160a01b038516917fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef9181900360200190a35050565b5490565b80546001019055565b600a54600160a81b900460ff1615610f0b57600b546001600160a01b0383811691161415611976576001600160a01b0383166000908152600c602052604090205442116119535760405162461bcd60e51b8152600401808060200182810382526032815260200180611bbf6032913960400191505060405180910390fd5b6001600160a01b0383166000908152600c60205260409020607842019055610f0b565b600b546001600160a01b0384811691161415610f0b57506001600160a01b03166000908152600c6020526040902042607801905550565b60006116d583836040518060400160405280601e81526020017f536166654d6174683a207375627472616374696f6e206f766572666c6f7700008152506115e456fe45524332303a207472616e7366657220746f20746865207a65726f206164647265737345524332303a206275726e20616d6f756e7420657863656564732062616c616e63654f776e61626c653a206e6577206f776e657220697320746865207a65726f206164647265737345524332303a20617070726f766520746f20746865207a65726f206164647265737345524332303a207472616e7366657220616d6f756e7420657863656564732062616c616e63654f776e61626c653a206d757374206265206e6577206f776e657220746f2070756c6c5a65726f537761705065726d69743a20496e76616c6964207369676e617475726545524332303a207472616e7366657220616d6f756e74206578636565647320616c6c6f77616e63655661756c744f776e65643a2063616c6c6572206973206e6f7420746865205661756c7445524332303a206275726e20616d6f756e74206578636565647320616c6c6f77616e636545524332303a206275726e2066726f6d20746865207a65726f206164647265737345524332303a207472616e736665722066726f6d20746865207a65726f206164647265737345524332303a20617070726f76652066726f6d20746865207a65726f2061646472657373416c726561647920696e7465726163746564207769746820646578207061697220647572696e67207468697320626c6f636b45524332303a2064656372656173656420616c6c6f77616e63652062656c6f77207a65726fa164736f6c6343000705000a5363686f6c617244414f3a2024505344414f2063616e6e6f7420626520302061646472657373";

export class ScholarDAOToken__factory extends ContractFactory {
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
    _psdao: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ScholarDAOToken> {
    return super.deploy(_psdao, overrides || {}) as Promise<ScholarDAOToken>;
  }
  getDeployTransaction(
    _psdao: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(_psdao, overrides || {});
  }
  attach(address: string): ScholarDAOToken {
    return super.attach(address) as ScholarDAOToken;
  }
  connect(signer: Signer): ScholarDAOToken__factory {
    return super.connect(signer) as ScholarDAOToken__factory;
  }
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): ScholarDAOTokenInterface {
    return new utils.Interface(_abi) as ScholarDAOTokenInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): ScholarDAOToken {
    return new Contract(address, _abi, signerOrProvider) as ScholarDAOToken;
  }
}
