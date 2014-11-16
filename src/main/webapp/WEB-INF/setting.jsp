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

#inputLab {
	padding-left: 3px;
	padding-right: 3px;
}
.projectLink , .panel-heading{
	font-size:14px;
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
					style="height: 612px;">
  					<a href="javascript:void(0);" class="list-group-item projectLink panel-heading active" data-name="project" style="margin-top:10px">添加项目信息 <i class="fa fa-angle-right"></i></a>
  					<a href="javascript:void(0);" class="list-group-item projectLink " data-name="host" style="margin-top:10px">添加主机信息 <i class="fa fa-angle-right"></i></a>
  					<a href="javascript:void(0);" class="list-group-item projectLink " data-name="node" style="margin-top:10px">搜索节点信息 <i class="fa fa-angle-right"></i></a>
  					<a href="javascript:void(0);" class="list-group-item projectLink " data-name="systemLog" style="margin-top:10px">节点赋值管理 <i class="fa fa-angle-right"></i></a>
  					<a href="javascript:void(0);" class="list-group-item projectLink " data-name="user" style="margin-top:10px">主机校时管理<i class="fa fa-angle-right"></i></a>
				</ul>
			</div>
			<div class="col-xs-9 col-md-9">
				<div class="node-container">
					<div class="node-tools">
						<label class="checkbox-inline"> <input type="checkbox"
							class="cursor checkAll" /> 全选
						</label> <span class="col-xs-offset-1 col-md-offset-1"></span>
						<button type="button" class="btn btn-success openBtn">开启</button>
						<span class="col-xs-offset-1 col-md-offset-1"></span>
						<button type="button" class="btn btn-warning closeBtn">关闭</button>
					</div>

					<div class="EquipmentList">
					</div>
				</div>
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
</body>
</html>
