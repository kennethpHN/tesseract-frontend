import axios from "axios";

export async function getToDos(){
    try {
        const {
            data: {listToDos},
        } = await axios.get("http://localhost:3000/to-dos")
        return listToDos;
    } catch (error) {
        console.error(error.mesage);
        return [];
    }
}

export async function patchToDo(todoId, newValues){
    try {
        axios.patch(`http://localhost:3000/to-dos/${todoId}`, {
            ...newValues,
            title: newValues.text,
            //isDone: newValues.isDone
          });
    } catch (error) {
        console.error(error.mesage);
    }

    

}