/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/* global KvLib, gr */

class MyPlot {
    static init() {
        var bobj = gr.compOpts["plot"] = {};
        var sobj = bobj["subOpts"] = {};
        var dsc = bobj["optsDsc"] = {};
        if ("base") {
            bobj.hint = "";
            bobj.width = 300;
            dsc.width = sys.setOptsSet("width", "", "system");
            bobj.height = 300;
            dsc.height = sys.setOptsSet("height", "", "system");
            bobj.inputRegs = [];
        }
        //==================================================
        var obj = sobj["sys"] = {};
        if ("plot~sys") {
            obj.plotType = "plot";
            dsc.plotType = sys.setOptsSetFix("plotType", "textAlign");
            dsc.plotType.enum = ["plot", "scope"];
            obj.axeWidth = 0.5;
            dsc.axeWidth = sys.setOptsSet("axeWidth", "ratio", "inputFloat");
            obj.xAxeGridAmt = 10;
            dsc.xAxeGridAmt = sys.setOptsSet("xAxeGridAmt", "num", "inputNumber");
            obj.yAxeGridAmt = 10;
            dsc.yAxeGridAmt = sys.setOptsSet("yAxeGridAmt", "num", "inputNumber");
            obj.bufferSize = 2000;
            dsc.bufferSize = sys.setOptsSet("bufferSize", "num", "inputNumber");




            obj.grid_f = 1;
            dsc.grid_f = sys.setOptsSet("grid_f", "flag", "inputBoolean");
            obj.run_f = 0;
            dsc.run_f = sys.setOptsSet("run_f", "flag", "inputBoolean");
            obj.testSinWave_f = 1;
            dsc.testSinWave_f = sys.setOptsSet("testSinWave_f", "flag", "inputBoolean");
            obj.centerLine_f = 0;
            dsc.centerLine_f = sys.setOptsSet("centerLine_f", "flag", "inputBoolean");


            //===
            obj["group~colors"] = [0, "axeColor", "strokeColor", "gridColor", "centerLineColor"];
            obj.axeColor = "#aaa";
            dsc.axeColor = sys.setOptsSet("axeColor", "color", "selectColor");
            obj.strokeColor = "#fff";
            dsc.strokeColor = sys.setOptsSet("strokeColor", "color", "selectColor");
            obj.gridColor = "rgba(0,0,0,0.5)";
            dsc.gridColor = sys.setOptsSet("gridColor", "color", "selectColor");
            obj.centerLineColor = "rgba(255,255,255,0.5)";
            dsc.centerLineColor = sys.setOptsSet("centerLineColor", "color", "selectColor");
            obj.centerLineV = 0;
            dsc.centerLineV = sys.setOptsSet("centerLineV", "num", "inputNumber");
            //===============
            obj["group~X-Axile"] = [0, "xyOffx", "xAxeLen", "xAxeOffsV", "xAxeTotalV", "xAxePeriodV"
                        , "xAxeMainPeriodCnt", "xAxeStrokeLen", "xAxeMainStrokeLen", "xScale", "xUnit"
            ];
            obj.xyOffx = 50;    //total 1000    //origin point x 
            dsc.xyOffx = sys.setOptsSet("xyOffx", "num", "inputNumber");
            obj.xAxeLen = 900;  //total 1000    //x axile len rate    
            dsc.xAxeLen = sys.setOptsSet("xAxeLen", "num", "inputNumber");
            obj.xAxeOffsV = 0;
            dsc.xAxeOffsV = sys.setOptsSet("xAxeOffsV", "num", "inputNumber");
            obj.xAxeTotalV = 500;
            dsc.xAxeTotalV = sys.setOptsSet("xAxeTotalV", "num", "inputNumber");
            obj.xAxePeriodV = 20;   //short axile stroke 
            dsc.xAxePeriodV = sys.setOptsSet("xAxePeriodV", "num", "inputNumber");
            obj.xAxeMainPeriodCnt = 5;  //long axile stroke every this count of short axile stroke
            dsc.xAxeMainPeriodCnt = sys.setOptsSet("xAxeMainPeriodCnt", "num", "inputNumber");
            obj.xAxeStrokeLen = 3;      //long axile stroke every this count of short axile stroke
            dsc.xAxeStrokeLen = sys.setOptsSet("xAxeStrokeLen", "num", "inputNumber");
            obj.xAxeMainStrokeLen = 10; //long axile stroke every this count of short axile stroke
            dsc.xAxeMainStrokeLen = sys.setOptsSet("xAxeMainStrokeLen", "num", "inputNumber");
            obj.xScale = 500;
            dsc.xScale = sys.setOptsSet("xScale", "ratio", "inputFloat");
            obj.xUnit = "(uS)";
            dsc.xUnit = sys.setOptsSet("xUnit", "str", "inputText");
            //===============
            obj["group~Y-Axile"] = [0, "xyOffy", "yAxeLen", "yAxeOffsV", "yAxeTotalV", "yAxePeriodV"
                        , "yAxeMainPeriodCnt", "yAxeStrokeLen", "yAxeMainStrokeLen", "yUnit"
            ];
            obj.xyOffy = 50;    //total 1000    //origin point y 
            dsc.xyOffy = sys.setOptsSet("xyOffy", "num", "inputNumber");
            obj.yAxeLen = 900;
            dsc.yAxeLen = sys.setOptsSet("yAxeLen", "num", "inputNumber");
            obj.yAxeOffsV = -100;
            dsc.yAxeOffsV = sys.setOptsSet("yAxeOffsV", "num", "inputNumber");
            obj.yAxeTotalV = 200;
            dsc.yAxeTotalV = sys.setOptsSet("yAxeTotalV", "num", "inputNumber");
            obj.yAxePeriodV = 5;
            dsc.yAxePeriodV = sys.setOptsSet("yAxePeriodV", "num", "inputNumber");
            obj.yAxeMainPeriodCnt = 10;
            dsc.yAxeMainPeriodCnt = sys.setOptsSet("yAxeMainPeriodCnt", "num", "inputNumber");
            obj.yAxeStrokeLen = 3;
            dsc.yAxeStrokeLen = sys.setOptsSet("yAxeStrokeLen", "num", "inputNumber");
            obj.yAxeMainStrokeLen = 10;
            dsc.yAxeMainStrokeLen = sys.setOptsSet("yAxeMainStrokeLen", "num", "inputNumber");
            obj.yUnit = "(mV)";
            dsc.yUnit = sys.setOptsSet("yUnit", "str", "inputText");
            //===============
            obj.messages = [];
            var mesObj = {};
            mesObj.x = 500;
            mesObj.y = 20;
            mesObj.text = "title";
            mesObj.color = "#0f0";
            mesObj.font = "20px monospace";
            obj.messages.push(mesObj);




            dsc.messages = sys.setOptsSet("messages", "object~array", "setObject~array");
            dsc.messages.sons = [];
            dsc.messages.sons.push(sys.setOptsSet("x", "num", "inputNumber"));
            dsc.messages.sons.push(sys.setOptsSet("y", "num", "inputNumber"));
            dsc.messages.sons.push(sys.setOptsSet("text", "str", "inputText"));
            dsc.messages.sons.push(sys.setOptsSet("color", "color", "selectColor"));
            dsc.messages.sons.push(sys.setOptsSet("font", "str", "inputText"));
            //===============

            obj.xGridTime = 2000 * obj.xScale;
            obj.sampleAmt = 1000;
            obj.sampleSize = 2000;
            obj.sampleTime = 10000;
            obj.sampleUnit = "ns";















            obj.lines = [];
            obj.end = 1;
            obj.bufs = [0, 0, 0, 0];
            //===============


            var lineObj = {};
            var buffer = [];
            for (var i = 0; i < 2000; i++) {
                var sin = Math.sin(Math.PI * 2 * i / 100);
                buffer.push(sin * 50);
            }
            lineObj.idCnt = 0;
            lineObj.offset = 0;//1=main grid len 
            lineObj.scale = 25;//
            lineObj.unit = "mv";
            lineObj.buffer = buffer;
            lineObj.bufferSize = 2000;
            lineObj.color = "#f00";
            lineObj.stInx = 0;
            lineObj.trigInx = 1000;
            lineObj.offOn_f = 0;
            lineObj.xOffset = 0;
            obj.lines.push(lineObj);
            //=======================
            var lineObj = {};
            var buffer = [];
            for (var i = 0; i < 2000; i++) {
                var sin = Math.sin(Math.PI * 2 * i / 100);
                buffer.push(sin * 75);
            }
            lineObj.idCnt = 1;
            lineObj.offset = 0;
            lineObj.scale = 50;
            lineObj.unit = "mv";
            lineObj.buffer = buffer;
            lineObj.bufferSize = 2000;
            lineObj.color = "#0f0";
            lineObj.stInx = 0;
            lineObj.offOn_f = 0;
            lineObj.xOffset = 0;
            obj.lines.push(lineObj);
            //=======================
            var lineObj = {};
            var buffer = [];
            for (var i = 0; i < 2000; i++) {
                var sin = Math.sin(Math.PI * 2 * i / 100);
                buffer.push(sin * 25);
            }
            lineObj.idCnt = 2;
            lineObj.offset = 0;
            lineObj.scale = 50;
            lineObj.unit = "mv";
            lineObj.buffer = buffer;
            lineObj.bufferSize = 2000;
            lineObj.color = "#ff0";
            lineObj.stInx = 0;
            lineObj.offOn_f = 0;
            lineObj.xOffset = 0;
            obj.lines.push(lineObj);
            //=======================
            var lineObj = {};
            var buffer = [];
            for (var i = 0; i < 2000; i++) {
                var sin = Math.sin(Math.PI * 2 * i * 2 / 100);
                buffer.push(sin * 12);
            }
            lineObj.idCnt = 3;
            lineObj.offset = 0;
            lineObj.scale = 50;
            lineObj.unit = "mv";
            lineObj.buffer = buffer;
            lineObj.bufferSize = 2000;
            lineObj.color = "#0ff";
            lineObj.stInx = 0;
            lineObj.offOn_f = 0;
            lineObj.xOffset = 0;
            obj.lines.push(lineObj);
            //=======================
            dsc.lines = sys.setOptsSet("lines", "object~array", "setObject~array");
            dsc.lines.sons = [];
            dsc.lines.sons.push(sys.setOptsSet("offOn_f", "flag", "inputBoolean"));
            dsc.lines.sons.push(sys.setOptsSet("color", "color", "selectColor"));
            dsc.lines.sons.push(sys.setOptsSet("offset", "num", "inputNumber"));
            dsc.lines.sons.push(sys.setOptsSet("scale", "ratio", "inputFloat"));
            dsc.lines.sons.push(sys.setOptsSet("xOffset", "num", "inputNumber"));
            dsc.lines.sons.push(sys.setOptsSet("idCnt", "num", "system"));
            dsc.lines.sons.push(sys.setOptsSet("stInx", "num", "system"));
            dsc.lines.sons.push(sys.setOptsSet("buffer", "ratio~array", "system"));



        }
    }

    constructor(_name, _type, _opts, _paras) {
        this.name = _name;
        this.type = _type;
        this.opts = this.initOpts();
        this.paras = this.initParas();
        this.kid = KvLib.genKid();
        this.stas = {};
        this.elems = {};
        this.objs = {};
        this.watch = {};
        this.inputRegs = [];
        //=============================
        this.layout = null;
        this.fatherMd = null;
        //==============================
        KvLib.deepCoverObject(this.opts, _opts);
        KvLib.coverObject(this.paras, _paras);
        // gr.kidMap.set(this.kid, this);
    }
    initOpts() {
        var self = this;
        var obj = {};
        var strA = this.type.split("~");
        this.baseType = strA[0];
        this.subType = strA[1];
        this.s0Type = strA[2];
        this.s1Type = strA[3];
        this.s2Type = strA[4];
        return MyPlot.getOpts(this.baseType, this.subType);
    }
    static getOpts(baseType, subType) {
        var opts = {};
        var bopts = gr.compOpts[baseType];
        if (bopts) {
            KvLib.deepCoverObject(opts, bopts);
            var sopts = bopts["subOpts"][subType];
            if (sopts)
                KvLib.deepCoverObject(opts, sopts);
        }
        return opts;
    }

    initParas() {
        var paras = {};
        return paras;
    }
    build() {
        var self = this;
        var op = self.opts;
        var st = self.stas;
        st.wRate = op.width / 1000.0;
        st.hRate = op.height / 1000.0;
        st.xAxeLen = op.xAxeLen * st.wRate;
        st.yAxeLen = op.yAxeLen * st.hRate;
        st.xyOffx = op.xyOffx * st.wRate;
        st.xyOffy = op.xyOffy * st.hRate;



        st.xAxeStrokeCnt = (op.xAxeTotalV) / op.xAxePeriodV;
        st.xAxeStrokePeriod = (st.xAxeLen - 10) / st.xAxeStrokeCnt;
        st.xAxeMainPeriodV = op.xAxeMainPeriodCnt * op.xAxePeriodV;
        st.xPixelDivUnit = (st.xAxeLen - 10) / (op.xAxeTotalV);


        st.yAxeStrokeCnt = (op.yAxeTotalV) / op.yAxePeriodV;
        st.yAxeStrokePeriod = (st.yAxeLen - 10) / st.yAxeStrokeCnt;
        st.yAxeMainPeriodV = op.yAxeMainPeriodCnt * op.yAxePeriodV;
        st.yPixelDivUnit = (st.yAxeLen - 10) / (op.yAxeTotalV);

    }
    create() {
        var self = this;
        var op = self.opts;
        self.baseElem = document.getElementById(op.baseId);
        var selem = document.createElement("canvas");
        selem.id = op.baseId + "_canvas";
        selem.width = op.width;
        selem.height = op.height;
        selem.style.position = "absolute";
        selem.style.left = 0 + "px";
        selem.style.top = 0 + "px";
        selem.style.zIndex = "0";
        selem.style.width = "100%";
        selem.style.height = "100%";
        self.baseElem.appendChild(selem);
        self.canvas = selem;
        //=========================================
        var selem = document.createElement("canvas");
        selem.id = op.baseId + "_canvasLy1";
        selem.width = op.width;
        selem.height = op.height;
        selem.style.position = "absolute";
        selem.style.left = 0 + "px";
        selem.style.top = 0 + "px";
        selem.style.zIndex = "1";
        selem.style.width = "100%";
        selem.style.height = "100%";
        self.baseElem.appendChild(selem);
        self.canvasLy1 = selem;
        //=========================================
        if (!self.canvas.getContext)
            return;
        if (!self.canvasLy1.getContext)
            return;
        self.ctx = self.canvas.getContext('2d');
        self.ctx1 = self.canvasLy1.getContext('2d');
        self.createPlot();
    }

    createPlot(editObj) {
        var self = this;
        var op = self.opts;
        var ctx = self.ctx;
        if (editObj) {
            if (editObj.setName === "xScale") {
                op.xAxeOffsV = op.xAxeOffsV * editObj.preValue / editObj.newValue;
            }
        }
        self.drawAxe(1);
        self.drawClear();
        if (op.testSinWave_f) {
            for (var i = 0; i < self.opts.lines.length; i++) {
                var opts = self.opts.lines[i];
                self.drawLine(opts);
            }
        } else {
            for (var i = 0; i < self.opts.bufs.length; i++) {
                var opts = self.opts.lines[i];
                self.drawBufs(opts, self.opts.bufs[i]);
            }
        }

    }

    clearScr() {
        var self = this;
        var op = self.opts;
        var st = self.stas;
        var ctx = self.ctx1;
        ctx.clearRect(0, 0, self.opts.width, self.opts.height);
    }
    clearAll() {
        var self = this;
        var op = self.opts;
        var st = self.stas;
        var ctx1 = self.ctx1;
        var ctx = self.ctx;
        ctx.clearRect(0, 0, self.opts.width, self.opts.height);
        ctx1.clearRect(0, 0, self.opts.width, self.opts.height);
    }

    drawClear() {
        var self = this;
        var op = self.opts;
        var ctx = self.ctx1;
        ctx.clearRect(0, 0, op.width, op.height);
    }
    drawLine(opts, clr) {
        var self = this;
        var op = self.opts;
        var st = self.stas;
        var ctx = self.ctx1;
        if (clr)
            ctx.clearRect(0, 0, op.width, op.height);
        if (!opts.offOn_f)
            return;

        var vrate = st.yAxeStrokePeriod / op.yAxePeriodV;
        if (op.plotType === "scope") {
            ctx.strokeStyle = opts.color;
            ctx.beginPath();
            var xzero = st.xyOffx;
            var ycen = op.height - st.xyOffy - st.yAxeLen / 2;
            var inx = opts.stInx;
            var yGridLen = st.yAxeLen / op.yAxeGridAmt;
            var yOffset = st.yAxeLen * opts.offset / 1000;
            //============================================
            var timev = 0;
            var trigOffsLen = op.xAxeOffsV * st.xAxeLen / 1000;
            var maxY = op.height - st.xyOffy;
            var minY = op.height - st.xyOffy - st.yAxeLen;
            if (st.xoffs === null || st.xoffs === undefined) {
                st.xoffs = 0;
            }
            if (!st.sampleTime)
                st.sampleTime = op.xGridTime * 10 / op.sampleAmt;
            if (!st.centerSample)
                st.centerSample = op.sampleAmt / 2;
            if (op.run_f) {
                st.sampleTime = op.xGridTime * 10 / op.sampleAmt;
                st.centerSample = op.sampleAmt / 2;
                st.xoffs = trigOffsLen;
                var xoffs = st.xoffs - trigOffsLen;
            } else {
                var trigOffsTime = op.xGridTime * op.xAxeOffsV / 100;
                st.centerSample = op.sampleAmt / 2 - trigOffsTime / st.sampleTime;
                var len = st.xAxeLen * (op.sampleAmt - st.centerSample) * st.sampleTime / (10 * op.xGridTime);
                var xoffs = len - (st.xAxeLen / 2);

                /*        
                 var sampleWindow = st.sampleTime * op.sampleAmt;
                 var trigOffsTime = op.xGridTime * op.xAxeOffsV / 100;
                 var offsetCnt = trigOffsTime / st.sampleTime;
                 offsetCnt += op.sampleAmt / 2;
                 var xoffs = st.xAxeLen * (offsetCnt * st.sampleTime) / (op.xGridTime * 10);
                 xoffs -= st.xAxeLen / 2;
                 */

                //var offTime = (sampleWindow - (op.xGridTime * 10)) / 2;
                //var xoffs = st.xAxeLen * offTime / (op.xGridTime * 10);

            }

            var first_f = 0;
            for (var i = 0; i < op.sampleAmt; i++) {
                var xlen = st.xAxeLen - st.xAxeLen * timev / (op.xGridTime * 10);
                xlen += xoffs;
                timev += st.sampleTime;
                var vv = opts.buffer[inx];
                inx--;
                if (inx < 0)
                    inx += op.sampleSize;
                if (xlen > st.xAxeLen)
                    continue;
                if (xlen < 0)
                    break;

                var ylen = vv * yGridLen / opts.scale;
                var realY = ycen + ylen - yOffset;
                if (realY > maxY)
                    realY = maxY;
                if (realY < minY)
                    realY = minY;
                if (!first_f)
                    ctx.moveTo(xzero + xlen, realY);
                else
                    ctx.lineTo(xzero + xlen, realY);
                first_f = 1;
            }
            ctx.stroke();
            return;
        }


        ctx.strokeStyle = opts.color;
        ctx.beginPath();
        var x = st.xyOffx;
        var y = op.height - st.xyOffy;
        var inx;

        for (var i = 0; i < 1000; i++) {

            if ((i * op.xScale) >= op.xAxeTotalV)
                break;
            inx = opts.stInx + i;
            var vv = opts.buffer[inx + opts.xOffset * op.xScale];
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

    drawBufs(opts, bufObj, clr) {
        var self = this;
        var op = self.opts;
        var st = self.stas;
        var ctx = self.ctx1;
        var vrate = st.yAxeStrokePeriod / op.yAxePeriodV;
        if (clr)
            ctx.clearRect(0, 0, op.width, op.height);
        if (!opts.offOn_f)
            return;
        ctx.strokeStyle = opts.color;
        ctx.beginPath();
        var x = st.xyOffx;
        var y = op.height - st.xyOffy;
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

    chkWatch(optName) {
        var self = this;
        var md = self.md;
        var op = md.opts;
        var st = md.stas;

        if (optName === "grid_f") {
            self.drawAxe(1);
        }

    }
    frameTimer(self) {
        var plot = self.objs["plot"];
        if (!plot.opts.run_f)
            return;
        plot.drawClear();
        if (!plot.opts.testSinWave_f) {
            var opts = plot.opts.lines[0];
            plot.drawBufs(opts, plot.opts.bufs[0]);
            var opts = plot.opts.lines[1];
            plot.drawBufs(opts, plot.opts.bufs[0]);
            var opts = plot.opts.lines[2];
            plot.drawBufs(opts, plot.opts.bufs[0]);
            var opts = plot.opts.lines[3];
            plot.drawBufs(opts, plot.opts.bufs[0]);
            return;
        }

        //=========================================
        var opts = plot.opts.lines[0];
        opts.stInx += 1;
        if (opts.stInx >= 2000)
            opts.stInx -= 2000;
        plot.drawLine(opts);
        //=========================================
        var opts = plot.opts.lines[1];
        opts.stInx += 2;
        if (opts.stInx >= 2000)
            opts.stInx -= 2000;
        plot.drawLine(opts);
        //=========================================
        var opts = plot.opts.lines[2];
        opts.stInx += 3;
        if (opts.stInx >= 2000)
            opts.stInx -= 2000;
        plot.drawLine(opts);
        //=========================================
        var opts = plot.opts.lines[3];
        opts.stInx += 4;
        if (opts.stInx >= 2000)
            opts.stInx -= 2000;
        plot.drawLine(opts);
        //=========================================

    }

    drawAxe(clr) {
        var self = this;
        var op = self.opts;
        var st = self.stas;
        var ctx = self.ctx;
        if (clr) {
            st.axe_drawed_f = 0;
            st.gripOn_f = 0;
            st.xAxe_drawed_f = 0;
            st.yAxe_drawed_f = 0;
            ctx.clearRect(0, 0, self.opts.width, self.opts.height);

        }

        if (st.axe_drawed_f)
            return;
        st.axe_drawed_f = 1;
        //op.xGridTime = 2000 * op.xScale;


        op.messages = [];
        var mesObj = {};

        var unit = "ns";
        var value = op.xScale * 10 * op.xAxeOffsV / 1000;


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
        mesObj.y = op.height - st.xyOffy - st.yAxeLen;
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
        mesObj.y = op.height - st.xyOffy - st.yAxeLen;
        mesObj.text = vStr + " " + unit + "/";
        mesObj.color = "#fff";
        mesObj.font = "12px sans-serif";
        op.messages.push(mesObj);


        x = st.xyOffx;
        for (var i = 0; i < self.opts.lines.length; i++) {
            var opts = self.opts.lines[i];
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
            mesObj.y = op.height - st.xyOffy - st.yAxeLen;
            mesObj.text = (i + 1) + ":" + vStr + " " + unit + "/";
            mesObj.color = opts.color;
            mesObj.font = "12px sans-serif";
            op.messages.push(mesObj);
            var size = ctx.measureText(mesObj.text);
            x += size.width;



        }



        if (op.messages) {
            for (var i = 0; i < op.messages.length; i++) {
                var mesObj = op.messages[i];
                ctx.fillStyle = mesObj.color;
                ctx.font = mesObj.font;
                ctx.fillText(mesObj.text, mesObj.x, mesObj.y * st.hRate);
            }
        }

        op.plotType = "scope";
        op.axeGridAmt = 40;
        op.mainAxeColor = "#ccc";
        op.subAxeColor = "#444";
        op.centerAxeColor = "#fff";


        if (op.plotType === "scope") {
            ctx.strokeStyle = op.subAxeColor;
            //===============================
            ctx.lineWidth = op.axeWidth;
            ctx.beginPath();
            var x = st.xyOffx;
            var y = op.height - st.xyOffy;

            var xadd = st.xAxeLen / op.axeGridAmt;
            var yadd = st.yAxeLen / op.axeGridAmt;
            if (op.grid_f) {
                for (var i = 0; i < op.axeGridAmt + 1; i++) {
                    ctx.moveTo(x + xadd * i, y);
                    ctx.lineTo(x + xadd * i, y - st.yAxeLen);
                    ctx.moveTo(x, y - i * yadd);
                    ctx.lineTo(x + st.xAxeLen, y - i * yadd);
                }
            }
            ctx.stroke();
            //===============================


            ctx.strokeStyle = op.mainAxeColor;
            ctx.lineWidth = op.axeWidth;
            ctx.beginPath();
            var x = st.xyOffx;
            var y = op.height - st.xyOffy;
            var xadd = st.xAxeLen / op.xAxeGridAmt;
            var yadd = st.yAxeLen / op.yAxeGridAmt;
            for (var i = 0; i < op.yAxeGridAmt + 1; i++) {
                ctx.moveTo(x + xadd * i, y);
                ctx.lineTo(x + xadd * i, y - st.yAxeLen);
            }
            for (var i = 0; i < op.xAxeGridAmt + 1; i++) {
                ctx.moveTo(x, y - i * yadd);
                ctx.lineTo(x + st.xAxeLen, y - i * yadd);
            }
            ctx.stroke();
            //===============================
            ctx.strokeStyle = op.centerAxeColor;
            ctx.lineWidth = op.axeWidth;
            ctx.beginPath();
            var x = st.xyOffx;
            var y = op.height - st.xyOffy;
            var xadd = st.xAxeLen / 2;
            var yadd = st.yAxeLen / 2;
            ctx.moveTo(x + xadd * 1, y);
            ctx.lineTo(x + xadd * 1, y - st.yAxeLen);
            ctx.moveTo(x, y - 1 * yadd);
            ctx.lineTo(x + st.xAxeLen, y - 1 * yadd);
            ctx.stroke();
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
            var y = op.height - st.xyOffy - st.yAxeLen + 7;
            ctx.fillText(str, x, y);

            var xoff = st.xAxeLen * op.xAxeOffsV / 1000;
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
            var y = op.height - st.xyOffy - st.yAxeLen + 7;
            ctx.fillText(str, x, y);



            return;



        }



        var fontSize = 12;
        ctx.font = "" + fontSize + "px monospace";
        ctx.fillStyle = op.axeColor;
        ctx.strokeStyle = op.strokeColor;
        ctx.lineWidth = 1;
        ctx.fillRect(st.xyOffx, op.height - st.xyOffy, st.xAxeLen, 0.5);
        ctx.fillRect(st.xyOffx, op.height - st.xyOffy, 0.5, st.yAxeLen * -1);
        var x = st.xyOffx;
        var y = op.height - st.xyOffy;
        ctx.fillText(op.xUnit, x + st.xAxeLen + 4, y + fontSize + 2);
        var width = ctx.measureText(op.yUnit).width;
        ctx.fillText(op.yUnit, x - width - 4, y - st.yAxeLen - 4);


        //===========================================
        ctx.beginPath();
        var len = 0;
        var value = op.xAxeOffsV;
        var inx = 0;
        var nextTextX = x;
        var nextTextY = y;

        var addLen = st.xAxeStrokePeriod;
        var addValue = op.xAxePeriodV;
        if (op.xAxeOffsV !== 0) {
            var rest = parseInt(op.xAxeOffsV) % op.xAxePeriodV;
            if (rest >= 0) {
                var restV = op.xAxePeriodV - rest;
                var addLen = st.xAxeStrokePeriod * restV / op.xAxePeriodV;
                var addValue = restV;
            } else {
                var restV = rest * -1;
                var addLen = st.xAxeStrokePeriod * restV / op.xAxePeriodV;
                var addValue = restV;

            }
        }

        while (1) {
            len += addLen;
            if (len > st.xAxeLen)
                break;
            value += addValue;
            addLen = st.xAxeStrokePeriod;
            addValue = op.xAxePeriodV;

            ctx.moveTo(x + len, y);
            if ((value % st.xAxeMainPeriodV) !== 0) {
                if (st.xAxeStrokePeriod >= 5) {
                    ctx.lineTo(x + len, y - op.xAxeStrokeLen);
                }
            } else {
                var valueStr = "" + value;
                var width = ctx.measureText(valueStr).width;
                if (len < (st.xAxeLen - width / 2)) {
                    if ((x + len - (width / 2)) > nextTextX + 2) {
                        ctx.lineTo(x + len, y - op.xAxeMainStrokeLen);
                        ctx.fillText(valueStr, x + len - (width / 2), y + fontSize + 2);
                        nextTextX = x + len - (width / 2) + width;
                    }
                }
            }
            inx++;
        }
        ctx.stroke();
        //===========================================
        ctx.beginPath();
        var len = 0;
        var inx = 0;
        var value = op.yAxeOffsV;

        var addLen = st.yAxeStrokePeriod;
        var addValue = op.yAxePeriodV;
        if (op.yAxeOffsV !== 0) {
            var rest = parseInt(op.yAxeOffsV) % op.yAxePeriodV;
            if (rest >= 0) {
                var restV = op.yAxePeriodV - rest;
                var addLen = st.yAxeStrokePeriod * restV / op.yAxePeriodV;
                var addValue = restV;
            } else {
                var restV = rest * -1;
                var addLen = st.yAxeStrokePeriod * restV / op.yAxePeriodV;
                var addValue = restV;

            }
        }



        while (1) {
            len += addLen;
            if (len > st.yAxeLen)
                break;
            value += addValue;
            addLen = st.yAxeStrokePeriod;
            addValue = op.yAxePeriodV;
            ctx.moveTo(x, y - len);
            if ((value % st.yAxeMainPeriodV) !== 0) {
                if (st.yAxeStrokePeriod >= 5) {
                    ctx.lineTo(x + op.yAxeStrokeLen, y - len);
                }
            } else {
                var valueStr = "" + value;
                var size = ctx.measureText(valueStr);
                var width = ctx.measureText(valueStr).width;
                var ylen = y - len + -2 + fontSize / 2;
                if (nextTextY > ylen + fontSize) {
                    ctx.lineTo(x + op.yAxeMainStrokeLen, y - len);
                    ctx.fillText(valueStr, x - size.width - 4, ylen);
                    nextTextY = ylen;
                }
            }
            inx++;
        }
        ctx.stroke();
        //===========================================
        if (op.grid_f) {
            ctx.strokeStyle = op.gridColor;
            ctx.beginPath();
            var len = 0;
            var addLen = st.yAxeStrokePeriod;
            if (op.yAxeOffsV !== 0) {
                var rest = parseInt(op.yAxeOffsV) % op.yAxePeriodV;
                if (rest >= 0) {
                    var restV = op.yAxePeriodV - rest;
                    var addLen = st.yAxeStrokePeriod * restV / op.yAxePeriodV;
                } else {
                    var restV = rest * -1;
                    var addLen = st.yAxeStrokePeriod * restV / op.yAxePeriodV;
                }
            }
            while (1) {
                len += addLen;
                addLen = st.yAxeStrokePeriod;
                if (len > st.yAxeLen)
                    break;
                if (st.yAxeStrokePeriod < 5)
                    break;
                ctx.moveTo(x, y - len);
                ctx.lineTo(x + st.xAxeLen, y - len);
            }
            ctx.stroke();
            //===========================================
            ctx.beginPath();
            var len = 0;

            var addLen = st.xAxeStrokePeriod;
            if (op.xAxeOffsV !== 0) {
                var rest = parseInt(op.xAxeOffsV) % op.xAxePeriodV;
                if (rest >= 0) {
                    var restV = op.xAxePeriodV - rest;
                    var addLen = st.xAxeStrokePeriod * restV / op.xAxePeriodV;
                } else {
                    var restV = rest * -1;
                    var addLen = st.xAxeStrokePeriod * restV / op.xAxePeriodV;
                }
            }


            while (1) {
                //len += st.xAxeStrokePeriod;
                len += addLen;
                addLen = st.xAxeStrokePeriod;
                if (len > st.xAxeLen)
                    break;
                if (st.xAxeStrokePeriod < 5)
                    break;
                ctx.moveTo(x + len, y);
                ctx.lineTo(x + len, y - st.yAxeLen);
            }
            ctx.stroke();
        }

        if (op.centerLine_f) {
            ctx.strokeStyle = op.centerLineColor;
            ctx.beginPath();
            var len = (op.centerLineV - op.yAxeOffsV) * st.yPixelDivUnit;
            ctx.moveTo(x, y - len);
            ctx.lineTo(x + st.xAxeLen, y - len);
            ctx.stroke();
        }


    }

}









class MyScope {
    static init() {
        var bobj = gr.compOpts["scope"] = {};
        var sobj = bobj["subOpts"] = {};
        var dsc = bobj["optsDsc"] = {};
        if ("base") {
        }
        //==================================================
        var obj = sobj["sys"] = {};
        if ("scope~sys") {
            obj.bufferSize = 2000;
            dsc.bufferSize = sys.setOptsSet("bufferSize", "num", "inputNumber");
            obj.powerOn_f = 0;
            dsc.powerOn_f = sys.setOptsSet("powerOn_f", "flag", "inputBoolean");
            obj.grid_f = 1;
            dsc.grid_f = sys.setOptsSet("grid_f", "flag", "inputBoolean");
            obj.run_f = 0;
            dsc.run_f = sys.setOptsSet("run_f", "flag", "inputBoolean");
            obj.testSinWave_f = 1;
            dsc.testSinWave_f = sys.setOptsSet("testSinWave_f", "flag", "inputBoolean");
            obj.centerLine_f = 1;
            dsc.centerLine_f = sys.setOptsSet("centerLine_f", "flag", "inputBoolean");
            obj.axeWidth = 0.5;
            dsc.axeWidth = sys.setOptsSet("axeWidth", "ratio", "inputFloat");


            //===
            obj["group~colors"] = [0, "mainAxeColor", "subAxeColor", "gridColor", "centerLineColor"];
            obj.mainAxeColor = "#aaa";
            dsc.mainAxeColor = sys.setOptsSet("mainAxeColor", "color", "selectColor");
            obj.subAxeColor = "#444";
            dsc.subAxeColor = sys.setOptsSet("subAxeColor", "color", "selectColor");

            //obj.strokeColor = "#fff";
            //dsc.strokeColor = sys.setOptsSet("strokeColor", "color", "selectColor");
            //obj.gridColor = "rgba(0,0,0,0.5)";
            //dsc.gridColor = sys.setOptsSet("gridColor", "color", "selectColor");
            obj.centerLineColor = "#fff";
            dsc.centerLineColor = sys.setOptsSet("centerLineColor", "color", "selectColor");
            //===============
            obj.xAxeOffsV = 0;
            dsc.xAxeOffsV = sys.setOptsSet("xAxeOffsV", "num", "inputNumber");
            obj.xScale = 1000000;//unit=ns;
            dsc.xScale = sys.setOptsSet("xScale", "ratio", "inputFloat");
            obj["group~X-Axile"] = [0, "xyOffx", "xAxeLen", "xAxeGridAmt", "xSubAxeGridAmt"];
            obj.xyOffx = 50;    //total 1000    //origin point x 
            dsc.xyOffx = sys.setOptsSet("xyOffx", "num", "inputNumber");
            obj.xAxeLen = 900;  //total 1000    //x axile len rate    
            dsc.xAxeLen = sys.setOptsSet("xAxeLen", "num", "inputNumber");
            obj.xAxeGridAmt = 10;
            dsc.xAxeGridAmt = sys.setOptsSetFix("xAxeGridAmt", "nature1");
            obj.xSubAxeGridAmt = 5;
            dsc.xSubAxeGridAmt = sys.setOptsSetFix("xSubAxeGridAmt", "nature1");
            //===============
            obj["group~Y-Axile"] = [0, "xyOffy", "yAxeLen", "yAxeGridAmt", "ySubAxeGridAmt"];
            obj.xyOffy = 50;    //total 1000    //origin point y 
            dsc.xyOffy = sys.setOptsSet("xyOffy", "num", "inputNumber");
            obj.yAxeLen = 900;
            dsc.yAxeLen = sys.setOptsSet("yAxeLen", "num", "inputNumber");
            obj.yAxeGridAmt = 10;
            dsc.yAxeGridAmt = sys.setOptsSetFix("yAxeGridAmt", "nature1");
            obj.ySubAxeGridAmt = 5;
            dsc.ySubAxeGridAmt = sys.setOptsSetFix("ySubAxeGridAmt", "nature1");



            //===============
            obj.messages = [];
            var mesObj = {};
            mesObj.x = 500;
            mesObj.y = 20;
            mesObj.text = "title";
            mesObj.color = "#0f0";
            mesObj.font = "20px monospace";
            obj.messages.push(mesObj);




            dsc.messages = sys.setOptsSet("messages", "object~array", "setObject~array");
            dsc.messages.sons = [];
            dsc.messages.sons.push(sys.setOptsSet("x", "num", "inputNumber"));
            dsc.messages.sons.push(sys.setOptsSet("y", "num", "inputNumber"));
            dsc.messages.sons.push(sys.setOptsSet("text", "str", "inputText"));
            dsc.messages.sons.push(sys.setOptsSet("color", "color", "selectColor"));
            dsc.messages.sons.push(sys.setOptsSet("font", "str", "inputText"));
            //===============
            obj.sampleUnit = "ns";
            dsc.sampleUnit = sys.setOptsSetFix("sampleUnit", "textAlign");
            dsc.sampleUnit.enum = ["ns", "us", "ms", "s"];

            obj.sampleAmt = 1000;
            dsc.sampleAmt = sys.setOptsSetFix("sampleAmt", "nature1");
            obj.sampleSize = 2000;
            dsc.sampleSize = sys.setOptsSetFix("sampleSize", "nature1");

            obj.ySubAxeGridAmt = 5;
            dsc.ySubAxeGridAmt = sys.setOptsSetFix("ySubAxeGridAmt", "nature1");















            obj.lines = [];
            obj.end = 1;
            obj.bufs = [0, 0, 0, 0];
            //===============
            var lineObj = {};
            var buffer = [];
            for (var i = 0; i < obj.sampleSize; i++) {
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
            obj.lines.push(lineObj);
            //=======================
            var lineObj = {};
            var buffer = [];
            for (var i = 0; i < obj.sampleSize; i++) {
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
            obj.lines.push(lineObj);
            //=======================
            var lineObj = {};
            var buffer = [];
            for (var i = 0; i < obj.sampleSize; i++) {
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
            obj.lines.push(lineObj);
            //=======================
            var lineObj = {};
            var buffer = [];
            for (var i = 0; i < obj.sampleSize; i++) {
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
            obj.lines.push(lineObj);
            //=======================
            dsc.lines = sys.setOptsSet("lines", "object~array", "setObject~array");
            dsc.lines.sons = [];
            dsc.lines.sons.push(sys.setOptsSet("offOn_f", "flag", "inputBoolean"));
            dsc.lines.sons.push(sys.setOptsSet("name", "str", "inputText"));
            dsc.lines.sons.push(sys.setOptsSet("color", "color", "selectColor"));
            dsc.lines.sons.push(sys.setOptsSet("offset", "num", "inputNumber"));
            dsc.lines.sons.push(sys.setOptsSet("scale", "ratio", "inputFloat"));
            dsc.lines.sons.push(sys.setOptsSet("unit", "str", "inputText"));
            dsc.lines.sons.push(sys.setOptsSet("stInx", "num", "inputNumber"));
            dsc.lines.sons.push(sys.setOptsSet("buffer", "ratio~array", "system"));

        }
    }

    constructor(_name, _type, _opts, _paras) {
        this.name = _name;
        this.type = _type;
        this.opts = this.initOpts();
        this.paras = this.initParas();
        this.kid = KvLib.genKid();
        this.stas = {};
        this.elems = {};
        this.objs = {};
        this.watch = {};
        this.inputRegs = [];
        //=============================
        this.layout = null;
        this.fatherMd = null;
        //==============================
        KvLib.deepCoverObject(this.opts, _opts);
        KvLib.coverObject(this.paras, _paras);
        // gr.kidMap.set(this.kid, this);
    }
    initOpts() {
        var self = this;
        var obj = {};
        var strA = this.type.split("~");
        this.baseType = strA[0];
        this.subType = strA[1];
        this.s0Type = strA[2];
        this.s1Type = strA[3];
        this.s2Type = strA[4];
        return MyScope.getOpts(this.baseType, this.subType);
    }
    static getOpts(baseType, subType) {
        var opts = {};
        var bopts = gr.compOpts[baseType];
        if (bopts) {
            KvLib.deepCoverObject(opts, bopts);
            var sopts = bopts["subOpts"][subType];
            if (sopts)
                KvLib.deepCoverObject(opts, sopts);
        }
        return opts;
    }

    chkWatch(optName) {
        var self = this;
        var md = self.md;
        var op = md.opts;
        var st = md.stas;

        if (optName === "grid_f") {
            self.drawAxe(1);
        }

    }

    initParas() {
        var paras = {};
        return paras;
    }
    build() {
        var self = this;
        var op = self.opts;
        var st = self.stas;
        //==
        st.wRate = op.width / 1000.0;
        st.hRate = op.height / 1000.0;
        st.xAxeLen = op.xAxeLen * st.wRate;
        st.yAxeLen = op.yAxeLen * st.hRate;
        st.xyOffx = op.xyOffx * st.wRate;
        st.xyOffy = op.xyOffy * st.hRate;
        //==
        st.xAxeStrokeCnt = (op.xAxeTotalV) / op.xAxePeriodV;
        st.xAxeStrokePeriod = (st.xAxeLen - 10) / st.xAxeStrokeCnt;
        st.xAxeMainPeriodV = op.xAxeMainPeriodCnt * op.xAxePeriodV;
        st.xPixelDivUnit = (st.xAxeLen - 10) / (op.xAxeTotalV);
        //==
        st.yAxeStrokeCnt = (op.yAxeTotalV) / op.yAxePeriodV;
        st.yAxeStrokePeriod = (st.yAxeLen - 10) / st.yAxeStrokeCnt;
        st.yAxeMainPeriodV = op.yAxeMainPeriodCnt * op.yAxePeriodV;
        st.yPixelDivUnit = (st.yAxeLen - 10) / (op.yAxeTotalV);

    }
    create() {
        var self = this;
        var op = self.opts;
        self.baseElem = document.getElementById(op.baseId);
        
        var selem = document.createElement("canvas");
        selem.id = op.baseId + "_canvas";
        selem.width = op.width;
        selem.height = op.height;
        selem.style.position = "absolute";
        selem.style.left = 0 + "px";
        selem.style.top = 0 + "px";
        selem.style.zIndex = "0";
        selem.style.width = "100%";
        selem.style.height = "100%";
        self.baseElem.appendChild(selem);
        self.canvas = selem;
        if (!op.powerOn_f)
            return;
        //=========================================
        var selem = document.createElement("canvas");
        selem.id = op.baseId + "_canvasLy1";
        selem.width = op.width;
        selem.height = op.height;
        selem.style.position = "absolute";
        selem.style.left = 0 + "px";
        selem.style.top = 0 + "px";
        selem.style.zIndex = "1";
        selem.style.width = "100%";
        selem.style.height = "100%";
        self.baseElem.appendChild(selem);
        self.canvasLy1 = selem;
        //=========================================
        if (!self.canvas.getContext)
            return;
        if (!self.canvasLy1.getContext)
            return;
        self.ctx = self.canvas.getContext('2d');
        self.ctx1 = self.canvasLy1.getContext('2d');
        self.createScope();
    }
    createScope(editObj) {
        var self = this;
        var op = self.opts;
        var ctx = self.ctx;
        if (editObj) {
            if (editObj.setName === "xScale") {
                op.xAxeOffsV = op.xAxeOffsV * editObj.preValue / editObj.newValue;


            }
        }
        self.drawAxe(1);
        self.drawClear();
        if (op.testSinWave_f) {
            for (var i = 0; i < self.opts.lines.length; i++) {
                var opts = self.opts.lines[i];
                self.drawLine(opts);
            }
        } else {
            for (var i = 0; i < self.opts.bufs.length; i++) {
                var opts = self.opts.lines[i];
                self.drawBufs(opts, self.opts.bufs[i]);
            }
        }

    }

    clearScr() {
        var self = this;
        var op = self.opts;
        var st = self.stas;
        var ctx = self.ctx1;
        ctx.clearRect(0, 0, self.opts.width, self.opts.height);
    }
    clearAll() {
        var self = this;
        var op = self.opts;
        var st = self.stas;
        var ctx1 = self.ctx1;
        var ctx = self.ctx;
        ctx.clearRect(0, 0, self.opts.width, self.opts.height);
        ctx1.clearRect(0, 0, self.opts.width, self.opts.height);
    }
    drawClear() {
        var self = this;
        var op = self.opts;
        var ctx = self.ctx1;
        ctx.clearRect(0, 0, op.width, op.height);
    }
    drawLine(opts, clr) {
        var self = this;
        var op = self.opts;
        var st = self.stas;
        var ctx = self.ctx1;
        if (clr)
            ctx.clearRect(0, 0, op.width, op.height);
        if (!opts.offOn_f)
            return;

        ctx.strokeStyle = opts.color;
        ctx.beginPath();
        var xzero = st.xyOffx;
        var ycen = op.height - st.xyOffy - st.yAxeLen / 2;
        var yGridLen = st.yAxeLen / op.yAxeGridAmt;
        var yOffset = st.yAxeLen * opts.offset / 1000;
        //============================================
        var maxY = op.height - st.xyOffy;
        var minY = op.height - st.xyOffy - st.yAxeLen;
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
        var self = this;
        var op = self.opts;
        var st = self.stas;
        var ctx = self.ctx1;
        var vrate = st.yAxeStrokePeriod / op.yAxePeriodV;
        if (clr)
            ctx.clearRect(0, 0, op.width, op.height);
        if (!opts.offOn_f)
            return;
        ctx.strokeStyle = opts.color;
        ctx.beginPath();
        var x = st.xyOffx;
        var y = op.height - st.xyOffy;
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

    chkWatch(optName) {
        var self = this;
        if (optName === "grid_f") {
            self.drawAxe(1);
        }

    }
    
    frameTimer(self) {
        var scope = self.objs["scope"];
        if (!scope.opts.run_f)
            return;
        scope.drawClear();
        if (!scope.opts.testSinWave_f) {
            var opts = scope.opts.lines[0];
            scope.drawBufs(opts, scope.opts.bufs[0]);
            var opts = scope.opts.lines[1];
            scope.drawBufs(opts, scope.opts.bufs[0]);
            var opts = scope.opts.lines[2];
            scope.drawBufs(opts, scope.opts.bufs[0]);
            var opts = scope.opts.lines[3];
            scope.drawBufs(opts, scope.opts.bufs[0]);
            return;
        }

        //=========================================
        var opts = scope.opts.lines[0];
        opts.stInx += 1;
        if (opts.stInx >= 2000)
            opts.stInx -= 2000;
        scope.drawLine(opts);
        //=========================================
        var opts = scope.opts.lines[1];
        opts.stInx += 2;
        if (opts.stInx >= 2000)
            opts.stInx -= 2000;
        scope.drawLine(opts);
        //=========================================
        var opts = scope.opts.lines[2];
        opts.stInx += 3;
        if (opts.stInx >= 2000)
            opts.stInx -= 2000;
        scope.drawLine(opts);
        //=========================================
        var opts = scope.opts.lines[3];
        opts.stInx += 4;
        if (opts.stInx >= 2000)
            opts.stInx -= 2000;
        scope.drawLine(opts);
        //=========================================

    }

    drawAxe(clr) {
        var self = this;
        var op = self.opts;
        var st = self.stas;
        var ctx = self.ctx;
        if (clr) {
            st.axe_drawed_f = 0;
            st.gripOn_f = 0;
            st.xAxe_drawed_f = 0;
            st.yAxe_drawed_f = 0;
            ctx.clearRect(0, 0, self.opts.width, self.opts.height);

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
        mesObj.y = op.height - st.xyOffy - st.yAxeLen;
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
        mesObj.y = op.height - st.xyOffy - st.yAxeLen;
        mesObj.text = vStr + " " + unit + "/";
        mesObj.color = "#fff";
        mesObj.font = "12px sans-serif";
        op.messages.push(mesObj);


        x = st.xyOffx;
        for (var i = 0; i < self.opts.lines.length; i++) {
            var opts = self.opts.lines[i];
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
            mesObj.y = op.height - st.xyOffy - st.yAxeLen;
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

        //op.axeGridAmt = 40;
        //op.mainAxeColor = "#ccc";
        //op.subAxeColor = "#444";
        //op.xSubAxeGridAmt=5;
        //op.ySubAxeGridAmt=5;

        ctx.strokeStyle = op.subAxeColor;
        //===============================
        ctx.lineWidth = op.axeWidth;
        ctx.beginPath();
        var x = st.xyOffx;
        var y = op.height - st.xyOffy;

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
        var y = op.height - st.xyOffy;
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
            var y = op.height - st.xyOffy;
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
        var y = op.height - st.xyOffy - st.yAxeLen + 7;
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
        var y = op.height - st.xyOffy - st.yAxeLen + 7;
        ctx.fillText(str, x, y);



        return;









    }

}





//===========================================
class Md_scope {
    constructor() {
    }
    initOpts(md) {
        var self = this;
        var obj = {};
        return obj;
    }
    afterCreate() {
        var self = this;
        var md = self.md;
        var op = md.opts;
        var st = md.stas;
        var sta3Obj = md.compRefs["status3"];
        sys.setInputWatch(sta3Obj, "directName", "ani.dispFs", "innerText");

        var plotObj = md.compRefs["scope"];
        var plotCtr = md.modelRefs["plotCtr"];
        plotCtr.stas.plot = plotObj;



    }
    chkWatch() {
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
        var cname = "c";
        var opts = {};
        opts.xc = 1;
        opts.yc = 2;
        opts.ihO = {};
        opts.ihO.c0 = 9999;
        opts.ihO.c1 = 24;
        layouts[cname] = {name: cname, type: "base", opts: opts};
        lyMap.set("body", cname);
        //======================================================================
        var cname = lyMap.get("body") + "~" + 0;
        var opts = {};
        opts.xc = 2;
        opts.iwO = {};
        opts.iwO.c0 = 9999;
        opts.iwO.c1 = 200;
        layouts[cname] = {name: cname, type: "base", opts: opts};
        lyMap.set("bodyUp", cname);
        //======================================================================
        var cname = lyMap.get("bodyUp") + "~" + 0;
        var opts = {};
        comps[cname] = {name: "scope", type: "scope~sys", opts: opts};
        //======================================================================
        var cname = lyMap.get("bodyUp") + "~" + 1;
        var opts = {};
        models[cname] = {name: "plotCtr", type: "Md_plotCtr~sys", opts: opts};
        //======================================================================
        var cname = lyMap.get("body") + "~" + 1;
        mac.setFootBar(layouts, lyMap, comps, cname);
    }
}
//===========================================



//===========================================
class Md_scopeXXX {
    constructor() {
    }
    initOpts(md) {
        var self = this;
        var obj = {};
        obj.knobName = "";
        obj.chInx = 0;
        obj.powerOn_f = 0;
        obj.grid_f = 1;
        obj.run_f = 0;
        return obj;
    }
    afterCreate() {
        var self = this;
        var md = self.md;
        var op = md.opts;
        var st = md.stas;
        var sta3Obj = md.compRefs["status3"];
        sys.setInputWatch(sta3Obj, "directName", "ani.dispFs", "innerText");


        var obj = md.compRefs["powerButton"];
        if (obj) {
            st.powerButtonColor = "#000";
            sys.setInputWatch(obj, "directName", "self.fatherMd.stas.powerButtonColor", "innerTextColor");
        }
        //
        var obj = md.compRefs["gridButton"];
        if (obj) {
            st.gridButtonColor = "#000";
            sys.setInputWatch(obj, "directName", "self.fatherMd.stas.gridButtonColor", "innerTextColor");
        }
        var obj = md.compRefs["startButton"];
        if (obj) {
            st.startButtonColor = "#000";
            sys.setInputWatch(obj, "directName", "self.fatherMd.stas.startButtonColor", "innerTextColor");
        }



    }
    chkWatch() {
        var self = this;
        var md = self.md;
        var op = md.opts;
        var st = md.stas;
        if (op.powerOn_f) {
            st.powerButtonColor = "#0c0";
            if (op.grid_f)
                st.gridButtonColor = "#0c0";
            else
                st.gridButtonColor = "#000";
            if (!op.run_f) {
                st.startButtonColor = "#000";
            } else {
                st.startButtonColor = "#0c0";
            }

        } else {
            st.powerButtonColor = "#000";
            st.gridButtonColor = "#000";
            st.startButtonColor = "#000";
        }
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
        var actionFunc = function (iobj) {
            console.log(iobj);
            var kvObj = iobj.kvObj;
            var name = kvObj.name;
            if (iobj.act === "itemClick") {
                return;
            }
            if (iobj.act === "valueChange") {
                return;
            }
            if (iobj.act === "click") {
                if (name === "exitButton") {
                    sys.popOff(2);
                    return;
                }
                var scope = md.compRefs["scope"];
                if (name === "gridButton") {
                    scope.opts.scope__grid_f ^= 1;
                    sys.setWatch(scope, "scope__grid_f", scope.opts.scope__grid_f);
                    return;
                }
                if (name === "startButton") {
                    scope.opts.scope__run_f ^= 1;
                    sys.setWatch(scope, "scope__run_f", scope.opts.scope__run_f);
                    if (scope.opts.scope__run_f)
                        kvObj.opts.innerText = '<i class="material-icons">&#xe034;</i>';
                    else
                        kvObj.opts.innerText = '▶';
                    kvObj.reCreate();
                    return;
                }
                if (name === "stopButton") {
                    return;
                }
            }
            return;
        };


        var cname = "c";
        var opts = {};
        opts.xc = 1;
        opts.yc = 2;
        opts.ihO = {};
        opts.ihO.c0 = 9999;
        opts.ihO.c1 = 24;
        layouts[cname] = {name: cname, type: "base", opts: opts};
        lyMap.set("body", cname);
        //======================================================================
        var cname = lyMap.get("body") + "~" + 0;
        var opts = {};
        opts.xc = 2;
        opts.iwO = {};
        opts.iwO.c0 = 9999;
        opts.iwO.c1 = 200;
        layouts[cname] = {name: cname, type: "base", opts: opts};
        lyMap.set("bodyUp", cname);
        //======================================================================
        var cname = lyMap.get("bodyUp") + "~" + 1;
        var opts = {};
        opts.yc = 3;
        opts.ihO = {};
        opts.ihO.c0 = 100;
        opts.ihO.c1 = 240;
        opts.ihO.c2 = 9999;
        opts.ym = 10;
        layouts[cname] = {name: cname, type: "base", opts: opts};
        lyMap.set("bodyRight", cname);
        md.opts.layoutGroups[cname] = {color: "#222"};
        //======================================================================
        var cname = lyMap.get("bodyRight") + "~" + 0;
        var opts = {};
        opts.xc = 2;
        opts.yc = 2;
        layouts[cname] = {name: cname, type: "base", opts: opts};
        lyMap.set("bodyRight0", cname);
        //======================================================================
        var cname = lyMap.get("bodyRight0") + "~" + 0;
        var opts = {};
        opts.innerText = '<i class="gf">&#xe3ec;</i>';
        opts.hint = "Grid";
        opts.clickFunc = function () {
            if (!op.powerOn_f)
                return;
            op.grid_f ^= 1;
            var cobj = md.compRefs["scope"];
            sys.setWatch(cobj, "scope__grid_f", op.grid_f);
        };
        comps[cname] = {name: "gridButton", type: "button~sys", opts: opts};
        //======================================================================
        var cname = lyMap.get("bodyRight0") + "~" + 1;
        var opts = {};
        opts.innerText = '<i class="gf">&#xe8ac;</i>';
        opts.hint = "Power";
        opts.clickFunc = function () {
            op.powerOn_f ^= 1;
            var cobj = md.compRefs["scope"];
            cobj.opts.powerOn_f = op.powerOn_f;
            cobj.reCreate();
        };
        comps[cname] = {name: "powerButton", type: "button~sys", opts: opts};
        //======================================================================
        var cname = lyMap.get("bodyRight0") + "~" + 2;
        var opts = {};
        opts.innerText = '▶';
        opts.clickFunc = function () {
            if (!op.powerOn_f)
                return;
            op.run_f ^= 1;
        };
        comps[cname] = {name: "startButton", type: "button~sys", opts: opts};
        //======================================================================
        var cname = lyMap.get("bodyRight0") + "~" + 3;
        var opts = {};
        opts.clickFunc = actionFunc;
        opts.innerText = '<i class="gf">&#xe3e7;</i>';
        opts.hint = "Trig";
        comps[cname] = {name: "trigButton", type: "button~sys", opts: opts};
        //======================================================================
        var cname = lyMap.get("bodyRight") + "~" + 1;
        var opts = {};
        opts.title = "";

        models[cname] = {name: "tuner", type: "Md_tuner", opts: opts};
        //======================================================================
        var cname = lyMap.get("bodyRight") + "~" + 2;
        var opts = {};
        opts.yc = 2;
        opts.ihO = {};
        opts.ihO.c0 = 150;
        opts.ihO.c1 = 9999;
        opts.ym = 6;
        layouts[cname] = {name: cname, type: "base", opts: opts};
        lyMap.set("pnR2", cname);

        var cname = lyMap.get("pnR2") + "~" + 0;
        var opts = {};
        opts.xc = 2;
        opts.yc = 5;
        layouts[cname] = {name: cname, type: "base", opts: opts};
        lyMap.set("pnButtonsA", cname);

        var cname = lyMap.get("pnR2") + "~" + 1;
        var opts = {};
        opts.yc = 8;
        layouts[cname] = {name: cname, type: "base", opts: opts};
        lyMap.set("pnButtonsB", cname);




        for (var i = 0; i < 10; i++) {
            var cname = lyMap.get("pnButtonsA") + "~" + i;
            var opts = {};
            opts.maxByte = 12;
            opts.fontSize = "fixWidth";
            switch (i) {
                case 0:
                    opts.innerText = 'X-offset';
                    break;
                case 1:
                    opts.innerText = 'X-scale';
                    break;
                case 2:
                    opts.innerText = 'CH1-offset';
                    break;
                case 3:
                    opts.innerText = 'CH1-scale';
                    break;
                case 4:
                    opts.innerText = 'CH2-offset';
                    break;
                case 5:
                    opts.innerText = 'CH2-scale';
                    break;
                case 6:
                    opts.innerText = 'CH3-offset';
                    break;
                case 7:
                    opts.innerText = 'CH3-scale';
                    break;
                case 8:
                    opts.innerText = 'CH4-offset';
                    break;
                case 9:
                    opts.innerText = 'CH4-scale';
                    break;





            }
            comps[cname] = {name: "scaleButton~" + i, type: "button~sys", opts: opts};
        }

        for (var i = 0; i < 7; i++) {
            var cname = lyMap.get("pnButtonsB") + "~" + i;
            var opts = {};
            opts.maxByte = 12;
            opts.fontSize = "fixWidth";
            switch (i) {
                case 0:
                    opts.innerText = '脈波';
                    break;
                case 1:
                    opts.innerText = '本機輸入功率';
                    break;
                case 2:
                    opts.innerText = '遙控輸入功率';
                    break;
                case 3:
                    opts.innerText = '前置放大器輸出功率';
                    break;
                case 4:
                    opts.innerText = '驅動放大器輸出功率';
                    break;
                case 5:
                    opts.innerText = '順向輸出功率';
                    break;
                case 6:
                    opts.innerText = '反向輸出功率';
                    break;
            }
            if (op.chInx === i) {
                opts.insideShadowColor = "#00f";
                opts.insideShadowBlur = "0.5rh";
            }
            opts.clickFunc = function (iobj) {
                console.log(iobj);
                var name = iobj.kvObj.name;
                var strA = name.split("~");
                op.chInx = parseInt(strA[1]);
                md.reCreate();


            };
            comps[cname] = {name: "chButton~" + i, type: "button~sys", opts: opts};
        }


        //======================================================================

        var cname = lyMap.get("bodyUp") + "~" + 0;
        var opts = {};
        comps[cname] = {name: "scope", type: "scope~sys", opts: opts};
        //======================================================================
        var cname = lyMap.get("body") + "~" + 1;
        mac.setFootBar(layouts, lyMap, comps, cname);
    }
}
//===========================================


//===========================================
class Md_plotCtr {
    constructor() {
    }

    initSetObjs() {
        var self = this;
        var md = self.md;
        var op = md.opts;

        var setObjs = [];
        for (var i = 0; i < 4; i++) {
            var setObj = {};
            setObj.name = "CH " + (i + 1);
            setObj.value = 0;
            if (op.chOffOnA[i])
                setObj.value = 1;
            setObj.setType = "buttonAction";
            setObj.titleWidth = 40;
            if (i === 0)
                setObj.onColor = "#f00";
            if (i === 1)
                setObj.onColor = "#0f0";
            if (i === 2)
                setObj.onColor = "#ff0";
            if (i === 3)
                setObj.onColor = "#0ff";

            setObj.dataType = "flag";
            setObj.showName_f = 1;
            setObj.showDataType_f = 0;
            setObjs.push(setObj);
        }
        for (var i = 0; i < 2; i++) {
            var setObj = {};
            setObj.value = 0;
            if (i === 0) {
                setObj.name = "X-offset";
                setObj.value = 0;
                setObj.unit = "ns";
                setObj.unitK = "us";
                setObj.unitM = "ms";
                setObj.unitKM = "s";
                setObj.fixed = 2;
            }
            if (i === 1) {
                setObj.name = "X-scale&nbsp;";
                setObj.value = 1000000;
                setObj.unit = "ns";
                setObj.unitK = "us";
                setObj.unitM = "ms";
                setObj.unitKM = "s";
                setObj.mulFixA_f = 1;
                setObj.fixed = 2;
                setObj.min = 1;
            }
            setObj.setType = "buttonAction";
            setObj.titleWidth = 80;
            setObj.onColor = "#ccc";
            setObj.dataType = "float";
            setObj.showName_f = 1;
            setObj.showDataType_f = 0;

            setObjs.push(setObj);


        }

        for (var i = 0; i < 4; i++) {
            if (op.chOffOnA[i]) {
                for (var j = 0; j < 2; j++) {
                    var setObj = {};
                    if (j === 0) {
                        setObj.name = "CH" + (i + 1) + " offset";
                        setObj.value = op.chOffsetA[i];
                        setObj.muls = [1, 10, 100];
                        setObj.mulInx = 1;
                    }
                    if (j === 1) {
                        setObj.name = "CH" + (i + 1) + " scale&nbsp;";
                        setObj.value = op.chScaleA[i];
                        setObj.unit = "mv";
                        setObj.unitK = "V";
                        setObj.mulFixA_f = 1;
                        setObj.fixed = 2;
                        setObj.min = 0.1;
                        setObj.max = 1000000;
                    }
                    setObj.setType = "buttonAction";
                    setObj.titleWidth = 80;
                    setObj.onColor = "#ccc";
                    setObj.dataType = "float";
                    setObj.showName_f = 1;
                    setObj.showDataType_f = 0;
                    setObjs.push(setObj);
                }
            }
        }
        op.setObjs = setObjs;
    }

    initOpts(md) {
        var self = this;
        var opts = {};
        opts.chOffOnA = [0, 0, 0, 0];
        opts.chOffsetA = [0, 0, 0, 0];
        opts.chScaleA = [0, 0, 0, 0];
        return opts;
    }
    afterCreate() {
        var self = this;
        var md = self.md;
        var op = md.opts;
        var st = md.stas;
        var obj = md.compRefs["powerButton"];
        if (obj) {
            st.powerButtonColor = "#000";
            sys.setInputWatch(obj, "directName", "self.fatherMd.stas.powerButtonColor", "innerTextColor");
        }
        //
        var obj = md.compRefs["gridButton"];
        if (obj) {
            st.gridButtonColor = "#000";
            sys.setInputWatch(obj, "directName", "self.fatherMd.stas.gridButtonColor", "innerTextColor");
        }
        var obj = md.compRefs["startButton"];
        if (obj) {
            st.startButtonColor = "#000";
            sys.setInputWatch(obj, "directName", "self.fatherMd.stas.startButtonColor", "innerTextColor");
        }


    }

    chkWatch() {
        var self = this;
        var md = self.md;
        var op = md.opts;
        var st = md.stas;
        var scope = md.fatherMd.compRefs["scope"];
        if (!scope.opts.powerOn_f) {
            st.powerButtonColor = "#000";
            st.gridButtonColor = "#000";
            st.startButtonColor = "#000";
        } else {
            st.powerButtonColor = "#00f";
            if (!scope.opts.grid_f)
                st.gridButtonColor = "#000";
            else
                st.gridButtonColor = "#00f";
            if (!scope.opts.run_f)
                st.startButtonColor = "#000";
            else
                st.startButtonColor = "#00f";

        }




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
        self.initSetObjs();
        var actionFunc = function (iobj) {
            console.log(iobj);
            var kvObj = iobj.kvObj;
            var name = kvObj.name;
            if (iobj.act === "valueChange") {
                var tunerObj = kvObj;
                var ctrObj = tunerObj.fatherMd;
                var scopeBox = ctrObj.fatherMd;
                var scopeObj = scopeBox.compRefs["scope"];
                var scope = scopeObj.objs["scope"];
                var nowEditLineObj = tunerObj.stas.editLineObj;
                var value = tunerObj.opts.setObj.value;
                var name = tunerObj.opts.setObj.name;
                nowEditLineObj.opts.setObj.value = value;
                nowEditLineObj = nowEditLineObj.reCreate();
                tunerObj.stas.editLineObj = nowEditLineObj;


                if (name.includes("X-offset")) {
                    scopeObj.opts.xAxeOffsV = value;
                    scope.opts.xAxeOffsV = value;
                    scope.opts.lines[0].xOffset = value;
                    scope.opts.lines[1].xOffset = value;
                    scope.opts.lines[2].xOffset = value;
                    scope.opts.lines[3].xOffset = value;
                    scope.createScope();
                    return;
                }

                if (name.includes("X-scale")) {
                    scopeObj.opts.xScale = value;
                    scope.opts.xScale = value;
                    scope.createScope();
                    return;
                }


                var fg = 0;
                if (name.includes("CH1 offset"))
                    fg = 1;
                if (name.includes("CH2 offset"))
                    fg = 2;
                if (name.includes("CH3 offset"))
                    fg = 3;
                if (name.includes("CH4 offset"))
                    fg = 4;
                if (fg) {
                    scopeObj.opts.lines[fg - 1].offset = value;
                    scope.opts.lines[fg - 1].offset = value;
                    scope.clearAll();
                    scope.build();
                    scope.createScope();
                    return;
                }

                var fg = 0;
                if (name.includes("CH1 scale"))
                    fg = 1;
                if (name.includes("CH2 scale"))
                    fg = 2;
                if (name.includes("CH3 scale"))
                    fg = 3;
                if (name.includes("CH4 scale"))
                    fg = 4;
                if (fg) {
                    scopeObj.opts.lines[fg - 1].scale = value;
                    scope.opts.lines[fg - 1].scale = value;
                    scope.clearAll();
                    scope.build();
                    scope.createScope();
                    return;
                }
                return;
            }
            if (iobj.act === "click") {
                if (name === "buttonAction") {
                    var editLineObj = kvObj.fatherMd;
                    var plotCtr = editLineObj.fatherMd;
                    var scopeObj = plotCtr.fatherMd.compRefs["scope"];
                    if (!scopeObj.opts.powerOn_f)
                        return;
                    var tunerObj = plotCtr.modelRefs['tuner'];
                    var scope = scopeObj.objs["scope"];
                    plotCtr.stas.nowEditLineObj = editLineObj;
                    for (var i = 0; i < 4; i++) {
                        if (kvObj.opts.innerText === "CH " + (i + 1)) {
                            scopeObj.opts.lines[i].offOn_f ^= 1;
                            plotCtr.opts.chOffOnA[i] = scopeObj.opts.lines[i].offOn_f;
                            plotCtr.opts.chOffsetA[i] = scopeObj.opts.lines[i].offset;
                            plotCtr.opts.chScaleA[i] = scopeObj.opts.lines[i].scale;
                            plotCtr.reCreate();
                            KvLib.deepCoverObject(scope.opts, scopeObj.opts);
                            scope.createScope();
                            return;
                        }

                    }
                    tunerObj.opts.setObj = JSON.parse(JSON.stringify(kvObj.fatherMd.opts.setObj));
                    tunerObj.opts.setObj.setType = "inputText";
                    tunerObj.opts.setObj.showKeyboard_f = 0;
                    tunerObj.opts.setObj.disSetButton_f = 1;
                    tunerObj.opts.setObj.titleWidth = 0;

                    if (tunerObj.opts.setObj.name === "X-offset") {
                        var vv = scope.opts.xScale;

                        tunerObj.opts.setObj.muls = [vv / 100, vv / 10];
                        tunerObj.opts.setObj.mulInx = 0;
                    }
                    tunerObj = tunerObj.reCreate();
                    tunerObj.stas.editLineObj = editLineObj;
                    return;
                }
            }
            return;
        };


        var cname = "c";
        var opts = {};
        opts.xc = 1;
        opts.yc = 3;
        opts.ihO = {};
        opts.ihO.c0 = 80;
        opts.ihO.c1 = 200;
        opts.ihO.c2 = 9999;
        layouts[cname] = {name: cname, type: "base", opts: opts};
        lyMap.set("body", cname);
        //======================================================================
        var cname = lyMap.get("body") + "~" + 0;
        var opts = {};
        opts.xc = 2;
        opts.yc = 2;
        layouts[cname] = {name: cname, type: "base", opts: opts};
        lyMap.set("body0", cname);
        //======================================================================
        var cname = lyMap.get("body0") + "~" + 0;
        var opts = {};
        opts.innerText = '<i class="material-icons">&#xe3ec;</i>';
        opts.clickFunc = function (iobj) {
            var ctrObj = iobj.kvObj.fatherMd.fatherMd;
            var scopeObj = ctrObj.compRefs["scope"];
            if (!scopeObj.opts.powerOn_f)
                return;
            scopeObj.opts.grid_f ^= 1;
            sys.setWatch(scopeObj, "scope__grid_f", scopeObj.opts.grid_f);
        };
        opts.hint = "Grid";
        comps[cname] = {name: "gridButton", type: "button~sys", opts: opts};
        //======================================================================
        var cname = lyMap.get("body0") + "~" + 1;
        var opts = {};
        opts.innerText = '<i class="material-icons">&#xe8ac;</i>';
        opts.hint = "Power";
        opts.clickFunc = function (iobj) {
            var ctrObj = iobj.kvObj.fatherMd.fatherMd;
            var scopeObj = ctrObj.compRefs["scope"];
            scopeObj.opts.powerOn_f ^= 1;
            scopeObj.reCreate();
        };
        comps[cname] = {name: "powerButton", type: "button~sys", opts: opts};
        //======================================================================
        var cname = lyMap.get("body0") + "~" + 2;
        var opts = {};
        opts.innerText = '▶';
        //opts.innerText = '<i class="material-icons">&#xe034;</i>';
        opts.clickFunc = function (iobj) {
            var ctrObj = iobj.kvObj.fatherMd.fatherMd;
            var scopeObj = ctrObj.compRefs["scope"];
            if (!scopeObj.opts.powerOn_f)
                return;
            scopeObj.opts.run_f ^= 1;
            var scope = scopeObj.objs["scope"];
            scope.opts.run_f = scopeObj.opts.run_f;
        };
        comps[cname] = {name: "startButton", type: "button~sys", opts: opts};
        //======================================================================

        var cname = lyMap.get("body0") + "~" + 3;
        var opts = {};
        opts.clickFunc = actionFunc;
        opts.innerText = "Mode";
        comps[cname] = {name: "spareButton", type: "button~sys", opts: opts};
        //======================================================================
        var cname = lyMap.get("body") + "~" + 1;
        var opts = {};
        opts.title = "";
        opts.actionFunc = actionFunc;
        models[cname] = {name: "tuner", type: "Md_tuner", opts: opts};
        //======================================================================
        var cname = lyMap.get("body") + "~" + 2;
        var opts = {};
        opts.xc = 1;
        opts.yc = 14;
        layouts[cname] = {name: cname, type: "base", opts: opts};
        lyMap.set("pnButtonsA", cname);

        for (var i = 0; i < op.setObjs.length; i++) {
            var opts = {};
            var cname = lyMap.get("pnButtonsA") + "~" + i;
            opts.setObj = op.setObjs[i];
            opts.actionFunc = actionFunc;
            models[cname] = {name: "mdEditOptsLine~" + i, type: "Md_editOptsLine~sys", opts: opts};
        }

    }
}
//===========================================

