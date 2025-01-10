/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/* global KvLib, gr */





















class MyNewScopeCtr {
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
        opts.signalCnt = 1;
        return opts;
    }
    subTypeOpts(opts) {
        if (this.md.subType === "base.sys0") {
        }
    }
    chkWatch() {
        var md = this.md;
        var op = md.opts;
        var st = md.stas;
        st.signalButtonColors = ["#ccf", "#ccf", "#ccf", "#ccf", "#ccf", "#ccf"];
        if (op.signalCnt) {
            st.signalButtonColors[op.signalCnt - 1] = "#cfc";
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
        opts.yArr = [180, 200, 300, 9999];
        opts.tm = 10;
        layouts[cname] = {name: cname, type: "Layout~Ly_base~xyArray.sys0", opts: opts};
        lyMaps["mainBody"] = cname;
        //=======================================

        //=======================================
        var cname = lyMaps["mainBody"] + "~" + 0;
        var opts = {};
        opts.title = "信號源";
        opts.setOptss = [];
        var setOptss = opts.setOptss;
        opts.yArr = ["0.33rh", "0.33rh", 9999];
        opts.xyArr = [
            ["0.5rw", 9999],
            ["0.5rw", 9999],
            ["0.5rw", 9999]
        ];
        //
        var names = ["測試信號", "脈波信號 A", "脈波信號 B", "輸出功率", "反射功率", "總電流"];
        var ids = ["testSignal", "signal1", "signal2", "signal3", "signal4", "signal5"];
        var regDatas = "self.fatherMd.fatherMd.fatherMd.stas.signalButtonColors";

        for (var i = 0; i < 6; i++) {
            var setOpts = sopt.getOptsPara("button");
            setOpts.enum = [names[i]];
            setOpts.enumId = [names[i]];
            setOpts.baseColor = "#008";
            setOpts.borderWidth = 0;
            setOpts.fontSize = "0.6rh";
            var watchDatas = setOpts.watchDatas = [];
            watchDatas.push(["directName", regDatas + "[" + i + "]", "baseColor", 1]);
            setOptss.push(setOpts);
        }
        opts.actionFunc = function (iobj) {
            console.log(iobj);
            var inx = KvLib.toInt(iobj.setOptsObj.name.split("#")[1], 0);
            inx++;
            if (op.signalCnt === inx)
                op.signalCnt = 0;
            else
                op.signalCnt = inx;
        };
        blocks[cname] = {name: "signalSourcePanel", type: "Model~MdaSetGroup~base.sys0", opts: opts};
        //=========================
        var cname = lyMaps["mainBody"] + "~" + 1;
        var opts = {};
        opts.baseColor="#006";
        opts.actionFunc = function (iobj) {
            console.log(iobj);
        };
        blocks[cname] = {name: "tuner", type: "Model~MyNewTuner~base.sys0", opts: opts};
        //=======================================
        var cname = lyMaps["mainBody"] + "~" + 2;
        var opts = {};
        opts.title = "調整";
        opts.setOptss = [];
        var setOptss = opts.setOptss;
        mac.setXyArr(opts, 6);
        //
        var actionPrg = function (iobj) {
            console.log(iobj);
        };

        var setOpts = sopt.getOptsPara("nature");
        setOpts.iconWidth = 40;
        setOpts.image = "systemResource/icons8-left-right-64.png";
        setOptss.push(setOpts);
        var setOpts = sopt.getOptsPara("nature");
        setOpts.iconWidth = 40;
        setOpts.image = "systemResource/icons8-up-down-64.png";
        setOptss.push(setOpts);
        var setOpts = sopt.getOptsPara("nature");
        setOpts.iconWidth = 40;
        setOpts.image = "systemResource/icons8-magnifier-48.png";
        setOptss.push(setOpts);
        var setOpts = sopt.getOptsPara("nature");
        setOpts.iconWidth = 40;
        setOpts.image = "systemResource/icons8-grid-50.png";
        setOptss.push(setOpts);
        var setOpts = sopt.getOptsPara("buttonSelect");
        setOpts.titleWidth = 40;
        setOpts.title="CH";
        setOpts.fontSize = "0.8rh";
        setOpts.enum = ["1", "2", "3", "4"];
        setOptss.push(setOpts);
        var setOpts = sopt.getOptsPara("buttonSelect");
        setOpts.titleWidth = 40;
        setOpts.title="BIT";
        setOpts.fontSize = "0.8rh";
        setOpts.enum = ["4", "3", "2", "1"];
        setOptss.push(setOpts);
        
        
        opts.actionFunc = actionPrg;
        blocks[cname] = {name: "signalAdjust", type: "Model~MdaSetGroup~base.sys0", opts: opts};
        
        
        //=======================================
        var cname = lyMaps["mainBody"] + "~" + 3;
        var opts = {};
        opts.title = "控制";
        opts.setOptss = [];
        var setOptss = opts.setOptss;
        mac.setXyArr(opts, 4);
        //
        var actionPrg = function (iobj) {
            console.log(iobj);
        };

        var setOpts = sopt.getOptsPara("buttonSelect");
        setOpts.titleWidth = 60;
        setOpts.title="RUN";
        setOpts.enum=['<i class="gf">&#xe037</i>','<i class="gf">&#xe034</i>'];
        setOpts.selectColor="#cfc";
        setOpts.value=0;
        setOpts.fontSize="0.9rh";
        setOptss.push(setOpts);

        var setOpts = sopt.getOptsPara("buttonSelect");
        setOpts.titleWidth = 60;
        setOpts.title="TRIG";
        setOpts.enum=['ON','OFF'];
        setOpts.selectColor="#cfc";
        setOpts.value=0;
        setOpts.fontSize="0.7rh";
        setOptss.push(setOpts);

        var setOpts = sopt.getOptsPara("buttonSelect");
        setOpts.titleWidth = 60;
        setOpts.title="TYPE";
        setOpts.enum=['MAIN','ROLL'];
        setOpts.selectColor="#cfc";
        setOpts.value=0;
        setOpts.fontSize="0.7rh";
        setOptss.push(setOpts);
        
        var setOpts = sopt.getOptsPara("buttonOnOffs");
        setOpts.titleWidth = 60;
        setOpts.title="DISP";
        setOpts.enum=['CH1','CH2','CH3','CH4'];
        setOpts.selectColor="#cfc";
        setOpts.value=15;
        setOpts.fontSize="0.6rh";
        setOptss.push(setOpts);
        
        
        /*
        var setOpts = sopt.getOptsPara("nature");
        setOpts.iconWidth = 40;
        setOpts.image = "systemResource/icons8-up-down-64.png";
        setOptss.push(setOpts);
        var setOpts = sopt.getOptsPara("nature");
        setOpts.iconWidth = 40;
        setOpts.image = "systemResource/icons8-magnifier-48.png";
        setOptss.push(setOpts);
        var setOpts = sopt.getOptsPara("nature");
        setOpts.iconWidth = 40;
        setOpts.image = "systemResource/icons8-grid-50.png";
        setOptss.push(setOpts);
        var setOpts = sopt.getOptsPara("buttonSelect");
        setOpts.titleWidth = 0;
        setOpts.image = "systemResource/icons8-grid-50.png";
        setOpts.fontSize = "0.8rh";
        setOpts.enum = ["5", "4", "3", "2", "1"];
        setOptss.push(setOpts);
        */
        
        opts.actionFunc = actionPrg;
        blocks[cname] = {name: "signalCtr", type: "Model~MdaSetGroup~base.sys0", opts: opts};

        
        
        return;

        for (var i = 0; i < 1; i++) {
            var setOpts = sopt.getOptsPara("nature");
            setOpts.enum = [names[i]];
            setOpts.enumId = [names[i]];
            setOpts.baseColor = "#008";
            setOpts.borderWidth = 0;
            setOpts.fontSize = "0.6rh";
            var watchDatas = setOpts.watchDatas = [];
            watchDatas.push(["directName", regDatas + "[" + i + "]", "baseColor", 1]);
            setOptss.push(setOpts);
        }
        opts.actionFunc = function (iobj) {
            console.log(iobj);
            var inx = KvLib.toInt(iobj.setOptsObj.name.split("#")[1], 0);
            inx++;
            if (op.signalCnt === inx)
                op.signalCnt = 0;
            else
                op.signalCnt = inx;
        };
        blocks[cname] = {name: "signalSourcePanel", type: "Model~MdaSetGroup~base.sys0", opts: opts};
        //=========================


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

        opts.title = "OSCILLOSCOPE";
        opts.baseColor = "#222";
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
        gr.footBarStatus2 = ani.dispFs;
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
        opts.yArr = [50, 9999, 20];
        layouts[cname] = {name: cname, type: "Layout~Ly_base~xyArray.sys0", opts: opts};
        lyMaps["mainBody"] = cname;

        var cname = lyMaps["mainBody"] + "~" + 0;
        var opts = {};
        opts.xArr = [9999, 200];
        layouts[cname] = {name: cname, type: "Layout~Ly_base~xyArray.sys0", opts: opts};
        lyMaps["upBody"] = cname;

        //=======================================
        var cname = lyMaps["mainBody"] + "~" + 1;
        var opts = {};
        opts.xArr = [9999, 300];
        layouts[cname] = {name: cname, type: "Layout~Ly_base~xyArray.sys0", opts: opts};
        lyMaps["centerBody"] = cname;

        var cname = lyMaps["centerBody"] + "~" + 0;
        var opts = {};
        opts.baseColor = "#222";
        blocks[cname] = {name: "container", type: "Component~Cp_base~container.sys0", opts: opts};

        var cname = lyMaps["centerBody"] + "~" + 1;
        var opts = {};
        opts.baseColor = "#222";
        blocks[cname] = {name: "scopeCtr", type: "Model~MyNewScopeCtr~base.sys0", opts: opts};


        //=======================================
        var cname = lyMaps["mainBody"] + "~" + 0;
        var actionPrg = function (iobj) {
            console.log(iobj);
            iobj.sender = md;
            iobj.act = "esc";
            KvLib.exe(op.actionFunc, iobj);
        };
        mac.setHeadTitleBar(md, cname, op.title, actionPrg);
        var cname = lyMaps["mainBody"] + "~" + 2;
        mac.setFootBar(md, cname);


    }
}



//===========================================
class MyTuner {
    static init() {
        var bobj = gr.modelOpts["Md_tuner"] = {};
        var dsc = bobj["optsDsc"] = {};
        var sobj = bobj["subOpts"] = {};
        var modelOptsFunc = function (obj) {
            obj.propertyWidth = 210;
            obj.propertyHeight = 250;
            obj.borderWidth = 1;
            obj.baseColor = "#333";
            obj.borderColor = "#fff";
            obj.knobName = "Test";
            dsc.knobName = sys.setOptsSet("knobName", "str", "inputText");
            obj.muls = [0.01, 0.1, 1, 10, 100];
            dsc.muls = sys.setOptsSet("muls", "ratio~array", "inputFloat~array");
            obj.mulInx = 2;
            dsc.mulInx = sys.setOptsSet("mulInx", "num", "inputNumber", 0, 0, 4);
            obj.title = "Test";
            dsc.title = sys.setOptsSet("title", "str", "inputText", 1);
            obj.max = 100;
            dsc.max = sys.setOptsSet("max", "num", "inputNumber");
            obj.value = 0;
            dsc.value = sys.setOptsSet("value", "num", "inputNumber");
            obj.min = -100;
            dsc.min = sys.setOptsSet("min", "num", "inputNumber");
            obj.lineHeight = 30;
            dsc.lineHeight = sys.setOptsSet("lineHeight", "num", "inputNumber", 0, 0);
            obj.buttonHeight = 50;
            dsc.buttonHeight = sys.setOptsSet("buttonHeight", "num", "inputNumber", 0, 0);
            obj.rightWidth = 50;
            dsc.rightWidth = sys.setOptsSet("rightWidth", "num", "inputNumber", 0, 0);
            obj.valueFixed = 2;
            dsc.valueFixed = sys.setOptsSet("valueFixed", "num", "inputNumber", 0, 0);

            var setObj = obj.setObj = {};
            setObj.name = "";
            setObj.showDataType_f = 0;
            setObj.titleWidth = 0;
            setObj.setType = "inputText";
            setObj.dataType = "str";
            setObj.nullOk_f = 1;
            dsc.setObj = sys.setOptsSet("setObj", "object", "setObject");
            InitOpts.getSetObjDsc(dsc);


            obj.end = 0;
            obj.dataType = "num";

        };
        if ("sys") {
            modelOptsFunc(bobj);
            var obj = sobj["sys"] = {};
        }

    }
    constructor() {
    }
    initOpts(md) {
        return Model.getOpts(md.baseType, md.subType);
    }
    afterCreate() {
        var self = this;
        var md = self.md;
    }
    build(md) {
        var self = this;
        this.md = md;
        var op = md.opts;
        var lyMap = md.lyMap;
        var comps = op.comps;
        var models = op.models;
        var layouts = op.layouts;
        var layoutGroups = op.layoutGroups;
        //======================================================================
        var valueChangeFunc = function (kvObj, inputValue) {

            if (kvObj.fatherMd.name === "tuner")
                var tunerObj = kvObj.fatherMd;
            else
                var tunerObj = kvObj.fatherMd.fatherMd;

            var op = tunerObj.opts;
            if (op.setObj.name === "")
                return;
            if (op.setObj.value === null || op.setObj.value === undefined)
                return;
            //op.value = 0;
            if (op.setObj.mulFixA_f) {
                var value = op.setObj.value;
                var mul = 1;
                for (var i = 0; i < 15; i++) {
                    var valueInt = parseInt(value / 10);
                    if (!valueInt)
                        break;
                    mul *= 10;
                    value = valueInt;
                }
                if (inputValue === 1) {
                    if (value < 2)
                        value = 2;
                    else if (value < 5)
                        value = 5;
                    else {
                        value = 1;
                        mul *= 10;
                    }
                } else {
                    if (value >= 5)
                        value = 2;
                    else if (value > 1)
                        value = 1;
                    else {
                        value = 5;
                        mul *= 0.1;
                    }
                }
                op.setObj.value = value * mul;
                if (op.setObj.value < op.setObj.min)
                    op.setObj.value = op.setObj.min;
            } else {
                var addValue = inputValue;
                if (op.setObj.muls)
                    addValue = addValue * op.setObj.muls[op.setObj.mulInx];
                op.setObj.value += addValue;
                if (op.setObj.max !== null && op.setObj.max !== undefined) {
                    if (op.setObj.value >= op.setObj.max)
                        op.setObj.value = op.setObj.max;
                }
                if (op.setObj.min !== null && op.setObj.min !== undefined) {
                    if (op.setObj.value <= op.setObj.min)
                        op.setObj.value = op.setObj.min;
                }
                var valueStr = op.setObj.value.toFixed(op.setObj.fixed);
                op.setObj.value = KvLib.parseNumber(valueStr);
            }
            var mobj = tunerObj.modelRefs["setValue"];
            mobj.opts.setObj = op.setObj;
            mobj.reCreate();
            if (op.actionFunc) {
                var oobj = {};
                oobj.act = "valueChange";
                oobj.kvObj = tunerObj;
                op.actionFunc(oobj);
            }
        };

        var actionFunc = function (iobj) {
            var kvObj = iobj.kvObj;
            var name = kvObj.name;
            if (iobj.act === "click") {
                var strA = name.split("#");
                if (strA[0] === "mulButton") {
                    var md = kvObj.fatherMd;
                    var op = md.opts;
                    op.setObj.mulInx = parseInt(strA[1]);
                    for (var i = 0; i < op.setObj.muls.length; i++) {
                        var comp = md.compRefs["mulButton" + "#" + i];
                        var opts = comp.opts;
                        if (i === op.setObj.mulInx)
                            opts.baseColor = "#ccf";
                        else
                            opts.baseColor = "#ccc";
                        comp.reCreate();
                    }
                    return;
                }
                var md = kvObj.fatherMd.fatherMd;
                var op = md.opts;

                if (strA[0] === "upButton") {
                    if (op.setObj.value === null || op.setObj.value === undefined)
                        return;
                    valueChangeFunc(kvObj, 1);
                    return;
                }
                if (strA[0] === "downButton") {
                    if (op.setObj.value === null || op.setObj.value === undefined)
                        return;
                    valueChangeFunc(kvObj, -1);
                    return;
                }
                if (strA[0] === "keyboardButton") {
                    var opts = {};
                    opts.actionFunc = function (iobj) {
                        op.value = KvLib.parseNumber(iobj.value);
                        var valueStr = op.value.toFixed(op.valueFixed);
                        var comp = md.compRefs["setValue"];
                        comp.opts.editValue = valueStr;
                        comp.reCreate();
                        if (op.actionFunc) {
                            var oobj = {};
                            oobj.act = "valueChange";
                            oobj.value = op.value;
                            oobj.kvObj = md;
                            op.actionFunc(oobj);
                        }
                    };

                    var setObj = {};
                    setObj.dataType = op.dataType;
                    setObj.setType = "inputNumber";
                    setObj.nullOk_f = 0;
                    setObj.name = op.title;
                    setObj.value = op.value;
                    setObj.max = op.max;
                    setObj.min = op.min;
                    setObj.fixed = op.valueFixed;
                    opts.setObj = setObj;
                    var mod = new Model("", "Md_numpad~sys", opts, {});
                    var popOpts = {};
                    popOpts.kvObj = mod;
                    popOpts.w = 600;
                    popOpts.h = 500;
                    sys.popOnModel(popOpts);
                    /*
                     var self = this;
                     var opts = {};
                     opts.kvObj = null;
                     opts.w = op.w;
                     opts.h = op.h;
                     opts.shadow_f = 1;
                     opts.center_f = 1;
                     opts.maskTouchOff_f = 0;
                     * 
                     */
                }

                return;
            }
            return;
        };
        var cname = "c";
        var opts = {};
        opts.xc = 1;
        opts.yc = 4;
        opts.ihO = {};
        opts.ihO.c0 = op.lineHeight;
        opts.ihO.c1 = op.lineHeight;
        opts.ihO.c2 = op.buttonHeight;
        opts.ihO.c3 = 9999;
        var muls = op.setObj.muls;
        if (!muls) {
            opts.ihO.c2 = 0;
            muls = [];
        }

        opts.color = op.baseColor;
        md.setFarme(opts);
        layouts[cname] = {name: cname, type: "base", opts: opts};
        lyMap.set("body", cname);
        //======================================================================
        if (muls.length) {
            var cname = lyMap.get("body") + "~" + 2;
            var opts = {};
            opts.xc = muls.length;
            layouts[cname] = {name: cname, type: "base", opts: opts};
            lyMap.set("pnMulButton", cname);
        }
        //======================================================================
        var cname = lyMap.get("body") + "~" + 3;
        var opts = {};
        opts.xc = 2;
        opts.iwO = {};
        opts.iwO.c0 = 9999;
        opts.iwO.c1 = op.rightWidth;
        layouts[cname] = {name: cname, type: "base", opts: opts};
        lyMap.set("pnMain", cname);
        //======================================================================
        var cname = lyMap.get("pnMain") + "~" + 1;
        var opts = {};
        opts.yc = 3;
        layouts[cname] = {name: cname, type: "base", opts: opts};
        lyMap.set("pnUpDown", cname);
        //======================================================================
        var cname = lyMap.get("body") + "~" + 0;
        var opts = {};
        opts.textAlign = "center";
        opts.innerText = op.setObj.name;
        opts.fontSize = 0;
        comps[cname] = {name: "titleLabel", type: "label~sys", opts: opts};
        //======================================================================
        var cname = lyMap.get("body") + "~" + 1;
        var opts = {};
        opts.setObj = op.setObj;
        models[cname] = {name: "setValue", type: "Md_editOptsLine~sys", opts: opts};
        //======================================================================
        for (var i = 0; i < muls.length; i++) {
            var cname = lyMap.get("pnMulButton") + "~" + i;
            var opts = {};
            opts.innerText = muls[i];
            opts.maxByte = 10;
            opts.fontSize = "fixWidth";
            if (i === op.setObj.mulInx)
                opts.baseColor = "#ccf";
            opts.clickFunc = actionFunc;
            comps[cname] = {name: "mulButton#" + i, type: "button~sys", opts: opts};
        }
        //======================================================================
        var cname = lyMap.get("pnMain") + "~" + 0;
        var opts = {};
        opts.imageInx = 0;
        opts.imageUrls = ['./systemResource/knob.png'];
        opts.margin = 5;
        opts.whr = 1;
        if (op.setObj.mulFixA_f)
            opts.addAngleMul = 0.01;
        opts.actionFunc = function (iobj) {
            valueChangeFunc(iobj.kvObj, iobj.value);
        };
        comps[cname] = {name: "knob", type: "image~knob", opts: opts};
        //======================================================================
        var cname = lyMap.get("pnUpDown") + "~" + 0;
        var opts = {};
        opts.innerText = '<i class="material-icons">&#xe312;</i>';
        opts.clickFunc = actionFunc;
        comps[cname] = {name: "keyboardButton", type: "button~iconFont", opts: opts};
        //======================================================================
        var cname = lyMap.get("pnUpDown") + "~" + 1;
        var opts = {};
        opts.title = '<i class="material-icons">&#xe147;</i>';
        opts.actionFunc = actionFunc;
        models[cname] = {name: "upButton", type: "Md_pushButton", opts: opts};
        //======================================================================
        var cname = lyMap.get("pnUpDown") + "~" + 2;
        var opts = {};
        opts.title = '<i class="material-icons">&#xe15c;</i>';
        opts.actionFunc = actionFunc;
        models[cname] = {name: "downButton", type: "Md_pushButton", opts: opts};
        //======================================================================

    }
}
//===========================================

class MyNewTuner {
    constructor() {
    }
    initOpts(md) {
        var self = this;
        var opts = {};
        Block.setBaseOpts(opts);
        this.subTypeOpts(opts);
        opts.title = "title";
        opts.baseColor = "#222";
        opts.xm = 30;
        opts.signalCnt = 3;
        return opts;
    }
    subTypeOpts(opts) {
        if (this.md.subType === "base.sys0") {
        }
    }
    chkWatch() {
        var md = this.md;
        var op = md.opts;
        var st = md.stas;
    }
    afterCreate() {
        var md = this.md;
        var op = md.opts;
        var st = md.stas;
        //=======================================================
        st.nowAngle=0;
        st.preAngle=0;
        
        var plotObj = md.blockRefs["container"];
        var plotElem = plotObj.elems["base"];
        st.containerWidth = plotObj.stas.containerWidth;
        st.containerHeight = plotObj.stas.containerHeight;

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
        var canvas = st.canvas = selem;
        canvas.style.pointerEvents = "none";
        st.ctx = canvas.getContext('2d');
        st.img = new Image();
        st.img.src = "systemResource/knob.png";
        st.img.onload = function () {
            var img = st.img;
            st.ctx.drawImage(img, 0, 0, img.width, img.height, 0, 0, st.containerWidth, st.containerHeight);
            st.imageLoaded_f = 1;
        };


        var knobPressFunc = function (event) {
            var xx = event.offsetX - (st.containerWidth / 2);
            var yy = (st.containerHeight / 2) - event.offsetY;
            var rr = st.containerWidth / 2;
            var dd2 = xx * xx + yy * yy;
            if (dd2 > (rr * rr))
                return;
            if (dd2 < (10 * 10))
                return;
            md.stas.actionOn_f = 1;
            var checkMouseUpFunc = function () {
                if (gr.mouseDown_f) {
                    setTimeout(checkMouseUpFunc, 100);
                    return;
                }
                md.stas.actionOn_f = 0;
            };
            setTimeout(checkMouseUpFunc, 100, md);
            var ang = KvLib.atan(xx, yy);
            md.stas.preAngle = ang;
            md.stas.addTmp = 0;
            if (md.stas.rotateAng) {
                ang = ang - st.rotateAng;
                if (ang < 0)
                    ang += 360;
            }
            md.stas.nowAngle = ang;
            //console.log("" + xx + "," + yy + "," + ang);
        };
        var knobUpFunc = function (event) {
            md.stas.actionOn_f = 0;
        };
        var knobMoveFunc = function (event) {
            if (!md.stas.actionOn_f)
                return;
            if (!gr.mouseDown_f)
                return;
            var xx = event.offsetX - (st.containerWidth / 2);
            var yy = (st.containerHeight / 2) - event.offsetY;
            var dd2 = xx * xx + yy * yy;
            if (dd2 < (10 * 10))
                return;
            var ang = KvLib.atan(xx, yy);
            //console.log("" + xx + "," + yy + "," + ang);
            var addAngle = ang - md.stas.preAngle;
            md.stas.preAngle = ang;
            if (addAngle > 180)
                addAngle = addAngle - 360;
            if (addAngle < -180)
                addAngle = 360 + addAngle;
            md.stas.addTmp += (addAngle) * op.addAngleMul;
            var intTmp = 0;
            if (md.stas.addTmp >= 1 || md.stas.addTmp <= 1) {
                intTmp = md.stas.addTmp | 0;
                md.stas.addValue = intTmp;
                md.stas.addTmp -= intTmp;
            }
            if (intTmp) {
                var obj = {};
                obj.act = "addValue";
                obj.value = 0 - intTmp;
                obj.sender = md;
                KvLib.exe(op.actionFunc, iobj);
            }




            var rotateAng = ang - md.stas.nowAngle;
            md.stas.rotateAng = rotateAng;
            //self.stas.nowAngle = ang;
            KvLib.drawRotated(rotateAng, st.canvas, st.ctx, st.img, "ccw");


        };
        plotElem.addEventListener("mousedown", knobPressFunc);
        plotElem.addEventListener("mouseup", knobUpFunc);
        plotElem.addEventListener("mousemove", knobMoveFunc);



        //===============
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
        opts.baseColor = op.baseColor;
        opts.whr = 1;
        blocks[cname] = {name: "container", type: "Component~Cp_base~container.sys0", opts: opts};
        return;


        var cname = lyMaps["body"] + "~" + 0;
        var opts = {};
        opts.backgroundImageUrls = ["systemResource/knob.png"];
        opts.whr = 1;
        opts.actionFunc = function (iobj) {
            console.log(iobj);
        };
        blocks[cname ] = {name: "icon", type: "Component~Cp_base~icons.sys0", opts: opts};



        return;
    }
}
