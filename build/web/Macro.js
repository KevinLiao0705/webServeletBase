
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
        op.height = 160;
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
            mda.setLineBox(opts);
        };
        var loginPage = new Block("loginPage", "Model~MdaBase~base.sys0", opts);
        return loginPage;
    }

}
var mac = new Macro();



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
        op.titleBaseColor = "#ccf";
        op.titleColor = "#000";
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
            MdaPopWin.popOffTo(iobj.sender.opts.popStackCnt);
            gr.mesBoxOn_f = 0;
            KvLib.exeFunc(_op.actionFunc, iobj);
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
        op.baseColor = "#cce";
        op.buttonXm = 20;
        op.selectAble_f = 0;
        op.selectInx = -1;
        op.selectEsc_f = 1;
        op.viewPage_f = 0;
        op.title = "Selector";
        KvLib.deepCoverObject(op, _op);
        //=====================================
        var opts = {};
        opts.title = op.title;
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
                MdaPopWin.popOffTo(iobj.sender.opts.popStackCnt);
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

}
var box = new KvBox();

