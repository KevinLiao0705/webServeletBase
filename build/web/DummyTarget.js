class DummyTargetMaster {
    constructor() {
    }
    static globleTime() {
        if (!gr.appFirstEntry_f) {
            gr.appFirstEntry_f = 1;
            var syncData = gr.syncData = {};
            var location = syncData.location = {};
            syncData.connectTime = 0;
            syncData.connectCnt = 0;
            syncData.slotStatus = [0, 1, 2, 3, 4, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
            syncData.slotIds = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 0, 0, 0, 0, 0];
            location.mastGpsData = [22, 59, 59, 99, 122, 59, 59, 99, 123, 270, "GPS unavalible"];
            location.sub1GpsData = [22, 59, 59, 99, 122, 59, 59, 99, 123, 270, "GPS unavalible"];
            location.sub2GpsData = [22, 59, 59, 99, 122, 59, 59, 99, 123, 270, "GPS unavalible"];

            var radarStatus = syncData.radarStatus = {};
            /*
             SP雷達信號     0.0: 無信號, 0.1: 信號備便
             脈波來源       1.0: 主雷同步, 1.1: 本機脈波
             與副控1連線方式  2.0: 光纖, 2.1: 無線, 2.2: 自動 
             與副控2連線方式  2.0: 光纖, 2.1: 無線, 2.2: 自動 
             */
            radarStatus.mastStatus = [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
            /*
             雷達狀態    0.0: 未連線, 0.1: 準備中, 0.2:本機備便, 0.3:發射備便, 0.4:發射中, 0.5:異常          
             環控        1.0: 未連線, 1.1:良好, 1.2: 異常 
             SSPA電源    2.0: 未連線, 2.1:良好, 2.2: 異常 
             SSPA放大器  3.0: 未連線, 3.1:良好, 3.2: 異常 
             SSPA功率    4.0: 未連線, 3.1:良好, 4.2: 異常 
             戰備狀態    5.0: 未連線, 5.1:關閉, 5.2: 開啟 
             遠端遙控    6.0: 未連線, 6.1:關閉, 6.2: 開啟 
             脈波來源    7.0: 未連線, 7.1: 主雷同步, 7.2: 本機脈波
             輸出裝置    8.0: 未連線, 8.1: 天線, 8.2:假負載 
             連線方式    9.0: 未連線, 9.1: 光纖, 9.2:無線, 9.3:自動 
             0.1
             */
            radarStatus.sub1Status = [1, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0];
            radarStatus.sub2Status = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

            //0 光纖連線狀態 0:未連線, 1:未連線 
            //1 RF連線狀態 0:未連線, 1:未連線 
            //2 1588修正時間  
            //3 封包發送數  
            //4 正確率
            //5 主控RF接收能量
            //6 副控RF接收能量
            syncData.sub1CommDatas = [0, 1, 3, 4, 1200, 10, 20];
            syncData.sub2CommDatas = [1, 0, 7, 8, 1201, 11, 22];
            for (var j = 0; j < 2; j++) {
                if (j === 0)
                    var subPowerStatus = syncData.sub1PowerStatus = {};
                if (j === 1)
                    var subPowerStatus = syncData.sub2PowerStatus = {};
                subPowerStatus.connectA = [];
                subPowerStatus.faultA = [];
                subPowerStatus.v50enA = [];
                subPowerStatus.v32enA = [];
                subPowerStatus.v50vA = [];
                subPowerStatus.v50iA = [];
                subPowerStatus.v50tA = [];
                subPowerStatus.v32vA = [];
                subPowerStatus.v32iA = [];
                subPowerStatus.v32tA = [];
                for (var i = 0; i < 36; i++) {
                    subPowerStatus.connectA.push(0);
                    subPowerStatus.faultA.push(0);
                    subPowerStatus.v50enA.push(0);
                    subPowerStatus.v32enA.push(0);
                    subPowerStatus.v50vA.push(0);
                    subPowerStatus.v50iA.push(0);
                    subPowerStatus.v50tA.push(0);
                    subPowerStatus.v32vA.push(0);
                    subPowerStatus.v32iA.push(0);
                    subPowerStatus.v32tA.push(0);
                }
            }
            syncData.sub1PowerStatus.connectA[0]=1;

        }

        gr.syncData.connectTime++;
        if (gr.syncData.connectTime >= 6) {
            gr.syncData.connectTime = 0;
            gr.syncData.connectCnt++;
        }

    }

    static paraSetPrg() {

        var setPrg = function () {
            var opts = {};
            opts.title = "設定";
            opts.xc = 1;
            opts.yc = 11;
            opts.h = 700;
            opts.kvTexts = [];
            opts.kvTexts.push("雷達參數設定");
            opts.kvTexts.push("測試脈波設定");
            opts.kvTexts.push("同步參數設定");
            opts.kvTexts.push("GPS參數設定");
            opts.kvTexts.push("下載記錄檔");
            opts.kvTexts.push("系統重啟");
            opts.kvTexts.push("主控同步控制器測試");
            opts.kvTexts.push("副控1同步控制器測試");
            opts.kvTexts.push("副控2同步控制器測試");
            opts.kvTexts.push("副控1中央制器測試");
            opts.kvTexts.push("副控2中央制器測試");
            opts.actionFunc = function (iobj) {
                console.log(iobj);
                if (iobj.selectInx === 0) {
                    var opts = {};
                    opts.paraSet = gr.paraSet;
                    opts.title = iobj.selectText;
                    opts.actionFunc = function (iobj) {
                        console.log(iobj);
                        KvLib.deepCoverObject(gr.paraSet, iobj.paraSet);
                        var fileName = "paraSet";
                        var content = JSON.stringify(gr.paraSet);
                        sv.saveStringToFile("responseDialogError", "null", fileName, content);
                    };
                    opts.setNames = [];
                    /*
                     var keys = Object.keys(gr.paraSet);
                     for (var i = 0; i < keys.length; i++) {
                     var strA = keys[i].split("~");
                     if (strA[0] === "dsc")
                     continue;
                     opts.setNames.push(keys[i]);
                     }
                     */
                    if (gr.appId === 0) {
                        opts.setNames.push("mastPulseSource");
                        opts.setNames.push("mastToSub1CommType");
                        opts.setNames.push("mastToSub2CommType");
                        opts.setNames.push("mastToSub1SpeechEnable");
                        opts.setNames.push("mastToSub2SpeechEnable");
                        opts.setNames.push("sub1ChCommSet");
                        opts.setNames.push("sub2ChCommSet");
                        opts.setNames.push("sub1ChRfTxCh");
                        opts.setNames.push("sub1ChRfRxCh");
                        opts.setNames.push("sub2ChRfTxCh");
                        opts.setNames.push("sub2ChRfRxCh");
                        opts.setNames.push("pulseWidthMax");
                        opts.setNames.push("pulseWidthMin");
                        opts.setNames.push("pulseDutyMax");
                        opts.setNames.push("pulseDutyMin");
                        opts.setNames.push("pulseFreqMax");
                        opts.setNames.push("pulseFreqMin");
                        opts.setNames.push("radarStartAngle");
                        opts.setNames.push("radarEndAngle");
                        opts.setNames.push("radarScanRpm");
                        opts.setNames.push("radarFadeTime");

                    }


                    box.paraEditBox(opts);
                    return;
                }
                if (iobj.selectInx === 1) {
                    var opts = {};
                    opts.actionFunc = function (iobj) {
                        console.log(iobj);
                        KvLib.deepCoverObject(gr.paraSet, iobj.paraSet);
                        var fileName = "paraSet";
                        var content = JSON.stringify(gr.paraSet);
                        sv.saveStringToFile("responseDialogError", "null", fileName, content);
                    };
                    var op = {};
                    //======
                    var opts = {};
                    opts.title = iobj.selectText;
                    var pulsePara = gr.paraSet["localPulseGenParas"];
                    opts.ksObjWs = ["0.5rw", 9999];
                    opts.ksObjss = [];
                    opts.xm = 20;
                    opts.eh = 50;
                    opts.etm = 0;
                    opts.headTitles = ["名稱", "波寬(us)", "工作比(%)", "頻率(G)", "次數"];
                    opts.headTitleXArr = [240, 9999, 106, 80, 64];
                    opts.headTitleHeight = 24;
                    var ksObjs = [];
                    for (var i = 0; i < pulsePara.length; i++) {
                        var strA = pulsePara[i].split(" ");
                        if ((i % 2) === 0) {
                            var ksObjs = [];
                        }
                        var ksObj = {};
                        ksObj.name = "setLine#" + ((i / 2) | 0) + "." + (i % 2);
                        ksObj.type = "Model~MdaSetLine~base.sys0";
                        var kopts = ksObj.opts = {};
                        var setOpts = kopts.setOpts = sopt.getButtonActs();
                        if (strA[0] === "1")
                            setOpts.checked_f = 1;
                        setOpts.enum = [strA[1], strA[2], strA[3], strA[4]];
                        setOpts.value = 0;
                        setOpts.id = "" + i;
                        setOpts.titleWidth = 200;
                        setOpts.titleFontSize = 20;
                        setOpts.checkWidth = 40;
                        setOpts.title = "脈波 " + (i + 1);
                        setOpts.xArr = [9999, 100, 80, 60];
                        setOpts.fontSize = 24;
                        ksObjs.push(ksObj);
                        if (i % 2)
                            opts.ksObjss.push(ksObjs);
                    }


                    opts.actionFunc = function (iobj) {
                        console.log(iobj);
                        if (iobj.act === "actButtonClick") {
                            var setLineObj = iobj.kvObj;
                            if (iobj.buttonInx === 0) {
                                var setOpts = sopt.getOptsFloat();
                                setOpts.min = gr.paraSet.pulseWidthMin;
                                setOpts.max = gr.paraSet.pulseWidthMax;
                            }
                            if (iobj.buttonInx === 1) {
                                var setOpts = sopt.getOptsFloat();
                                setOpts.min = gr.paraSet.pulseDutyMin;
                                setOpts.max = gr.paraSet.pulseDutyMax;
                            }
                            if (iobj.buttonInx === 2) {
                                var setOpts = sopt.getOptsFloat();
                                setOpts.min = gr.paraSet.pulseFreqMin;
                                setOpts.max = gr.paraSet.pulseFreqMax;
                            }
                            if (iobj.buttonInx === 3) {
                                var setOpts = sopt.getOptsNature();
                                setOpts.min = 1;
                                setOpts.max = 99;
                            }
                            var butInx = iobj.buttonInx;
                            setOpts.value = KvLib.toNumber(setLineObj.opts.setOpts.enum[iobj.buttonInx], 0);
                            var opts = {};
                            opts.setOpts = setOpts;
                            opts.actionFunc = function (iobj) {
                                console.log(iobj);
                                if (iobj.act === "padEnter") {
                                    setLineObj.opts.setOpts.enum[butInx] = iobj.inputText;
                                    setLineObj.reCreate();
                                }
                            };
                            box.intPadBox(opts);
                            return;
                        }


                        if (iobj.act === "mouseClick" && iobj.buttonId === "ok") {
                            console.log(iobj);
                            var mdaBox = iobj.sender;
                            var container = mdaBox.blockRefs["mainMd"];
                            var ksObjss = container.opts.ksObjss;
                            var inx = 0;
                            var strA = [];
                            for (var i = 0; i < ksObjss.length; i++) {
                                var ksObjs = ksObjss[i];
                                for (var j = 0; j < ksObjs.length; j++) {
                                    var setOpts = ksObjs[j].opts.setOpts;
                                    var str = "";
                                    if (setOpts.checked_f)
                                        str += "1";
                                    else
                                        str += "0";
                                    for (var k = 0; k < setOpts.enum.length; k++) {
                                        str += " ";
                                        str += setOpts.enum[k];
                                    }
                                    strA.push(str);
                                }
                            }
                            gr.paraSet["localPulseGenParas"] = strA;
                            var fileName = "paraSet";
                            var content = JSON.stringify(gr.paraSet);
                            sv.saveStringToFile("responseDialogError", "null", fileName, content);
                        }
                    };
                    box.setLineBox(opts);
                    return;
                }
                if (iobj.selectInx === 2) {
                    var opts = {};
                    opts.paraSet = gr.paraSet;
                    opts.title = iobj.selectText;
                    opts.actionFunc = function (iobj) {
                        console.log(iobj);
                        KvLib.deepCoverObject(gr.paraSet, iobj.paraSet);
                        var fileName = "paraSet";
                        var content = JSON.stringify(gr.paraSet);
                        sv.saveStringToFile("responseDialogError", "null", fileName, content);
                    };
                    opts.setNames = [];
                    if (gr.appId === 0) {
                        opts.setNames.push("commTestPacks");
                        opts.setNames.push("vgTimeDelay");
                        opts.setNames.push("sub1ChTimeFineTune");
                        opts.setNames.push("sub2ChTimeFineTune");
                        opts.setNames.push("sub1ChSyncType");
                        opts.setNames.push("sub2ChSyncType");
                        opts.setNames.push("sub1ChFiberDelay");
                        opts.setNames.push("sub1ChRfDelay");
                        opts.setNames.push("sub2ChFiberDelay");
                        opts.setNames.push("sub2ChRfDelay");


                    }
                    box.paraEditBox(opts);
                    return;
                }
                if (iobj.selectInx === 3) {
                    var opts = {};
                    opts.paraSet = gr.paraSet;
                    opts.title = iobj.selectText;
                    opts.actionFunc = function (iobj) {
                        console.log(iobj);
                        KvLib.deepCoverObject(gr.paraSet, iobj.paraSet);
                        var fileName = "paraSet";
                        var content = JSON.stringify(gr.paraSet);
                        sv.saveStringToFile("responseDialogError", "null", fileName, content);
                    };
                    opts.setNames = [];
                    if (gr.appId === 0) {
                        opts.setNames.push("locationFromSource");
                        opts.setNames.push("mastLatitude");
                        opts.setNames.push("mastLongitude");
                        opts.setNames.push("mastAttitude");
                        opts.setNames.push("sub1Latitude");
                        opts.setNames.push("sub1Longitude");
                        opts.setNames.push("sub1Attitude");
                        opts.setNames.push("sub2Latitude");
                        opts.setNames.push("sub2Longitude");
                        opts.setNames.push("sub2Attitude");

                    }
                    box.paraEditBox(opts);
                    return;
                }

                if (iobj.selectInx === 6) {
                    gr.appId = 0;
                    gr.appType = "Model~DummyTargetMaster~base.sys0";
                    sys.dispWebPage(gr.appType);
                    return;
                }
                if (iobj.selectInx === 7) {
                    gr.appId = 1;
                    gr.appType = "Model~DummyTargetSub~base.sys0";
                    sys.dispWebPage(gr.appType);
                    return;
                }
                if (iobj.selectInx === 8) {
                    gr.appId = 2;
                    gr.appType = "Model~DummyTargetSub~base.sys0";
                    sys.dispWebPage(gr.appType);
                    return;
                }
                if (iobj.selectInx === 9) {
                    gr.appId = 3;
                    gr.appType = "Model~DummyTargetCtr~base.sys0";
                    sys.dispWebPage(gr.appType);
                    return;
                }
                if (iobj.selectInx === 10) {
                    gr.appId = 3;
                    gr.appType = "Model~DummyTargetCtr~base.sys0";
                    sys.dispWebPage(gr.appType);
                    return;
                }




            };

            box.selectBox(opts);
        };
        setPrg();
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
            setPrg();
        };
        box.intPadBox(opts);

    }

    initOpts(md) {
        var self = this;
        var opts = {};
        Block.setBaseOpts(opts);
        return opts;
    }

    chkWatch() {
        var self = this;
        var md = this.md;
        var op = md.opts;
        var st = md.stas;
        return;
        st.radarStatusText = [];
        st.radarStatusColor = [];

        /*
         SP雷達信號     0.0: 無信號, 0.1: 信號備便
         脈波來源       1.0: 主雷同步, 1.1: 本機脈波
         與副控1連線方式  2.0: 光纖, 2.1: 無線, 2.2: 自動 
         與副控2連線方式  2.0: 光纖, 2.1: 無線, 2.2: 自動 
         */



    }

    actionFunc(iobj) {
        console.log(iobj);
        if (iobj.act === "mouseClick") {
            if (iobj.keyId === "radarPaneSetButton") {
                var opts = {};
                opts.paraSet = gr.paraSet;
                opts.title = "主控雷達設定";
                opts.h = 300;
                opts.eh = 60;
                opts.ym = 10;
                opts.actionFunc = function (iobj) {
                    console.log(iobj);
                    KvLib.deepCoverObject(gr.paraSet, iobj.paraSet);
                    var fileName = "paraSet";
                    var content = JSON.stringify(gr.paraSet);
                    sv.saveStringToFile("responseDialogError", "null", fileName, content);
                };
                opts.setNames = [];
                opts.setNames.push("mastPulseSource");
                opts.setNames.push("mastToSub1CommType");
                opts.setNames.push("mastToSub2CommType");
                box.paraEditBox(opts);
                return;




            }

            var setF = 0;
            if (iobj.keyId === "targetPane1SetButton") {
                setF = 1;
            }
            if (iobj.keyId === "targetPane2SetButton") {
                setF = 2;
            }
            if (setF) {
                var opts = {};
                opts.paraSet = gr.paraSet;
                if (setF === 1) {
                    opts.title = "副控1雷達設定";
                    var preText = "sub1";
                }
                if (setF === 2) {
                    opts.title = "副控2雷達設定";
                    var preText = "sub2";
                }
                opts.h = 350;
                opts.eh = 60;
                opts.ym = 10;

                opts.actionFunc = function (iobj) {
                    console.log(iobj);
                    KvLib.deepCoverObject(gr.paraSet, iobj.paraSet);
                    var fileName = "paraSet";
                    var content = JSON.stringify(gr.paraSet);
                    sv.saveStringToFile("responseDialogError", "null", fileName, content);
                };
                opts.setNames = [];
                opts.setNames.push(preText + "BatShort");
                opts.setNames.push(preText + "PulseSource");
                opts.setNames.push(preText + "TxLoad");
                opts.setNames.push(preText + "CommType");
                box.paraEditBox(opts);
                return;
            }


            var setF = 0;
            if (iobj.keyId === "targetPane1CtrButton") {
                setF = 1;
            }
            if (iobj.keyId === "targetPane2CtrButton") {
                setF = 2;
            }
            if (setF) {
                var opts = {};
                opts.paraSet = gr.paraSet;
                if (setF === 1) {
                    opts.title = "副控1雷達控制";
                }
                if (setF === 2) {
                    opts.title = "副控2雷達控制";
                }
                opts.xc = 2;
                opts.yc = 10;
                opts.eh = 60;
                opts.eym = 20;
                opts.h = 300;
                opts.kvTexts = [];
                opts.kvTexts.push("放大器電源 開啟");
                opts.kvTexts.push("放大器電源 關閉");
                opts.kvTexts.push("脈波信號 發射");
                opts.kvTexts.push("脈波信號 停止");
                opts.kvTexts.push("放大器 重置");
                opts.kvTexts.push("系統 重置");
                opts.actionFunc = function (iobj) {
                    console.log(iobj);
                    MdaPopWin.popOff(2);

                };
                box.selectBox(opts);




                return;
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
        opts.innerText = "主控雷達同步控制器";
        blocks[cname] = {name: "basePanel", type: "Component~Cp_base~label.title", opts: opts};
        //==============================
        var cname = lyMaps["mainBody"] + "~" + 1;
        var opts = {};
        opts.buttons = ["自測", "佈署", "同步", "波形", "通話", "設定"];
        opts.buttonIds = ["selfTest", "location", "sync", "wave", "call", "setting"];
        opts.actionFunc = function (iobj) {
            console.log(iobj);
            if (iobj.buttonId === "location") {
                var opts = {};
                opts.actionFunc = function (iobj) {
                    console.log(iobj);
                    if (iobj.act === "esc")
                        MdaPopWin.popOff(2);
                };
                var kvObj = new Block("location", "Model~LocationTarget~base.sys0", opts);
                var mesObj = mda.popObj(0, 0, kvObj);
                return;
            }
            if (iobj.buttonId === "selfTest") {
                var opts = {};
                opts.actionFunc = function (iobj) {
                    console.log(iobj);
                    if (iobj.act === "esc")
                        MdaPopWin.popOff(2);
                };
                var kvObj = new Block("selfTest", "Model~SelfTest~base.sys0", opts);
                var mesObj = mda.popObj(0, 0, kvObj);
                return;
            }
            if (iobj.buttonId === "sync") {
                var opts = {};
                opts.actionFunc = function (iobj) {
                    console.log(iobj);
                    if (iobj.act === "esc")
                        MdaPopWin.popOff(2);
                };
                var kvObj = new Block("syncTest", "Model~SyncTest~base.sys0", opts);
                var mesObj = mda.popObj(0, 0, kvObj);
                return;
            }
            if (iobj.buttonId === "wave") {
                var opts = {};
                opts.actionFunc = function (iobj) {
                    console.log(iobj);
                    if (iobj.act === "esc")
                        MdaPopWin.popOff(2);
                };
                var kvObj = new Block("scope", "Model~MyNewScope~base.sys0", opts);
                var mesObj = mda.popObj(0, 0, kvObj);
                return;
            }

            if (iobj.buttonId === "setting") {
                DummyTargetMaster.paraSetPrg();
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
                    DummyTargetMaster.paraSetPrg();
                };
                box.intPadBox(opts);
            }

            if (iobj.buttonId === "call") {
                var opts = {};
                opts.actionFunc = function (iobj) {
                    console.log(iobj);
                    if (iobj.act === "esc")
                        MdaPopWin.popOff(2);
                };
                var kvObj = new Block("syncTest", "Model~PhoneBox~base.sys0", opts);
                var mesObj = mda.popObj(0, 0, kvObj);
                return;
            }


        };
        opts.buttonAmt = 6;
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
        opts.title = "副控雷達 1";
        opts.actionFunc = self.actionFunc;
        blocks[cname] = {name: "targetPane1", type: "Model~TargetPane~base.sys0", opts: opts};
        //==============================
        var cname = lyMaps["leftBody"] + "~" + 1;
        var opts = {};
        opts.title = "副控雷達 2";
        opts.actionFunc = self.actionFunc;
        blocks[cname] = {name: "targetPane2", type: "Model~TargetPane~base.sys0", opts: opts};
        //==============================
        var cname = lyMaps["downBody"] + "~" + 1;
        var opts = {};
        opts.title = "主控雷達";
        opts.actionFunc = self.actionFunc;
        opts.baseColor = "#ccc";
        blocks[cname] = {name: "masterRadarPane", type: "Model~MasterRadarPane~base.sys0", opts: opts};
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
        opts.deviceInx = 0;//0:sub1,sub2
        return opts;
    }
    subTypeOpts(opts) {
        if (this.md.subType === "base.sys0") {
        }
    }
    chkWatch() {
        /*
         雷達狀態    0.0: 未連線, 0.1: 準備中, 0.2:本機備便, 0.3:發射備便, 0.4:發射中, 0.5:異常發生               
         環控        1.0: 未連線, 1.1:良好, 1.2: 異常 
         SSPA電源    2.0: 未連線, 2.1:良好, 2.2: 異常 
         SSPA放大器  3.0: 未連線, 3.1:良好, 3.2: 異常 
         SSPA功率    4.0: 未連線, 3.1:良好, 4.2: 異常 
         戰備狀態    5.0: 未連線, 5.1:關閉, 5.2: 開啟 
         遠端遙控    6.0: 未連線, 6.1:關閉, 6.2: 開啟 
         脈波來源    7.0: 未連線, 7.1: 主雷同步, 7.2: 本機脈波
         輸出裝置    8.0: 未連線, 8.1: 天線, 8.2:假負載 
         連線方式    9.0: 未連線, 9.1: 光纖, 9.2:無線, 9.3:自動 
         */

        //radarStatus.mastStatus = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
        //radarStatus.sub1Status = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
        //radarStatus.sub2Status = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
        var self = this;
        var md = this.md;
        var op = md.opts;
        var st = md.stas;
        st.radarStatusText = [];
        st.radarStatusColor = [];
        st.radarStatusText.push("雷達狀態: 未連線");
        st.radarStatusText.push("環控");
        st.radarStatusText.push("放大器電源");
        st.radarStatusText.push("固態放大器");
        st.radarStatusText.push("輻射功率");
        st.radarStatusText.push("戰備狀態");
        st.radarStatusText.push("遠端遙控");
        st.radarStatusText.push("脈波來源");
        st.radarStatusText.push("輸出裝置");
        st.radarStatusText.push("連線方式");
        st.radarStatusColor.push("#888");
        st.radarStatusColor.push("#888");
        st.radarStatusColor.push("#888");
        st.radarStatusColor.push("#888");
        st.radarStatusColor.push("#888");
        st.radarStatusColor.push("#888");
        st.radarStatusColor.push("#888");
        st.radarStatusColor.push("#888");
        st.radarStatusColor.push("#888");
        st.radarStatusColor.push("#888");
        st.remoteDisable_f = 0;
        if (op.deviceInx === 0)
            var radarStatus = gr.syncData.radarStatus.sub1Status;
        else
            var radarStatus = gr.syncData.radarStatus.sub2Status;

        if (radarStatus[0] === 0) {
            st.remoteDisable_f = 1;
        }

        if (radarStatus[0] !== 0) {
            if (radarStatus[0] === 1) {
                st.radarStatusText[0] = "雷達狀態: 準備中";
                st.radarStatusColor[0] = "#eeeeee";
            }
            if (radarStatus[0] === 2) {
                st.radarStatusText[0] = "雷達狀態: 本機備便";
                st.radarStatusColor[0] = "#eeeeee";
            }
            if (radarStatus[0] === 3) {
                st.radarStatusText[0] = "雷達狀態: 發射備便";
                st.radarStatusColor[0] = "#ccffcc";
            }
            if (radarStatus[0] === 4) {
                st.radarStatusText[0] = "雷達狀態: 發射中";
                st.radarStatusColor[0] = "#ffff00";
            }
            if (radarStatus[0] === 5) {
                st.radarStatusText[0] = "雷達狀態: 異常";
                st.radarStatusColor[0] = "#ffcccc";
            }
            //======================
            if (radarStatus[1] === 1) {
                st.radarStatusText[1] = "環控: 準備中";
                st.radarStatusColor[1] = "#eeeeee";
            }
            if (radarStatus[1] === 2) {
                st.radarStatusText[1] = "環控: 正常";
                st.radarStatusColor[1] = "#ccffcc";
            }
            //======================
            if (radarStatus[2] === 1) {
                st.radarStatusText[2] = "放大器電源: 備便";
                st.radarStatusColor[2] = "#eeeeee";
            }
            if (radarStatus[2] === 2) {
                st.radarStatusText[2] = "放大器電源: 正常";
                st.radarStatusColor[2] = "#ccffcc";
            }
            if (radarStatus[2] === 3) {
                st.radarStatusText[2] = "放大器電源: 異常";
                st.radarStatusColor[2] = "#ffcccc";
            }
            //======================
            if (radarStatus[3] === 1) {
                st.radarStatusText[3] = "固態放大器: 備便";
                st.radarStatusColor[3] = "#eeeeee";
            }
            if (radarStatus[3] === 2) {
                st.radarStatusText[3] = "固態放大器: 正常";
                st.radarStatusColor[3] = "#ccffcc";
            }
            if (radarStatus[3] === 3) {
                st.radarStatusText[3] = "固態放大器: 異常";
                st.radarStatusColor[3] = "#ffcccc";
            }
            //======================
            if (radarStatus[4] === 1) {
                st.radarStatusText[4] = "輻射功率: 備便";
                st.radarStatusColor[4] = "#eeeeee";
            }
            if (radarStatus[4] === 2) {
                st.radarStatusText[4] = "輻射功率: 正常";
                st.radarStatusColor[4] = "#ccffcc";
            }
            if (radarStatus[4] === 3) {
                st.radarStatusText[4] = "輻射功率: 異常";
                st.radarStatusColor[4] = "#ffcccc";
            }
            //======================
            if (radarStatus[5] === 1) {
                st.radarStatusText[5] = "戰備狀態: 關閉";
                st.radarStatusColor[5] = "#eeeeee";
            }
            if (radarStatus[5] === 2) {
                st.radarStatusText[5] = "戰備狀態: 開啟";
                st.radarStatusColor[5] = "#ffffcc";
            }

            //======================
            if (radarStatus[6] === 1) {
                st.radarStatusText[6] = "遠端遙控: 關閉";
                st.radarStatusColor[6] = "#eeeeee";
                st.remoteDisable_f = 1;
            }
            if (radarStatus[6] === 2) {
                st.radarStatusText[6] = "遠端遙控: 開啟";
                st.radarStatusColor[6] = "#ffffcc";
            }
            //======================
            if (radarStatus[7] === 1) {
                st.radarStatusText[7] = "脈波來源: 主雷同步";
                st.radarStatusColor[7] = "#eeeeee";
            }
            if (radarStatus[7] === 2) {
                st.radarStatusText[7] = "脈波來源: 本機脈波";
                st.radarStatusColor[7] = "#eeeeee";
            }
            //======================
            if (radarStatus[8] === 1) {
                st.radarStatusText[8] = "輸出裝置: 天線";
                st.radarStatusColor[8] = "#eeeeee";
            }
            if (radarStatus[8] === 2) {
                st.radarStatusText[8] = "輸出裝置: 假負載";
                st.radarStatusColor[8] = "#eeeeee";
            }
            //======================
            if (radarStatus[9] === 1) {
                st.radarStatusText[9] = "連線方式: 光纖";
                st.radarStatusColor[9] = "#eeeeee";
            }
            if (radarStatus[9] === 2) {
                st.radarStatusText[9] = "連線方式: 無線";
                st.radarStatusColor[9] = "#eeeeee";
            }
            if (radarStatus[9] === 3) {
                st.radarStatusText[9] = "連線方式: 自動";
                st.radarStatusColor[9] = "#eeeeee";
            }

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
        opts.ym = 4;
        var yr = (1 / 9).toFixed(3) + "rh";
        opts.yArr = [yr, yr, yr, yr, yr, yr, yr, yr, yr, yr, yr];
        opts.xyArr = [[9999], [9999], ["0.5rw", 9999], ["0.5rw", 9999], ["0.5rw", 9999], [9999], [9999], [9999], ["0.5rw", 9999], [9999]];
        var lyInx = 0;
        layouts[cname] = {name: cname, type: "Layout~Ly_base~xyArray.sys0", opts: opts};
        lyMaps["mainBody"] = cname;
        var cname = lyMaps["mainBody"] + "~" + lyInx++;
        var opts = {};
        opts.innerText = op.title;
        blocks[cname] = {name: "basePanel", type: "Component~Cp_base~label.title", opts: opts};
        //==============================
        for (var i = 0; i < 10; i++) {
            var cname = lyMaps["mainBody"] + "~" + lyInx++;
            var opts = {};
            opts.fontSize = "0.5rh";
            opts.innerText = "";
            var watchReg = "self.fatherMd.stas.radarStatusText[" + i + "]";
            md.setInputWatch(opts, "directName", watchReg, "innerText", 1);
            var watchReg = "self.fatherMd.stas.radarStatusColor[" + i + "]";
            md.setInputWatch(opts, "directName", watchReg, "baseColor", 1);
            blocks[cname] = {name: "statusLabel#0", type: "Component~Cp_base~label.led", opts: opts};
        }
        var cname = lyMaps["mainBody"] + "~" + lyInx++;
        var opts = {};
        opts.innerText = "設定";
        opts.fontSize = "0.6rh";
        var watchReg = "self.fatherMd.stas.remoteDisable_f";
        md.setInputWatch(opts, "directName", watchReg, "disable_f", 1);
        opts.actionFunc = function (iobj) {
            console.log(iobj);
            iobj.sender = md;
            iobj.keyId = md.name + "SetButton";
            KvLib.exe(op.actionFunc, iobj);
        };
        blocks[cname] = {name: "setButton", type: "Component~Cp_base~button.sys0", opts: opts};

        var cname = lyMaps["mainBody"] + "~" + lyInx++;
        var opts = {};
        opts.innerText = "控制";
        opts.fontSize = "0.6rh";
        var watchReg = "self.fatherMd.stas.remoteDisable_f";
        md.setInputWatch(opts, "directName", watchReg, "disable_f", 1);
        opts.actionFunc = function (iobj) {
            console.log(iobj);
            iobj.sender = md;
            iobj.keyId = md.name + "CtrButton";
            KvLib.exe(op.actionFunc, iobj);
        };
        blocks[cname] = {name: "ctrButton", type: "Component~Cp_base~button.sys0", opts: opts};


        //==============================
    }
}

class MasterRadarPane {
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
        opts.layoutType = "row"; //row,collum,array
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

    cmdPrg(cmd) {
        var self = this;
        var md = self.md;
        var op = md.opts;
        if (cmd.act === "clearEditor") {
            var kvObj = md.compRefs["editor"];
            if (!kvObj)
                return;
            var editor = kvObj.objs["editor"];
            KvLib.clearEditorMaker(editor);
            editor.getSession().setValue("");
            return;
        }
        if (cmd.act === "insertEditor") {
            var kvObj = md.compRefs["editor"];
            if (!kvObj)
                return;
            var editor = kvObj.objs["editor"];
            editor.insert(cmd.text);
            return;
        }
        if (cmd.act === "setMaker") {
            var kvObj = md.compRefs["editor"];
            if (!kvObj)
                return;
            var editor = kvObj.objs["editor"];
            KvLib.setEditorMaker(editor, cmd.color);
            return;
        }

        if (cmd.act === "gotoEnd") {
            var kvObj = md.compRefs["editor"];
            if (!kvObj)
                return;
            var editor = kvObj.objs["editor"];
            var row = editor.session.getLength() - 1;
            var column = editor.session.getLine(row).length; // or simply Infinity
            editor.gotoLine(row + 1, column);
        }
    }

    chkWatch() {
        var self = this;
        var md = this.md;
        var op = md.opts;
        var st = md.stas;

        st.radarStatusText = [];
        st.radarStatusColor = [];

        /*
         SP雷達信號     0.0: 無信號, 0.1: 信號備便
         脈波來源       1.0: 主雷同步, 1.1: 本機脈波
         與副控1連線方式  2.0: 光纖, 2.1: 無線, 2.2: 自動 
         與副控2連線方式  2.0: 光纖, 2.1: 無線, 2.2: 自動 
         */

        st.connectCnt = "Connect:" + gr.syncData.connectCnt % 10;
        st.radarStatusText.push("SP雷達信號: 無");
        st.radarStatusText.push("脈波來源");
        st.radarStatusText.push("與副控1連線方式");
        st.radarStatusText.push("與副控2連線方式");
        st.radarStatusColor.push("#eeeeee");
        st.radarStatusColor.push("#eeeeee");
        st.radarStatusColor.push("#eeeeee");
        st.radarStatusColor.push("#eeeeee");
        var radarStatus = gr.syncData.radarStatus.mastStatus;
        if (radarStatus[0] === 1) {
            st.radarStatusText[0] = "SP雷達信號: 信號備便";
        }
        if (gr.paraSet.mastPulseSource === 0)
            st.radarStatusText[1] = "脈波來源: SP同步";
        else
            st.radarStatusText[1] = "脈波來源: 本機脈波";

        if (gr.paraSet.mastToSub1CommType === 0) {
            st.radarStatusText[2] = "與副控1連線方式: 光纖";
        }
        if (gr.paraSet.mastToSub1CommType === 1) {
            st.radarStatusText[2] = "與副控1連線方式: 無線";
        }
        if (gr.paraSet.mastToSub1CommType === 2) {
            st.radarStatusText[2] = "與副控1連線方式: 自動";
        }

        if (gr.paraSet.mastToSub2CommType === 0) {
            st.radarStatusText[3] = "與副控2連線方式: 光纖";
        }
        if (gr.paraSet.mastToSub2CommType === 1) {
            st.radarStatusText[3] = "與副控2連線方式: 無線";
        }
        if (gr.paraSet.mastToSub2CommType === 2) {
            st.radarStatusText[3] = "與副控2連線方式: 自動";
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
        var actionPrg = function (iobj) {
            console.log(iobj);
            if (iobj.kvObj.name === "clrButton") {
                var kvObj = md.blockRefs["editor"];
                if (!kvObj)
                    return;
                var editor = kvObj.objs["editor"];
                KvLib.clearEditorMaker(editor);
                editor.getSession().setValue("");
                return;
            }

            iobj.sender = md;
            iobj.keyId = md.name + iobj.kvObj.name;
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
        opts.xm = 10;
        opts.ym = 8;
        opts.yArr = [45, 90, 90, 60, 9999];
        opts.xyArr = [
            [9999],
            ["0.5rw", 9999],
            ["0.5rw", 9999],
            ["0.1rw", 9999],
            [9999]
        ];
        layouts[cname] = {name: cname, type: "Layout~Ly_base~xyArray.sys0", opts: opts};
        lyMaps["mainBody"] = cname;
        //===================================
        var lyInx = 0;
        var cname = lyMaps["mainBody"] + "~" + lyInx++;
        var opts = {};
        opts.innerText = op.title;
        blocks[cname] = {name: "basePanel", type: "Component~Cp_base~label.title", opts: opts};
        //==============================
        var preText = "mast";
        for (var i = 0; i < 6; i++) {
            var cname = lyMaps["mainBody"] + "~" + lyInx++;
            var opts = {};
            opts.setOptss = [];
            if (i === 0) {
                opts.title = "主雷達脈波信號";
                var setOpts = opts.setOpts = sopt.getOptsPara("ledView");
                setOpts.value = "無信號";//
            }
            if (i === 1) {
                opts.title = "雷達狀態";
                var setOpts = opts.setOpts = sopt.getOptsPara("ledView");
                setOpts.value = "備便";//
            }
            if (i === 2) {
                var setOpts = opts.setOpts = sopt.getOptsPara("buttonSelect");
                var para = sopt.getParaSetOpts({paraSetName: "mastToSub1CommType", titleWidth: 0, titleFontSize: "0.5rh"});
                opts.title = "主控與副控1連線方式";
                setOpts.enum = para.enum;
                setOpts.value = para.value;
            }
            if (i === 3) {
                var setOpts = opts.setOpts = sopt.getOptsPara("buttonSelect");
                var para = sopt.getParaSetOpts({paraSetName: "mastToSub2CommType", titleWidth: 0, titleFontSize: "0.5rh"});
                opts.title = "主控與副控2連線方式";
                setOpts.enum = para.enum;
                setOpts.value = para.value;
            }

            if (i === 4) {
                opts.backgroundInx = 0;
                //var watchReg = "self.fatherMd.stas.radarStatusColor[" + 4 + "]";
                //md.setInputWatch(opts, "directName", watchReg, "backgroundInx", 1);
                blocks[cname] = {name: "startLed", type: "Component~Cp_base~icons.led", opts: opts};
                continue;
                //===
            }

            if (i === 5) {
                var setOpts = opts.setOpts = sopt.getOptsPara("buttonActs");
                setOpts.titleWidth = 0;
                setOpts.enum = ["脈波啟動", "脈波停止"];
                setOpts.value = para.value;
                setOpts.baseColor = "#ccc";
                setOpts.borderWidth = 0;
                setOpts.fontSize = "0.6rh";
                blocks[cname] = {name: "control", type: "Model~MdaSetLine~base.sys0", opts: opts};
                continue;

            }

            setOpts.titleWidth = 0;
            setOpts.baseColor = "#002";
            setOpts.borderWidth = 0;
            opts.setOptss.push(setOpts);
            opts.actionFunc = actionPrg;
            blocks[cname] = {name: "positionPanel", type: "Model~MdaSetGroup~base.sys0", opts: opts};
        }




        /*
         for (var i = 0; i < 4; i++) {
         var cname = lyMaps["mainBody"] + "~" + lyInx++;
         var opts = {};
         opts.fontSize = "0.5rh";
         opts.innerText = "";
         var watchReg = "self.fatherMd.stas.radarStatusText[" + i + "]";
         md.setInputWatch(opts, "directName", watchReg, "innerText", 1);
         var watchReg = "self.fatherMd.stas.radarStatusColor[" + i + "]";
         md.setInputWatch(opts, "directName", watchReg, "baseColor", 1);
         blocks[cname] = {name: "statusLabel#0", type: "Component~Cp_base~label.led", opts: opts};
         }
         */
        //==============================
        /*
         var cname = lyMaps["mainBody"] + "~" + lyInx++;
         var opts = {};
         opts.backgroundInx = 0;
         var watchReg = "self.fatherMd.stas.radarStatusColor[" + 4 + "]";
         md.setInputWatch(opts, "directName", watchReg, "backgroundInx", 1);
         blocks[cname] = {name: "startLed", type: "Component~Cp_base~icons.led", opts: opts};
         //===
         var cname = lyMaps["mainBody"] + "~" + lyInx++;
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
         var cname = lyMaps["mainBody"] + "~" + lyInx++;
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
         var cname = lyMaps["mainBody"] + "~" + lyInx++;
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
         */

        //==============================
        var cname = lyMaps["mainBody"] + "~" + lyInx++;
        var opts = {};
        opts.ym = 2;
        opts.yArr = [9999, 40];
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
        opts.innerText = ""; //"無線"|光纖;
        opts.baseColor = "#ccc";
        opts.textAlign = "left";
        opts.fontSize = 14;
        opts.lpd = 4;
        var watchReg = "self.fatherMd.stas.connectCnt";
        md.setInputWatch(opts, "directName", watchReg, "innerText", 1);
        blocks[cname] = {name: "messageLabel", type: "Component~Cp_base~label.sys0", opts: opts};

        var cname = lyMaps["barBody"] + "~" + 1;
        var opts = {};
        opts.innerText = '<i class="gf">&#xe316;</i>';
        opts.baseColor = "#ccf";
        opts.actionFunc = actionPrg;
        blocks[cname] = {name: "upButton", type: "Component~Cp_base~button.sys0", opts: opts};
        //==============================
        var cname = lyMaps["barBody"] + "~" + 2;
        var opts = {};
        opts.innerText = '<i class="gf">&#xe313;</i>';
        opts.baseColor = "#ccf";
        opts.actionFunc = actionPrg;
        blocks[cname] = {name: "downButton", type: "Component~Cp_base~button.sys0", opts: opts};
        //==============================
        var cname = lyMaps["barBody"] + "~" + 3;
        var opts = {};
        opts.innerText = 'clr';
        opts.baseColor = "#ccf";
        opts.actionFunc = actionPrg;
        blocks[cname] = {name: "clrButton", type: "Component~Cp_base~button.sys0", opts: opts};
        //==============================




        //==============================
    }
}
//==================================
class DummyTargetSub {
    constructor() {
    }
    static globleTime() {
        gr.syncData.connectTime++;
        if (gr.syncData.connectTime >= 6) {
            gr.syncData.connectTime = 0;
            gr.syncData.connectCnt++;
        }
    }
    initOpts(md) {
        var self = this;
        var opts = {};
        Block.setBaseOpts(opts);
        if (!gr.appFirstEntry_f) {
            gr.appFirstEntry_f = 1;
            var syncData = gr.syncData = {};
            var location = syncData.location = {};
            syncData.connectTime = 0;
            syncData.connectCnt = 0;
            syncData.slotStatus = [0, 1, 2, 3, 4, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
            syncData.slotIds = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 0, 0, 0, 0, 0];
            location.mastGpsData = [22, 59, 59, 99, 122, 59, 59, 99, 123, 270, "GPS unavalible"];
            location.sub1GpsData = [22, 59, 59, 99, 122, 59, 59, 99, 123, 270, "GPS unavalible"];
            location.sub2GpsData = [22, 59, 59, 99, 122, 59, 59, 99, 123, 270, "GPS unavalible"];

            var radarStatus = syncData.radarStatus = {};
            /*
             SP雷達信號     0.0: 無信號, 0.1: 信號備便
             脈波來源       1.0: 主雷同步, 1.1: 本機脈波
             與副控1連線方式  2.0: 光纖, 2.1: 無線, 2.2: 自動 
             與副控2連線方式  2.0: 光纖, 2.1: 無線, 2.2: 自動 
             */
            radarStatus.mastStatus = [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
            /*
             雷達狀態    0.0: 未連線, 0.1: 準備中, 0.2:本機備便, 0.3:發射備便, 0.4:發射中, 0.5:異常          
             環控        1.0: 未連線, 1.1:良好, 1.2: 異常 
             SSPA電源    2.0: 未連線, 2.1:良好, 2.2: 異常 
             SSPA放大器  3.0: 未連線, 3.1:良好, 3.2: 異常 
             SSPA功率    4.0: 未連線, 3.1:良好, 4.2: 異常 
             戰備狀態    5.0: 未連線, 5.1:關閉, 5.2: 開啟 
             遠端遙控    6.0: 未連線, 6.1:關閉, 6.2: 開啟 
             脈波來源    7.0: 未連線, 7.1: 主雷同步, 7.2: 本機脈波
             輸出裝置    8.0: 未連線, 8.1: 天線, 8.2:假負載 
             連線方式    9.0: 未連線, 9.1: 光纖, 9.2:無線, 9.3:自動 
             0.1
             */
            radarStatus.sub1Status = [1, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0];
            radarStatus.sub2Status = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

            //0 光纖連線狀態 0:未連線, 1:未連線 
            //1 RF連線狀態 0:未連線, 1:未連線 
            //2 1588修正時間  
            //3 封包發送數  
            //4 正確率
            //5 主控RF接收能量
            //6 副控RF接收能量
            syncData.sub1CommDatas = [0, 1, 3, 4, 1200, 10, 20];
            syncData.sub2CommDatas = [1, 0, 7, 8, 1201, 11, 22];



        }
        return opts;
    }

    chkWatch() {
        var self = this;
        var md = this.md;
        var op = md.opts;
        var st = md.stas;
        return;
        st.radarStatusText = [];
        st.radarStatusColor = [];

        /*
         SP雷達信號     0.0: 無信號, 0.1: 信號備便
         脈波來源       1.0: 主雷同步, 1.1: 本機脈波
         與副控1連線方式  2.0: 光纖, 2.1: 無線, 2.2: 自動 
         與副控2連線方式  2.0: 光纖, 2.1: 無線, 2.2: 自動 
         */



    }

    actionFunc(iobj) {
        console.log(iobj);
        if (iobj.act === "mouseClick") {

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
        opts.innerText = "副控雷達 " + gr.appId + " 同步控制器";
        blocks[cname] = {name: "basePanel", type: "Component~Cp_base~label.title", opts: opts};
        //==============================
        var cname = lyMaps["mainBody"] + "~" + 1;
        var opts = {};
        opts.buttons = ["自測", "佈署", "同步", "波形", "通話", "設定"];
        opts.buttonIds = ["selfTest", "location", "sync", "wave", "call", "setting"];

        opts.actionFunc = function (iobj) {
            console.log(iobj);
            if (iobj.buttonId === "location") {
                var opts = {};
                opts.actionFunc = function (iobj) {
                    console.log(iobj);
                    if (iobj.act === "esc")
                        MdaPopWin.popOff(2);
                };
                var kvObj = new Block("location", "Model~LocationTarget~base.sys0", opts);
                var mesObj = mda.popObj(0, 0, kvObj);
                return;
            }
            if (iobj.buttonId === "selfTest") {
                var opts = {};
                opts.actionFunc = function (iobj) {
                    console.log(iobj);
                    if (iobj.act === "esc")
                        MdaPopWin.popOff(2);
                };
                var kvObj = new Block("selfTest", "Model~SelfTest~base.sys0", opts);
                var mesObj = mda.popObj(0, 0, kvObj);
                return;
            }
            if (iobj.buttonId === "sync") {
                var opts = {};
                opts.actionFunc = function (iobj) {
                    console.log(iobj);
                    if (iobj.act === "esc")
                        MdaPopWin.popOff(2);
                };
                var kvObj = new Block("syncTest", "Model~SyncTest~base.sys0", opts);
                var mesObj = mda.popObj(0, 0, kvObj);
                return;
            }
            if (iobj.buttonId === "wave") {
                var opts = {};
                opts.actionFunc = function (iobj) {
                    console.log(iobj);
                    if (iobj.act === "esc")
                        MdaPopWin.popOff(2);
                };
                var kvObj = new Block("scope", "Model~MyNewScope~base.sys0", opts);
                var mesObj = mda.popObj(0, 0, kvObj);
                return;
            }

            if (iobj.buttonId === "setting") {
                DummyTargetMaster.paraSetPrg();
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
                    DummyTargetMaster.paraSetPrg();
                };
                box.intPadBox(opts);
            }

            if (iobj.buttonId === "call") {
                var opts = {};
                opts.actionFunc = function (iobj) {
                    console.log(iobj);
                    if (iobj.act === "esc")
                        MdaPopWin.popOff(2);
                };
                var kvObj = new Block("syncTest", "Model~PhoneBox~base.sys0", opts);
                var mesObj = mda.popObj(0, 0, kvObj);
                return;
            }


        };
        opts.buttonAmt = 6;
        blocks[cname] = {name: "headButtons", type: "Model~MdaButtons~base.sys0", opts: opts};
        //==============================
        var cname = lyMaps["mainBody"] + "~" + 2;
        var opts = {};
        opts.xArr = [0, 9999];
        opts.xm = 0;
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
        //==============================
        //==============================
        var cname = lyMaps["downBody"] + "~" + 1;
        var opts = {};
        opts.title = "";
        opts.actionFunc = self.actionFunc;
        opts.baseColor = "#222";
        blocks[cname] = {name: "sub1RadarPane", type: "Model~SubRadarPane~base.sys0", opts: opts};
        //==============================



    }
}

class SubRadarPane {
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
        opts.layoutType = "row"; //row,collum,array
        opts.buttonIds = [];
        opts.iw = 9999;
        opts.ih = 9999;
        opts.borderWidth = 1;
        opts.xm = 30;
        opts.baseColor = "#222";
        return opts;
    }
    subTypeOpts(opts) {
        if (this.md.subType === "base.sys0") {
        }
    }

    chkWatch() {
        var self = this;
        var md = this.md;
        var op = md.opts;
        var st = md.stas;

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
        var actionPrg = function (iobj) {
            console.log(iobj);
            if (iobj.kvObj.name === "clrButton") {
                var kvObj = md.blockRefs["editor"];
                if (!kvObj)
                    return;
                var editor = kvObj.objs["editor"];
                KvLib.clearEditorMaker(editor);
                editor.getSession().setValue("");
                return;
            }

            iobj.sender = md;
            iobj.keyId = md.name + iobj.kvObj.name;
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
        opts.xm = 10;
        opts.ym = 4;
        opts.yArr = [0, 85, 85, 85, 60, 9999];
        opts.xyArr = [
            [9999],
            ["0.196rw", "0.3rw", 9999],
            ["0.5rw", 9999],
            ["0.3rw", "0.3rw", 9999],
            ["0.1rw", 9999],
            [9999]
        ];
        layouts[cname] = {name: cname, type: "Layout~Ly_base~xyArray.sys0", opts: opts};
        lyMaps["mainBody"] = cname;
        //===================================
        var lyInx = 0;
        //var opts = {};
        //opts.innerText = op.title;
        //blocks[cname] = {name: "basePanel", type: "Component~Cp_base~label.title", opts: opts};
        lyInx++;
        //==============================

        var actionPrg = function (iobj) {
            console.log(iobj);
        };

        if (gr.appId === 1)
            var preText = "sub1";
        if (gr.appId === 2)
            var preText = "sub2";
        for (var i = 0; i < 10; i++) {
            var cname = lyMaps["mainBody"] + "~" + lyInx++;
            var opts = {};
            opts.setOptss = [];
            if (i === 0) {
                opts.title = "主雷達脈波信號";
                var setOpts = opts.setOpts = sopt.getOptsPara("ledView");
                setOpts.value = "無信號";//
            }
            if (i === 1) {
                opts.title = "雷達狀態";
                var setOpts = opts.setOpts = sopt.getOptsPara("ledView");
                setOpts.value = "備便";//
            }
            if (i === 2) {

                var setOpts = opts.setOpts = sopt.getOptsPara("buttonSelect");
                var para = sopt.getParaSetOpts({paraSetName: preText + "Remote", titleWidth: 0, titleFontSize: "0.5rh"});
                opts.title = "遠端遙控";
                setOpts.enum = para.enum;
                setOpts.value = para.value;
            }
            if (i === 3) {
                var setOpts = opts.setOpts = sopt.getOptsPara("buttonSelect");
                var para = sopt.getParaSetOpts({paraSetName: preText + "PulseSource", titleWidth: 0, titleFontSize: "0.5rh"});
                opts.title = "脈波來源";
                setOpts.enum = para.enum;
                setOpts.value = para.value;
            }
            if (i === 4) {
                var setOpts = opts.setOpts = sopt.getOptsPara("buttonSelect");
                var para = sopt.getParaSetOpts({paraSetName: preText + "CommType", titleWidth: 0, titleFontSize: "0.5rh"});
                opts.title = "連線方式";
                setOpts.enum = para.enum;
                setOpts.value = para.value;
            }
            if (i === 5) {
                var setOpts = opts.setOpts = sopt.getOptsPara("buttonSelect");
                var para = sopt.getParaSetOpts({paraSetName: preText + "TxLoad", titleWidth: 0, titleFontSize: "0.5rh"});
                opts.title = "輸出裝置";
                setOpts.enum = para.enum;
                setOpts.enumColors = ["#eef", "#ffc"];
                setOpts.value = para.value;
            }
            if (i === 6) {
                var setOpts = opts.setOpts = sopt.getOptsPara("buttonSelect");
                var para = sopt.getParaSetOpts({paraSetName: preText + "BatShort", titleWidth: 0, titleFontSize: "0.5rh"});
                opts.title = "戰備短路";
                setOpts.enum = para.enum;
                setOpts.enumColors = ["#eef", "#ffc"];
                setOpts.value = para.value;
            }

            if (i === 7) {
                var setOpts = opts.setOpts = sopt.getOptsPara("buttonSelect");
                opts.title = "固態放大器電源";
                setOpts.enum = ["關閉", "開啟"];
                setOpts.enumColors = ["#eef", "#ffc"];
                setOpts.value = 0;
            }

            if (i === 8) {
                opts.backgroundInx = 0;
                //var watchReg = "self.fatherMd.stas.radarStatusColor[" + 4 + "]";
                //md.setInputWatch(opts, "directName", watchReg, "backgroundInx", 1);
                blocks[cname] = {name: "startLed", type: "Component~Cp_base~icons.led", opts: opts};
                continue;
                //===
            }

            if (i === 9) {
                var setOpts = opts.setOpts = sopt.getOptsPara("buttonActs");
                setOpts.titleWidth = 0;
                setOpts.enum = ["脈波啟動", "脈波停止", "緊急停止"];
                setOpts.value = para.value;
                setOpts.baseColor = "#222";
                setOpts.borderWidth = 0;
                setOpts.fontSize = "0.6rh";
                blocks[cname] = {name: "control", type: "Model~MdaSetLine~base.sys0", opts: opts};
                continue;

            }

            setOpts.titleWidth = 0;
            setOpts.baseColor = "#002";
            setOpts.borderWidth = 0;
            opts.setOptss.push(setOpts);
            opts.actionFunc = actionPrg;
            blocks[cname] = {name: "positionPanel", type: "Model~MdaSetGroup~base.sys0", opts: opts};
        }


        //==============================================
        var cname = lyMaps["mainBody"] + "~" + lyInx++;
        var opts = {};
        opts.ym = 2;
        opts.yArr = [9999, 40];
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
        opts.innerText = ""; //"無線"|光纖;
        opts.baseColor = "#ccc";
        opts.textAlign = "left";
        opts.fontSize = 14;
        opts.lpd = 4;
        var watchReg = "self.fatherMd.stas.connectCnt";
        md.setInputWatch(opts, "directName", watchReg, "innerText", 1);
        blocks[cname] = {name: "messageLabel", type: "Component~Cp_base~label.sys0", opts: opts};

        var cname = lyMaps["barBody"] + "~" + 1;
        var opts = {};
        opts.innerText = '<i class="gf">&#xe316;</i>';
        opts.baseColor = "#ccf";
        opts.actionFunc = actionPrg;
        blocks[cname] = {name: "upButton", type: "Component~Cp_base~button.sys0", opts: opts};
        //==============================
        var cname = lyMaps["barBody"] + "~" + 2;
        var opts = {};
        opts.innerText = '<i class="gf">&#xe313;</i>';
        opts.baseColor = "#ccf";
        opts.actionFunc = actionPrg;
        blocks[cname] = {name: "downButton", type: "Component~Cp_base~button.sys0", opts: opts};
        //==============================
        var cname = lyMaps["barBody"] + "~" + 3;
        var opts = {};
        opts.innerText = 'clr';
        opts.baseColor = "#ccf";
        opts.actionFunc = actionPrg;
        blocks[cname] = {name: "clrButton", type: "Component~Cp_base~button.sys0", opts: opts};
        //==============================
    }
}



//==================================
class DummyTargetCtr {
    constructor() {
    }
    static globleTime() {
        gr.syncData.connectTime++;
        if (gr.syncData.connectTime >= 6) {
            gr.syncData.connectTime = 0;
            gr.syncData.connectCnt++;
        }
    }
    initOpts(md) {
        var self = this;
        var opts = {};
        Block.setBaseOpts(opts);
        if (!gr.appFirstEntry_f) {
            gr.appFirstEntry_f = 1;
            var syncData = gr.syncData = {};
            var location = syncData.location = {};
            syncData.connectTime = 0;
            syncData.connectCnt = 0;
            syncData.slotStatus = [0, 1, 2, 3, 4, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
            syncData.slotIds = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 0, 0, 0, 0, 0];
            location.mastGpsData = [22, 59, 59, 99, 122, 59, 59, 99, 123, 270, "GPS unavalible"];
            location.sub1GpsData = [22, 59, 59, 99, 122, 59, 59, 99, 123, 270, "GPS unavalible"];
            location.sub2GpsData = [22, 59, 59, 99, 122, 59, 59, 99, 123, 270, "GPS unavalible"];

            var radarStatus = syncData.radarStatus = {};
            /*
             SP雷達信號     0.0: 無信號, 0.1: 信號備便
             脈波來源       1.0: 主雷同步, 1.1: 本機脈波
             與副控1連線方式  2.0: 光纖, 2.1: 無線, 2.2: 自動 
             與副控2連線方式  2.0: 光纖, 2.1: 無線, 2.2: 自動 
             */
            radarStatus.mastStatus = [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
            /*
             雷達狀態    0.0: 未連線, 0.1: 準備中, 0.2:本機備便, 0.3:發射備便, 0.4:發射中, 0.5:異常          
             環控        1.0: 未連線, 1.1:良好, 1.2: 異常 
             SSPA電源    2.0: 未連線, 2.1:良好, 2.2: 異常 
             SSPA放大器  3.0: 未連線, 3.1:良好, 3.2: 異常 
             SSPA功率    4.0: 未連線, 3.1:良好, 4.2: 異常 
             戰備狀態    5.0: 未連線, 5.1:關閉, 5.2: 開啟 
             遠端遙控    6.0: 未連線, 6.1:關閉, 6.2: 開啟 
             脈波來源    7.0: 未連線, 7.1: 主雷同步, 7.2: 本機脈波
             輸出裝置    8.0: 未連線, 8.1: 天線, 8.2:假負載 
             連線方式    9.0: 未連線, 9.1: 光纖, 9.2:無線, 9.3:自動 
             0.1
             */
            radarStatus.sub1Status = [1, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0];
            radarStatus.sub2Status = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

            //0 光纖連線狀態 0:未連線, 1:未連線 
            //1 RF連線狀態 0:未連線, 1:未連線 
            //2 1588修正時間  
            //3 封包發送數  
            //4 正確率
            //5 主控RF接收能量
            //6 副控RF接收能量
            syncData.sub1CommDatas = [0, 1, 3, 4, 1200, 10, 20];
            syncData.sub2CommDatas = [1, 0, 7, 8, 1201, 11, 22];



        }
        return opts;
    }

    chkWatch() {
        var self = this;
        var md = this.md;
        var op = md.opts;
        var st = md.stas;
        return;
        st.radarStatusText = [];
        st.radarStatusColor = [];

        /*
         SP雷達信號     0.0: 無信號, 0.1: 信號備便
         脈波來源       1.0: 主雷同步, 1.1: 本機脈波
         與副控1連線方式  2.0: 光纖, 2.1: 無線, 2.2: 自動 
         與副控2連線方式  2.0: 光纖, 2.1: 無線, 2.2: 自動 
         */



    }

    actionFunc(iobj) {
        console.log(iobj);
        if (iobj.act === "mouseClick") {

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
        opts.innerText = "雷達中央控制器";
        blocks[cname] = {name: "basePanel", type: "Component~Cp_base~label.title", opts: opts};
        //==============================
        var cname = lyMaps["mainBody"] + "~" + 1;
        var opts = {};
        opts.buttons = ["自測", "發射機狀態", "電源狀態", "放大器狀態", "波形", "設定"];
        opts.buttonIds = ["selfTest", "radarStatus", "powerStatus", "sspaStatus", "wave", "setting"];
        opts.fontSize = "0.5rh";
        opts.xm = 4;


        opts.actionFunc = function (iobj) {
            console.log(iobj);
            var escPrg = function (iobj) {
                console.log(iobj);
                if (iobj.act === "esc")
                    MdaPopWin.popOff(2);
            };
            if (iobj.buttonId === "radarStatus") {
                var opts = {};
                opts.actionFunc = escPrg;
                var kvObj = new Block("location", "Model~CtrRadarStatus~base.sys0", opts);
                var mesObj = mda.popObj(0, 0, kvObj);
                return;
            }
            if (iobj.buttonId === "selfTest") {
                var opts = {};
                opts.actionFunc = escPrg;
                var kvObj = new Block("selfTest", "Model~SelfTest~base.sys0", opts);
                var mesObj = mda.popObj(0, 0, kvObj);
                return;
            }
            if (iobj.buttonId === "powerStatus") {
                var opts = {};
                opts.actionFunc = escPrg;
                var kvObj = new Block("location", "Model~CtrPowerStatus~base.sys0", opts);
                var mesObj = mda.popObj(0, 0, kvObj);
                return;
            }
            if (iobj.buttonId === "wave") {
                var opts = {};
                opts.actionFunc = escPrg;
                var kvObj = new Block("scope", "Model~MyNewScope~base.sys0", opts);
                var mesObj = mda.popObj(0, 0, kvObj);
                return;
            }

            if (iobj.buttonId === "setting") {
                DummyTargetMaster.paraSetPrg();
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
                    DummyTargetMaster.paraSetPrg();
                };
                box.intPadBox(opts);
            }

            if (iobj.buttonId === "call") {
                var opts = {};
                opts.actionFunc = escPrg;
                var kvObj = new Block("syncTest", "Model~PhoneBox~base.sys0", opts);
                var mesObj = mda.popObj(0, 0, kvObj);
                return;
            }


        };
        opts.buttonAmt = 6;
        blocks[cname] = {name: "headButtons", type: "Model~MdaButtons~base.sys0", opts: opts};
        //==============================
        var cname = lyMaps["mainBody"] + "~" + 2;
        var opts = {};
        opts.xArr = [0, 9999];
        opts.xm = 0;
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
        //==============================
        //==============================
        var cname = lyMaps["downBody"] + "~" + 1;
        var opts = {};
        opts.title = "";
        opts.actionFunc = self.actionFunc;
        opts.baseColor = "#222";
        blocks[cname] = {name: "sub1RadarPane", type: "Model~CtrRadarPane~base.sys0", opts: opts};
        //==============================



    }
}

class CtrRadarPane {
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
        opts.layoutType = "row"; //row,collum,array
        opts.buttonIds = [];
        opts.iw = 9999;
        opts.ih = 9999;
        opts.borderWidth = 1;
        opts.xm = 30;
        opts.baseColor = "#222";
        return opts;
    }
    subTypeOpts(opts) {
        if (this.md.subType === "base.sys0") {
        }
    }

    chkWatch() {
        var self = this;
        var md = this.md;
        var op = md.opts;
        var st = md.stas;

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
        var actionPrg = function (iobj) {
            console.log(iobj);
            if (iobj.kvObj.name === "clrButton") {
                var kvObj = md.blockRefs["editor"];
                if (!kvObj)
                    return;
                var editor = kvObj.objs["editor"];
                KvLib.clearEditorMaker(editor);
                editor.getSession().setValue("");
                return;
            }

            iobj.sender = md;
            iobj.keyId = md.name + iobj.kvObj.name;
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
        opts.xm = 10;
        opts.ym = 4;
        opts.yArr = [0, 120, 90, 100, 100, 9999, 20];
        var rw0 = (1 / 6).toFixed(3) + "rw";
        var rw1 = (1 / 4).toFixed(3) + "rw";
        var rw2 = (1 / 3).toFixed(3) + "rw";
        opts.xyArr = [
            [9999],
            [rw1, rw1, rw1, rw1],
            [rw0, rw0, rw0, rw0, rw0, rw0],
            [rw1, rw1, rw1, rw1],
            [rw1, rw1, rw1, rw1],
            [9999, 140],
            [9999],
            ["0.1rw", 9999],
            [9999]
        ];
        layouts[cname] = {name: cname, type: "Layout~Ly_base~xyArray.sys0", opts: opts};
        lyMaps["mainBody"] = cname;
        //===================================
        var lyInx = 0;
        //var opts = {};
        //opts.innerText = op.title;
        //blocks[cname] = {name: "basePanel", type: "Component~Cp_base~label.title", opts: opts};
        lyInx++;
        //==============================

        var actionPrg = function (iobj) {
            console.log(iobj);
        };

        var preText = "sub1";
        if (gr.appId === 1)
            var preText = "sub1";
        if (gr.appId === 2)
            var preText = "sub2";
        for (var i = 0; i < 18; i++) {
            var cname = lyMaps["mainBody"] + "~" + lyInx++;
            var opts = {};
            opts.setOptss = [];
            var inx = 0;
            if (i === inx++) {
                opts.title = "輸入功率";
                var setOpts = opts.setOpts = sopt.getOptsPara("lcdView");
                setOpts.value = "123.4";//
            }
            if (i === inx++) {
                opts.title = "順向輸出功率";
                var setOpts = opts.setOpts = sopt.getOptsPara("lcdView");
                setOpts.value = "123.4";//
            }
            if (i === inx++) {
                opts.title = "反向輸出功率";
                var setOpts = opts.setOpts = sopt.getOptsPara("lcdView");
                setOpts.value = "123.4";//
                setOpts.editTextColor = "#0f0";
            }
            if (i === inx++) {
                opts.title = "輸出電流";
                var setOpts = opts.setOpts = sopt.getOptsPara("lcdView");
                setOpts.value = "123.4";//
            }
            if (i === inx++) {
                opts.title = "系統狀態";
                var setOpts = opts.setOpts = sopt.getOptsPara("led");
                opts.setOptss.push(setOpts);
                blocks[cname] = {name: "positionPanel", type: "Model~MdaSetGroup~base.sys0", opts: opts};
                continue;
            }
            if (i === inx++) {
                opts.title = "脈波輸入狀態";
                var setOpts = opts.setOpts = sopt.getOptsPara("led");
                opts.setOptss.push(setOpts);
                blocks[cname] = {name: "positionPanel", type: "Model~MdaSetGroup~base.sys0", opts: opts};
                continue;
            }


            if (i === inx++) {
                opts.title = "環控狀態";
                var setOpts = opts.setOpts = sopt.getOptsPara("led");
                opts.setOptss.push(setOpts);
                blocks[cname] = {name: "positionPanel", type: "Model~MdaSetGroup~base.sys0", opts: opts};
                continue;
            }
            if (i === inx++) {
                opts.title = "固態放大器電源";
                var setOpts = opts.setOpts = sopt.getOptsPara("led");
                opts.setOptss.push(setOpts);
                blocks[cname] = {name: "positionPanel", type: "Model~MdaSetGroup~base.sys0", opts: opts};
                continue;
            }
            if (i === inx++) {
                opts.title = "固態放大器狀態";
                var setOpts = opts.setOpts = sopt.getOptsPara("led");
                opts.setOptss.push(setOpts);
                blocks[cname] = {name: "positionPanel", type: "Model~MdaSetGroup~base.sys0", opts: opts};
                continue;
            }
            if (i === inx++) {
                opts.title = "脈波輸出狀態";
                var setOpts = opts.setOpts = sopt.getOptsPara("led");
                opts.setOptss.push(setOpts);
                blocks[cname] = {name: "positionPanel", type: "Model~MdaSetGroup~base.sys0", opts: opts};
                continue;
            }
            if (gr.appId === 3)
                preText = "sub1";
            if (gr.appId === 4)
                preText = "sub2";
            if (i === inx++) {
                var setOpts = opts.setOpts = sopt.getOptsPara("buttonSelect");
                var para = sopt.getParaSetOpts({paraSetName: preText + "PulseSource", titleWidth: 0, titleFontSize: "0.5rh"});
                opts.title = "脈波來源";
                setOpts.fontSize = "0.5rh";
                setOpts.enum = para.enum;
                setOpts.value = para.value;
            }
            if (i === inx++) {
                var setOpts = opts.setOpts = sopt.getOptsPara("buttonSelect");
                var para = sopt.getParaSetOpts({paraSetName: preText + "Remote", titleWidth: 0, titleFontSize: "0.5rh"});
                opts.title = "遠端遙控";
                setOpts.enum = para.enum;
                setOpts.value = para.value;
            }
            if (i === inx++) {
                var setOpts = opts.setOpts = sopt.getOptsPara("buttonSelect");
                var para = sopt.getParaSetOpts({paraSetName: preText + "TxLoad", titleWidth: 0, titleFontSize: "0.5rh"});
                opts.title = "輸出裝置";
                setOpts.enum = para.enum;
                setOpts.enumColors = ["#eef", "#ffc"];
                setOpts.value = para.value;
            }
            if (i === inx++) {
                var setOpts = opts.setOpts = sopt.getOptsPara("buttonSelect");
                var para = sopt.getParaSetOpts({paraSetName: preText + "BatShort", titleWidth: 0, titleFontSize: "0.5rh"});
                opts.title = "戰備短路";
                setOpts.enum = para.enum;
                setOpts.enumColors = ["#eef", "#ffc"];
                setOpts.value = para.value;
            }
            if (i === inx++) {
                var setOpts = opts.setOpts = sopt.getOptsPara("buttonActs");
                opts.title = "固態放大器電源";
                setOpts.enum = ["關閉", "開啟"];
                setOpts.enumIds = ["close", "open"];
            }
            if (i === inx++) {
                var setOpts = opts.setOpts = sopt.getOptsPara("buttonActs");
                opts.title = "本機脈波輸出";
                setOpts.enum = ["關閉", "開啟"];
                setOpts.enumIds = ["close", "open"];
            }
            if (i === inx++) {
                var setOpts = opts.setOpts = sopt.getOptsPara("buttonActs");
                opts.title = "脈波輸出致能";
                setOpts.enum = ["關閉", "開啟"];
                setOpts.enumIds = ["close", "open"];
            }
            if (i === inx++) {
                var setOpts = opts.setOpts = sopt.getOptsPara("buttonActs");
                opts.title = "系統控制";
                setOpts.enum = ["緊急停止"];
                setOpts.enumIds = ["closeAll"];
            }
            setOpts.titleWidth = 0;
            setOpts.baseColor = "#002";
            setOpts.borderWidth = 0;
            opts.setOptss.push(setOpts);
            opts.actionFunc = actionPrg;
            blocks[cname] = {name: "positionPanel", type: "Model~MdaSetGroup~base.sys0", opts: opts};
        }
        //==============================================
        var cname = lyMaps["mainBody"] + "~" + lyInx++;
        var opts = {};
        blocks[cname] = {name: "editor", type: "Component~Cp_base~editor.sys0", opts: opts};
        //==============================================
        var cname = lyMaps["mainBody"] + "~" + lyInx++;

        var opts = {};
        opts.buttons = ["上一頁", "下一頁", "清除"];
        opts.buttonAmt = 6;
        opts.buttonIds = ["upPage", "downPage", "clear"];
        opts.layoutType = "collum";
        opts.margin = 4;
        opts.fontSize = "0.5rh";
        opts.xm = 4;
        opts.ym = 10;
        opts.baseColor = "#444";
        opts.actionFunc = function (iobj) {
            console.log(iobj);
            if (iobj.buttonId === "clear") {
                var kvObj = md.blockRefs["editor"];
                var editor = kvObj.objs["editor"];
                KvLib.clearEditorMaker(editor);
                editor.getSession().setValue("");
                return;
            }
        };
        blocks[cname] = {name: "headButtons", type: "Model~MdaButtons~base.sys0", opts: opts};
        //==============================================
        var cname = lyMaps["mainBody"] + "~" + lyInx++;
        mac.setFootBar(md, cname);
        return;
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

    chkWatch() {
        var self = this;
        var md = this.md;
        var op = md.opts;
        var st = md.stas;
        var location = st.location = {};
        var gpsDatas = location.gpsDatas = [];

        var duTrans = function (iobj) {
            var pos = [];
            var vv = iobj[0];
            vv += iobj[1] / 60;
            vv += iobj[2] / 3600;
            vv += iobj[3] / 360000;
            pos.push(vv);
            var vv = iobj[4];
            vv += iobj[5] / 60;
            vv += iobj[6] / 3600;
            vv += iobj[7] / 360000;
            pos.push(vv);
            pos.push(iobj[8]);
            return pos;
        };



        if (!gr.paraSet.locationFromSource) {
            var latitudeA = gr.paraSet.mastLatitude;
            var longitudeA = gr.paraSet.mastLongitude;
            var attitudeA = gr.paraSet.mastAttitude;
            gpsDatas.push([
                latitudeA[0], latitudeA[1], latitudeA[2], latitudeA[3],
                longitudeA[0], longitudeA[1], longitudeA[2], longitudeA[3],
                attitudeA[0], attitudeA[1], "---"
            ]);
            var latitudeA = gr.paraSet.sub1Latitude;
            var longitudeA = gr.paraSet.sub1Longitude;
            var attitudeA = gr.paraSet.sub1Attitude;
            gpsDatas.push([
                latitudeA[0], latitudeA[1], latitudeA[2], latitudeA[3],
                longitudeA[0], longitudeA[1], longitudeA[2], longitudeA[3],
                attitudeA[0], attitudeA[1], "---"
            ]);
            var latitudeA = gr.paraSet.sub2Latitude;
            var longitudeA = gr.paraSet.sub2Longitude;
            var attitudeA = gr.paraSet.sub2Attitude;
            gpsDatas.push([
                latitudeA[0], latitudeA[1], latitudeA[2], latitudeA[3],
                longitudeA[0], longitudeA[1], longitudeA[2], longitudeA[3],
                attitudeA[0], attitudeA[1], "---"
            ]);
        } else {
            gpsDatas.push(gr.syncData.location.mastGpsData);
            gpsDatas.push(gr.syncData.location.sub1GpsData);
            gpsDatas.push(gr.syncData.location.sub2GpsData);
        }
        st.mistRadarPos = duTrans(gpsDatas[0]);
        st.sub1RadarPos = duTrans(gpsDatas[1]);
        st.sub2RadarPos = duTrans(gpsDatas[2]);
        var radarScanDatas = location.radarScanDatas = [];
        radarScanDatas.push(gr.paraSet.radarStartAngle);
        radarScanDatas.push(gr.paraSet.radarEndAngle);
        radarScanDatas.push(gr.paraSet.radarScanRpm);
        radarScanDatas.push(gr.paraSet.radarFadeTime);

        var radarDirections = location.radarDirections = [];
        var posOut = self.calPos(st.mistRadarPos, st.sub1RadarPos);
        st.posOutA = posOut;
        var dir = (Math.pow(posOut[0] * posOut[0] + posOut[1] * posOut[1], 0.5)).toFixed(0);
        radarDirections.push(dir);
        var posOut = self.calPos(st.mistRadarPos, st.sub2RadarPos);
        st.posOutB = posOut;
        var dir = (Math.pow(posOut[0] * posOut[0] + posOut[1] * posOut[1], 0.5)).toFixed(0);
        radarDirections.push(dir);
        var posOut = self.calPos(st.sub1RadarPos, st.sub2RadarPos);
        var dir = (Math.pow(posOut[0] * posOut[0] + posOut[1] * posOut[1], 0.5)).toFixed(0);
        radarDirections.push(dir);

        var radarPositions = location.radarPositions = [];

        var pos0 = st.posOutA[0] | 0;
        var pos1 = st.posOutA[1] | 0;
        var pos2 = st.posOutB[0] | 0;
        var pos3 = st.posOutB[1] | 0;
        var radarScreen = md.blockRefs["radarScreen"];

        var scale = radarScreen.opts.roomInTbl[radarScreen.opts.roomInInx];
        var sRate = radarScreen.stas.sRadius * 2 / radarScreen.stas.containerHeight;
        //======================
        var yRate = 0;
        var xRate = 0;
        var hide_f = 0;
        if ((yRate * yRate + xRate * xRate) > 1)
            hide_f = 1;
        var rateY = (sRate * yRate * 0.5 + 0.5);
        var rateX = (sRate * xRate * 0.5 + 0.5);
        var nowString = gr.paraSet.mastAttitude[1] + "~" + rateY.toFixed(2) + "~" + rateX.toFixed(2) + "~" + hide_f;
        if (radarScreen.opts.messages.mastRadar.preString !== nowString) {
            radarScreen.opts.messages.mastRadar.preString = nowString;
            radarScreen.opts.symbleEdit_f = 1;
            radarScreen.opts.messages.mastRadar.angle = gr.paraSet.mastAttitude[1];
            radarScreen.opts.messages.mastRadar.yr = 1 - rateY;
            radarScreen.opts.messages.mastRadar.xr = rateX;
            radarScreen.opts.messages.mastRadar.hide_f = hide_f;
        }
        //======================
        var yRate = pos0 / scale;
        var xRate = pos1 / scale;
        var hide_f = 0;
        if ((yRate * yRate + xRate * xRate) > 1)
            hide_f = 1;
        var rateY = (sRate * yRate * 0.5 + 0.5);
        var rateX = (sRate * xRate * 0.5 + 0.5);
        var nowString = gr.paraSet.sub1Attitude[1] + "~" + rateY.toFixed(2) + "~" + rateX.toFixed(2) + "~" + hide_f;
        if (radarScreen.opts.messages.sub1Radar.preString !== nowString) {
            radarScreen.opts.messages.sub1Radar.preString = nowString;
            radarScreen.opts.symbleEdit_f = 1;
            radarScreen.opts.messages.sub1Radar.angle = gr.paraSet.sub1Attitude[1];
            radarScreen.opts.messages.sub1Radar.yr = 1 - rateY;
            radarScreen.opts.messages.sub1Radar.xr = rateX;
            radarScreen.opts.messages.sub1Radar.hide_f = hide_f;
        }
        //======================
        var yRate = pos2 / scale;
        var xRate = pos3 / scale;
        var hide_f = 0;
        if ((yRate * yRate + xRate * xRate) > 1)
            hide_f = 1;
        var rateY = (sRate * yRate * 0.5 + 0.5);
        var rateX = (sRate * xRate * 0.5 + 0.5);
        var nowString = gr.paraSet.sub2Attitude[1] + "~" + rateY.toFixed(2) + "~" + rateX.toFixed(2) + "~" + hide_f;
        if (radarScreen.opts.messages.sub2Radar.preString !== nowString) {
            radarScreen.opts.messages.sub2Radar.preString = nowString;
            radarScreen.opts.symbleEdit_f = 1;
            radarScreen.opts.messages.sub2Radar.angle = gr.paraSet.sub2Attitude[1];
            radarScreen.opts.messages.sub2Radar.yr = 1 - rateY;
            radarScreen.opts.messages.sub2Radar.xr = rateX;
            radarScreen.opts.messages.sub2Radar.hide_f = hide_f;
        }







    }

    calPos(gps0, gps1)
    {
        //////////////////////////////////////////////////////////
        //var gps0 = [24.0613733, 121.4508244, 0];
        //var gps1 = [25.0613733, 121.4508244, 0];
        var pos0 = [gps0[0] * Math.PI / 180, gps0[1] * Math.PI / 180, gps0[2]];
        var pos1 = [gps1[0] * Math.PI / 180, gps1[1] * Math.PI / 180, gps1[2]];
        var mid_lat = (pos0[0] + pos1[0]) / 2.0;
        var mid_h = (pos0[2] + pos1[2]) / 2.0;
        var a = 6378137.0;
        var b = 6356752.3142;
        var e2 = 1.0 - Math.pow((b / a), 2.0);
        var Rm = a * (1.0 - e2) / Math.pow((1.0 - e2 * Math.pow(Math.sin(mid_lat), 2.0)), 1.5);
        var Rn = a / Math.sqrt(1.0 - e2 * Math.pow(Math.sin(mid_lat), 2.0));
        var posOut = [];
        posOut.push(((pos1[0] - pos0[0]) * (Rm + mid_h)).toFixed(0));
        posOut.push(((pos1[1] - pos0[1]) * (Rn + mid_h) * Math.cos(mid_lat)).toFixed(0));
        posOut.push((-1 * (pos0[2] - pos1[2]).toFixed(0)));
        return posOut;
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
            console.log(iobj);
            iobj.act = "esc";
            KvLib.exe(op.actionFunc, iobj);
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
        var sop = sopt.getButtonRadio({enum: ["手動輸入", "GPS天線"]});
        sop.value = gr.paraSet.locationFromSource;
        setOptss.push(sop);
        opts.actionFunc = function (iobj) {
            console.log(iobj);
            if (iobj.act === "checkChanged") {
                var setLine = iobj.sender.blockRefs["mdaSetLine#0"];
                var value = setLine.opts.setOpts.value;
                gr.paraSet.locationFromSource = value;
                var fileName = "paraSet";
                var content = JSON.stringify(gr.paraSet);
                gr.serverCallBack = function (iobj) {
                    console.log(iobj);
                    md.reCreate();
                };
                sv.saveStringToFile("responseDialogError", "exeCallBackFunc", fileName, content);
            }

        };
        blocks[cname] = {name: "positionPanel", type: "Model~MdaSetGroup~base.sys0", opts: opts};
        //===============================================



        var optsGroupFunc = function (opts) {
            opts.fromGps_f = gr.paraSet.locationFromSource;
            var gpsDatas = "self.fatherMd.fatherMd.fatherMd.stas.location.gpsDatas[" + opts.deviceInx + "]";
            opts.values = [
                0, 0, 0, 0,
                0, 0, 0, 0,
                0, 0,
                ""
            ];
            opts.setOptss = [];
            var setOptss = opts.setOptss;
            opts.yArr = [40, 40, 40, 40, 9999];
            opts.xyArr = [
                [180, 90, 90, 9999],
                [180, 90, 90, 9999],
                ["0.40rw", "0.40rw", 9999],
                [9999],
                [9999]
            ];
            var readOnly = 0;
            var editColor = "#fff";
            if (opts.fromGps_f) {
                readOnly = 1;
                editColor = "#cfc";
            }
            var values = opts.values;
            //
            var setOpts = {title: " 緯度:", titleWidth: 70, "unit": "度", value: values[0], max: 27, min: 21, readOnly_f: readOnly, editBaseColor: editColor};
            var watchDatas = setOpts.watchDatas = [];
            watchDatas.push(["directName", gpsDatas + "[0]", "editValue", 1]);
            setOptss.push(sopt.getEditUnit(setOpts));
            //
            var setOpts = {title: " 緯度:分", "unit": "分", value: values[1], max: 59, readOnly_f: readOnly, editBaseColor: editColor};
            var watchDatas = setOpts.watchDatas = [];
            watchDatas.push(["directName", gpsDatas + "[1]", "editValue", 1]);
            setOptss.push(sopt.getEditUnit(setOpts));
            //
            var setOpts = {title: " 緯度:秒", "unit": "秒", value: values[2], max: 59, readOnly_f: readOnly, editBaseColor: editColor};
            var watchDatas = setOpts.watchDatas = [];
            watchDatas.push(["directName", gpsDatas + "[2]", "editValue", 1]);
            setOptss.push(sopt.getEditUnit(setOpts));
            //
            var setOpts = {title: " 緯度:百分秒", "unit": "百分秒", unitWidth: 80, value: values[3], max: 99, readOnly_f: readOnly, editBaseColor: editColor};
            var watchDatas = setOpts.watchDatas = [];
            watchDatas.push(["directName", gpsDatas + "[3]", "editValue", 1]);
            setOptss.push(sopt.getEditUnit(setOpts));
            //
            var setOpts = {title: " 經度:", titleWidth: 70, "unit": "度", value: values[4], max: 123, min: 118, readOnly_f: readOnly, editBaseColor: editColor};
            var watchDatas = setOpts.watchDatas = [];
            watchDatas.push(["directName", gpsDatas + "[4]", "editValue", 1]);
            setOptss.push(sopt.getEditUnit(setOpts));
            //
            var setOpts = {title: " 經度:分", "unit": "分", value: values[5], max: 59, readOnly_f: readOnly, editBaseColor: editColor};
            var watchDatas = setOpts.watchDatas = [];
            watchDatas.push(["directName", gpsDatas + "[5]", "editValue", 1]);
            setOptss.push(sopt.getEditUnit(setOpts));
            //
            var setOpts = {title: " 經度:秒", "unit": "秒", value: values[6], max: 59, readOnly_f: readOnly, editBaseColor: editColor};
            var watchDatas = setOpts.watchDatas = [];
            watchDatas.push(["directName", gpsDatas + "[6]", "editValue", 1]);
            setOptss.push(sopt.getEditUnit(setOpts));
            //
            var setOpts = {title: " 經度:百分秒", "unit": "百分秒", unitWidth: 80, value: values[7], max: 99, readOnly_f: readOnly, editBaseColor: editColor};
            var watchDatas = setOpts.watchDatas = [];
            watchDatas.push(["directName", gpsDatas + "[7]", "editValue", 1]);
            setOptss.push(sopt.getEditUnit(setOpts));
            //
            var setOpts = {title: " 高度:", titleWidth: 70, "unit": "公尺", unitWidth: 60, value: values[8], readOnly_f: readOnly, editBaseColor: editColor};
            var watchDatas = setOpts.watchDatas = [];
            watchDatas.push(["directName", gpsDatas + "[8]", "editValue", 1]);
            setOptss.push(sopt.getEditUnit(setOpts));
            //
            var setOpts = {title: " 方位:", titleWidth: 70, "unit": "度", value: values[9], max: 360, readOnly_f: readOnly, editBaseColor: editColor};
            var watchDatas = setOpts.watchDatas = [];
            watchDatas.push(["directName", gpsDatas + "[9]", "editValue", 1]);
            setOptss.push(sopt.getEditUnit(setOpts));
            //
            if (opts.fromGps_f)
                setOptss.push(sopt.getButtonActs({titleWidth: 0, enum: ['<i class="gf">&#xe161</i>'], enumId: ["save"], fontSize: 30}));
            else
                setOptss.push(sopt.getButtonActs({titleWidth: 0, enum: ['<i class="gf">&#xf028</i>'], enumId: ["pad"], fontSize: 30}));
            //
            var setOpts = {title: " 狀態:", titleWidth: 70, value: values[10]};
            var watchDatas = setOpts.watchDatas = [];
            watchDatas.push(["directName", gpsDatas + "[10]", "editValue", 1]);
            setOptss.push(sopt.getView(setOpts));
            //
        };
        var actionPrg = function (iobj) {
            console.log(iobj);
            var sender = iobj.sender;
            if (iobj.act === "actButtonClick") {
                if (iobj.buttonId === "pad") {
                    var st = iobj.sender.stas;
                    if (st.blurObjName) {
                        console.log(st.blurObjName);
                        var setLine = iobj.sender.blockRefs[st.blurObjName];
                        if (setLine.opts.setOpts.readOnly_f)
                            return;
                        var setInx = KvLib.toInt(st.blurObjName.split("#")[1], null);
                        if (setInx === null)
                            return;
                        var opts = {};
                        opts.setOpts = {};
                        KvLib.deepCoverObject(opts.setOpts, setLine.opts.setOpts);
                        var inputTextObj = setLine.blockRefs["inputText"];
                        opts.setOpts.value = inputTextObj.elems["inputText"].value;
                        opts.setOpts.titleWidth = 0;
                        opts.setOpts.unitWidth = 0;
                        opts.title = opts.setOpts.title;
                        opts.actionFunc = function (iobj) {
                            console.log(iobj);
                            if (iobj.act !== "padEnter")
                                return;
                            if (sender.name === "ladarLaunchPanel") {
                                if (setInx === 0)
                                    var name0 = "radarStartAngle";
                                if (setInx === 1)
                                    var name0 = "radarEndAngle";
                                if (setInx === 2)
                                    var name0 = "radarScanRpm";
                                if (setInx === 3)
                                    var name0 = "radarFadeTime";
                                gr.paraSet[name0] = iobj.inputText;
                            } else {
                                if (sender.name === "ladarGpsPanel")
                                    var name0 = "mast";
                                if (sender.name === "targetGpsPanel1")
                                    var name0 = "sub1";
                                if (sender.name === "targetGpsPanel2")
                                    var name0 = "sub2";
                                if (setInx <= 3) {
                                    name0 += "Latitude";
                                    var index = setInx;
                                } else if (setInx >= 8) {
                                    name0 += "Attitude";
                                    var index = setInx - 8;
                                } else {
                                    name0 += "Longitude";
                                    var index = setInx - 4;
                                }
                                gr.paraSet[name0][index] = KvLib.toInt(iobj.inputText, 0);
                            }
                            var fileName = "paraSet";
                            var content = JSON.stringify(gr.paraSet);
                            sv.saveStringToFile("responseDialogError", "null", fileName, content);
                        };
                        box.intPadBox(opts);
                    }
                    return;
                }
                if (iobj.buttonId === "save") {
                    var opts = {};
                    opts.kvTexts = ["儲存設定值 ?"];
                    opts.actionFunc = function (iobj) {
                        console.log(iobj);
                        var values = [];
                        if (iobj.kvObj.name === "ok") {
                            for (var i = 0; i < 10; i++) {
                                var key = "mdaSetLine#" + i;
                                var setLineObj = sender.blockRefs[key];
                                var inputText = setLineObj.blockRefs["inputText"];
                                var value = inputText.elems["inputText"].value;
                                values.push(value);
                            }
                            var latitude = values[0] + " " + values[1] + " " + values[2] + " " + values[3];
                            var longitude = values[4] + " " + values[5] + " " + values[6] + " " + values[7];
                            var attitude = values[8] + " " + values[9];
                            if (sender.name === "ladarGpsPanel") {
                                gr.paraSet.mastLatitude = latitude;
                                gr.paraSet.mastLongitude = longitude;
                                gr.paraSet.mastAttitude = attitude;
                            }
                            if (sender.name === "targetGpsPanel1") {
                                gr.paraSet.sub1Latitude = latitude;
                                gr.paraSet.sub1Longitude = longitude;
                                gr.paraSet.sub1Attitude = attitude;
                            }
                            if (sender.name === "targetGpsPanel2") {
                                gr.paraSet.sub2Latitude = latitude;
                                gr.paraSet.sub2Longitude = longitude;
                                gr.paraSet.sub2Attitude = attitude;
                            }

                            var fileName = "paraSet";
                            var content = JSON.stringify(gr.paraSet);
                            sv.saveStringToFile("responseDialogError", "null", fileName, content);
                        }
                    };
                    box.checkBox(opts);
                }
                if (iobj.buttonId === "map") {

                }
                if (iobj.buttonId === "roomIn") {
                    var locationTarget = iobj.sender.fatherMd;
                    var radarScreen = locationTarget.blockRefs["radarScreen"];
                    if (radarScreen.opts.roomInInx > 0)
                        radarScreen.opts.roomInInx--;
                    radarScreen.opts.messages.rangeText.text = "Range: " + radarScreen.opts.roomInTbl[radarScreen.opts.roomInInx];
                    radarScreen.opts.symbleEdit_f = 1;
                    return;
                }
                if (iobj.buttonId === "roomOut") {
                    var locationTarget = iobj.sender.fatherMd;
                    var radarScreen = locationTarget.blockRefs["radarScreen"];
                    if (radarScreen.opts.roomInInx < (radarScreen.opts.roomInTbl.length - 1))
                        radarScreen.opts.roomInInx++;
                    radarScreen.opts.messages.rangeText.text = "Range: " + radarScreen.opts.roomInTbl[radarScreen.opts.roomInInx];
                    radarScreen.opts.symbleEdit_f = 1;
                    return;
                }
                if (iobj.buttonId === "radarStart") {
                    var locationTarget = iobj.sender.fatherMd;
                    var radarScreen = locationTarget.blockRefs["radarScreen"];
                    radarScreen.opts.run_f = 1;
                    radarScreen.stas.scanAngle = 0;
                    return;
                }
                if (iobj.buttonId === "radarStop") {
                    var locationTarget = iobj.sender.fatherMd;
                    var radarScreen = locationTarget.blockRefs["radarScreen"];
                    radarScreen.opts.run_f = 0;
                    return;
                }
            }
        };
        var cname = lyMaps["leftBody"] + "~" + 1;
        var opts = {};
        opts.title = "主控雷達";
        opts.titleIconColor = "#f00";
        opts.titleIcon = "➤";
        opts.deviceInx = 0;
        opts.actionFunc = actionPrg;
        optsGroupFunc(opts);
        blocks[cname] = {name: "ladarGpsPanel", type: "Model~MdaSetGroup~base.sys0", opts: opts};
        //=========================
        var cname = lyMaps["leftBody"] + "~" + 2;
        var opts = {};
        opts.title = "副控雷達1";
        opts.titleIconColor = "#0f0";
        opts.titleIcon = "➤";
        opts.deviceInx = 1;
        opts.actionFunc = actionPrg;
        optsGroupFunc(opts);
        blocks[cname] = {name: "targetGpsPanel1", type: "Model~MdaSetGroup~base.sys0", opts: opts};
        //=========================
        var cname = lyMaps["leftBody"] + "~" + 3;
        var opts = {};
        opts.title = "副控雷達2";
        opts.titleIconColor = "#00f";
        opts.titleIcon = "➤";
        opts.deviceInx = 2;
        opts.actionFunc = actionPrg;
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

        var radarDirections = "self.fatherMd.fatherMd.fatherMd.stas.location.radarDirections";
        var setOpts = {title: "雷達距副控1:", titleWidth: 200, unit: "公尺", unitWidth: 100};
        var watchDatas = setOpts.watchDatas = [];
        watchDatas.push(["directName", radarDirections + "[0]", "editValue", 1]);
        setOptss.push(sopt.getView(setOpts));

        var setOpts = {title: "雷達距副控2:", titleWidth: 200, unit: "公尺", unitWidth: 100};
        var watchDatas = setOpts.watchDatas = [];
        watchDatas.push(["directName", radarDirections + "[1]", "editValue", 1]);
        setOptss.push(sopt.getView(setOpts));

        var setOpts = {title: "副控1距副控2:", titleWidth: 200, unit: "公尺", unitWidth: 100};
        var watchDatas = setOpts.watchDatas = [];
        watchDatas.push(["directName", radarDirections + "[2]", "editValue", 1]);
        setOptss.push(sopt.getView(setOpts));



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
            ["0.4rw", "0.4rw", 9999],
            [9999],
            [9999]
        ];
        var radarScanDatas = "self.fatherMd.fatherMd.fatherMd.stas.location.radarScanDatas";
        //
        var setOpts = sopt.getEditUnit({paraSetName: "radarStartAngle", titleWidth: 200, unitWidth: 40});
        var watchDatas = setOpts.watchDatas = [];
        watchDatas.push(["directName", radarScanDatas + "[0]", "editValue", 1]);
        setOptss.push(setOpts);
        //
        var setOpts = sopt.getEditUnit({paraSetName: "radarEndAngle", titleWidth: 200, unitWidth: 40});
        var watchDatas = setOpts.watchDatas = [];
        watchDatas.push(["directName", radarScanDatas + "[1]", "editValue", 1]);
        setOptss.push(setOpts);
        //
        var setOpts = sopt.getEditUnit({paraSetName: "radarScanRpm", titleWidth: 200, unitWidth: 40});
        var watchDatas = setOpts.watchDatas = [];
        watchDatas.push(["directName", radarScanDatas + "[2]", "editValue", 1]);
        setOptss.push(setOpts);
        //
        var setOpts = sopt.getEditUnit({paraSetName: "radarFadeTime", titleWidth: 200, unitWidth: 0});
        var watchDatas = setOpts.watchDatas = [];
        watchDatas.push(["directName", radarScanDatas + "[3]", "editValue", 1]);
        setOptss.push(setOpts);
        //


        setOptss.push(sopt.getButtonActs({titleWidth: 0, enum: ['<i class="gf">&#xf028</i>'], enumId: ["pad"], fontSize: 25}));
        setOptss.push(sopt.getButtonActs({titleWidth: 0, enum: ["地圖", '放大', '縮小', "啟動", "停止"], enumId: ["map", "roomIn", "roomOut", "radarStart", "radarStop"], fontSize: 25}));
        opts.editIndex = 3;
        /*
         opts.actionFunc = function (iobj) {
         console.log(iobj);
         if(iobj.act=== "actButtonClick"){
         var inxStr=iobj.kvObj.name.split('#')[1];
         if(inxStr==="3"){
         if(iobj.buttonInx===0){
         
         
         }
         
         
         }
         if(inxStr==="4"){
         
         }
         
         }
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
         * 
         */
        opts.actionFunc = actionPrg;
        blocks[cname] = {name: "ladarLaunchPanel", type: "Model~MdaSetGroup~base.sys0", opts: opts};
        //=========================


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
        opts.speedAmt = 1;
        opts.speedAngleDiv = 3600;
        opts.radarColor = 0x3000ff00;
        opts.roomInInx = 0;
        opts.roomInTbl = [500, 600, 800, 1000, 1200, 1600, 2000, 2400, 3000, 4000, 5000, 6000];
        //===============
        opts.messages = {};
        var mesObj = {};
        mesObj.xr = 0.05;
        mesObj.yr = 0.01;
        mesObj.text = "Range: " + opts.roomInTbl[opts.roomInInx];
        mesObj.color = "#0f0";
        mesObj.offY = 10;
        mesObj.fontSize = 12;
        mesObj.fontFamily = "monospace";
        mesObj.hide_f = 0;
        opts.messages.rangeText = mesObj;
        //===============
        var mesObj = {};
        mesObj.xr = 0.5;
        mesObj.yr = 0.5;
        mesObj.text = "➤";
        mesObj.color = "#f00";
        mesObj.offY = 11;
        mesObj.angle = 0;
        mesObj.fontSize = 32;
        mesObj.fontFamily = "monospace";
        mesObj.hide_f = 0;
        mesObj.preString = "";
        opts.messages.mastRadar = mesObj;
        //===============
        var mesObj = {};
        mesObj.xr = 0.65;
        mesObj.yr = 0.35;
        mesObj.text = "➤";
        mesObj.color = "#0f0";
        mesObj.offY = 11;
        mesObj.angle = 0;
        mesObj.fontSize = 32;
        mesObj.fontFamily = "monospace";
        mesObj.hide_f = 0;
        mesObj.preString = "";
        opts.messages.sub1Radar = mesObj;
        //===============
        var mesObj = {};
        mesObj.xr = 0.7;
        mesObj.yr = 0.8;
        mesObj.text = "➤";
        mesObj.color = "#00f";
        mesObj.offY = 11;
        mesObj.angle = 0;
        mesObj.fontSize = 32;
        mesObj.fontFamily = "monospace";
        mesObj.hide_f = 0;
        mesObj.preString = "";
        opts.messages.sub2Radar = mesObj;
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
        if (++st.fadeCnt < gr.paraSet.radarFadeTime) {
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
        var speed = gr.paraSet.radarScanRpm * op.speedAngleDiv / 3600;
        var speedAmt = speed | 0;
        if (!st.scrap)
            st.scrap = 0;
        st.scrap += speed - speedAmt;
        if (st.scrap >= 1) {
            st.scrap -= 1;
            speedAmt += 1;
        }
        for (var i = 0; i < speedAmt; i++) {
            st.scanAngle += 1;
            if (st.scanAngle >= op.speedAngleDiv) {
                st.scanAngle = 0;
            }
            var angle = (Math.PI * 2 * st.scanAngle / (op.speedAngleDiv)) - (Math.PI / 2);
            var startAngle = (Math.PI * 2 * gr.paraSet.radarStartAngle / 360) - (Math.PI / 2);
            var endAngle = (Math.PI * 2 * gr.paraSet.radarEndAngle / 360) - (Math.PI / 2);
            if (angle < startAngle)
                continue;
            if (angle > endAngle)
                continue;
            var sin = Math.sin(angle);
            var cos = Math.cos(angle);
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
        var centerX = (st.containerWidth / 2) | 0;
        var centerY = (st.containerHeight / 2) | 0;
        var ctx = st.ctxRadar;
        ctx.strokeStyle = "#fff";
        ctx.lineWidth = 1;
        if ((Math.PI * 1.5) === angle)
            return;
        ctx.beginPath();
        ctx.arc(centerX, centerY, st.sRadius - 1, angle - 0.02, angle);
        ctx.stroke();
    }

    drawMessages() {
        var st = this.md.stas;
        var op = this.md.opts;
        var ctx = st.ctxSymble;
        var keys = Object.keys(op.messages);
        for (var i = 0; i < keys.length; i++) {
            var mesObj = op.messages[keys[i]];
            if (mesObj.hide_f)
                continue;
            ctx.save();
            ctx.fillStyle = mesObj.color;
            ctx.font = mesObj.fontSize + "px " + mesObj.fontFamily;
            var xx = (mesObj.xr * st.containerWidth) | 0;
            var yy = (mesObj.yr * st.containerHeight) | 0;
            var text = mesObj.text;
            //
            var metrics = ctx.measureText(text);
            ctx.translate(xx, yy);
            ctx.rotate(2 * Math.PI * (mesObj.angle - 90) / 360);
            ctx.fillText(text, -(metrics.width) / 2, mesObj.offY);
            //
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
        ctx.strokeStyle = "#f00";
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
        opts.baseColor = "#aaa";
        opts.slotNames = [
            "ＩＰＣ控制模組",
            "ＦＰＧＡ控制模組",
            "ＩＯ控制模組",
            "邏輯分析模組",
            "語音通信模組 ",
            "ＲＦ傳輸模組 Ａ",
            "ＲＦ傳輸模組 Ｂ",
            "光纖傳輸模組 １",
            "光纖傳輸模組 ２",
            "光纖傳輸模組 ３",
            "光纖傳輸模組 ４",
            "光纖傳輸模組 ５"
        ];
        return opts;
    }
    chkWatch() {
        var self = this;
        var md = self.md;
        var op = md.opts;
        var st = md.stas;
        var ids = gr.syncData.slotIds;
        st.slotNames = [];
        for (var i = 0; i < 12; i++) {
            var str = "";
            if (ids[i] > 0) {
                str = op.slotNames[ids[i] - 1];
            }
            st.slotNames.push(str);
        }

        var status = gr.syncData.slotStatus;
        st.slotLeds = [];
        st.slotLedHides = [];
        for (var i = 0; i < 12; i++) {
            var inx = 0;
            var hide_f = 0;
            if (st.slotNames[i] === "")
                hide_f = 1;
            if (status[i] === 1)
                inx = 1;
            if (status[i] === 2)
                inx = 2;
            if (status[i] === 3)
                inx = 3;
            if (status[i] === 4)
                inx = 4;
            st.slotLeds.push(inx);
            st.slotLedHides.push(hide_f);
        }



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
            console.log(iobj);
            iobj.act = "esc";
            KvLib.exe(op.actionFunc, iobj);
        };
        blocks[cname] = {name: "escButton", type: "Component~Cp_base~button.sys0", opts: opts};
        //==============================
        var cname = lyMaps["mainBody"] + "~" + 1;
        var opts = {};
        opts.xc = 12;
        opts.margin = 10;
        opts.iw = 800;
        layouts[cname] = {name: cname, type: "Layout~Ly_base~array.sys0", opts: opts};
        lyMaps["slotBody"] = cname;
        //===
        for (var i = 0; i < 12; i++) {
            var cname = lyMaps["slotBody"] + "~" + i;
            var opts = {};
            opts.innerText = "";
            opts.backgroundImageUrls = ["systemResource/slot.bmp"];
            opts.writingMode = "vertical-lr";
            opts.fontSize = "0.4rw";
            opts.textAlign = "left";
            opts.tpd = 20;
            opts.fontSize = 30;
            opts.textShadow = "1px 1px 1px #aaa";
            opts.zIndex = "0";
            var watchReg = "self.fatherMd.stas.slotNames[" + i + "]";
            md.setInputWatch(opts, "directName", watchReg, "innerText", 1);
            blocks[cname + "#0"] = {name: "slotPanel#" + i, type: "Component~Cp_base~images.sys0", opts: opts};
            var opts = {};
            opts.backgroundInx = 1;
            opts.zIndex = "1";
            opts.iw = 50;
            opts.ih = 50;
            opts.hAlign = "bottom";
            opts.bm = 20;
            var watchReg = "self.fatherMd.stas.slotLeds[" + i + "]";
            md.setInputWatch(opts, "directName", watchReg, "backgroundInx", 1);
            var watchReg = "self.fatherMd.stas.slotLedHides[" + i + "]";
            md.setInputWatch(opts, "directName", watchReg, "hidden_f", 1);
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
        opts.buttonIds = ["testStart", "testStop", "clear", "setting", "location", "selfTest", "sync", "setting"];
        opts.layoutType = "collum";
        opts.margin = 4;
        opts.fontSize = "0.5rh";
        opts.xm = 4;
        opts.ym = 10;
        opts.baseColor = "#444";

        opts.actionFunc = function (iobj) {
            console.log(iobj);
            if (iobj.buttonId === "clear") {
                var kvObj = md.blockRefs["editor"];
                var editor = kvObj.objs["editor"];
                KvLib.clearEditorMaker(editor);
                editor.getSession().setValue("");
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

    chkWatch() {
        var self = this;
        var md = self.md;
        var op = md.opts;
        var st = md.stas;
        //0 光纖連線狀態 0:未連線, 1:未連線 
        //1 RF連線狀態 0:未連線, 1:未連線 
        //2 1588修正時間  
        //3 封包發送數  
        //4 正確率
        //5 主控RF接收能量
        //6 副控RF接收能量
        for (var i = 0; i < 2; i++) {
            if (i === 0) {
                var datas = gr.syncData.sub1CommDatas;
                var commDatas = st.sub1CommDatas = ["", "", "", "", "", ""];
                var commColors = st.sub1CommColors = ["#eef", "#eef", "#eef", "#eef", "#eef", "#eef"];
            }
            if (i === 1) {
                var datas = gr.syncData.sub2CommDatas;
                var commDatas = st.sub2CommDatas = ["", "", "", "", "", ""];
                var commColors = st.sub2CommColors = ["#eef", "#eef", "#eef", "#eef", "#eef", "#eef"];
            }

            if (datas[0] === 0) {
                commDatas[0] = "未連線";
                commColors[0] = "#eef";
            } else {
                commDatas[0] = "已連線";
                commColors[0] = "#cfc";
            }
            if (datas[1] === 0) {
                commDatas[1] = "未連線";
                commColors[1] = "#eef";
            } else {
                commDatas[1] = "已連線";
                commColors[1] = "#cfc";
            }
            commDatas[2] = "" + datas[2];
            commDatas[3] = "" + datas[3];
            commDatas[4] = "" + datas[4];
            commDatas[5] = "" + datas[5];
            commDatas[6] = "" + datas[6];

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
        var excActionPrg = function (iobj) {
            console.log(iobj);
            iobj.act = "esc";
            KvLib.exe(op.actionFunc, iobj);
        };
        mac.setHeadTitleBar(md, cname, "同步設定", excActionPrg);


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
            ["0.5rw", 9999],
            ["0.5rw", 9999]
        ];
        var setOpts = sopt.getParaSetOpts({paraSetName: "commTestPacks", titleWidth: 200, titleFontSize: "0.5rh"});
        var watchDatas = setOpts.watchDatas = [];
        watchDatas.push(["directName", "gr.paraSet." + "commTestPacks", "editValue", 1]);
        setOptss.push(setOpts);
        var setOpts = sopt.getParaSetOpts({paraSetName: "vgTimeDelay", titleWidth: 200, titleFontSize: "0.5rh"});
        setOpts.actButtons = [];
        setOpts.readOnly_f = 1;
        var watchDatas = setOpts.watchDatas = [];
        watchDatas.push(["directName", "gr.paraSet." + "vgTimeDelay", "editValue", 1]);
        setOptss.push(setOpts);
        opts.actionFunc = function (iobj) {
            console.log(iobj);
            if (iobj.act === "itemMouseClick") {
                var setLine = iobj.setOptsObj;
                var value = setLine.opts.setOpts.value;
                gr.paraSet[setLine.opts.setOpts.paraSetName] = value;
                var fileName = "paraSet";
                var content = JSON.stringify(gr.paraSet);
                sv.saveStringToFile("responseDialogError", null, fileName, content);

            }

        };
        blocks[cname] = {name: "systemPanel", type: "Model~MdaSetGroup~base.sys0", opts: opts};

        var targFunc = function (opts) {
            opts.actionFunc = function (iobj) {
                console.log(iobj);
                if (iobj.act === "checkChanged" || iobj.act === "pressEnter") {
                    var setLine = iobj.kvObj.fatherMd;
                    var value = setLine.opts.setOpts.value;
                    gr.paraSet[setLine.opts.setOpts.paraSetName] = value;
                    var fileName = "paraSet";
                    var content = JSON.stringify(gr.paraSet);
                    sv.saveStringToFile("responseDialogError", null, fileName, content);
                }
            };
            opts.setOptss = [];
            var setOptss = opts.setOptss;
            opts.yArr = ["0.1rh", "0.1rh", "0.1rh", "0.1rh", "0.1rh", "0.1rh", "0.1rh", "0.1rh", "0.1rh", "0.1rh"];
            opts.ym = 10;
            opts.xm = 8;
            if (opts.deviceInx === 0)
                var preText = "sub1";
            if (opts.deviceInx === 1)
                var preText = "sub2";
            opts.xyArr = [
                [9999],
                [9999],
                ["0.5rw", 9999],
                [9999],
                [9999],
                ["0.5rw", 9999],
                [9999],
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

            if (opts.deviceInx === 0) {
                var watchReg0 = "self.fatherMd.fatherMd.fatherMd.stas.sub1CommDatas";
                var watchReg1 = "self.fatherMd.fatherMd.fatherMd.stas.sub1CommColors";
            }
            if (opts.deviceInx === 1) {
                var watchReg0 = "self.fatherMd.fatherMd.fatherMd.stas.sub2CommDatas";
                var watchReg1 = "self.fatherMd.fatherMd.fatherMd.stas.sub2CommColors";
            }
            //===============
            var setOpts = sopt.getParaSetOpts({paraSetName: preText + "ChCommSet", titleWidth: 200, titleFontSize: "0.4rh"});
            var watchDatas = setOpts.watchDatas = [];
            watchDatas.push(["directName", gr.paraSet[preText + "ChCommSet"], "editValue", 1]);
            setOptss.push(setOpts);
            //===============
            if (opts.deviceInx === 0) {
                var setOpts = sopt.getParaSetOpts({paraSetName: "mastToSub1CommType", titleWidth: 200, titleFontSize: "0.4rh"});
                var watchDatas = setOpts.watchDatas = [];
                watchDatas.push(["directName", "gr.paraSet." + "mastToSub1CommType", "editValue", 1]);
            } else {
                var setOpts = sopt.getParaSetOpts({paraSetName: "mastToSub2CommType", titleWidth: 200, titleFontSize: "0.4rh"});
                var watchDatas = setOpts.watchDatas = [];
                watchDatas.push(["directName", "gr.paraSet." + "mastToSub2CommType", "editValue", 1]);
            }
            setOptss.push(setOpts);
            //===============
            var setOpts = sopt.getView({title: "光纖連線狀態:", titleWidth: 140, value: ""});
            var watchDatas = setOpts.watchDatas = [];
            watchDatas.push(["directName", watchReg0 + "[0]", "editValue", 1]);
            watchDatas.push(["directName", watchReg1 + "[0]", "editBaseColor", 1]);
            setOptss.push(setOpts);
            //===============
            var setOpts = sopt.getView({title: "RF連線狀態:", titleWidth: 140, value: ""});
            var watchDatas = setOpts.watchDatas = [];
            watchDatas.push(["directName", watchReg0 + "[1]", "editValue", 1]);
            watchDatas.push(["directName", watchReg1 + "[1]", "editBaseColor", 1]);
            setOptss.push(setOpts);
            //===============
            var setOpts = sopt.getParaSetOpts({paraSetName: preText + "ChSyncType", titleWidth: 200, titleFontSize: "0.4rh"});
            var watchDatas = setOpts.watchDatas = [];
            watchDatas.push(["directName", "gr.paraSet." + preText + "ChSyncType", "editValue", 1]);
            setOptss.push(setOpts);
            //=======

            var setOpts = sopt.getParaSetOpts({paraSetName: preText + "ChTimeFineTune", titleWidth: 250, titleFontSize: "0.4rh"});
            setOpts.actButtons = ["pad"];
            var watchDatas = setOpts.watchDatas = [];
            watchDatas.push(["directName", "gr.paraSet." + preText + "ChTimeFineTune", "editValue", 1]);
            setOptss.push(setOpts);
            //================


            var setOpts = sopt.getParaSetOpts({paraSetName: preText + "ChFiberDelay", titleWidth: 200, titleFontSize: "0.4rh"});
            setOpts.actButtons = ["pad"];
            setOpts.unitWidth = 0;
            var watchDatas = setOpts.watchDatas = [];
            watchDatas.push(["directName", "gr.paraSet." + preText + "ChFiberDelay", "editValue", 1]);
            setOptss.push(setOpts);
            //========
            var setOpts = sopt.getParaSetOpts({paraSetName: preText + "ChRfDelay", titleWidth: 200, titleFontSize: "0.4rh"});
            setOpts.actButtons = ["pad"];
            setOpts.unitWidth = 0;
            var watchDatas = setOpts.watchDatas = [];
            watchDatas.push(["directName", "gr.paraSet." + preText + "ChRfDelay", "editValue", 1]);
            setOptss.push(setOpts);
            //================





            var setOpts = sopt.getView({title: "1588修正時間:", titleWidth: 250, "unitWidth": 50, unit: "5us", value: ""});
            var watchDatas = setOpts.watchDatas = [];
            watchDatas.push(["directName", watchReg0 + "[2]", "editValue", 1]);
            setOptss.push(setOpts);
            //=================


            var setOpts = sopt.getParaSetOpts({paraSetName: preText + "ChRfTxCh", titleWidth: 180, titleFontSize: "0.4rh"});
            setOpts.actButtons = ["pad"];
            var watchDatas = setOpts.watchDatas = [];
            watchDatas.push(["directName", "gr.paraSet." + preText + "ChRfTxCh", "editValue", 1]);
            setOptss.push(setOpts);

            var setOpts = sopt.getParaSetOpts({paraSetName: preText + "ChRfRxCh", titleWidth: 180, titleFontSize: "0.4rh"});
            setOpts.actButtons = ["pad"];
            var watchDatas = setOpts.watchDatas = [];
            watchDatas.push(["directName", "gr.paraSet." + preText + "ChRfRxCh", "editValue", 1]);
            setOptss.push(setOpts);

            //================
            var setOpts = sopt.getView({title: "封包發送數:", titleWidth: 160, value: ""});
            var watchDatas = setOpts.watchDatas = [];
            watchDatas.push(["directName", watchReg0 + "[3]", "editValue", 1]);
            setOptss.push(setOpts);
            //=================
            var setOpts = sopt.getView({title: "封包正確率:", titleWidth: 160, value: ""});
            var watchDatas = setOpts.watchDatas = [];
            watchDatas.push(["directName", watchReg0 + "[4]", "editValue", 1]);
            setOptss.push(setOpts);
            //=================


            var setOpts = sopt.getView({title: "主控RF接收能量:", titleWidth: 180, "unitWidth": 50, unit: "DB", value: ""});
            var watchDatas = setOpts.watchDatas = [];
            watchDatas.push(["directName", watchReg0 + "[5]", "editValue", 1]);
            setOptss.push(setOpts);
            //=================
            var setOpts = sopt.getView({title: "副控RF接收能量:", titleWidth: 180, "unitWidth": 50, unit: "DB", value: ""});
            var watchDatas = setOpts.watchDatas = [];
            watchDatas.push(["directName", watchReg0 + "[6]", "editValue", 1]);
            setOptss.push(setOpts);

        };
        var cname = lyMaps["centerBody"] + "~" + 0;
        var opts = {};
        opts.title = "副控1";
        opts.deviceInx = 0;
        targFunc(opts);
        blocks[cname] = {name: "syncPanel#0", type: "Model~MdaSetGroup~base.sys0", opts: opts};
        var cname = lyMaps["centerBody"] + "~" + 1;
        var opts = {};
        opts.deviceInx = 1;
        opts.title = "副控2";
        targFunc(opts);
        blocks[cname] = {name: "syncPanel#1", type: "Model~MdaSetGroup~base.sys0", opts: opts};
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


class PhoneBox {
    constructor() {
    }
    initOpts(md) {
        var self = this;
        var opts = {};
        Block.setBaseOpts(opts);
        opts.baseColor = "#222";
        opts.hotlines = ["Line 1", "Line 2", "Line 3", "Line 4"];
        return opts;
    }

    chkWatch() {
        var self = this;
        var md = self.md;
        var op = md.opts;
        var st = md.stas;
    }
    afterCreate() {
        var self = this;
        var md = self.md;
    }

    keyClick(iobj) {
        var md = iobj.kvObj.fatherMd;
        if (md.opts.actionFunc) {
            var obj = {};
            obj.act = "phoneKeyClick";
            obj.key = iobj.kvObj.opts.itemId;
            md.opts.actionFunc(obj);
        }
    }

    keyClick(iobj) {
        console.log(iobj);

    }

    build(md) {
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
        opts.yArr = [50, 9999];
        opts.xyArr = [[9999], [9999, 0]];
        opts.ym = 10;
        opts.margin = 4;
        layouts[cname] = {name: cname, type: "Layout~Ly_base~xyArray.sys0", opts: opts};
        lyMaps["mainBody"] = cname;
        //==============================
        var cname = lyMaps["mainBody"] + "~" + 0;
        var excActionPrg = function (iobj) {
            console.log(iobj);
            iobj.act = "esc";
            KvLib.exe(op.actionFunc, iobj);
        };
        mac.setHeadTitleBar(md, cname, "語音通話", excActionPrg);

        var cname = lyMaps["mainBody"] + "~" + 1;
        var opts = {};
        opts.whr = 0.75;
        opts.margin = 20;
        layouts[cname] = {name: cname, type: "Layout~Ly_base~array.sys0", opts: opts};
        lyMaps["phoneBody"] = cname;







        var cname = lyMaps["phoneBody"] + "~" + 0;
        var opts = {};
        opts.yArr = [170, 60, 60, 60, 65, 65, 65, 65, 100, 9999];
        var rw = (1 / 6).toFixed(3) + "rw";
        opts.xyArr = [];
        opts.xyArr.push([9999]);
        opts.xyArr.push([rw, rw, rw, rw, rw, rw]);
        opts.xyArr.push([rw, rw, rw, rw, rw, rw]);
        opts.xyArr.push([rw, rw, rw, rw, rw, rw]);
        var rw = (1 / 4).toFixed(3) + "rw";
        opts.xyArr.push([rw, rw, rw, rw]);
        opts.xyArr.push([rw, rw, rw, rw]);
        opts.xyArr.push([rw, rw, rw, rw]);
        opts.xyArr.push([rw, rw, rw, rw]);

        var rw = (1 / 4).toFixed(3) + "rw";
        opts.xyArr.push([rw, rw, rw, rw]);

        opts.ym = 10;
        opts.xm = 10;
        opts.margin = 20;
        layouts[cname] = {name: cname, type: "Layout~Ly_base~xyArray.sys0", opts: opts};
        lyMaps["phoneMainBody"] = cname;


        var cname = lyMaps["phoneBody"] + "~" + 0;
        var opts = {};
        opts.backgroundImageUrls = ['systemResource/metal.bmp'];
        opts.backgroundImagePosition = "extend";
        opts.insideShadowBlur = "0.2rh";
        opts.borderRadius = "20px";
        opts.borderWidth = 2;
        opts.borderColor = "#ccc";
        blocks[cname] = {name: "startLed", type: "Component~Cp_base~icons.sys0", opts: opts};


        var cname = lyMaps["phoneMainBody"] + "~" + 0;
        var opts = {};
        opts.backgroundImageUrls = ['systemResource/lcd1.bmp'];
        opts.backgroundImagePosition = "extend";
        blocks[cname] = {name: "startLed", type: "Component~Cp_base~icons.sys0", opts: opts};

        var texts = [
            "✖", '▲', "✔", "♫+", "♫-", '<i class="gf">&#xe0e0</i>'
                    , "◀", "▼︎", "▶︎︎︎", '', '<i class="gf">&#xe61c</i>', '<i class="gf">&#xf233</i>'
                    , "Ⅰ", "Ⅱ", '<i class="gf">&#xe620</i>', '<i class="gf">&#xe02b</i>', "", '<i class="gf">&#xebba</i>'
        ];
        var ids = [
            "cancle", "up", "ok", "+", "-", "set"
                    , "left", "down", "right", "meet", "transfer", "meetInf"
                    , "line1", "line2", "hold", "mute", "", "broadInf"
        ];
        for (var i = 0; i < 18; i++) {
            var cname = lyMaps["phoneMainBody"] + "~" + (1 + i);
            var opts = {};
            opts.innerText = texts[i];
            opts.fontSize = "0.8rh";
            opts.actionFunc = self.keyClick;
            opts.buttonId = ids[i];
            blocks[cname] = {name: "fnButton#" + i, type: "Component~Cp_base~button.sys0", opts: opts};
        }

        var texts = ["1", "2", "3", op.hotlines[0], "4", "5", "6", op.hotlines[1], "7", "8", "9", op.hotlines[2], "*", "0", "#", op.hotlines[3]];
        var ids = ["1", "2", "3", "hotLine#0", "4", "5", "6", "hotLine#1", "7", "8", "9", "hotLine#2", "*", "0", "#", "hotLine#3"];
        var inx = 0;
        for (var i = 0; i < 16; i++) {
            var cname = lyMaps["phoneMainBody"] + "~" + (19 + i);
            var opts = {};
            opts.innerText = texts[i];
            opts.fontSize = "0.8rh";
            opts.actionFunc = self.keyClick;
            opts.buttonId = ids;
            if ((inx % 4) === 3)
                opts.fontSize = "0.4rh";
            inx++;
            blocks[cname] = {name: "numButton#" + (18 + i), type: "Component~Cp_base~button.sys0", opts: opts};
        }


        var texts = [];
        texts.push('<i class="gf">&#xe0b1</i>');
        texts.push('<i class="gf">&#xe61d</i>');
        texts.push('<i class="gf">&#xe050</i>');
        texts.push('<i class="gf">&#xe91f</i>');
        var ids = ['hangon', 'hangoff', 'speaker', "talky"];
        for (var i = 0; i < 4; i++) {
            var cname = lyMaps["phoneMainBody"] + "~" + (35 + i);
            var opts = {};
            opts.innerText = texts[i];
            opts.fontSize = "0.8rh";
            opts.actionFunc = self.keyClick;
            opts.buttonId = texts[i];
            blocks[cname] = {name: "numButton#" + (34 + i), type: "Component~Cp_base~button.sys0", opts: opts};
        }

    }
}



class CtrRadarStatus {
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
        opts.layoutType = "row"; //row,collum,array
        opts.buttonIds = [];
        opts.iw = 9999;
        opts.ih = 9999;
        opts.borderWidth = 1;
        opts.xm = 30;
        opts.baseColor = "#222";
        return opts;
    }
    subTypeOpts(opts) {
        if (this.md.subType === "base.sys0") {
        }
    }

    chkWatch() {
        var self = this;
        var md = this.md;
        var op = md.opts;
        var st = md.stas;

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
        var escPrg = function (iobj) {
            console.log(iobj);
            if (iobj.buttonId === "esc")
                MdaPopWin.popOff(2);

        };

        var actionPrg = function (iobj) {
            console.log(iobj);
            if (iobj.kvObj.name === "clrButton") {
                var kvObj = md.blockRefs["editor"];
                if (!kvObj)
                    return;
                var editor = kvObj.objs["editor"];
                KvLib.clearEditorMaker(editor);
                editor.getSession().setValue("");
                return;
            }

            iobj.sender = md;
            iobj.keyId = md.name + iobj.kvObj.name;
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
        opts.xm = 10;
        opts.ym = 4;
        opts.yArr = [50, 120, 120, 90, 90, 9999];
        var rw0 = (1 / 6).toFixed(3) + "rw";
        var rw1 = (1 / 4).toFixed(3) + "rw";
        var rw2 = (1 / 3).toFixed(3) + "rw";
        opts.xyArr = [
            [9999],
            [rw2, rw2, rw2],
            [rw1, rw1, rw1, rw1],
            ["0.3rw", 9999, "0.15rw"],
            [9999, "0.4rw"],
            ["0.5rw", 9999],

            [rw0, rw0, rw0, rw0, rw0, rw0],
            [rw1, rw1, rw1, rw1],
            [rw2, rw2, rw2],
            [9999, 140],
            [9999],
            ["0.1rw", 9999],
            [9999]
        ];
        layouts[cname] = {name: cname, type: "Layout~Ly_base~xyArray.sys0", opts: opts};
        lyMaps["mainBody"] = cname;
        //===================================
        var lyInx = 0;
        var cname = lyMaps["mainBody"] + "~" + lyInx++;
        mac.setHeadTitleBar(md, cname, "發射機狀態", escPrg);
        //==============================

        var actionPrg = function (iobj) {
            console.log(iobj);
        };

        var preText = "sub1";
        if (gr.appId === 1)
            var preText = "sub1";
        if (gr.appId === 2)
            var preText = "sub2";
        for (var i = 0; i < 14; i++) {
            var cname = lyMaps["mainBody"] + "~" + lyInx++;
            var opts = {};
            opts.setOptss = [];
            var inx = 0;
            if (i === inx++) {
                opts.title = "順向輸出功率";
                var setOpts = opts.setOpts = sopt.getOptsPara("lcdView");
                setOpts.value = "123.4";//
            }
            if (i === inx++) {
                opts.title = "反向輸出功率";
                var setOpts = opts.setOpts = sopt.getOptsPara("lcdView");
                setOpts.value = "123.4";//
                setOpts.editTextColor = "#0f0";
            }
            if (i === inx++) {
                opts.title = "輸出電流";
                var setOpts = opts.setOpts = sopt.getOptsPara("lcdView");
                setOpts.value = "123.4";//
            }
            if (i === inx++) {
                opts.title = "本機輸入功率";
                var setOpts = opts.setOpts = sopt.getOptsPara("lcdView");
                setOpts.value = "123.4";//
            }
            if (i === inx++) {
                opts.title = "遙控輸入功率";
                var setOpts = opts.setOpts = sopt.getOptsPara("lcdView");
                setOpts.value = "123.4";//
            }
            if (i === inx++) {
                opts.title = "前置放大器輸出功率";
                var setOpts = opts.setOpts = sopt.getOptsPara("lcdView");
                setOpts.value = "123.4";//
                setOpts.editTextColor = "#0f0";
            }
            if (i === inx++) {
                opts.title = "驅動放大器輸出功率";
                var setOpts = opts.setOpts = sopt.getOptsPara("lcdView");
                setOpts.value = "123.4";//
            }




            if (i === inx++) {
                opts.title = "環控氣流";
                var setOpts = opts.setOpts = sopt.getOptsPara("leds");
                setOpts.enum = ["AF左", "AF中", "AF右"];
                setOpts.value = [0, 1, 2];
                opts.setOptss.push(setOpts);
                blocks[cname] = {name: "groupPanel#" + i, type: "Model~MdaSetGroup~base.sys0", opts: opts};
                continue;
            }

            if (i === inx++) {
                opts.title = "環控水流";
                var setOpts = opts.setOpts = sopt.getOptsPara("leds");
                setOpts.enum = ["WF1", "WF2", "WF3", "WF4", "WF5", "WF6"];
                setOpts.value = [0, 1, 2, 3, 4, 0];
                opts.setOptss.push(setOpts);
                blocks[cname] = {name: "groupPanel#" + i, type: "Model~MdaSetGroup~base.sys0", opts: opts};
                continue;
            }
            if (i === inx++) {
                opts.title = "環控水溫";
                var setOpts = opts.setOpts = sopt.getOptsPara("leds");
                setOpts.enum = ["WT"];
                setOpts.value = [0];
                opts.setOptss.push(setOpts);
                blocks[cname] = {name: "groupPanel#" + i, type: "Model~MdaSetGroup~base.sys0", opts: opts};
                continue;
            }

            if (i === inx++) {
                opts.title = "脈波狀態";
                var setOpts = opts.setOpts = sopt.getOptsPara("leds");
                setOpts.enum = ["脈波輸入", "週期過大", "脈波過寬"];
                setOpts.value = [0, 1, 2];
                opts.setOptss.push(setOpts);
                blocks[cname] = {name: "groupPanel#" + i, type: "Model~MdaSetGroup~base.sys0", opts: opts};
                continue;
            }

            if (i === inx++) {
                opts.title = "固態放大器狀態";
                var setOpts = opts.setOpts = sopt.getOptsPara("leds");
                setOpts.enum = ["放大器電源", "放大器模組"];
                setOpts.value = [0, 1];
                opts.setOptss.push(setOpts);
                blocks[cname] = {name: "groupPanel#" + i, type: "Model~MdaSetGroup~base.sys0", opts: opts};
                continue;
            }

            //=======================================================================
            var ser = 0;
            if (i === inx++) {
                opts.title = "放大器電源狀態";
                var rh = (1 / 10).toFixed(3) + "rh";
                var rw = (1 / 4).toFixed(3) + "rw";
                opts.yArr = [];
                opts.xyArr = [];
                opts.ym = 0;
                for (var j = 0; j < 10; j++) {
                    opts.yArr.push(rh);
                    opts.xyArr.push([rw, rw, rw, rw]);
                }
                for (var j = 0; j < 40; j++) {
                    var setOpts = opts.setOpts = sopt.getOptsPara("leds");
                    if (j === 0 || j === 3 || j === 36 || j === 39) {
                        opts.setOptss.push(null);
                        continue;
                    }
                    var str1 = "" + (((j / 4) | 0) + 1);
                    var str2 = "-" + ((j % 4) + 1);
                    setOpts.enum = [str1 + str2];
                    setOpts.value = [0];
                    opts.setOptss.push(setOpts);
                }
                blocks[cname] = {name: "groupPanel#" + i, type: "Model~MdaSetGroup~base.sys0", opts: opts};
                continue;
            }

            var ser = 0;
            if (i === inx++) {
                opts.title = "放大器模組狀態";
                var rh = (1 / 10).toFixed(3) + "rh";
                var rw = (1 / 4).toFixed(3) + "rw";
                opts.yArr = [];
                opts.xyArr = [];
                opts.ym = 0;
                for (var j = 0; j < 10; j++) {
                    opts.yArr.push(rh);
                    opts.xyArr.push([rw, rw, rw, rw]);
                }
                for (var j = 0; j < 40; j++) {
                    var setOpts = opts.setOpts = sopt.getOptsPara("leds");
                    if (j === 0 || j === 3 || j === 36 || j === 39) {
                        opts.setOptss.push(null);
                        continue;
                    }
                    var str1 = "" + (((j / 4) | 0) + 1);
                    var str2 = "-" + ((j % 4) + 1);
                    setOpts.enum = [str1 + str2];
                    setOpts.value = [0];
                    opts.setOptss.push(setOpts);
                }
                blocks[cname] = {name: "groupPanel#" + i, type: "Model~MdaSetGroup~base.sys0", opts: opts};
                continue;
            }
            setOpts.titleWidth = 0;
            setOpts.baseColor = "#002";
            setOpts.borderWidth = 0;
            opts.setOptss.push(setOpts);
            opts.actionFunc = actionPrg;
            blocks[cname] = {name: "groupPanel#" + i, type: "Model~MdaSetGroup~base.sys0", opts: opts};
        }

    }
}



class CtrPowerStatus {
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
        opts.layoutType = "row"; //row,collum,array
        opts.buttonIds = [];
        opts.iw = 9999;
        opts.ih = 9999;
        opts.borderWidth = 1;
        opts.xm = 30;
        opts.baseColor = "#222";
        return opts;
    }
    subTypeOpts(opts) {
        if (this.md.subType === "base.sys0") {
        }
    }

    chkWatch() {
        var self = this;
        var md = this.md;
        var op = md.opts;
        var st = md.stas;

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
        var escPrg = function (iobj) {
            console.log(iobj);
            if (iobj.buttonId === "esc")
                MdaPopWin.popOff(2);

        };

        var actionPrg = function (iobj) {
            console.log(iobj);
            if (iobj.kvObj.name === "clrButton") {
                var kvObj = md.blockRefs["editor"];
                if (!kvObj)
                    return;
                var editor = kvObj.objs["editor"];
                KvLib.clearEditorMaker(editor);
                editor.getSession().setValue("");
                return;
            }

            iobj.sender = md;
            iobj.keyId = md.name + iobj.kvObj.name;
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
        opts.xm = 10;
        opts.ym = 4;
        opts.yArr = [50, 9999];
        var rw0 = (1 / 6).toFixed(3) + "rw";
        var rw1 = (1 / 4).toFixed(3) + "rw";
        var rw2 = (1 / 3).toFixed(3) + "rw";
        opts.xyArr = [
            [9999],
            [9999],
            [9999]
        ];
        layouts[cname] = {name: cname, type: "Layout~Ly_base~xyArray.sys0", opts: opts};
        lyMaps["mainBody"] = cname;
        //===================================
        var lyInx = 0;
        var cname = lyMaps["mainBody"] + "~" + lyInx++;
        mac.setHeadTitleBar(md, cname, "放大器電源狀態", escPrg);
        //=====================
        var cname = lyMaps["mainBody"] + "~" + lyInx++;
        var opts = {};
        opts.xm = 10;
        opts.ym = 2;
        opts.ksObjWs = ["0.5rw", "0.5rw"];
        opts.etm = 4;
        opts.eh = 44;
        opts.ebm = 4;

        opts.ksObjss = [];
        var colorInx = 1;
        var noInx = 2;
        var itemInx = 0;
        for (var i = 0; i < 19; i++) {
            var cInx = (i % 4);
            if (cInx < 2)
                var color = "#ccc";
            else
                var color = "#aaa";
            if (i === 0)
                var color = "#aaa";

            var ksObjs = [];
            for (var j = 0; j < 2; j++) {
                var ksObj = {};
                ksObj.name = "name#" + i + "." + j;
                ksObj.type = "Model~StatusBar~base.sys0";
                var kopt = ksObj.opts = {};
                kopt.baseColor = color;
                if (i === 0)
                    kopt.headBar_f = 1;
                else
                    kopt.headBar_f = 0;
                var itemNo = "";
                if (!kopt.headBar_f) {
                    var str1 = "" + (((noInx / 4) | 0) + 1);
                    if (i === 1)
                        var str2 = "-" + ((noInx % 2) + 1);
                    else
                        var str2 = "-" + ((noInx % 4) + 1);
                    itemNo = str1 + str2;
                    noInx++;

                    kopt.itemWatchss = [];
                    for (var k = 0; k < 11; k++) {
                        var watchs = ["null"];
                        if (k === 1) {
                            watchs = ["self.fatherMd.fatherMd.stas.connectA[" + itemInx + "]"];
                        }
                    }
                    itemInx++;
                }
                kopt.xArr = [50, 40, 40, 40, 58, 58, 58, 58, 58, 58, 9999];
                kopt.itemTypes = ["label", "led", "led", "led", "view", "view", "view", "view", "view", "view", "button"];
                kopt.itemValues = [itemNo, 0, 0, 0, "123", "4.6", "1.2", "30", "19", "28", '<i class="gf">&#xe8b8;</i>'];
                kopt.itemTitles = ["編號", "故障", "50V", "32V", "50V<br>電壓", "50V<br>電流", "50V<br>溫度", "32V<br>電壓", "32V<br>電流", "32V<br>溫度", "設定"];

                ksObjs.push(ksObj);
            }
            opts.ksObjss.push(ksObjs);
        }
        opts.actionFunc = function (iobj) {
            console.log(iobj);
        };

        blocks[cname] = {name: cname, type: "Model~MdaContainer~base.page", opts: opts};
        //==============================
    }
}



class StatusBar {
    constructor() {
    }
    initOpts(md) {
        var self = this;
        var opts = {};
        Block.setBaseOpts(opts);
        this.subTypeOpts(opts);
        opts.title = "title";
        opts.borderWidth = 1;
        opts.xm = 30;
        opts.baseColor = "#ccc";
        opts.headBar_f = 0;
        opts.itemTypes = ["label", "led", "led", "led", "view", "view", "view", "view", "view", "view", "button"];
        opts.xArr = [50, 40, 40, 40, 58, 58, 58, 58, 58, 58, 9999];
        opts.itemValues = ["1-1", 0, 0, 0, "123", "4.6", "1.2", "30", "19", "28", '<i class="gf">&#xe8b8;</i>'];
        opts.itemTitles = ["編號", "故障", "50V", "32V", "50V<br>電壓", "50V<br>電流", "50V<br>溫度", "32V<br>電壓", "32V<br>電流", "32V<br>溫度", "設定"];
        opts.itemWatchss = [];
        return opts;
    }
    subTypeOpts(opts) {
        if (this.md.subType === "base.sys0") {
        }
    }

    chkWatch() {
        var self = this;
        var md = this.md;
        var op = md.opts;
        var st = md.stas;

        if (gr.appId === 3)
            var subPowerStatus = gr.syncData.sub1PowerStatus;
        if (gr.appId === 4)
            var subPowerStatus = gr.syncData.sub2PowerStatus;
        var watchObj=st.watchObj={};
        watchObj.connectA = [];
        watchObj.faultA = [];
        watchObj.v50enA = [];
        watchObj.v32enA = [];
        watchObj.v50vA = [];
        watchObj.v50iA = [];
        watchObj.v50tA = [];
        watchObj.v32vA = [];
        watchObj.v32iA = [];
        watchObj.v32tA = [];
        for (var i = 0; i < 36; i++) {
            watchObj.connectA.push([subPowerStatus.connectA[i]]);
            watchObj.faultA.push([subPowerStatus.connectA[i]]);
            watchObj.v50enA.push([subPowerStatus.connectA[i]]);
            watchObj.v32enA.push([subPowerStatus.connectA[i]]);
            watchObj.v50vA.push([subPowerStatus.connectA[i]]);
            watchObj.v50iA.push([subPowerStatus.connectA[i]]);
            watchObj.v50tA.push([subPowerStatus.connectA[i]]);
            watchObj.v32vA.push([subPowerStatus.connectA[i]]);
            watchObj.v32iA.push([subPowerStatus.connectA[i]]);
            watchObj.v32tA.push([subPowerStatus.connectA[i]]);
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
        var actionPrg = function (iobj) {
            console.log(iobj);
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
        opts.xArr = op.xArr;
        layouts[cname] = {name: cname, type: "Layout~Ly_base~xyArray.sys0", opts: opts};
        lyMaps["mainBody"] = cname;

        for (var i = 0; i < op.itemTypes.length; i++) {
            var cname = lyMaps["mainBody"] + "~" + i;
            var opts = {};
            if (op.headBar_f) {
                opts.innerText = op.itemTitles[i];
                opts.fontSize = 16;
                opts.tpd = 4;
                opts.bpd = 2;
                opts.baseColor = op.baseColor;
                blocks[cname] = {name: "item#" + i, type: "Component~Cp_base~label.sys0", opts: opts};
                continue;
            }
            if (op.itemTypes[i] === "label") {
                opts.innerText = op.itemValues[i];
                opts.fontSize = "0.5rh";
                opts.baseColor = op.baseColor;
                blocks[cname] = {name: "item#" + i, type: "Component~Cp_base~label.sys0", opts: opts};
            }
            if (op.itemTypes[i] === "button") {
                opts.innerText = op.itemValues[i];
                blocks[cname] = {name: "item#" + i, type: "Component~Cp_base~button.sys0", opts: opts};
            }
            if (op.itemTypes[i] === "led") {
                opts.fontSize = "0.5rh";
                opts.iw = 30;
                opts.ih = 30;
                opts.blackgroundInx = op.itemValues[i];
                if (op.itemWatchss[i]) {
                    var watchReg = op.itemWatchs[i][0];
                    md.setInputWatch(opts, "directName", watchReg, "blackgroundInx", 1);
                }
                blocks[cname] = {name: "item#" + i, type: "Component~Cp_base~icons.led", opts: opts};
            }
            if (op.itemTypes[i] === "view") {
                opts.innerText = op.itemValues[i];
                opts.fontSize = "0.5rh";
                if (op.itemWatchss[i]) {
                    var watchReg = op.itemWatchss[i][0];
                    md.setInputWatch(opts, "directName", watchReg, "innerText", 1);
                    var watchReg = op.itemWatchss[i][1];
                    md.setInputWatch(opts, "directName", watchReg, "innerText", 1);
                }
                blocks[cname] = {name: "item#" + i, type: "Component~Cp_base~label.view", opts: opts};
            }

        }

        //==============================
    }
}
