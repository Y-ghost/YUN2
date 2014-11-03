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
  					<li class="list-group-item" style="margin-top:20px"><a href="#"><span>万科集团1</span> <span class="navbar-right"><i class="fa fa-wifi text-success"></i></span></a></li>
  					<li class="list-group-item"><a href="#"><span>万科集团2</span> <span class="navbar-right"><i class="fa fa-exclamation-triangle text-danger"></i></span></a></li>
  					<li class="list-group-item"><a href="#"><span>万科集团3</span> <span class="navbar-right"><i class="fa fa-wifi text-success"></i></span></a></li>
  					<li class="list-group-item"><a href="#"><span>万科集团4</span> <span class="navbar-right"><i class="fa fa-wifi text-success"></i></span></a></li>
  					<li class="list-group-item"><a href="#"><span>万科集团5</span> <span class="navbar-right"><i class="fa fa-exclamation-triangle text-danger"></i></span></a></li>
  					<li class="list-group-item"><a href="#"><span>万科集团6</span> <span class="navbar-right"><i class="fa fa-wifi text-success"></i></span></a></li>
  					<li class="list-group-item"><a href="#"><span>万科集团7</span> <span class="navbar-right"><i class="fa fa-wifi text-success"></i></span></a></li>
  					<li class="list-group-item"><a href="#"><span>万科集团8</span> <span class="navbar-right"><i class="fa fa-wifi text-success"></i></span></a></li>
  					<li class="list-group-item"><a href="#"><span>万科集团9</span> <span class="navbar-right"><i class="fa fa-wifi text-success"></i></span></a></li>
  					<li class="list-group-item"><a href="#"><span>万科集团10</span> <span class="navbar-right"><i class="fa fa-wifi text-success"></i></span></a></li>
  					<li class="list-group-item"><a href="#"><span>万科集团11</span> <span class="navbar-right"><i class="fa fa-exclamation-triangle text-danger"></i></span></a></li>
  					<li class="list-group-item"><a href="#"><span>万科集团12</span> <span class="navbar-right"><i class="fa fa-wifi text-success"></i></span></a></li>
  					<li class="list-group-item"><a href="#"><span>万科集团13</span> <span class="navbar-right"><i class="fa fa-wifi text-success"></i></span></a></li>
  					<li class="list-group-item"><a href="#"><span>万科集团14</span> <span class="navbar-right"><i class="fa fa-wifi text-success"></i></span></a></li>
  					<li class="list-group-item"><a href="#"><span>万科集团15</span> <span class="navbar-right"><i class="fa fa-wifi text-success"></i></span></a></li>
				</ul>
				<div class="text-center" style="margin-top:50px">
					<ul class="pagination" style="margin:0;">
	  					<li><a href="#">&laquo;</a></li>
	 				    <li><a href="#">1</a></li>
	  					<li><a href="#">&raquo;</a></li>
					</ul>
				</div>
				<div class="gigantic pagination">
					<a href="#" class="first" data-action="first">&laquo;</a>
					<a href="#" class="previous" data-action="previous">&lsaquo;</a>
					<input type="text" readonly="readonly" />
					<a href="#" class="next" data-action="next">&rsaquo;</a>
					<a href="#" class="last" data-action="last">&raquo;</a>
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