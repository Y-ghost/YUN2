<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html lang="en">
<head>
	<link rel="stylesheet" href="${requestScope.basePath}datatable/css/dataTables.bootstrap.css" />
</head>
<body>
	<!-- Header -->
	<jsp:include page="common/header.jsp" />
	<div class="container-fluid" style="height:100%">
	<!-- Container body -->
		<div class="row">
			<jsp:include page="common/left.jsp" />
			<div class="col-xs-2 col-md-2 border-right hidden-xs" style="height:100%">
				<ul class="list-group ul-border-bottom">
  					<a href="javascript:void(0);" class="list-group-item active" data-name="project" style="margin-top:20px">项目信息管理 <i class="fa fa-angle-right"></i></a>
  					<a href="javascript:void(0);" class="list-group-item " data-name="host" style="margin-top:20px">主机信息管理 <i class="fa fa-angle-right"></i></a>
  					<a href="javascript:void(0);" class="list-group-item " data-name="node" style="margin-top:20px">节点信息管理 <i class="fa fa-angle-right"></i></a>
  					<a href="javascript:void(0);" class="list-group-item " data-name="danger" style="margin-top:20px">报警信息管理 <i class="fa fa-angle-right"></i></a>
  					<a href="javascript:void(0);" class="list-group-item " data-name="user" style="margin-top:20px">用户信息管理<i class="fa fa-angle-right"></i></a>
				</ul>
			</div>
			<div class="col-xs-12 col-md-9">
				<div class="node-container">
					<form class="form-horizontal" role="form" id="searchForm">
						<div class="form-group">
							<label class="col-sm-2 control-label">项目信息查询</label>
							<div class="col-sm-2">
								<select class="form-control" id="province">
								</select>
							</div>
							<div class="col-sm-2">
								<select class="form-control" id="city">
								</select>
							</div>
						</div>
					</form>
					<div class="table-responsive" id="tableContainer">
						<table class="table table-striped table-hover" id="table">
							<thead>
							</thead>
							<tbody>
							</tbody>
						</table>
						
					</div>
				</div>
			</div>
		</div>
	</div>
	
	<!-- Template -->
	
	<div id="projectInfo" style="display:none;">
		<form class="form-horizontal" role="form">
			 <div class="form-group">
    			<label class="col-sm-3 control-label">项目名称：</label>
    			<div class="col-sm-9">
    				<input type="text" class="form-control projectName" name="name"/>
    			</div>
  			</div>
  			<div class="form-group">
    			<label class="col-sm-3 control-label">负责单位：</label>
    			<div class="col-sm-9">
    				<input type="text" class="form-control department" name="department"/>
    			</div>
  			</div>
  			<div class="form-group">
    			<label class="col-sm-3 control-label">项目地址：</label>
    			<div class="col-sm-9">
    				<div class="col-sm-5 selectItem" style="padding-left:0">
    					<select class="form-control provinceItem" name="province"></select>
    				</div>
    				<div class="col-sm-5 selectItem">
    					<select class="form-control cityItem" name="city"></select>
    				</div>
    			</div>
  			</div>
  			<div class="form-group">
    			<label class="col-sm-3 control-label">详细地址：</label>
    			<div class="col-sm-9">
    				<input type="text" class="form-control address" name="address"/>
    			</div>
  			</div>
  			<input type="hidden" name="id" class="id"/>
		</form>
	</div>
	
	<jsp:include page="common/footer.jsp" />
	<script src="${requestScope.basePath}datatable/js/jquery.dataTables.js"></script>
	<script src="${requestScope.basePath}datatable/js/dataTables.bootstrap.js"></script>
	<!-- Fix IE 6-9  JSON object-->
	<script src="${requestScope.basePath}js/lib/json2.js"></script>
	<script src="${requestScope.basePath}js/lib/bootbox.min.js"></script>
	<script src="${requestScope.basePath}js/jquery.cityInfo.js"></script>
	<script src="${requestScope.basePath}js/messages.js"></script>
	
	
</body>
</html>