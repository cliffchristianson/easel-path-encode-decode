
window['commandList'] = "";
function decodePath() {
    var str = document.getElementById('encodedString').value;
    var instructions = ["moveTo", "lineTo", "quadraticCurveTo", "bezierCurveTo", "closePath"];
    var paramCount = [2, 2, 4, 6, 0];
    var i=0;
    var l=str.length;
    var params = [];
    var x=0, y=0;
    var base64 = {"A":0,"B":1,"C":2,"D":3,"E":4,"F":5,"G":6,"H":7,"I":8,"J":9,"K":10,"L":11,"M":12,"N":13,"O":14,"P":15,"Q":16,"R":17,"S":18,"T":19,"U":20,"V":21,"W":22,"X":23,"Y":24,"Z":25,"a":26,"b":27,"c":28,"d":29,"e":30,"f":31,"g":32,"h":33,"i":34,"j":35,"k":36,"l":37,"m":38,"n":39,"o":40,"p":41,"q":42,"r":43,"s":44,"t":45,"u":46,"v":47,"w":48,"x":49,"y":50,"z":51,"0":52,"1":53,"2":54,"3":55,"4":56,"5":57,"6":58,"7":59,"8":60,"9":61,"+":62,"/":63};

    document.getElementById('decodedString').innerHTML = "";
    window['commandList'] = "";

    console.log("Cliff here")
    console.log(str);
    while (i<l) {
        var c = str.charAt(i);
        var n = base64[c];
        var fi = n>>3; // highest order bits 1-3 code for operation.
        var f = instructions[fi];
        // check that we have a valid instruction & that the unused bits are empty:
        if (!f || (n&3)) { throw("bad path data (@"+i+"): "+c); }
        var pl = paramCount[fi];
        if (!fi) { x=y=0; } // move operations reset the position.
        params.length = 0;
        i++;
        var charCount = (n>>2&1)+2;  // 4th header bit indicates number size for this operation.
        for (var p=0; p<pl; p++) {
            var num = base64[str.charAt(i)];
            var sign = (num>>5) ? -1 : 1;
            num = ((num&31)<<6)|(base64[str.charAt(i+1)]);
            if (charCount == 3) { num = (num<<6)|(base64[str.charAt(i+2)]); }
            num = sign*num/10;
            if (p%2) { x = (num += x); }
            else { y = (num += y); }
            params[p] = num;
            i += charCount;
        }
        // f.apply(this,params);
        console.log(f);
        console.log(params);
        document.getElementById('decodedString').innerHTML += f + "(" + params[0] + "," + params[1] + ")\n";        window['commandList'] += "." + f + "(" + params[0] + "," + params[1] + ")"
    }
    return this;
};
function moveTo(x, y) {
    // return this.append(new G.MoveTo(x,y), true);
};
function lineTo(x, y) {
    // return this.append(new G.LineTo(x,y));
};
function arcTo(x1, y1, x2, y2, radius) {
    // return this.append(new G.ArcTo(x1, y1, x2, y2, radius));
};
function arc(x, y, radius, startAngle, endAngle, anticlockwise) {
    // return this.append(new G.Arc(x, y, radius, startAngle, endAngle, anticlockwise));
};
function quadraticCurveTo(cpx, cpy, x, y) {
    // return this.append(new G.QuadraticCurveTo(cpx, cpy, x, y));
};
function bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y) {
    // return this.append(new G.BezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y));
};
function closePath() {
//	return this._activeInstructions.length ? this.append(new G.ClosePath()) : this;
};
function encodeDecodedString() {
    var ep = new EncodePath();
    // we need to get the textarea info on clean it
    var originalList = document.getElementById('decodedString').value;
    console.log("Cliff here at start of encodeDecodedString");
    console.log(originalList);
    lines = originalList.split('\n');
    var newList = "";
    for( var idx=0; idx < lines.length; idx++ ) {
        //lines[idx] = lines[idx].replace("\r", "");
        if( lines[idx].length )
            newList += "." + lines[idx];
    }
    console.log( newList );
    var commandStr = "ep" + newList; // window['commandList'];
    console.log(commandStr);
    var result = eval(commandStr);
    console.log( result.code );
    // ep.moveTo(0,-7.9);
    document.getElementById( 'encodeDecodedString' ).value = result.code;
    
}
document.getElementById('encodeDecodedButton').addEventListener( 'click' , encodeDecodedString);
document.getElementById('decodePathButton').addEventListener( 'click', decodePath);