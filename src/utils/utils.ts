import React, {ReactNode} from "react";
import {TreeNode} from "antd/es/tree-select";


interface CategoryNode {
    id: number,
    level: number,
    name: string,
    children: Array<CategoryNode>
}



interface PaymentDetails {
    card_number: number,
    cvv_code: number

}


export function parseCardNumber(details: string) : number {
    const paymentDetails : PaymentDetails= JSON.parse(details);
    return paymentDetails.card_number;
}

export function parseCvvCode(details: string) : number {
    const paymentDetails : PaymentDetails= JSON.parse(details);
    return paymentDetails.cvv_code;
}
