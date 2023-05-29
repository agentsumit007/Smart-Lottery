import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login(props) {


    const navigate = useNavigate();


    const [walletAddress, newAddress] = useState("");
    const [username, newUsername] = useState("");

    function onChangeHandlerWalletAddress(e) {
        newAddress(e.target.value)
    }
    function onChangeHandlerName(e) {
        newUsername(e.target.value);
    }


    function handleLogin() {
        if (username.length === 0) {
            props.showAlert("Enter Username", 'warning');
        }
        else if (walletAddress === global.admin) {
            global.logged = true;
            global.address = walletAddress;
            global.username = username;
            global.connectMetaMask();
            navigate("/Admin");
        }
        else if (walletAddress.length === 42) {
            global.logged = true;
            global.address = walletAddress;
            global.username = username;
            global.connectMetaMask();
            navigate("/Section");
        }
        else {
            global.logged = false;
            props.showAlert("Enter Valid Ethereum Address", 'warning');
        }
    }
    const handleLoginMetaMask = async () => {
        if (username.length === 0) {
            props.showAlert("Enter Username", 'warning');
        }
        else {
            try {
                await global.connectMetaMask();
                const metaAddress = global.metamaskAccounts[0];
                // console.log(metaAddress);

                if (metaAddress.toLowerCase() === global.admin.toLowerCase()) {
                    global.logged = true;
                    global.address = metaAddress;
                    global.username = username;
                    navigate("/Admin");
                }
                else {
                    global.logged = true;
                    global.address = metaAddress;
                    global.username = username;
                    navigate("/Section");
                }
            }
            catch (e) {
                props.showAlert("User rejected the connection", 'danger');
            }

        }
    }

    return (
        <>
            <div className="container login--page">
                <label htmlFor="address-bar" className="text--white display-6 my-2">Name</label>
                <input className="form-control form-control-lg flex-child" onChange={onChangeHandlerName} value={username} type="text" placeholder="Enter your name here.." aria-label=".form-control-lg example" />
                <h5 className="display-6" style={{ textAlign: 'center' }}>__ __ __</h5>
                <label htmlFor="address-bar" className="text--white display-6 my-2">Ethereum Address</label>
                <input className="form-control form-control-lg flex-child" onChange={onChangeHandlerWalletAddress} value={walletAddress} type="text" placeholder="Paste your 42 character ethereum address here.." aria-label=".form-control-lg example" />
                
                <button className="btn btn-light flex-child my-4" onClick={handleLogin}>Login</button>
                
                <h5 className="display-6" style={{ textAlign: 'center' }}>-- OR --</h5>
                <button className="btn btn-light flex-child my-4" onClick={handleLoginMetaMask}>Login with Metamask</button>
            </div>
        </>
    )
}
