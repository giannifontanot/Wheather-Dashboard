function fConvertKToF(pKelvin){
    let f = pKelvin - 273.15;
    f = 1.8*f;
    f = f + 32;
    return Math.round(f);
}
