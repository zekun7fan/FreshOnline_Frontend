import React, {ReactNode} from "react";
import {TreeNode} from "antd/es/tree-select";


interface CategoryNode {
    id: number,
    level: number,
    name: string,
    children: Array<CategoryNode>
}



