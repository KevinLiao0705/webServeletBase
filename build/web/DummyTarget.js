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
        opts.baseColor="#222";
        opts.actionFunc = function (iobj) {
            console.log("base");
            //console.log(iobj);
        };
        blocks[cname] = {name: "basePanel", type: "Component~Cp_base~plate.none", opts: opts};

        //======================================    
        var cname = lyMaps["body"] + "~" + 0;
        var opts = {};
        opts.yArr = [50,70, 9999];
        layouts[cname] = {name: cname, type: "Layout~Ly_base~xyArray.sys0", opts: opts};
        lyMaps["mainBody"] = cname;
        //==============================
        var cname = lyMaps["mainBody"] + "~" + 0;
        var opts = {};
        opts.innerText="主雷達同步控制器";
        //opts.baseColor="#222";
        //opts.innerTextColor="#fff";
        blocks[cname] = {name: "basePanel", type: "Component~Cp_base~label.sys2", opts: opts};
        //==============================
        var cname = lyMaps["mainBody"] + "~" + 1;
        var opts = {};
        opts.buttons=["佈署","自測","同步","設定"];
        opts.buttonIds=["location","selfTest","sync","setting"];
        blocks[cname] = {name: "headButtons", type: "Model~MdaButtons~base.sys0", opts: opts};
        //==============================
        var cname = lyMaps["mainBody"] + "~" + 2;
        var opts = {};
        opts.xArr = [400, 9999];
        layouts[cname] = {name: cname, type: "Layout~Ly_base~xyArray.sys0", opts: opts};
        lyMaps["downBody"] = cname;
        //==============================
        var cname = lyMaps["downBody"] + "~" + 0;
        var opts = {};
        opts.yc=2;
        opts.ym=10;
        opts.margin=2;
        layouts[cname] = {name: cname, type: "Layout~Ly_base~array.sys0", opts: opts};
        lyMaps["leftBody"] = cname;
        //==============================
        var cname = lyMaps["leftBody"] + "~" + 0;
        var opts = {};
        opts.title="誘標雷達 1";
        blocks[cname] = {name: "target1", type: "Model~Target~base.sys0", opts: opts};
        //==============================
        var cname = lyMaps["leftBody"] + "~" + 1;
        var opts = {};
        opts.title="誘標雷達 2";
        blocks[cname] = {name: "target1", type: "Model~Target~base.sys0", opts: opts};
        //==============================
    }
}


class Target {
    constructor() {
    }
    initOpts(md) {
        var self = this;
        var opts = {};
        Block.setBaseOpts(opts);
        this.subTypeOpts(opts);
        opts.title="title";
        opts.baseColor="#ccc";
        opts.buttonColor="#ccf";
        opts.buttons=["button1","button2","button3"];
        opts.layoutType="row";//row,collum,array
        opts.buttonIds=[];
        opts.iw=9999;
        opts.ih=9999;
        opts.borderWidth=1;
        opts.xm=30;
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
        opts.yArr = [45,45,45,45,45,45,9999];
        opts.xyArr = [[9999], ["0.5rw", 9999], ["0.5rw", 9999], ["0.5rw", 9999], ["0.5rw", 9999], ["0.5rw", 9999],[9999]];
        layouts[cname] = {name: cname, type: "Layout~Ly_base~xyArray.sys0", opts: opts};
        lyMaps["mainBody"] = cname;
        

        var cname = lyMaps["mainBody"] + "~" + 0;
        var opts = {};
        opts.innerText=op.title;
        blocks[cname] = {name: "basePanel", type: "Component~Cp_base~label.sys2", opts: opts};
        //==============================
        var cname = lyMaps["mainBody"] + "~" + 1;
        var opts = {};
        opts.innerText="雷達狀態";
        blocks[cname] = {name: "statusLabel", type: "Component~Cp_base~label.sys3", opts: opts};
        //==============================
        var cname = lyMaps["mainBody"] + "~" + 2;
        var opts = {};
        opts.innerText="備便";
        opts.baseColor="#cfc";
        blocks[cname] = {name: "statusPlate", type: "Component~Cp_base~label.led", opts: opts};
        //==============================
        var cname = lyMaps["mainBody"] + "~" + 3;
        var opts = {};
        opts.innerText="脈波來源";
        blocks[cname] = {name: "souceLabel", type: "Component~Cp_base~label.sys3", opts: opts};
        //===
        var cname = lyMaps["mainBody"] + "~" + 4;
        var opts = {};
        opts.innerText="主雷同步";
        opts.baseColor="#cfc";
        blocks[cname] = {name: "sourcePlate", type: "Component~Cp_base~label.led", opts: opts};
        //==============================
        var cname = lyMaps["mainBody"] + "~" + 5;
        var opts = {};
        opts.innerText="輸出裝置";
        blocks[cname] = {name: "outPanel", type: "Component~Cp_base~label.sys3", opts: opts};
        //===
        var cname = lyMaps["mainBody"] + "~" + 6;
        var opts = {};
        opts.innerText="輻射天線";
        opts.baseColor="#cfc";
        blocks[cname] = {name: "outPlate", type: "Component~Cp_base~label.led", opts: opts};
        //==============================
        var cname = lyMaps["mainBody"] + "~" + 7;
        var opts = {};
        opts.innerText="通訊方式";
        blocks[cname] = {name: "commPanel", type: "Component~Cp_base~label.sys3", opts: opts};
        //===
        var cname = lyMaps["mainBody"] + "~" + 8;
        var opts = {};
        opts.innerText="無線";
        opts.baseColor="#cfc";
        blocks[cname] = {name: "commPlate", type: "Component~Cp_base~label.led", opts: opts};
        //==============================
        var cname = lyMaps["mainBody"] + "~" + 9;
        var opts = {};
        opts.innerText="戰備狀態";
        blocks[cname] = {name: "battlePanel", type: "Component~Cp_base~label.sys3", opts: opts};
        //===
        var cname = lyMaps["mainBody"] + "~" + 10;
        var opts = {};
        opts.innerText="關閉";
        opts.baseColor="#888";
        blocks[cname] = {name: "battlePlate", type: "Component~Cp_base~label.led", opts: opts};
        //==============================
        var cname = lyMaps["mainBody"] + "~" + 11;
        var opts = {};
        opts.innerText="誘標控制";
        opts.fontSize="0.5rh";
        opts.baseColor="#ccf";
        blocks[cname] = {name: "commandButton", type: "Component~Cp_base~button.sys0", opts: opts};
        //==============================
        
        
        
    }
}
