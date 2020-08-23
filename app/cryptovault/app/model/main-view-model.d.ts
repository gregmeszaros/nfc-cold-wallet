import { Observable } from '@nativescript/core';
import { ObservableArray } from "@nativescript/core/data/observable-array";

export declare class CryptoVaultModel extends Observable {
    message: string;
    seed: string;
    seedList: ObservableArray<Object>;
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
    getSeedList(): void;
    removeSeedItem(): void;
}