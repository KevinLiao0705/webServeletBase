/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/* global gr, KvLib, Kext, Component, ani, MyPlot, InitOpts */

//################################################################################
class MySystem {
    constructor() {
        this.baseTimerCnt = 0;
        this.baseTimerBuf = 0;
        this.baseTimerFlag = 0;
        this.sysTimerCnt = 0;
        this.sysTimerBuf = 0;
        this.sysTimerFlag = 0;
        this.sysTimerNow = 0;
        this.secCnt = 0;
        this.hintKvObj = null;
    }

    webInit() {
        var gr = window.gr;
        var elem = document.getElementById('rootBody');
        //===========================================================
        elem.style.width = gr.clientW + 'px';
        elem.style.height = gr.clientH + 'px';
        elem.innerHTML = "";
        //============================================================
        var elemPop = document.getElementById("rootBody");
        elemPop.innerHTML = "";
        gr.mouseFuncPara = null;
        //============================================================
        gr.scrollWidth = KvLib.getScrollbarWidth();
        //=======================================================


    }

    static saveParas(callBack) {
        var str = "{\n";
        var keys = Object.keys(gr.paraSet);
        for (var i = 0; i < keys.length; i++) {
            if (i === 0)
                str += " ";
            else
                str += ",";
            str += "\"" + keys[i] + "\" : ";
            if (Array.isArray(gr.paraSet[keys[i]])) {
                var ary = gr.paraSet[keys[i]];
                str += "[\n";
                for (var j = 0; j < ary.length; j++) {
                    if (j === 0)
                        str += "     ";
                    else
                        str += "    ,";
                    str += "\"" + ary[j] + "\"\n";
                }
                str += "    ]\n";
            } else {
                str += "\"" + gr.paraSet[keys[i]] + "\"\n";
            }
        }
        str += "}\n";
        if (callBack)
            Test.server_saveStringToFile("response error", "exeCallBackFunc", str, "user-" + gr.systemName + "/paraSet.json");
        else
            Test.server_saveStringToFile("response error", "", str, "user-" + gr.systemName + "/paraSet.json");
    }

    dispWebPage(pageName) {
        var self = this;
        let gr = window.gr;
        //gr.webPage = "josnPage";
        if (pageName)
            gr.webPage = pageName;
        else
            gr.webPage = gr.systemName + "Page";
        self.webInit();
        console.log("gr.webPage= " + gr.webPage);
        var page = gr.webPage;
        if (gr.showLogo_f) {
            page = "showLogo";
        }
        switch (page) {
            case "showLogo":
                gr.mdMain = new Block("test", "Model~MdaMdTest~base.sys0", {}, {});
                //gr.mdMain = new Block("test", "Model~Mda_debug~base.sys0", {}, {});
                gr.mdMain.create("rootBody");
                break;


                gr.mdMain = new Model("showLogo", "Md_logoBox~sys", {}, {});
                gr.mdMain.build();
                gr.mdMain.create("rootBody");
                break;


                gr.mdMain = new Model("showLogo", "Md_logoBox~sys", {}, {});
                gr.mdMain.build();
                gr.mdMain.create("rootBody");
                break;
            case "loginBox":
                gr.mdMain = new Model("loginBox", "Md_loginBox~sys", {}, {});
                gr.mdMain.build();
                gr.mdMain.create("rootBody");
                break;
            case "webFramePage":
                gr.mdMain = new Model("mdTest", "Md_test~a", {}, {});
                gr.mdMain.build();
                gr.mdMain.create("rootBody");
                break;
            case "syncPage":
                opts = {};
                opts.pageInx = 0;
                opts.engMode_f = 0;
                gr.mdMain = new Model("mdSync", "Md_sync~sys", opts, {});
                gr.mdMain.build();
                gr.mdMain.create("rootBody");
                break;
            case "webIcsPage":
                opts = {};
                opts.pageInx = 0;
                opts.engMode_f = 0;
                gr.mdMain = new Model("mdWebIcs", "Md_webIcs~sys", opts, {});
                gr.mdMain.build();
                gr.mdMain.create("rootBody");
                break;
            case "futuresPage":
                gr.mdMain = new Model("mdFutures", "Md_futures~sys", {}, {});
                gr.mdMain.build();
                gr.mdMain.create("rootBody");
                break;
            case "keyboardOledPage":
                var modelSet = "Model";
                var templateSet = "Md_keyboardOled";
                var typeSet = mac.getSaveType(modelSet, templateSet);
                var opts = {};
                opts.keyMode = 0;
                opts.typeSet = typeSet;
                opts.nowPage = 0;
                gr.mdMain = new Model("mdKeyboardOled", "Md_keyboardOled~" + typeSet, opts, {});
                gr.mdMain.build();
                gr.mdMain.create("rootBody");
                break;



        }
        gr.mdSystem = new Block("mdSystem", "Model~MdaPopWin~sys0", {});
        gr.mdSystem.create("rootBody", -1000, -1000, 0,0);


    }

    repaint(para)
    {
        var self = this;
        var gr = window.gr;
        var repaint_f = gr.repaint_f;
        gr.repaint_f = 0;
        while (1) {
            if (gr.window_innerWidth_old !== window.innerWidth)
            {
                gr.window_innerWidth_old = window.innerWidth;
                repaint_f = 1;
                console.log("window.innerWidth change");
            }
            if (gr.window_innerHeight_old !== window.innerHeight)
            {
                gr.window_innerHeight_old = window.innerHeight;
                repaint_f = 1;
                console.log("window.innerHeight change");
            }
            if (gr.window_innerHeight_old === -1 || gr.window_innerWidth_old === -1)
                repaint_f = 0;
            break;
        }
        gr.clientH = window.innerHeight - 1;
        gr.clientW = window.innerWidth - 1;
        //======================================================
        if (para === 1)
            repaint_f = 1;
        if (repaint_f !== 0)
            self.dispWebPage();

    }

    //period= Animate.period, unit: ms, about 16ms.
    baseTimer() {
        var self = window.sys;
        self.baseTimerCnt++;
        self.baseTimerFlag = self.baseTimerCnt ^ self.baseTimerBuf;
        self.baseTimerBuf = self.baseTimerCnt;
        if (self.baseTimerFlag & 0x10)
            gr.flash_f ^= 1;
        if (gr.flash_f)
            gr.flashColor0 = "#fff";
        else
            gr.flashColor0 = "#000";

        var nowTime = performance.now();
        var deltaTime = nowTime - self.sysTimerNow;
        self.sysTimerNow = nowTime;
        if (deltaTime > 30)
            console.log("baseTimer Over 30ms: " + deltaTime.toFixed(2));
        //=================
        self.repaint(0);
        if (gr.mdMain) {
            gr.mdMain.chkWatch();
        }
        if (gr.mdSystem)
            gr.mdSystem.chkWatch();
        self.checkMessage();
        ani.check();
        if (this.hintKvObj) {
            var elem = document.getElementById(this.hintKvObj);
            if (!elem) {
                self.delKvHint();
            }
        }
    }

    sysTimer() {
        var self = window.sys;
        self.sysTimerCnt++;
        self.sysTimerFlag = self.sysTimerCnt ^ self.sysTimerBuf;
        self.sysTimerBuf = self.sysTimerCnt;
        if (self.sysTimerFlag & 0x10)
            gr.flash_f ^= 1;
        var nowTime = performance.now();
        var deltaTime = nowTime - self.sysTimerNow;
        self.sysTimerNow = nowTime;
        if (deltaTime > 30)
            console.log(deltaTime.toFixed(2));
        //if (gr.ws)
        //    gr.ws.send("testData");
    }

    setKvHint(kvObj, hint) {
        var len = ani.animates.length;
        for (var i = len - 1; i >= 0; i--) {
            var aobj = ani.animates[i];
            if (aobj.elemId === "hintId") {
                ani.animates.splice(i, 1);
            }
        }
        var elem = kvObj.elems["base"];
        if (!elem)
            return;
        var pos = KvLib.getPosition(elem);
        var size = KvLib.hint(hint, -9999, pos.y);
        this.hintKvObj = kvObj.elems["base"].id;
        size.w += 4;

        var stx = pos.x + kvObj.stas.rw - size.w;
        var endx = stx + size.w;
        if ((endx + size.w) > gr.clientW) {
            stx = pos.x;
            endx = stx - size.w;
        }

        ani.setT("hintId", "moveX", endx, endx, 200, 1000);
        ani.setT("hintId", "opacity", 0, 1, 200, 1000);
    }
    delKvHint() {
        var hint = document.getElementById("hintId");
        if (hint) {
            document.body.removeChild(hint);
        }
        this.hintKvObj = null;
    }

    checkMessage() {
        if (!gr.messageKobj)
            return;
        var chg = 0;
        if (gr.messageKobj.opts.innerText !== gr.message) {
            gr.messageKobj.opts.innerText = gr.message;
            chg = 1;
        }
        if (gr.messageKobj.opts.innerTextColor !== gr.messageColor) {
            gr.messageKobj.opts.innerTextColor = gr.messageColor;
            chg = 1;
        }
        if (!chg)
            return;
        var self = this;
        self.setMessageBar(gr.messageKobj, gr.message, gr.messageColor, gr.messageTime);

    }

    setMessage(mes, color, time) {
        if (!color)
            color = "#000";
        if (!time)
            time = 0;
        gr.message = mes;
        gr.messageColor = color;
        gr.messageTime = time;
    }

    indexLoaded() {
        //InitOpts.initModelOpts();
        //InitOpts.initComponentOpts();
        //MyPlot.init();
        var elem = document.getElementById("rootBody");
        elem.style.position = "absolute";
        elem.style.overflow = "hidden";
        elem.style.backgroundColor = gr.baseColor;
        elem.style.left = "0px";
        elem.style.top = "0px";
        elem.style.width = window.innerWidth + "px";
        elem.style.height = window.innerHeight + "px";
        ani.setTimer();
        //gr.googleMapKeys = ["AIzaSyDOlTL0xvlXJGN1gnqcV4zxEPhQW5rmd8Q"];
        for (let k = 0; k < gr.googleMapKeys.length; k++) {
            var script = document.createElement('script');
            //script.src = "https://maps.googleapis.com/maps/api/js?key=" + gr.googleMapKeys[k];//AIzaSyDOlTL0xvlXJGN1gnqcV4zxEPhQW5rmd8Q
            script.src = "https://maps.googleapis.com/maps/api/js?key=" + gr.googleMapKeys[k] + "&callback=initMap";
            document.head.appendChild(script); //or something of the likes            
        }
        //gr.sysTimerId = setInterval(sys.sysTimer, 20);
    }

    setIpObj(type, inputName, optName) {
        var ipObj = {};
        ipObj.type = type;
        ipObj.inputName = inputName;
        ipObj.optName = optName;
        ipObj.period = 1;
        ipObj.cnt = 0;
        return ipObj;
    }

    setWatch(self, optsName, value) {
        //self.watch["_sysReDraw_f"] = 1;
        if (optsName !== "innerText")
            self.watch["_sysReDraw_f"] = 1;
        self.watch[optsName] = 1;
        if (value !== undefined)
            self.opts[optsName] = value;
    }
    setReDraw(self, optsName, value) {
        self.watch["_sysReDraw_f"] = 1;
        if (!optsName)
            return;
        self.watch[optsName] = 1;
        if (value !== undefined)
            self.opts[optsName] = value;
    }

    setInputWatch(opts, type, regName, optName, redraw_f) {
        var ipObj = {};
        ipObj.cnt = 0;
        ipObj.period = 1;
        ipObj.type = type;
        ipObj.inputName = regName;
        ipObj.optName = optName;
        ipObj.redraw_f = redraw_f;
        opts.inputRegs.push(ipObj);
    }

    inputWatch(self) {
        for (var i = 0; i < self.opts.inputRegs.length; i++) {
            var ipObj = self.opts.inputRegs[i];
            ipObj.cnt++;
            if (ipObj.cnt < ipObj.period)
                continue;
            ipObj.cnt = 0;
            if (ipObj.type === "directName") {

                if (ipObj.inputName === "self.fatherMd.fatherMd.opts.icsDatas.sipData0.sipStatus") {
                    var obj = self.fatherMd.fatherMd.opts.icsDatas.sipData0.sipStatus;
                    var uu = 0;

                }


                var value;
                var str = "value=" + ipObj.inputName;
                try {
                    eval(str);
                } catch (except) {
                    continue;
                }
                if (Array.isArray(value)) {
                    if (value.length === self.opts[ipObj.optName].length) {
                        for (var j = 0; j < value.length; j++) {
                            if (self.opts[ipObj.optName][j] !== value[j]) {
                                if (ipObj.redraw_f) {
                                    sys.setReDraw(self, ipObj.optName, value);
                                } else {
                                    sys.setWatch(self, ipObj.optName, value);
                                }
                                break;
                            }
                        }
                    }
                } else {
                    if (self.opts[ipObj.optName] !== value) {
                        if (ipObj.redraw_f) {
                            sys.setReDraw(self, ipObj.optName, value);
                        } else {
                            sys.setWatch(self, ipObj.optName, value);
                        }
                    }
                }
                continue;
            }
            if (ipObj.type === "fatherOpts") {
                var value;
                var strA = ipObj.inputName.split("#");
                if (strA.length === 1) {
                    value = self.fatherMd.opts[ipObj.inputName];
                }
                if (strA.length === 2) {
                    value = self.fatherMd.opts[strA[0]][parseInt(strA[1])];
                }
                if (self.opts[ipObj.optName] !== value) {
                    sys.setWatch(self, ipObj.optName, value);
                }
                continue;
            }

            if (ipObj.type === "fatherStas") {
                if (ipObj.inputName === "limitHighs#0") {
                    gr.syncTmp.uu = {};
                    var uu = 0;

                }
                var value;
                var strA = ipObj.inputName.split("#");
                if (strA.length === 1) {
                    value = self.fatherMd.stas[ipObj.inputName];
                }
                if (strA.length === 2) {
                    value = self.fatherMd.stas[strA[0]][parseInt(strA[1])];
                }
                if (self.opts[ipObj.optName] !== value) {
                    sys.setWatch(self, ipObj.optName, value);
                }
                continue;
            }




        }
    }

    checkWatch(self) {
        if (self.watch["_sysReDraw_f"]) {
            if (!self.stas.fhid) {
                self.watch = {};
                return;
            }
            var child = document.getElementById(self.kid);
            var parent = document.getElementById(self.stas.fhid);
            if (!parent || !child) {
                self.watch = {};
                return;
            }
            self.watch = {};
            parent.removeChild(child);
            var fhid = self.stas.fhid;
            var x = self.stas.fx;
            var y = self.stas.fy;
            var w = self.stas.fw;
            var h = self.stas.fh;
            self.build();
            self.create(fhid, x, y, w, h);
            self.watch = {};
            return;
        }
    }
    setMessageBar(self, mes, color, msTime) {
        if (!self)
            return;
        sys.setWatch(self, "innerText", mes);
        sys.setWatch(self, "innerTextColor", color);
        if (msTime === 0)
            return;
        var timePrg = function () {
            sys.setWatch(self, "innerText", "");
            sys.setWatch(self, "innerTextColor", "#000");
            gr.message = "";
            gr.messageColor = "#000";
        };
        clearTimeout(gr.messageTimerId);
        gr.messageTimerId = setTimeout(timePrg, msTime);
    }

    mesBox(title, width, mes, buttons, func) {
        var iobj = {};
        var strA = title.split("~");
        if (strA.length === 2) {
            iobj.title = strA[1];
        } else {
            iobj.title = null;
        }
        switch (strA[0]) {
            case "cy":
                iobj.titleColor = "#ff0";
                break;
            case "ca":
                iobj.titleColor = "#ccc";
                break;
            case "cr":
                iobj.titleColor = "#f00";
                break;
            case "cg":
                iobj.titleColor = "#0f0";
                break;
            default:
                iobj.title = title;
                iobj.titleColor = "#ccc";
                break;
        }
        iobj.messages = [mes];
        iobj.actionFunc = func;
        if (buttons)
            iobj.buttons = buttons;
        else
            iobj.buttons = ["ESC"];
        iobj.width = width;
        this.messageBox(iobj);
    }

    loginBox(retFunc) {
        var opts = {};
        opts.actionFunc = retFunc;
        var mod = new Model("", "Md_loginBox~sys", opts, {});
        var opts = {};
        opts.kvObj = mod;
        opts.w = 800;
        opts.h = 210;
        opts.shadow_f = 1;
        opts.center_f = 1;
        gr.mdSystem.mdClass.popMaskOn({});
        gr.mdSystem.mdClass.popOn(opts);
    }

    messageBox(iobj) {
        if (!iobj.width)
            iobj.width = 700;
        if (!iobj.buttons)
            iobj.buttons = ["ESC"];
        var opts = {};
        opts.messages = iobj.messages;
        opts.buttons = iobj.buttons;
        opts.title = iobj.title;
        opts.titleColor = iobj.titleColor;
        opts.actionFunc = iobj.actionFunc;
        var mod = new Model("", "Md_messageBox~sys", opts, {});
        var itemHeight = 30;
        var hh = mod.opts.titleHeight + mod.opts.buttonHeight;
        hh += mod.opts.tm + mod.opts.bm;
        hh += mod.opts.messages.length * itemHeight;
        hh += 4;
        var opts = {};
        opts.kvObj = mod;
        opts.w = iobj.width;
        opts.h = hh;
        opts.shadow_f = 1;
        opts.center_f = 1;
        gr.mdSystem.mdClass.popMaskOn({});
        gr.mdSystem.mdClass.popOn(opts);
    }

    processBox(iobj) {
        if (!iobj.width)
            iobj.width = 700;
        if (!iobj.buttons)
            iobj.buttons = ["STOP"];
        var opts = {};
        opts.title = iobj.title;
        opts.progressNames = iobj.progressNames;
        opts.progressValues = iobj.progressValues;
        opts.buttons = iobj.buttons;
        opts.titleColor = iobj.titleColor;
        opts.actionFunc = iobj.actionFunc;
        var mod = new Model("", "Md_processBox~sys", opts, {});
        var itemHeight = 30;
        var hh = mod.opts.titleHeight + mod.opts.buttonHeight + 30;
        hh += mod.opts.tm + mod.opts.bm;
        hh += mod.opts.progressNames.length * itemHeight;
        hh += 4;
        var opts = {};
        opts.kvObj = mod;
        opts.w = iobj.width;
        opts.h = hh;
        opts.shadow_f = 1;
        opts.center_f = 1;
        gr.mdSystem.mdClass.popMaskOn({});
        return gr.mdSystem.mdClass.popOn(opts);
    }

    popModel(mod, w, h) {
        var opts = {};
        opts.kvObj = mod;
        opts.w = w;
        opts.h = h;
        this.popOnModel(opts);
    }

    popOnModel(op) {
        var self = this;
        var opts = {};
        opts.kvObj = null;
        opts.w = op.w;
        opts.h = op.h;
        opts.shadow_f = 1;
        opts.center_f = 1;
        opts.maskTouchOff_f = 0;
        KvLib.coverObject(opts, op);
        var maskOpts = {};
        maskOpts.clickFunc = function () {
            self.popOff(2);
        };
        if (!opts.maskTouchOff_f)
            maskOpts = {};
        gr.mdSystem.mdClass.popMaskOn(maskOpts);
        var mdObj = gr.mdSystem.mdClass.popOn(opts);
        return mdObj;
    }

    popOff(cnt) {
        gr.mdSystem.mdClass.popOff(cnt);
    }
    popList(iobj) {
        var kvObj = iobj.kvObj;
        var op = kvObj.opts;
        var md = iobj.md;
        var minW = iobj.minW;
        if (!minW) {
            minW = kvObj.stas.w;
        }

        var popOffFunc = function () {
            gr.mdSystem.mdClass.popOff(2);
        };

        var itemSelectFunc = function (obj) {
            obj.act = "menuClick";
            obj.fatherKvObj = iobj.kvObj;
            iobj.actionFunc(obj);
        };


        var kexts = iobj.kexts;
        if (!kexts) {
            if (iobj.popOff_f) {
                //gr.mdSystem.mdClass.popOff(2);
                if (md.stas.deepCnt)
                    gr.mdSystem.mdClass.popOff(md.stas.deepCnt);
            }
            if (md.opts.actionFunc) {
                var obj = {};
                obj.act = "itemClick";
                obj.kvObj = kvObj;
                md.opts.actionFunc(obj);
                return;
            }
        } else {


            var opts = {};
            opts.listTexts = [];
            opts.preTexts = [];
            opts.afterTexts = [];
            opts.ids = [];
            opts.tm = 10;
            opts.bm = 10;
            opts.lm = 2;
            opts.rm = 2;
            opts.ih = 24;
            opts.lpd = 4;
            opts.rpd = 4;
            opts.borderWidth = 1;
            var ph = opts.tm + opts.bm;
            var maxw = 0;
            for (var i = 0; i < kexts.length; i++) {
                var text = Kext.getText(kexts[i]);
                opts.listTexts.push(text);
                if (text === "kvd:sepLineH")
                    ph += 12;
                else
                    ph += opts.ih;
                var fontSize = KvLib.transUnit("0.6rh", 10, 100, opts.ih);
                var fontSizeObj = KvLib.measureText(text, fontSize, "normal", "monospace");
                if (fontSizeObj.w > maxw)
                    maxw = fontSizeObj.w;
                opts.preTexts.push(kexts[i].preText);
                opts.ids.push(kexts[i].id);
                //opts.lpd = iobj.lpd;
                if (md.opts.menuKexts) {
                    var sonKexts = md.opts.menuKexts[kexts[i].id];
                    if (sonKexts)
                        opts.afterTexts.push('<i class="gf">&#xeac9;</i>');
                    else
                        opts.afterTexts.push("");
                }
            }
            maxw += opts.lpd + opts.rpd + 50;

            if (maxw < minW)
                maxw = minW;
            if (maxw > 800)
                maxw = 800;
            opts.actionFunc = itemSelectFunc;
            opts.itemId = iobj.itemId;
            var mod = new Model("", "Md_list~gray", opts, {});
            var opts = {};
            opts.kvObj = mod;
            opts.w = maxw;
            opts.h = ph + op.borderWidth * 2;
            if (opts.h > gr.clientH)
                opts.h = gr.clientH;
            var pos = KvLib.getPosition(kvObj.elems["base"]);

            if (iobj.posType) {
                opts.x = pos.x;
                opts.x += kvObj.stas.rw - 10;
                opts.y = pos.y;
            } else {
                opts.y = pos.y + kvObj.stas.rh + 2;
                opts.x = pos.x;
            }


            if ((opts.x + maxw) >= (gr.clientW - 0)) {
                opts.x = gr.clientW - 0 - maxw;
                if (opts.x < 0)
                    opts.x = 0;
            }
            if ((opts.y + opts.h) >= (gr.clientH - 0)) {
                opts.y = gr.clientH - opts.h;

            }

            opts.shadow_f = 1;
            var maskOpts = {};
            maskOpts.clickFunc = popOffFunc;
            gr.mdSystem.mdClass.popMaskOn(maskOpts);
            gr.mdSystem.mdClass.popOn(opts);
            if (md.stas.deepCnt !== undefined)
                md.stas.deepCnt += 2;

        }

    }
    /*
     return setObj
     name, value, dataType, setType
     
     dataType:
     num, str, color, ratio, dim, flag, enum, 
     str~array, none, 
     setType:
     inputNumber, inputFloat,inputColor, inputText, inputBoolean, select,
     inputSelect, system, inputArray
     
     */

    setOptsSet(optsName, dataType, setType, nullOk_f, min, max) {
        var setObj = {};
        setObj.name = optsName;
        setObj.dataType = dataType;
        setObj.setType = setType;
        setObj.nullOk_f = nullOk_f;
        setObj.min = min;
        setObj.max = max;
        setObj.sons = null;
        return setObj;
    }

    setOptsSetFix(optsName, dataType) {
        var setObj = sys.getOptsSet(dataType);
        setObj.name = optsName;
        setObj.sons = null;
        return setObj;
    }

    getOptsSet(optName, value) {
        var setObj = {};
        setObj.name = optName;
        setObj.value = value;
        switch (optName) {
            case "borderWidth":
            case "minCharLength":
            case "maxCharLength":
            case "heightSubK":
            case "itemHeight":
            case "fixed":
            case "nature999":
                setObj.dataType = "num";
                setObj.setType = "inputNumber";
                setObj.nullOk_f = 0;
                setObj.min = 0;
                setObj.max = 999;
                return setObj;

            case "propertyWidth":
            case "propertyHeight":
            case "margin":
            case "padding":
            case "lm":
            case "rm":
            case "tm":
            case "bm":
            case "lpd":
            case "rpd":
            case "tpd":
            case "bpd":
            case "maxByte":
            case "backgroundInx":
            case "altColorInx":
            case "preTextBorderWidth":
            case "afterTextBorderWidth":
            case "preTextLpd":
            case "afterTextLpd":
            case "preTextRpd":
            case "afterTextRpd":
            case "n-number":
            case "mMargin":
            case "mlm":
            case "mrm":
            case "mtm":
            case "mbm":
            case "xm":
            case "ym":
            case "maxIw":
            case "maxIh":
            case "imageInx":
            case "urlsInx":
            case "natureNumber":
            case "nNature":
                setObj.dataType = "num";
                setObj.setType = "inputNumber";
                setObj.nullOk_f = 1;
                setObj.min = 0;
                return setObj;

            case "min":
            case "max":
            case "nInteger":
                setObj.dataType = "num";
                setObj.setType = "inputNumber";
                setObj.nullOk_f = 1;
                return setObj;

            case "number":
            case "zIndex":
            case "itemWidth":
            case "num":
            case "progressValue":
            case "integer":
                setObj.dataType = "num";
                setObj.setType = "inputNumber";
                return setObj;

            case "npnum":
                setObj.dataType = "num";
                setObj.setType = "inputNumber";
                setObj.nullOk_f = 1;
                setObj.min = 0;
                return setObj;



            case "baseColor":
            case "borderColor":
            case "innerTextColor":
            case "insideShadowColor":
            case "outsideShadowColor":
            case "disableTextColor":
            case "preTextBackgroundColor":
            case "preTextTextColor":
            case "preTextBorderColor":
            case "afterTextBackgroundColor":
            case "textColor":
            case "selectTextColor":
            case "selectBaseColor":
            case "mouseOnBorderColor":
            case "mouseOnColor":
            case "mouseOnTextColor":
            case "progressColor":
            case "color":
                setObj.dataType = "color";
                setObj.setType = "selectColor";
                setObj.nullOk_f = 1;
                return setObj;

            case "mw":
            case "mh":
            case "iw":
            case "ih":
            case "insideShadowBlur":
            case "outsideShadowBlur":
            case "insideShadowOffx":
            case "insideShadowOffy":
            case "outsideShadowOffx":
            case "outsideShadowOffy":
            case "preTextWidth":
            case "afterTextWidth":
            case "preTextHeight":
            case "dim":
                setObj.dataType = "dim";
                setObj.setType = "inputText";
                setObj.nullOk_f = 1;
                return setObj;
            case "selectInx":
                setObj.dataType = "num";
                setObj.setType = "inputNumber";
                setObj.min = -1;
                return setObj;
            case "topScroll":
            case "page":
            case "nature":
                setObj.dataType = "num";
                setObj.setType = "inputNumber";
                setObj.min = 0;
                return setObj;



            case "nature255":
                setObj.dataType = "num";
                setObj.setType = "inputNumber";
                setObj.min = 0;
                setObj.max = 255;
                return setObj;
            case "xc":
            case "yc":
            case "nature1":
                setObj.dataType = "num";
                setObj.setType = "inputNumber";
                setObj.min = 1;
                return setObj;


            case "fontSize":
            case "preTextFontSize":
            case "afterTextFontSize":
            case "borderRadius":
            case "nDim":
                setObj.dataType = "dim";
                setObj.setType = "inputText";
                setObj.nullOk_f = 1;
                return setObj;

            case "whr":
            case "nFloatP":
                setObj.dataType = "ratio";
                setObj.setType = "inputFloat";
                setObj.min = 0;
                setObj.nullOk_f = 1;
                return setObj;


            case "float":
                setObj.dataType = "ratio";
                setObj.setType = "inputFloat";
                return setObj;
            case "float01":
                setObj.dataType = "ratio";
                setObj.setType = "inputFloat";
                setObj.min = 0;
                setObj.max = 1;
                return setObj;



            case "n-float":
            case "mulRate":
            case "limitLowRate":
            case "limitHighRate":
            case "nFloat":
                setObj.dataType = "ratio";
                setObj.setType = "inputFloat";
                setObj.nullOk_f = 1;
                return setObj;
            case "center_f":
            case "disable_f":
            case "preTextLine2_f":
            case "shrinkX_f":
            case "dispNo_f":
            case "hidden_f":
            case "autoPlay_f":
            case "loop_f":
            case "controls_f":
            case "readOnly_f":
            case "hideNo_f":
            case "flag":
            case "yesNoF":
                setObj.dataType = "flag";
                setObj.setType = "inputBoolean";
                setObj.enum = ["yes", "no"];
                return setObj;
            case "wAlign":
            case "textAlign":
            case "preTextAlign":
            case "afterTextAlign":
                setObj.dataType = "enum";
                setObj.setType = "select";
                setObj.enum = ["center", "left", "right"];
                return setObj;
            case "afterTextPos":
                setObj.dataType = "enum";
                setObj.setType = "select";
                setObj.enum = ["end", "follow"];
                return setObj;

            case "leftRight":
                setObj.dataType = "enum";
                setObj.setType = "select";
                setObj.enum = ["left", "right"];
                return setObj;
            case "bothLeftRight":
                setObj.dataType = "enum";
                setObj.setType = "select";
                setObj.enum = ["both", "left", "right"];
                return setObj;


            case "hAlign":
                setObj.dataType = "enum";
                setObj.setType = "select";
                setObj.enum = ["center", "top", "bottom"];
                return setObj;




            case "fontWeight":
                setObj.dataType = "enum";
                setObj.setType = "select";
                setObj.enum = ["normal", "bold"];
                return setObj;
            case "fontStyle":
                setObj.dataType = "enum";
                setObj.setType = "select";
                setObj.enum = ["normal", "italic"];
                return setObj;

            case "scrollY":
                setObj.dataType = "enum";
                setObj.setType = "select";
                setObj.enum = ["none", "auto"];
                return setObj;


            case "fontFamily":
                setObj.dataType = "str";
                setObj.setType = "inputSelect";
                setObj.nullOk_f = 1;
                setObj.enum = ["sans-serif", "monospace", "digital_3"];
                return setObj;

            case "sepLineBorderColor":
                setObj.dataType = "str";
                setObj.setType = "inputSelect";
                setObj.nullOk_f = 1;
                setObj.enum = ["#000 #888 #888 #000", "#000 #fff #fff #000"];
                return setObj;


            case "textValue":
                setObj.dataType = "str";
                setObj.setType = "editor";
                setObj.nullOk_f = 1;
                return setObj;

            case "selectEditor":
                setObj.dataType = "str";
                setObj.setType = "selectEditor";
                setObj.nullOk_f = 1;
                setObj.enum = [""];
                return setObj;

            case "jsEditor":
                setObj.dataType = "jsText";
                setObj.setType = "selectEditor";
                setObj.nullOk_f = 1;
                setObj.enum = [];
                return setObj;


            case "inputSelect":
                setObj.dataType = "str";
                setObj.setType = "inputSelect";
                setObj.enum = [];
                return setObj;
            case "buttonSelect":
                setObj.dataType = "str";
                setObj.setType = "buttonSelect";
                setObj.enum = [];
                return setObj;



            case "whiteSpace":
            case "backgroundRepeat":
            case "backgroundImagePosition":
            case "cursor":
            case "inputRegs":
            case "onMouseOn":
            case "onMousePress":
            case "userRects":
            case "strSystem":
                setObj.dataType = "str";
                setObj.setType = "system";
                return setObj;
            case "kvObjs":
            case "objSystem":
                setObj.dataType = "object";
                setObj.setType = "system";
                return setObj;

            case "backgroundColors":
            case "altColors":
            case "colorArray":
                setObj.dataType = "color~array";
                setObj.setType = "selectColor";
                setObj.nullOk_f = 1;
                return setObj;

            case "jsText":
                setObj.dataType = "jsText";
                setObj.setType = "editor";
                setObj.nullOk_f = 1;
                return setObj;


            case "backgroundImageUrls":
            case "imageUrls":
            case "urls":
                setObj.dataType = "str~array";
                setObj.setType = "selectUrl";
                setObj.nullOk_f = 1;
                return setObj;

            case "preTexts":
            case "afterTexts":
            case "listTexts":
            case "ids":
            case "options":
            case "stringArray":
                setObj.dataType = "str~array";
                setObj.setType = "inputText";
                return setObj;

            case "integerArray":
                setObj.dataType = "num~array";
                setObj.setType = "inputNumber";
                return setObj;


            case "hint":
            case "innerText":
            case "preText":
            case "afterText":
            case "text":
            case "title":
            case "editValue":
            case "groupName":
            case "selectHint":
                setObj.dataType = "str";
                setObj.setType = "inputSelect";
                setObj.enum = [];
                setObj.enum.push("", "<i class='gf'>&#xea22;</i>");
                setObj.nullOk_f = 1;
                return setObj;
            case "password":
                setObj.iconType = "password";
                setObj.dataType = "str";
                setObj.setType = "inputPassword";
                setObj.nullOk_f = 1;
                return setObj;
            case "userName":
                setObj.iconType = "userName";
                setObj.dataType = "str";
                setObj.setType = "inputText";
                setObj.nullOk_f = 1;
                return setObj;

            case "str":
                setObj.dataType = "str";
                setObj.setType = "inputText";
                return setObj;
            case "nstr":
                setObj.dataType = "str";
                setObj.setType = "inputText";
                setObj.nullOk_f = 1;
                return setObj;


            case "background":
                setObj.dataType = "str";
                setObj.setType = "inputSelect";
                setObj.nullOk_f = 1;
                setObj.enum = [];
                setObj.enum.push("");
                setObj.enum.push("linear-gradient(red, orange, yellow, green, blue)");
                setObj.enum.push("linear-gradient(45deg, red, blue)");
                setObj.enum.push("linear-gradient(135deg, orange 60%, cyan)");
                setObj.enum.push("radial-gradient(red, green, blue)");
                setObj.enum.push("radial-gradient(red 5%, green 15%, blue 60%)");
                return setObj;
            case "textShadow":
                setObj.dataType = "str";
                setObj.setType = "inputSelect";
                setObj.enum = [];
                setObj.enum.push("", "1px 1px 1px #fff");
                setObj.nullOk_f = 1;
                return setObj;



            default:
                var strA = optName.split("~");
                if (strA[0] === "group" && strA.length >= 2) {
                    setObj.dataType = "group";
                    setObj.setType = "groupButton";
                    var group = setObj.group = [];
                    while (1) {
                        if (strA[1] === "base") {
                            group.push("innerText");
                            group.push("innerTextColor");
                            group.push("baseColor");
                            group.push("borderWidth");
                            group.push("borderColor");
                            group.push("hint");
                            break;
                        }
                        if (strA[1] === "margin&padding") {
                            group.push("margin");
                            group.push("lm");
                            group.push("tm");
                            group.push("rm");
                            group.push("bm");
                            group.push("padding");
                            group.push("lpd");
                            group.push("tpd");
                            group.push("rpd");
                            group.push("bpd");
                            group.push("mMargin");
                            group.push("mlm");
                            group.push("mtm");
                            group.push("mrm");
                            group.push("mbm");
                            break;
                        }
                        if (strA[1] === "preText") {
                            group.push("preText");
                            group.push("preTextWidth");
                            group.push("preTextFontSize");
                            group.push("preTextAlign");
                            group.push("preTextLpd");
                            group.push("preTextRpd");
                            group.push("preTextBackgroundColor");
                            group.push("preTextTextColor");
                            group.push("preTextBorderColor");
                            group.push("preTextBorderWidth");
                            group.push("preTextLine2_f");
                            group.push("preTextHeight");
                            break;
                        }
                        if (strA[1] === "afterText") {
                            group.push("afterText");
                            group.push("afterTextWidth");
                            group.push("afterTextFontSize");
                            group.push("afterTextAlign");
                            group.push("afterTextLpd");
                            group.push("afterTextRpd");
                            group.push("afterTextBackgroundColor");
                            group.push("afterTextBorderWidth");
                            group.push("afterTextPos");
                            break;
                        }
                        if (strA[1] === "shadow") {
                            group.push("insideShadowBlur");
                            group.push("insideShadowColor");
                            group.push("insideShadowOffx");
                            group.push("insideShadowOffy");
                            group.push("outsideShadowBlur");
                            group.push("outsideShadowColor");
                            group.push("outsideShadowOffx");
                            group.push("outsideShadowOffy");
                            break;
                        }
                        if (strA[1] === "font") {
                            group.push("fontSize");
                            group.push("fontFamily");
                            group.push("fontStyle");
                            group.push("fontWeight");
                            group.push("maxByte");
                            group.push("textAlign");
                            group.push("textShadow");
                            group.push("disableTextColor");
                            group.push("disable_f");
                            break;
                        }
                        if (strA[1] === "background") {
                            group.push("background");
                            group.push("backgroundInx");
                            group.push("backgroundColors");
                            group.push("backgroundImageUrls");
                            group.push("backgroundRepeat");
                            group.push("backgroundImagePosition");
                            break;
                        }
                        if (strA[1] === "location") {
                            group.push("iw");
                            group.push("ih");
                            group.push("whr");
                            group.push("wAlign");
                            group.push("hAlign");
                            group.push("mw");
                            group.push("mh");
                            break;
                        }

                        for (var i = 1; i < value.length; i++) {
                            group.push(value[i]);
                        }
                        break;
                    }
                    return setObj;
                }

                setObj.dataType = "none";
                setObj.setType = "inputText";
                return setObj;
        }

    }

    getServerFileNames(callBackFunc, path, filter) {
        if (!path)
            path = "systemResource";
        if (!filter)
            filter = "*.*";
        var opts;
        var obj = {};
        obj["name"] = "readFileNames";
        obj["type"] = "";
        obj["opts"] = {};
        opts = obj["opts"];
        //=================================
        opts["responseType"] = "response error";
        opts["initDir"] = path + "";
        opts["compareNames"] = filter;
        //opts["initDir"] = "1234";
        //opts["fileNames"] = "5678";
        opts["responseAction"] = "exeCallBackFunc";
        gr.serverCallBack = callBackFunc;
        sv.callServer(JSON.stringify(obj));
        return;
    }
}


var sys = new MySystem();


class Kext {
    constructor(_id, _title, _chinese, _opts) {
        this.type = "kext";
        this.id = _id;
        this.text = {};
        this.text.english = _title;
        this.text.chinese = _chinese;
        this.sub = {};
        this.dsc = {};
        this.hint = {};
        if (_opts) {
            this.preText = _opts.preText;
            this.afterText = _opts.afterText;
            this.hint["english"] = _opts.enHint;
            this.hint["chinese"] = _opts.chHint;
            this.sub["english"] = _opts.enSub;
            this.sub["chinese"] = _opts.chSub;
            this.dsc["english"] = _opts.enDsc;
            this.dsc["chinese"] = _opts.chDsc;
        }
        /*
         var obj=this.obj={};
         obj.id=this.id;
         obj.type=this.type;
         obj.text=this.text;
         obj.sub=this.sub;
         obj.hint=this.sub;
         obj.desc=this.sub;
         * 
         */



    }
    static newEzStr(en, ch, id) {
        var obj = {};
        obj.type = "kext";
        var text = obj.text = {};
        text["english"] = en;
        text["chinese"] = ch;
        if (id)
            obj.id = id;
        return JSON.stringify(obj);
    }

    static newEzObj(en, ch, id) {
        var obj = {};
        obj.type = "kext";
        var text = obj.text = {};
        text["english"] = en;
        text["chinese"] = ch;
        if (id)
            obj.id = id;
        return obj;
    }

    static chkKextStr(kextStr) {
        try {
            var kextObj = JSON.parse(kextStr);
            if (kextObj.type === "kext")
                return kextObj;
            return;
        } catch (e) {
            return;
        }
    }

    static getText(kext) {
        var value = kext.text[gr.language];
        if (!value)
            value = kext.text["english"];
        if (!value)
            value = "";
        return value;
    }

    static getText(kext) {
        var value = kext.text[gr.language];
        if (!value)
            value = kext.text["english"];
        if (!value)
            value = "";
        return value;
    }

    static getSub(kext) {
        var value = kext.sub[gr.language];
        if (!value)
            value = kext.sub["english"];
        if (!value)
            value = "";
        return value;
    }
    static getDsc(kext) {
        var value = kext.dsc[gr.language];
        if (!value)
            value = kext.dsc["english"];
        if (!value)
            value = "";
        return value;
    }
    static getHint(kext) {
        var value = kext.hint[gr.language];
        if (!value)
            value = kext.hint["english"];
        if (!value)
            value = "";
        return value;
    }

}

