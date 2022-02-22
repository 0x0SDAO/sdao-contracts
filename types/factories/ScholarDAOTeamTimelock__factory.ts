/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type {
  ScholarDAOTeamTimelock,
  ScholarDAOTeamTimelockInterface,
} from "../ScholarDAOTeamTimelock";

const _abi = [
  {
    inputs: [
      {
        internalType: "contract IERC20",
        name: "_token",
        type: "address",
      },
      {
        internalType: "address",
        name: "_beneficiary",
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
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "TeamTokensWithdrawn",
    type: "event",
  },
  {
    inputs: [],
    name: "RELEASE_INTERVAL",
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
    name: "RELEASE_PERCENTAGE",
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
    name: "baseTokenAmount",
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
    name: "beneficiary",
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
    name: "getReleaseAmount",
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
    name: "nextWithdraw",
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
    name: "release",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "releaseAmount",
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
    name: "token",
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
];

const _bytecode =
  "0x60806040524260015534801561001457600080fd5b506040516105763803806105768339818101604052604081101561003757600080fd5b508051602090910151600380546001600160a01b039384166001600160a01b031991821617909155600480549390921692169190911790556104f88061007e6000396000f3fe608060405234801561001057600080fd5b50600436106100a35760003560e01c8063c062dc5f11610076578063db7148f01161005b578063db7148f014610108578063fc0c546a14610110578063fc9d8e0714610118576100a3565b8063c062dc5f146100f8578063cde5f58f14610100576100a3565b806338af3eed146100a85780635f8a7eab146100cc57806386d1a69f146100e6578063a8d7c20b146100f0575b600080fd5b6100b0610120565b604080516001600160a01b039092168252519081900360200190f35b6100d461012f565b60408051918252519081900360200190f35b6100ee6101da565b005b6100d461033f565b6100d4610345565b6100d461034b565b6100d4610352565b6100b0610358565b6100d4610367565b6004546001600160a01b031681565b60008060646004600254028161014157fe5b600354604080516370a0823160e01b815230600482015290519390920493506000926001600160a01b03909116916370a08231916024808301926020929190829003018186803b15801561019457600080fd5b505afa1580156101a8573d6000803e3d6000fd5b505050506040513d60208110156101be57600080fd5b50519050808211156101d35791506101d79050565b5090505b90565b600154421015610231576040805162461bcd60e51b815260206004820181905260248201527f43616e6e6f7420636c61696d206265666f72652072656c656173652074696d65604482015290519081900360640190fd5b600180546213c6800190556002546102be57600354604080516370a0823160e01b815230600482015290516001600160a01b03909216916370a0823191602480820192602092909190829003018186803b15801561028e57600080fd5b505afa1580156102a2573d6000803e3d6000fd5b505050506040513d60208110156102b857600080fd5b50516002555b60006102c861012f565b90506000811161031f576040805162461bcd60e51b815260206004820152601460248201527f4e6f20746f6b656e7320746f2072656c65617365000000000000000000000000604482015290519081900360640190fd5b60045460035461033c916001600160a01b0391821691168361036c565b50565b60025481565b60005481565b6213c68081565b60015481565b6003546001600160a01b031681565b600481565b604080516001600160a01b038481166024830152604480830185905283518084039091018152606490920183526020820180517bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1663a9059cbb60e01b178152925182516000946060949389169392918291908083835b602083106103fe5780518252601f1990920191602091820191016103df565b6001836020036101000a0380198251168184511680821785525050505050509050019150506000604051808303816000865af19150503d8060008114610460576040519150601f19603f3d011682016040523d82523d6000602084013e610465565b606091505b5091509150818015610493575080511580610493575080806020019051602081101561049057600080fd5b50515b6104e4576040805162461bcd60e51b815260206004820152600f60248201527f5452414e534645525f4641494c45440000000000000000000000000000000000604482015290519081900360640190fd5b505050505056fea164736f6c6343000705000a";

export class ScholarDAOTeamTimelock__factory extends ContractFactory {
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
    _token: string,
    _beneficiary: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ScholarDAOTeamTimelock> {
    return super.deploy(
      _token,
      _beneficiary,
      overrides || {}
    ) as Promise<ScholarDAOTeamTimelock>;
  }
  getDeployTransaction(
    _token: string,
    _beneficiary: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(_token, _beneficiary, overrides || {});
  }
  attach(address: string): ScholarDAOTeamTimelock {
    return super.attach(address) as ScholarDAOTeamTimelock;
  }
  connect(signer: Signer): ScholarDAOTeamTimelock__factory {
    return super.connect(signer) as ScholarDAOTeamTimelock__factory;
  }
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): ScholarDAOTeamTimelockInterface {
    return new utils.Interface(_abi) as ScholarDAOTeamTimelockInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): ScholarDAOTeamTimelock {
    return new Contract(
      address,
      _abi,
      signerOrProvider
    ) as ScholarDAOTeamTimelock;
  }
}
