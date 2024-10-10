
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



class KvBox {
    constructor() {
    }
    warnBox(op) {
        var opts = {};
        opts.title = "Warnning";
        opts.titleBaseColor = "#ff0";
        KvLib.deepCoverObject(opts, op);
        this.mesBox(opts);
    }

    errorBox(op) {
        var opts = {};
        opts.title = "Error";
        opts.titleBaseColor = "#f88";
        KvLib.deepCoverObject(opts, op);
        this.mesBox(opts);
    }

    okBox(op) {
        var opts = {};
        opts.title = "OK";
        opts.titleBaseColor = "#0f0";
        KvLib.deepCoverObject(opts, op);
        this.mesBox(opts);
    }

    checkBox(_op) {
        var opts = {};
        opts.title = "Warnning";
        opts.titleBaseColor = "#ff0";
        opts.buttons = ["OK", "ESC"];
        opts.buttonIds = ["ok", "esc"];
        KvLib.deepCoverObject(opts, _op);
        this.mesBox(opts);
    }
    mesBox(_op) {
        if (gr.mesBoxOn_f)
            return;
        var op = {};
        op.kvTexts = ["This is message1", "This is message2", "This is message2", "This is message2"];
        op.title = "Message";
        op.buttons = ["ESC"];
        op.buttonIds = ["esc"];
        op.titleBaseColor = "#ccf";
        op.titleColor = "#000";
        op.buttonXm = 100;
        op.w = 800;
        op.h = 220;
        op.bm = 10;
        op.ym = 10;
        KvLib.deepCoverObject(op, _op);
        op.h=160+40*op.kvTexts.length;
        if(_op.h)
            op.h=_op.h;
        //=====================================
        var opts = {};
        opts.title = op.title;
        opts.titleColor = op.titleColor;
        opts.titleBaseColor = op.titleBaseColor;
        opts.buttons = op.buttons;
        opts.buttonIds = op.buttonIds;
        mda.setMargin(opts, op);
        opts.ym = op.ym;
        opts.eh = op.kvTexts.length * 40;
        //=================
        var ksObj = opts.ksObj = {};
        var kopts = ksObj.opts = {};
        kopts.innerText = "";
        for (var i = 0; i < op.kvTexts.length; i++) {
            if (i !== 0)
                kopts.innerText += "<br>";
            kopts.innerText += op.kvTexts[i];
        }
        kopts.fontSize = 40 * 0.7;
        ksObj.name = "message";
        ksObj.type = "Component~Cp_base~plate.none";
        //=================
        opts.actionFunc = function (iobj) {
            console.log(iobj);
            KvLib.exeFunc(_op.actionFunc, iobj);
            MdaPopWin.popOffTo(iobj.sender.stas.popStackCnt);
            gr.mesBoxOn_f = 0;
        };
        var kvObj = new Block("mdaBox", "Model~MdaBox~base.sys0", opts);
        var mesObj = mda.popObj(op.w, op.h, kvObj);
        var bobj = kvObj.blockRefs["esc"];
        gr.mesBoxOn_f = 1;
        bobj.elems["base"].focus();
    }
    
    

}
var box = new KvBox();

