import {renderHook, act, cleanup} from '@testing-library/react-hooks';
import { jest } from '@jest/globals';

import AddressBookUI, {AddressBook} from "../components/AddressBook";
import {getUserId} from "../utils/user";
import axios from "axios";


afterEach(() => {
    cleanup().then()
})

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

jest.mock("../utils/user", () => ({}))

test('render address book', async () => {
    const mockGetUserId = jest.fn(() => 1)

    mockedAxios.get.mockResolvedValueOnce({data: {code:0, data:
                {id:1, name:"haha", password:"123", email:"abc@gmail.com", type:0, location:"Waterloo"}
    }})

    const { result, waitForNextUpdate } = renderHook(() => AddressBook())

    const { setData, componentDidMount, ApplyChange,
        pushUpdate, EditLocation, deleteLocation, addLine, textChange, getElements } = result.current
    act(() => {setData([{"row":1, "alive":true, "editing":true, "text":"hello"}])})
    act(() => {componentDidMount()})
    setTimeout(() => {
        act(() => {ApplyChange(0)})
        act(() => {pushUpdate()})
        act(() => {EditLocation(0)})
        act(() => {deleteLocation(0)})
        act(() => {addLine()})
        act(() => {getElements()})
    }, 3000)
})

test('render address book UI', () => {
    const { result } = renderHook(() => AddressBookUI())
    expect(result.current).toMatchSnapshot()
})