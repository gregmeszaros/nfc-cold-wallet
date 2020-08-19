import { Observable } from '@nativescript/core';
import { EventData } from "@nativescript/core/data/observable";

import { alert } from "@nativescript/core/ui/dialogs";
import * as dialogs from "@nativescript/core/ui/dialogs";
import { TextView } from "@nativescript/core/ui/text-view";

import { Nfc, NfcTagData, NfcNdefData } from "nativescript-nfc";

export class CryptoVaultModel extends Observable {
    public lastNdefDiscovered: string = "Press a button...";
    private nfc: Nfc;
    public seed: string = "";

    constructor() {
        super();
        this.nfc = new Nfc();
        this.seed = "empty";
    }

    public doCheckAvailable() {
        this.nfc.available().then((avail) => {
            console.log("Available? " + avail);
            alert("" + avail);
        }, (err) => {
            alert(err);
        });
    }

    public doCheckEnabled() {
        this.nfc.enabled().then((on) => {
            console.log("Enabled? " + on);
            alert("" + on);
        }, (err) => {
            alert(err);
        });
    }

    public doStartTagListener() {
        let that = this;
        this.nfc.setOnTagDiscoveredListener((data: NfcTagData) => {
            console.log("Tag discovered! " + data.id);
            that.set("lastTagDiscovered", data.id);
        }).then(() => {
            console.log("OnTagDiscovered Listener set");
        }, (err) => {
            console.log(err);
        });
    }

    public doStopTagListener() {
        this.nfc.setOnTagDiscoveredListener(null).then(() => {
            console.log("OnTagDiscovered nulled");
        }, (err) => {
            console.log(err);
        });
    }

    public doStartNdefListener() {
        this.nfc.setOnNdefDiscoveredListener((data: NfcNdefData) => {
            if (data.message) {
                let tagMessages = [];
                // data.message is an array of records, so:
                data.message.forEach(record => {
                    console.log("Read record: " + JSON.stringify(record));
                    tagMessages.push(record.payloadAsString);
                });
                this.set("lastNdefDiscovered", "Read: " + tagMessages.join(", "));
            }
        }, {
            stopAfterFirstRead: true,
            scanHint: "Scan a tag, baby!"
        })
            .then(() => this.set("lastNdefDiscovered", "Listening..."))
            .catch(err => alert(err));
    }

    public doStopNdefListener() {
        this.nfc.setOnNdefDiscoveredListener(null).then(() => {
            this.set("lastNdefDiscovered", "Stopped listening.");
        }, (err) => {
            alert(err);
        });
    }

    public doWriteText() {
        this.nfc.writeTag({
            textRecords: [
                {
                    id: [1],
                    text: this.seed
                }
            ]
        }).then(() => {
            this.set("lastNdefDiscovered", "NFC tag updated, wrote encrypted seed phrase!");
        }, (err) => {
            console.log(err);
        });
    }

    public doWriteUri() {
        this.nfc.writeTag({
            uriRecords: [
                {
                    id: [2, 5],
                    uri: "https://www.telerik.com"
                }
            ]
        }).then(() => {
            this.set("lastNdefDiscovered", "Wrote uri 'https://www.telerik.com");
        }, (err) => {
            console.log(err);
        });
    }

    public doEraseTag() {
        this.nfc.eraseTag().then(() => {
            this.set("lastNdefDiscovered", "Tag erased");
        }, (err) => {
            console.log(err);
        });
    }

    /**
     * Capture when neew seed value is typed
     */
    public onSeedChange(args: EventData) {
        const seedFromInput = args.object as TextView;
        this.seed = seedFromInput.text;
    }

    /**
     * Encrypt and write to the NFC chip
     */
    public encryptSeed() {
        dialogs.prompt({
            title: "Encrypt seed",
            message: "Use a strong password to encrypt your seed",
            okButtonText: "Save",
            cancelButtonText: "Cancel",
            defaultText: "",
            inputType: dialogs.inputType.password
        }).then(r => {
            console.log("Dialog result: " + r.result + ", text: " + r.text);
            if (r.result != false) {
                alert(this.seed);
                alert(r.text);
            }
            
        });
    }
}