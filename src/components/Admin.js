import React, { useState } from 'react'
import { ethers } from "ethers";
import PersonListItem from './PersonListItem';
import WinnerListItem from './WinnerListItem';



export default function Admin(props) {
    const [userBalance, changeBalance] = useState("");
    const [listOfParticipants, newListOfParticipants] = useState([<p className='lead'>show the list of people participating in the lottery</p>]);
    const [contractBalance, setContractbalance] = useState('Look at the total pool');
    const [pickWinnerText, setPickWinnerText] = useState('Pick Winner');
    const [lastWinnerText, setLastWinnerText] = useState('Fetching Information...');
    const [historyOfWinners, setHistoryOfWinners] = useState([<h5 className='display-6'>Fetching Information...</h5>]);

    const fetchBalance = async () => {
        changeBalance("Fetching Information...");
        const balance = await global.providerRead.getBalance(global.address);
        changeBalance(ethers.utils.formatEther(balance));
    }
    const handleShowParticipants = async () => {

        newListOfParticipants([<p className='lead'>Fetching Information.... Might take some time.</p>]);
        const addressList = await global.readContract.getPlayers();
        if(addressList.length === 0) {
            newListOfParticipants([<p className='lead'>There are no participants.</p>]);
        }
        else {
            const namesList = await global.readContract.getPlayerNames();
            const arr = [];
            for (let i = 0; i < addressList.length; i++) {
                arr.push(<PersonListItem name={namesList[i]} address={addressList[i]} />);
            }
            newListOfParticipants(arr);
        }
    }
    const handleShowPool = async () => {
        setContractbalance('Fetching...');
        const currBal = await global.readContract.getBalance();
        setContractbalance(ethers.utils.formatEther(currBal) + ' ethers')
    }
    const handlePickWinner = async () => {
        setPickWinnerText('Processing...');
        const addressList = await global.readContract.getPlayers();
        if(addressList.length === 0) {
            props.showAlert('There are no participants.','danger');
            setPickWinnerText('Pick Winner');
        }
        else {
            await global.writeContract.pickWinner();
            global.wonTheLottery = true;
            props.showAlert('Winner Decided, wait for the transaction to complete', 'success');
            setPickWinnerText(<p className='lead'>Winner Decided, look for the last winner</p>);
        }
    }
    const showLastWinner = async () => {
        setLastWinnerText('Fetching Information...');
        const w = await global.readContract.getLotteryId();
        const winName = await global.readContract.getWinnerNameByLottery(w-1);
        let winAmount = await global.readContract.getWinnerPoolByLottery(w-1);
        winAmount /= 10;

        setLastWinnerText(winName+' won the lottery of amount '+winAmount+' ethers');
    }

    const showHistoryOfWinners = async () => {
        setHistoryOfWinners([<h5 className='display-6'>Fetching Information...</h5>]);
        let w = await global.readContract.getLotteryId();
        let arr = []
        while (w-- > 0) {
            const name = await global.readContract.getWinnerNameByLottery(w);
            const address = await global.readContract.getWinnerByLottery(w);
            let amount = await global.readContract.getWinnerPoolByLottery(w);
            amount /= 10;
            arr.push(<WinnerListItem name={name} address={address} amount={amount} />);
        }
        setHistoryOfWinners(arr);
    }


    return (
        <>
            <div className='container-fluid'>
                <div className='row py-4'>
                    <div className='col'>
                        <button className='btn btn-light top-details text-white ' onClick={fetchBalance}>Fetch Account Balance <span className="badge bg-secondary">{userBalance}</span></button>
                    </div>
                    <div className='row'>

                        <div className='col'>
                            <div className='top-details text-white '>Administrator</div>
                        </div>
                        <div className='col'>
                            <div className='top-details text-white'>Address: <span className="badge bg-secondary">{global.address.substring(0, 5) + '......' + global.address.substring(38)}</span></div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='mx-5 mt-5'>
                <p class="placeholder-wave">
                    <span class="placeholder col-12"></span>
                </p>
            </div>

            <div className='mx-5 my-5'>
                <div className="accordion" id="accordionExample">
                    <div className="accordion-item">
                        <h2 className="accordion-header">
                            <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                <h4 className='heading-text'>Manage Current Lottery</h4>
                            </button>
                        </h2>
                        <div id="collapseOne" className="accordion-collapse collapse show" data-bs-parent="#accordionExample">
                            <div className="accordion-body container-fluid">
                                <div className='row'>
                                    <div className='col border'>
                                        <button type="button" className="btn btn-secondary btn-lg" onClick={handleShowParticipants}>List Of Participants</button>
                                        <ul class="list-group list-group-flush">
                                            {listOfParticipants}
                                        </ul>
                                    </div>
                                    <div className='col border'>
                                        <button type="button" className="btn btn-secondary btn-lg" onClick={handleShowPool}>Total Pool</button>
                                        <h5 className='display-6' style={{ textAlign: 'left' }}>{contractBalance}</h5>
                                    </div>
                                    <div className='col'>
                                        <button type="button" className="btn btn-primary buy-ticket-button my-4 mx-5" onClick={handlePickWinner}>{pickWinnerText}</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="accordion-item">
                        <h2 className="accordion-header">
                            <button className="accordion-button collapsed" type="button" onClick={showLastWinner} data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                                <h4 className='heading-text'>Last Winner</h4>
                            </button>
                        </h2>
                        <div id="collapseTwo" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                            <div className="accordion-body container-fluid">
                                <div className='row'>
                                    <h5 className='display-6'>
                                        {lastWinnerText}
                                    </h5>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="accordion-item">
                        <h2 className="accordion-header">
                            <button className="accordion-button collapsed" type="button" onClick={showHistoryOfWinners} data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                                <h4 className='heading-text'>History Of Winners</h4>
                            </button>
                        </h2>
                        <div id="collapseThree" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                            <div className="accordion-body">
                                {historyOfWinners}



                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )

}


