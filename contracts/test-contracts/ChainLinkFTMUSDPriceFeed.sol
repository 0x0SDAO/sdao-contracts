// SPDX-License-Identifier: MIT
pragma solidity ^0.7.5;

contract ChainLinkFTMUSDPriceFeed {

    constructor() {
    }

    function latestRoundData()
        external
        pure
        returns (
            uint80 roundId,
            int256 answer,
            uint256 startedAt,
            uint256 updatedAt,
            uint80 answeredInRound
        )
    {
        roundId = 18446744073709598873;
        answer = 288745933;
        startedAt = 1642156938;
        updatedAt = 1642156938;
        answeredInRound = 18446744073709598873;
    }

}