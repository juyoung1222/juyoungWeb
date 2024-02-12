package com.example1.insurance.dto;

public class InsuranceContractDTO {
	private int polyNo;              //계약번호
	private String poly_id;          //계약아이디
	private String product_info;     //상품정보
    private String reg_info;         //가입정보	
    private int contract_period;     //계약기간
    private String start_date;         //보험시작일
    private String end_date;           //보험종료일
    //private double premiumTot;    //총보험료
    private String status;          //계약상태
    //private int term;             //납입기간
    private int register_pay;      //가입금액
    private int standard_pay;      //기준금액
   
    public InsuranceContractDTO() {}

	

	public int getPolyNo() {
		return polyNo;
	}



	public void setPolyNo(int polyNo) {
		this.polyNo = polyNo;
	}



	public String getPoly_id() {
		return poly_id;
	}



	public void setPoly_id(String poly_id) {
		this.poly_id = poly_id;
	}



	public String getProduct_info() {
		return product_info;
	}



	public void setProduct_info(String product_info) {
		this.product_info = product_info;
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



	public String getStart_date() {
		return start_date;
	}



	public void setStart_date(String start_date) {
		this.start_date = start_date;
	}



	public String getEnd_date() {
		return end_date;
	}



	public void setEnd_date(String end_date) {
		this.end_date = end_date;
	}



	public String getStatus() {
		return status;
	}



	public void setStatus(String status) {
		this.status = status;
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
		return "InsuranceContractDTO [polyNo=" + polyNo + ", poly_id=" + poly_id + ", product_info=" + product_info
				+ ", reg_info=" + reg_info + ", contract_period=" + contract_period + ", start_date=" + start_date
				+ ", end_date=" + end_date + ", status=" + status + ", register_pay=" + register_pay + ", standard_pay="
				+ standard_pay + "]";
	}





	

	
	

	

	
	

	

	
    
    

	
	
	
	
	 

}
