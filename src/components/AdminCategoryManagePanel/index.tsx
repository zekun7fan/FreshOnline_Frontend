import React, {ChangeEvent, useEffect, useRef, useState} from 'react';
import {Button, Input, InputRef, message, Modal, TreeSelect} from "antd";
import {CategoryNode, getSubCategoryTree, renderTreeNode} from "../../utils/utils";
import {shallowEqual, useDispatch, useSelector} from "react-redux";
import {RootState} from "../../redux/reducers";
import {addCategory, delCategory, getCategoryTree} from "../../net";
import {Resp} from "../../net/resp";
import {update_category} from "../../redux/actions/category_tree";
import {Category} from "../../net/reqBody";


function AdminCategoryManagePanel(){

    const dispatch = useDispatch();

    const ref = useRef<InputRef>(null)

    const [visible, setVisible] = useState<boolean>(false)

    const [newCategoryName, SetNewCategoryName] = useState<string>('')

    const [selectedNode, setSelectedNode] = useState<CategoryNode>({
        id: 0,
        level: 0,
        name: 'root',
        children: []
    })

    const categoryTree = useSelector((state: RootState) => {
        return state.category_tree;
    }, shallowEqual)

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        SetNewCategoryName(e.target.value)
    };

    const onAddCategory = () => {
        if (selectedNode.level === 3) {
            message.warn("you can not add node more than depth 3")
            return
        }
        setVisible(true)

    }

    const onCancelAdd = () => {
        setVisible(false)
        SetNewCategoryName('')
        ref.current!.input!.value = ''
    }

    const onConfirmAdd = async () => {
        const newNode: Category = {
            name: newCategoryName,
            parentId: selectedNode.id,
            level: selectedNode.level + 1
        }
        const raw = await addCategory(newNode)
        const resp: Resp = raw.data
        if (resp.code === 0){
            reloadCategory().catch()
        }
        resetSelectedNode()
        message.info(resp.msg)
        setVisible(false)
        console.log("input=,", ref)
        ref.current!.input!.value = ''
    }

    const onDelCategory = async () => {
        const id = selectedNode.id;
        if (id === 0){
            message.warn("please select a category to delete")
            return
        }
        const node: CategoryNode = getSubCategoryTree(id, categoryTree)
        const raw = await delCategory(node)
        const resp: Resp = raw.data
        if (resp.code === 0){
            reloadCategory().catch()
        }
        message.info(resp.msg)
        resetSelectedNode()
    };

    const reloadCategory = async () => {
        const raw = await getCategoryTree()
        const resp: Resp = raw.data
        if (resp.code === 0){
            const tree = resp.data as CategoryNode[]
            dispatch(update_category(tree))
        }
    };

    const resetSelectedNode = () => {
        setSelectedNode({
            id: 0,
            level: 0,
            name: 'root',
            children: []
        })
    };

    const onSelect = (_: any, node: any) => {
        setSelectedNode({
            id: node.value,
            name: node.title,
            level: node.level,
            children: []
        })
    }

    const onClear = () => {
        resetSelectedNode()
    }


    const queryTree = async () => {
        const raw = await getCategoryTree()
        console.log("raw=",raw)
        const resp: Resp = raw.data
        if (resp.code === 0){
            const tree: CategoryNode[] = resp.data as CategoryNode[];
            dispatch(update_category(tree))
        }
    }

    useEffect(() => {
        queryTree().catch()
    },[])

    return (
            <div>
                <TreeSelect
                    style={{width: '100%'}}
                    dropdownStyle={{maxHeight: 400, overflow: 'auto'}}
                    placeholder="Please select"
                    allowClear
                    onSelect={onSelect}
                    onClear={onClear}
                >
                    {renderTreeNode(categoryTree, false)}
                </TreeSelect>
                <Button type="primary" size={'large'} onClick={onAddCategory}>
                    Add new category
                </Button>
                <Button type="primary" size={'large'} onClick={onDelCategory}>
                    Delete category
                </Button>
                <Modal title="ADD NEW CATEGORY" visible={visible} onOk={onConfirmAdd} onCancel={onCancelAdd}>
                    <p>you will create new category under {selectedNode.name} category</p>
                    new category name: <Input ref={ref} onChange={onChange}/>
                </Modal>
            </div>

    );
};


export default AdminCategoryManagePanel;