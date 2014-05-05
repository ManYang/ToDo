/*
 Internet Timestamp Parser
 Copyright (c) 2009 Sebastiaan Deckers
 License: GNU General Public License version 3 or later
 */
Date.prototype.setISO8601 = function (timestamp) {
    var match = timestamp.match(
            "^([-+]?)(\\d{4,})(?:-?(\\d{2})(?:-?(\\d{2})" +
            "(?:[Tt ](\\d{2})(?::?(\\d{2})(?::?(\\d{2})(?:\\.(\\d{1,3})(?:\\d+)?)?)?)?" +
            "(?:[Zz]|(?:([-+])(\\d{2})(?::?(\\d{2}))?)?)?)?)?)?$");
    if (match) {
        for (var ints = [2, 3, 4, 5, 6, 7, 8, 10, 11], i = ints.length - 1; i >= 0; --i)
            match[ints[i]] = (typeof match[ints[i]] != "undefined"
                && match[ints[i]].length > 0) ? parseInt(match[ints[i]], 10) : 0;
        if (match[1] == '-') // BC/AD
            match[2] *= -1;
        var ms = Date.UTC(
            match[2], // Y
                match[3] - 1, // M
            match[4], // D
            match[5], // h
            match[6], // m
            match[7], // s
            match[8] // ms
        );
        if (typeof match[9] != "undefined" && match[9].length > 0) // offset
            ms += (match[9] == '+' ? -1 : 1) *
                (match[10]*3600*1000 + match[11]*60*1000); // oh om
        if (match[2] >= 0 && match[2] <= 99) // 1-99 AD
            ms -= 59958144000000;
        this.setTime(ms);
        return this;
    }
    else
        return null;
}

Date.prototype.getISODateString = function ISODateString(){
    function pad(n){return n<10 ? '0'+n : n}
    return this.getUTCFullYear()+'-'
        + pad(this.getUTCMonth()+1)+'-'
        + pad(this.getUTCDate())+'T'
        + pad(this.getUTCHours())+':'
        + pad(this.getUTCMinutes())+':'
        + pad(this.getUTCSeconds())+'Z'
}
