/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type {
  ScholarDogeCirculatingSupply,
  ScholarDogeCirculatingSupplyInterface,
} from "../ScholarDogeCirculatingSupply";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_owner",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [],
    name: "SDOGE",
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
    name: "SDOGECirculatingSupply",
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
    name: "getNonCirculatingSDOGE",
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
        name: "_sdoge",
        type: "address",
      },
    ],
    name: "initialize",
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
    name: "isInitialized",
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
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "nonCirculatingSDOGEAddresses",
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
    inputs: [
      {
        internalType: "address[]",
        name: "_nonCirculatingAddresses",
        type: "address[]",
      },
    ],
    name: "setNonCirculatingSDOGEAddresses",
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
        name: "_owner",
        type: "address",
      },
    ],
    name: "transferOwnership",
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
  "0x608060405234801561001057600080fd5b506040516107bf3803806107bf8339818101604052602081101561003357600080fd5b5051600180546001600160a01b0319166001600160a01b0390921691909117905561075c806100636000396000f3fe608060405234801561001057600080fd5b50600436106100a35760003560e01c80638da5cb5b11610076578063c4d66de81161005b578063c4d66de81461012f578063f2fde38b14610155578063ff4953e51461017b576100a3565b80638da5cb5b1461010a578063b58e004b14610112576100a3565b8063226d9634146100a8578063392e53cd146100cc57806339960a29146100e85780634467335f14610102575b600080fd5b6100b06101eb565b604080516001600160a01b039092168252519081900360200190f35b6100d46101ff565b604080519115158252519081900360200190f35b6100f0610208565b60408051918252519081900360200190f35b6100f06102a2565b6100b061038f565b6100b06004803603602081101561012857600080fd5b503561039e565b6100d46004803603602081101561014557600080fd5b50356001600160a01b03166103c8565b6100d46004803603602081101561016b57600080fd5b50356001600160a01b0316610486565b6100d46004803603602081101561019157600080fd5b8101906020810181356401000000008111156101ac57600080fd5b8201836020820111156101be57600080fd5b803590602001918460208302840111640100000000831117156101e057600080fd5b509092509050610518565b60005461010090046001600160a01b031681565b60005460ff1681565b600080600060019054906101000a90046001600160a01b03166001600160a01b03166318160ddd6040518163ffffffff1660e01b815260040160206040518083038186803b15801561025957600080fd5b505afa15801561026d573d6000803e3d6000fd5b505050506040513d602081101561028357600080fd5b50519050600061029b6102946102a2565b8390610590565b9250505090565b60008060005b60025481101561038957600054600280546103759261010090046001600160a01b0316916370a0823191859081106102dc57fe5b60009182526020918290200154604080517fffffffff0000000000000000000000000000000000000000000000000000000060e086901b1681526001600160a01b0390921660048301525160248083019392829003018186803b15801561034257600080fd5b505afa158015610356573d6000803e3d6000fd5b505050506040513d602081101561036c57600080fd5b505183906105d9565b91506103828160016105d9565b90506102a8565b50905090565b6001546001600160a01b031681565b600281815481106103ae57600080fd5b6000918252602090912001546001600160a01b0316905081565b6001546000906001600160a01b0316331461042a576040805162461bcd60e51b815260206004820152601360248201527f63616c6c6572206973206e6f74206f776e657200000000000000000000000000604482015290519081900360640190fd5b60005460ff161561043a57600080fd5b506000805460ff196001600160a01b038416610100027fffffffffffffffffffffff0000000000000000000000000000000000000000ff90921691909117166001908117909155919050565b6001546000906001600160a01b031633146104e8576040805162461bcd60e51b815260206004820152601360248201527f53656e646572206973206e6f74206f776e657200000000000000000000000000604482015290519081900360640190fd5b50600180546001600160a01b03831673ffffffffffffffffffffffffffffffffffffffff19909116178155919050565b6001546000906001600160a01b0316331461057a576040805162461bcd60e51b815260206004820152601360248201527f53656e646572206973206e6f74206f776e657200000000000000000000000000604482015290519081900360640190fd5b610586600284846106ca565b5060019392505050565b60006105d283836040518060400160405280601e81526020017f536166654d6174683a207375627472616374696f6e206f766572666c6f770000815250610633565b9392505050565b6000828201838110156105d2576040805162461bcd60e51b815260206004820152601b60248201527f536166654d6174683a206164646974696f6e206f766572666c6f770000000000604482015290519081900360640190fd5b600081848411156106c25760405162461bcd60e51b81526004018080602001828103825283818151815260200191508051906020019080838360005b8381101561068757818101518382015260200161066f565b50505050905090810190601f1680156106b45780820380516001836020036101000a031916815260200191505b509250505060405180910390fd5b505050900390565b82805482825590600052602060002090810192821561072a579160200282015b8281111561072a57815473ffffffffffffffffffffffffffffffffffffffff19166001600160a01b038435161782556020909201916001909101906106ea565b5061073692915061073a565b5090565b5b80821115610736576000815560010161073b56fea164736f6c6343000705000a";

export class ScholarDogeCirculatingSupply__factory extends ContractFactory {
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
    _owner: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ScholarDogeCirculatingSupply> {
    return super.deploy(
      _owner,
      overrides || {}
    ) as Promise<ScholarDogeCirculatingSupply>;
  }
  getDeployTransaction(
    _owner: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(_owner, overrides || {});
  }
  attach(address: string): ScholarDogeCirculatingSupply {
    return super.attach(address) as ScholarDogeCirculatingSupply;
  }
  connect(signer: Signer): ScholarDogeCirculatingSupply__factory {
    return super.connect(signer) as ScholarDogeCirculatingSupply__factory;
  }
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): ScholarDogeCirculatingSupplyInterface {
    return new utils.Interface(_abi) as ScholarDogeCirculatingSupplyInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): ScholarDogeCirculatingSupply {
    return new Contract(
      address,
      _abi,
      signerOrProvider
    ) as ScholarDogeCirculatingSupply;
  }
}
