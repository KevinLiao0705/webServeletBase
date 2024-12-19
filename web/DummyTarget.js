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
                            ;

                        }
                        if (i === 1) {
                            kopts.setOpts = sopt.getButtonRadio();
                            kopts.setOpts.title = "誘標1通訊方式";
                            kopts.setOpts.enum = ["光纖", "無線", "自動"];
                            kopts.setOpts.radioName = "1";
                            ;
                        }
                        if (i === 2) {
                            kopts.setOpts = sopt.getButtonRadio();
                            kopts.setOpts.title = "誘標2通訊方式";
                            kopts.setOpts.enum = ["光纖", "無線", "自動"];
                            kopts.setOpts.radioName = "2";
                            ;
                        }
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
        opts.baseColor = "#444";
        opts.innerTextColor = "#fff";
        //blocks[cname] = {name: "basePanel", type: "Component~Cp_base~label.sys1", opts: opts};



        blocks[cname] = {name: "basePanel", type: "Component~Cp_base~label.sys2", opts: opts};
        //==============================
        var cname = lyMaps["mainBody"] + "~" + 1;
        var opts = {};
        opts.buttons = ["佈署", "自測", "同步", "設定"];
        opts.buttonIds = ["location", "selfTest", "sync", "setting"];
        opts.actionFunc = function (iobj) {
            if (iobj.buttonId === "location") {
                gr.appType = "Model~LocationTarget~base.sys0";
                sys.dispWebPage();
                return;
            }
            if (iobj.buttonId === "selfTest") {
                //gr.appType = "Model~MyNewScope~base.sys0";
                gr.appType = "Model~MyRadar~base.sys0";
                sys.dispWebPage();
                return;
            }
        };
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
        opts.buttonColor = "#ccf";
        opts.buttons = ["button1", "button2", "button3"];
        opts.layoutType = "row";//row,collum,array
        opts.buttonIds = [];
        opts.iw = 9999;
        opts.ih = 9999;
        opts.borderWidth = 1;
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
        opts.yArr = [45, 45, 45, 45, 45, 45, 9999];
        opts.xyArr = [[9999], ["0.5rw", 9999], ["0.5rw", 9999], ["0.5rw", 9999], ["0.5rw", 9999], ["0.5rw", 9999], [9999]];
        layouts[cname] = {name: cname, type: "Layout~Ly_base~xyArray.sys0", opts: opts};
        lyMaps["mainBody"] = cname;


        var cname = lyMaps["mainBody"] + "~" + 0;
        var opts = {};
        opts.innerText = op.title;
        opts.baseColor = "#444";
        opts.innerTextColor = "#fff";
        blocks[cname] = {name: "basePanel", type: "Component~Cp_base~label.sys2", opts: opts};
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
        opts.baseColor = "#ccf";
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
        opts.baseColor = "#ccc";
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
        opts.baseColor = "#444";
        opts.innerTextColor = "#fff";
        blocks[cname] = {name: "basePanel", type: "Component~Cp_base~label.sys2", opts: opts};
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
        blocks[cname] = {name: "setButton", type: "Component~Cp_base~editor.sys0", opts: opts};
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

        var opts = {};
        md.setPns(opts);
        opts.mouseClick_f = 1;
        opts.baseColor = "#222";
        opts.actionFunc = function (iobj) {
        };
        blocks[cname] = {name: "basePanel", type: "Component~Cp_base~plate.none", opts: opts};

        //======================================    
        var cname = lyMaps["body"] + "~" + 0;
        var opts = {};
        opts.yArr = [9999, 60];
        layouts[cname] = {name: cname, type: "Layout~Ly_base~xyArray.sys0", opts: opts};
        lyMaps["mainBody"] = cname;
        //==============================
        var cname = lyMaps["mainBody"] + "~" + 0;
        var opts = {};
        opts.xArr = [530, 9999];
        layouts[cname] = {name: cname, type: "Layout~Ly_base~xyArray.sys0", opts: opts};
        lyMaps["upBody"] = cname;
        //==============================
        var cname = lyMaps["upBody"] + "~" + 0;
        var opts = {};
        opts.ym = 4;
        opts.tm = 4;
        opts.yArr = ["0.24rh", "0.24rh", "0.24rh", "0.18rh", "0.1rh", 9999];
        layouts[cname] = {name: cname, type: "Layout~Ly_base~xyArray.sys0", opts: opts};
        lyMaps["leftBody"] = cname;
        //==============================
        var cname = lyMaps["leftBody"] + "~" + 0;
        var opts = {};
        opts.title = "主控雷達";
        opts.titleBaseColor = "#fcc";
        opts.setOptss = [];
        var setOptss = opts.setOptss;
        opts.yArr = [40, 40, 40, 40, 9999];
        opts.xyArr = [
            [180, 90, 90, 140, 9999],
            [180, 90, 90, 140, 9999],
            [250, 200, 9999],
            [400, 9999],
            [250, 250, 9999],
            [9999]
        ];
        setOptss.push(sopt.getEditUnit({title: "緯度:", titleWidth: 80, "unit": "度", unitWidth: 40, value: "22"}));
        setOptss.push(sopt.getEditUnit({"unit": "分", unitWidth: 40, value: "59"}));
        setOptss.push(sopt.getEditUnit({"unit": "秒", unitWidth: 40, value: "59"}));
        setOptss.push(sopt.getEditUnit({"unit": "百分秒", unitWidth: 80, value: "99"}));
        setOptss.push(null);
        setOptss.push(sopt.getEditUnit({title: "經度:", titleWidth: 80, "unit": "度", unitWidth: 40, value: "122"}));
        setOptss.push(sopt.getEditUnit({"unit": "分", unitWidth: 40, value: "59"}));
        setOptss.push(sopt.getEditUnit({"unit": "秒", unitWidth: 40, value: "59"}));
        setOptss.push(sopt.getEditUnit({"unit": "百分秒", unitWidth: 80, value: "99"}));
        setOptss.push(null);
        setOptss.push(sopt.getEditUnit({title: "高度:", titleWidth: 80, "unit": "公尺", unitWidth: 80, value: "111"}));
        setOptss.push(sopt.getEditUnit({title: "方位:", titleWidth: 80, "unit": "度", unitWidth: 40, value: "111"}));
        setOptss.push(null);
        setOptss.push(sopt.getLabelViews({title: "狀態:", titleWidth: 100, enum: ["view string"]}));
        setOptss.push(null);
        blocks[cname] = {name: "ladarGpsPanel", type: "Model~SetGroup~base.sys0", opts: opts};
        //=========================
        var cname = lyMaps["leftBody"] + "~" + 1;
        var opts = {};
        opts.title = "誘標雷達1";
        opts.titleBaseColor = "#cfc";
        opts.setOptss = [];
        var setOptss = opts.setOptss;
        opts.yArr = [40, 40, 40, 40, 9999];
        opts.xyArr = [
            [180, 90, 90, 140, 9999],
            [180, 90, 90, 140, 9999],
            [250, 200, 9999],
            [400, 9999],
            [250, 250, 9999],
            [9999]
        ];
        setOptss.push(sopt.getEditUnit({title: "緯度:", titleWidth: 80, "unit": "度", unitWidth: 40, value: "22"}));
        setOptss.push(sopt.getEditUnit({"unit": "分", unitWidth: 40, value: "59"}));
        setOptss.push(sopt.getEditUnit({"unit": "秒", unitWidth: 40, value: "59"}));
        setOptss.push(sopt.getEditUnit({"unit": "百分秒", unitWidth: 80, value: "99"}));
        setOptss.push(null);
        setOptss.push(sopt.getEditUnit({title: "經度:", titleWidth: 80, "unit": "度", unitWidth: 40, value: "122"}));
        setOptss.push(sopt.getEditUnit({"unit": "分", unitWidth: 40, value: "59"}));
        setOptss.push(sopt.getEditUnit({"unit": "秒", unitWidth: 40, value: "59"}));
        setOptss.push(sopt.getEditUnit({"unit": "百分秒", unitWidth: 80, value: "99"}));
        setOptss.push(null);
        setOptss.push(sopt.getEditUnit({title: "高度:", titleWidth: 80, "unit": "公尺", unitWidth: 80, value: "111"}));
        setOptss.push(sopt.getEditUnit({title: "方位:", titleWidth: 80, "unit": "度", unitWidth: 40, value: "111"}));
        setOptss.push(null);
        setOptss.push(sopt.getLabelViews({title: "狀態:", titleWidth: 100, enum: ["view string"]}));
        setOptss.push(null);
        blocks[cname] = {name: "targetGpsPanel1", type: "Model~SetGroup~base.sys0", opts: opts};
        //=========================
        var cname = lyMaps["leftBody"] + "~" + 2;
        var opts = {};
        opts.title = "誘標雷達2";
        opts.titleBaseColor = "#ccf";
        opts.setOptss = [];
        var setOptss = opts.setOptss;
        opts.yArr = [40, 40, 40, 40, 9999];
        opts.xyArr = [
            [180, 90, 90, 140, 9999],
            [180, 90, 90, 140, 9999],
            [250, 200, 9999],
            [400, 9999],
            [250, 250, 9999],
            [9999]
        ];
        setOptss.push(sopt.getEditUnit({title: "緯度:", titleWidth: 80, "unit": "度", unitWidth: 40, value: "22"}));
        setOptss.push(sopt.getEditUnit({"unit": "分", unitWidth: 40, value: "59"}));
        setOptss.push(sopt.getEditUnit({"unit": "秒", unitWidth: 40, value: "59"}));
        setOptss.push(sopt.getEditUnit({"unit": "百分秒", unitWidth: 80, value: "99"}));
        setOptss.push(null);
        setOptss.push(sopt.getEditUnit({title: "經度:", titleWidth: 80, "unit": "度", unitWidth: 40, value: "122"}));
        setOptss.push(sopt.getEditUnit({"unit": "分", unitWidth: 40, value: "59"}));
        setOptss.push(sopt.getEditUnit({"unit": "秒", unitWidth: 40, value: "59"}));
        setOptss.push(sopt.getEditUnit({"unit": "百分秒", unitWidth: 80, value: "99"}));
        setOptss.push(null);
        setOptss.push(sopt.getEditUnit({title: "高度:", titleWidth: 80, "unit": "公尺", unitWidth: 80, value: "111"}));
        setOptss.push(sopt.getEditUnit({title: "方位:", titleWidth: 80, "unit": "度", unitWidth: 40, value: "111"}));
        setOptss.push(null);
        setOptss.push(sopt.getLabelViews({title: "狀態:", titleWidth: 100, enum: ["view string"]}));
        setOptss.push(null);
        blocks[cname] = {name: "targetGpsPanel2", type: "Model~SetGroup~base.sys0", opts: opts};
        //=========================
        var cname = lyMaps["leftBody"] + "~" + 3;
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
        blocks[cname] = {name: "rangePanel", type: "Model~SetGroup~base.sys0", opts: opts};
        //=========================
        var cname = lyMaps["leftBody"] + "~" + 4;
        var opts = {};
        opts.title = "位置來源";
        opts.setOptss = [];
        var setOptss = opts.setOptss;
        opts.yArr = [9999];
        opts.xyArr = [
            [9999]
        ];
        setOptss.push(sopt.getButtonRadio({enum: ["GPS天線", "手動輸入"]}));
        blocks[cname] = {name: "positionPanel", type: "Model~SetGroup~base.sys0", opts: opts};
        //=========================




        var cname = lyMaps["mainBody"] + "~" + 1;
        var opts = {};
        opts.buttons = ["主雷位置儲存", "誘標1位置儲存", "誘標2位置儲存", "離開"];
        opts.buttonIds = ["radarLocationSave", "target1LocationSave", "target2LocationSave", "esc"];
        opts.actionFunc = function (iobj) {
            if (iobj.buttonId === "esc") {
                gr.appType = "Model~DummyTarget~base.sys0";
                sys.dispWebPage();
                return;
            }
        };
        blocks[cname] = {name: "headButtons", type: "Model~MdaButtons~base.sys0", opts: opts};

        //===============================================
        var cname = lyMaps["upBody"] + "~" + 1;
        var opts = {};
        opts.ym = 4;
        opts.tm = 4;
        opts.yArr = [9999, "0.3rh"];
        layouts[cname] = {name: cname, type: "Layout~Ly_base~xyArray.sys0", opts: opts};
        lyMaps["rightBody"] = cname;
        //==============================
        var cname = lyMaps["rightBody"] + "~" + 1;
        var opts = {};
        opts.title = "雷達模擬";
        opts.setOptss = [];
        var setOptss = opts.setOptss;
        opts.yArr = [40, 40, 9999];
        opts.xyArr = [
            ["0.5rw", 9999],
            ["0.5rw", 9999],
            [9999]
        ];
        setOptss.push(sopt.getEditUnit({title: "雷達輻射起始角度:", titleWidth: 200, "unit": "度", unitWidth: 40, value: "23"}));
        setOptss.push(sopt.getEditUnit({title: "雷達輻射終止角度:", titleWidth: 200, "unit": "度", unitWidth: 40, value: "151"}));
        setOptss.push(sopt.getEditUnit({title: "RPM:", titleWidth: 200, "unit": "轉", unitWidth: 40, value: "6.8"}));
        setOptss.push(sopt.getButttonActs({titleWidth: 0, enum: ["模擬/停止"]}));
        blocks[cname] = {name: "ladarLaunchPanel", type: "Model~SetGroup~base.sys0", opts: opts};
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
        opts.baseColor = "#ccc";
        opts.title = "GroupSet";
        opts.titleWidth = 100;
        opts.titleBaseColor = "#ccc";
        opts.setBorderWidth = 1;
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
        var opts = {};
        opts.iw = op.titleWidth;
        opts.ih = 26;
        opts.wAlign = "left";
        opts.hAlign = "top";
        opts.lm = 20;
        opts.tm = 0;
        opts.lpd = 4;
        opts.innerText = op.title;
        opts.baseColor = op.titleBaseColor;
        opts.textAlign = "left";
        blocks[cname + "#1"] = {name: "basePanel", type: "Component~Cp_base~plate.none", opts: opts};
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
            if (opts.setOpts)
                blocks[cname ] = {name: "basePanel", type: "Model~MdaSetLine~base.sys0", opts: opts};
        }




        return;


    }
}




class MyNewScope {
    constructor() {
    }
    initOpts(md) {
        var self = this;
        var opts = {};
        Block.setBaseOpts(opts);
        opts.baseColor = "#fcc";
        opts.bufferSize = 2000;
        opts.powerOn_f = 1;
        opts.grid_f = 1;
        opts.run_f = 1;
        opts.testSinWave_f = 1;
        opts.centerLine_f = 1;
        opts.axeWidth = 0.5;
        //===
        opts.mainAxeColor = "#aaa";
        opts.subAxeColor = "#444";
        opts.centerLineColor = "#fff";
        //===============
        opts.xAxeOffsV = 0;
        opts.xScale = 1000000;//unit=ns;
        opts.xyOffx = 50;    //total 1000    //origin point x 
        opts.xAxeLen = 900;  //total 1000    //x axile len rate    
        opts.xAxeGridAmt = 10;
        opts.xSubAxeGridAmt = 5;
        //===============
        opts.xAxeTotalV = 500;
        opts.xScale = 500;



        opts.xyOffy = 50;    //total 1000    //origin point y 
        opts.yAxeLen = 900;
        opts.yAxeOffsV = -100;
        opts.yAxeTotalV = 200;
        opts.yUnit = "(mV)";




        opts.xyOffy = 50;    //total 1000    //origin point y 
        opts.yAxeLen = 900;
        opts.yAxeGridAmt = 10;
        opts.ySubAxeGridAmt = 5;
        //===============
        opts.messages = [];
        var mesObj = {};
        mesObj.x = 500;
        mesObj.y = 20;
        mesObj.text = "title";
        mesObj.color = "#0f0";
        mesObj.font = "20px monospace";
        opts.messages.push(mesObj);
        //===============
        opts.sampleUnit = "ns";
        opts.sampleAmt = 1000;
        opts.sampleSize = 2000;
        opts.ySubAxeGridAmt = 5;
        opts.lines = [];
        opts.bufs = [0, 0, 0, 0];
        //===============
        var lineObj = {};
        var buffer = [];
        for (var i = 0; i < opts.sampleSize; i++) {
            var sin = Math.sin(Math.PI * 2 * i / 100);
            buffer.push(sin * 50);
        }
        lineObj.offOn_f = 1;
        lineObj.name = "CH1";
        lineObj.color = "#f00";
        lineObj.offset = 0;//1=main grid len 
        lineObj.scale = 25;//
        lineObj.unit = "mv";
        lineObj.stInx = 0;
        lineObj.buffer = buffer;
        opts.lines.push(lineObj);
        //=======================
        var lineObj = {};
        var buffer = [];
        for (var i = 0; i < opts.sampleSize; i++) {
            var sin = Math.sin(Math.PI * 2 * i / 100);
            buffer.push(sin * 75);
        }
        lineObj.offOn_f = 1;
        lineObj.name = "CH2";
        lineObj.color = "#0f0";
        lineObj.offset = 0;//1=main grid len 
        lineObj.scale = 25;//
        lineObj.unit = "mv";
        lineObj.stInx = 0;
        lineObj.buffer = buffer;
        opts.lines.push(lineObj);
        //=======================
        var lineObj = {};
        var buffer = [];
        for (var i = 0; i < opts.sampleSize; i++) {
            var sin = Math.sin(Math.PI * 2 * i / 100);
            buffer.push(sin * 25);
        }
        lineObj.offOn_f = 1;
        lineObj.name = "CH3";
        lineObj.color = "#ff0";
        lineObj.offset = 0;//1=main grid len 
        lineObj.scale = 25;//
        lineObj.unit = "mv";
        lineObj.stInx = 0;
        lineObj.buffer = buffer;
        opts.lines.push(lineObj);
        //=======================
        var lineObj = {};
        var buffer = [];
        for (var i = 0; i < opts.sampleSize; i++) {
            var sin = Math.sin(Math.PI * 2 * i / 100);
            buffer.push(sin * 12);
        }
        lineObj.offOn_f = 1;
        lineObj.name = "CH4";
        lineObj.color = "#0ff";
        lineObj.offset = 0;//1=main grid len 
        lineObj.scale = 25;//
        lineObj.unit = "mv";
        lineObj.stInx = 0;
        lineObj.buffer = buffer;
        opts.lines.push(lineObj);
        //=======================
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
        st.wRate = st.containerWidth / 1000.0;
        st.hRate = st.containerHeight / 1000.0;
        st.xAxeLen = op.xAxeLen * st.wRate;
        st.yAxeLen = op.yAxeLen * st.hRate;
        st.xyOffx = op.xyOffx * st.wRate;
        st.xyOffy = op.xyOffy * st.hRate;
        //==
        st.xPixelDivUnit = (st.xAxeLen - 10) / (op.xAxeTotalV);
        //==
        st.yPixelDivUnit = (st.yAxeLen - 10) / (op.yAxeTotalV);
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
        st.canvas = selem;
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
        if (!st.canvas.getContext)
            return;
        if (!st.canvasLy1.getContext)
            return;
        st.ctx = st.canvas.getContext('2d');
        st.ctx1 = st.canvasLy1.getContext('2d');
        this.createScope();
        //===
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
        if (!op.run_f)
            return;
        self.drawClear();
        if (!op.testSinWave_f) {
            var opts = op.lines[0];
            self.drawBufs(opts, op.bufs[0]);
            var opts = op.lines[1];
            self.drawBufs(opts, op.bufs[0]);
            var opts = op.lines[2];
            self.drawBufs(opts, op.bufs[0]);
            var opts = op.lines[3];
            self.drawBufs(opts, op.bufs[0]);
            return;
        }

        //=========================================
        var opts = op.lines[0];
        opts.stInx += 1;
        if (opts.stInx >= 2000)
            opts.stInx -= 2000;
        self.drawLine(opts);
        //=========================================
        var opts = op.lines[1];
        opts.stInx += 2;
        if (opts.stInx >= 2000)
            opts.stInx -= 2000;
        self.drawLine(opts);
        //=========================================
        var opts = op.lines[2];
        opts.stInx += 3;
        if (opts.stInx >= 2000)
            opts.stInx -= 2000;
        self.drawLine(opts);
        //=========================================
        var opts = op.lines[3];
        opts.stInx += 4;
        if (opts.stInx >= 2000)
            opts.stInx -= 2000;
        self.drawLine(opts);
        //=========================================

    }

    createScope(editObj) {
        var self = this;
        var md = this.md;
        var op = md.opts;
        var st = md.stas;
        var ctx = st.ctx;
        if (editObj) {
            if (editObj.setName === "xScale") {
                op.xAxeOffsV = op.xAxeOffsV * editObj.preValue / editObj.newValue;
            }
        }
        self.drawAxe(1);
        self.drawClear();
        if (op.testSinWave_f) {
            for (var i = 0; i < op.lines.length; i++) {
                var opts = op.lines[i];
                self.drawLine(opts);
            }
        } else {
            for (var i = 0; i < op.bufs.length; i++) {
                var opts = op.lines[i];
                self.drawBufs(opts, op.bufs[i]);
            }
        }

    }

    clearScr() {
        var st = this.md.stas;
        var ctx = st.ctx1;
        ctx.clearRect(0, 0, st.containerWidth, st.containerHeight);
    }

    clearAll() {
        var st = this.md.stas;
        var ctx1 = st.ctx1;
        var ctx = st.ctx;
        ctx.clearRect(0, 0, st.containerWidth, st.containerHeight);
        ctx1.clearRect(0, 0, st.containerWidth, st.containerHeight);
    }

    drawClear() {
        var st = this.md.stas;
        var ctx = st.ctx1;
        ctx.clearRect(0, 0, st.containerWidth, st.containerHeight);
    }

    drawLine(opts, clr) {
        var op = this.md.opts;
        var st = this.md.stas;
        var ctx = st.ctx1;
        if (clr)
            ctx.clearRect(0, 0, st.containerWidth, st.containerHeight);
        if (!opts.offOn_f)
            return;
        ctx.strokeStyle = opts.color;
        ctx.beginPath();
        var xzero = st.xyOffx;
        var ycen = st.containerHeight - st.xyOffy - st.yAxeLen / 2;
        var yGridLen = st.yAxeLen / op.yAxeGridAmt;
        var yOffset = st.yAxeLen * opts.offset / 1000;
        //============================================
        var maxY = st.containerHeight - st.xyOffy;
        var minY = st.containerHeight - st.xyOffy - st.yAxeLen;
        if (st.xoffs === null || st.xoffs === undefined) {
            st.xoffs = 0;
        }
        if (!st.sampleTime)
            st.sampleTime = op.xScale * op.xAxeGridAmt / op.sampleAmt;
        if (op.run_f) {
            //st.sampleTime = op.xScale * op.xAxeGridAmt / op.sampleAmt;
            var stepLen = st.xAxeLen * st.sampleTime / (op.xScale * 10);
        } else {
            var stepLen = st.xAxeLen * st.sampleTime / (op.xScale * 10);
        }


        var first_f = 0;
        var timev = 0;
        var halfSamples = parseInt(op.sampleAmt / 2) + 1;
        var first_f = 0;
        var offx = st.xAxeLen * op.xAxeOffsV / (op.xScale * 10);
        var xlen = st.xAxeLen / 2 + offx;
        var inx = opts.stInx - halfSamples - 1;
        if (inx < 0)
            inx += op.sampleSize;
        for (var i = 0; i < halfSamples; i++) {
            var vv = opts.buffer[inx];
            var ylen = vv * yGridLen / opts.scale;
            var realY = ycen + ylen - yOffset;
            if (realY > maxY)
                realY = maxY;
            if (realY < minY)
                realY = minY;

            if (xlen >= 0) {
                if (!first_f)
                    ctx.moveTo(xzero + xlen, realY);
                else
                    ctx.lineTo(xzero + xlen, realY);
                first_f = 1;
            }
            inx++;
            if (inx >= op.sampleSize)
                inx -= op.sampleSize;
            xlen += stepLen;
            if (xlen > st.xAxeLen)
                break;
        }

        var first_f = 0;
        var xlen = st.xAxeLen / 2 + offx;
        var inx = opts.stInx - halfSamples - 1;
        if (inx < 0)
            inx += op.sampleSize;
        for (var i = 0; i < halfSamples; i++) {
            var vv = opts.buffer[inx];
            var ylen = vv * yGridLen / opts.scale;
            var realY = ycen + ylen - yOffset;
            if (realY > maxY)
                realY = maxY;
            if (realY < minY)
                realY = minY;


            if (xlen <= st.xAxeLen) {
                if (!first_f)
                    ctx.moveTo(xzero + xlen, realY);
                else
                    ctx.lineTo(xzero + xlen, realY);
                first_f = 1;
            }

            inx--;
            if (inx < 0)
                inx += op.sampleSize;
            xlen -= stepLen;
            if (xlen < 0)
                break;
        }
        ctx.stroke();
        return;
    }

    drawBufs(opts, bufObj, clr) {
        var op = this.md.opts;
        var st = this.md.stas;
        var ctx = st.ctx1;
        var vrate = st.yAxeStrokePeriod / op.yAxePeriodV;
        if (clr)
            ctx.clearRect(0, 0, st.containerWidth, st.containerHeight);
        if (!opts.offOn_f)
            return;
        ctx.strokeStyle = opts.color;
        ctx.beginPath();
        var x = st.xyOffx;
        var y = st.containerHeight - st.xyOffy;
        var inx;

        var maxLen = parseInt(op.xAxeTotalV / op.xScale);
        if (bufObj.bufLen < maxLen)
            var backLen = bufObj.bufLen;
        else
            var backLen = maxLen;

        for (var i = 0; i < bufObj.bufLen; i++) {

            if ((i * op.xScale) >= op.xAxeTotalV)
                break;
            var inxSt = bufObj.bufEnd - backLen;
            if (inxSt < 0)
                inxSt += bufObj.bufMax;
            inx = inxSt + i;
            if (inx >= bufObj.bufMax)
                inx -= bufObj.bufMax;
            var vv = bufObj.buffer[inx][bufObj.bufName];
            vv -= opts.offset;
            vv *= opts.scale;
            if (vv < op.yAxeOffsV)
                vv = op.yAxeOffsV;
            if (vv > op.yAxeTotalV + op.yAxeOffsV)
                vv = op.yAxeTotalV + op.yAxeOffsV;
            var vlen = vv - op.yAxeOffsV;
            var xv = i * op.xScale;
            if (xv > (op.xAxeTotalV + op.xAxeOffsV))
                break;
            if (i === 0)
                ctx.moveTo(x + xv * st.xPixelDivUnit, y - vlen * st.yPixelDivUnit);
            else
                ctx.lineTo(x + xv * st.xPixelDivUnit, y - vlen * st.yPixelDivUnit);
        }
        ctx.stroke();
    }

    drawAxe(clr) {
        var op = this.md.opts;
        var st = this.md.stas;
        var ctx = st.ctx;
        if (clr) {
            st.axe_drawed_f = 0;
            st.gripOn_f = 0;
            st.xAxe_drawed_f = 0;
            st.yAxe_drawed_f = 0;
            ctx.clearRect(0, 0, st.containerWidth, st.containerHeight);

        }

        if (st.axe_drawed_f)
            return;
        st.axe_drawed_f = 1;


        op.messages = [];
        var mesObj = {};

        var unit = "ns";
        var value = op.xAxeOffsV * -1;


        var mstr = "";
        if (value < 0) {
            value *= -1;
            mstr = "-";
        }


        if (value >= 1000) {
            unit = "us";
            value = value / 1000;
            if (value >= 1000) {
                unit = "ms";
                value = value / 1000;
                if (value >= 1000) {
                    unit = "s";
                    value = value / 1000;
                }
            }
        }
        if (value < 10)
            var vStr = value.toFixed(2);
        else if (value < 100)
            var vStr = value.toFixed(1);
        else
            var vStr = value.toFixed(0);
        mesObj.x = st.xyOffx + st.xAxeLen / 2;
        mesObj.y = st.containerHeight - st.xyOffy - st.yAxeLen;
        mesObj.text = mstr + vStr + " " + unit;
        mesObj.color = "#fff";
        mesObj.font = "12px sans-serif";
        op.messages.push(mesObj);


        var mesObj = {};
        var unit = "ns";
        var value = op.xScale;
        if (value >= 1000) {
            unit = "us";
            value = value / 1000;
            if (value >= 1000) {
                unit = "ms";
                value = value / 1000;
                if (value >= 1000) {
                    unit = "s";
                    value = value / 1000;
                }
            }
        }
        if (value < 10)
            var vStr = value.toFixed(2);
        else if (value < 100)
            var vStr = value.toFixed(1);
        else
            var vStr = value.toFixed(0);
        mesObj.x = st.xyOffx + st.xAxeLen * 6 / 10;
        mesObj.y = st.containerHeight - st.xyOffy - st.yAxeLen;
        mesObj.text = vStr + " " + unit + "/";
        mesObj.color = "#fff";
        mesObj.font = "12px sans-serif";
        op.messages.push(mesObj);


        x = st.xyOffx;
        for (var i = 0; i < op.lines.length; i++) {
            var opts = op.lines[i];
            if (!opts.offOn_f)
                continue


            var mesObj = {};
            var unit = opts.unit;
            var value = opts.scale;
            if (unit === "mv")
                value = value * 1000;
            if (unit === "v")
                value = value * 1000000;
            unit = "uv";
            if (value >= 1000) {
                unit = "mv";
                value = value / 1000;
                if (value >= 1000) {
                    unit = "v";
                    value = value / 1000;
                }
            }
            if (value < 10)
                var vStr = value.toFixed(2);
            else if (value < 100)
                var vStr = value.toFixed(1);
            else
                var vStr = value.toFixed(0);
            mesObj.x = x;
            mesObj.y = st.containerHeight - st.xyOffy - st.yAxeLen;
            mesObj.text = (i + 1) + ":" + vStr + " " + unit + "/";
            mesObj.color = opts.color;
            mesObj.font = "12px sans-serif";
            op.messages.push(mesObj);
            var size = ctx.measureText(mesObj.text);
            x += size.width + 20;



        }



        if (op.messages) {
            for (var i = 0; i < op.messages.length; i++) {
                var mesObj = op.messages[i];
                ctx.fillStyle = mesObj.color;
                ctx.font = mesObj.font;
                ctx.fillText(mesObj.text, mesObj.x, mesObj.y * st.hRate);
            }
        }

        ctx.strokeStyle = op.subAxeColor;
        //===============================
        ctx.lineWidth = op.axeWidth;
        ctx.beginPath();
        var x = st.xyOffx;
        var y = st.containerHeight - st.xyOffy;

        var xSubAmt = op.xAxeGridAmt * op.xSubAxeGridAmt;
        var ySubAmt = op.yAxeGridAmt * op.ySubAxeGridAmt;

        var xadd = st.xAxeLen / xSubAmt;
        var yadd = st.yAxeLen / ySubAmt;
        if (op.grid_f) {
            for (var i = 0; i < ySubAmt + 1; i++) {
                ctx.moveTo(x, y - i * yadd);
                ctx.lineTo(x + st.xAxeLen, y - i * yadd);
            }
            for (var i = 0; i < xSubAmt + 1; i++) {
                ctx.moveTo(x + xadd * i, y);
                ctx.lineTo(x + xadd * i, y - st.yAxeLen);
            }



        }
        ctx.stroke();
        //===============================


        ctx.strokeStyle = op.mainAxeColor;
        ctx.lineWidth = op.axeWidth;
        ctx.beginPath();
        var x = st.xyOffx;
        var y = st.containerHeight - st.xyOffy;
        var xadd = st.xAxeLen / op.xAxeGridAmt;
        var yadd = st.yAxeLen / op.yAxeGridAmt;
        for (var i = 0; i < op.xAxeGridAmt + 1; i++) {
            ctx.moveTo(x + xadd * i, y);
            ctx.lineTo(x + xadd * i, y - st.yAxeLen);
        }
        for (var i = 0; i < op.yAxeGridAmt + 1; i++) {
            ctx.moveTo(x, y - i * yadd);
            ctx.lineTo(x + st.xAxeLen, y - i * yadd);
        }
        ctx.stroke();
        //===============================
        if (op.centerLine_f) {
            ctx.strokeStyle = op.centerLineColor;
            ctx.lineWidth = op.axeWidth;
            ctx.beginPath();
            var x = st.xyOffx;
            var y = st.conrainerHeight - st.xyOffy;
            var xadd = st.xAxeLen / 2;
            var yadd = st.yAxeLen / 2;
            ctx.moveTo(x + xadd * 1, y);
            ctx.lineTo(x + xadd * 1, y - st.yAxeLen);
            ctx.moveTo(x, y - 1 * yadd);
            ctx.lineTo(x + st.xAxeLen, y - 1 * yadd);
            ctx.stroke();
        }
        //===============================
        for (var i = 0; i < 4; i++) {
            if (op.lines[i].offOn_f) {
                var fontSize = 12;
                ctx.font = "" + fontSize + "px monospace";
                ctx.fillStyle = op.lines[i].color;
                var str = (i + 1) + "\u27a4";
                var size = ctx.measureText(str);
                ctx.fillText(str, x - size.width - 2, y - st.yAxeLen / 2 + fontSize / 2 - 2 - op.lines[i].offset * st.yAxeLen / 1000);
            }
        }

        var fontSize = 12;
        ctx.font = "" + fontSize + "px monospace";
        ctx.fillStyle = "#ccc";
        var str = "▼";
        var x = -3 + st.xyOffx + st.xAxeLen / 2;
        var y = st.containerHeight - st.xyOffy - st.yAxeLen + 7;
        ctx.fillText(str, x, y);

        var xoff = st.xAxeLen * op.xAxeOffsV / (op.xScale * 10);

        xoff += st.xAxeLen * 5 / 10;
        if (xoff < 0)
            xoff = 0;
        if (xoff > st.xAxeLen)
            xoff = st.xAxeLen;
        var fontSize = 12;
        ctx.font = "" + fontSize + "px monospace";
        ctx.fillStyle = "#fff";
        var str = "▼";
        var x = -3 + st.xyOffx + xoff;
        var y = st.containerHeight - st.xyOffy - st.yAxeLen + 7;
        ctx.fillText(str, x, y);



        return;









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
        opts.xArr = [9999, 200];
        layouts[cname] = {name: cname, type: "Layout~Ly_base~xyArray.sys0", opts: opts};
        lyMaps["mainBody"] = cname;

        var cname = lyMaps["mainBody"] + "~" + 0;
        var opts = {};
        opts.baseColor = "#222";
        blocks[cname] = {name: "container", type: "Component~Cp_base~container.sys0", opts: opts};


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


        opts.baseColor = "#fcc";
        opts.bufferSize = 2000;
        opts.powerOn_f = 1;
        opts.grid_f = 0;
        opts.run_f = 1;
        opts.testSinWave_f = 0;
        opts.centerLine_f = 1;
        opts.axeWidth = 0.5;
        //===
        opts.mainAxeColor = "#aaa";
        opts.subAxeColor = "#444";
        opts.centerLineColor = "#fff";
        //===============
        opts.xAxeOffsV = 0;
        opts.xScale = 1000000;//unit=ns;
        opts.xyOffx = 50;    //total 1000    //origin point x 
        opts.xAxeLen = 900;  //total 1000    //x axile len rate    
        opts.xAxeGridAmt = 10;
        opts.xSubAxeGridAmt = 5;
        //===============
        opts.xAxeTotalV = 500;
        opts.xScale = 500;



        opts.xyOffy = 50;    //total 1000    //origin point y 
        opts.yAxeLen = 900;
        opts.yAxeOffsV = -100;
        opts.yAxeTotalV = 200;
        opts.yUnit = "(mV)";




        opts.xyOffy = 50;    //total 1000    //origin point y 
        opts.yAxeLen = 900;
        opts.yAxeGridAmt = 10;
        opts.ySubAxeGridAmt = 5;
        //===============
        opts.messages = [];
        var mesObj = {};
        mesObj.x = 500;
        mesObj.y = 20;
        mesObj.text = "title";
        mesObj.color = "#0f0";
        mesObj.font = "20px monospace";
        opts.messages.push(mesObj);
        //===============
        opts.sampleUnit = "ns";
        opts.sampleAmt = 1000;
        opts.sampleSize = 2000;
        opts.ySubAxeGridAmt = 5;
        opts.lines = [];
        opts.bufs = [0, 0, 0, 0];
        //===============
        var lineObj = {};
        var buffer = [];
        for (var i = 0; i < opts.sampleSize; i++) {
            var sin = Math.sin(Math.PI * 2 * i / 100);
            buffer.push(sin * 50);
        }
        lineObj.offOn_f = 0;
        lineObj.name = "CH1";
        lineObj.color = "#f00";
        lineObj.offset = 0;//1=main grid len 
        lineObj.scale = 25;//
        lineObj.unit = "mv";
        lineObj.stInx = 0;
        lineObj.buffer = buffer;
        opts.lines.push(lineObj);
        //=======================
        var lineObj = {};
        var buffer = [];
        for (var i = 0; i < opts.sampleSize; i++) {
            var sin = Math.sin(Math.PI * 2 * i / 100);
            buffer.push(sin * 75);
        }
        lineObj.offOn_f = 0;
        lineObj.name = "CH2";
        lineObj.color = "#0f0";
        lineObj.offset = 0;//1=main grid len 
        lineObj.scale = 25;//
        lineObj.unit = "mv";
        lineObj.stInx = 0;
        lineObj.buffer = buffer;
        opts.lines.push(lineObj);
        //=======================
        var lineObj = {};
        var buffer = [];
        for (var i = 0; i < opts.sampleSize; i++) {
            var sin = Math.sin(Math.PI * 2 * i / 100);
            buffer.push(sin * 25);
        }
        lineObj.offOn_f = 0;
        lineObj.name = "CH3";
        lineObj.color = "#ff0";
        lineObj.offset = 0;//1=main grid len 
        lineObj.scale = 25;//
        lineObj.unit = "mv";
        lineObj.stInx = 0;
        lineObj.buffer = buffer;
        opts.lines.push(lineObj);
        //=======================
        var lineObj = {};
        var buffer = [];
        for (var i = 0; i < opts.sampleSize; i++) {
            var sin = Math.sin(Math.PI * 2 * i / 100);
            buffer.push(sin * 12);
        }
        lineObj.offOn_f = 0;
        lineObj.name = "CH4";
        lineObj.color = "#0ff";
        lineObj.offset = 0;//1=main grid len 
        lineObj.scale = 25;//
        lineObj.unit = "mv";
        lineObj.stInx = 0;
        lineObj.buffer = buffer;
        opts.lines.push(lineObj);
        //=======================
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
        st.radarBuf = [];
        for (var i = 0; i < st.containerWidth; i++){
            for (var j = 0; j < st.containerHeight; j++) {
                st.radarBuf.push(0xff00ff00);
            }
        }    
        st.wRate = st.containerWidth / 1000.0;
        st.hRate = st.containerHeight / 1000.0;
        st.xAxeLen = op.xAxeLen * st.wRate;
        st.yAxeLen = op.yAxeLen * st.hRate;
        st.xyOffx = op.xyOffx * st.wRate;
        st.xyOffy = op.xyOffy * st.hRate;
        //==
        st.xPixelDivUnit = (st.xAxeLen - 10) / (op.xAxeTotalV);
        //==
        st.yPixelDivUnit = (st.yAxeLen - 10) / (op.yAxeTotalV);
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
        st.canvas = selem;
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
        if (!st.canvas.getContext)
            return;
        if (!st.canvasLy1.getContext)
            return;
        st.ctx = st.canvas.getContext('2d');
        st.ctx1 = st.canvasLy1.getContext('2d');
        this.createScope();
        //===
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
        if (!op.run_f)
            return;
        self.drawScan();
        return;
        self.drawClear();
        if (!op.testSinWave_f) {
            var opts = op.lines[0];
            self.drawBufs(opts, op.bufs[0]);
            var opts = op.lines[1];
            self.drawBufs(opts, op.bufs[0]);
            var opts = op.lines[2];
            self.drawBufs(opts, op.bufs[0]);
            var opts = op.lines[3];
            self.drawBufs(opts, op.bufs[0]);
            return;
        }

        //=========================================
        var opts = op.lines[0];
        opts.stInx += 1;
        if (opts.stInx >= 2000)
            opts.stInx -= 2000;
        self.drawLine(opts);
        //=========================================
        var opts = op.lines[1];
        opts.stInx += 2;
        if (opts.stInx >= 2000)
            opts.stInx -= 2000;
        self.drawLine(opts);
        //=========================================
        var opts = op.lines[2];
        opts.stInx += 3;
        if (opts.stInx >= 2000)
            opts.stInx -= 2000;
        self.drawLine(opts);
        //=========================================
        var opts = op.lines[3];
        opts.stInx += 4;
        if (opts.stInx >= 2000)
            opts.stInx -= 2000;
        self.drawLine(opts);
        //=========================================

    }

    createScope(editObj) {
        var self = this;
        var md = this.md;
        var op = md.opts;
        var st = md.stas;
        var ctx = st.ctx;
        if (editObj) {
            if (editObj.setName === "xScale") {
                op.xAxeOffsV = op.xAxeOffsV * editObj.preValue / editObj.newValue;
            }
        }
        self.drawAxe(1);
        self.drawClear();
        if (op.testSinWave_f) {
            for (var i = 0; i < op.lines.length; i++) {
                var opts = op.lines[i];
                self.drawLine(opts);
            }
        } else {
            for (var i = 0; i < op.bufs.length; i++) {
                var opts = op.lines[i];
                self.drawBufs(opts, op.bufs[i]);
            }
        }

    }

    clearScr() {
        var st = this.md.stas;
        var ctx = st.ctx1;
        ctx.clearRect(0, 0, st.containerWidth, st.containerHeight);
    }

    clearAll() {
        var st = this.md.stas;
        var ctx1 = st.ctx1;
        var ctx = st.ctx;
        ctx.clearRect(0, 0, st.containerWidth, st.containerHeight);
        ctx1.clearRect(0, 0, st.containerWidth, st.containerHeight);
    }

    drawClear() {
        var st = this.md.stas;
        var ctx = st.ctx1;
        ctx.clearRect(0, 0, st.containerWidth, st.containerHeight);
    }

    drawLine(opts, clr) {
        var op = this.md.opts;
        var st = this.md.stas;
        var ctx = st.ctx1;
        if (clr)
            ctx.clearRect(0, 0, st.containerWidth, st.containerHeight);
        if (!opts.offOn_f)
            return;
        ctx.strokeStyle = opts.color;
        ctx.beginPath();
        var xzero = st.xyOffx;
        var ycen = st.containerHeight - st.xyOffy - st.yAxeLen / 2;
        var yGridLen = st.yAxeLen / op.yAxeGridAmt;
        var yOffset = st.yAxeLen * opts.offset / 1000;
        //============================================
        var maxY = st.containerHeight - st.xyOffy;
        var minY = st.containerHeight - st.xyOffy - st.yAxeLen;
        if (st.xoffs === null || st.xoffs === undefined) {
            st.xoffs = 0;
        }
        if (!st.sampleTime)
            st.sampleTime = op.xScale * op.xAxeGridAmt / op.sampleAmt;
        if (op.run_f) {
            //st.sampleTime = op.xScale * op.xAxeGridAmt / op.sampleAmt;
            var stepLen = st.xAxeLen * st.sampleTime / (op.xScale * 10);
        } else {
            var stepLen = st.xAxeLen * st.sampleTime / (op.xScale * 10);
        }


        var first_f = 0;
        var timev = 0;
        var halfSamples = parseInt(op.sampleAmt / 2) + 1;
        var first_f = 0;
        var offx = st.xAxeLen * op.xAxeOffsV / (op.xScale * 10);
        var xlen = st.xAxeLen / 2 + offx;
        var inx = opts.stInx - halfSamples - 1;
        if (inx < 0)
            inx += op.sampleSize;
        for (var i = 0; i < halfSamples; i++) {
            var vv = opts.buffer[inx];
            var ylen = vv * yGridLen / opts.scale;
            var realY = ycen + ylen - yOffset;
            if (realY > maxY)
                realY = maxY;
            if (realY < minY)
                realY = minY;

            if (xlen >= 0) {
                if (!first_f)
                    ctx.moveTo(xzero + xlen, realY);
                else
                    ctx.lineTo(xzero + xlen, realY);
                first_f = 1;
            }
            inx++;
            if (inx >= op.sampleSize)
                inx -= op.sampleSize;
            xlen += stepLen;
            if (xlen > st.xAxeLen)
                break;
        }

        var first_f = 0;
        var xlen = st.xAxeLen / 2 + offx;
        var inx = opts.stInx - halfSamples - 1;
        if (inx < 0)
            inx += op.sampleSize;
        for (var i = 0; i < halfSamples; i++) {
            var vv = opts.buffer[inx];
            var ylen = vv * yGridLen / opts.scale;
            var realY = ycen + ylen - yOffset;
            if (realY > maxY)
                realY = maxY;
            if (realY < minY)
                realY = minY;


            if (xlen <= st.xAxeLen) {
                if (!first_f)
                    ctx.moveTo(xzero + xlen, realY);
                else
                    ctx.lineTo(xzero + xlen, realY);
                first_f = 1;
            }

            inx--;
            if (inx < 0)
                inx += op.sampleSize;
            xlen -= stepLen;
            if (xlen < 0)
                break;
        }
        ctx.stroke();
        return;
    }

    drawBufs(opts, bufObj, clr) {
        var op = this.md.opts;
        var st = this.md.stas;
        var ctx = st.ctx1;
        var vrate = st.yAxeStrokePeriod / op.yAxePeriodV;
        if (clr)
            ctx.clearRect(0, 0, st.containerWidth, st.containerHeight);
        if (!opts.offOn_f)
            return;
        ctx.strokeStyle = opts.color;
        ctx.beginPath();
        var x = st.xyOffx;
        var y = st.containerHeight - st.xyOffy;
        var inx;

        var maxLen = parseInt(op.xAxeTotalV / op.xScale);
        if (bufObj.bufLen < maxLen)
            var backLen = bufObj.bufLen;
        else
            var backLen = maxLen;

        for (var i = 0; i < bufObj.bufLen; i++) {

            if ((i * op.xScale) >= op.xAxeTotalV)
                break;
            var inxSt = bufObj.bufEnd - backLen;
            if (inxSt < 0)
                inxSt += bufObj.bufMax;
            inx = inxSt + i;
            if (inx >= bufObj.bufMax)
                inx -= bufObj.bufMax;
            var vv = bufObj.buffer[inx][bufObj.bufName];
            vv -= opts.offset;
            vv *= opts.scale;
            if (vv < op.yAxeOffsV)
                vv = op.yAxeOffsV;
            if (vv > op.yAxeTotalV + op.yAxeOffsV)
                vv = op.yAxeTotalV + op.yAxeOffsV;
            var vlen = vv - op.yAxeOffsV;
            var xv = i * op.xScale;
            if (xv > (op.xAxeTotalV + op.xAxeOffsV))
                break;
            if (i === 0)
                ctx.moveTo(x + xv * st.xPixelDivUnit, y - vlen * st.yPixelDivUnit);
            else
                ctx.lineTo(x + xv * st.xPixelDivUnit, y - vlen * st.yPixelDivUnit);
        }
        ctx.stroke();
    }

    drawScan() {
        var op = this.md.opts;
        var st = this.md.stas;
        var ctx = st.ctx1;
        var canvasData = st.ctx1.getImageData(0, 0, st.containerWidth, st.containerHeight);
        function drawPixel(x, y, r, g, b, a) {
            var index = (x + y * st.containerWidth) * 4;
            canvasData.data[index + 0] = r;
            canvasData.data[index + 1] = g;
            canvasData.data[index + 2] = b;
            canvasData.data[index + 3] = a;
        }
        for (var xx = 0; xx < st.containerWidth; xx++)
            for (var yy = 0; yy < st.containerHeight; yy++) {
                var index = (xx + yy * st.containerWidth);
                var point = st.radarBuf[index];
                var bb = point & 255;
                var gg = (point >> 8) & 255;
                var rr = (point >> 16) & 255;
                var aa = (point >> 24) & 255;
                if (aa)
                    aa =aa- 1;
                var index4=index*4;
                canvasData.data[index4 + 0] = rr;
                canvasData.data[index4 + 1] = gg;
                canvasData.data[index4 + 2] = bb;
                canvasData.data[index4 + 3] = aa;
                point = (aa << 24) + (rr << 16) + (gg << 16) + bb;
                st.radarBuf[index] = point;
            }
    }

    drawAxe(clr) {
        var op = this.md.opts;
        var st = this.md.stas;
        var ctx = st.ctx;
        if (clr) {
            st.axe_drawed_f = 0;
            st.gripOn_f = 0;
            st.xAxe_drawed_f = 0;
            st.yAxe_drawed_f = 0;
            ctx.clearRect(0, 0, st.containerWidth, st.containerHeight);

        }

        if (st.axe_drawed_f)
            return;
        st.axe_drawed_f = 1;

        /*
         op.messages = [];
         var mesObj = {};
         
         var unit = "ns";
         var value = op.xAxeOffsV * -1;
         
         
         var mstr = "";
         if (value < 0) {
         value *= -1;
         mstr = "-";
         }
         
         
         if (value >= 1000) {
         unit = "us";
         value = value / 1000;
         if (value >= 1000) {
         unit = "ms";
         value = value / 1000;
         if (value >= 1000) {
         unit = "s";
         value = value / 1000;
         }
         }
         }
         if (value < 10)
         var vStr = value.toFixed(2);
         else if (value < 100)
         var vStr = value.toFixed(1);
         else
         var vStr = value.toFixed(0);
         mesObj.x = st.xyOffx + st.xAxeLen / 2;
         mesObj.y = st.containerHeight - st.xyOffy - st.yAxeLen;
         mesObj.text = mstr + vStr + " " + unit;
         mesObj.color = "#fff";
         mesObj.font = "12px sans-serif";
         op.messages.push(mesObj);
         
         
         var mesObj = {};
         var unit = "ns";
         var value = op.xScale;
         if (value >= 1000) {
         unit = "us";
         value = value / 1000;
         if (value >= 1000) {
         unit = "ms";
         value = value / 1000;
         if (value >= 1000) {
         unit = "s";
         value = value / 1000;
         }
         }
         }
         if (value < 10)
         var vStr = value.toFixed(2);
         else if (value < 100)
         var vStr = value.toFixed(1);
         else
         var vStr = value.toFixed(0);
         mesObj.x = st.xyOffx + st.xAxeLen * 6 / 10;
         mesObj.y = st.containerHeight - st.xyOffy - st.yAxeLen;
         mesObj.text = vStr + " " + unit + "/";
         mesObj.color = "#fff";
         mesObj.font = "12px sans-serif";
         op.messages.push(mesObj);
         
         
         x = st.xyOffx;
         for (var i = 0; i < op.lines.length; i++) {
         var opts = op.lines[i];
         if (!opts.offOn_f)
         continue
         
         
         var mesObj = {};
         var unit = opts.unit;
         var value = opts.scale;
         if (unit === "mv")
         value = value * 1000;
         if (unit === "v")
         value = value * 1000000;
         unit = "uv";
         if (value >= 1000) {
         unit = "mv";
         value = value / 1000;
         if (value >= 1000) {
         unit = "v";
         value = value / 1000;
         }
         }
         if (value < 10)
         var vStr = value.toFixed(2);
         else if (value < 100)
         var vStr = value.toFixed(1);
         else
         var vStr = value.toFixed(0);
         mesObj.x = x;
         mesObj.y = st.containerHeight - st.xyOffy - st.yAxeLen;
         mesObj.text = (i + 1) + ":" + vStr + " " + unit + "/";
         mesObj.color = opts.color;
         mesObj.font = "12px sans-serif";
         op.messages.push(mesObj);
         var size = ctx.measureText(mesObj.text);
         x += size.width + 20;
         
         
         
         }
         
         
         
         if (op.messages) {
         for (var i = 0; i < op.messages.length; i++) {
         var mesObj = op.messages[i];
         ctx.fillStyle = mesObj.color;
         ctx.font = mesObj.font;
         ctx.fillText(mesObj.text, mesObj.x, mesObj.y * st.hRate);
         }
         }
         
         ctx.strokeStyle = op.subAxeColor;
         //===============================
         ctx.lineWidth = op.axeWidth;
         ctx.beginPath();
         var x = st.xyOffx;
         var y = st.containerHeight - st.xyOffy;
         
         var xSubAmt = op.xAxeGridAmt * op.xSubAxeGridAmt;
         var ySubAmt = op.yAxeGridAmt * op.ySubAxeGridAmt;
         
         var xadd = st.xAxeLen / xSubAmt;
         var yadd = st.yAxeLen / ySubAmt;
         if (op.grid_f) {
         for (var i = 0; i < ySubAmt + 1; i++) {
         ctx.moveTo(x, y - i * yadd);
         ctx.lineTo(x + st.xAxeLen, y - i * yadd);
         }
         for (var i = 0; i < xSubAmt + 1; i++) {
         ctx.moveTo(x + xadd * i, y);
         ctx.lineTo(x + xadd * i, y - st.yAxeLen);
         }
         
         
         
         }
         ctx.stroke();
         * 
         */
        //===============================
        /*
         ctx.strokeStyle = op.mainAxeColor;
         ctx.lineWidth = op.axeWidth;
         var centerX=st.containerWidth/2;
         var centerY=st.containerHeight/2;
         var radius=st.containerWidth*op.sizeRate;
         ctx.beginPath();
         ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
         ctx.stroke();
         return;
         * 
         */


        ctx.strokeStyle = "#fcc";
        ctx.lineWidth = 1;
        ctx.beginPath();
        var centerX = st.containerWidth / 2;
        var centerY = st.containerHeight / 2;
        var radius = st.containerWidth * op.sizeRate / 2;
        var sRadius = radius - 12;
        var ssRadius = radius - 5;
        ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
        ctx.stroke();
        //======================
        ctx.strokeStyle = "#0f0";
        ctx.lineWidth = 0.5;
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



        ctx.strokeStyle = "#f00";
        ctx.lineWidth = 0.8;
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

        i = 0;
        var fontSize = 12;
        var radiusT = radius + 10;
        var startDeg = 90;
        for (var i = 0; i < 360; i += 10) {
            var sin = Math.sin(Math.PI * 2 * (startDeg - i) / 360);
            var cos = Math.cos(Math.PI * 2 * (startDeg - i) / 360);
            ctx.fillStyle = "#0f0";
            ctx.font = fontSize + "px monospace";
            var text = "" + i;
            var metrics = ctx.measureText(text);
            ctx.textAlign = 'center';
            ctx.textBaseline = "bottom";
            ctx.save();
            ctx.translate(radiusT * cos + centerX, centerY - radiusT * sin);
            ctx.rotate(2 * Math.PI * (i) / 360);
            ctx.fillText(text, 0, fontSize / 2);
            ctx.restore();
        }
        //ctx.stroke();





        return;
        //===============================
        if (op.centerLine_f) {
            ctx.strokeStyle = op.centerLineColor;
            ctx.lineWidth = op.axeWidth;
            ctx.beginPath();
            var x = st.xyOffx;
            var y = st.conrainerHeight - st.xyOffy;
            var xadd = st.xAxeLen / 2;
            var yadd = st.yAxeLen / 2;
            ctx.moveTo(x + xadd * 1, y);
            ctx.lineTo(x + xadd * 1, y - st.yAxeLen);
            ctx.moveTo(x, y - 1 * yadd);
            ctx.lineTo(x + st.xAxeLen, y - 1 * yadd);
            ctx.stroke();
        }
        //===============================
        for (var i = 0; i < 4; i++) {
            if (op.lines[i].offOn_f) {
                var fontSize = 12;
                ctx.font = "" + fontSize + "px monospace";
                ctx.fillStyle = op.lines[i].color;
                var str = (i + 1) + "\u27a4";
                var size = ctx.measureText(str);
                ctx.fillText(str, x - size.width - 2, y - st.yAxeLen / 2 + fontSize / 2 - 2 - op.lines[i].offset * st.yAxeLen / 1000);
            }
        }

        var fontSize = 12;
        ctx.font = "" + fontSize + "px monospace";
        ctx.fillStyle = "#ccc";
        var str = "▼";
        var x = -3 + st.xyOffx + st.xAxeLen / 2;
        var y = st.containerHeight - st.xyOffy - st.yAxeLen + 7;
        ctx.fillText(str, x, y);

        var xoff = st.xAxeLen * op.xAxeOffsV / (op.xScale * 10);

        xoff += st.xAxeLen * 5 / 10;
        if (xoff < 0)
            xoff = 0;
        if (xoff > st.xAxeLen)
            xoff = st.xAxeLen;
        var fontSize = 12;
        ctx.font = "" + fontSize + "px monospace";
        ctx.fillStyle = "#fff";
        var str = "▼";
        var x = -3 + st.xyOffx + xoff;
        var y = st.containerHeight - st.xyOffy - st.yAxeLen + 7;
        ctx.fillText(str, x, y);



        return;









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
        opts.xArr = [9999, 200];
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


