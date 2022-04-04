import {renderHook, act, cleanup} from '@testing-library/react-hooks';

import AddressBookUI, {AddressBook} from "../components/AddressBook";


afterEach(() => {
    cleanup().then()
})

test('render address book', () => {
    const { result } = renderHook(() => AddressBook())
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