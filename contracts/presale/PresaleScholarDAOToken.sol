// SPDX-License-Identifier: AGPL-3.0-or-later
pragma solidity 0.7.5;

import '../libraries/SafeMath.sol';
import '../libraries/ERC20.sol';
import "../libraries/Ownable.sol";

contract PresaleScholarDAOToken is ERC20, Ownable {
    using SafeMath for uint256;

    bool public requireSellerApproval;
    bool public allowMinting;
    mapping(address => bool) public isApprovedSeller;

    event SellerApproval(address indexed seller);

    constructor() ERC20("Presale ScholarDAO token", "$PSDAO", 9) {
        uint256 initialSupply = 500000 * 1e9;
        requireSellerApproval = true;
        allowMinting = true;
        _addApprovedSeller(address(this));
        _addApprovedSeller(msg.sender);
        _mint(msg.sender, initialSupply);
    }

    function allowOpenTrading() external onlyOwner() returns (bool) {
        requireSellerApproval = false;
        return requireSellerApproval;
    }

    function disableMinting() external onlyOwner() returns (bool) {
        allowMinting = false;
        return allowMinting;
    }

    function _addApprovedSeller(address approvedSeller_) internal {
        isApprovedSeller[approvedSeller_] = true;
        emit SellerApproval(approvedSeller_);
    }

    function addApprovedSeller(address approvedSeller_) external onlyOwner() returns (bool) {
        _addApprovedSeller(approvedSeller_);
        return isApprovedSeller[approvedSeller_];
    }

    function addApprovedSellers(address[] calldata approvedSellers_) external onlyOwner() returns (bool) {
        for (uint256 i = 0; approvedSellers_.length > i; i++) {
            _addApprovedSeller(approvedSellers_[i]);
        }
        return true;
    }

    function _removeApprovedSeller(address disapprovedSeller_) internal {
        isApprovedSeller[disapprovedSeller_] = false;
    }

    function removeApprovedSeller(address disapprovedSeller_) external onlyOwner() returns (bool) {
        _removeApprovedSeller(disapprovedSeller_);
        return isApprovedSeller[disapprovedSeller_];
    }

    function removeApprovedSellers(address[] calldata disapprovedSellers_) external onlyOwner() returns (bool) {
        for (uint256 i = 0; disapprovedSellers_.length > i; i++) {
            _removeApprovedSeller(disapprovedSellers_[i]);
        }
        return true;
    }

    function _beforeTokenTransfer(
        address from_,
        address to_,
        uint256
    ) internal view override {
        if (requireSellerApproval) {
            require((_balances[to_] > 0 || isApprovedSeller[from_]), "Account not approved to transfer");
        }
    }

    function mint(address recipient_, uint256 amount_) external virtual onlyOwner() {
        require(allowMinting, "Minting has been disabled");
        _mint(recipient_, amount_);
    }

    function burn(uint256 amount_) external virtual {
        _burn(msg.sender, amount_);
    }

    function burnFrom(address account_, uint256 amount_) external virtual {
        _burnFrom(account_, amount_);
    }

    function _burnFrom(address account_, uint256 amount_) internal virtual {
        uint256 decreasedAllowance_ =
            allowance(account_, msg.sender).sub(amount_, "ERC20: burn amount exceeds allowance");
        _approve(account_, msg.sender, decreasedAllowance_);
        _burn(account_, amount_);
    }
}