/**
*  컨설팅 표준화 작업
*  @FileName 		File.js 
*  @Creator 			soojeong
*  @CreateDate 	2017.03.08
*  @Desction   
************** 소스 수정 이력 ***************************************************
*  date          		Modifier                Description
*******************************************************************************
*  2017.03.08     	soojeong 	           최초 생성 
*  2017.10.17     	kyk       	           주석 정비
*******************************************************************************
*/

var pForm = nexacro.Form.prototype;

/**
 * @class 현재 Form 상의 FileUpload 컴포넌트를 서버에 업로드한다. <br>
 * @param {Object} objFileUpload - 파일업로드 컴포넌트
 * @param {String} [sUrl] - 파일업로드 서비스 호출 경로
 * @param {String} [sPath] - 파일업로드시킬 폴더 위치
 * @return N/A
 * @example 
 * this.gfnFileUpload(objFileUpload);
 */
pForm.gfnFileUpload = function(objFileUpload, sUrl, sPath)
{	
	var objEnv = nexacro.getEnvironment();
	var svcUrl = objEnv.services["svcurl"].url;
	
	if (this.gfnIsNull(sUrl)) sUrl = svcUrl;
	
	//파일업로드 서비스 호출 경로
	var sFileUrl = sUrl + "advancedUploadFiles.do";
    
	//파일 업로드 시킬 폴더 위치 지정
	if (this.gfnIsNull(sPath)) sPath = "PATH=upload";
	
	var bSucc = objFileUpload.upload(sFileUrl + "?" + sPath);
	trace("bSucc >> " + bSucc);
};

/**
 * @class 현재 Form 상의 FileDownload 컴포넌트를 이용하여 지정한 위치에서 원하는 파일을 다운로드한다. <br>
 * @param {Object} objFileDownload - 파일다운로드 컴포넌트
 * @param {String} sFilename - 다운로드 할 파일명
 * @param {String} [sUrl] - 파일업로드 서비스 호출 경로
 * @param {String} [sPath] - 파일업로드시킬 폴더 위치
 * @return N/A
 * @example this.gfnFileUpload(objFileUpload, sFilename);
 */
pForm.gfnFileDownload = function(objFileDownload, sFilename, sUrl, sPath)
{
	var objEnv = nexacro.getEnvironment();
	var svcUrl = objEnv.services["svcurl"].url;
	if (this.gfnIsNull(sUrl)) sUrl = svcUrl;
	
	
	//파일다운로드 서비스 호출 경로
	var sFileUrl = sUrl + "advancedDownloadFile.do";
	
	//파일 다운로드할 폴더 위치 지정
	if (this.gfnIsNull(sPath)) sPath = "PATH=upload";
	
	if( system.navigatorname =="nexacro")
	{
		objFileDownload.set_downloadfilename(sFilename);
	}
	
	objFileDownload.download(sFileUrl + "?" + sPath + "&file=" + sFilename);
};

/**
 * @class File Path 문자열(예 : C:\a\b\filename.ext)에서 File명(예 : filename)을 추출 <br>
 * @param {String} sPath - File Path 문자열 (예 : "C:\a\b\filename.ext")
 * @param {String} bExt - extend를 return되는 File명에 포함시킬지 여부 ( 옵션 : Default=false )
 * @return {String} 
 * 성공 : <br>
 * bExt가 true인 경우 ==> sPath에서 File명(예 : "filename.ext") <br>
 * bExt가 false인 경우 ==> sPath에서 File명(예 : "filename") <br>
 * 실패 : "" <br>
 */
pForm.gfnGetFileName = function (sPath, bExt)
{
	var start_pos,end_pos,tmp_pos,filename;

	if (this.gfnIsNull(sPath)) 
	{
		return "";
	}
	if (this.gfnIsNull(bExt)) 
	{
		bExt = false;
	}

	start_pos = Math.max(this.gfnPosReverse(sPath, "\\"), this.gfnPosReverse(sPath, "/"));
	tmp_pos = this.gfnPosReverse(sPath, "::");
	if (tmp_pos > 0) 
	{
		tmp_pos++;
	}
	start_pos = Math.max(start_pos, tmp_pos);
	if (bExt == false) 
	{
		end_pos = this.gfnPosReverse(sPath, ".");
		if (end_pos < 0) 
		{
			end_pos = sPath.length;
		}
		filename = sPath.substr(start_pos + 1, end_pos - start_pos - 1);
	}
	else 
	{
		filename = sPath.substr(start_pos + 1);
	}

	return filename;
};