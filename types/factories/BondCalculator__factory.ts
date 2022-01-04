/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type {
  BondCalculator,
  BondCalculatorInterface,
} from "../BondCalculator";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "pair_",
        type: "address",
      },
    ],
    name: "getKValue",
    outputs: [
      {
        internalType: "uint256",
        name: "k_",
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
        name: "pair_",
        type: "address",
      },
    ],
    name: "getTotalValue",
    outputs: [
      {
        internalType: "uint256",
        name: "value_",
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
        name: "pair_",
        type: "address",
      },
      {
        internalType: "address",
        name: "sdoge_",
        type: "address",
      },
    ],
    name: "markdown",
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
        name: "pair_",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount_",
        type: "uint256",
      },
    ],
    name: "valuation",
    outputs: [
      {
        internalType: "uint256",
        name: "value_",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

const _bytecode =
  "0x608060405234801561001057600080fd5b50610c3c806100206000396000f3fe608060405234801561001057600080fd5b506004361061004b5760003560e01c8062450a46146100505780634249719f14610090578063490084ef146100bc57806368637549146100e2575b600080fd5b61007e6004803603604081101561006657600080fd5b506001600160a01b0381358116916020013516610108565b60408051918252519081900360200190f35b61007e600480360360408110156100a657600080fd5b506001600160a01b0381351690602001356102b3565b61007e600480360360208110156100d257600080fd5b50356001600160a01b031661035b565b61007e600480360360208110156100f857600080fd5b50356001600160a01b0316610648565b6000806000846001600160a01b0316630902f1ac6040518163ffffffff1660e01b815260040160606040518083038186803b15801561014657600080fd5b505afa15801561015a573d6000803e3d6000fd5b505050506040513d606081101561017057600080fd5b50805160209182015160408051630dfe168160e01b815290516dffffffffffffffffffffffffffff93841696509290911693506000926001600160a01b0380891693908a1692630dfe1681926004808301939192829003018186803b1580156101d857600080fd5b505afa1580156101ec573d6000803e3d6000fd5b505050506040513d602081101561020257600080fd5b50516001600160a01b0316141561021a57508061021d565b50815b6102a761022987610648565b6102a1876001600160a01b031663313ce5676040518163ffffffff1660e01b815260040160206040518083038186803b15801561026557600080fd5b505afa158015610279573d6000803e3d6000fd5b505050506040513d602081101561028f57600080fd5b5051849060ff16600a0a600202610662565b906106c2565b93505050505b92915050565b6000806102bf84610648565b90506000846001600160a01b03166318160ddd6040518163ffffffff1660e01b815260040160206040518083038186803b1580156102fc57600080fd5b505afa158015610310573d6000803e3d6000fd5b505050506040513d602081101561032657600080fd5b50519050610352670de0b6b3a76400006102a161034b6103468886610704565b610886565b8590610662565b95945050505050565b600080826001600160a01b0316630dfe16816040518163ffffffff1660e01b815260040160206040518083038186803b15801561039757600080fd5b505afa1580156103ab573d6000803e3d6000fd5b505050506040513d60208110156103c157600080fd5b50516040805163313ce56760e01b815290516001600160a01b039092169163313ce56791600480820192602092909190829003018186803b15801561040557600080fd5b505afa158015610419573d6000803e3d6000fd5b505050506040513d602081101561042f57600080fd5b50516040805163d21220a760e01b8152905160ff90921692506000916001600160a01b0386169163d21220a7916004808301926020929190829003018186803b15801561047b57600080fd5b505afa15801561048f573d6000803e3d6000fd5b505050506040513d60208110156104a557600080fd5b50516040805163313ce56760e01b815290516001600160a01b039092169163313ce56791600480820192602092909190829003018186803b1580156104e957600080fd5b505afa1580156104fd573d6000803e3d6000fd5b505050506040513d602081101561051357600080fd5b50516040805163313ce56760e01b8152905160ff90921692506000916105a3916001600160a01b0388169163313ce56791600480820192602092909190829003018186803b15801561056457600080fd5b505afa158015610578573d6000803e3d6000fd5b505050506040513d602081101561058e57600080fd5b505160ff1661059d85856108a2565b906108fc565b9050600080866001600160a01b0316630902f1ac6040518163ffffffff1660e01b815260040160606040518083038186803b1580156105e157600080fd5b505afa1580156105f5573d6000803e3d6000fd5b505050506040513d606081101561060b57600080fd5b5080516020909101516dffffffffffffffffffffffffffff918216935016905061063d600a84900a6102a18484610662565b979650505050505050565b60006102ad600261066061065b8561035b565b61093e565b905b600082610671575060006102ad565b8282028284828161067e57fe5b04146106bb5760405162461bcd60e51b8152600401808060200182810382526021815260200180610c0f6021913960400191505060405180910390fd5b9392505050565b60006106bb83836040518060400160405280601a81526020017f536166654d6174683a206469766973696f6e206279207a65726f0000000000008152506109a8565b61070c610bd6565b6000821161074b5760405162461bcd60e51b8152600401808060200182810382526026815260200180610be96026913960400191505060405180910390fd5b8261076557506040805160208101909152600081526102ad565b71ffffffffffffffffffffffffffffffffffff831161080c57600082607085901b8161078d57fe5b0490506001600160e01b038111156107ec576040805162461bcd60e51b815260206004820152601e60248201527f4669786564506f696e743a3a6672616374696f6e3a206f766572666c6f770000604482015290519081900360640190fd5b6040518060200160405280826001600160e01b03168152509150506102ad565b6000610828846e01000000000000000000000000000085610a4a565b90506001600160e01b038111156107ec576040805162461bcd60e51b815260206004820152601e60248201527f4669786564506f696e743a3a6672616374696f6e3a206f766572666c6f770000604482015290519081900360640190fd5b80516612725dd1d243ab6001600160e01b03909116045b919050565b6000828201838110156106bb576040805162461bcd60e51b815260206004820152601b60248201527f536166654d6174683a206164646974696f6e206f766572666c6f770000000000604482015290519081900360640190fd5b60006106bb83836040518060400160405280601e81526020017f536166654d6174683a207375627472616374696f6e206f766572666c6f770000815250610adf565b6000600382111561099a575080600061096261095b8360026106c2565b60016108a2565b90505b818110156109945780915061098d61098661098085846106c2565b836108a2565b60026106c2565b9050610965565b5061089d565b811561089d57506001919050565b60008183610a345760405162461bcd60e51b81526004018080602001828103825283818151815260200191508051906020019080838360005b838110156109f95781810151838201526020016109e1565b50505050905090810190601f168015610a265780820380516001836020036101000a031916815260200191505b509250505060405180910390fd5b506000838581610a4057fe5b0495945050505050565b6000806000610a598686610b39565b9150915060008480610a6757fe5b868809905082811115610a7b576001820391505b8083039250848210610ad4576040805162461bcd60e51b815260206004820152601a60248201527f46756c6c4d6174683a3a6d756c4469763a206f766572666c6f77000000000000604482015290519081900360640190fd5b61063d838387610b66565b60008184841115610b315760405162461bcd60e51b81526020600482018181528351602484015283519092839260449091019190850190808383600083156109f95781810151838201526020016109e1565b505050900390565b6000808060001984860990508385029250828103915082811015610b5e576001820391505b509250929050565b60008181038216808381610b7657fe5b049250808581610b8257fe5b049450808160000381610b9157fe5b60028581038087028203028087028203028087028203028087028203028087028203028087028203029586029003909402930460010193909302939093010292915050565b6040805160208101909152600081529056fe4669786564506f696e743a3a6672616374696f6e3a206469766973696f6e206279207a65726f536166654d6174683a206d756c7469706c69636174696f6e206f766572666c6f77a164736f6c6343000705000a";

export class BondCalculator__factory extends ContractFactory {
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
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<BondCalculator> {
    return super.deploy(overrides || {}) as Promise<BondCalculator>;
  }
  getDeployTransaction(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  attach(address: string): BondCalculator {
    return super.attach(address) as BondCalculator;
  }
  connect(signer: Signer): BondCalculator__factory {
    return super.connect(signer) as BondCalculator__factory;
  }
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): BondCalculatorInterface {
    return new utils.Interface(_abi) as BondCalculatorInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): BondCalculator {
    return new Contract(address, _abi, signerOrProvider) as BondCalculator;
  }
}
