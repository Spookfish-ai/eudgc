interface CertInfo {
    subject: string;
    issuer: string;
    notbefore: number;
    notafter: number;
    pubkey: string;
    rawX509data: string;
}

interface EuDgcCert {
    v: EuDgcVaccincation[];
    dob: string;
    nam: {
        fn: string;
        gn: string;
        fnt: string;
        gnt: string;
    };
    ver: string;
}
interface EuDgcVaccincation {
    ci: string;
    co: string;
    dn: number;
    dt: string;
    is: string;
    ma: string;
    mp: string;
    sd: number;
    tg: string;
    vp: string;
}
interface ValidationOptions {
    certFilter?: (certInfo: CertInfo) => boolean;
    explicitCerts?: CertInfo[];
}
declare class EuDgc {
    /**
     * Parses the data of a digital vaccination qrcode and returns a promise
     *
     * @param encodedData the data inside the qr-code.
     * @returns a javascript structure with the contents
     */
    static parse(encodedData: string): Promise<EuDgcCert>;
}
declare const EuDgc_parse: typeof EuDgc.parse;

export { EuDgc, EuDgcCert, EuDgcVaccincation, EuDgc_parse, ValidationOptions };
