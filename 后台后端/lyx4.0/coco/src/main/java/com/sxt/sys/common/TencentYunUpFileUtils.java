package com.sxt.sys.common;



import com.qcloud.cos.COSClient;
import com.qcloud.cos.ClientConfig;
import com.qcloud.cos.auth.BasicCOSCredentials;
import com.qcloud.cos.auth.COSCredentials;
import com.qcloud.cos.exception.CosClientException;
import com.qcloud.cos.exception.CosServiceException;
import com.qcloud.cos.model.*;
import com.qcloud.cos.region.Region;

import java.io.File;
import java.util.UUID;

public class TencentYunUpFileUtils {
    private static final String ACCESSKEY = "AKIDgz83iGOedOs5VgwJlU3PUcVBcQzKZCms";
    private static final String SECRETKEY = "IKXothEVgcHlvpRmTwCIHZASWa7qIt30";
    private static final String BUCKETNAME = "coco-1304972257";
    private static final String REGIONID = "ap-guangzhou";

    /**
     * 初始化CosClient相关配置， appid、accessKey、secretKey、region
     * @return
     */
    public static COSClient getCosClient() {
        // 1 初始化用户身份信息(secretId, secretKey)
        COSCredentials cred = new BasicCOSCredentials(ACCESSKEY, SECRETKEY);
        // 2 设置bucket的区域, COS地域的简称请参照 https://cloud.tencent.com/document/product/436/6224
        // clientConfig中包含了设置region, https(默认http), 超时, 代理等set方法, 使用可参见源码或者接口文档FAQ中说明
        ClientConfig clientConfig = new ClientConfig(new Region(REGIONID));
        // 3 生成cos客户端
        COSClient cosClient = new COSClient(cred, clientConfig);
        // bucket的命名规则为{name}-{appid} ，此处填写的存储桶名称必须为此格式
        //String bucketName = BUCKETNAME;
        return cosClient;
    }
    /**
     * 上传文件
     * @return
     * //绝对路径和相对路径都OK
     */
    public static String uploadFile(File file, String suffix) {

        String KEY = "/coco/" + UUID.randomUUID().toString() + "." + suffix;
        System.out.println(KEY);
        String imageName = "https://coco-1304972257.cos.ap-guangzhou.myqcloud.com" + KEY;
        System.out.println("File name = "+imageName);

        PutObjectRequest putObjectRequest = new PutObjectRequest(BUCKETNAME, KEY, file);
        // 设置存储类型, 默认是标准(Standard), 低频(standard_ia),一般为标准的
        putObjectRequest.setStorageClass(StorageClass.Standard);
        //创建客户端
        COSClient cc = getCosClient();
        try {
            PutObjectResult putObjectResult = cc.putObject(putObjectRequest);
            // putobjectResult会返回文件的etag
            String etag = putObjectResult.getETag();
            System.out.println(etag);
        } catch (CosServiceException e) {
            e.printStackTrace();
        } catch (CosClientException e) {
            e.printStackTrace();
        }
        // 关闭客户端
        cc.shutdown();
        return imageName;
    }

    /**
     * 下载文件
     * @param bucketName
     * @param key
     * @return
     */
    public static String downLoadFile(String bucketName, String key) {
        File downFile = new File("F:\\upload\\test\\1.jpg");
        COSClient cc = getCosClient();
        GetObjectRequest getObjectRequest = new GetObjectRequest(bucketName, key);
        ObjectMetadata downObjectMeta = cc.getObject(getObjectRequest, downFile);
        cc.shutdown();
        String etag = downObjectMeta.getETag();
        return etag;
    }

    /**
     * 删除文件
     * @param bucketName
     * @param key
     */
    public static void deleteFile(String bucketName, String key) {
        COSClient cc = getCosClient();
        try {
            cc.deleteObject(bucketName, key);
        } catch (CosClientException e) {
            e.printStackTrace();
        } finally {
            cc.shutdown();
        }
    }

//     public static void main(String[] args) {
//         uploadFile();
// //        downLoadFile(BUCKETNAME,"upload/1.jpg");
// //        deleteFile(BUCKETNAME,"upload/1.jpg");
//     }
}
