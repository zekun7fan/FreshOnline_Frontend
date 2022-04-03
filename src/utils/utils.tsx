import {TreeNode} from "antd/es/tree-select";
import React, {ReactElement} from "react";
import {Resp} from "../net/resp";
import {getCategoryTree} from "../net";
import {useDispatch} from "react-redux";
import {update_category} from "../redux/actions/category_tree";


export interface CategoryNode {
    id: number,
    level: number,
    name: string,
    children: Array<CategoryNode>
}


interface PaymentDetails {
    cardNumber: number,
    cvvCode: number

}

export function getPaytype(status:number){
    const paytype = ["CREDIT CARD"]
    return status<paytype.length?paytype[status]:""
}

export function parseCardNumber(details: string): number {
    if(details==undefined) return 0;
    const paymentDetails: PaymentDetails = JSON.parse(details);
    return paymentDetails.cardNumber;
}

export function parseCvvCode(details: string): number {
    const paymentDetails: PaymentDetails = JSON.parse(details);
    return paymentDetails.cvvCode;
}

export function getFirstPicUrl(url: string | null): string | null {
    if (url === null) {
        return null;
    }
    if (!url.includes(',')) {
        return url;
    }
    const index = url.indexOf(',')
    return url.substring(0, index);
}


export function convertUrlToUrlList(url: string | null): Array<string> {
    if (url === null) {
        return [];
    }
    return url.split(',');
}

export function convertUrlListToUrl(list: Array<string>) {
    let pic: string = '';
    list.forEach((item) => {
        pic += item + ",";
    })
    return pic.substring(0, pic.length-1);
}


export function renderTreeNode(data: Array<CategoryNode>, onlySelectLeaf: boolean): Array<ReactElement> {
    return (
        data &&
        data.map((item) => {
            const hasChildren = item.children.length > 0;
            return (
                <TreeNode
                    key={item.id}
            value={item.id}
            level={item.level}
            title={item.name}
            disabled={hasChildren && onlySelectLeaf}
        >
            {hasChildren ? renderTreeNode(item.children, onlySelectLeaf) : null}
            </TreeNode>
        )
        })
    )

}


export function getSubCategoryTree(id: number, categoryTree: Array<CategoryNode>) {
    let node: CategoryNode = {
        id: -1,
        level: -1,
        name: '',
        children: []
    }
    categoryTree.forEach((item) => {
        findNodeById(item, id, node)
    })
    return node
}

export function getAllLeafOfSpecificNode(id: number, categoryTree: Array<CategoryNode>) {
    let res: Array<number> = [];
    if (id === 0) {
        // get all leaf
        categoryTree.forEach((node) => {
            retrieveAllLeaf(node, res)
        })
    } else {
        const node = getSubCategoryTree(id, categoryTree);
        retrieveAllLeaf(node, res);
    }
    return res;
}

function findNodeById(item: CategoryNode, target_id: number, node: CategoryNode) {
    if (item.id === target_id) {
        node.id = item.id
        node.name = item.name
        node.level = item.level
        node.children = item.children
    } else if (item.children.length > 0) {
        item.children.forEach((child) => {
            findNodeById(child, target_id, node)
        })
    }
}


function retrieveAllLeaf(item: CategoryNode, res_list: Array<number>): void {
    if (item.children.length === 0) {
        res_list.push(item.id)
    } else {
        item.children.forEach((child) => {
            retrieveAllLeaf(child, res_list)
        })
    }
}

export enum order_status{
    CREATE=0,
    CANCEL=1,
    PAID=2,
    IN_DELIVERY=3,
    FINISHED=4
}

export function getOrderStatus(status:number){
    const order_status = ["CREATE","CANCEL","PAID","IN_DELIVERY","FINISHED"]
    return status<5?order_status[status]:""
}
