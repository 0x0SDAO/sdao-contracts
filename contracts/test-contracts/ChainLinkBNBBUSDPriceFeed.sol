// SPDX-License-Identifier: MIT
pragma solidity ^0.7.5;

contract ChainLinkBNBBUSDPriceFeed {

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
        roundId = 36893488147419325934;
        answer = 46967000000;
        startedAt = 1641446454;
        updatedAt = 1641446454;
        answeredInRound = 36893488147419325934;
    }

}