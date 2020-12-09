package com.example1.practice1.admin.domain;


public class AdminDTO {
	
	private String managerId;//매니저아이디
	private String managerPasswd;//매니저 비밀번호
	private String managerName;//매니저 이름
	
	public AdminDTO() {}

	public String getManagerId() {
		return managerId;
	}

	public void setManagerId(String managerId) {
		this.managerId = managerId;
	}

	public String getManagerPasswd() {
		return managerPasswd;
	}

	public void setManagerPasswd(String managerPasswd) {
		this.managerPasswd = managerPasswd;
	}

	public String getManagerName() {
		return managerName;
	}

	public void setManagerName(String managerName) {
		this.managerName = managerName;
	}

	@Override
	public String toString() {
		return "AdminDTO [managerId=" + managerId + ", managerPasswd=" + managerPasswd + ", managerName=" + managerName
				+ "]";
	}
	
	

}
