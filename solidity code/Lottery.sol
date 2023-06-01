pragma solidity ^0.8.11;

contract Lottery {
    address public owner; // Admin
    address payable[] public players; // address array of addresses of participants
    string[] public playerNames; // string array of names of participants
    uint public lotteryId; //keeping the index of latest lottery
    mapping (uint => address payable) public lotteryHistory; // dict for keeping track of lottery winners (addresses)
    mapping (uint => string) public lotteryHistoryNames; // dict for keeping track of lottery winners (names)

    constructor() {
        owner = msg.sender;
        lotteryId = 0;
    }

    function getWinnerByLottery(uint lottery) public view returns (address payable) {  // get address by pointing to the index of previous winners (latest winner at lotteryId-1)
        return lotteryHistory[lottery];
    }

    function getWinnerNameByLottery(uint lottery) public view returns (string memory) { // get name by pointing to the index of previous winners (latest winner at lotteryId-1)
        return lotteryHistoryNames[lottery];
    }

    function getBalance() public view returns (uint) { // balance of contract kitna ethers contract me hai
        return address(this).balance;
    }

    function getPlayers() public view returns (address payable[] memory) { //get array of addresses of participants
        return players;
    }

    function getPlayerNames() public view returns (string[] memory) {  // get array of names of participants
        return playerNames;
    }
    

    function enter(string memory name) public payable { //enter participant into the lottery only if they have minimum of ticket amount balance
        require(msg.value > .01 ether);
        players.push(payable(msg.sender));       // buy ticket wala
        playerNames.push(name);
    }

    function getRandomNumber() public view returns (uint) { // random no. generator
        return uint(keccak256(abi.encodePacked(owner, block.timestamp)));
    }

    function pickWinner() public onlyowner { //only admin func picks winner randomly and stores winner's address in lotteryHistory and winner's name in lotteryHistoryNames
        uint index = getRandomNumber() % players.length;
        players[index].transfer(address(this).balance);

        lotteryHistory[lotteryId] = players[index];
        lotteryHistoryNames[lotteryId] = playerNames[index];
        lotteryId++;
        

        players = new address payable[](0);
        playerNames = new string[](0);
    }

    modifier onlyowner() { //modifier to restrict any method for non admin users
      require(msg.sender == owner);
      _;
    }
}