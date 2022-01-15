pragma solidity ^0.7.5;

import "./interfaces/IERC20Burnable.sol";
import "./libraries/Ownable.sol";
import "./libraries/SafeERC20.sol";
import "./libraries/SafeMath.sol";

contract PrivateSale is Ownable {
    using SafeMath for uint256;
    using SafeERC20 for IERC20;

    event RateSet(uint256 oldRate, uint256 newRate);
    event BuyerApproval(address indexed buyer);

    IERC20 public immutable tokenIn;
    address public immutable psdao;

    // Expressed in %
    uint256 public psdaoRate;

    mapping(address => bool) public approvedBuyers;

    constructor(
        address psdao_,
        address tokenIn_,
        uint256 psdaoRate_
    ) {
        psdao = psdao_;
        tokenIn = IERC20(tokenIn_);
        psdaoRate = psdaoRate_;
    }

    function setRate(uint256 newRate) external onlyOwner() returns (uint256) {
        uint256 oldRate = psdaoRate;
        psdaoRate = newRate;

        emit RateSet(oldRate, psdaoRate);

        return psdaoRate;
    }

    function _approveBuyer(address newBuyer_) internal onlyOwner() returns (bool) {
        approvedBuyers[newBuyer_] = true;
        emit BuyerApproval(newBuyer_);

        return approvedBuyers[newBuyer_];
    }

    function approveBuyer(address newBuyer_) external onlyOwner() returns (bool) {
        return _approveBuyer(newBuyer_);
    }

    function approveBuyers(address[] calldata newBuyers_) external onlyOwner() returns (uint256) {
        for (uint256 iteration_ = 0; newBuyers_.length > iteration_; iteration_++) {
            _approveBuyer(newBuyers_[iteration_]);
        }
        return newBuyers_.length;
    }

    function calcAmountRaised(uint256 amountPaid_) public view returns (uint256) {
        return amountPaid_.mul(psdaoRate).div(100)
            .mul(10 ** (IERC20(psdao).decimals() - tokenIn.decimals()));
    }

    function buyPSDAO(uint256 amountPaid_) external returns (bool) {
        require(approvedBuyers[msg.sender], "Buyer not approved.");
        uint256 amountRaised = calcAmountRaised(amountPaid_);
        tokenIn.safeTransferFrom(msg.sender, address(this), amountPaid_);
        IERC20(psdao).safeTransfer(msg.sender, amountRaised);
        return true;
    }

    function burnRemainingPSDAOD() external onlyOwner() {
        IERC20Burnable(psdao).burn(IERC20Burnable(psdao).balanceOf(address(this)));
    }

    function withdrawTokenIn() external onlyOwner() returns (bool) {
        tokenIn.safeTransfer(msg.sender, tokenIn.balanceOf(address(this)));
        return true;
    }
}