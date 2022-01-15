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
import type { PrivateSale, PrivateSaleInterface } from "../PrivateSale";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "psdao_",
        type: "address",
      },
      {
        internalType: "address",
        name: "tokenIn_",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "psdaoRate_",
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
        name: "buyer",
        type: "address",
      },
    ],
    name: "BuyerApproval",
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
        indexed: false,
        internalType: "uint256",
        name: "oldRate",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "newRate",
        type: "uint256",
      },
    ],
    name: "RateSet",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newBuyer_",
        type: "address",
      },
    ],
    name: "approveBuyer",
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
        internalType: "address[]",
        name: "newBuyers_",
        type: "address[]",
      },
    ],
    name: "approveBuyers",
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
    name: "approvedBuyers",
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
    name: "burnRemainingPSDAOD",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "amountPaid_",
        type: "uint256",
      },
    ],
    name: "buyPSDAO",
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
        internalType: "uint256",
        name: "amountPaid_",
        type: "uint256",
      },
    ],
    name: "calcAmountRaised",
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
    name: "psdaoRate",
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
        internalType: "uint256",
        name: "newRate",
        type: "uint256",
      },
    ],
    name: "setRate",
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
    name: "tokenIn",
    outputs: [
      {
        internalType: "contract IERC20",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "withdrawTokenIn",
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
];

const _bytecode =
  "0x60c060405234801561001057600080fd5b506040516112b13803806112b18339818101604052606081101561003357600080fd5b5080516020820151604092830151600080546001600160a01b031916331780825594519394929391926001600160a01b0316917fea8258f2d9ddb679928cf34b78cf645b7feda9acc828e4dd82d014eaae270eba908290a36001600160601b0319606084811b821660a05283901b166080526002556001600160a01b0390811691166111bc6100f5600039806107a652806109eb5280610aae5280610bec5250806103e85280610489528061094e5280610a8a5280610bb752506111bc6000f3fe608060405234801561001057600080fd5b50600436106100f55760003560e01c806346f68ee9116100975780636daf390b116100665780636daf390b14610264578063811ba4b51461026c578063a5f523d414610274578063c747fd091461029a576100f5565b806346f68ee9146102115780635a82d784146102375780635a96ac0a1461023f5780635f33905d14610247576100f5565b806327587e0b116100d357806327587e0b1461014257806334fcf4371461015e57806340edcbdd1461017b57806341c91cb5146101a1576100f5565b80630505c8c9146100fa578063089208d81461011e57806313a6651514610128575b600080fd5b6101026102b7565b604080516001600160a01b039092168252519081900360200190f35b6101266102c6565b005b61013061037c565b60408051918252519081900360200190f35b61014a610382565b604080519115158252519081900360200190f35b6101306004803603602081101561017457600080fd5b50356104b6565b61014a6004803603602081101561019157600080fd5b50356001600160a01b0316610563565b610130600480360360208110156101b757600080fd5b8101906020810181356401000000008111156101d257600080fd5b8201836020820111156101e457600080fd5b8035906020019184602083028401116401000000008311171561020657600080fd5b509092509050610578565b6101266004803603602081101561022757600080fd5b50356001600160a01b031661061b565b610126610727565b610126610890565b6101306004803603602081101561025d57600080fd5b5035610947565b610102610a88565b610102610aac565b61014a6004803603602081101561028a57600080fd5b50356001600160a01b0316610ad0565b61014a600480360360208110156102b057600080fd5b5035610b39565b6000546001600160a01b031690565b6000546001600160a01b03163314610325576040805162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572604482015290519081900360640190fd5b600080546040516001600160a01b03909116907fea8258f2d9ddb679928cf34b78cf645b7feda9acc828e4dd82d014eaae270eba908390a36000805473ffffffffffffffffffffffffffffffffffffffff19169055565b60025481565b600080546001600160a01b031633146103e2576040805162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572604482015290519081900360640190fd5b6104b0337f00000000000000000000000000000000000000000000000000000000000000006001600160a01b03166370a08231306040518263ffffffff1660e01b815260040180826001600160a01b0316815260200191505060206040518083038186803b15801561045357600080fd5b505afa158015610467573d6000803e3d6000fd5b505050506040513d602081101561047d57600080fd5b50516001600160a01b037f0000000000000000000000000000000000000000000000000000000000000000169190610c1c565b50600190565b600080546001600160a01b03163314610516576040805162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572604482015290519081900360640190fd5b6002805490839055604080518281526020810185905281517fd6e6e4f7360b5c5b6dbd49bceebedc829fedcaaf472e23f6a7b15c25366c16d5929181900390910190a15050600254919050565b60036020526000908152604090205460ff1681565b600080546001600160a01b031633146105d8576040805162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572604482015290519081900360640190fd5b60005b80831115610610576106078484838181106105f257fe5b905060200201356001600160a01b0316610d9b565b506001016105db565b508190505b92915050565b6000546001600160a01b0316331461067a576040805162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572604482015290519081900360640190fd5b6001600160a01b0381166106bf5760405162461bcd60e51b81526004018080602001828103825260268152602001806111476026913960400191505060405180910390fd5b600080546040516001600160a01b03808516939216917fea8258f2d9ddb679928cf34b78cf645b7feda9acc828e4dd82d014eaae270eba91a36001805473ffffffffffffffffffffffffffffffffffffffff19166001600160a01b0392909216919091179055565b6000546001600160a01b03163314610786576040805162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572604482015290519081900360640190fd5b604080516370a0823160e01b815230600482015290516001600160a01b037f000000000000000000000000000000000000000000000000000000000000000016916342966c689183916370a08231916024808301926020929190829003018186803b1580156107f457600080fd5b505afa158015610808573d6000803e3d6000fd5b505050506040513d602081101561081e57600080fd5b5051604080517fffffffff0000000000000000000000000000000000000000000000000000000060e085901b168152600481019290925251602480830192600092919082900301818387803b15801561087657600080fd5b505af115801561088a573d6000803e3d6000fd5b50505050565b6001546001600160a01b031633146108d95760405162461bcd60e51b815260040180806020018281038252602281526020018061116d6022913960400191505060405180910390fd5b600154600080546040516001600160a01b0393841693909116917faa151555690c956fc3ea32f106bb9f119b5237a061eaa8557cff3e51e3792c8d91a36001546000805473ffffffffffffffffffffffffffffffffffffffff19166001600160a01b03909216919091179055565b60006106157f00000000000000000000000000000000000000000000000000000000000000006001600160a01b031663313ce5676040518163ffffffff1660e01b815260040160206040518083038186803b1580156109a557600080fd5b505afa1580156109b9573d6000803e3d6000fd5b505050506040513d60208110156109cf57600080fd5b50516040805163313ce56760e01b815290516001600160a01b037f0000000000000000000000000000000000000000000000000000000000000000169163313ce567916004808301926020929190829003018186803b158015610a3157600080fd5b505afa158015610a45573d6000803e3d6000fd5b505050506040513d6020811015610a5b57600080fd5b505160025491900360ff16600a0a90610a8290606490610a7c908790610e63565b90610ec3565b90610e63565b7f000000000000000000000000000000000000000000000000000000000000000081565b7f000000000000000000000000000000000000000000000000000000000000000081565b600080546001600160a01b03163314610b30576040805162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572604482015290519081900360640190fd5b61061582610d9b565b3360009081526003602052604081205460ff16610b9d576040805162461bcd60e51b815260206004820152601360248201527f4275796572206e6f7420617070726f7665642e00000000000000000000000000604482015290519081900360640190fd5b6000610ba883610947565b9050610bdf6001600160a01b037f000000000000000000000000000000000000000000000000000000000000000016333086610f05565b610c136001600160a01b037f0000000000000000000000000000000000000000000000000000000000000000163383610c1c565b50600192915050565b604080516001600160a01b038481166024830152604480830185905283518084039091018152606490920183526020820180517bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1663a9059cbb60e01b178152925182516000946060949389169392918291908083835b60208310610cae5780518252601f199092019160209182019101610c8f565b6001836020036101000a0380198251168184511680821785525050505050509050019150506000604051808303816000865af19150503d8060008114610d10576040519150601f19603f3d011682016040523d82523d6000602084013e610d15565b606091505b5091509150818015610d43575080511580610d435750808060200190516020811015610d4057600080fd5b50515b610d94576040805162461bcd60e51b815260206004820152600f60248201527f5452414e534645525f4641494c45440000000000000000000000000000000000604482015290519081900360640190fd5b5050505050565b600080546001600160a01b03163314610dfb576040805162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572604482015290519081900360640190fd5b6001600160a01b038216600081815260036020526040808220805460ff19166001179055517fd13774fc4beee30230b19d8890a94dcd919ed19e8fa2ed6374f815ecff12a47b9190a2506001600160a01b031660009081526003602052604090205460ff1690565b600082610e7257506000610615565b82820282848281610e7f57fe5b0414610ebc5760405162461bcd60e51b815260040180806020018281038252602181526020018061118f6021913960400191505060405180910390fd5b9392505050565b6000610ebc83836040518060400160405280601a81526020017f536166654d6174683a206469766973696f6e206279207a65726f00000000000081525061108d565b604080516001600160a01b0385811660248301528481166044830152606480830185905283518084039091018152608490920183526020820180517bffffffffffffffffffffffffffffffffffffffffffffffffffffffff166323b872dd60e01b17815292518251600094606094938a169392918291908083835b60208310610f9f5780518252601f199092019160209182019101610f80565b6001836020036101000a0380198251168184511680821785525050505050509050019150506000604051808303816000865af19150503d8060008114611001576040519150601f19603f3d011682016040523d82523d6000602084013e611006565b606091505b5091509150818015611034575080511580611034575080806020019051602081101561103157600080fd5b50515b611085576040805162461bcd60e51b815260206004820152601460248201527f5452414e534645525f46524f4d5f4641494c4544000000000000000000000000604482015290519081900360640190fd5b505050505050565b600081836111195760405162461bcd60e51b81526004018080602001828103825283818151815260200191508051906020019080838360005b838110156110de5781810151838201526020016110c6565b50505050905090810190601f16801561110b5780820380516001836020036101000a031916815260200191505b509250505060405180910390fd5b50600083858161112557fe5b04905083858161113157fe5b0681850201851461113e57fe5b94935050505056fe4f776e61626c653a206e6577206f776e657220697320746865207a65726f20616464726573734f776e61626c653a206d757374206265206e6577206f776e657220746f2070756c6c536166654d6174683a206d756c7469706c69636174696f6e206f766572666c6f77a164736f6c6343000705000a";

export class PrivateSale__factory extends ContractFactory {
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
    psdao_: string,
    tokenIn_: string,
    psdaoRate_: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<PrivateSale> {
    return super.deploy(
      psdao_,
      tokenIn_,
      psdaoRate_,
      overrides || {}
    ) as Promise<PrivateSale>;
  }
  getDeployTransaction(
    psdao_: string,
    tokenIn_: string,
    psdaoRate_: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(
      psdao_,
      tokenIn_,
      psdaoRate_,
      overrides || {}
    );
  }
  attach(address: string): PrivateSale {
    return super.attach(address) as PrivateSale;
  }
  connect(signer: Signer): PrivateSale__factory {
    return super.connect(signer) as PrivateSale__factory;
  }
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): PrivateSaleInterface {
    return new utils.Interface(_abi) as PrivateSaleInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): PrivateSale {
    return new Contract(address, _abi, signerOrProvider) as PrivateSale;
  }
}
