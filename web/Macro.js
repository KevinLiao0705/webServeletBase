
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

    showLogo(_op) {
        var op = {};
        op.background = "linear-gradient(to top, #c5d5fa, #c3dc99)";
        op.image = gr.logoImage;
        op.width = gr.logoImageWidth;
        op.height = gr.logoImageHeight;
        op.showTime = 2000;//unit ms
        KvLib.deepCoverObject(op, _op);
        //=====================================================
        var opts = {};
        opts.baseColor = op.baseColor;
        opts.background = op.background;
        opts.actionFunc = function (iobj) {
            console.log(iobj);
            var opts = {};
            opts.buttons = [];
            opts.baseColor = op.baseColor;
            opts.title = "";
            var ksObj = opts.ksObj = {};
            ksObj.name = "logoPanel";
            ksObj.type = "Component~Cp_base~images.sys0";
            var kopts = ksObj.opts = {};
            kopts.backgroundImageUrls = [op.image];
            var logoBox = new Block("logoBox", "Model~MdaBox~base.sys0", opts);
            logoBox.setTimer("logoTime", op.showTime / 16, 1, op.actionFunc);
            var mesObj = mda.popObj(op.width, op.height, logoBox);
        };
        var logoPage = new Block("logoPage", "Model~MdaBase~base.sys0", opts);
        return logoPage;
    }

    loginBox(_op) {
        var op = {};
        op.background = "linear-gradient(to top, #c5d5fa, #c3dc99)";
        op.width = 800;
        op.height = 200;
        op.userName = gr.defaultUserName;
        op.password = gr.defaultUserPassword;
        if (!gr.defaultUserName) {
            var cookieObj = KvLib.anaString(document.cookie, ";", "=");
            if (gr.clearCookie_f)
                cookieObj = {};
            if (cookieObj.userName) {
                if (cookieObj.password) {
                    op.userName = cookieObj.userName;
                    op.password = cookieObj.password;
                }
            }
        }
        KvLib.deepCoverObject(op, _op);
        //=====================================================
        var loginPrg = function (userName, password) {
            var loginReturn = function (mes) {
                if (mes.status === "error") {
                    if (gr.defaultUserName) {
                        gr.defaultUserName = "";
                        gr.defaultUserPassword = "";
                        gr.appPageCnt = 1;
                        sys.dispWebPage();
                        return;
                    }
                    var opts = {};
                    opts.kvTexts = [mes.message];
                    opts.actionFunc = function (iobj) {
                        console.log(iobj);
                        gr.appPageCnt = 1;
                        sys.dispWebPage();
                    };
                    box.errorBox(opts);
                }
                if (mes.status === "ok") {
                    us.set = mes.opts.userSet;
                    gr.paraSet = mes.opts.paraSet;
                    document.cookie = 'userName=' + userName + "; max-age=3600";
                    document.cookie = 'password=' + password + "; max-age=3600";
                    gr.userName = userName;
                    gr.password = password;
                    gr.appPageCnt = 2;
                    sys.dispWebPage();
                }
                return;
            };
            gr.serverCallBack = loginReturn;
            sv.serverLogin("responseDialogError", "exeCallBackFunc", userName, password);
            return;
        };
        if (gr.defaultUserName) {
            if (gr.defaultUserPassword) {
                loginPrg(gr.defaultUserName, gr.defaultUserPassword);
                return;
            }
        }

        var opts = {};
        opts.baseColor = op.baseColor;
        opts.background = op.background;
        opts.actionFunc = function (iobj) {
            console.log(iobj);
            var opts = {};
            opts.ksObjss = [];
            for (var i = 0; i < 2; i++) {
                var ksObjs = [];
                for (var j = 0; j < 1; j++) {
                    var ksObj = {};
                    ksObj.name = "setLine#" + i + "." + j;
                    ksObj.type = "Model~MdaSetLine~base.sys0";
                    var kopts = ksObj.opts = {};
                    if (i === 0) {
                        kopts.setOpts = KvLib.copyObj(dsc.optsCopy.str, {title: syst.userName});
                        kopts.setOpts.image = "systemResource/icons8-user-40.png";
                        kopts.setOpts.value = op.userName;
                    }
                    if (i === 1) {
                        kopts.setOpts = KvLib.copyObj(dsc.optsCopy.str, {title: syst.password});
                        kopts.setOpts.image = "systemResource/icons8-key-64.png";
                        kopts.setOpts.value = op.password;
                        kopts.setOpts.password_f = 1;
                    }
                    kopts.setOpts.titleWidth = 200;
                    kopts.setOpts.iconWidth = 50;
                    ksObjs.push(ksObj);
                }
                opts.ksObjss.push(ksObjs);
            }
            opts.ksObjWs = [9999];
            opts.title = syst.login;
            opts.w = op.width;
            opts.h = op.height;
            opts.buttons = [];
            opts.eBaseColor = "#ccc";
            opts.actionFunc = function (iobj) {
                console.log(iobj);
                if (iobj.act === "mouseClick") {
                    if (iobj.buttonId === "ok") {
                        var userName = iobj.ksObjss[0][0].opts.setOpts.value;
                        var password = iobj.ksObjss[1][0].opts.setOpts.value;
                        loginPrg(userName, password);
                    }
                }
            };
            box.setLineBox(opts);
        };
        var loginPage = new Block("loginPage", "Model~MdaBase~base.sys0", opts);
        return loginPage;
    }

    setLineBoxOpts(_op)
    {
        var op = {};
        op.ksObjss = [];
        for (var i = 0; i < 25; i++) {
            var ksObjs = [];
            for (var j = 0; j < 1; j++) {
                var ksObj = {};
                ksObj.name = "setLine#" + i + "." + j;
                ksObj.type = "Model~MdaSetLine~base.sys0";
                var kopts = ksObj.opts = {};
                var setOpts = kopts.setOpts = {};
                setOpts.setType = "inputText";
                setOpts.value = 56;
                setOpts.titleWidth = 200;
                setOpts.title = "title-" + i;
                setOpts.dataType = "int";
                setOpts.checkType = "int";
                setOpts.actButtons = ["inc", "dec", "pad"];
                setOpts.max = 100;
                setOpts.min = 0;
                ksObjs.push(ksObj);
            }
            op.ksObjss.push(ksObjs);
        }
        op.ksObjWs = [9999];
        op.title = "Test mda.setLineBox";
        op.w = 800;
        op.h = 600;
        op.eh = 40;
        op.xm = 4;
        op.ym = 4;
        op.etm = 8;
        op.ebm = 8;
        op.erm = 4;
        op.elm = 4;
        op.eBorderColor = "#ccc";
        op.eBorderWidth = 0;
        op.eBaseColor = "#222";
        KvLib.deepCoverObject(op, _op);
        //=======================================================
        var opts = {};
        opts.title = op.title;
        opts.titleBaseColor = "#004";
        opts.headButtons = ["OK", "ESC"];
        opts.headButtonIds = ["ok", "esc"];
        opts.buttons = op.buttons;
        opts.margin = 4;
        opts.ym = 4;
        opts.actionFunc = function (iobj) {
            console.log(iobj);
            var preChangeFunc = function () {
                var mainMd = iobj.sender.blockRefs["mainMd"];
                for (var key in mainMd.blockRefs) {
                    var strA = key.split("#");
                    if (strA[0] === "setLine") {
                        var strB = strA[1].split(".");
                        var iInx = KvLib.toInt(strB[0], null);
                        var jInx = KvLib.toInt(strB[1], null);
                        if (iInx === null || jInx === null)
                            continue;
                        var setLine = mainMd.blockRefs[key];
                        var errStrs = setLine.mdClass.checkValue(1);
                        if (errStrs) {
                            box.errorBox({kvTexts: errStrs});
                            return errStrs;
                        } else {
                            var ksObj = mainMd.opts.ksObjss[iInx][jInx];
                            ksObj.opts.setOpts.value = setLine.opts.setOpts.value;
                        }
                    }
                }
            };
            if (iobj.act === "expand") {
                var mdaBox = iobj.sender;
                var setLineObj = mdaBox.opts.ksObj.opts.ksObjss[iobj.index][0];
                setLineObj.opts.setOpts.value = 1;
                var setOptsObj = {};
                for (var i = 0; i < mdaBox.opts.ksObj.opts.ksObjss.length; i++) {
                    var setLineObj = mdaBox.opts.ksObj.opts.ksObjss[i][0];
                    setOptsObj[setLineObj.opts.setOpts.title] = setLineObj.opts.setOpts;
                }
                iobj.setOptsObj = setOptsObj;
                iobj.rowStart = mdaBox.opts.ksObj.opts.rowStart;
                KvLib.exeFunc(_op.actionFunc, iobj);
                return;
            }
            if (iobj.act === "collaps") {
                var mdaBox = iobj.sender;
                var setLineObj = mdaBox.opts.ksObj.opts.ksObjss[iobj.index][0];
                setLineObj.opts.setOpts.value = 0;
                var setOptsObj = {};
                for (var i = 0; i < mdaBox.opts.ksObj.opts.ksObjss.length; i++) {
                    var setLineObj = mdaBox.opts.ksObj.opts.ksObjss[i][0];
                    setOptsObj[setLineObj.opts.setOpts.title] = setLineObj.opts.setOpts;
                }
                iobj.setOptsObj = setOptsObj;
                iobj.rowStart = mdaBox.opts.ksObj.opts.rowStart;
                KvLib.exeFunc(_op.actionFunc, iobj);
                return;
            }


            if (iobj.act === "checkPreChange") {
                return preChangeFunc(iobj);
            }
            if (iobj.act === "mouseClick") {
                if (iobj.kvObj.opts.id === "ok") {
                    var errStr = preChangeFunc(iobj);
                    if (errStr)
                        return;
                    var mainMd = iobj.sender.blockRefs["mainMd"];
                    iobj.ksObjss = mainMd.opts.ksObjss;
                    iobj.buttonId = "ok";
                    KvLib.exeFunc(_op.actionFunc, iobj);
                    MdaPopWin.popOffTo(iobj.sender.opts.popStackCnt);
                    return;
                }
                if (iobj.kvObj.opts.id === "esc") {
                    iobj.buttonId = "esc";
                    KvLib.exeFunc(_op.actionFunc, iobj);
                    MdaPopWin.popOffTo(iobj.sender.opts.popStackCnt);
                    return;
                }
            }
        };
        //==============================================
        var ksObj = opts.ksObj = {};
        var kopts = ksObj.opts = {};
        ksObj.name = "mdaContainer";
        ksObj.type = "Model~MdaContainer~base.page";
        kopts.eh = op.eh;
        kopts.xm = op.xm;
        kopts.ym = op.ym;
        kopts.etm = op.etm;
        kopts.ebm = op.ebm;
        kopts.erm = op.erm;
        kopts.elm = op.elm;
        kopts.borderColor = op.eBorderColor;
        kopts.borderWidth = op.eBorderWidth;
        kopts.baseColor = op.eBaseColor;
        kopts.ksObjss = op.ksObjss;
        kopts.ksObjWs = op.ksObjWs;
        //=================
        return {type: "Model~MdaBox~base.sys0", opts: opts};
    }

    blockSelectsBoxOpts(_op) {
        var op = {};
        KvLib.deepCoverObject(op, _op);
        var opts = {};
        opts.title = op.title;
        opts.baseColor = op.baseColor;
        opts.ym = op.ym;
        opts.headButtons = ["ESC"]
        opts.headButtonIds = ["esc"]
        opts.margin = 4;
        //=================
        var ksObj = opts.ksObj = {};
        var kopts = ksObj.opts = {};
        ksObj.name = "mdaContainer";
        ksObj.type = "Model~MdaContainer~base.page";
        kopts.ksObjss = op.ksObjss;
        kopts.ksObjWs = op.ksObjWs;
        kopts.eh = op.eh;
        kopts.xm = op.exm;
        kopts.ym = op.eym;
        opts.actionFunc = function (iobj) {
            console.log(iobj);
            if (iobj.act === "mouseClick") {
                var id = iobj.kvObj.opts.id;
                if (id === "esc") {
                    MdaPopWin.popOff(2);
                    return;
                }
            }
            KvLib.exe(op.actionFunc);
        };
        return {type: "Model~MdaBox~base.sys0", opts: opts};
    }

    containerBoxOpts(_op) {
        var op = {};
        //===
        op.baseColor = "#cce";
        op.containerType = "Model~MdaContainer~base.page";
        op.title = "Container Box";
        op.titleColor = "#000";
        op.titleBaseColor = "#cce";
        //===
        op.ksObjWs = [150, 200, 9999];
        op.rowStart = 0;
        //
        op.margin = 10;
        op.ym = 10;
        op.buttonXm = 20;
        op.headButtons = ["OK", "ESC"];
        op.headButtonIds = ["ok", "ESC"];
        //
        op.listBodyColor = "#cce";
        op.listBorderColor = "#fff";
        op.listBorderWidth = 1;
        //===
        op.eh = 50;
        op.eMargin = 0;
        op.etm = 4;
        op.ebm = 4;
        op.erm = 4;
        op.elm = 4;
        op.exm = 20;
        op.eym = 5;
        //===
        KvLib.deepCoverObject(op, _op);
        //=====================================
        var opts = {};
        opts.title = op.title;
        opts.titleColor = op.titleColor;
        opts.headButtons = op.headButtons;
        opts.headButtonIds = op.headButtonIds;
        opts.buttons = op.buttons;
        opts.buttonIds = op.buttonIds;
        opts.baseColor = op.baseColor;
        opts.buttonXm = op.buttonXm;
        mda.setMargin(opts, op);
        opts.ym = op.ym;
        //=================
        var ksObj = opts.ksObj = {};
        var kopts = ksObj.opts = {};
        ksObj.name = "mdaContainer";
        ksObj.type = op.containerType;
        kopts.eh = op.eh;
        kopts.margin = op.eMargin;
        kopts.etm = op.etm;
        kopts.ebm = op.ebm;
        kopts.erm = op.erm;
        kopts.elm = op.elm;
        kopts.xm = op.exm;
        kopts.ym = op.eym;
        kopts.baseColor = op.listBodyColor;
        kopts.borderColor = op.listBorderColor;
        kopts.borderWidth = op.listBorderWidth;
        kopts.ksObjss = op.ksObjss;
        kopts.ksObjWs = op.ksObjWs;
        kopts.rowStart = op.rowStart;
        //=================
        opts.actionFunc = function (iobj) {
            if (iobj.act === "mouseClick") {
                MdaPopWin.popOffTo(iobj.sender.opts.popStackCnt);
            }
        };
        return {type: "Model~MdaBox~base.sys0", opts: opts};
    }

}
var mac = new Macro();

class KvSetOpts {
    constructor() {
    }

    getLabelViews(op) {
        var setOpts = {};
        setOpts.setType = "labelViews";
        setOpts.enum = ["label1", "label2", "label3"];
        setOpts.enumColors = ["#cfc", "#cfc", "#cfc"];
        setOpts.xm = 4;
        setOpts.lm = 0;
        setOpts.fontSize = 20;
        setOpts.titleFontSize = 20;
        setOpts.titleWidth = 200;
        setOpts.title = "labelViews";
        if (op) {
            KvLib.deepCoverObject(setOpts, op);
        }
        return setOpts;
    }

    getEditView(op) {
        var setOpts = {};
        setOpts.setType = "inputText";
        setOpts.dataType = "int";
        setOpts.checkType = "int";
        setOpts.xm = 4;
        setOpts.lm = 0;
        setOpts.fontSize = 20;
        setOpts.titleFontSize = 20;
        setOpts.titleWidth = 200;
        setOpts.title = "labelViews";
        setOpts.actButtons = ["pad"];
        setOpts.value = "";
        setOpts.readOnly_f = 1;
        if (op) {
            KvLib.deepCoverObject(setOpts, op);
        }
        return setOpts;
    }

    getButtonActs(op) {
        var setOpts = {};
        setOpts.setType = "buttonActs";
        setOpts.enum = ["button1", "button2", "button3"];
        setOpts.xm = 4;
        setOpts.lm = 0;
        setOpts.fontSize = 14;
        setOpts.titleFontSize = 20;
        setOpts.titleWidth = 200;
        setOpts.title = "buttonActs";
        if (op) {
            KvLib.deepCoverObject(setOpts, op);
        }
        return setOpts;
    }

    getButtonOnOffs(op) {
        var setOpts = {};
        setOpts.setType = "buttonOnOffs";
        setOpts.value = 5;
        setOpts.onColor = "#ccf";
        setOpts.onTextColor = "#000";
        setOpts.enum = ["button1", "button2", "button3"];
        setOpts.xm = 4;
        setOpts.lm = 0;
        setOpts.titleFontSize = 20;
        setOpts.fontSize = 14;
        setOpts.titleWidth = 200;
        setOpts.title = "buttonOnOffs";
        if (op) {
            KvLib.deepCoverObject(setOpts, op);
        }
        return setOpts;
    }

    getButtonSelect(op) {
        var setOpts = {};
        setOpts.setType = "buttonSelect";
        setOpts.value = 0;
        setOpts.onColor = "#ddf";
        setOpts.offColor = "#aaa";
        setOpts.onTextColor = "#000";
        setOpts.enum = ["button1", "button2", "button3"];
        setOpts.xm = 4;
        setOpts.lm = 0;
        setOpts.fontSize = 20;
        setOpts.titleFontSize = 20;
        setOpts.titleWidth = 200;
        setOpts.title = "buttonSelect";
        if (op) {
            KvLib.deepCoverObject(setOpts, op);
        }
        return setOpts;
    }

    getButtonChecks(op) {
        var setOpts = {};
        setOpts.setType = "buttonChecks";
        setOpts.value = 5;
        setOpts.onColor = "#ccf";
        setOpts.onTextColor = "#000";
        setOpts.enum = ["button1", "button2", "button3"];
        setOpts.xm = 4;
        setOpts.lm = 0;
        setOpts.fontSize = 24;
        setOpts.titleFontSize = 20;
        setOpts.titleWidth = 200;
        setOpts.title = "buttonChecks";
        return setOpts;
    }

    getButtonRadio(op) {
        var setOpts = {};
        setOpts.setType = "buttonRadio";
        setOpts.value = 0;
        setOpts.enum = ["button1", "button2", "button3"];
        setOpts.radioName = "group1";
        setOpts.xm = 4;
        setOpts.lm = 0;
        setOpts.fontSize = 24;
        setOpts.titleFontSize = 25;
        setOpts.titleWidth = 0;
        if (op) {
            KvLib.deepCoverObject(setOpts, op);
        }
        return setOpts;
    }
    //=====================================
    getOptsPara(para){
        switch(para){
            case "str":
                return sopt.getOptsStr();
            case "int":
                return sopt.getOptsInt();
            case "nature":
                return sopt.getOptsNature();
            case "intStr":
                return sopt.getOptsIntStr();
            case "floatStr":
                return sopt.getOptsFloatStr();
            case "intEnum":
                return sopt.getOptsIntEnum();
            case "strEnum":
                return sopt.getOptsStrEnum();
            default:
                return sopt.getOptsStr();
        }
    }
    
    
    getOptsInt(){
        var setOpts = {};
        setOpts.setType = "inputText";
        setOpts.dataType = "int";
        setOpts.checkType = "int";
        setOpts.actButtons = ["inc","dec","pad"];
        return setOpts;
    }
    
    getOptsIntEnum(){
        var setOpts = {};
        setOpts.setType = "inputText";
        setOpts.dataType = "int";
        setOpts.checkType = "int";
        setOpts.readOnly_f=1;
        setOpts.actButtons = ["pull"];
        return setOpts;
    }
    
    getOptsStrEnum(){
        var setOpts = {};
        setOpts.setType = "inputText";
        setOpts.dataType = "str";
        setOpts.checkType = "str";
        setOpts.readOnly_f=1;
        setOpts.actButtons = ["pull"];
        return setOpts;
    }
    
    getOptsIntStr(op){
        var setOpts = {};
        setOpts.setType = "inputText";
        setOpts.dataType = "str";
        setOpts.checkType = "int";
        setOpts.actButtons = ["inc","dec","pad"];
        return setOpts;
    }

    getOptsFloatStr(){
        var setOpts = {};
        setOpts.setType = "inputText";
        setOpts.dataType = "str";
        setOpts.checkType = "float";
        setOpts.actButtons = ["pad"];
        return setOpts;
    }
    
    
    
    getOptsStr(op){
        var setOpts = {};
        setOpts.setType = "inputText";
        setOpts.dataType = "str";
        setOpts.checkType = "str";
        setOpts.actButtons = ["pad"];
        return setOpts;
    }
    
    getOptsNature(op){
        var setOpts = {};
        setOpts.setType = "inputText";
        setOpts.dataType = "int";
        setOpts.checkType = "int";
        setOpts.min=0;
        setOpts.actButtons = ["inc","dec","pad"];
        return setOpts;
    }
    //====================================
    
    getInputSelect(op) {
        var setOpts = {};
        setOpts.setType = "inputSelect";
        setOpts.dataType = "str";
        setOpts.checkType = "str";
        setOpts.value = "select 1";
        setOpts.titleWidth = 200;
        setOpts.title = "inputSelect";
        setOpts.titleFontSize = 20;
        setOpts.actButtons = ["pull", "pad"];
        setOpts.enum = ["select 1", "select 2", "select 3"];
        if (op) {
            KvLib.deepCoverObject(setOpts, op);
        }
        return setOpts;
    }

    getSelect(op) {
        var setOpts = {};
        setOpts.setType = "select";
        setOpts.value = "select 1";
        setOpts.titleWidth = 200;
        setOpts.title = "select";
        setOpts.titleFontSize = 20;
        setOpts.dataType = "str";
        setOpts.actButtons = ["pull"];
        setOpts.enum = ["select 1", "select 2", "select 3"];
        if (op) {
            KvLib.deepCoverObject(setOpts, op);
        }
        return setOpts;
    }

    getIntInputText(op) {
        var setOpts = {};
        setOpts.setType = "inputText";
        setOpts.dataType = "int";
        setOpts.checkType = "int";
        setOpts.value = 0;
        setOpts.titleWidth = 0;
        setOpts.title = "";
        setOpts.titleFontSize = 20;
        setOpts.min = -100;
        setOpts.max = 100;
        setOpts.actButtons = ["inc", "dec", "pad"];
        if (op) {
            KvLib.deepCoverObject(setOpts, op);
        }
        return setOpts;
    }

    getInputSimple(sop) {
        var setOpts = {};
        setOpts.setType = "inputText";
        setOpts.dataType = "str";
        setOpts.checkType = "str";
        setOpts.value = "";
        setOpts.titleWidth = 0;
        setOpts.title = "";
        setOpts.titleFontSize = 20;
        setOpts.actButtons = [];
        if (sop) {
            KvLib.deepCoverObject(setOpts, sop);
        }
        return setOpts;
    }

    getIntPassword(op) {
        var setOpts = {};
        setOpts.setType = "inputText";
        setOpts.dataType = "str";
        setOpts.checkType = "int";
        setOpts.value = "";
        setOpts.titleWidth = 0;
        setOpts.title = "";
        setOpts.password_f = 1;
        setOpts.checkType = "int";
        setOpts.actButtons = [];
        setOpts.min = 0;
        setOpts.max = 99999999;


        if (op) {
            KvLib.deepCoverObject(setOpts, op);
        }
        return setOpts;
    }

    getInputIntSimple(op) {
        var setOpts = {};
        setOpts.setType = "inputText";
        setOpts.dataType = "int";
        setOpts.checkType = "int";
        setOpts.value = "";
        setOpts.titleWidth = 0;
        setOpts.title = "";
        setOpts.titleFontSize = 20;
        setOpts.actButtons = [];
        if (op) {
            KvLib.deepCoverObject(setOpts, op);
        }
        return setOpts;
    }

    getEditUnit(op) {
        var setOpts = {};
        setOpts.setType = "inputText";
        setOpts.dataType = "int";
        setOpts.checkType = "int";
        setOpts.value = 0;
        setOpts.min = 0;
        setOpts.titleFontSize = 20;
        setOpts.actButtons = [];
        setOpts.unitWidth = 100;
        setOpts.unit = "unit";
        if (op) {
            KvLib.deepCoverObject(setOpts, op);
        }
        return setOpts;
    }

    getTextArea(op) {
        var opts = {};
        var setOpts = {};
        setOpts.setType = "textArea";
        setOpts.value = "content.....";
        setOpts.titleWidth = 0;
        setOpts.dataType = "str";
        setOpts.actButtons = [];
        if (op) {
            KvLib.deepCoverObject(setOpts, op);
        }
        return setOpts;
    }

}
var sopt = new KvSetOpts;

class KvBox {
    constructor() {
    }
    /*
     * 
     * @param {kvTexts:<string array>}
     * @returns null
     */
    warnBox(op) {
        var opts = {};
        opts.title = "Warnning";
        opts.titleBaseColor = "#ff0";
        KvLib.deepCoverObject(opts, op);
        this.mesBox(opts);
    }

    /*
     * 
     * @param {kvTexts:<string array>}
     * @returns null
     */
    errorBox(op) {
        var opts = {};
        opts.title = "Error";
        opts.titleBaseColor = "#f88";
        KvLib.deepCoverObject(opts, op);
        this.mesBoxBase(opts);
    }

    /*
     * 
     * @param {kvTexts:<string array>}
     * @returns null
     */
    okBox(op) {
        var opts = {};
        opts.title = "OK";
        opts.titleBaseColor = "#0f0";
        KvLib.deepCoverObject(opts, op);
        this.mesBoxBase(opts);
    }

    /*
     * 
     * @param {kvTexts:<string array>}
     * @returns {act:"mouseClick",kvObj.name:<buttton id>}
     */
    checkBox(_op) {
        var opts = {};
        opts.title = "Warnning";
        opts.titleBaseColor = "#ff0";
        opts.buttons = ["OK", "ESC"];
        opts.buttonIds = ["ok", "esc"];
        KvLib.deepCoverObject(opts, _op);
        this.mesBoxBase(opts);
    }

    /*
     * 
     * @param {kvTexts:<string array>}
     * @returns null
     */
    mesBox(_op) {
        var opts = {};
        KvLib.deepCoverObject(opts, _op);
        this.mesBoxBase(opts);
    }

    /*
     * 
     * @param {kvTexts:<string array>,...} ref inner opts 
     * @returns {act:"mouseClick",kvObj.name:<buttton id>}
     */
    mesBoxBase(_op) {
        if (gr.mesBoxOn_f)
            return;
        var op = {};
        op.kvTexts = ["This is message1", "This is message2", "This is message2", "This is message2"];
        op.title = "Message";
        op.buttons = ["ESC"];
        op.buttonIds = ["esc"];
        op.titleBaseColor = "#444";
        op.titleColor = "#fff";
        op.buttonXm = 100;
        op.w = 800;
        op.h = 220;
        op.bm = 10;
        op.ym = 10;
        KvLib.deepCoverObject(op, _op);
        op.h = 160 + 40 * op.kvTexts.length;
        if (_op.h)
            op.h = _op.h;
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
            if (iobj.act === "mouseClick") {
                MdaPopWin.popOffTo(iobj.sender.opts.popStackCnt);
                gr.mesBoxOn_f = 0;
                KvLib.exeFunc(_op.actionFunc, iobj);
            }
        };
        var kvObj = new Block("mdaBox", "Model~MdaBox~base.sys0", opts);
        var mesObj = mda.popObj(op.w, op.h, kvObj);
        var bobj = kvObj.blockRefs["esc"];
        gr.mesBoxOn_f = 1;
        bobj.elems["base"].focus();
    }

    /*
     * 
     * @param {color:<default color>}
     * @returns {act:"colorSelected",color:<color>}
     */
    pickColorBox(_op) {
        var op = {};
        op.w = 400;
        op.h = 500;
        op.title = "Set Color";
        op.color = "#000";
        KvLib.deepCoverObject(op, _op);
        //=====================================
        var opts = {};
        opts.title = op.title;
        opts.headButtons = ["OK", "ESC"];
        opts.headButtonIds = ["ok", "esc"];
        opts.buttons = [];
        mda.setMargin(opts, op);
        //=================
        var ksObj = opts.ksObj = {};
        var kopts = ksObj.opts = {};
        ksObj.name = "mdaColorPicker";
        ksObj.type = "Model~MdaColorPicker~base.sys0";
        kopts.color = op.color;

        //=================
        opts.actionFunc = function (iobj) {
            console.log(iobj);
            if (iobj.act === "afterCreate") {
                return;
            }
            if (iobj.act === "colorSelected") {
                KvLib.exeFunc(_op.actionFunc, iobj);
            }
            if (iobj.act === "mouseClick") {
                if (iobj.kvObj.opts.id === "ok") {
                    var mdaBox = iobj.sender;
                    var colorPicker = mdaBox.blockRefs["mainMd"];
                    iobj.act = "colorSelected";
                    iobj.color = colorPicker.mdClass.getColor();
                    KvLib.exeFunc(_op.actionFunc, iobj);
                }
            }
            MdaPopWin.popOffTo(iobj.sender.opts.popStackCnt);
        };
        var kvObj = new Block("mdaBox", "Model~MdaBox~base.sys0", opts);
        mda.popObj(op.w, op.h, kvObj);
    }

    selectPageOkBox(op) {
        var opts = {};
        op.selectEsc_f = 0;
        op.selectAble_f = 1;
        op.selectInx = 0;
        op.headButtons = ["OK", "ESC"];
        op.headButtonIds = ["ok", "ESC"];
        KvLib.deepCoverObject(opts, op);
        this.selectPageBox(opts);
    }

    selectOkBox(op) {
        var opts = {};
        op.selectEsc_f = 0;
        op.selectAble_f = 1;
        op.selectInx = 0;
        op.headButtons = ["OK", "ESC"];
        op.headButtonIds = ["ok", "ESC"];
        op.buttons = [];
        op.buttonIds = [];
        KvLib.deepCoverObject(opts, op);
        this.selectPageBox(opts);

    }

    /*
     * 
     * @param {kvTexts:<stirng array>}
     * @returns {act:"colorSelected",color:<color>}
     */
    selectBox(op) {
        var opts = {};
        opts.headButtons = ["ESC"];
        opts.headButtonIds = ["ESC"];
        opts.buttons = [];
        opts.buttonIds = [];
        KvLib.deepCoverObject(opts, op);
        this.selectPageBox(opts);

    }

    selectPageBox(_op) {
        var op = {};
        op.kvTexts = [];
        for (var i = 0; i < 100; i++)
            op.kvTexts.push("Select " + i);
        op.xc = 2;
        op.w = 800;
        op.h = 600;
        op.margin = 10;
        op.ym = 10;
        op.eh = 35;
        op.exm = 20;
        op.eym = 5;
        op.baseColor = "#222";
        op.buttonXm = 20;
        op.selectAble_f = 0;
        op.selectInx = -1;
        op.selectEsc_f = 1;
        op.viewPage_f = 0;
        op.title = "Selector";
        op.titleBaseColor="#004";
        KvLib.deepCoverObject(op, _op);
        //=====================================
        var opts = {};
        opts.title = op.title;
        opts.titleBaseColor=op.titleBaseColor;
        opts.viewPage_f = op.viewPage_f;
        opts.headButtons = op.headButtons;
        opts.headButtonIds = op.headButtonIds;
        opts.buttons = op.buttons;
        opts.buttonIds = op.buttonIds;
        opts.buttonXm = op.buttonXm;
        opts.baseColor = op.baseColor;
        opts.ym = op.ym;
        mda.setMargin(opts, op);
        //=================
        var ksObj = opts.ksObj = {};
        var kopts = ksObj.opts = {};
        ksObj.name = "mdaSelector";
        ksObj.type = "Model~MdaSelector~base.sys0";
        kopts.margin = 0;
        kopts.baseColor = op.baseColor;
        kopts.xc = op.xc;
        kopts.xm = op.exm;
        kopts.ym = op.eym;
        kopts.eh = op.eh;
        kopts.selectAble_f = op.selectAble_f;
        kopts.selectEsc_f = op.selectEsc_f;
        kopts.selectInx = op.selectInx;
        kopts.kvTexts = op.kvTexts;
        //=================
        opts.actionFunc = function (iobj) {
            console.log(iobj);
            if (iobj.act === "selected") {
                KvLib.exeFunc(_op.actionFunc, iobj);
                //MdaPopWin.popOffTo(iobj.sender.opts.popStackCnt);
                return;
            }
            if (iobj.act === "mouseClick") {
                if (iobj.kvObj.opts.id === "ok") {
                    KvLib.exeFunc(_op.actionFunc, iobj);
                }
                MdaPopWin.popOffTo(iobj.sender.opts.popStackCnt);
            }
        };
        var kvObj = new Block("mdaBox", "Model~MdaBox~base.sys0", opts);
        mda.popObj(op.w, op.h, kvObj);
    }

    intPadBox(_op) {
        var op = {};
        op.setOpts = sopt.getIntInputText();
        KvLib.deepCoverObject(op, _op);
        op.headButtons = ["ESC"];
        op.headButtonIds = ["esc"];
        this.intHexPadBox(op);
    }

    hexPadBox(_op) {
        var op = {};
        op.setOpts = dsc.optsCopy.hex;
        KvLib.deepCoverObject(op, _op);
        op.headButtons = ["ESC"];
        op.headButtonIds = ["esc"];
        this.intHexPadBox(op);
    }

    colorPadBox(_op) {
        var op = {};
        op.modelType = "Model~MdaPad~base.sys0";
        KvLib.deepCoverObject(op, _op);
        this.intHexPadBox(op);
    }

    floatPadBox(_op) {
        var op = {};
        op.setOpts = dsc.optsCopy.float;
        KvLib.deepCoverObject(op, _op);
        op.headButtons = ["ESC"];
        op.headButtonIds = ["esc"];
        this.intHexPadBox(op);
    }

    intHexPadBox(_op) {
        var op = {};
        op.title = "InputTitle";
        op.headButtons = ["Dec", "Hex", "ESC"];
        op.headButtonIds = ["dec", "hex", "esc"];
        op.headButtonWidthes = [100, 100, 100];
        op.titleBaseColor = "#004";
        op.buttonXm = 100;
        op.w = 600;
        op.h = 400;
        op.setOpts={};
        KvLib.deepCoverObject(op.setOpts, dsc.optsCopy.int);
        KvLib.deepCoverObject(op, _op);
        //=====================================
        if (op.setOpts.setType === "textArea")
            op.h = 600;
        else
            op.h = 400;
        var opts = {};
        opts.title = op.title;
        opts.titleColor = "#000";
        opts.titleBaseColor = op.titleBaseColor;
        opts.headButtons = op.headButtons;
        opts.headButtonIds = op.headButtonIds;
        opts.headButtonWidthes = op.headButtonWidthes;
        opts.buttons = [];
        mda.setMargin(opts, op);
        opts.ym = op.ym;
        //=================
        var ksObj = opts.ksObj = {};
        ksObj.name = "mdaPad";
        ksObj.type = "Model~MdaPad~base.sys0";
        var kopts = ksObj.opts = {};
        kopts.setOpts = op.setOpts;
        opts.actionFunc = function (iobj) {
            console.log(iobj);
            if (iobj.act === "afterCreate") {
                var kvObj = iobj.sender;
                var decBut = kvObj.blockRefs["headButton#0"];
                if (decBut.opts.innerText !== "Dec") {
                    return;
                }
                Block.setInputWatch(decBut.opts, "directName", "self.fatherMd.opts.decButColor", "baseColor", 1);
                var hexBut = kvObj.blockRefs["headButton#1"];
                Block.setInputWatch(hexBut.opts, "directName", "self.fatherMd.opts.hexButColor", "baseColor", 1);
                if (kvObj.opts.ksObj.opts.setOpts.checkType === "hex") {
                    kvObj.opts.decButColor = "#ccc";
                    kvObj.opts.hexButColor = "#aaf";
                } else {
                    kvObj.opts.decButColor = "#aaf";
                    kvObj.opts.hexButColor = "#ccc";
                }
                return;
            }
            if (iobj.act === "pressEnter") {
                var md = iobj.sender;
                var mdaPad = md.blockRefs["mainMd"];
                var setLine = mdaPad.blockRefs["lcd"];
                var errStr = setLine.mdClass.checkValue(1);
                if (errStr) {
                    box.errorBox({kvTexts: [errStr]});
                    return;
                }
                MdaPopWin.popOff(2);
                
            }
            if (iobj.act === "escape") {
                MdaPopWin.popOff(2);
                return;

            }
            if (!iobj.kvObj)
                return;
            var id = iobj.kvObj.opts.id;
            if (id === "esc") {
                MdaPopWin.popOff(2);
                return;
            }
            var md = iobj.sender;
            var mdaPad = md.blockRefs["mainMd"];
            var setLine = mdaPad.blockRefs["lcd"];
            var inputObj = setLine.blockRefs["inputText"];
            var inputElem = inputObj.elems["inputText"];
            var valueStr = inputElem.value;
            if (id === "hexDec") {
                if (iobj.sender.opts.ksObj.opts.setOpts.checkType !== "hex") {
                    iobj.sender.opts.ksObj.opts.setOpts.checkType = "hex";
                    iobj.sender.opts.ksObj.opts.setOpts.actButtons = [];
                    var kvObj = iobj.sender.reCreate();
                    var mdaPad = kvObj.blockRefs["mainMd"];
                    mdaPad.mdClass.intHexConvert(valueStr, 1);
                } else {
                    iobj.sender.opts.ksObj.opts.setOpts.checkType = "int";
                    iobj.sender.opts.ksObj.opts.setOpts.actButtons = ["inc", "dec"];
                    var kvObj = iobj.sender.reCreate();
                    var mdaPad = kvObj.blockRefs["mainMd"];
                    mdaPad.mdClass.intHexConvert(valueStr, 0);
                }

                return;
            }

            if (id === "dec") {
                if (iobj.sender.opts.ksObj.opts.setOpts.checkType !== "int") {
                    iobj.sender.opts.ksObj.opts.setOpts.checkType = "int";
                    iobj.sender.opts.ksObj.opts.setOpts.actButtons = ["inc", "dec"];
                    var kvObj = iobj.sender.reCreate();
                    var mdaPad = kvObj.blockRefs["mainMd"];
                    mdaPad.mdClass.intHexConvert(valueStr, 0);
                }
                return;
            }
            if (id === "hex") {
                if (iobj.sender.opts.ksObj.opts.setOpts.checkType !== "hex") {
                    iobj.sender.opts.ksObj.opts.setOpts.checkType = "hex";
                    iobj.sender.opts.ksObj.opts.setOpts.actButtons = [];
                    var kvObj = iobj.sender.reCreate();
                    var mdaPad = kvObj.blockRefs["mainMd"];
                    mdaPad.mdClass.intHexConvert(valueStr, 1);
                }
                return;
            }


            KvLib.exeFunc(_op.actionFunc, iobj);
            //MdaPopWin.popOff(2);
        };
        var kvObj = new Block("mdaBox", "Model~MdaBox~base.sys0", opts);
        mda.popObj(op.w, op.h, kvObj);
    }

    strPadBox(_op) {
        var op = {};
        op.kvTexts = ["This is message1", "This is message2"];
        op.title = "InputTitle";
        op.headButtons = ["ESC"];
        op.headButtonIds = ["esc"];
        op.headButtonWidthes = [100, 100];
        op.titleBaseColor = "#444";
        op.buttonXm = 100;
        op.modelType = "Model~MdaPad~base.sys0";
        if (_op.setOpts.setType === "textArea")
            op.h = 600;
        else
            op.h = 400;
        op.value = "";
        KvLib.deepCoverObject(op, _op);
        //=====================================
        var opts = {};
        opts.title = op.title;
        opts.titleColor = "#000";
        opts.titleBaseColor = op.titleBaseColor;
        opts.headButtons = op.headButtons;
        opts.headButtonIds = op.headButtonIds;
        opts.headButtonWidthes = op.headButtonWidthes;
        opts.buttons = [];
        mda.setMargin(opts, op);
        opts.ym = op.ym;
        //=================
        var ksObj = opts.ksObj = {};
        ksObj.name = "mdaPad";
        ksObj.type = op.modelType;
        var kopts = ksObj.opts = {};
        var setOpts = kopts.setOpts = {};
        kopts.setOpts = op.setOpts;
        opts.actionFunc = function (iobj) {
            console.log(iobj);
            var actionEnter = function () {
                var md = iobj.sender;
                var mdaPad = md.blockRefs["mainMd"];
                var setLine = mdaPad.blockRefs["lcd"];
                var errStr = setLine.mdClass.checkValue(1);
                if (errStr) {
                    box.errorBox({kvTexts: [errStr]});
                    return;
                }
                MdaPopWin.popOff(2);
                KvLib.exeFunc(op.actionFunc, iobj);
                return;

            };

            if (iobj.act === "pressEnter") {
                actionEnter(iobj);
                return;
            }
            if (iobj.act === "escape") {
                MdaPopWin.popOff(2);
                return;
            }
            if (!iobj.kvObj)
                return;
            var id = iobj.kvObj.opts.id;
            if (id === "esc") {
                MdaPopWin.popOff(2);
                return;
            }
            if (id === "enter") {
                actionEnter(iobj);
                return;
            }
        };
        var kvObj = new Block("mdaBox", "Model~MdaBox~base.sys0", opts);
        mda.popObj(op.w, op.h, kvObj);
    }

    keyboardBox(_op) {
        var op = {};
        op.kvTexts = ["This is message1", "This is message2"];
        op.title = "InputTitle";
        op.buttonXm = 100;
        if (_op.setOpts.setType === "textArea")
            op.h = 700;
        else
            op.h = 500;
        op.w = gr.clientW - 10;
        op.setOpts = dsc.optsCopy.str;
        KvLib.deepCoverObject(op, _op);
        //=====================================
        var opts = {};
        opts.title = op.title;
        opts.titleColor = "#000";
        opts.titleBaseColor = "#444";
        opts.headButtons = ["OK", "ESC"];
        opts.headButtonIds = ["OK", "ESC"];
        opts.headButtonWidthes = [100, 100];
        opts.buttons = [];
        mda.setMargin(opts, op);
        opts.ym = op.ym;
        //opts.eh = op.kvTexts.length * 40;
        //=================
        var ksObj = opts.ksObj = {};
        ksObj.name = "mdaPad";
        ksObj.type = "Model~MdaPad~base.sys0";
        var kopts = ksObj.opts = {};
        var setOpts = kopts.setOpts = {};
        kopts.setOpts = op.setOpts;
        opts.actionFunc = function (iobj) {
            console.log(iobj);
            if (iobj.act === "afterCreate") {
                return;
            }
            if (iobj.act === "pressEnter") {
                var md = iobj.sender;
                var mdaPad = md.blockRefs["mainMd"];
                var setLine = mdaPad.blockRefs["lcd"];
                var errStr = setLine.mdClass.checkValue(1);
                if (errStr) {
                    box.errorBox({kvTexts: [errStr]});
                    return;
                }
            }
            if (iobj.act === "escape") {
                MdaPopWin.popOff(2);
                return;

            }
            if (!iobj.kvObj)
                return;
            var id = iobj.kvObj.opts.id;
            if (iobj.act === "checkPreChange") {
                return;
            }
            if (id === "esc") {
                MdaPopWin.popOff(2);
                return;
            }
            if (id === "ok") {
                var md = iobj.sender;
                var mdaPad = md.blockRefs["mainMd"];
                var setLine = mdaPad.blockRefs["lcd"];
                var errStr = setLine.mdClass.checkValue(1);
                if (errStr) {
                    box.errorBox({kvTexts: [errStr]});
                    return;
                }
                iobj.buttonId = "enter";
                iobj.inputText = setLine.opts.setOpts.value;
                KvLib.exeFunc(_op.actionFunc, iobj);
                MdaPopWin.popOff(2);
                return;
            }
            KvLib.exeFunc(_op.actionFunc, iobj);
            MdaPopWin.popOff(2);
        };
        var kvObj = new Block("mdaBox", "Model~MdaBox~base.sys0", opts);
        mda.popObj(op.w, op.h, kvObj);
    }

    containerFreeBox(op) {
        var opts = {};
        opts.containerType = "Model~MdaContainer~base.free";
        opts.title = "Object Free Table";
        op.ksObjWs = [150, 200, 300, 400];
        KvLib.deepCoverObject(opts, op);
        var obj = mac.containerBoxOpts(opts);
        var kvObj = new Block("containerPgeBox", obj.type, obj.opts);
        return mda.popObj(opts.w, opts.h, kvObj);
    }

    containerTableBox(op) {
        var opts = {};
        opts.containerType = "Model~MdaContainer~base.table";
        opts.title = "Container Table Box";
        op.ksObjWs = [150, 200, 300, 400];
        KvLib.deepCoverObject(opts, op);
        var obj = mac.containerBoxOpts(opts);
        var kvObj = new Block("containerPgeBox", obj.type, obj.opts);
        return mda.popObj(opts.w, opts.h, kvObj);
    }

    containerPageBox(op) {
        var opts = {};
        opts.containerType = "Model~MdaContainer~base.page";
        opts.title = "Container Page Page";
        op.ksObjWs = [150, 200, 9999];
        KvLib.deepCoverObject(opts, op);
        var obj = mac.containerBoxOpts(opts);
        var kvObj = new Block("containerPgeBox", obj.type, obj.opts);
        return mda.popObj(opts.w, opts.h, kvObj);
    }

    setOptsBox(_op) {
        _op.setOptsObj = dsc.optsBase;
        var setOptsFunc = function (setOptss) {
            var nowGroup = "";
            var ksObjss = [];
            var i = 0;
            for (var objKey in setOptss) {
                var ksObjs = [];
                var ksObj = {};
                ksObj.name = "setLine#" + i + "." + 0;
                ksObj.type = "Model~MdaSetLine~base.sys0";
                var kopts = ksObj.opts = {};
                var setOpts = kopts.setOpts = setOptss[objKey];
                if (setOpts.setType === "group") {
                    nowGroup = setOpts.group;
                    if (setOpts.value)
                        nowGroup = "";
                } else {
                    if (setOpts.group !== nowGroup)
                        nowGroup = "";
                    else
                        continue;
                }
                setOpts.title = objKey;
                setOpts.titleWidth = 300;
                setOpts.iconWidth = 25;
                //setOpts.noWidth = 25;
                setOpts.expandWidth = 30;
                setOpts.no = "" + (i + 1);
                setOpts.titleFontSize = 16;
                ksObjs.push(ksObj);
                ksObjss.push(ksObjs);
                i++;
            }
            return ksObjss;


        };
        var opts = {};
        opts.eh = 30;
        opts.etm = 1;
        opts.ebm = 1;
        opts.erm = 1;
        opts.elm = 1;
        opts.xm = 0;
        opts.ym = 1;
        opts.setOptsObj = {};
        KvLib.deepCoverObject(opts, _op);
        opts.ksObjss = setOptsFunc(opts.setOptsObj);
        opts.actionFunc = function (iobj) {
            console.log(iobj);
            if (iobj.act === "expand" || iobj.act === "collaps") {
                var mdaBox = iobj.sender;
                //mdaBox.opts.ksObjss=setOptsFunc(iobj.setOptsObj);
                KvLib.deepCoverObject(opts.setOptsObj, iobj.setOptsObj);
                mdaBox.opts.ksObj.opts.ksObjss = setOptsFunc(opts.setOptsObj);
                var rowStart = mdaBox.blockRefs["mainMd"].stas.rowStart;
                mdaBox.opts.ksObj.opts.rowStart = rowStart;
                mdaBox.reCreate();
            }
        };
        mda.setLineBox(opts);
    }

    setLineBox(_op)
    {
        var obj = mac.setLineBoxOpts(_op);
        var kvObj = new Block("setLineBox", obj.type, obj.opts);
        mda.popObj(_op.w, _op.h, kvObj);
    }

}
var box = new KvBox();

