import environment from "./config";
import { connect, Contract, keyStores, WalletConnection } from "near-api-js";
import { formatNearAmount } from "near-api-js/lib/utils/format";

const nearEnviroment = environment("testnet");

export async function initializeContract() {
    
    const near = await connect(
        Object.assign(
            { deps: {keyStores: new keyStores.BrowserLocalStorageKeyStore()}},
            nearEnviroment
        )
    );
    window.walletConnection = new WalletConnection(near);
    window.accountId = window.walletConnection.getAccountId();
    window.contract = new Contract(
        window.walletConnection.account(),
        nearEnviroment.contractName,
        {
            viewMethods: ["getProduct", "getProducts"],
            changeMethods: ["buyProduct", "setProduct"]
        }
    );
}

export async function accountBalance() {
    return formatNearAmount(
        (await window.walletConnection.account().getAccountBalance()).total,
        2
    );
}

export async function getAccountId() {
    return window.walletConnection.getAccountId();
}

export  function login() {
    window.walletConnection.requestSignIn(nearEnviroment.contractName);
}

export function logout() {
    window.walletConnection.signOut();
    window.location.reload();
}