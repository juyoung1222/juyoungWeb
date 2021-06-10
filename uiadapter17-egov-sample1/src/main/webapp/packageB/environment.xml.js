if (nexacro.Environment)
{
    var env = nexacro._environment = new nexacro.Environment();

    env.on_init = function ()
    {
        this.set_themeid("theme::default");
        this.set_key("nexacro117MDI");
        this.set_httpretry("0");
        this.set_filesecurelevel("all");
        this.set_networksecurelevel("all");
    };

    env.on_initEvent = function ()
    {
        // add event handler
        this.addEventHandler("onerror",this.Environment_onerror,this);
    };

    env.loadTypeDefinition = function ()
    {
        nexacro._setTypeDefinitionURL("typedefinition.xml");
        nexacro._addService("theme", "file", "./_resource_/_theme_/", "session", null, "", "0", "0");
        nexacro._addService("initvalue", "file", "./_resource_/_initvalue_/", "session", null, "", "0", "0");
        nexacro._addService("imagerc", "file", "./_resource_/_images_/", "session", null, "", "", "");
        nexacro._addService("font", "file", "./_resource_/_font_/", "session", null, "", "0", "0");
        nexacro._addService("extPrototype", "js", "./nexacro17lib/component/extPrototype/", "session", null, "", "0", "0");
        nexacro._addService("lib", "js", "./lib/", "session", null, "", "0", "0");
        nexacro._addService("frame", "form", "./frame/", "session", null, "", "0", "0");
        nexacro._addService("svcurl", "JSP", "http://localhost:8084/uiadapter17-egov-sample1/", "session", null, "", "0", "0");
        nexacro._addService("pattern", "form", "./pattern/", "session", null, "", "0", "0");
        nexacro._addService("xcssrc", "file", "./_resource_/_xcss_/", "session", null, "", "", "");
        nexacro._addService("cmm", "form", "./cmm/", "session", null, "", "0", "0");
        nexacro._addService("nexaForm", "form", "./nexaForm/", "0", null, "", "0", "0");
        nexacro._addService("sample", "form", "./sample/", "0", null, "", "0", "0");

    	nexacro._component_uri = (nexacro._arg_compurl ? nexacro._arg_compurl : "./nexacro17lib/component/");
    	nexacro._theme_uri = "./_resource_/_theme_/";

    	// load components
        var registerclass = [
        		{"id":"Button", "classname":"nexacro.Button", "type":"JavaScript"},
        		{"id":"Combo", "classname":"nexacro.Combo", "type":"JavaScript"},
        		{"id":"Edit", "classname":"nexacro.Edit", "type":"JavaScript"},
        		{"id":"MaskEdit", "classname":"nexacro.MaskEdit", "type":"JavaScript"},
        		{"id":"TextArea", "classname":"nexacro.TextArea", "type":"JavaScript"},
        		{"id":"Static", "classname":"nexacro.Static", "type":"JavaScript"},
        		{"id":"Div", "classname":"nexacro.Div", "type":"JavaScript"},
        		{"id":"PopupDiv", "classname":"nexacro.PopupDiv", "type":"JavaScript"},
        		{"id":"Radio", "classname":"nexacro.Radio", "type":"JavaScript"},
        		{"id":"CheckBox", "classname":"nexacro.CheckBox", "type":"JavaScript"},
        		{"id":"ListBox", "classname":"nexacro.ListBox", "type":"JavaScript"},
        		{"id":"Grid", "classname":"nexacro.Grid", "type":"JavaScript"},
        		{"id":"Spin", "classname":"nexacro.Spin", "type":"JavaScript"},
        		{"id":"Menu", "classname":"nexacro.Menu", "type":"JavaScript"},
        		{"id":"PopupMenu", "classname":"nexacro.PopupMenu", "type":"JavaScript"},
        		{"id":"Tab", "classname":"nexacro.Tab", "type":"JavaScript"},
        		{"id":"GroupBox", "classname":"nexacro.GroupBox", "type":"JavaScript"},
        		{"id":"Calendar", "classname":"nexacro.Calendar", "type":"JavaScript"},
        		{"id":"ImageViewer", "classname":"nexacro.ImageViewer", "type":"JavaScript"},
        		{"id":"ProgressBar", "classname":"nexacro.ProgressBar", "type":"JavaScript"},
        		{"id":"Plugin", "classname":"nexacro.Plugin", "type":"JavaScript"},
        		{"id":"Dataset", "classname":"nexacro.NormalDataset", "type":"JavaScript"},
        		{"id":"WebBrowser", "classname":"nexacro.WebBrowser", "type":"JavaScript"},
        		{"id":"FileDownload", "classname":"nexacro.FileDownload", "type":"JavaScript"},
        		{"id":"FileUpload", "classname":"nexacro.FileUpload", "type":"JavaScript"},
        		{"id":"Sketch", "classname":"nexacro.Sketch", "type":"JavaScript"},
        		{"id":"LiteDBConnection", "classname":"nexacro.LiteDBConnection", "type":"JavaScript"},
        		{"id":"LiteDBStatement", "classname":"nexacro.LiteDBStatement", "type":"JavaScript"}
        ];
    	nexacro._addClasses(registerclass);
    };

    env.on_loadVariables = function ()
    {
        // Variables
        nexacro.setEnvironmentVariable("gvRunMode", "0");
        nexacro.setEnvironmentVariable("gvUserId", "");
        nexacro.setEnvironmentVariable("gvUserNm", "");
        nexacro.setEnvironmentVariable("gvTraceMode", "true");

        // Cookies


        // HTTP Header

    };

	env.on_loadDeviceAdaptors = function ()
	{
        // load device adatpor

	};

    // User Script
    env.registerScript("environment.xml", function() {
    /**
     * @description 통신오류 알림
    */
    this.Environment_onerror = function(obj,e)
    {
    	//trace("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!Environment_onerror!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
    	//trace("e.statuscode : " + e.statuscode);
    	//trace("e.errormsg : " + e.errormsg);

    	// 스크립트 에러
    	if (e.statuscode == 0) {
    		//alert(e.statuscode + "\n"+e.errormsg);
    	}
    	else if (e.statuscode == 404) {
    		alert(e.statuscode+"\n"+"Page Not Found"+"\n"+e.errormsg);
    	}
    	else if (e.statuscode == 408) {
    		alert(e.statuscode+"\n"+"Request Timeout" + "\n"+e.errormsg);
    	}
    	else if (e.statuscode == 500) {
    		alert(e.statuscode+"\n"+"Internal Server Error" + "\n"+e.errormsg);
    	}
    	else if (e.statuscode == 503) {
    		alert(e.statuscode+"\n"+"The service is unavailable" + "\n"+e.errormsg);
    	}
    	else if (e.statuscode == 12029) {
    		alert(e.statuscode+"\n"+"A connection with the server could not be established" + "\n"+e.errormsg);
    	}
    	// 미등록 오류 발생
    	else {
    		alert(e.statuscode + "\n" + e.errormsg);
    	}
    };

    });
					
    env = null;
}

