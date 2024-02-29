import { addDoc, collection } from "firebase/firestore"
import { appFireStore, timestamp } from "../firebase/config"
import { useReducer } from "react"

const initState = {
  document: null,
  isPending: false,
  error: null,
  success: false
}

const storeReducer = (state, action) => {
  switch (action.type) {
    case 'isPending':
      return {isPending : true, document: null, success: false, error: null}
    case 'addDoc':
    return {isPending : false, document: action.payload, success: true, error: null}
    case 'error':
    return {isPending : false, document: null, success: false, error: action.payload}
    default:
      return state
  }
}

// 우리가 데이터를 저장할 컬렉션을 인자로 합니다. 
export const useFireStore = (transaction) => {

  const [response, dispatch] = useReducer(storeReducer, initState)

  // colRef : 우리가 만들 컬랙션의 참조입니다. 우리가 따로 컬렉션을 만들지는 않았지만, 
  // 원하는 컬렉션의 참조를 요구하기만 해도 파이어스토어는 자동으로 해당 컬렉션을 생성해줍니다. 
  const colRef = collection(appFireStore, transaction);

  // 컬렉션에 문서를 추가합니다.
  const addDocument = async (doc) => {
    dispatch({ type: "isPending"})

    try{
      const createdTime = timestamp.fromDate(new Date())
      const docRef = await addDoc(colRef, { ...doc, createdTime });
      console.log(docRef)
      dispatch({ type: 'addDoc', payload: docRef });
    }catch (error) {
      dispatch({ type: 'error', payload: error.message });
    }
    

		
  }

  // 컬렉션에서 문서를 제거합니다.
  const deleteDocument = (id) => {

  }

  return {addDocument, deleteDocument, response}
}