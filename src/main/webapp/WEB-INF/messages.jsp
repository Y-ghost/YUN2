<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html lang="en">
<body>
	<!-- Header -->
	<jsp:include page="common/header.jsp" />
	<div class="container-fluid" style="height:100%">
	<!-- Container body -->
		<div class="row">
			<jsp:include page="common/left.jsp" />
			<div class="col-xs-2 col-md-2 border-right hidden-xs" style="height:100%">
				<ul class="list-group ul-border-bottom">
  					<li class="list-group-item" style="margin-top:20px"><a href="#"><span>项目信息管理</span> <span><i class="fa fa-angle-right"></i></span></a></li>
  					<li class="list-group-item" style="margin-top:20px"><a href="#"><span>主机信息管理</span> <span><i class="fa fa-angle-right"></i></span></a></li>
					<li class="list-group-item" style="margin-top:20px"><a href="#"><span>节点信息管理 </span> <span><i class="fa fa-angle-right"></i></span></a></li>
					<li class="list-group-item" style="margin-top:20px"><a href="#"><span>报警信息管理</span> <span><i class="fa fa-angle-right"></i></span></a></li>
					<li class="list-group-item" style="margin-top:20px"><a href="#"><span>用户信息管理</span> <span><i class="fa fa-angle-right"></i></span></a></li>
				</ul>
			</div>
			<div class="col-xs-12 col-md-9">
				<div class="node-container">
					<form class="form-horizontal" role="form">
						<div class="form-group">
							<label class="col-sm-2 control-label">项目信息查询</label>
							<div class="col-sm-2">
								<select class="form-control">
								<option>请选择</option>
							</select>
							</div>
							<div class="col-sm-2">
								<select class="form-control">
								<option>请选择</option>
							</select>
							</div>
							
							<button class="btn btn-success">查询</button>
						</div>
					</form>
					<div class="table-responsive">
						<table class="table table-striped table-hover">
							<thead>
								<tr>
									<th>序号</th>
									<th>项目名称</th>
									<th>项目单位</th>
									<th>项目地址</th>
									<th>创建时间</th>
									<th>操作</th>
								</tr>
							</thead>
							<tbody>
								<tr>
									<td>1</td>
									<td><a href="#">sdfasdfa</a></td>
									<td>sdfasdfa</td>
									<td>sdfasdfa</td>
									<td>sdfasdfa</td>
									<td>
									<button class="btn btn-info" title="编辑"><i class="fa fa-pencil-square-o"></i></button>
									<button class="btn btn-danger" title="删除"><i class="fa fa-trash-o"></i></button>
									</td>
								</tr>
								
								<tr>
									<td>2</td>
									<td><a href="#">sdfasdfa</a></td>
									<td>sdfasdfa</td>
									<td>sdfasdfa</td>
									<td>sdfasdfa</td>
									<td>
									<button class="btn btn-info" title="编辑"><i class="fa fa-pencil-square-o"></i></button>
									<button class="btn btn-danger" title="删除"><i class="fa fa-trash-o"></i></button>
									</td>
								</tr>
								<tr>
									<td>3</td>
									<td><a href="#">sdfasdfa</a></td>
									<td>sdfasdfa</td>
									<td>sdfasdfa</td>
									<td>sdfasdfa</td>
									<td>
									<button class="btn btn-info" title="编辑"><i class="fa fa-pencil-square-o"></i></button>
									<button class="btn btn-danger" title="删除"><i class="fa fa-trash-o"></i></button>
									</td>
								</tr>
							</tbody>
						</table>
						
					</div>
				</div>
			
			</div>
		</div>
	</div>
	
	<jsp:include page="common/footer.jsp" />
</body>
</html>