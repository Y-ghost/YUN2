<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html lang="en">
<!-- Header -->
<!-- 放到这里 是header里面的head有效，防止IE8时，自动响应为mobile style-->
<jsp:include page="common/header.jsp" />
<head>
<style type="text/css">
#form-group {
	margin-bottom: 5px;
	margin-right: -5px;
	margin-left: -5px;
}

#has-error {
	color: #a94442;
}

.panel-heading {
	font-size: 14px;
}
#inputLab {
	padding-left: 3px;
	padding-right: 3px;
}

.fa-5 {
	font-size: 4em;
}

.fa-1 {
	font-size: 16px;
	margin-top:25px;
}

.projectName {
	color: #555;
	border-radius: 4px;
	background-color: #fff;
	margin-top: 2px;
	font-size: 14px;
	border: 1px solid #ccc;
}
#projectName {
	padding:1 0;
	margin-top: 0px;
}

select.input-sm {
height: 34px;
line-height: 34px;
}
</style>
</head>
<body>
	<div class="container-fluid" style="height: 100%">
		<!-- Container body -->
		<div class="row">
			<jsp:include page="common/left.jsp" />
			<div class="col-xs-2 col-md-2 border-right border-bottom hidden-xs">
				<ul class="list-group ul-border-bottom" id="projectList"
					style="height: 602px;">
  					<a href="javascript:void(0);" class="list-group-item panelLink link-heading active" data-name="project">添加项目信息 <span class="fa fa-angle-right navbar-right "></span></a>
  					<a href="javascript:void(0);" class="list-group-item panelLink " data-name="host">添加主机信息 <span class="fa fa-angle-right navbar-right"></span></a>
  					<a href="javascript:void(0);" class="list-group-item panelLink " data-name="equipment">搜索节点信息 <span class="fa fa-angle-right navbar-right"></span></a>
  					<a href="javascript:void(0);" class="list-group-item panelLink " data-name="setEquipment">节点传感器参数设置 <span class="fa fa-angle-right navbar-right"></span></a>
  					<a href="javascript:void(0);" class="list-group-item panelLink " data-name="putData">节点赋值管理 <span class="fa fa-angle-right navbar-right"></span></a>
  					<a href="javascript:void(0);" class="list-group-item panelLink " data-name="validTime">主机校时管理<span class="fa fa-angle-right navbar-right"></span></a>
				</ul>
			</div>
			<div class="equipment-container">
			</div>

		</div>
	</div>
	<jsp:include page="common/footer.jsp" />

	<script src="${requestScope.basePath}datatable/js/jquery.dataTables.js"></script>
	<script src="${requestScope.basePath}datatable/js/dataTables.bootstrap.js"></script>
	<!-- Fix IE 6-9  JSON object-->
	<script src="${requestScope.basePath}js/lib/json2.js"></script>
	<script src="${requestScope.basePath}js/lib/bootbox.min.js"></script>
	<script src="${requestScope.basePath}js/jquery.cityInfo.js"></script>
	<script src="${requestScope.basePath}js/jquery.cityInfo.js"></script>
	<script src="${requestScope.basePath}js/setting/setting.service.js"></script>
	<script src="${requestScope.basePath}js/setting/setting.project.js"></script>
	<script src="${requestScope.basePath}js/setting/setting.host.js"></script>
	<script src="${requestScope.basePath}js/setting/setting.equipment.js"></script>
	<script src="${requestScope.basePath}js/setting/setting.js"></script>
</body>
</html>
