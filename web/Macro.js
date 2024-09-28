
class Macro {
    constructor() {
    }
    readServerFileToArray(fileName, outName) {
        var opts;
        var obj = {};
        obj["act"] = "readFile";
        obj["type"] = "action";
        var retOpts = obj["retOpts"] = {};
        retOpts["cmdInx"] = sv.cmdInx;
        retOpts["responseType"] = "responseError";
        retOpts["messageTime"] = 1000;//(ms)
        retOpts["callBackFunc"] = "";
        retOpts["responseAction"] = "toStringArray";
        obj["opts"] = {};
        opts = obj["opts"];
        //=================================
        opts["fileName"] = fileName;
        opts["outName"] = outName;
        sv.callServer(JSON.stringify(obj));
    }
    setKvText(eng, id, img, chnT) {
        var obj = {};
        obj.objName = "textObj";
        obj.type = "text";
        obj.id = eng;
        obj.eng = eng;
        if (id)
            obj.id = id;
        if (chnT)
            obj.chnT = chnT;
        if (img) {
            obj.image = img;
        }
        return obj;
    }
    setKvTextType(type, id) {
        var obj = {};
        obj.objName = "textObj";
        obj.type = type;
        obj.id = "";
        obj.eng = "";
        if (id)
            obj.id = id;
        return obj;
    }

}
var mac = new Macro();

