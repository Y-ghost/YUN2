<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html lang="en">
<head>
	<link rel="stylesheet" href="${requestScope.basePath}css/jqpagination.css"/>
	<style type="text/css">
		#form-group{
			margin-bottom: 5px;
			margin-right: -5px;
			margin-left: -5px;
		}
		#has-error{
			color:#a94442;
		}
		#inputLab{padding-left:3px;padding-right:3px;}
	</style>
</head>
<body>
	<!-- Header -->
	<jsp:include page="common/header.jsp" />
	<div class="container-fluid" style="height:100%">
	<!-- Container body -->
		<div class="row">
			<jsp:include page="common/left.jsp" />
			<div class="col-xs-2 col-md-2 border-right border-bottom hidden-xs">
				<ul class="list-group ul-border-bottom" id="projectList" style="height:500px;">
				</ul>
				<div class="gigantic pagination" style="margin-bottom:50px;">
					<a href="#" class="first" data-action="first">&laquo;</a>
					<a href="#" class="previous" data-action="previous" >&lsaquo;</a>
					<input type="text" readonly="readonly" style="width:50px;text-align: center;"/>
					<a href="#" class="next" data-action="next" >&rsaquo;</a>
					<a href="#" class="last" data-action="last" >&raquo;</a>
				</div>
			</div>
			<div class="col-xs-12 col-md-9">
				<div class="node-container">
					<div class="node-tools">
						<label class="checkbox-inline"> <input type="checkbox" class="cursor checkAll"/>
							全选
						</label> <span class="col-xs-offset-1 col-md-offset-1"></span>
						<button type="button" class="btn btn-success">开启</button>
						<span class="col-xs-offset-1 col-md-offset-1"></span>
						<button type="button" class="btn btn-warning">关闭</button>
					</div>

					<div class="EquipmentList">
						<div class="col-xs-12 col-md-6">
							<div class="panel panel-default ">
								<div class="panel-heading">
									<label>节点1</label> <span class="float-right"> 
									<input type="checkbox" class="cursor" id="equipmentCheckbox"/>
									</span>
								</div>
								<div class="panel-body">
								<form class="form-horizontal" role="form">
									<div class="form-group has-feedback" id="form-group">
										<label class="col-sm-3 control-label">土壤温度：</label>
										<div class="col-sm-3">
											<input type="text" class="form-control projectName"
												id="inputLab" data-bv-field="name" style="padding-left:3px;padding-right:3px;" value="土壤温度"/>
										</div>
										<label class="col-sm-3 control-label">阀门状态：</label>
										<div class="col-sm-3">
											<input type="text" class="form-control department"
												id="inputLab" data-bv-field="department" value="土壤温度"/>
										</div>
									</div>

									<div class="form-group has-feedback" id="form-group">
										<label class="col-sm-3 control-label">预期水量：</label>
										<div class="col-sm-3">
											<input type="text" class="form-control department"
												name="department" data-bv-field="department"/>
										</div>
										<label class="col-sm-3 control-label">实时水量：</label>
										<div class="col-sm-3">
											<input type="text" class="form-control department"
												name="department" data-bv-field="department"/>
										</div>
									</div>
									<div class="form-group has-feedback" id="form-group">
										<label class="col-sm-3 control-label">传感器一：</label>
										<div class="col-sm-3">
											<input type="text" class="form-control address"
												name="address" data-bv-field="address"/>
										</div>
										<label class="col-sm-3 control-label">传感器二：</label>
										<div class="col-sm-3">
											<input type="text" class="form-control address"
												name="address" data-bv-field="address"/>
										</div>
									</div>
									<div class="form-group has-feedback" id="form-group">
										<label class="col-sm-3 control-label">传感器三：</label>
										<div class="col-sm-3">
											<input type="text" class="form-control address"
												name="address" data-bv-field="address"/>
										</div>
										<label class="col-sm-3 control-label">传感器四：</label>
										<div class="col-sm-3">
											<input type="text" class="form-control address"
												name="address" data-bv-field="address"/>
										</div>
									</div>
									<div class="form-group has-feedback" id="form-group">
										<label class="col-sm-3 control-label">传感器五：</label>
										<div class="col-sm-3">
											<input type="text" class="form-control address"
												name="address" data-bv-field="address"/>
										</div>
									</div>
									<input type="hidden" name="id" class="id" value="1"/>
									</form>
								</div>
							</div>
						</div>
						<div class="col-xs-12 col-md-6">
							<div class="panel panel-default ">
								<div class="panel-heading">
									<label>节点1</label> <span class="float-right"> 
									<input type="checkbox" class="cursor" id="equipmentCheckbox"/>
									</span>
								</div>
								<div class="panel-body">
								<form class="form-horizontal" role="form">
									<div class="form-group has-feedback" id="form-group">
										<label class="col-sm-3 control-label">土壤温度：</label>
										<div class="col-sm-3">
											<input type="text" class="form-control projectName"
												name="name" data-bv-field="name"/>
										</div>
										<label class="col-sm-3 control-label">阀门状态：</label>
										<div class="col-sm-3">
											<input type="text" class="form-control department"
												name="department" data-bv-field="department"/>
										</div>
									</div>

									<div class="form-group has-feedback" id="form-group">
										<label class="col-sm-3 control-label">预期水量：</label>
										<div class="col-sm-3">
											<input type="text" class="form-control department"
												name="department" data-bv-field="department"/>
										</div>
										<label class="col-sm-3 control-label">实时水量：</label>
										<div class="col-sm-3">
											<input type="text" class="form-control department"
												name="department" data-bv-field="department"/>
										</div>
									</div>
									<div class="form-group has-feedback" id="form-group">
										<label class="col-sm-3 control-label">传感器一：</label>
										<div class="col-sm-3">
											<input type="text" class="form-control address"
												name="address" data-bv-field="address"/>
										</div>
										<label class="col-sm-3 control-label">传感器二：</label>
										<div class="col-sm-3">
											<input type="text" class="form-control address"
												name="address" data-bv-field="address"/>
										</div>
									</div>
									<div class="form-group has-feedback" id="form-group">
										<label class="col-sm-3 control-label">传感器三：</label>
										<div class="col-sm-3">
											<input type="text" class="form-control address"
												name="address" data-bv-field="address"/>
										</div>
										<label class="col-sm-3 control-label">传感器四：</label>
										<div class="col-sm-3">
											<input type="text" class="form-control address"
												name="address" data-bv-field="address"/>
										</div>
									</div>
									<div class="form-group has-feedback" id="form-group">
										<label class="col-sm-3 control-label">传感器五：</label>
										<div class="col-sm-3">
											<input type="text" class="form-control address"
												name="address" data-bv-field="address"/>
										</div>
									</div>
									<input type="hidden" name="id" class="id" value="1"/>
									</form>
								</div>
							</div>
						</div>
						<div class="col-xs-12 col-md-6">
							<div class="panel panel-default ">
								<div class="panel-heading">
									<label>节点1</label> <span class="float-right"> 
									<input type="checkbox" class="cursor" id="equipmentCheckbox"/>
									</span>
								</div>
								<div class="panel-body">
								<form class="form-horizontal" role="form">
									<div class="form-group has-feedback" id="form-group">
										<label class="col-sm-3 control-label">土壤温度：</label>
										<div class="col-sm-3">
											<input type="text" class="form-control projectName"
												name="name" data-bv-field="name"/>
										</div>
										<label class="col-sm-3 control-label">阀门状态：</label>
										<div class="col-sm-3">
											<input type="text" class="form-control department"
												name="department" data-bv-field="department"/>
										</div>
									</div>

									<div class="form-group has-feedback" id="form-group">
										<label class="col-sm-3 control-label">预期水量：</label>
										<div class="col-sm-3">
											<input type="text" class="form-control department"
												name="department" data-bv-field="department"/>
										</div>
										<label class="col-sm-3 control-label">实时水量：</label>
										<div class="col-sm-3">
											<input type="text" class="form-control department"
												name="department" data-bv-field="department"/>
										</div>
									</div>
									<div class="form-group has-feedback" id="form-group">
										<label class="col-sm-3 control-label">传感器一：</label>
										<div class="col-sm-3">
											<input type="text" class="form-control address"
												name="address" data-bv-field="address"/>
										</div>
										<label class="col-sm-3 control-label">传感器二：</label>
										<div class="col-sm-3">
											<input type="text" class="form-control address"
												name="address" data-bv-field="address"/>
										</div>
									</div>
									<div class="form-group has-feedback" id="form-group">
										<label class="col-sm-3 control-label">传感器三：</label>
										<div class="col-sm-3">
											<input type="text" class="form-control address"
												name="address" data-bv-field="address"/>
										</div>
										<label class="col-sm-3 control-label">传感器四：</label>
										<div class="col-sm-3">
											<input type="text" class="form-control address"
												name="address" data-bv-field="address"/>
										</div>
									</div>
									<div class="form-group has-feedback" id="form-group">
										<label class="col-sm-3 control-label">传感器五：</label>
										<div class="col-sm-3">
											<input type="text" class="form-control address"
												name="address" data-bv-field="address"/>
										</div>
									</div>
									<input type="hidden" name="id" class="id" value="1"/>
									</form>
								</div>
							</div>
						</div>
						<input type="hidden" name="id" class="id" value="1"/>
									</form>
								</div>
							</div>
						</div>

					</div>
				</div>

			</div>
		</div>
	</div>
	<jsp:include page="common/footer.jsp" />
	
	<script src="${requestScope.basePath}js/index.js"></script>
	<script src="${requestScope.basePath}js/lib/jquery.jqpagination.min.js"></script>
</body>
</html>