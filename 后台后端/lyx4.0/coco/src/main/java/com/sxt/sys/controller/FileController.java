package com.sxt.sys.controller;

import java.io.File;
import java.io.IOException;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import com.sxt.sys.common.QiniuCloudUtil;
import com.sxt.sys.common.TencentYunUpFileUtils;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.sxt.sys.common.AppFileUtils;

import cn.hutool.core.date.DateUtil;

/**
 * 文件上传
 * @author LYX
 *
 */
@RestController
@RequestMapping("file")
public class FileController {


	/**
	 * 文件上传
	 */
	@RequestMapping("uploadFile")
	public Map<String,Object> uploadFile(MultipartFile file) {
		String fileName=null;
		Map<String,Object> map=new HashMap<>();
		//确定后缀名
		String suffix = file.getOriginalFilename().substring(file.getOriginalFilename().lastIndexOf(".") + 1);
		try {
			File f = File.createTempFile("tmp", null);
			//通过MultipartFile的transferTo(File dest)这个方法来转存文件到指定的路径。MultipartFile转存后，无法再操作，会报错
			file.transferTo(f);
			fileName = TencentYunUpFileUtils.uploadFile(f, suffix);
			// fileName="http://qovtww2x2.hn-bkt.clouddn.com//"+fileName;
			System.out.println(fileName);
			//在JVM进程退出的时候删除文件,通常用在临时文件的删除.
			f.deleteOnExit();
			map.put("path",fileName);
		} catch (IOException e) {
			map.put("path",fileName);
			e.printStackTrace();
		}
		return map;
	}


	/**
	 * 图片下载
	 */
	@RequestMapping("showImageByPath")
	public ResponseEntity<Object> showImageByPath(String path){
		return AppFileUtils.createResponseEntity(path);
	}




}
