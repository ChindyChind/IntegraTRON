// @ts-ignore
import TronWeb from 'tronweb';

export const TW: any = new TronWeb({
    // fullHost: 'https://api.nileex.io',
    fullHost: 'https://nile.trongrid.io',
});
TW.setAddress('TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t');

(window as any).tronWeb1 = TW;