<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
String contextPath = request.getContextPath();

String url = contextPath +  "/indexs/index";
response.sendRedirect(url);
%>

