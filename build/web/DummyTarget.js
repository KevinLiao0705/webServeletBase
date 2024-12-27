class DummyTarget {
    constructor() {
    }
    initOpts(md) {
        var self = this;
        var opts = {};
        Block.setBaseOpts(opts);
        return opts;
    }
    create() {
    }
    actionFunc(iobj) {
        console.log(iobj);
        if (iobj.act === "mouseClick") {


            if (iobj.keyId === "radarPaneSetButton") {
                var op = {};
                op.actionFunc = function (iobj) {
                    console.log(iobj);
                };
                op.buttons = [];
                op.title = iobj.sender.opts.title;
                op.ksObjss = [];
                for (var i = 0; i < 3; i++) {
                    var ksObjs = [];
                    for (var j = 0; j < 1; j++) {
                        var ksObj = {};
                        ksObj.name = "setLine#" + i + "." + j;
                        ksObj.type = "Model~MdaSetLine~base.sys0";
                        var kopts = ksObj.opts = {};
                        if (i === 0) {
                            kopts.setOpts = sopt.getButtonRadio();
                            kopts.setOpts.title = "脈波來源";
                            kopts.setOpts.enum = ["SP同步", "本機模擬"];
                            kopts.setOpts.radioName = "0";
                        }
                        if (i === 1) {
                            kopts.setOpts = sopt.getButtonRadio();
                            kopts.setOpts.title = "誘標1通訊方式";
                            kopts.setOpts.enum = ["光纖", "無線", "自動"];
                            kopts.setOpts.radioName = "1";
                        }
                        if (i === 2) {
                            kopts.setOpts = sopt.getButtonRadio();
                            kopts.setOpts.title = "誘標2通訊方式";
                            kopts.setOpts.enum = ["光纖", "無線", "自動"];
                            kopts.setOpts.radioName = "2";
                        }
                        kopts.setOpts.titleWidth = 200;
                        ksObjs.push(ksObj);
                    }
                    op.ksObjss.push(ksObjs);
                }
                var obj = mac.setLineBoxOpts(op);
                var kvObj = new Block("setLineBox", obj.type, obj.opts);
                mda.popObj(1000, 250, kvObj);
            }

            var setF = 0;
            if (iobj.keyId === "targetPane1SetButton") {
                setF = 1;
            }
            if (iobj.keyId === "targetPane2SetButton") {
                setF = 1;

            }
            if (setF) {
                var op = {};
                op.actionFunc = function (iobj) {
                    console.log(iobj);
                };
                op.buttons = [];
                op.title = iobj.sender.opts.title;
                op.ksObjss = [];
                for (var i = 0; i < 4; i++) {
                    var ksObjs = [];
                    for (var j = 0; j < 1; j++) {
                        var ksObj = {};
                        ksObj.name = "setLine#" + i + "." + j;
                        ksObj.type = "Model~MdaSetLine~base.sys0";
                        var kopts = ksObj.opts = {};
                        if (i === 0) {
                            kopts.setOpts = sopt.getButtonRadio();
                            kopts.setOpts.title = "脈波來源";
                            kopts.setOpts.enum = ["主控雷達", "本機模擬"];
                            kopts.setOpts.radioName = "0";
                        }
                        if (i === 1) {
                            kopts.setOpts = sopt.getButtonRadio();
                            kopts.setOpts.title = "通訊方式";
                            kopts.setOpts.enum = ["光纖", "無線", "自動"];
                            kopts.setOpts.radioName = "1";
                        }
                        if (i === 2) {
                            kopts.setOpts = sopt.getButtonRadio();
                            kopts.setOpts.title = "輸出裝置";
                            kopts.setOpts.enum = ["天線", "測試負載"];
                            kopts.setOpts.radioName = "2";
                        }
                        if (i === 3) {
                            kopts.setOpts = sopt.getButtonRadio();
                            kopts.setOpts.title = "戰備短路";
                            kopts.setOpts.enum = ["開啟", "關閉"];
                            kopts.setOpts.radioName = "3";
                        }
                        kopts.setOpts.titleWidth = 200;
                        ksObjs.push(ksObj);
                    }
                    op.ksObjss.push(ksObjs);
                }
                var obj = mac.setLineBoxOpts(op);
                var kvObj = new Block("setLineBox", obj.type, obj.opts);
                mda.popObj(1000, 300, kvObj);
            }


        }

    }

    paraSetPrg() {
        var opts = {};
        opts.title = "設定";
        opts.xc = 1;
        opts.yc = 10;
        opts.kvTexts = [];
        opts.kvTexts.push("主控雷達設定");
        opts.kvTexts.push("測試脈波設定");
        opts.kvTexts.push("同步參數設定");
        opts.kvTexts.push("GPS參數設定");
        opts.kvTexts.push("下載記錄檔");
        opts.kvTexts.push("系統重啟");



        opts.actionFunc = function (iobj) {
            console.log(iobj);
            var opts={};
            opts.paraSet=gr.paraSet;
            opts.title="Title";
            box.paraEditBox(opts);
            return;
            
            
            var opts = {};
            opts.w = 1000;
            opts.h = 800;
            opts.ksObjss = [];
            var keys = Object.keys(gr.paraSet);
            //keys.sort();
            var index = 0;
            for (var i = 0; i < keys.length; i++) {
                var strA = keys[i].split("~");
                if (strA[0] === "dsc")
                    continue;
                var ksObjs = [];
                for (var j = 0; j < 1; j++) {
                    var ksObj = {};
                    ksObj.name = "setLine#" + index + "." + j;
                    ksObj.type = "Model~MdaSetLine~base.sys0";
                    var kopts = ksObj.opts = {};
                    var setOpts = kopts.setOpts = sopt.getOptsInt();
                    var dscObj = gr.paraSet["dsc~" + keys[i]];
                    if (dscObj) {
                        if (dscObj.getType) {
                            var setOpts = kopts.setOpts = sopt.getOptsPara(dscObj.getType);
                            KvLib.deepCoverObject(setOpts, dscObj);
                        } else {
                            KvLib.deepCoverObject(setOpts, dscObj);
                        }
                    }
                    setOpts.value = gr.paraSet[keys[i]];
                    setOpts.titleWidth = 300;
                    setOpts.titleFontSize = 20;
                    setOpts.noWidth = 50;
                    setOpts.id = keys[i];
                    if(!setOpts.title)
                        setOpts.title = keys[i];
                    setOpts.no = index + 1;
                    ksObjs.push(ksObj);
                    index++;
                }
                opts.ksObjss.push(ksObjs);
            }
            box.setLineBox(opts);

        };
        box.selectBox(opts);

    }

    build() {
        var self = this;
        var md = self.md;
        var op = md.opts;
        var lyMaps = md.lyMaps;
        var blocks = op.blocks;
        var layouts = op.layouts;
        //======================================    
        var cname = "c";
        var opts = {};
        layouts[cname] = {name: cname, type: "Layout~Ly_base~array.sys0", opts: opts};
        lyMaps["body"] = cname;

        var opts = {};
        md.setPns(opts);
        opts.mouseClick_f = 1;
        opts.baseColor = "#222";
        opts.actionFunc = function (iobj) {
            console.log("base");
            //console.log(iobj);
        };
        blocks[cname] = {name: "basePanel", type: "Component~Cp_base~plate.none", opts: opts};

        //======================================    
        var cname = lyMaps["body"] + "~" + 0;
        var opts = {};
        opts.yArr = [50, 70, 9999];
        layouts[cname] = {name: cname, type: "Layout~Ly_base~xyArray.sys0", opts: opts};
        lyMaps["mainBody"] = cname;
        //==============================
        var cname = lyMaps["mainBody"] + "~" + 0;
        var opts = {};
        opts.innerText = "主雷達同步控制器";
        blocks[cname] = {name: "basePanel", type: "Component~Cp_base~label.title", opts: opts};
        //==============================
        var cname = lyMaps["mainBody"] + "~" + 1;
        var opts = {};
        opts.buttons = ["佈署", "自測", "同步", "波形", "設定"];
        opts.buttonIds = ["location", "selfTest", "sync", "wave", "setting"];
        opts.actionFunc = function (iobj) {
            if (iobj.buttonId === "location") {
                gr.appType = "Model~LocationTarget~base.sys0";
                sys.dispWebPage();
                return;
            }
            if (iobj.buttonId === "selfTest") {
                gr.appType = "Model~SelfTest~base.sys0";
                sys.dispWebPage();
                return;
            }
            if (iobj.buttonId === "sync") {
                gr.appType = "Model~SyncTest~base.sys0";
                sys.dispWebPage();
                return;
            }

            if (iobj.buttonId === "setting") {
                self.paraSetPrg();
                return;

                var opts = {};
                opts.title = "輸入密碼";
                opts.setOpts = sopt.getIntPassword({});
                opts.actionFunc = function (iobj) {

                    var yes_f = 0;
                    if (iobj.inputText === "16020039") {
                        yes_f = 1;
                    }
                    if (iobj.inputText === gr.paraSet.paraSetPassword) {
                        yes_f = 1;
                    }
                    yes_f = 1;
                    if (!yes_f) {
                        console.log(iobj);
                        var opts = {};
                        opts.kvTexts = ["密碼錯誤"];
                        box.errorBox(opts);
                        return;
                    }
                    MdaPopWin.popOff(2);
                    self.paraSetPrg();
                };
                box.intPadBox(opts);
            }
        };
        opts.buttonAmt = 5;
        blocks[cname] = {name: "headButtons", type: "Model~MdaButtons~base.sys0", opts: opts};






        //==============================
        var cname = lyMaps["mainBody"] + "~" + 2;
        var opts = {};
        opts.xArr = [400, 9999];
        opts.xm = 10;
        layouts[cname] = {name: cname, type: "Layout~Ly_base~xyArray.sys0", opts: opts};
        lyMaps["downBody"] = cname;
        //==============================
        var cname = lyMaps["downBody"] + "~" + 0;
        var opts = {};
        opts.yc = 2;
        opts.ym = 10;
        opts.margin = 0;
        layouts[cname] = {name: cname, type: "Layout~Ly_base~array.sys0", opts: opts};
        lyMaps["leftBody"] = cname;
        //==============================
        var cname = lyMaps["leftBody"] + "~" + 0;
        var opts = {};
        opts.title = "誘標雷達 1";
        opts.actionFunc = self.actionFunc;
        blocks[cname] = {name: "targetPane1", type: "Model~TargetPane~base.sys0", opts: opts};
        //==============================
        var cname = lyMaps["leftBody"] + "~" + 1;
        var opts = {};
        opts.title = "誘標雷達 2";
        opts.actionFunc = self.actionFunc;
        blocks[cname] = {name: "targetPane2", type: "Model~TargetPane~base.sys0", opts: opts};
        //==============================
        var cname = lyMaps["downBody"] + "~" + 1;
        var opts = {};
        opts.title = "主控雷達";
        opts.actionFunc = self.actionFunc;
        opts.baseColor = "#ccc";
        blocks[cname] = {name: "radarPane", type: "Model~RadarPane~base.sys0", opts: opts};
        //==============================



    }
}


class TargetPane {
    constructor() {
    }
    initOpts(md) {
        var self = this;
        var opts = {};
        Block.setBaseOpts(opts);
        this.subTypeOpts(opts);
        opts.title = "title";
        opts.baseColor = "#ccc";
        opts.xm = 30;
        return opts;
    }
    subTypeOpts(opts) {
        if (this.md.subType === "base.sys0") {
        }
    }
    afterCreate() {
        var md = this.md;
        var op = md.opts;
        var st = md.stas;
        var iobj = {};
        iobj.act = "afterCreate";
        iobj.sender = md;
        KvLib.exe(op.actionFunc, iobj);
    }
    build() {
        var self = this;
        var md = self.md;
        var op = md.opts;
        var st = md.stas;
        var lyMaps = md.lyMaps;
        var blocks = op.blocks;
        var layouts = op.layouts;
        //======================================    
        var cname = "c";
        var opts = {};
        md.setPns(opts);
        layouts[cname] = {name: cname, type: "Layout~Ly_base~array.sys0", opts: opts};
        lyMaps["body"] = cname;
        //======================================    
        var opts = {};
        md.setPns(opts);
        blocks[cname] = {name: "basePanel", type: "Component~Cp_base~plate.sys0", opts: opts};
        //======================================    
        var cname = lyMaps["body"] + "~" + 0;
        var opts = {};
        opts.margin = 6;
        opts.xm = 2;
        opts.ym = 10;
        opts.yArr = ["0.140rh", "0.13rh", "0.13rh", "0.13rh", "0.13rh", "0.13rh", 9999];
        opts.xyArr = [[9999], ["0.5rw", 9999], ["0.5rw", 9999], ["0.5rw", 9999], ["0.5rw", 9999], ["0.5rw", 9999], [9999]];
        layouts[cname] = {name: cname, type: "Layout~Ly_base~xyArray.sys0", opts: opts};
        lyMaps["mainBody"] = cname;


        var cname = lyMaps["mainBody"] + "~" + 0;
        var opts = {};
        opts.innerText = op.title;
        blocks[cname] = {name: "basePanel", type: "Component~Cp_base~label.title", opts: opts};
        //==============================
        var cname = lyMaps["mainBody"] + "~" + 1;
        var opts = {};
        opts.innerText = "雷達狀態";
        blocks[cname] = {name: "statusLabel", type: "Component~Cp_base~label.sys3", opts: opts};
        //==============================
        var cname = lyMaps["mainBody"] + "~" + 2;
        var opts = {};
        opts.innerText = "備便";
        opts.baseColor = "#cfc";
        blocks[cname] = {name: "statusPlate", type: "Component~Cp_base~label.led", opts: opts};
        //==============================
        var cname = lyMaps["mainBody"] + "~" + 3;
        var opts = {};
        opts.innerText = "脈波來源";
        blocks[cname] = {name: "souceLabel", type: "Component~Cp_base~label.sys3", opts: opts};
        //===
        var cname = lyMaps["mainBody"] + "~" + 4;
        var opts = {};
        opts.innerText = "主雷同步";
        opts.baseColor = "#cfc";
        blocks[cname] = {name: "sourcePlate", type: "Component~Cp_base~label.led", opts: opts};
        //==============================
        var cname = lyMaps["mainBody"] + "~" + 7;
        var opts = {};
        opts.innerText = "輸出裝置";
        blocks[cname] = {name: "outPanel", type: "Component~Cp_base~label.sys3", opts: opts};
        //===
        var cname = lyMaps["mainBody"] + "~" + 8;
        var opts = {};
        opts.innerText = "輻射天線";
        opts.baseColor = "#cfc";
        blocks[cname] = {name: "outPlate", type: "Component~Cp_base~label.led", opts: opts};
        //==============================
        var cname = lyMaps["mainBody"] + "~" + 5;
        var opts = {};
        opts.innerText = "通訊方式";
        blocks[cname] = {name: "commPanel", type: "Component~Cp_base~label.sys3", opts: opts};
        //===
        var cname = lyMaps["mainBody"] + "~" + 6;
        var opts = {};
        opts.innerText = "無線";
        opts.baseColor = "#cfc";
        blocks[cname] = {name: "commPlate", type: "Component~Cp_base~label.led", opts: opts};
        //==============================
        var cname = lyMaps["mainBody"] + "~" + 9;
        var opts = {};
        opts.innerText = "戰備狀態";
        blocks[cname] = {name: "battlePanel", type: "Component~Cp_base~label.sys3", opts: opts};
        //===
        var cname = lyMaps["mainBody"] + "~" + 10;
        var opts = {};
        opts.innerText = "關閉";
        opts.baseColor = "#888";
        blocks[cname] = {name: "battlePlate", type: "Component~Cp_base~label.led", opts: opts};
        //==============================
        var cname = lyMaps["mainBody"] + "~" + 11;
        var opts = {};
        opts.innerText = "誘標控制";
        opts.fontSize = "0.5rh";
        opts.actionFunc = function (iobj) {
            console.log(iobj);
            iobj.sender = md;
            iobj.keyId = md.name + "SetButton";
            KvLib.exe(op.actionFunc, iobj);
        };
        blocks[cname] = {name: "commandButton", type: "Component~Cp_base~button.sys0", opts: opts};

        //==============================
    }
}


class RadarPane {
    constructor() {
    }
    initOpts(md) {
        var self = this;
        var opts = {};
        Block.setBaseOpts(opts);
        this.subTypeOpts(opts);
        opts.title = "title";
        opts.buttonColor = "#ccf";
        opts.buttons = ["button1", "button2", "button3"];
        opts.layoutType = "row";//row,collum,array
        opts.buttonIds = [];
        opts.iw = 9999;
        opts.ih = 9999;
        opts.borderWidth = 1;
        opts.xm = 30;
        opts.baseColor = "#cce";
        return opts;
    }
    subTypeOpts(opts) {
        if (this.md.subType === "base.sys0") {
        }
    }
    afterCreate() {
        var md = this.md;
        var op = md.opts;
        var st = md.stas;
        var iobj = {};
        iobj.act = "afterCreate";
        iobj.sender = md;
        KvLib.exe(op.actionFunc, iobj);
    }
    build() {
        var self = this;
        var md = self.md;
        var op = md.opts;
        var st = md.stas;
        var lyMaps = md.lyMaps;
        var blocks = op.blocks;
        var layouts = op.layouts;
        //======================================    
        var actionPrg = function (iobj, keyId) {
            console.log(iobj);
            iobj.sender = md;
            iobj.keyId = md.name + keyId;
            KvLib.exe(op.actionFunc, iobj);
        };
        //======================================    
        var cname = "c";
        var opts = {};
        md.setPns(opts);
        layouts[cname] = {name: cname, type: "Layout~Ly_base~array.sys0", opts: opts};
        lyMaps["body"] = cname;
        //======================================    
        var opts = {};
        md.setPns(opts);
        blocks[cname] = {name: "basePanel", type: "Component~Cp_base~plate.sys0", opts: opts};
        //======================================    
        var cname = lyMaps["body"] + "~" + 0;
        var opts = {};
        opts.margin = 6;
        opts.xm = 2;
        opts.ym = 10;
        opts.yArr = [45, 45, 45, 45, 45, 60, 9999];
        opts.xyArr = [[9999],
            ["0.4rw", 9999],
            ["0.4rw", 9999],
            ["0.4rw", "0.3rw", 9999],
            ["0.4rw", "0.3rw", 9999],
            ["0.1rw", "0.3rw", "0.3rw", 9999],
            [9999]
        ];
        layouts[cname] = {name: cname, type: "Layout~Ly_base~xyArray.sys0", opts: opts};
        lyMaps["mainBody"] = cname;
        //===================================
        var lyInx = 0;
        var cname = lyMaps["mainBody"] + "~" + lyInx;
        var opts = {};
        opts.innerText = op.title;
        blocks[cname] = {name: "basePanel", type: "Component~Cp_base~label.title", opts: opts};
        //==============================
        lyInx++;
        var cname = lyMaps["mainBody"] + "~" + lyInx;
        var opts = {};
        opts.innerText = "SP雷達信號";
        blocks[cname] = {name: "spSignalLabel", type: "Component~Cp_base~label.sys3", opts: opts};
        //==============================
        lyInx++;
        var cname = lyMaps["mainBody"] + "~" + lyInx;
        var opts = {};
        opts.innerText = "備便";//停止|備便
        opts.baseColor = "#cfc";
        blocks[cname] = {name: "spSignalStatus", type: "Component~Cp_base~label.led", opts: opts};
        //==============================
        lyInx++;
        var cname = lyMaps["mainBody"] + "~" + lyInx;
        var opts = {};
        opts.innerText = "脈波來源";
        blocks[cname] = {name: "pulseSouceLabel", type: "Component~Cp_base~label.sys3", opts: opts};
        //===
        lyInx++;
        var cname = lyMaps["mainBody"] + "~" + lyInx;
        var opts = {};
        opts.innerText = "SP同步";//SP同步:|本機模擬
        opts.baseColor = "#cfc";
        blocks[cname] = {name: "pulseSourceStatus", type: "Component~Cp_base~label.led", opts: opts};
        //==============================
        lyInx++;
        var cname = lyMaps["mainBody"] + "~" + lyInx;
        var opts = {};
        opts.innerText = "誘標1通訊方式";
        blocks[cname] = {name: "target1CommLabel", type: "Component~Cp_base~label.sys3", opts: opts};
        //===
        lyInx++;
        var cname = lyMaps["mainBody"] + "~" + lyInx;
        var opts = {};
        opts.innerText = "光纖";//"無線"|光纖;
        opts.baseColor = "#cfc";
        blocks[cname] = {name: "target1CommType", type: "Component~Cp_base~label.led", opts: opts};
        //==
        lyInx++;
        var cname = lyMaps["mainBody"] + "~" + lyInx;
        var opts = {};
        opts.innerText = "未連線";//"未連線"|已連線;
        opts.baseColor = "#cfc";
        blocks[cname] = {name: "target1CommStatus", type: "Component~Cp_base~label.led", opts: opts};
        //==============================
        lyInx++;
        var cname = lyMaps["mainBody"] + "~" + lyInx;
        var opts = {};
        opts.innerText = "誘標2通訊方式";
        blocks[cname] = {name: "target2CommLabel", type: "Component~Cp_base~label.sys3", opts: opts};
        //===
        lyInx++;
        var cname = lyMaps["mainBody"] + "~" + lyInx;
        var opts = {};
        opts.innerText = "無線";//"無線"|光纖;
        opts.baseColor = "#cfc";
        blocks[cname] = {name: "target2CommType", type: "Component~Cp_base~label.led", opts: opts};
        //==
        lyInx++;
        var cname = lyMaps["mainBody"] + "~" + lyInx;
        var opts = {};
        opts.innerText = "未連線";//"未連線"|已連線;
        opts.baseColor = "#cfc";
        blocks[cname] = {name: "targetCommStatus", type: "Component~Cp_base~label.led", opts: opts};
        //==============================
        /*
         lyInx++;
         var cname = lyMaps["mainBody"] + "~" + lyInx;
         var opts = {};
         opts.innerText="誘標控制";
         opts.fontSize="0.5rh";
         opts.baseColor="#ccf";
         blocks[cname] = {name: "commandButton", type: "Component~Cp_base~button.sys0", opts: opts};
         * 
         */
        //==============================
        lyInx++;
        var cname = lyMaps["mainBody"] + "~" + lyInx;
        var opts = {};
        opts.backgroundInx = 1;
        blocks[cname] = {name: "startLed", type: "Component~Cp_base~icons.led", opts: opts};
        //===
        lyInx++;
        var cname = lyMaps["mainBody"] + "~" + lyInx;
        var opts = {};
        opts.innerText = "脈波啟動";
        opts.baseColor = "#ccf";
        opts.actionFunc = function (iobj) {
            console.log(iobj);
            iobj.sender = md;
            iobj.keyId = md.name + "PulseStart";
            KvLib.exe(op.actionFunc, iobj);
        };
        blocks[cname] = {name: "pulseStartButton", type: "Component~Cp_base~button.sys0", opts: opts};
        //===
        lyInx++;
        var cname = lyMaps["mainBody"] + "~" + lyInx;
        var opts = {};
        opts.innerText = "脈波停止";
        opts.baseColor = "#ccf";
        opts.actionFunc = function (iobj) {
            console.log(iobj);
            iobj.sender = md;
            iobj.keyId = md.name + "PulseStop";
            KvLib.exe(op.actionFunc, iobj);
        };
        blocks[cname] = {name: "pulseStopButton", type: "Component~Cp_base~button.sys0", opts: opts};
        //==============================
        lyInx++;
        var cname = lyMaps["mainBody"] + "~" + lyInx;
        var opts = {};
        opts.innerText = "設定";
        opts.baseColor = "#ccf";
        opts.actionFunc = function (iobj) {
            console.log(iobj);
            iobj.sender = md;
            iobj.keyId = md.name + "SetButton";
            KvLib.exe(op.actionFunc, iobj);
        };
        blocks[cname] = {name: "setButton", type: "Component~Cp_base~button.sys0", opts: opts};
        //==============================
        lyInx++;
        var cname = lyMaps["mainBody"] + "~" + lyInx;
        var opts = {};
        opts.ym = 2;
        opts.yArr = [9999, 30];
        layouts[cname] = {name: cname, type: "Layout~Ly_base~xyArray.sys0", opts: opts};
        lyMaps["rightDownBody"] = cname;
        //===================================
        var cname = lyMaps["rightDownBody"] + "~" + 0;
        var opts = {};
        blocks[cname] = {name: "editor", type: "Component~Cp_base~editor.sys0", opts: opts};
        //==
        var cname = lyMaps["rightDownBody"] + "~" + 1;
        var opts = {};
        opts.xm = 2;
        opts.xArr = [9999, 60, 60, 60];
        layouts[cname] = {name: cname, type: "Layout~Ly_base~xyArray.sys0", opts: opts};
        lyMaps["barBody"] = cname;
        //===================================
        var cname = lyMaps["barBody"] + "~" + 0;
        var opts = {};
        opts.innerText = "13:45:59";//"無線"|光纖;
        opts.baseColor = "#ccc";
        opts.textAlign = "left";
        opts.fontSize = 12;
        opts.lpd = 4;
        blocks[cname] = {name: "target2CommType", type: "Component~Cp_base~label.sys0", opts: opts};


        var cname = lyMaps["barBody"] + "~" + 1;
        var opts = {};
        opts.innerText = '<i class="gf">&#xe316;</i>';
        opts.baseColor = "#ccf";
        opts.actionFunc = function (iobj) {
            actionPrg(iobj, "upButton");
        };
        blocks[cname] = {name: "setButton", type: "Component~Cp_base~button.sys0", opts: opts};
        //==============================
        var cname = lyMaps["barBody"] + "~" + 2;
        var opts = {};
        opts.innerText = '<i class="gf">&#xe313;</i>';
        opts.baseColor = "#ccf";
        opts.actionFunc = function (iobj) {
            actionPrg(iobj, "downButton");
        };
        blocks[cname] = {name: "setButton", type: "Component~Cp_base~button.sys0", opts: opts};
        //==============================
        var cname = lyMaps["barBody"] + "~" + 3;
        var opts = {};
        opts.innerText = 'clr';
        opts.baseColor = "#ccf";
        opts.actionFunc = function (iobj) {
            actionPrg(iobj, "downButton");
        };
        blocks[cname] = {name: "setButton", type: "Component~Cp_base~button.sys0", opts: opts};
        //==============================




        //==============================
    }
}



class LocationTarget {
    constructor() {
    }
    initOpts(md) {
        var self = this;
        var opts = {};
        Block.setBaseOpts(opts);
        opts.baseColor = "#000";
        return opts;
    }
    create() {
    }
    actionFunc(iobj) {
        console.log(iobj);
        if (iobj.act === "mouseClick") {
            if (iobj.keyId === "radarPaneSetButton") {
            }
        }

    }

    build() {
        var self = this;
        var md = self.md;
        var op = md.opts;
        var lyMaps = md.lyMaps;
        var blocks = op.blocks;
        var layouts = op.layouts;
        //======================================    
        var cname = "c";
        var opts = {};
        layouts[cname] = {name: cname, type: "Layout~Ly_base~array.sys0", opts: opts};
        lyMaps["body"] = cname;
        //================
        var opts = {};
        md.setPns(opts);
        blocks[cname] = {name: "basePanel", type: "Component~Cp_base~plate.none", opts: opts};
        //======================================    
        var cname = lyMaps["body"] + "~" + 0;
        var opts = {};
        opts.yArr = [50, 9999];
        layouts[cname] = {name: cname, type: "Layout~Ly_base~xyArray.sys0", opts: opts};
        lyMaps["mainBody"] = cname;
        //==============================
        var cname = lyMaps["mainBody"] + "~" + 0;
        var opts = {};
        opts.xArr = [9999, 150];
        layouts[cname] = {name: cname, type: "Layout~Ly_base~xyArray.sys0", opts: opts};
        lyMaps["titleBody"] = cname;
        //==============================
        var cname = lyMaps["titleBody"] + "~" + 0;
        var opts = {};
        opts.innerText = "雷達位置圖";
        opts.textAlign = "left";
        blocks[cname] = {name: "basePanel", type: "Component~Cp_base~label.title", opts: opts};

        var cname = lyMaps["titleBody"] + "~" + 1;
        var opts = {};
        opts.innerText = "離開";
        opts.baseColor = "#ccf";
        opts.actionFunc = function (iobj) {
            gr.appType = "Model~DummyTarget~base.sys0";
            sys.dispWebPage();
        };
        blocks[cname] = {name: "basePanel", type: "Component~Cp_base~button.sys0", opts: opts};
        //==========================
        var cname = lyMaps["mainBody"] + "~" + 1;
        var opts = {};
        opts.xArr = [530, 9999];
        layouts[cname] = {name: cname, type: "Layout~Ly_base~xyArray.sys0", opts: opts};
        lyMaps["centerBody"] = cname;
        //==============================
        var cname = lyMaps["centerBody"] + "~" + 0;
        var opts = {};
        opts.ym = 4;
        opts.yArr = ["0.1rh", "0.24rh", "0.24rh", "0.24rh", "0.18rh"];
        layouts[cname] = {name: cname, type: "Layout~Ly_base~xyArray.sys0", opts: opts};
        lyMaps["leftBody"] = cname;
        //==============================

        var cname = lyMaps["leftBody"] + "~" + 0;
        var opts = {};
        opts.title = "位置來源";
        opts.setOptss = [];
        var setOptss = opts.setOptss;
        opts.yArr = [9999];
        opts.xyArr = [
            [9999]
        ];
        setOptss.push(sopt.getButtonRadio({enum: ["GPS天線", "手動輸入"]}));
        blocks[cname] = {name: "positionPanel", type: "Model~MdaSetGroup~base.sys0", opts: opts};
        //===============================================



        var optsGroupFunc = function (opts) {
            opts.editIndex = 10;
            opts.setOptss = [];
            var setOptss = opts.setOptss;
            opts.yArr = [40, 40, 40, 40, 9999];
            opts.xyArr = [
                [180, 90, 90, 9999],
                [180, 90, 90, 9999],
                ["0.40rw", "0.32rw", 9999],
                [9999],
                [9999]
            ];
            setOptss.push(sopt.getEditUnit({title: " 緯度:", titleWidth: 70, "unit": "度", unitWidth: 40, value: 22, max: 99}));
            setOptss.push(sopt.getEditUnit({title: " 緯度:分", "unit": "分", unitWidth: 40, value: 59, max: 59}));
            setOptss.push(sopt.getEditUnit({title: " 緯度:秒", "unit": "秒", unitWidth: 40, value: 59, max: 59}));
            setOptss.push(sopt.getEditUnit({title: " 緯度:百分秒", "unit": "百分秒", unitWidth: 80, value: 99, max: 99}));
            //
            setOptss.push(sopt.getEditUnit({title: " 經度:", titleWidth: 70, "unit": "度", unitWidth: 40, value: "122", max: 179}));
            setOptss.push(sopt.getEditUnit({title: " 經度:分", "unit": "分", unitWidth: 40, value: 59, max: 59}));
            setOptss.push(sopt.getEditUnit({title: " 經度:秒", "unit": "秒", unitWidth: 40, value: 59, max: 59}));
            setOptss.push(sopt.getEditUnit({title: " 經度:百分秒", "unit": "百分秒", unitWidth: 80, value: 99, max: 99}));
            //
            setOptss.push(sopt.getEditUnit({title: " 高度:", titleWidth: 70, "unit": "公尺", unitWidth: 60, value: 123}));
            setOptss.push(sopt.getEditUnit({title: " 方位:", titleWidth: 70, "unit": "度", unitWidth: 40, value: 48, max: 360}));
            setOptss.push(sopt.getButtonActs({titleWidth: 0, enum: ['<i class="gf">&#xf028</i>', '<i class="gf">&#xe161</i>']}));
            //
            setOptss.push(sopt.getLabelViews({title: " 狀態:", titleWidth: 70, enum: ["view string"]}));
        };


        var cname = lyMaps["leftBody"] + "~" + 1;
        var opts = {};
        opts.title = "主控雷達";
        opts.titleIconColor = "#f00";
        opts.titleIcon = "➤";
        optsGroupFunc(opts);
        blocks[cname] = {name: "ladarGpsPanel", type: "Model~MdaSetGroup~base.sys0", opts: opts};
        //=========================
        var cname = lyMaps["leftBody"] + "~" + 2;
        var opts = {};
        opts.title = "誘標雷達1";
        opts.titleIconColor = "#0f0";
        opts.titleIcon = "➤";
        optsGroupFunc(opts);
        blocks[cname] = {name: "targetGpsPanel1", type: "Model~MdaSetGroup~base.sys0", opts: opts};
        //=========================
        var cname = lyMaps["leftBody"] + "~" + 3;
        var opts = {};
        opts.title = "誘標雷達2";
        opts.titleIconColor = "#00f";
        opts.titleIcon = "➤";
        optsGroupFunc(opts);
        blocks[cname] = {name: "targetGpsPanel2", type: "Model~MdaSetGroup~base.sys0", opts: opts};
        //=========================
        var cname = lyMaps["leftBody"] + "~" + 4;
        var opts = {};
        opts.title = "距離";
        opts.setOptss = [];
        var setOptss = opts.setOptss;
        opts.yArr = [35, 35, 35, 9999];
        opts.xyArr = [
            [9999],
            [9999],
            [9999],
            [9999]
        ];
        setOptss.push(sopt.getLabelViews({title: "雷達距誘標1:", titleWidth: 200, enum: ["view string"], unit: "公尺", unitWidth: 100}));
        setOptss.push(sopt.getLabelViews({title: "雷達距誘標2:", titleWidth: 200, enum: ["view string"], unit: "公尺", unitWidth: 100}));
        setOptss.push(sopt.getLabelViews({title: "誘標1距誘標2:", titleWidth: 200, enum: ["view string"], unit: "公尺", unitWidth: 100}));
        setOptss.push(null);
        blocks[cname] = {name: "rangePanel", type: "Model~MdaSetGroup~base.sys0", opts: opts};
        //=========================
        var cname = lyMaps["centerBody"] + "~" + 1;
        var opts = {};
        opts.ym = 4;
        opts.yArr = [9999, "0.18rh"];
        layouts[cname] = {name: cname, type: "Layout~Ly_base~xyArray.sys0", opts: opts};
        lyMaps["rightBody"] = cname;
        //==============================



        var cname = lyMaps["rightBody"] + "~" + 0;
        var opts = {};
        blocks[cname] = {name: "radarScreen", type: "Model~MyRadar~base.sys0", opts: opts};

        var cname = lyMaps["rightBody"] + "~" + 1;
        var opts = {};
        opts.title = "雷達模擬";
        opts.setOptss = [];
        var setOptss = opts.setOptss;
        opts.yArr = [40, 40, 40, 9999];
        opts.xyArr = [
            ["0.5rw", 9999],
            ["0.5rw", 9999],
            [9999],
            [9999]
        ];
        setOptss.push(sopt.getEditUnit({title: "雷達輻射起始角度:", titleWidth: 200, "unit": "度", unitWidth: 40, value: "23"}));
        setOptss.push(sopt.getEditUnit({title: "雷達輻射終止角度:", titleWidth: 200, "unit": "度", unitWidth: 40, value: "151"}));
        setOptss.push(sopt.getEditUnit({title: "RPM:", titleWidth: 200, "unit": "轉", unitWidth: 40, value: "6.8"}));
        setOptss.push(sopt.getButtonActs({titleWidth: 0, enum: ['<i class="gf">&#xf028</i>', "地圖"]}));
        setOptss.push(sopt.getButtonActs({titleWidth: 0, enum: ['放大', '縮小', "啟動", "停止"]}));
        opts.editIndex = 3;
        opts.actionFunc = function (iobj) {
            console.log(iobj);
            if (iobj.nameId === "mdaSetLine#4") {
                if (iobj.buttonInx === 2) {//start
                    md.blockRefs["radarScreen"].opts.run_f = 1;
                    return;
                }
                if (iobj.buttonInx === 3) {//stop
                    md.blockRefs["radarScreen"].opts.run_f = 0;
                    return;
                }
            }
        };
        blocks[cname] = {name: "ladarLaunchPanel", type: "Model~MdaSetGroup~base.sys0", opts: opts};
        //=========================


    }
}




class SetGroup {
    constructor() {
    }
    initOpts(md) {
        var self = this;
        var opts = {};
        Block.setBaseOpts(opts);
        opts.baseColor = "#222";
        opts.title = "GroupSet";
        opts.titleWidth = 100;
        opts.titleColor = "#fff";
        opts.titleIconColor = "#ccc";
        opts.titleIcon = "";
        opts.setBorderWidth = 1;
        opts.editIndex = -1;
        opts.editButtonIndex = 0;
        opts.ym = 2;
        opts.setOptss = [];
        var setOptss = opts.setOptss;
        setOptss.push(sopt.getEditUnit({title: "緯度:", titleWidth: 60, "unit": "度", unitWidth: 50}));
        setOptss.push(sopt.getEditUnit({"unit": "分", unitWidth: 50}));
        opts.yArr = [45, 45, 45, 45, 9999];
        opts.xyArr = [
            [200, 100, 100, 9999],
            [100, 100, 100, 9999],
            [100, 100, 100, 9999],
            [100, 100, 100, 9999],
            [9999]
        ];

        return opts;
    }
    create() {
    }

    chkWatch(optName) {
        var md = this.md;
        var op = md.opts;
        var st = md.stas;
        if (st.blurObjName) {
            if (!st.blurTime)
                st.blurTime = 0;
            st.blurTime++;
            if (st.blurTime > 30) {
                st.blurObjName = "";
            }
        }
    }

    actionFunc(iobj) {
        console.log(iobj);
        var md = iobj.sender.fatherMd;
        var st = md.stas;
        var op = md.opts;
        if (iobj.act === "mouseClick") {
            if (iobj.sender.name === ("mdaSetLine#" + op.editIndex)) {
                if (iobj.buttonInx === op.editButtonIndex) {
                    if (st.blurObjName) {
                        console.log(st.blurObjName);
                        var obj = md.blockRefs[st.blurObjName];
                        var opts = {};
                        opts.setOpts = {};
                        KvLib.deepCoverObject(opts.setOpts, obj.opts.setOpts);
                        opts.setOpts.titleWidth = 0;
                        opts.setOpts.unitWidth = 0;
                        opts.title = opts.setOpts.title;
                        mda.intPadBox(opts);
                    }
                    return;
                }
                return;
            }
            iobj.nameId = iobj.sender.name;
            iobj.sender = iobj.sender.fatherMd;
            KvLib.exe(op.actionFunc, iobj);
            return;
        }
        if (iobj.act === "blur") {
            var sender = iobj.sender;
            st.blurTime = 0;
            st.blurObjName = sender.name;
        }
    }

    build() {
        var self = this;
        var md = self.md;
        var op = md.opts;
        var lyMaps = md.lyMaps;
        var blocks = op.blocks;
        var layouts = op.layouts;
        //======================================    
        var cname = "c";
        var opts = {};
        md.setPns(opts);
        layouts[cname] = {name: cname, type: "Layout~Ly_base~array.sys0", opts: opts};
        lyMaps["body"] = cname;
        //======================================    
        var opts = {};
        md.setPns(opts);
        blocks[cname] = {name: "basePanel", type: "Component~Cp_base~plate.sys0", opts: opts};
        //=======================================
        var cname = lyMaps["body"] + "~" + 0;
        var opts = {};
        layouts[cname] = {name: cname, type: "Layout~Ly_base~array.sys0", opts: opts};
        lyMaps["mainBody"] = cname;
        var cname = lyMaps["mainBody"] + "~" + 0;
        var opts = {};
        opts.baseColor = op.baseColor;
        opts.margin = 4;
        opts.tm = 12;
        opts.borderColor = "#fff";
        blocks[cname + "#0"] = {name: "basePanel", type: "Component~Cp_base~plate.sys0", opts: opts};
        //=====================================
        if (op.titleIcon) {
            var opts = {};
            opts.iw = 26;
            opts.ih = 26;
            opts.wAlign = "left";
            opts.hAlign = "top";
            opts.lm = 20;
            opts.tm = 0;
            opts.lpd = 4;
            opts.innerText = op.titleIcon;
            opts.innerTextColor = op.titleIconColor;
            opts.textAlign = "left";
            opts.baseColor = op.baseColor;
            blocks[cname + "#1"] = {name: "titleIcon", type: "Component~Cp_base~plate.none", opts: opts};
        }
        //======================================
        var opts = {};
        opts.innerText = op.title;
        opts.fontSize = 20;
        opts.fontWeight = "normal";
        opts.fontFamily = "nomospace";
        var wobj = KvLib.measureText(op.title, opts.fontSize, opts.fontWeight, opts.fontFamily);
        opts.iw = wobj.w + 10;//op.titleWidth;
        opts.ih = 26;
        opts.wAlign = "left";
        opts.hAlign = "top";
        opts.lm = 20;
        if (op.titleIcon)
            opts.lm = 20 + 26;
        opts.tm = 0;
        opts.lpd = 4;
        opts.innerTextColor = op.titleColor;
        opts.textAlign = "left";
        opts.baseColor = op.baseColor;
        blocks[cname + "#2"] = {name: "title", type: "Component~Cp_base~plate.none", opts: opts};


        //=====================================

        var cname = lyMaps["mainBody"] + "~" + 0;
        var opts = {};
        opts.margin = 8;
        opts.tm = 30;
        opts.xm = 2;
        opts.ym = op.ym;
        opts.yArr = op.yArr;
        opts.xyArr = op.xyArr;
        layouts[cname] = {name: cname, type: "Layout~Ly_base~xyArray.sys0", opts: opts};
        lyMaps["gridBody"] = cname;
        //===
        for (var i = 0; i < op.setOptss.length; i++) {
            var cname = lyMaps["gridBody"] + "~" + i;
            var opts = {};
            opts.setOpts = op.setOptss[i];
            opts.titleBorderWidth = 1;
            if (opts.setOpts) {
                opts.actionFunc = this.actionFunc;
                blocks[cname ] = {name: "mdaSetLine#" + i, type: "Model~MdaSetLine~base.sys0", opts: opts};
            }
        }
        return;
    }
}








class MyRadar {
    constructor() {
    }
    initOpts(md) {
        var self = this;
        var opts = {};
        Block.setBaseOpts(opts);
        opts.sizeRate = 0.9;
        opts.baseColor = "#000";
        opts.setPanelWidth = 0;
        opts.bufferSize = 2000;
        opts.powerOn_f = 1;
        opts.run_f = 1;
        opts.axeWidth = 0.5;
        opts.angleTextFontSize = 12;
        opts.angleTextPeriod = 10;
        opts.symbleEdit_f = 1;
        opts.speedAmt = 10;
        opts.speedAngleDiv = 3600;
        opts.radarColor = 0x3000ff00;





        //===============
        opts.messages = [];
        var mesObj = {};
        mesObj.xr = 0.01;
        mesObj.yr = 0.01;
        mesObj.text = "Range: 1000M";
        mesObj.color = "#0f0";
        mesObj.offY = 10;
        mesObj.fontSize = 12;
        mesObj.fontFamily = "monospace";
        opts.messages.push(mesObj);
        //===============
        var mesObj = {};
        mesObj.xr = 0.5;
        mesObj.yr = 0.5;
        mesObj.text = "➤";
        mesObj.color = "#f00";
        mesObj.offY = 11;
        mesObj.angle = 270;
        mesObj.fontSize = 32;
        mesObj.fontFamily = "monospace";
        opts.messages.push(mesObj);
        //===============
        var mesObj = {};
        mesObj.xr = 0.65;
        mesObj.yr = 0.35;
        mesObj.text = "➤";
        mesObj.color = "#0f0";
        mesObj.offY = 11;
        mesObj.angle = 160;
        mesObj.fontSize = 32;
        mesObj.fontFamily = "monospace";
        opts.messages.push(mesObj);
        //===============
        var mesObj = {};
        mesObj.xr = 0.7;
        mesObj.yr = 0.8;
        mesObj.text = "➤";
        mesObj.color = "#00f";
        mesObj.offY = 11;
        mesObj.angle = 45;
        mesObj.fontSize = 32;
        mesObj.fontFamily = "monospace";
        opts.messages.push(mesObj);
        //===============








        return opts;
    }

    afterCreate() {
        var md = this.md;
        var op = md.opts;
        var st = md.stas;
        //==
        var plotObj = md.blockRefs["container"];
        var plotElem = plotObj.elems["base"];
        st.containerWidth = plotObj.stas.containerWidth;
        st.containerHeight = plotObj.stas.containerHeight;
        //=======================================================

        //==========================================================
        var selem = document.createElement("canvas");
        selem.id = md.kid + "_canvas";
        selem.width = st.containerWidth;
        selem.height = st.containerHeight;
        selem.style.position = "absolute";
        selem.style.left = 0 + "px";
        selem.style.top = 0 + "px";
        selem.style.zIndex = "0";
        selem.style.width = "100%";
        selem.style.height = "100%";
        plotElem.appendChild(selem);
        st.canvasLy0 = selem;
        if (!op.powerOn_f)
            return;
        //=========================================
        var selem = document.createElement("canvas");
        selem.id = md.kid + "_canvasLy1";
        selem.width = st.containerWidth;
        selem.height = st.containerHeight;
        selem.style.position = "absolute";
        selem.style.left = 0 + "px";
        selem.style.top = 0 + "px";
        selem.style.zIndex = "1";
        selem.style.width = "100%";
        selem.style.height = "100%";
        plotElem.appendChild(selem);
        st.canvasLy1 = selem;
        //=========================================
        var selem = document.createElement("canvas");
        selem.id = md.kid + "_canvasLy1";
        selem.width = st.containerWidth;
        selem.height = st.containerHeight;
        selem.style.position = "absolute";
        selem.style.left = 0 + "px";
        selem.style.top = 0 + "px";
        selem.style.zIndex = "2";
        selem.style.width = "100%";
        selem.style.height = "100%";
        plotElem.appendChild(selem);
        st.canvasLy2 = selem;
        //=========================================
        if (!st.canvasLy0.getContext)
            return;
        if (!st.canvasLy1.getContext)
            return;
        if (!st.canvasLy2.getContext)
            return;
        st.ctxBase = st.canvasLy0.getContext('2d');
        st.ctxSymble = st.canvasLy1.getContext('2d');
        st.ctxRadar = st.canvasLy2.getContext('2d');

        this.createScope();
        //=========================================
        var iobj = {};
        iobj.act = "afterCreate";
        iobj.sender = md;
        KvLib.exe(op.actionFunc, iobj);
    }

    chkWatch(optName) {
        var md = this.md;
        var op = md.opts;
        var st = md.stas;
        if (optName === "grid_f") {
            this.drawAxe(1);
        }
        this.frameTimer();
    }

    frameTimer() {
        var self = this;
        var md = this.md;
        var op = md.opts;
        var st = md.stas;
        self.drawSymble();
        self.drawFade();
        if (!op.run_f)
            return;
        self.drawScan();


    }

    createScope(editObj) {
        var self = this;
        self.drawAxe(1);
        self.clearRadar();
    }

    drawSymble() {



    }
    drawSymble() {
        var op = this.md.opts;
        var st = this.md.stas;
        if (!op.symbleEdit_f)
            return;
        op.symbleEdit_f = 0;
        st.ctxSymble.clearRect(0, 0, st.containerWidth, st.containerHeight);
        this.drawMessages();
    }

    clearAll() {
        var st = this.md.stas;
        st.ctxBase.clearRect(0, 0, st.containerWidth, st.containerHeight);
        st.ctxSymble.clearRect(0, 0, st.containerWidth, st.containerHeight);
        st.ctxRadar.clearRect(0, 0, st.containerWidth, st.containerHeight);
    }

    clearRadar() {
        var st = this.md.stas;
        st.ctxRadar.clearRect(0, 0, st.containerWidth, st.containerHeight);
    }

    drawFade() {
        var st = this.md.stas;
        if (!st.ctxRadarData)
            return;
        if (!st.fadeCnt)
            st.fadeCnt = 0;
        if (++st.fadeCnt < 5) {
            return;
        }
        st.fadeCnt = 0;
        var st = this.md.stas;
        for (var yy = 0; yy < st.scanHeight; yy++) {
            for (var xx = 0; xx < st.scanWidth; xx++) {
                var index = (xx + yy * st.scanWidth) * 4 + 3;
                if (st.ctxRadarData.data[index])
                    st.ctxRadarData.data[index]--;
            }
        }
        st.ctxRadar.putImageData(st.ctxRadarData, st.scanOffX, st.scanOffY);
    }

    drawScan() {
        var st = this.md.stas;
        var op = this.md.opts;
        if (!st.ctxRadarData)
            return;
        var bb = (op.radarColor >> 0) & 255;
        var gg = (op.radarColor >> 8) & 255;
        var rr = (op.radarColor >> 16) & 255;
        var aa = (op.radarColor >> 24) & 255;
        for (var i = 0; i < op.speedAmt; i++) {
            st.scanAngle += 1;
            var sin = Math.sin(Math.PI * 2 * st.scanAngle / (op.speedAngleDiv));
            var cos = Math.cos(Math.PI * 2 * st.scanAngle / (op.speedAngleDiv));
            for (var j = 0; j < st.sRadius; j++) {
                var xx = ((j * cos) | 0) + st.sRadius;
                var yy = ((j * sin) | 0) + st.sRadius;
                var index = (xx + yy * st.scanWidth) * 4;
                st.ctxRadarData.data[index + 0] = rr;
                st.ctxRadarData.data[index + 1] = gg;
                st.ctxRadarData.data[index + 2] = bb;
                st.ctxRadarData.data[index + 3] = aa;
            }
        }
        st.ctxRadar.putImageData(st.ctxRadarData, st.scanOffX, st.scanOffY);
    }

    drawMessages() {
        var st = this.md.stas;
        var op = this.md.opts;
        var ctx = st.ctxSymble;
        for (var i = 0; i < op.messages.length; i++) {
            var mesObj = op.messages[i];
            ctx.save();
            ctx.fillStyle = mesObj.color;
            ctx.font = mesObj.fontSize + "px " + mesObj.fontFamily;
            var xx = (mesObj.xr * st.containerWidth) | 0;
            var yy = (mesObj.yr * st.containerHeight) | 0;
            var text = mesObj.text;
            if (mesObj.angle) {
                var metrics = ctx.measureText(text);
                ctx.translate(xx, yy);
                ctx.rotate(2 * Math.PI * (mesObj.angle) / 360);
                ctx.fillText(text, -(metrics.width) / 2, mesObj.offY);
            } else {
                ctx.fillText(text, xx, yy + mesObj.offY);
            }
            ctx.restore();

        }
    }

    drawAxe(clr) {
        var op = this.md.opts;
        var st = this.md.stas;
        var ctx = st.ctxBase;
        if (clr) {
            ctx.clearRect(0, 0, st.containerWidth, st.containerHeight);
        }
        var centerX = (st.containerWidth / 2) | 0;
        var centerY = (st.containerHeight / 2) | 0;
        var radius = (st.containerWidth * op.sizeRate / 2) | 0;
        var sRadius = radius - 12;
        var ssRadius = radius - 5;
        //===============================    
        st.centerX = centerX;
        st.centerY = centerY;
        st.sRadius = sRadius;
        st.scanWidth = (sRadius * 2 + 1) | 0;
        st.scanHeight = (sRadius * 2 + 1) | 0;
        st.scanOffX = ((st.containerWidth - st.scanWidth) / 2) | 0;
        st.scanOffY = ((st.containerHeight - st.scanHeight) / 2) | 0;
        st.ctxRadarData = st.ctxRadar.getImageData(st.scanOffX, st.scanOffY, st.scanWidth, st.scanHeight);
        st.scanAngle = 0;
        //===============================    
        ctx.strokeStyle = "#fff";
        ctx.lineWidth = op.axeWidth;
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
        ctx.stroke();
        //======================
        ctx.strokeStyle = "#0f0";
        ctx.lineWidth = op.axeWidth;

        ctx.beginPath();
        ctx.arc(centerX, centerY, sRadius * 0.25, 0, 2 * Math.PI);
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(centerX, centerY, sRadius * 0.5, 0, 2 * Math.PI);
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(centerX, centerY, sRadius * 0.75, 0, 2 * Math.PI);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(centerX - sRadius + 2, centerY);
        ctx.lineTo(centerX + sRadius - 2, centerY);
        ctx.moveTo(centerX, centerY - sRadius + 2);
        ctx.lineTo(centerX, centerY + sRadius - 2);
        ctx.stroke();
        //======================
        ctx.strokeStyle = "#f00";
        ctx.lineWidth = op.axeWidth;
        ctx.beginPath();
        for (var i = 0; i < 360; ) {
            var sin = Math.sin(Math.PI * 2 * i / 360);
            var cos = Math.cos(Math.PI * 2 * i / 360);
            ctx.moveTo(radius * cos + centerX, radius * sin + centerY);
            ctx.lineTo(sRadius * cos + centerX, sRadius * sin + centerY);
            i += 5;
        }
        for (var i = 0; i < 360; ) {
            if (i % 5) {
                var sin = Math.sin(Math.PI * 2 * i / 360);
                var cos = Math.cos(Math.PI * 2 * i / 360);
                ctx.moveTo(radius * cos + centerX, radius * sin + centerY);
                ctx.lineTo(ssRadius * cos + centerX, ssRadius * sin + centerY);
            }
            i += 1;
        }
        ctx.stroke();
        //======================
        i = 0;
        var fontSize = op.angleTextFontSize;
        var radiusT = radius + 10;
        var startDeg = 90;
        for (var i = 0; i < 360; i += op.angleTextPeriod) {
            var sin = Math.sin(Math.PI * 2 * (startDeg - i) / 360);
            var cos = Math.cos(Math.PI * 2 * (startDeg - i) / 360);
            var text = "" + i;
            var metrics = ctx.measureText(text);
            ctx.save();
            ctx.fillStyle = "#0f0";
            ctx.font = fontSize + "px monospace";
            ctx.textAlign = 'center';
            ctx.textBaseline = "bottom";
            ctx.translate(radiusT * cos + centerX, centerY - radiusT * sin);
            ctx.rotate(2 * Math.PI * (i) / 360);
            ctx.fillText(text, 0, fontSize / 2);
            ctx.restore();
        }
    }

    actionFunc(iobj) {
        console.log(iobj);
        if (iobj.act === "mouseClick") {
            if (iobj.keyId === "radarPaneSetButton") {
            }
        }
    }

    build() {
        var self = this;
        var md = self.md;
        var op = md.opts;
        var lyMaps = md.lyMaps;
        var blocks = op.blocks;
        var layouts = op.layouts;
        //======================================    
        var cname = "c";
        var opts = {};
        md.setPns(opts);
        layouts[cname] = {name: cname, type: "Layout~Ly_base~array.sys0", opts: opts};
        lyMaps["body"] = cname;
        //======================================    
        var opts = {};
        md.setPns(opts);
        blocks[cname] = {name: "basePanel", type: "Component~Cp_base~plate.sys0", opts: opts};
        //=======================================
        var cname = lyMaps["body"] + "~" + 0;
        var opts = {};
        opts.xArr = [9999, op.setPanelWidth];
        layouts[cname] = {name: cname, type: "Layout~Ly_base~xyArray.sys0", opts: opts};
        lyMaps["mainBody"] = cname;

        var cname = lyMaps["mainBody"] + "~" + 0;
        var opts = {};
        opts.baseColor = "#000";
        opts.whr = 1;
        blocks[cname] = {name: "container", type: "Component~Cp_base~container.sys0", opts: opts};


        return;


    }
}

class SelfTest {
    constructor() {
    }
    initOpts(md) {
        var self = this;
        var opts = {};
        Block.setBaseOpts(opts);
        opts.baseColor = "#222";
        opts.slotNames = [
            "slotNames#sipCtrMdA#ＩＰＣ模組",
            "slotNames#sipCtrMdA#ＦＰＧＡ控制模組",
            "slotNames#noneCtrMdA#ＩＯ模組",
            "slotNames#t1e1CtrMdB#光纖模組 １",
            "slotNames#fxoCtrMdA#光纖模組 ２",
            "slotNames#fxoCtrMdB#ＲＦ傳輸驅動模組 Ａ",
            "slotNames#fxsCtrMdA#ＲＦ傳輸驅動模組 Ｂ",
            "slotNames#fxsCtrMdB#邏輯分析模組",
            "slotNames#magPhCtrMdA# ",
            "slotNames#magPhCtrMdB# ",
            "slotNames#roipCtrMdA# ",
            "slotNames#recorderCtrMdA# "
        ];


        return opts;
    }
    create() {
    }
    actionFunc(iobj) {
        console.log(iobj);
        if (iobj.act === "mouseClick") {
            if (iobj.keyId === "radarPaneSetButton") {
            }
        }

    }

    build() {
        var self = this;
        var md = self.md;
        var op = md.opts;
        var lyMaps = md.lyMaps;
        var blocks = op.blocks;
        var layouts = op.layouts;
        //======================================    
        var cname = "c";
        var opts = {};
        //md.setPns(opts);
        layouts[cname] = {name: cname, type: "Layout~Ly_base~array.sys0", opts: opts};
        lyMaps["body"] = cname;
        //==
        var opts = {};
        md.setPns(opts);
        blocks[cname] = {name: "basePanel", type: "Component~Cp_base~plate.none", opts: opts};
        //======================================    
        var cname = lyMaps["body"] + "~" + 0;
        var opts = {};
        opts.yArr = [50, 9999, 400];
        opts.margin = 4;
        layouts[cname] = {name: cname, type: "Layout~Ly_base~xyArray.sys0", opts: opts};
        lyMaps["mainBody"] = cname;
        //==============================
        var cname = lyMaps["mainBody"] + "~" + 0;
        var opts = {};
        opts.xArr = [9999, 150];
        layouts[cname] = {name: cname, type: "Layout~Ly_base~xyArray.sys0", opts: opts};
        lyMaps["headBody"] = cname;
        //===
        var cname = lyMaps["headBody"] + "~" + 0;
        var opts = {};
        opts.innerText = "系統測試";
        opts.textAlign = "left";
        blocks[cname] = {name: "titlePanel", type: "Component~Cp_base~label.title", opts: opts};
        //===
        var cname = lyMaps["headBody"] + "~" + 1;
        var opts = {};
        opts.innerText = "離開";
        opts.baseColor = "#ccf";
        opts.actionFunc = function (iobj) {
            gr.appType = "Model~DummyTarget~base.sys0";
            sys.dispWebPage();
        };
        blocks[cname] = {name: "escButton", type: "Component~Cp_base~button.sys0", opts: opts};
        //==============================
        var cname = lyMaps["mainBody"] + "~" + 1;
        var opts = {};
        opts.xc = 8;
        opts.margin = 10;
        opts.iw = 800;
        layouts[cname] = {name: cname, type: "Layout~Ly_base~array.sys0", opts: opts};
        lyMaps["slotBody"] = cname;
        //===
        for (var i = 0; i < 8; i++) {
            var strA = op.slotNames[i].split("#");
            var cname = lyMaps["slotBody"] + "~" + i;
            var opts = {};
            opts.innerText = strA[2];
            opts.backgroundImageUrls = ["systemResource/slot.bmp"];
            opts.writingMode = "vertical-lr";
            opts.fontSize = "0.4rw";
            opts.textAlign = "left";
            opts.tpd = 20;
            opts.fontSize = 30;
            opts.textShadow = "1px 1px 1px #aaa";
            opts.zIndex = "0";
            blocks[cname + "#0"] = {name: "slotPanel#" + i, type: "Component~Cp_base~images.sys0", opts: opts};


            var opts = {};
            opts.backgroundInx = 1;
            opts.zIndex = "1";
            opts.iw = 50;
            opts.ih = 50;
            opts.hAlign = "bottom";
            opts.bm = 20;
            blocks[cname + "#1"] = {name: "startLed", type: "Component~Cp_base~icons.led", opts: opts};


        }



        var cname = lyMaps["mainBody"] + "~" + 2;
        var opts = {};
        opts.xArr = [9999, 150];
        layouts[cname] = {name: cname, type: "Layout~Ly_base~xyArray.sys0", opts: opts};
        lyMaps["footBody"] = cname;


        var cname = lyMaps["footBody"] + "~" + 0;
        var opts = {};
        blocks[cname] = {name: "editor", type: "Component~Cp_base~editor.sys0", opts: opts};



        var cname = lyMaps["footBody"] + "~" + 1;
        var opts = {};
        opts.buttons = ["測試開始", "測試停止", "清除"];
        opts.buttonAmt = 6;
        opts.buttonIds = ["location", "selfTest", "sync", "setting", "location", "selfTest", "sync", "setting"];
        opts.layoutType = "collum";
        opts.margin = 4;
        opts.fontSize = "0.5rh";
        opts.xm = 4;
        opts.ym = 10;
        ;
        opts.actionFunc = function (iobj) {
            if (iobj.buttonId === "location") {
                return;
            }
            if (iobj.buttonId === "selfTest") {
                return;
            }
        };
        blocks[cname] = {name: "headButtons", type: "Model~MdaButtons~base.sys0", opts: opts};

        //===




    }
}

class SyncTest {
    constructor() {
    }
    initOpts(md) {
        var self = this;
        var opts = {};
        Block.setBaseOpts(opts);
        opts.baseColor = "#222";

        return opts;
    }
    create() {
    }
    actionFunc(iobj) {
        console.log(iobj);
        if (iobj.act === "mouseClick") {
            if (iobj.keyId === "radarPaneSetButton") {
            }
        }

    }

    build() {
        var self = this;
        var md = self.md;
        var op = md.opts;
        var lyMaps = md.lyMaps;
        var blocks = op.blocks;
        var layouts = op.layouts;
        //======================================    
        var cname = "c";
        var opts = {};
        //md.setPns(opts);
        layouts[cname] = {name: cname, type: "Layout~Ly_base~array.sys0", opts: opts};
        lyMaps["body"] = cname;
        //==
        var opts = {};
        md.setPns(opts);
        blocks[cname] = {name: "basePanel", type: "Component~Cp_base~plate.none", opts: opts};
        //======================================    
        var cname = lyMaps["body"] + "~" + 0;
        var opts = {};
        opts.yArr = [50, 160, 9999, 80];
        opts.ym = 10;
        opts.margin = 4;
        layouts[cname] = {name: cname, type: "Layout~Ly_base~xyArray.sys0", opts: opts};
        lyMaps["mainBody"] = cname;
        //==============================
        var cname = lyMaps["mainBody"] + "~" + 0;
        var opts = {};
        opts.xArr = [9999, 150];
        layouts[cname] = {name: cname, type: "Layout~Ly_base~xyArray.sys0", opts: opts};
        lyMaps["headBody"] = cname;
        //===
        var cname = lyMaps["headBody"] + "~" + 0;
        var opts = {};
        opts.innerText = "同步測試設定";
        opts.textAlign = "left";
        opts.lpd = 4;
        blocks[cname] = {name: "titlePanel", type: "Component~Cp_base~label.title", opts: opts};
        //===
        var cname = lyMaps["headBody"] + "~" + 1;
        var opts = {};
        opts.innerText = "離開";
        opts.baseColor = "#ccf";
        opts.actionFunc = function (iobj) {
            gr.appType = "Model~DummyTarget~base.sys0";
            sys.dispWebPage();
        };
        blocks[cname] = {name: "escButton", type: "Component~Cp_base~button.sys0", opts: opts};
        //==============================
        var cname = lyMaps["mainBody"] + "~" + 2;
        var opts = {};
        opts.xc = 2;
        opts.xm = 10;
        layouts[cname] = {name: cname, type: "Layout~Ly_base~array.sys0", opts: opts};
        lyMaps["centerBody"] = cname;
        //===
        var cname = lyMaps["mainBody"] + "~" + 3;
        var opts = {};
        opts.xArr = [9999, 150];
        layouts[cname] = {name: cname, type: "Layout~Ly_base~xyArray.sys0", opts: opts};
        lyMaps["footBody"] = cname;


        var cname = lyMaps["mainBody"] + "~" + 1;
        var opts = {};
        opts.title = "系統";
        opts.setOptss = [];
        var setOptss = opts.setOptss;
        opts.yArr = ["0.5rw", 9999];
        opts.xm = 10;
        opts.ym = 5;
        opts.xyArr = [
            ["0.33rw", "0.33rw", 9999],
            ["0.33rw", "0.33rw", 9999]
        ];
        setOptss.push(sopt.getEditView({title: "時鐘運算偏移:", titleWidth: 150, value: 123, unit: "5ns", unitWidth: 50, dataType: "int"}));
        setOptss.push(sopt.getEditView({title: "時鐘最大誤差:", titleWidth: 150, value: 123, unit: "5ns", unitWidth: 50, dataType: "int"}));
        setOptss.push(sopt.getSelect({title: "1588封包數:", titleWidth: 150, value: 0, dataType: "int"}));
        setOptss[2].enum = ["1", "2", "4", "8", "16", "32", "64", "128", "256", "512", "1024", "2048"];
        setOptss.push(sopt.getEditView({title: "時間微調:", titleWidth: 150, value: 123, unit: "5ns", unitWidth: 50, dataType: "int"}));
        setOptss.push(sopt.getEditView({title: "時間修正偏移:", titleWidth: 150, value: 123, unit: "5ns", unitWidth: 50, dataType: "int"}));
        setOptss.push(sopt.getEditView({title: "VG時間誤差:", titleWidth: 150, value: 123, unit: "5ns", unitWidth: 50, dataType: "int"}));
        blocks[cname] = {name: "rangePanel", type: "Model~MdaSetGroup~base.sys0", opts: opts};




        var targFunc = function (opts) {
            opts.setOptss = [];
            var setOptss = opts.setOptss;
            opts.yArr = ["0.1rh", "0.1rh", "0.1rh", "0.1rh", "0.1rh", "0.1rh", "0.1rh", "0.1rh", "0.1rh", "0.1rh"];
            opts.ym = 10;
            opts.xm = 8;
            opts.xyArr = [
                [9999, 230],
                [9999],
                [9999],
                [9999, 260],
                [9999, 260],
                [9999, 260],
                ["0.5rw", 9999],
                ["0.5rw", 9999],
                ["0.5rw", 9999],
                ["0.5rw", 9999],

                [9999],
                [9999],
                [9999],
                [9999],
                [9999]
            ];
            setOptss.push(sopt.getButtonRadio({title: "傳輸方式:", titleWidth: 140, enum: ["光纖", "無線"], value: 0, dataType: "int", radioName: opts.title + "_rn1"}));
            setOptss.push(sopt.getLabelViews({title: "傳輸狀態:", titleWidth: 120, enum: ["斷線"], dataType: "int"}));
            setOptss.push(sopt.getButtonRadio({title: "通道設定:", titleWidth: 140, enum: ["開啟", "關閉"], value: 0, dataType: "int", radioName: opts.title + "_rn2"}));
            setOptss.push(sopt.getButtonRadio({title: "同步模式:", titleWidth: 140, enum: ["固定延時偏移", "1588延時追蹤"], value: 0, dataType: "int"}));
            setOptss.push(sopt.getEditView({title: "光纖延時偏移:", titleWidth: 150, value: 123, unit: "5ns", unitWidth: 50, dataType: "int", radioName: opts.title + "_rn3"}));
            setOptss.push(sopt.getLabelViews({title: "1588修正:", titleWidth: 140, enum: ["123"], dataType: "int"}));
            setOptss.push(sopt.getEditView({title: "RF延時偏移:", titleWidth: 150, value: 123, unit: "5ns", unitWidth: 50, dataType: "int"}));
            setOptss.push(sopt.getLabelViews({title: "1588修正:", titleWidth: 140, enum: ["123"], dataType: "int"}));
            setOptss.push(sopt.getEditView({title: "延時運算偏移:", titleWidth: 150, value: 123, unit: "5ns", unitWidth: 50, dataType: "int"}));
            setOptss.push(sopt.getEditView({title: "無線頻道:", titleWidth: 140, value: 123, dataType: "int"}));

            setOptss.push(sopt.getLabelViews({title: "同時偏移:", titleWidth: 180, enum: ["123"], dataType: "int"}));
            setOptss.push(sopt.getLabelViews({title: "回傳封包遺失數:", titleWidth: 180, enum: ["123"], dataType: "int"}));

            setOptss.push(sopt.getLabelViews({title: "封包發送數 x256:", titleWidth: 180, enum: ["123"], dataType: "int"}));
            setOptss.push(sopt.getLabelViews({title: "封包接收數 x256:", titleWidth: 180, enum: ["123"], dataType: "int"}));

            setOptss.push(sopt.getLabelViews({title: "正確率/1000:", titleWidth: 180, enum: ["123"], dataType: "int"}));
            setOptss.push(sopt.getLabelViews({title: "副控封包遺失數:", titleWidth: 180, enum: ["123"], dataType: "int"}));

            setOptss.push(sopt.getLabelViews({title: "主雷達RF接收能量:", titleWidth: 180, enum: ["123"], dataType: "int"}));
            setOptss.push(sopt.getLabelViews({title: "誘標RF接收能量:", titleWidth: 180, enum: ["123"], dataType: "int"}));


        };

        var cname = lyMaps["centerBody"] + "~" + 0;
        var opts = {};
        opts.title = "誘標1";
        targFunc(opts);
        blocks[cname] = {name: "rangePanel", type: "Model~MdaSetGroup~base.sys0", opts: opts};

        var cname = lyMaps["centerBody"] + "~" + 1;
        var opts = {};
        opts.title = "誘標2";
        targFunc(opts);
        blocks[cname] = {name: "rangePanel", type: "Model~MdaSetGroup~base.sys0", opts: opts};



        var cname = lyMaps["mainBody"] + "~" + 3;
        var opts = {};
        opts.buttons = ["傳輸開始", "傳輸停止", "邏輯分析", "波形顯示"];
        opts.buttonIds = ["location", "selfTest", "sync", "setting"];
        opts.actionFunc = function (iobj) {
            if (iobj.buttonId === "location") {
                gr.appType = "Model~LocationTarget~base.sys0";
                sys.dispWebPage();
                return;
            }
            if (iobj.buttonId === "selfTest") {
                gr.appType = "Model~SelfTest~base.sys0";
                sys.dispWebPage();
                return;
            }
            if (iobj.buttonId === "sync") {
                gr.appType = "Model~SyncTest~base.sys0";
                sys.dispWebPage();
                return;
            }
        };
        opts.buttonAmt = 4;
        blocks[cname] = {name: "headButtons", type: "Model~MdaButtons~base.sys0", opts: opts};

    }
}
