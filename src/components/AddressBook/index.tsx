import React, {useEffect, useRef, useState} from 'react';
import {queryUser,updateAddress} from "../../net";
import { Form,Input,Divider,Col, Row,Button ,  Cascader,InputNumber,
                                               Select,
                                               Checkbox} from 'antd';
import {User} from "../../utils/javamodel";
import {getUserId} from "../../utils/user";

/**
 * @author Zetian Huang
 */
interface addressLines{
    text:string,
    editing: boolean,
    row:number,
    alive:boolean
}
function AddressBook() {

    const [data, setData] = useState<Array<addressLines>>([])
    const [user, setUser] = useState<User>({})
    const [content, setContent] = useState<Array<JSX.Element>>([])

    const componentDidMount = async ()=> {
        const userId = getUserId()
        if(userId==null) return
        else{
            const resp = await queryUser(userId)
            const res = resp.data
            if (res.code === 0){
                const user:User = res.data
                setUser(user)
                let location =new String(user.location)
                var array = location.split(";")
                var lindex=-1
                var arrays = array.map(
                    (ele)=>{lindex=lindex+1; return {text:ele,editing:false,row:lindex,alive:true}})
                setData(arrays)
            }
         }
    }

    useEffect(() => {
        componentDidMount()
        return () => {
        };
    }, [])

    useEffect(() => {
        getElements()
        return () => {
        };
    }, [data])


    const ApplyChange= (row:number)=>{
        data[row].editing=false
        pushUpdate()
        getElements()
    }

    const pushUpdate = async ()=>{
        var location=""
        data.map((ele)=>{location=location+( ele.alive? (ele.text+";"):"")})
        location=location.slice(0,-1)
        const resp = await updateAddress(user.id,location)
        const res = resp.data
        if (res.code !== 0){
            alert("Update fail!")
        }
    }
    const EditLocation=(row:number)=>{
        data[row].editing=true
        getElements()
    }

    const deleteLocation=(row:number)=>{
        data[row].alive=false
        pushUpdate()
        getElements()
    }

    const addLine=()=>{
        const id=data[data.length-1].row+1
        data.push({text:"",editing:true,row:id,alive:true})
        getElements()
    }
    const textChange=(id: number,obj: { target: { value: any; }; })=>{
        data[id].text=obj.target.value
    }
    const getElements = () =>{
        var lines = data.map( (ele)=>{
            if(ele.editing&&ele.alive)
            return (
                <Row key = {ele.row} gutter={16}>
                    <Col span={8}>
                        <Input key = {"input"+ele.row} defaultValue={ele.text} onChange={(obj)=>{textChange(ele.row,obj)}}/>
                    </Col>
                    <Col span={8}>
                        <Button key = {"apply"+ele.row} type="link" onClick={()=>{ApplyChange(ele.row)}}>Apply</Button>
                    </Col>
                </Row>)
            else if(ele.alive) return (
                <Row key = {ele.row} gutter={16}>
                    <Col span={8}>
                        <h2>{ele.text}</h2>
                    </Col>
                    <Col span={8}>
                        <Button  key = {"edit"+ele.row} type="link" onClick={()=>{EditLocation(ele.row)}} >Edit</Button>
                        <Button  key = {"del"+ele.row} type="link" onClick={()=>{deleteLocation(ele.row)}} >Delete</Button>
                    </Col>
                </Row>)
            else return (<div/>)
        })
        lines = lines.concat(<Button key = {"add"} onClick={addLine}>Add</Button>)
        setContent(lines)
    }
   
    return (<div>
        {content}
    </div>);
}
export default AddressBook;
