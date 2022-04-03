import React, {useEffect, useState} from 'react';
import {Modal, Upload} from "antd";
import {RcFile, UploadChangeParam, UploadFile} from "antd/lib/upload/interface";
import {PlusOutlined} from '@ant-design/icons';
import {GoodsPicInfo, Resp} from "../../net/resp";
import {deleteGoodsPicture} from "../../net";
import {getUserToken} from "../../utils/user";


interface GoodsPicWallProps {
    goods_id: number,
    url_list: Array<string>
}


function getBase64(file: RcFile): Promise<any> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
}


function GoodsPicWall(props: GoodsPicWallProps) {

    const [previewVisible, setPreviewVisible] = useState<boolean>(false)
    const [previewTitle, setPreviewTitle] = useState<string>('')
    const [previewImage, setPreviewImage] = useState<string>('')
    const [urlList, setUrlList] = useState<Array<string>>([])
    const [fileList, setFileList] = useState<Array<UploadFile>>([])

    useEffect(() => {

        let tempFileList: Array<UploadFile> = []
        props.url_list.forEach((url, index) => {
            tempFileList.push({
                uid: String(index),
                name: String(index),
                status: 'done',
                url: url,
            })
        })
        setFileList(tempFileList)
        setUrlList(props.url_list)
        console.log("tempFileList==",tempFileList)

    }, [])


    const beforeUpload = () => {
        return true
    };


    const handlePreview = async (file: UploadFile) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj!);
        }
        setPreviewImage(file.url! || file.preview!)
        setPreviewVisible(true)
        setPreviewTitle(file.name || file.url!.substring(file.url!.lastIndexOf('/') + 1))

    };


    const handleCancel = () => {
        setPreviewVisible(false)
    }

    const onRemove = async (file: UploadFile) => {
        if (file.url == undefined){
            return;
        }
        const info : GoodsPicInfo = {
            url: file.url
        }
        const raw = await deleteGoodsPicture(props.goods_id, info);
        const resp = raw.data as Resp
        if (resp.code === 0){
            const goodsPicInfo: GoodsPicInfo = resp.data as GoodsPicInfo
            const newFileList = fileList.filter((item) => {
                return item.url !== goodsPicInfo.url;
            })
            const newUrlList = newFileList.map((item) => {
                return item.url!
            })
            setFileList(newFileList)
            setUrlList(newUrlList)
        }


    };

    const onChange = (change: UploadChangeParam) => {
        const file = change.file;
        const fileList = change.fileList;
        setFileList(fileList)
        const {status, response} = file
        if (status === 'done') {
            const data: GoodsPicInfo = response.data as GoodsPicInfo;
            const newFileList = fileList
            newFileList.forEach((item) => {
                if (item.uid === file.uid) {
                    item.url = data.url
                    item.uid = data.uid!
                    item.name = data.name!
                }
            })
            const newUrlList = newFileList.map((item) => {
                return item.url!
            })
            setFileList(newFileList)
            setUrlList(newUrlList)
        }


    }


    const uploadButton = (
        <div>
            <PlusOutlined/>
            <div style={{marginTop: 8}}>Upload</div>
        </div>
    );

    return (
        <div>
            <Upload
                action={`http://137.184.8.39:8080/goods/picture/${props.goods_id}`}
                method={'POST'}
                listType="picture-card"
                fileList={fileList}
                onPreview={handlePreview}
                onChange={onChange}
                beforeUpload={beforeUpload}
                onRemove={onRemove}
            >
                {fileList.length >= 8 ? null : uploadButton}
            </Upload>
            <Modal
                visible={previewVisible}
                title={previewTitle}
                footer={null}
                onCancel={handleCancel}
            >
                <img alt="example" style={{width: '100%'}} src={previewImage}/>
            </Modal>
        </div>
    )

}



export default GoodsPicWall;

