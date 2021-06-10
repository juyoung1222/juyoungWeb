//==============================================================================
//
//  TOBESOFT Co., Ltd.
//  Copyright 2017 TOBESOFT Co., Ltd.
//  All Rights Reserved.
//
//  NOTICE: TOBESOFT permits you to use, modify, and distribute this file 
//          in accordance with the terms of the license agreement accompanying it.
//
//  Readme URL: http://www.nexacro.co.kr/legal/nexacro17-public-license-readme-1.0.html
//
//==============================================================================
if (nexacro.LiteDBConnection) {
	var _pLiteDBConnection = nexacro.LiteDBConnection.prototype;
	_pLiteDBConnection = function (id, parent) {
		this.id = this.name = id;
		if (parent) {
			this.parent = parent;
		}
		this.sqlstatement = "";
		this.busytimeout = 60000;
		this.openflag = 1;
		this.datasource = "";
		this.preconnect = "false";
		this.async = "true";


		this._event_list = 
			{
			"onsuccess" : 1, 
			"onerror" : 1
		};

		this.onsuccess = null;
		this.onerror = null;
	};
	delete _pLiteDBConnection;
}
;

if (nexacro.LiteDBStatement) {
	var _pLiteDBStatement = nexacro.LiteDBStatement.prototype;
	_pLiteDBStatement = function (id, parent) {
		this.id = this.name = id;
		if (parent) {
			this.parent = parent;
		}

		this.query = "";
		this.ldbconnection = "";
		this.parameters = {
		};
		this.applyrowpos = -1;
		this.async = "true";

		this._event_list = 
			{
			"onsuccess" : 1, 
			"onerror" : 1
		};

		this.onsuccess = null;
		this.onerror = null;
	};
	delete _pLiteDBStatement;
}
;