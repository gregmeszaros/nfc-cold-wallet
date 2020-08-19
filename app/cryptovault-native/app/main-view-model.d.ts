import { Observable } from '@nativescript/core';
export declare class CryptoVaultModel extends Observable {
    message: string;
    //seed: string;
    private nfc;
    constructor();
    doCheckAvailable(): void;
    doCheckEnabled(): void;
    doStartListening(): void;
    doStopListening(): void;
    doWriteHello(): void;
    doWriteGoodbye(): void;
    onSeedChange(): void;
    encryptSeed(): void;
}