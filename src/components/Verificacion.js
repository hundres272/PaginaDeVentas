
function Verificacion(producto){
    if(localStorage.getItem("lista")!=="[]" && localStorage.getItem("lista")!==null){
        const getList = JSON.parse(localStorage.getItem("lista"));
        for (let i = 0; i < getList.length; i++) {
            if(getList[i].id===producto){
                return 0;
            }
        }
        return 1;
    }
    return 1;
}

export default Verificacion;