<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html lang="en">
<head>
	<link rel="stylesheet" href="${requestScope.basePath}css/jqpagination.css"/>
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
						<label class="checkbox-inline"> <input type="checkbox" />
							全选
						</label> <span class="col-xs-offset-1 col-md-offset-1"></span>
						<button type="button" class="btn btn-success">开启</button>
						<span class="col-xs-offset-1 col-md-offset-1"></span>
						<button type="button" class="btn btn-warning">关闭</button>
					</div>

					<div>
						<div class="col-xs-12 col-md-5">
							<div class="panel panel-default ">
								<div class="panel-heading">
									<label>节点1</label> <span class="float-right"> <input
										type="checkbox" />
									</span>
								</div>
								<div class="panel-body">
									
								</div>
							</div>
						</div>

						<div class="col-md-1"></div>
						<div class="col-xs-12 col-md-5">
							<div class="panel panel-default ">
								<div class="panel-heading">
									<label>节点2</label> 
									<span class="float-right"> 
										<input  type="checkbox" />
									</span>
								</div>
								<div class="panel-body">
									
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