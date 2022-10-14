
// https://www.cnblogs.com/LH-721109/p/15821498.html

function formathtmljscss(source, spaceWidth, formatType) {
    // console.log('source--',source);
    this.source = source;
    this.spaceStr = "    ";
    if (!isNaN(spaceWidth)) {
        if (spaceWidth > 1) {
            this.spaceStr = "";
            for (var i = 0; i < spaceWidth; i++) {
                this.spaceStr += "&nbsp;";
            }
        }
        else {
            this.spaceStr = "\t";
        }
    }
    this.formatType = formatType;
    this.output = [];
}
formathtmljscss.prototype.getOutput = function(){
    return this.split();
}
formathtmljscss.prototype.removeSpace = function () {
    this.source = this.source.replace(/\s+|\n/g, " ")
        .replace(/\s*{\s*/g, "{")
        .replace(/\s*}\s*/g, "}")
        .replace(/\s*:\s*/g, ":")
        .replace(/\s*;\s*/g, ";");
}

formathtmljscss.prototype.split = function () {
    var bigqleft = this.source.split("{");
    var bigqright;
    for (var i = 0; i < bigqleft.length; i++) {
        if (bigqleft[i].indexOf("}") != -1) {
            bigqright = bigqleft[i].split("}");
            var pv = bigqright[0].split(";");
            for (var j = 0; j < pv.length; j++) {
                pv[j] = this.formatStatement(this.trim(pv[j]),true);
                if (pv[j].length > 0) {
                   this.output.push(this.spaceStr + pv[j] + ";\n<br/>");
                }
            }
             this.output.push("}\n<br/>");
            bigqright[1] = this.trim(this.formatSelect(bigqright[1]));
            if (bigqright[1].length > 0) {
                 this.output.push(bigqright[1], " {\n<br/>");
            }
        }
        else {
             this.output.push(this.trim(this.formatSelect(bigqleft[i])), " {\n<br/>");
        }
    }
    return this.output;
}

formathtmljscss.prototype.trim = function (str) {
    return str.replace(/(^\s*)|(\s*$)/g, "");
}

formathtmljscss.prototype.formatSelect = function (str) {
    return str.replace(/\./g, " .")
        .replace(/\s+/g, " ")
        .replace(/\. /g, ".")
        .replace(/\s*,\s*/g, ",");
}


formathtmljscss.prototype.formatStatement = function (str, autoCorrect) {
    str = str.replace(/:/g, " : ")
        .replace(/\s+/g, " ")
        .replace("# ", "#")
        .replace(/\s*px/ig, "px")
        .replace(/\s*-\s*/g, "-")
        .replace(/\s*:/g, ":");

    return str;
}