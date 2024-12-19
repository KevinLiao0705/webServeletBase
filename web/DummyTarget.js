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
        opts.yArr = [9999,60];
        layouts[cname] = {name: cname, type: "Layout~Ly_base~xyArray.sys0", opts: opts};
        lyMaps["mainBody"] = cname;
        //==============================
        var cname = lyMaps["mainBody"] + "~" + 0;
        var opts = {};
        opts.xArr = [530,9999];
        layouts[cname] = {name: cname, type: "Layout~Ly_base~xyArray.sys0", opts: opts};
        lyMaps["upBody"] = cname;
        //==============================
        var cname = lyMaps["upBody"] + "~" + 0;
        var opts = {};
        opts.ym=4;
        opts.tm=4;
        opts.yArr = ["0.24rh","0.24rh","0.24rh","0.18rh","0.1rh",9999];
        layouts[cname] = {name: cname, type: "Layout~Ly_base~xyArray.sys0", opts: opts};
        lyMaps["leftBody"] = cname;
        //==============================
        var cname = lyMaps["leftBody"] + "~" + 0;
        var opts = {};
        opts.title="主控雷達";
        opts.setOptss = [];
        var setOptss = opts.setOptss;
        opts.yArr = [40, 40, 40, 40, 9999];
        opts.xyArr = [
            [180, 90, 90, 140,9999],
            [180, 90, 90, 140,9999],
            [250, 200, 9999],
            [400, 9999],
            [250,250,9999],
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
        setOptss.push(sopt.getLabelViews({title:"狀態:",titleWidth:100,enum:["view string"]}));
        setOptss.push(null);
        blocks[cname] = {name: "ladarGpsPanel", type: "Model~SetGroup~base.sys0", opts: opts};
        //=========================
        var cname = lyMaps["leftBody"] + "~" + 1;
        var opts = {};
        opts.title="誘標雷達1";
        opts.setOptss = [];
        var setOptss = opts.setOptss;
        opts.yArr = [40, 40, 40, 40,9999];
        opts.xyArr = [
            [180, 90, 90, 140,9999],
            [180, 90, 90, 140,9999],
            [250, 200, 9999],
            [400, 9999],
            [250,250,9999],
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
        setOptss.push(sopt.getLabelViews({title:"狀態:",titleWidth:100,enum:["view string"]}));
        setOptss.push(null);
        blocks[cname] = {name: "targetGpsPanel1", type: "Model~SetGroup~base.sys0", opts: opts};
        //=========================
        var cname = lyMaps["leftBody"] + "~" + 2;
        var opts = {};
        opts.title="誘標雷達2";
        opts.setOptss = [];
        var setOptss = opts.setOptss;
        opts.yArr = [40, 40, 40, 40, 9999];
        opts.xyArr = [
            [180, 90, 90, 140,9999],
            [180, 90, 90, 140,9999],
            [250, 200, 9999],
            [400, 9999],
            [250,250,9999],
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
        setOptss.push(sopt.getLabelViews({title:"狀態:",titleWidth:100,enum:["view string"]}));
        setOptss.push(null);
        blocks[cname] = {name: "targetGpsPanel2", type: "Model~SetGroup~base.sys0", opts: opts};
        //=========================
        var cname = lyMaps["leftBody"] + "~" + 3;
        var opts = {};
        opts.title="距離";
        opts.setOptss = [];
        var setOptss = opts.setOptss;
        opts.yArr = [35, 35, 35, 9999];
        opts.xyArr = [
            [9999],
            [9999],
            [9999],
            [9999]
        ];
        setOptss.push(sopt.getLabelViews({title:"雷達距誘標1:",titleWidth:200,enum:["view string"],unit:"公尺",unitWidth:100}));
        setOptss.push(sopt.getLabelViews({title:"雷達距誘標2:",titleWidth:200,enum:["view string"],unit:"公尺",unitWidth:100}));
        setOptss.push(sopt.getLabelViews({title:"誘標1距誘標2:",titleWidth:200,enum:["view string"],unit:"公尺",unitWidth:100}));
        setOptss.push(null);
        blocks[cname] = {name: "rangePanel", type: "Model~SetGroup~base.sys0", opts: opts};
        //=========================
        var cname = lyMaps["leftBody"] + "~" + 4;
        var opts = {};
        opts.title="位置來源";
        opts.setOptss = [];
        var setOptss = opts.setOptss;
        opts.yArr = [9999];
        opts.xyArr = [
            [9999]
        ];
        setOptss.push(sopt.getButtonRadio( {enum:["GPS天線","手動輸入"]}));
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
        opts.ym=4;
        opts.tm=4;
        opts.yArr = [9999,"0.3rh"];
        layouts[cname] = {name: cname, type: "Layout~Ly_base~xyArray.sys0", opts: opts};
        lyMaps["rightBody"] = cname;
        //==============================
        var cname = lyMaps["rightBody"] + "~" + 1;
        var opts = {};
        opts.title="雷達模擬";
        opts.setOptss = [];
        var setOptss = opts.setOptss;
        opts.yArr = [40, 40, 9999];
        opts.xyArr = [
            ["0.5rw",9999],
            ["0.5rw",9999],
            [9999]
        ];
        setOptss.push(sopt.getEditUnit({title: "雷達輻射起始角度:", titleWidth: 200, "unit": "度", unitWidth: 40, value: "23"}));
        setOptss.push(sopt.getEditUnit({title: "雷達輻射終止角度:", titleWidth: 200, "unit": "度", unitWidth: 40, value: "151"}));
        setOptss.push(sopt.getEditUnit({title: "RPM:", titleWidth: 200, "unit": "轉", unitWidth: 40, value: "6.8"}));
        setOptss.push(sopt.getButttonActs({titleWidth: 0, enum:["模擬/停止"]}));
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
        opts.setBorderWidth = 1;
        opts.ym=2;
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
        opts.baseColor = op.baseColor;
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



