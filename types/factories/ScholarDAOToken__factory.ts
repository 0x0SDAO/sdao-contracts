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
    name: "policy",
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
  "0x60a06040523480156200001157600080fd5b5060405162001a1e38038062001a1e833981810160405260208110156200003757600080fd5b5051604080518082018252601081526f29b1b437b630b92220a7903a37b5b2b760811b6020828101918252835180850190945260048452635344414f60e01b90840152815191929160099162000091916003919062000262565b508151620000a790600490602085019062000262565b506005805460ff191660ff92909216919091179055504690507f8b73c3c69bb8fe3d512ecc4cf759cc79239f7b179b0ffacaa9a75d522b39400f620000eb620001c8565b805160209182012060408051808201825260018152603160f81b90840152805180840194909452838101919091527fc89efdaa54c0f20c7adf612882df0950f5a951637e0307cdcb4c672f298b8bc6606084015260808301939093523060a0808401919091528351808403909101815260c0909201928390528151910120600755600880546001600160a01b0319163317908190556001600160a01b0316906000907fea8258f2d9ddb679928cf34b78cf645b7feda9acc828e4dd82d014eaae270eba908290a360601b6001600160601b0319166080526200030e565b60038054604080516020601f6002600019610100600188161502019095169490940493840181900481028201810190925282815260609390929091830182828015620002585780601f106200022c5761010080835404028352916020019162000258565b820191906000526020600020905b8154815290600101906020018083116200023a57829003601f168201915b5050505050905090565b828054600181600116156101000203166002900490600052602060002090601f0160209004810192826200029a5760008555620002e5565b82601f10620002b557805160ff1916838001178555620002e5565b82800160010185558215620002e5579182015b82811115620002e5578251825591602001919060010190620002c8565b50620002f3929150620002f7565b5090565b5b80821115620002f35760008155600101620002f8565b60805160601c6116e86200033660003980610aac5280610bdb5280610c9c52506116e86000f3fe608060405234801561001057600080fd5b50600436106101b95760003560e01c80635a96ac0a116100f9578063a22b35ce11610097578063c5c3597611610071578063c5c35976146104fc578063d505accf14610504578063dd62ed3e14610555578063fbfa77cf14610583576101b9565b8063a22b35ce14610478578063a457c2d7146104a4578063a9059cbb146104d0576101b9565b806379cc6790116100d357806379cc6790146104165780637ecebe0014610442578063811ba4b51461046857806395d89b4114610470576101b9565b80635a96ac0a146103c25780636817031b146103ca57806370a08231146103f0576101b9565b806330adf81f116101665780633950935111610140578063395093511461032757806340c10f191461035357806342966c681461037f57806346f68ee91461039c576101b9565b806330adf81f146102f9578063313ce567146103015780633644e5151461031f576101b9565b8063095ea7b311610197578063095ea7b31461026957806318160ddd146102a957806323b872dd146102c3576101b9565b80630505c8c9146101be57806306fdde03146101e2578063089208d81461025f575b600080fd5b6101c661058b565b604080516001600160a01b039092168252519081900360200190f35b6101ea61059a565b6040805160208082528351818301528351919283929083019185019080838360005b8381101561022457818101518382015260200161020c565b50505050905090810190601f1680156102515780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b610267610630565b005b6102956004803603604081101561027f57600080fd5b506001600160a01b0381351690602001356106d9565b604080519115158252519081900360200190f35b6102b16106ef565b60408051918252519081900360200190f35b610295600480360360608110156102d957600080fd5b506001600160a01b038135811691602081013590911690604001356106f5565b6102b161075e565b610309610782565b6040805160ff9092168252519081900360200190f35b6102b161078b565b6102956004803603604081101561033d57600080fd5b506001600160a01b038135169060200135610791565b6102676004803603604081101561036957600080fd5b506001600160a01b0381351690602001356107c7565b6102676004803603602081101561039557600080fd5b503561081e565b610267600480360360208110156103b257600080fd5b50356001600160a01b031661082b565b61026761092b565b610295600480360360208110156103e057600080fd5b50356001600160a01b03166109d7565b6102b16004803603602081101561040657600080fd5b50356001600160a01b0316610a5e565b6102676004803603604081101561042c57600080fd5b506001600160a01b038135169060200135610a79565b6102b16004803603602081101561045857600080fd5b50356001600160a01b0316610a83565b6101c6610aaa565b6101ea610ace565b6102676004803603604081101561048e57600080fd5b506001600160a01b038135169060200135610b2f565b610295600480360360408110156104ba57600080fd5b506001600160a01b038135169060200135610b7b565b610295600480360360408110156104e657600080fd5b506001600160a01b038135169060200135610bca565b610267610bd7565b610267600480360360e081101561051a57600080fd5b506001600160a01b03813581169160208101359091169060408101359060608101359060ff6080820135169060a08101359060c00135610d06565b6102b16004803603604081101561056b57600080fd5b506001600160a01b0381358116916020013516610f33565b6101c6610f5e565b6008546001600160a01b031690565b60038054604080516020601f60026000196101006001881615020190951694909404938401819004810282018101909252828152606093909290918301828280156106265780601f106105fb57610100808354040283529160200191610626565b820191906000526020600020905b81548152906001019060200180831161060957829003601f168201915b5050505050905090565b6008546001600160a01b0316331461068f576040805162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572604482015290519081900360640190fd5b6008546040516000916001600160a01b0316907fea8258f2d9ddb679928cf34b78cf645b7feda9acc828e4dd82d014eaae270eba908390a3600880546001600160a01b0319169055565b60006106e6338484610f6d565b50600192915050565b60025490565b6000610702848484611059565b610754843361074f856040518060600160405280602881526020016115de602891396001600160a01b038a16600090815260016020908152604080832033845290915290205491906111b4565b610f6d565b5060019392505050565b7f6e71edae12b1b97f4d1f60370fef10105fa2faae0126114a169c64845d6126c981565b60055460ff1690565b60075481565b3360008181526001602090815260408083206001600160a01b038716845290915281205490916106e691859061074f908661124b565b600a546001600160a01b031633146108105760405162461bcd60e51b81526004018080602001828103825260238152602001806116066023913960400191505060405180910390fd5b61081a82826112ac565b5050565b610828338261139c565b50565b6008546001600160a01b0316331461088a576040805162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572604482015290519081900360640190fd5b6001600160a01b0381166108cf5760405162461bcd60e51b815260040180806020018281038252602681526020018061152d6026913960400191505060405180910390fd5b6008546040516001600160a01b038084169216907fea8258f2d9ddb679928cf34b78cf645b7feda9acc828e4dd82d014eaae270eba90600090a3600980546001600160a01b0319166001600160a01b0392909216919091179055565b6009546001600160a01b031633146109745760405162461bcd60e51b815260040180806020018281038252602281526020018061159b6022913960400191505060405180910390fd5b6009546008546040516001600160a01b0392831692909116907faa151555690c956fc3ea32f106bb9f119b5237a061eaa8557cff3e51e3792c8d90600090a3600954600880546001600160a01b0319166001600160a01b03909216919091179055565b6008546000906001600160a01b03163314610a39576040805162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572604482015290519081900360640190fd5b50600a80546001600160a01b0383166001600160a01b03199091161790556001919050565b6001600160a01b031660009081526020819052604090205490565b61081a8282610b2f565b6001600160a01b0381166000908152600660205260408120610aa490611498565b92915050565b7f000000000000000000000000000000000000000000000000000000000000000081565b60048054604080516020601f60026000196101006001881615020190951694909404938401819004810282018101909252828152606093909290918301828280156106265780601f106105fb57610100808354040283529160200191610626565b6000610b5f8260405180606001604052806024815260200161162960249139610b588633610f33565b91906111b4565b9050610b6c833383610f6d565b610b76838361139c565b505050565b60006106e6338461074f856040518060600160405280602581526020016116b7602591393360009081526001602090815260408083206001600160a01b038d16845290915290205491906111b4565b60006106e6338484611059565b60007f00000000000000000000000000000000000000000000000000000000000000006001600160a01b03166370a08231336040518263ffffffff1660e01b815260040180826001600160a01b0316815260200191505060206040518083038186803b158015610c4657600080fd5b505afa158015610c5a573d6000803e3d6000fd5b505050506040513d6020811015610c7057600080fd5b50516040805163079cc67960e41b81523360048201526024810183905290519192506001600160a01b037f000000000000000000000000000000000000000000000000000000000000000016916379cc67909160448082019260009290919082900301818387803b158015610ce457600080fd5b505af1158015610cf8573d6000803e3d6000fd5b5050505061082833826112ac565b83421115610d5b576040805162461bcd60e51b815260206004820152601860248201527f5065726d69743a206578706972656420646561646c696e650000000000000000604482015290519081900360640190fd5b6001600160a01b03871660009081526006602052604081207f6e71edae12b1b97f4d1f60370fef10105fa2faae0126114a169c64845d6126c990899089908990610da490611498565b604080516020808201979097526001600160a01b0395861681830152939094166060840152608083019190915260a082015260c08082018990528251808303909101815260e08201835280519084012060075461190160f01b610100840152610102830152610122808301829052835180840390910181526101428301808552815191860191909120600091829052610162840180865281905260ff8a166101828501526101a284018990526101c28401889052935191955092936001926101e280820193601f1981019281900390910190855afa158015610e8a573d6000803e3d6000fd5b5050604051601f1901519150506001600160a01b03811615801590610ec05750896001600160a01b0316816001600160a01b0316145b610efb5760405162461bcd60e51b81526004018080602001828103825260218152602001806115bd6021913960400191505060405180910390fd5b6001600160a01b038a166000908152600660205260409020610f1c9061149c565b610f278a8a8a610f6d565b50505050505050505050565b6001600160a01b03918216600090815260016020908152604080832093909416825291909152205490565b600a546001600160a01b031690565b6001600160a01b038316610fb25760405162461bcd60e51b81526004018080602001828103825260248152602001806116936024913960400191505060405180910390fd5b6001600160a01b038216610ff75760405162461bcd60e51b81526004018080602001828103825260228152602001806115536022913960400191505060405180910390fd5b6001600160a01b03808416600081815260016020908152604080832094871680845294825291829020859055815185815291517f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b9259281900390910190a3505050565b6001600160a01b03831661109e5760405162461bcd60e51b815260040180806020018281038252602581526020018061166e6025913960400191505060405180910390fd5b6001600160a01b0382166110e35760405162461bcd60e51b81526004018080602001828103825260238152602001806114e86023913960400191505060405180910390fd5b6110ee838383610b76565b61112b81604051806060016040528060268152602001611575602691396001600160a01b03861660009081526020819052604090205491906111b4565b6001600160a01b03808516600090815260208190526040808220939093559084168152205461115a908261124b565b6001600160a01b038084166000818152602081815260409182902094909455805185815290519193928716927fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef92918290030190a3505050565b600081848411156112435760405162461bcd60e51b81526004018080602001828103825283818151815260200191508051906020019080838360005b838110156112085781810151838201526020016111f0565b50505050905090810190601f1680156112355780820380516001836020036101000a031916815260200191505b509250505060405180910390fd5b505050900390565b6000828201838110156112a5576040805162461bcd60e51b815260206004820152601b60248201527f536166654d6174683a206164646974696f6e206f766572666c6f770000000000604482015290519081900360640190fd5b9392505050565b6001600160a01b038216611307576040805162461bcd60e51b815260206004820152601f60248201527f45524332303a206d696e7420746f20746865207a65726f206164647265737300604482015290519081900360640190fd5b611312308383610b76565b60025461131f908261124b565b6002556001600160a01b038216600090815260208190526040902054611345908261124b565b6001600160a01b038316600081815260208181526040918290209390935580518481529051919230927fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef9281900390910190a35050565b6001600160a01b0382166113e15760405162461bcd60e51b815260040180806020018281038252602181526020018061164d6021913960400191505060405180910390fd5b6113ed82600083610b76565b61142a8160405180606001604052806022815260200161150b602291396001600160a01b03851660009081526020819052604090205491906111b4565b6001600160a01b03831660009081526020819052604090205560025461145090826114a5565b6002556040805182815290516000916001600160a01b038516917fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef9181900360200190a35050565b5490565b80546001019055565b60006112a583836040518060400160405280601e81526020017f536166654d6174683a207375627472616374696f6e206f766572666c6f7700008152506111b456fe45524332303a207472616e7366657220746f20746865207a65726f206164647265737345524332303a206275726e20616d6f756e7420657863656564732062616c616e63654f776e61626c653a206e6577206f776e657220697320746865207a65726f206164647265737345524332303a20617070726f766520746f20746865207a65726f206164647265737345524332303a207472616e7366657220616d6f756e7420657863656564732062616c616e63654f776e61626c653a206d757374206265206e6577206f776e657220746f2070756c6c5a65726f537761705065726d69743a20496e76616c6964207369676e617475726545524332303a207472616e7366657220616d6f756e74206578636565647320616c6c6f77616e63655661756c744f776e65643a2063616c6c6572206973206e6f7420746865205661756c7445524332303a206275726e20616d6f756e74206578636565647320616c6c6f77616e636545524332303a206275726e2066726f6d20746865207a65726f206164647265737345524332303a207472616e736665722066726f6d20746865207a65726f206164647265737345524332303a20617070726f76652066726f6d20746865207a65726f206164647265737345524332303a2064656372656173656420616c6c6f77616e63652062656c6f77207a65726fa164736f6c6343000705000a";

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
