package com.example1.insurance.dto;

public class InsuranceContractProductInfoDTO {
	private int productNo;              //상품번호
	private String polyId;             //계약아이디
	private String reg_info;            //가입정보	
    private int contract_period;     //계약기간
    private int register_pay;      //가입금액
    private int standard_pay;      //기준금액
   
    public InsuranceContractProductInfoDTO() {}

	public int getProductNo() {
		return productNo;
	}

	public void setProductNo(int productNo) {
		this.productNo = productNo;
	}

	public String getPolyId() {
		return polyId;
	}

	public void setPolyId(String polyId) {
		this.polyId = polyId;
	}

	public String getReg_info() {
		return reg_info;
	}

	public void setReg_info(String reg_info) {
		this.reg_info = reg_info;
	}

	public int getContract_period() {
		return contract_period;
	}

	public void setContract_period(int contract_period) {
		this.contract_period = contract_period;
	}

	public int getRegister_pay() {
		return register_pay;
	}

	public void setRegister_pay(int register_pay) {
		this.register_pay = register_pay;
	}

	public int getStandard_pay() {
		return standard_pay;
	}

	public void setStandard_pay(int standard_pay) {
		this.standard_pay = standard_pay;
	}

	@Override
	public String toString() {
		return "InsuranceContractProductInfoDTO [productNo=" + productNo + ", polyId=" + polyId + ", reg_info="
				+ reg_info + ", contract_period=" + contract_period + ", register_pay=" + register_pay
				+ ", standard_pay=" + standard_pay + "]";
	}

	

	

	

	

	
	
	

	
	

	

	
	

	

	
    
    

	
	
	
	
	 

}
