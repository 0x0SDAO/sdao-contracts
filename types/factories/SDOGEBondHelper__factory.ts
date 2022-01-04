/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type {
  SDOGEBondHelper,
  SDOGEBondHelperInterface,
} from "../SDOGEBondHelper";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "bond_",
        type: "address",
      },
      {
        internalType: "address",
        name: "router_",
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
    inputs: [],
    name: "bond",
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
        name: "recipient_",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount0_",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "amount1_",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "amount0Min_",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "amount1Min_",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "deadline_",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "maxPrice_",
        type: "uint256",
      },
      {
        internalType: "bytes32",
        name: "referralCode_",
        type: "bytes32",
      },
    ],
    name: "deposit",
    outputs: [],
    stateMutability: "nonpayable",
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
        internalType: "address",
        name: "token_",
        type: "address",
      },
    ],
    name: "recoverLostToken",
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
    inputs: [],
    name: "router",
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
  "0x60c060405234801561001057600080fd5b506040516113973803806113978339818101604052604081101561003357600080fd5b508051602090910151600080546001600160a01b03191633178082556040516001600160a01b039190911691907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0908290a36001600160a01b0382166100e0576040805162461bcd60e51b815260206004820152601560248201527f526f757465722063616e6e6f74206265207a65726f0000000000000000000000604482015290519081900360640190fd5b6001600160601b0319606083901b166080526001600160a01b03811661014d576040805162461bcd60e51b815260206004820152601560248201527f526f757465722063616e6e6f74206265207a65726f0000000000000000000000604482015290519081900360640190fd5b606081811b6001600160601b03191660a052608051901c91506001600160a01b03166111ed6101aa60003980610632528061066652806106e05280610c1f52508061015f528061034652806107bc52806107e352506111ed6000f3fe608060405234801561001057600080fd5b506004361061007d5760003560e01c80638da5cb5b1161005b5780638da5cb5b14610101578063b4abccba14610109578063f2fde38b1461012f578063f887ea40146101555761007d565b806364c9ec6f14610082578063715018a6146100a65780638b9c0224146100b0575b600080fd5b61008a61015d565b604080516001600160a01b039092168252519081900360200190f35b6100ae610181565b005b6100ae60048036036101008110156100c757600080fd5b506001600160a01b038135169060208101359060408101359060608101359060808101359060a08101359060c08101359060e00135610237565b61008a610a12565b6100ae6004803603602081101561011f57600080fd5b50356001600160a01b0316610a21565b6100ae6004803603602081101561014557600080fd5b50356001600160a01b0316610b11565b61008a610c1d565b7f000000000000000000000000000000000000000000000000000000000000000081565b6000546001600160a01b031633146101e0576040805162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572604482015290519081900360640190fd5b600080546040516001600160a01b03909116907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0908390a36000805473ffffffffffffffffffffffffffffffffffffffff19169055565b6001600160a01b038816610292576040805162461bcd60e51b815260206004820152601860248201527f526563697069656e742063616e6e6f74206265207a65726f0000000000000000604482015290519081900360640190fd5b600087116102e7576040805162461bcd60e51b815260206004820152601f60248201527f416d6f756e742073686f756c642062652067726561746572207468616e203000604482015290519081900360640190fd5b6000861161033c576040805162461bcd60e51b815260206004820152601f60248201527f416d6f756e742073686f756c642062652067726561746572207468616e203000604482015290519081900360640190fd5b610344611158565b7f00000000000000000000000000000000000000000000000000000000000000006001600160a01b0316636daf390b6040518163ffffffff1660e01b815260040160206040518083038186803b15801561039d57600080fd5b505afa1580156103b1573d6000803e3d6000fd5b505050506040513d60208110156103c757600080fd5b50516001600160a01b0316808252610426576040805162461bcd60e51b815260206004820152601860248201527f426f6e64207072696e6369706c6520756e646566696e65640000000000000000604482015290519081900360640190fd5b600081600001516001600160a01b0316630dfe16816040518163ffffffff1660e01b815260040160206040518083038186803b15801561046557600080fd5b505afa158015610479573d6000803e3d6000fd5b505050506040513d602081101561048f57600080fd5b505182516040805163d21220a760e01b815290519293506000926001600160a01b039092169163d21220a791600480820192602092909190829003018186803b1580156104db57600080fd5b505afa1580156104ef573d6000803e3d6000fd5b505050506040513d602081101561050557600080fd5b5051604080516370a0823160e01b815230600482015290519192506001600160a01b038416916370a0823191602480820192602092909190829003018186803b15801561055157600080fd5b505afa158015610565573d6000803e3d6000fd5b505050506040513d602081101561057b57600080fd5b5051602084810191909152604080516370a0823160e01b815230600482015290516001600160a01b038416926370a082319260248082019391829003018186803b1580156105c857600080fd5b505afa1580156105dc573d6000803e3d6000fd5b505050506040513d60208110156105f257600080fd5b5051606084015261060e6001600160a01b03831633308d610c41565b6106236001600160a01b03821633308c610c41565b6106576001600160a01b0383167f00000000000000000000000000000000000000000000000000000000000000008c610ca1565b61068b6001600160a01b0382167f00000000000000000000000000000000000000000000000000000000000000008b610ca1565b6040805162e8e33760e81b81526001600160a01b0384811660048301528381166024830152604482018d9052606482018c9052608482018b905260a482018a90523060c483015260e4820189905291516000927f0000000000000000000000000000000000000000000000000000000000000000169163e8e337009161010480830192606092919082900301818787803b15801561072857600080fd5b505af115801561073c573d6000803e3d6000fd5b505050506040513d606081101561075257600080fd5b50604001519050806107ab576040805162461bcd60e51b815260206004820152601460248201527f4e6f7420656e6f756768206c6971756964697479000000000000000000000000604482015290519081900360640190fd5b83516107e1906001600160a01b03167f000000000000000000000000000000000000000000000000000000000000000083610ca1565b7f00000000000000000000000000000000000000000000000000000000000000006001600160a01b031663d4a0a15082888f896040518563ffffffff1660e01b815260040180858152602001848152602001836001600160a01b03168152602001828152602001945050505050602060405180830381600087803b15801561086857600080fd5b505af115801561087c573d6000803e3d6000fd5b505050506040513d602081101561089257600080fd5b5050604080516370a0823160e01b815230600482015290516001600160a01b038516916370a08231916024808301926020929190829003018186803b1580156108da57600080fd5b505afa1580156108ee573d6000803e3d6000fd5b505050506040513d602081101561090457600080fd5b505160408086019190915280516370a0823160e01b815230600482015290516001600160a01b038416916370a08231916024808301926020929190829003018186803b15801561095357600080fd5b505afa158015610967573d6000803e3d6000fd5b505050506040513d602081101561097d57600080fd5b505160808501526020840151604085015111156109c4576109c4336109b386602001518760400151610d8c90919063ffffffff16565b6001600160a01b0386169190610dd5565b836060015184608001511115610a0457610a04336109f386606001518760800151610d8c90919063ffffffff16565b6001600160a01b0385169190610dd5565b505050505050505050505050565b6000546001600160a01b031690565b6000546001600160a01b03163314610a80576040805162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572604482015290519081900360640190fd5b610b0e33826001600160a01b03166370a08231306040518263ffffffff1660e01b815260040180826001600160a01b0316815260200191505060206040518083038186803b158015610ad157600080fd5b505afa158015610ae5573d6000803e3d6000fd5b505050506040513d6020811015610afb57600080fd5b50516001600160a01b0384169190610dd5565b50565b6000546001600160a01b03163314610b70576040805162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572604482015290519081900360640190fd5b6001600160a01b038116610bb55760405162461bcd60e51b81526004018080602001828103825260268152602001806111916026913960400191505060405180910390fd5b600080546040516001600160a01b03808516939216917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e091a36000805473ffffffffffffffffffffffffffffffffffffffff19166001600160a01b0392909216919091179055565b7f000000000000000000000000000000000000000000000000000000000000000081565b604080516001600160a01b0380861660248301528416604482015260648082018490528251808303909101815260849091019091526020810180516001600160e01b03166323b872dd60e01b179052610c9b908590610e2c565b50505050565b6000610d3782856001600160a01b031663dd62ed3e30876040518363ffffffff1660e01b815260040180836001600160a01b03168152602001826001600160a01b031681526020019250505060206040518083038186803b158015610d0557600080fd5b505afa158015610d19573d6000803e3d6000fd5b505050506040513d6020811015610d2f57600080fd5b505190610edd565b604080516001600160a01b038616602482015260448082018490528251808303909101815260649091019091526020810180516001600160e01b031663095ea7b360e01b179052909150610c9b908590610e2c565b6000610dce83836040518060400160405280601e81526020017f536166654d6174683a207375627472616374696f6e206f766572666c6f770000815250610f37565b9392505050565b604080516001600160a01b038416602482015260448082018490528251808303909101815260649091019091526020810180516001600160e01b031663a9059cbb60e01b179052610e27908490610e2c565b505050565b6060610e81826040518060400160405280602081526020017f5361666545524332303a206c6f772d6c6576656c2063616c6c206661696c6564815250856001600160a01b0316610fce9092919063ffffffff16565b805190915015610e2757808060200190516020811015610ea057600080fd5b5051610e275760405162461bcd60e51b815260040180806020018281038252602a8152602001806111b7602a913960400191505060405180910390fd5b600082820183811015610dce576040805162461bcd60e51b815260206004820152601b60248201527f536166654d6174683a206164646974696f6e206f766572666c6f770000000000604482015290519081900360640190fd5b60008184841115610fc65760405162461bcd60e51b81526004018080602001828103825283818151815260200191508051906020019080838360005b83811015610f8b578181015183820152602001610f73565b50505050905090810190601f168015610fb85780820380516001836020036101000a031916815260200191505b509250505060405180910390fd5b505050900390565b6060610fdd8484600085610fe5565b949350505050565b6060610ff085611152565b611041576040805162461bcd60e51b815260206004820152601d60248201527f416464726573733a2063616c6c20746f206e6f6e2d636f6e7472616374000000604482015290519081900360640190fd5b60006060866001600160a01b031685876040518082805190602001908083835b602083106110805780518252601f199092019160209182019101611061565b6001836020036101000a03801982511681845116808217855250505050505090500191505060006040518083038185875af1925050503d80600081146110e2576040519150601f19603f3d011682016040523d82523d6000602084013e6110e7565b606091505b509150915081156110fb579150610fdd9050565b80511561110b5780518082602001fd5b60405162461bcd60e51b8152602060048201818152865160248401528651879391928392604401919085019080838360008315610f8b578181015183820152602001610f73565b3b151590565b6040518060a0016040528060006001600160a01b0316815260200160008152602001600081526020016000815260200160008152509056fe4f776e61626c653a206e6577206f776e657220697320746865207a65726f20616464726573735361666545524332303a204552433230206f7065726174696f6e20646964206e6f742073756363656564a164736f6c6343000705000a";

export class SDOGEBondHelper__factory extends ContractFactory {
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
    bond_: string,
    router_: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<SDOGEBondHelper> {
    return super.deploy(
      bond_,
      router_,
      overrides || {}
    ) as Promise<SDOGEBondHelper>;
  }
  getDeployTransaction(
    bond_: string,
    router_: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(bond_, router_, overrides || {});
  }
  attach(address: string): SDOGEBondHelper {
    return super.attach(address) as SDOGEBondHelper;
  }
  connect(signer: Signer): SDOGEBondHelper__factory {
    return super.connect(signer) as SDOGEBondHelper__factory;
  }
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): SDOGEBondHelperInterface {
    return new utils.Interface(_abi) as SDOGEBondHelperInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): SDOGEBondHelper {
    return new Contract(address, _abi, signerOrProvider) as SDOGEBondHelper;
  }
}
