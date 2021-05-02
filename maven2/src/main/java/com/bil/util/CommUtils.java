package com.bil.util;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.Reader;
import java.io.UnsupportedEncodingException;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.math.BigDecimal;
import java.net.URLDecoder;
import java.net.URLEncoder;
import java.net.UnknownHostException;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.sql.Clob;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Enumeration;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Random;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletRequestWrapper;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.parsers.FactoryConfigurationError;
import javax.xml.parsers.ParserConfigurationException;
import javax.xml.xpath.XPath;
import javax.xml.xpath.XPathConstants;
import javax.xml.xpath.XPathExpressionException;
import javax.xml.xpath.XPathFactory;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.w3c.dom.Document;
import org.w3c.dom.NodeList;
import org.xml.sax.SAXException;

import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import egovframework.rte.fdl.property.EgovPropertyService;

public class CommUtils {

	protected static final Logger log = LoggerFactory.getLogger(CommUtils.class);

	/**
	 * <PRE>
	 * name : ESCAPE_CHAR
	 * type : String
	 * description : 특수문자 정의 (특수문자 치환시 사용)
	 * </PRE>
	 * 
	 * @since 2016. 7. 8.
	 * @see String
	 */
	public static final String ESCAPE_CHAR = ",|-|/";

	@Resource(name = "propertiesService")
	protected EgovPropertyService propertiesService;

	/**
	 * Object 의 null 여부를 반환한다.
	 * 
	 * @since 2017. 8. 07.
	 * @author ngins
	 * @param object
	 * @return
	 */
	public static boolean isNull(Object object) {
		return object == null ? true : false;
	}

	public static Object isNull(Object object, String replacement) {
		return object == null ? replacement : object;
	}

	// public static void main(String[] args) {
	// }

	/**
	 * String 의 null 여부를 반환한다. " " 은 null 널로 판단하지 않음.
	 * 
	 * @param string
	 * @return
	 */
	public static boolean isNull(String string) {
		return ("".equals(string) || "null".equals(string.toLowerCase()) || 0 == string.length() || string == null)
				? true : false;
	}

	/**
	 * string 이 널일때, replacement 를 반환한다.
	 * 
	 * @param string
	 * @param replacement
	 * @return
	 */
	public static String isNull(String string, String replacement) {
		if (isNull(string)) {
			return replacement;
		} else {
			return string;
		}
	}

	/**
	 * <PRE>
	 * name : isEmpty
	 * description : Empty checking
	 * </PRE>
	 * 
	 * @since 2016. 6. 11.
	 * @category choose [none]
	 * @param str
	 * @return boolean
	 */
	public static boolean isEmpty(String str) {
		/** Business Logic */
		// Object가 없거나, 공백, null문자일 경우
		if (str == null || str.trim().equals("") || str.trim().toLowerCase().equals("null")) {
			return true;
		}

		/** Return */
		return false;
	}

	/**
	 * @MethodName isNotEmpty
	 * @MethodDescription Not Empty checking
	 * @Date 2016. 9. 25.
	 * @author JCH
	 * @Modifiers
	 * @param str
	 * @return boolean
	 */
	public static boolean isNotEmpty(String str) {
		/** Return */
		return !isEmpty(str);
	}

	/**
	 * <PRE>
	 * name : isEmpty
	 * description : Map에 값이 있는지 확인
	 * </PRE>
	 * 
	 * @since 2016. 7. 4.
	 * @category choose none
	 * @param inputMap
	 * @param key
	 * @return boolean
	 */
	public static boolean isEmpty(Map<String, Object> inputMap, String key) {
		/** Business Logic */
		// Map 없을 경우
		if (inputMap == null) {
			return true;
		}
		// Map만 체크할 경우
		if (isEmpty(key)) {
			return false;
		}
		// Map 해당 Key에 값이 없을 경우
		if (inputMap.get(key) == null || isEmpty(inputMap.get(key).toString())) {
			return true;
		}

		/** Return */
		return false;
	}

	/**
	 * <PRE>
	 * name : isNotEmpty
	 * description : Map에 값이 있는지 확인
	 * </PRE>
	 * 
	 * @since 2016. 7. 4.
	 * @category choose |none
	 * @param inputMap
	 * @param key
	 * @return boolean
	 */
	public static boolean isNotEmpty(Map<String, Object> inputMap, String key) {
		/** Return */
		return !isEmpty(inputMap, key);
	}

	/**
	 * <PRE>
	 * name : isEmpty
	 * description : Map에 값이 있는지 확인
	 * </PRE>
	 * 
	 * @since 2016. 7. 4.
	 * @category choose none
	 * @param inputMap
	 * @param key
	 * @return boolean
	 */
	public static boolean isEmpty(Map<String, Object> inputMap) {
		return isEmpty(inputMap, null);
	}

	/**
	 * @MethodName getFormArrParame
	 * @MethodDescription Input array parameters automatically set
	 * @Date 2016. 9. 21.
	 * @author JCH
	 * @Modifiers
	 * @param <HttpServletRequest>req
	 * @param strKeyName
	 * @return String[]
	 */
	public static String[] getFormArrParame(HttpServletRequest req, String strKeyName) {
		/** Return */
		return (String[]) getFormArrParame(req, strKeyName, String.class);
	}

	/**
	 * @MethodName getFormArrParame
	 * @MethodDescription Input array parameters automatically set
	 * @Date 2016. 11. 15.
	 * @author JCH
	 * @Modifiers
	 * @param <HttpServletRequest>req
	 * @param strKeyName
	 * @param <Class<T>>classType
	 * @return <T>T[]
	 */
	@SuppressWarnings("unchecked")
	public static <T> T[] getFormArrParame(HttpServletRequest req, String strKeyName, Class<T> type) {
		/** Local Value Object */
		String[] strings = req.getParameterValues(strKeyName);
		T[] obj = null;

		if (strings == null || strings.length < 1)
			return null;

		/** Business Logic */
		try {
			if (type.equals(String.class)) {
				obj = (T[]) new String[strings.length];

				for (int i = 0; i < strings.length; i++) {
					obj[i] = (T) (isEmpty(strings[i]) ? "" : strings[i]);
				}
			} else if (type.equals(Integer.class)) {
				obj = (T[]) new Integer[strings.length];

				for (int i = 0; i < obj.length; i++) {
					Integer integer = isEmpty(strings[i]) ? 0
							: Integer.parseInt(strings[i].replaceAll(ESCAPE_CHAR, ""));
					obj[i] = (T) integer;
				}
			} else if (type.equals(BigDecimal.class)) {
				obj = (T[]) new BigDecimal[strings.length];

				for (int i = 0; i < obj.length; i++) {
					BigDecimal bigDecimal = isEmpty(strings[i]) ? BigDecimal.ZERO
							: new BigDecimal(strings[i].replaceAll(ESCAPE_CHAR, ""));
					obj[i] = (T) bigDecimal;
				}
			} else if (type.equals(Boolean.class)) {
				obj = (T[]) new Boolean[strings.length];

				for (int i = 0; i < obj.length; i++) {
					Boolean bool = isEmpty(strings[i]) ? false : Boolean.parseBoolean(strings[i]);
					obj[i] = (T) bool;
				}
			} else if (type.equals(Long.class)) {
				obj = (T[]) new Long[strings.length];

				for (int i = 0; i < obj.length; i++) {
					Long lon = isEmpty(strings[i]) ? 0L : Long.parseLong(strings[i]);
					obj[i] = (T) lon;
				}
			}
		} catch (Exception e) {
			// LOGGER.error(String.format(LogFormat.ERROR, e));
			obj = null;
		}

		/** Return Logic */
		return obj;
	}

	/**
	 * @MethodName convertMapToObject
	 * @Date 2017. 01. 12.
	 * @author JCH
	 * @Modifiers
	 * @param objClass
	 * @return objClass
	 */
	public static Object convertMapToObject(@SuppressWarnings("rawtypes") Map map, Object objClass) {
		String keyAttribute = null;
		String setMethodString = "set";
		String methodString = null;
		@SuppressWarnings("rawtypes")
		Iterator itr = map.keySet().iterator();
		while (itr.hasNext()) {
			keyAttribute = (String) itr.next();
			methodString = setMethodString + keyAttribute.substring(0, 1).toUpperCase() + keyAttribute.substring(1);
			try {
				Method[] methods = objClass.getClass().getDeclaredMethods();
				for (int i = 0; i <= methods.length - 1; i++) {
					if (methodString.equals(methods[i].getName())) {
						methods[i].invoke(objClass, map.get(keyAttribute));
					}
				}
			} catch (SecurityException e) {
				e.printStackTrace();
			} catch (IllegalAccessException e) {
				e.printStackTrace();
			} catch (IllegalArgumentException e) {
				e.printStackTrace();
			} catch (InvocationTargetException e) {
				e.printStackTrace();
			}
		}
		return objClass;
	}

	/**
	 * HttpServletRequest 에서 parameter 를 참아 Map 에 담아 반환한다.<br>
	 * 
	 * @MethodName getFormParam
	 * @MethodDescription Input parameters automatically set
	 * @Date 2016. 9. 21.
	 * @author JCH
	 * @Modifiers
	 * @param obj
	 * @return Map<String, Object>
	 */
	public static Map<String, Object> getFormParam(HttpServletRequest obj) {
		/** Local Value Object */
		Map<String, Object> map = null;
		Enumeration<?> enumeration = null;
		String keyName = null;
		String keyValue = null;

		/** Business Logic */
		enumeration = obj.getParameterNames();

		// 속성 값이 없을 경우 Null로 반환
		if (obj == null || enumeration == null || !enumeration.hasMoreElements())
			return new HashMap<String, Object>();

		// 반환용 Map객체 생성
		map = new HashMap<String, Object>();

		// 속성 갯수만큼 루프돌면서 반환Map에 해당값 설정
		while (enumeration.hasMoreElements()) {
			keyName = enumeration.nextElement().toString();
			try {
				keyValue = URLDecoder.decode(obj.getParameter(keyName), "UTF-8");
			} catch (Exception e) {
				keyValue = obj.getParameter(keyName);
			}

			// 해당속성의 값이 공백 또는 존재하지 않을 경우 Next Pass
			if (isEmpty(keyValue))
				continue;
			
			log.debug("## param ## key:" + keyName + "	val:" + keyValue);
			map.put(keyName, keyValue);
		}
		
		/** Return Logic */
		return map != null && map.size() > 0 ? map : null;
	}

	/**
	 * HttpServletRequest 에서 parameter 를 참아 Map 에 담아 반환한다.<br>
	 * keyId값에 따라 형변환(int / String)
	 * 
	 * @MethodName getFormParam
	 * @MethodDescription Input parameters automatically set
	 * @Date 2016. 9. 21.
	 * @author JCH
	 * @Modifiers
	 * @param obj,
	 *            keyId
	 * @return Map<String, Object>
	 */
	public static Map<String, Object> getFormParam(HttpServletRequest obj, String[] keyId) {
		/** Local Value Object */
		Map<String, Object> map = null;
		Enumeration<?> enumeration = null;
		String keyName = null;
		String keyValue = null;

		/** Business Logic */
		enumeration = obj.getParameterNames();

		// 속성 값이 없을 경우 Null로 반환
		if (obj == null || enumeration == null || !enumeration.hasMoreElements())
			return new HashMap<String, Object>();

		// 반환용 Map객체 생성
		map = new HashMap<String, Object>();

		// 속성 갯수만큼 루프돌면서 반환Map에 해당값 설정
		while (enumeration.hasMoreElements()) {
			keyName = enumeration.nextElement().toString();
			try {
				keyValue = URLDecoder.decode(obj.getParameter(keyName), "UTF-8");
			} catch (Exception e) {
				keyValue = obj.getParameter(keyName);
			}

			// 해당속성의 값이 공백 또는 존재하지 않을 경우 Next Pass
			if (isEmpty(keyValue))
				continue;

			// keyId값에 따라 형변환(int / String)
			for (int i = 0; i < keyId.length; i++) {
				if (keyName.equals(keyId[i])) {
					log.debug("## param keyId## key:" + keyName + "	val:" + keyValue + " (Integer)");
					map.put(keyName, Integer.parseInt(keyValue));
					break;
				} else {
					map.put(keyName, keyValue);
				}
			}
			log.debug("## param ## key:" + keyName + "	val:" + keyValue);
		}

		/** Return Logic */
		return map != null && map.size() > 0 ? map : null;
	}

	/**
	 * <PRE>
	 * name : getListToGridCmb
	 * description : 조회된 목록을 그리드에서 사용가능한 콤보박스 데이타로 변환
	 * </PRE>
	 * 
	 * @since 2016. 7. 7.
	 * @param list
	 * @param keyNm
	 * @param KeyVal
	 * @return Map<String, Object>
	 */
	public static Map<String, Object> getListToGridCmb(List<Map<String, Object>> list, String keyNm, String KeyVal) {
		/** Local Value Object */
		Map<String, Object> rtnMap = new HashMap<String, Object>();

		/** Business Logic */
		if (list == null || list.size() < 1) {
			return null;
		}

		for (Map<String, Object> map : list) {
			if (isNotEmpty(map, KeyVal) && isNotEmpty(map, keyNm)) {
				rtnMap.put(map.get(KeyVal).toString(), map.get(keyNm));
			}
		}

		/** Return Logic */
		return rtnMap != null && !rtnMap.isEmpty() ? rtnMap : null;
	}

	/**
	 * <PRE>
	 * name : jsonStrToMap
	 * description : JSON String을 Map으로 변환
	 * </PRE>
	 * 
	 * @since 2016. 7. 8.
	 * @param jsonString
	 * @return Map<String, Object>
	 * @throws IOException
	 * @throws JsonMappingException
	 * @throws JsonParseException
	 */
	@SuppressWarnings("unchecked")
	public static Map<String, Object> jsonStrToMap(String jsonString) {
		/** Local Value Object */
		ObjectMapper mapper = null;
		Map<String, Object> bizMap = null;

		/** Business Logic */
		// 예외처리
		if (isEmpty(jsonString)) {
			return null;
		}
		// Jackson Mapper 선언
		mapper = new ObjectMapper();

		// JSON String을 Map으로 변환
		try {
			bizMap = mapper.readValue(jsonString, Map.class);
		} catch (JsonParseException e) {
			// LOGGER.error(String.format(LogFormat.ERROR, e));
		} catch (JsonMappingException e) {
			// LOGGER.error(String.format(LogFormat.ERROR, e));
		} catch (IOException e) {
			// LOGGER.error(String.format(LogFormat.ERROR, e));
		}

		/** Return Logic */
		return bizMap;
	}

	/**
	 * <PRE>
	 * name : jsonArrStrToList
	 * description : JSONArray String을 List<Map>으로 변환
	 * </PRE>
	 * 
	 * @since 2016. 7. 8.
	 * @param jsonArrString
	 * @return List<Map<String, Object>>
	 * @throws IOException
	 * @throws JsonMappingException
	 * @throws JsonParseException
	 */
	@SuppressWarnings("unchecked")
	public static List<Map<String, Object>> jsonArrStrToList(String jsonArrString) {
		/** Local Value Object */
		ObjectMapper mapper = null;
		List<Map<String, Object>> bizList = null;

		/** Business Logic */
		// 예외처리
		if (isEmpty(jsonArrString)) {
			return null;
		}
		// Jackson Mapper 선언
		mapper = new ObjectMapper();

		// JSONArrayString을 List로 변환
		try {
			bizList = mapper.readValue(jsonArrString, List.class);
		} catch (JsonParseException e) {
			// LOGGER.error(String.format(LogFormat.ERROR, e));
		} catch (JsonMappingException e) {
			// LOGGER.error(String.format(LogFormat.ERROR, e));
		} catch (IOException e) {
			// LOGGER.error(String.format(LogFormat.ERROR, e));
		}

		/** Return Logic */
		return bizList;
	}

	/**
	 * <PRE>
	 * name : clobToString
	 * description : Clob To String
	 * </PRE>
	 * 
	 * @since 2016. 7. 30.
	 * @param clob
	 * @return String
	 * @throws SQLException
	 * @throws IOException
	 */
	public static String clobToString(Clob clob) throws SQLException, IOException {
		/** Local Value Object */
		StringBuffer sb = new StringBuffer();
		Reader reader = null;
		BufferedReader br = null;
		String str = null;

		/** Business Logic */
		if (clob == null) {
			return null;
		}

		try {
			reader = clob.getCharacterStream();
			br = new BufferedReader(reader);

			while (null != (str = br.readLine())) {
				sb.append(str);
			}
		} catch (SQLException e) {
			throw e;
		} catch (IOException e) {
			if (br != null)
				br.close();
			if (reader != null)
				reader.close();
			throw e;
		} finally {
			if (br != null)
				br.close();
			if (reader != null)
				reader.close();
		}

		/** Return Logic */
		return sb.toString();
	}

	/**
	 * <PRE>
	 * name : addrXmlToListPaser
	 * description : 행안부 주소 연동시 사용하는 xml 파서
	 * </PRE>
	 * 
	 * @since 2016. 8. 28.
	 * @param inStream
	 * @return List<Map<String, Object>>
	 * @throws IOException
	 * @throws FactoryConfigurationError
	 * @throws ParserConfigurationException
	 * @throws SAXException
	 * @throws XPathExpressionException
	 */
	public static List<Map<String, Object>> addrXmlToListPaser(InputStream inStream, String xPathStr)
			throws IOException, SAXException, ParserConfigurationException, FactoryConfigurationError,
			XPathExpressionException {
		/** Local Value Object */
		List<Map<String, Object>> bizList = new ArrayList<Map<String, Object>>();
		Document document = null;
		NodeList nodeList = null;
		XPath xPath = XPathFactory.newInstance().newXPath();

		/** Business Logic */
		document = DocumentBuilderFactory.newInstance().newDocumentBuilder().parse(inStream);
		nodeList = (NodeList) xPath.evaluate(xPathStr, document, XPathConstants.NODESET);

		Map<String, Object> map = new HashMap<String, Object>();
		for (int i = 0; i < nodeList.getLength(); i++) {
			if (isNotEmpty(map, nodeList.item(i).getNodeName())) {
				bizList.add(map);
				map = new HashMap<String, Object>();
			}
			map.put(nodeList.item(i).getNodeName(),
					nodeList.item(i).getFirstChild() != null
							&& isNotEmpty(nodeList.item(i).getFirstChild().getNodeValue())
									? nodeList.item(i).getFirstChild().getNodeValue().trim() : null);
		}
		if (nodeList.getLength() > 0) {
			bizList.add(map);
		}

		/** Return */
		return !bizList.isEmpty() ? bizList : null;
	}

	/**
	 * <PRE>
	 * name : addrXmlToMapPaser
	 * description : 행안부 주소 연동시 사용하는 xml 파서
	 * </PRE>
	 * 
	 * @since 2016. 11. 3.
	 * @param inStream
	 * @param xPathStr
	 * @return Map<String, Object>
	 * @throws IOException
	 * @throws SAXException
	 * @throws ParserConfigurationException
	 * @throws FactoryConfigurationError
	 * @throws XPathExpressionException
	 */
	public static Map<String, Object> addrXmlToMapPaser(InputStream inStream, String xPathStr) throws IOException,
			SAXException, ParserConfigurationException, FactoryConfigurationError, XPathExpressionException {
		/** Local Value Object */
		Map<String, Object> map = new HashMap<String, Object>();
		Document document = null;
		NodeList nodeList = null;
		XPath xPath = XPathFactory.newInstance().newXPath();

		/** Business Logic */
		document = DocumentBuilderFactory.newInstance().newDocumentBuilder().parse(inStream);
		nodeList = (NodeList) xPath.evaluate(xPathStr, document, XPathConstants.NODESET);

		for (int i = 0; i < nodeList.getLength(); i++) {
			map.put(nodeList.item(i).getNodeName(),
					nodeList.item(i).getFirstChild() != null
							&& isNotEmpty(nodeList.item(i).getFirstChild().getNodeValue())
									? nodeList.item(i).getFirstChild().getNodeValue().trim() : null);
		}

		/** Return */
		return !map.isEmpty() ? map : null;
	}

	/**
	 * <PRE>
	 * name : getSha256
	 * description : SHA256 암호화
	 * </PRE>
	 * 
	 * @since 2016. 9. 2.
	 * @param base
	 * @return String
	 * @throws NoSuchAlgorithmException
	 * @throws UnsupportedEncodingException
	 */
	public static String getSha256(String base) throws NoSuchAlgorithmException, UnsupportedEncodingException {
		/** Local Value Object */
		MessageDigest digest = MessageDigest.getInstance("SHA-256");
		StringBuffer hexString = new StringBuffer();
		byte[] hash = null;

		/** Business Logic */
		if (isEmpty(base)) {
			return null;
		}

		hash = digest.digest(base.getBytes("UTF-8"));

		for (int i = 0; i < hash.length; i++) {
			String hex = Integer.toHexString(0xff & hash[i]);
			if (hex.length() == 1)
				hexString.append('0');
			hexString.append(hex);
		}

		/** Return */
		return hexString.toString();
	}

	/**
	 * <PRE>
	 * name : isListMapEqual
	 * description : 목록에서 특정키 값 비교하여 동일한 값이 존재하는지 확인
	 * </PRE>
	 * 
	 * @since 2016. 10. 6.
	 * @param list
	 * @param listKey
	 * @param compareValue
	 * @return boolean
	 */
	public static boolean isListMapEqual(List<Map<String, Object>> list, String listKey, String compareValue) {
		/** Local Value Object */
		boolean bol = false;

		/** Business Logic */
		// 대상 List 객체가 없을 경우 예외 처리
		if (list == null || list.isEmpty()) {
			return false;
		}
		// 대상 List만 큼 반복
		for (Map<String, Object> map : list) {
			// 비교하고자 하는 Object가 compareValue와 같은 것이 존재할 경우 true
			if (isNotEmpty(map, listKey) && map.get(listKey).toString().equals(compareValue)) {
				bol = true;
				break;
			}
		}

		/** Return */
		return bol;
	}

	/**
	 * <PRE>
	 * name : doRandomStr
	 * description : 랜덤 문자+숫자 조합 생성
	 * </PRE>
	 * 
	 * @since 2016. 10. 8.
	 * @param engCnt
	 * @param numCnt
	 * @return String
	 */
	public static String doRandomStr(int engCnt, int numCnt, int escCnt) {
		/** Local Value Object */
		StringBuffer strBuf = new StringBuffer();
		String[] escStr = { "!", "@", "#", "$", "*" };
		Random random = new Random();

		/** Business Logic */
		if (engCnt < 1 && numCnt < 1) {
			return null;
		}
		// 영문알파벳 랜덤 함수 생성
		for (int i = 0; i < engCnt; i++) {
			int asciiInt = 97 + random.nextInt(25); // 소문자 a는 97
			strBuf.append(Character.toString((char) asciiInt));
		}
		// 숫자 랜덤 함수 생성
		for (int i = 0; i < numCnt; i++) {
			strBuf.append(random.nextInt(9));
		}
		// 특수문자 랜덤 함수 생성
		for (int i = 0; i < escCnt; i++) {
			strBuf.append(escStr[random.nextInt(4)]);
		}

		/** Return */
		return strBuf.toString();
	}

	/**
	 * <PRE>
	 * name : doCrossSiteScriptReplace
	 * description : Croo-Site Script 문자 치환
	 * </PRE>
	 * 
	 * @since 2016. 10. 16.
	 * @param str
	 * @return String
	 */
	public static String doCrossSiteScriptReplace(String str) {
		/** Local Value Object */
		String rtnStr = null;

		/** Business Logic */
		if (isEmpty(str))
			return str;

		rtnStr = str.replaceAll("(?i)<(/?script)>", "&lt;$1&gt;");
		rtnStr = str.replaceAll("(?i)<(/?style)>", "&lt;$1&gt;");

		/** Return */
		return rtnStr;
	}

	/**
	 * <PRE>
	 * name : getDownloadFileName
	 * description : 브라우져 특성에 따른 한글 첨부파일명 변환
	 * </PRE>
	 * 
	 * @since 2016. 10. 24.
	 * @param request
	 * @param str
	 * @return String
	 * @throws UnsupportedEncodingException
	 */
	public static String getDownloadFileName(HttpServletRequest request, String str)
			throws UnsupportedEncodingException {
		/** Local Value Object */
		String rtnStr = null;

		/** Business Logic */
		// Internet Explorer
		if (request.getHeader("User-Agent").contains("MSIE") || request.getHeader("User-Agent").contains("Trident")) {
			rtnStr = URLEncoder.encode(str, "UTF-8");
		} else {
			rtnStr = new String(str.getBytes(), "ISO-8859-1");
		}

		/** Return */
		return rtnStr;
	}

	/**
	 * <PRE>
	 * name : doMapToElement
	 * description : Map To Element Converter
	 * </PRE>
	 * 
	 * @since 2016. 10. 7.
	 * @param ElementRootNm
	 * @param map
	 * @return Element
	 */
	// public static Element doMapToElement(String ElementRootNm, Map<String,
	// Object> map){
	// /** Local Value Object */
	// Element bizEl = null;
	//
	// /** Business Logic */
	// if(isEmpty(ElementRootNm)){
	// return null;
	// }
	//
	// //신규 Element 생성
	// bizEl = new Element(ElementRootNm);
	//
	// if(map==null || map.isEmpty()){
	// return bizEl;
	// }
	//
	// //Map To Element Converter
	// for(Iterator<String> iterator = map.keySet().iterator();
	// iterator.hasNext();) {
	// String keyNm = iterator.next();
	// String keyVal = isNotEmpty(map, keyNm) ? map.get(keyNm).toString() :
	// null;
	// addElement(bizEl, keyNm, keyVal);
	// }
	//
	// /** Return */
	// return bizEl;
	// }

	/**
	 * <PRE>
	 * name : addElement
	 * description : Add childElement in parentElement
	 * </PRE>
	 * 
	 * @since 2016. 10. 7.
	 * @param parent
	 * @param elNm
	 * @param elValue
	 */
	// public static void addElement(Element parent, String elNm, String
	// elValue){
	// /** Local Value Object */
	// Element bizEl = null;
	//
	// /** Business Logic */
	// if(parent!=null && isNotEmpty(elNm)){
	// //신규 Element 생성
	// bizEl = new Element(elNm);
	// bizEl.setText(elValue);
	//
	// parent.addContent(bizEl);
	// }
	// }

	/**
	 * <PRE>
	 * name : listTojsonArrStr
	 * description : list to JSONArray String
	 * </PRE>
	 * 
	 * @since 2016. 11. 20.
	 * @param list
	 * @return String
	 */
	public static String listTojsonArrStr(List<Map<String, Object>> list) {
		/** Local Value Object */
		ObjectMapper mapper = null;
		String rtnStr = null;

		/** Business Logic */
		// 예외처리
		if (list == null || list.isEmpty()) {
			return null;
		}
		// Jackson Mapper 선언
		mapper = new ObjectMapper();

		try {
			rtnStr = mapper.writeValueAsString(list);
		} catch (Exception e) {
		}

		/** Return Logic */
		return rtnStr;
	}

	/**
	 * <PRE>
	 * name : getAndBl
	 * description : getAndBl 비교문 두개의 변수
	 * </PRE>
	 * 
	 * @since 2016. 04. 15.
	 * @param inputMap,str1,getId
	 * @return boolean
	 */
	public static boolean getAndBl(Map<String, Object> inputMap, String str1, String getId) {
		return isNotEmpty(inputMap, getId) && str1.equals(inputMap.get(getId));
	}

	public static String chkIpInfo(HttpServletRequest request) throws UnknownHostException {
		/*
		 * String localhost = InetAddress.getLocalHost().toString();
		 * StringTokenizer st = new StringTokenizer(localhost,"/"); String host
		 * = st.nextToken(); String ip = st.nextToken();
		 */

		String ip = request.getHeader("X-Forwarded-For");

		if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
			ip = request.getHeader("Proxy-Client-IP");
		}
		if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
			ip = request.getHeader("WL-Proxy-Client-IP");
		}
		if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
			ip = request.getHeader("HTTP_CLIENT_IP");
		}
		if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
			ip = request.getHeader("HTTP_X_FORWARDED_FOR");
		}
		if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
			ip = request.getRemoteAddr();
		}
		if (ip != null && ip.length() != 0 && (ip.equals("127.0.0.1") || ip.equals("0:0:0:0:0:0:0:1"))) {
			ip = "127.0.0.1";
		}

		return ip;
	}

	/**
	 * <PRE>
	 * name : HttpRequestSetParameters
	 * description : request parameter 값 변경 setParameter
	 * </PRE>
	 * 
	 * @since 2017. 04. 12.
	 */
	public static class HttpServletRequestReset extends HttpServletRequestWrapper {
		@SuppressWarnings("rawtypes")
		HashMap params;

		/** * @param request */

		@SuppressWarnings({ "rawtypes", "unchecked" })
		public HttpServletRequestReset(HttpServletRequest request) {
			super(request);
			this.params = new HashMap(request.getParameterMap());
		}

		public String getParameter(String name) {
			String returnValue = null;
			String[] paramArray = getParameterValues(name);

			if (paramArray != null && paramArray.length > 0) {
				returnValue = paramArray[0];
			}

			return returnValue;
		}

		@SuppressWarnings({ "unchecked", "rawtypes" })
		public Map getParameterMap() {
			return Collections.unmodifiableMap(params);
		}

		@SuppressWarnings({ "rawtypes", "unchecked" })
		public Enumeration getParameterNames() {
			return Collections.enumeration(params.keySet());
		}

		public String[] getParameterValues(String name) {
			String[] result = null;
			String[] temp = (String[]) params.get(name);
			if (temp != null) {
				result = new String[temp.length];
				System.arraycopy(temp, 0, result, 0, temp.length);
			}

			return result;
		}

		public void setParameter(String name, String value) {
			String[] oneParam = { value };
			setParameter(name, oneParam);
		}

		@SuppressWarnings("unchecked")
		public void setParameter(String name, String[] values) {
			params.put(name, values);
		}
	}
}
