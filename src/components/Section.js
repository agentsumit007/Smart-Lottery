import React, { useEffect, useState } from 'react'
import { ethers } from "ethers";
import PersonListItem from './PersonListItem';
import WinnerListItem from './WinnerListItem';



    export default function Section(props) {

    const [userBalance, changeBalance] = useState("");
    const [ticketCount, setTicketCount] = useState('See how many tickets you own.');
    const [contractBalance, setContractbalance] = useState('Look at the total pool');
    const [listOfParticipants, newListOfParticipants] = useState([<p className='lead'>show the list of people participating in the lottery</p>]);
    const [historyOfWinners, setHistoryOfWinners] = useState([<h5 className='display-6'>Fetching Information...</h5>]);



    const fetchBalance = async () => {  //---------------------------------------------------------------------
        changeBalance("Fetching Information...");
        const balance = ethers.utils.formatEther(await global.providerRead.getBalance(global.address));
        changeBalance(Number(balance).toFixed(4)+' ethers');
    }
    const getTicketCount = async () => { //--------------------------------------------------------------------
        setTicketCount('Fetching Information...');

        const addressList = await global.readContract.getPlayers();

        let count = 0;
        for (let i = 0; i < addressList.length; i++) {
            if (addressList[i].toLowerCase() === global.address.toLowerCase()) {
                count = count + 1;
            }
        }
        setTicketCount('You currently have ' + count + ' ticket(s)');
    }

    const handleBuyTicket = async () => { //----------------------------------------------------------------------
        if (!global.metamaskAccounts) {
            props.showAlert('Connect to MetaMask first', "warning")
            global.connectMetaMask();
        }
        else {
            try {
                await global.writeContract.enter(global.username, { value: ethers.utils.parseEther('0.1'), gasLimit: 3000000 });
                props.showAlert("Payment Successful, wait for confirmation by MetaMask", 'success');
            }
            catch (e) {
                props.showAlert("Payment rejected by user", 'danger');
                global.connectMetaMask();
            }
        }
    }

    const handleShowPool = async () => { //------------------------------------------------------------------------
        setContractbalance('Fetching...');
        const currBal = await global.readContract.getBalance();
        setContractbalance(ethers.utils.formatEther(currBal) + ' ethers')
    }

    const handleShowParticipants = async () => { //------------------------------------------------------------------
        newListOfParticipants([<p className='lead'>Fetching Information.... Might take some time.</p>]);
        const addressList = await global.readContract.getPlayers();
        const namesList = await global.readContract.getPlayerNames();

        if (addressList.length === 0) {
            newListOfParticipants([<p className='lead'>currently there are no participants in the lottery</p>])
        }
        else {
            const arr = [];
            for (let i = 0; i < addressList.length; i++) {
                arr.push(<PersonListItem name={namesList[i]} address={addressList[i]} />);
            }
            newListOfParticipants(arr);
        }
    }
    const showHistoryOfWinners = async () => { //------------------------------------------------------------------
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
                            <div className='top-details text-white '>User: <span className="badge bg-secondary">{global.username}</span></div>
                        </div>
                        <div className='col'>
                            <div className='top-details text-white'>Address: <span className="badge bg-secondary">{global.address.substring(0, 5) + '......' + global.address.substring(38)}</span></div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='mx-5 mt-5'>
                <p className="placeholder-wave">
                    <span className="placeholder col-12"></span>
                </p>
            </div>

            <div className='my-5 mx-5'>
                <div className="accordion" id="accordionExample">
                    <div className="accordion-item">
                        <h2 className="accordion-header">
                            <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                <h4 className='heading-text'>Buy Tickets</h4>
                            </button>
                        </h2>
                        <div id="collapseOne" className="accordion-collapse collapse show" data-bs-parent="#accordionExample">
                            <div className="accordion-body container-fluid">
                                <div className='row'>
                                    <div className='col'>
                                        <h5 className='display-3'>Hurry Up!</h5>
                                        <p className='display-6'></p>
                                        <blockquote className="blockquote">
                                            <p className='display-6'>Buy as many tickets as u can</p>
                                            <p>Luck favors the one with more</p>
                                        </blockquote>
                                    </div>
                                    <div className='col'>
                                        <button type="button" className="btn btn-primary buy-ticket-button my-4 mx-5" onClick={handleBuyTicket}>Buy 1 ticket for 0.1 ethers</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="accordion-item">
                        <h2 className="accordion-header">
                            <button className="accordion-button collapsed" onClick={handleShowParticipants} type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                                <h4 className='heading-text'>Current Lottery</h4>
                            </button>
                        </h2>
                        <div id="collapseTwo" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                            <div className="accordion-body">
                                <div className='container-fluid'>
                                    <div className='row'>
                                        <div className='col border'>
                                            <h5 className="display-6">List Of Participants</h5>
                                            <ul className="list-group list-group-flush">
                                                {listOfParticipants}
                                            </ul>
                                        </div>
                                        <div className='col border'>
                                            <button type="button" className='btn btn-secondary btn-lg' onClick={getTicketCount}>Tickets You Have</button>
                                            <h5 className='display-5' style={{ textAlign: 'left' }}>{ticketCount}</h5>
                                        </div>
                                        <div className='col border'>
                                            <button type="button" className="btn btn-secondary btn-lg" onClick={handleShowPool}>Total Pool</button>
                                            <h5 className='display-5' style={{ textAlign: 'left' }}>{contractBalance}</h5>

                                        </div>
                                    </div>
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
                            <div className="accordion-body container">
                                        {historyOfWinners}



                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )

}


